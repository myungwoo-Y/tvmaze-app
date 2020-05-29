import styled from 'styled-components';
import media from 'styled-media-query';


export const ListContainer = styled.div`
    margin-top: 50px;
    padding-right: 15px;
    padding-left: 15px;
    margin-right: auto;
    margin-left: auto;

    ${media.lessThan("medium")`
        margin: 0;
        padding: 0;
        img{
            width: 100vw;
            height: 60vw;
        }
    `}

    ${media.between("768px", "992px")`
        width: 750px;
        img{
            width: 100%;
            height: 380px;
        }
    `}

    ${media.between("992px", "1200px")`
        width: 970px;
        img{
            width: 100%;
            height: 350px;
        }
    `}

    ${media.greaterThan("1200px")`
        width: 1170px;
        img{
            width: 100%;
            height: 420px;
        }
    `}


`


