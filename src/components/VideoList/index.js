import React from 'react';
import history from '../../history';
import { removeTagInString, imageOriginalValidation } from '../../utils'
import {Card, Row, Col, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { ListContainer } from './VideoList.styles';

const VideoList = ({videos, objectType}) => {

    const videoClick = (id) => {
        history.push(`/video/${id}`)
    }

    const getVideo = (videoObject) => {
        // if(objectType === "home"){
        //     return videoObject;
        // }else{
        //     return videoObject.show;
        // }
        return videoObject.show;
    }

    const popularVideoList = () => videos.map((videoObject) => {
        const video = getVideo(videoObject);
        const image = imageOriginalValidation(video.image);
        const description = video.summary ? video.summary : "";

        return(
            <Col xs={12} md={6} lg={3}  
                key={video.id} 
                className="mt-2 mb-2" 
                onClick={() => videoClick(video.id)}
            >
                <OverlayTrigger
                    placement='bottom'
                    overlay={
                    <Tooltip id={`tooltip-${video.id}`}>
                        <div className="text-bold">
                            {removeTagInString(description)}
                        </div>
                    </Tooltip>
                    }
                >
                    <Card style={{ width: '100%' }}>
                        <Card.Img variant="top" src={image} alt="video image"/>
                        <Card.Body>
                            <Card.Title>
                                {video.name}
                            </Card.Title>
                        </Card.Body>
                    </Card>
                </OverlayTrigger>
            </Col>
        )
    })


    return(
        <ListContainer>
            <Row>
                {popularVideoList()}
            </Row>
        </ListContainer>
    )
}

export default VideoList;