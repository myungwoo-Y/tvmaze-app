import React, {useState, useEffect} from 'react';
import {Form, Button, Container, Spinner} from 'react-bootstrap';
import { LoginContainer } from './Login.styles';
import firebase from '../../firebase'
import { connect } from 'react-redux'
import { signIn, fetchMySeries } from '../../actions';

const Login = ({ history, signIn, fetchMySeries }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const loginHandler = async () => {
        setLoading(true);
        try {
            await firebase.login(email, password)
            setLoading(false);
            signIn();
            fetchMySeries();
            history.replace('/')
            alert("로그인에 성공하였습니다.")
		} catch(error) {
			alert(error.message)
        }
        setLoading(false);
    }
    
    return(
        <Container>
            <LoginContainer className="shadow-lg p-3 mb-5 bg-white rounded text-center">
                <h2>Welcom</h2>
                <img src="/images/logo.png"/>
                <Form className="mt-4" onSubmit={e => e.preventDefault() && false}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Control type="email" autoComplete="off" value={email} placeholder="Enter email" onChange={e => setEmail(e.target.value)}/>
                    </Form.Group>
                    <Form.Group controlId="formBasicPassword">
                        <Form.Control type="password" autoComplete="new-password" value={password} placeholder="Password" onChange={e => setPassword(e.target.value)}/>
                    </Form.Group>
                </Form>
                <Button variant="success" type="submit" onClick={loginHandler}>
                        Login
                </Button>
                <div className="mt-3" style={{display: loading ? "block" : "none"}}>
                    <Spinner animation="border" variant="success" />
                </div>
            </LoginContainer>
        </Container>
    )
}

export default connect(null, { signIn, fetchMySeries })(Login);