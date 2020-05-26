import React, {useState, useEffect} from 'react';
import {Form, Button, Container, Spinner} from 'react-bootstrap';
import { SignUpContainer } from './SignUp.styles';
import firebase from '../../firebase'

const SingUp = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const notMatchMessage = "두 비밀번호가 서로 일치하지 않습니다."
    const onRegister = async () => {
        setLoading(true);
        if(password === confirmPassword){
            try {
                await firebase.register(name, email, password);
                setLoading(false);
                props.history.replace('/login');
                alert("회원가입에 성공하였습니다.");
            } catch(error) {
                alert(error.message);
            }
        }else{
            alert(notMatchMessage);
        }
        setLoading(false);
	}

    return(
        <Container>
            <SignUpContainer className="shadow-lg p-3 mb-5 bg-white rounded text-center">
                <h2>Welcom</h2>
                <img src="/images/logo.png"/>
                <Form className="mt-4" onSubmit={e => e.preventDefault() && false}>
                    <Form.Group controlId="formBasicName">
                        <Form.Control type="name" autoComplete="off" value={name} placeholder="Name" onChange={e => setName(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" autoComplete="off" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" autoComplete="new-password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formConfirmPassword">
                        <Form.Control type="password" autoComplete="off" value={confirmPassword} placeholder="Confirm Password" onChange={e => setConfirmPassword(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="success" type="submit" onClick={onRegister}>
                        Sign Up
                </Button>
                <div className="mt-3" style={{display: loading ? "block" : "none"}}>
                    <Spinner animation="border" variant="success" />
                </div>
            </SignUpContainer>
        </Container>
    )
}

export default SingUp;