import React, { useState } from 'react';
import {LogoContainer, ItemsStyle, SearchIconStyle, NavStyle, MenuContainer, LinkStyle} from './Header.styles'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSearch, signOut, deleteAllMySeries } from '../../actions';
import firebase from '../../firebase';

const Header = ({ fetchSearch, isSignedIn, signOut, deleteAllMySeries }) => {
    const [isToggled, setIsToggled] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const clickMenu = () => {
        setIsToggled(!isToggled);
    }

    const clickSearch = (event) => {
        fetchSearch(searchWord);
        setSearchWord("");
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
                    <label className="d-none">Search</label>
                    <input 
                        type="search" 
                        placeholder="Search"
                        value={searchWord}
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