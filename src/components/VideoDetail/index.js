import React, {useEffect, useState} from 'react';
import videos from '../../apis/videos'
import {Row, Col, Button} from 'react-bootstrap';
import { DesciptionStyle, MainPosterStyle, MainInfoContainer, ButtonStyles } from './VideoDetail.styles'
import MySpinner from '../MySpinner';
import SeasonsShow from '../SeasonsShow';
import { removeTagInString, imageMediumValidation, imageOriginalValidation } from '../../utils'
const VideoDetail = ({match}) => {
    const [video, setVideo] = useState(null);
    const videoId = match.params.id;
    useEffect(() => {
        const fetchVideo = async () => {
            await videos.get(`/shows/${videoId}`)
                .then(response => {
                    setVideo(response.data);
                })
                .catch(e => {
                    console.log(e)
                });
        } 
        fetchVideo();
    }, [])

    const videoRender = () => {
        if(video === null){
            return(
                <MySpinner/>
            )
        }else{
            const image = imageOriginalValidation(video.image)
            const description = video.summary ? video.summary : "";
            const title = video.name ? video.name : "None";
            return(
                <MainInfoContainer>
                    <Row>
                        <Col xs={12} md={6} className="text-center">
                            <MainPosterStyle>
                                <img src={image}></img>
                            </MainPosterStyle>
                        </Col>
                        <Col xs={12} md={6}>
                            <DesciptionStyle>
                                <div>
                                    <h1>
                                        {title}
                                    </h1>
                                </div>
                                {removeTagInString(description)}
                            </DesciptionStyle>
                            <ButtonStyles
                                variant="success"
                                className="rounded-circle mt-3"
                            >   
                                <i className="fas fa-plus"></i>

                            </ButtonStyles>
                        </Col>
                    </Row>
                    <SeasonsShow videoId={videoId}/>
                </MainInfoContainer>
            )
        }
    }


    return(
        <div>
            {videoRender()}
        </div>
    )
}

export default VideoDetail;