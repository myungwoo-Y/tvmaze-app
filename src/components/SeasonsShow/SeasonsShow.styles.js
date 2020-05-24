import styled from 'styled-components';
import media from "styled-media-query";
export const GalleryContainer = styled.div`
    margin-top: 50px;
    img{
        max-height: 300px !important;
    }
`


export const SeasonContainer = styled.div`
    margin: 100px 0 100px 0;
`


export const SeasonTitleStyle = styled.div`
    text-align: center;
`

export const DateStyle = styled.div`
    text-align: center;
`

export const SeasonDiscriptionStyle = styled.div`
    ${media.greaterThan("991px")`
        font-size: 18px;
    `}
    ${media.lessThan("medium")`
        margin: 15px;
        padding: 15px;
    `}
`

export const EpisodeListContainer = styled.div`
    img{
        max-height: 300px;
    }
`
