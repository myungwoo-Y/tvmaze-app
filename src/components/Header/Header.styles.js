import styled from 'styled-components'

export const LogoContainer = styled.li`
    @media screen and (max-width: 1052px){
        display: none;
    }
    flex: 1;
    font-size: 30px;
    font-weight: 700;
`

export const MenuContainer = styled.li`
    @media screen and (max-width: 800px){
        display: block;
        padding: 0 0 0 30px;
    }
    @media screen and (max-width: 360px){
        display: block;
        padding: 0 0 0 10px;
    }
    @media screen and (max-width: 312px){
        display: none;
    }
    font-size: 30px;
    flex: 1;
    padding: 0 40px;
    display: none;
    span{
        height: 42px;
        width: 42px;
        text-align: center;
        line-height: 42px;
        border: 1px solid #151515;
        border-radius: 5px;
    }
    span:before{
        content: '${(props) => (props.isToggled ? "\f00d" : "\f0c9")}';
        /* content: "\f00d"; */
    }

`
export const ItemsStyle = styled.div`
    @media screen and (max-width: 1052px){
        flex:4;
    }
        padding: 10px 40px 10px 0px;
    @media screen and (max-width: 800px){
        z-index: -1;
        position: fixed;
        top: ${(props) => props.isToggled ? "60px" : "-220px"};
        right: 0px;
        width: 100%;
        background: #222222;
        display: inline-block;
        transition: top .4s;
        li{
            text-align: center;
            line-height: 30px;
            margin: 30px 0;
        }
        a{
            font-size: 19px;
        }
    }
    padding: 0 25px;
    display: inline-flex;
    a{
        text-decoration: none;
        font-size: 18px;
        padding: 0 12px;
    }

    a:hover{
        color: cyan;
    }
`

export const SearchIconStyle = styled.li`
    height: 40px;
    width: 240px;
    display: flex;
    background: #f2f2f2;
    border-radius: 5px;
    input{
        height: 100%;
        width: 200px;
        border: none;
        padding: 0 10px;
        color: #000;
        font-size: 16px;
        border-radius: 5px 0 0 5px;
    }
    label{
        height: 100%;
        width: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #cccccc;
        border-radius: 0 5px 5px 0;
    }
    label:hover{
        background: #e6e6e6;
    }
    span{
        color: #222222;
        font-size: 18px
    }
`

export const NavStyle = styled.nav`
    @media screen and (max-width: 1052px){
        padding: 10px 40px 10px 0px;
    }
    @media screen and (max-width: 800px){
        padding: 10px 40px 10px 0px;
    }
    @media screen and (max-width: 360px){
        padding: 10px 20px 0 0;
    }
    @media screen and (max-width: 300px){
        padding: 10px 10px 0 0;
    }
    background: #222222;
    color: white;
    padding: 10px 40px 10px 70px;
    border: 1px solid #000;
    border-left: none;
    border-right: none;
    z-index: 1;
    margin-bottom: ${(props) => (props.isToggled ? "300px" : "0")};
    transition:margin 0.3s linear;
    ul {
        display: flex;
        list-style: none;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        padding: 0;
    }
`

