import media from 'styled-media-query'
import styled from 'styled-components';

export const LoginContainer = styled.div`
    margin-top: 50px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    width: 600px;
    img{
        height: 100px;
        width: 100px;
    }
    button{
        background-color: #3fb57c;
    }
    button:hover{
        background-color: #3fb57c;
    }

    ${media.lessThan("medium")`
        width: 80%;
    `}

    ${media.lessThan("576px")`
        width: 100%;
    `}
    
`