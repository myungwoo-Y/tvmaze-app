import React, {useEffect, useState} from 'react';
import videos from '../../apis/videos'
import {Row, Col, Button} from 'react-bootstrap';
import { DesciptionStyle, MainPosterStyle, MainInfoContainer } from './VideoList.styles'
import MySpinner from '../MySpinner';
import SeasonsShow from '../SeasonsShow';
import { removeTagInString, imageValidation } from '../../utils'
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
            const image = imageValidation(video.image)
            const description = video.summary ? video.summary : "";
            const title = video.name ? video.name : "None";
            return(
                <div>
                    <MainInfoContainer>
                        <Row>
                            <Col xs={12} md={6}>
                                <MainPosterStyle>
                                    <img src={image}></img>
                                </MainPosterStyle>
                            </Col>
                            <Col xs={12} md={6}>
                                <div>
                                    <h1>
                                        {title}
                                    </h1>
                                </div>
                                <DesciptionStyle>{removeTagInString(description)}</DesciptionStyle>
                                <Button
                                    variant="success"
                                    className="rounded-circle mt-3"
                                >   
                                    <i className="fas fa-plus"></i>

                                </Button>
                            </Col>
                        </Row>
                    </MainInfoContainer>
                    <SeasonsShow videoId={videoId}/>
                </div>
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