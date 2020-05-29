import React, {useState, useEffect} from 'react';
import {LogoContainer, ItemsStyle, SearchIconStyle, NavStyle, MenuContainer, LinkStyle} from './Header.styles'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSearch, signOut, deleteAllMySeries } from '../../actions';
import firebase from '../../firebase';
import history from '../../history';

const Header = ({ fetchSearch, isSignedIn, signOut, deleteAllMySeries }) => {
    const [isToggled, setIsToggled] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const clickMenu = () => {
        setIsToggled(!isToggled);
    }

    // useEffect(() => {
    //     setInterval(() => {
    //         Notification.requestPermission(function(result) {
    //             console.log("In interval")
    //             if (result === 'granted') {
    //                 console.log(result)
    //                 navigator.serviceWorker.ready.then(function(registration) {
    //                     console.log("Notification Start")
    //                     registration.showNotification('Hello world', {
    //                         body: 'Series Notification',
    //                         icon: '/images/logo.png',
    //                         vibrate: [200, 100, 200, 100, 200, 100, 200],
    //                         tag: 'vibration-sample'
    //                     });
    //               });
    //             }
    //           });
    //     }, 5 * 1000);
    // }, []);

    const clickSearch = () => {
        fetchSearch(searchWord);
    }

    const handleEnter = (event) => {
        if(event.key === 'Enter'){
            fetchSearch(searchWord);
        }
    }

    const onSearchChange = (event) => {
        setSearchWord(event.target.value);
    }

    const handleLinckClick = () => {
        setIsToggled(false);
    }

    const handleSignout = () => {
        firebase.logout();
        signOut();
        deleteAllMySeries();
        alert("로그아웃 하였습니다.")
    }

    return(
        <NavStyle isToggled={isToggled}>
            <ul>
                <LogoContainer>
                    <Link to="/">
                        Tv Maze
                    </Link>
                </LogoContainer>
                <MenuContainer isToggled={isToggled}>
                    <span className="fas fa-bars" onClick={clickMenu}></span>
                </MenuContainer>
                <ItemsStyle isToggled={isToggled}>
                    <li>
                        <LinkStyle 
                            onClick={handleLinckClick} 
                            to="/"
                        >
                            Home
                        </LinkStyle>
                    </li>
                    <li>
                        <LinkStyle 
                            onClick={handleLinckClick} 
                            to="/myseries"
                            style={{display: isSignedIn ? "block" : "none"}}
                        >
                            My Series
                        </LinkStyle>
                    </li>
                    <li>
                        <LinkStyle 
                            onClick={handleLinckClick} 
                            to="/login"
                            style={{display: isSignedIn ? "none" : "block"}}
                        >
                            Login
                        </LinkStyle>
                    </li>
                    <li>
                        <LinkStyle 
                            onClick={handleSignout} 
                            to="/"
                            style={{display: isSignedIn ? "block" : "none"}}
                        >
                            Logout
                        </LinkStyle>
                    </li>
                    <li>
                        <LinkStyle 
                            onClick={handleLinckClick} 
                            to="/signup"
                            style={{display: isSignedIn ? "none" : "block"}}
                        >
                            Sign Up
                        </LinkStyle>
                    </li>
                </ItemsStyle>
                <SearchIconStyle>
                    <input 
                        type="search" 
                        placeholder="Search"
                        onChange={onSearchChange}
                        onKeyDown={handleEnter}
                    />
                    <label onClick={clickSearch}>
                        <span className="fas fa-search"></span>
                    </label>
                </SearchIconStyle>
            </ul>
        </NavStyle>
    )
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn};
}

export default connect(mapStateToProps, { fetchSearch, signOut, deleteAllMySeries })(Header);