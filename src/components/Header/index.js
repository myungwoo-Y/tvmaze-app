import React, {useState} from 'react';
import {LogoContainer, ItemsStyle, SearchIconStyle, NavStyle, MenuContainer} from './Header.styles'
import { Link } from 'react-router';
const Header = () => {
    const [isToggled, setIsToggled] = useState(false);
    const clickMenu = () => {
        setIsToggled(!isToggled);
    }
    return(
        <NavStyle isToggled={isToggled}>
            <ul>
                <LogoContainer>Tv Maze</LogoContainer>
                <MenuContainer isToggled={isToggled}>
                    <span className="fas fa-bars" onClick={clickMenu}></span>
                </MenuContainer>
                <ItemsStyle isToggled={isToggled}>
                    <li><a herf="#">Home</a></li>
                    <li><a herf="#">About</a></li>
                    <li><a herf="#">Services</a></li>
                    <li><a herf="#">Contact</a></li>
                </ItemsStyle>
                <SearchIconStyle>
                    <input type="search" placeholder="Search"/>
                    <label>
                        <span className="fas fa-search"></span>
                    </label>
                </SearchIconStyle>
            </ul>
        </NavStyle>
    )
}

export default Header;