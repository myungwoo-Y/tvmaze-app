import styled from 'styled-components';
import media from "styled-media-query";
import { Button } from 'react-bootstrap';

export const SpinnerStyle = styled.div`
    float: none;
    margin: 0 auto;
    width: 100%;
`;

export const DesciptionStyle = styled.div`
    font-size: 18px;
    ${media.lessThan("medium")`
        margin: 15px;
        padding: 15px;
    `}
`;

export const MainPosterStyle = styled.div`
    img{
        width: 300px;
        height: 400px;
    }
    
    ${media.lessThan("medium")`
        margin: 0;
        padding: 0;
        img{
            width: 100vw;
            height: 80vw;
        }
    `}
`;


export const MainInfoContainer = styled.div`
    margin-top: 50px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    ${media.lessThan("medium")`
        margin: 0;
        padding: 0;
    `}

    ${media.between("medium", "992px")`
        width: 750px;
    `}

    ${media.between("992px", "1200px")`
        width: 970px;
    `}

    ${media.greaterThan("1200px")`
        width: 1170px;
    `}
`

export const ButtonStyles = styled(Button)`
    ${media.lessThan("medium")`
        margin: 30px;
    `}
`
