import React, {useState} from 'react';
import {LogoContainer, ItemsStyle, SearchIconStyle, NavStyle, MenuContainer, LinkStyle} from './Header.styles'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchSearch } from '../../actions';

const Header = ({ fetchSearch }) => {
    const [isToggled, setIsToggled] = useState(false);
    const [searchWord, setSearchWord] = useState('');
    const clickMenu = () => {
        setIsToggled(!isToggled);
    }

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

    const handleLinckClick = (event) => {
        setIsToggled(false);
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
                            to="/"
                        >
                            찜한 시리즈
                        </LinkStyle>
                    </li>
                    <li>
                        <LinkStyle 
                            onClick={handleLinckClick} 
                            to="/"
                        >
                            Login
                        </LinkStyle>
                    </li>
                    <li>
                        <LinkStyle 
                            onClick={handleLinckClick} 
                            to="/"
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
export default connect(null, { fetchSearch })(Header);