import React from 'react';
import history from '../../history';
import { removeTagInString } from '../../utils'
import {Card, Row, Col, OverlayTrigger, Tooltip} from 'react-bootstrap';

const VideoList = ({videos}) => {

    const videoClick = (id) => {
        history.push(`/video/${id}`)
    }

    const popularVideoList = () => videos.map((videoObject) => {
        const video = videoObject.show;
        const image = video.image ? video.image.medium : "/images/EmptyState.jpg";
        const description = video.summary ? video.summary : "";

        return(
            <Col xs={6} md={3} key={video.id} className="mt-2 mb-2" onClick={() => videoClick(video.id)}>
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
                            <Card.Title>{video.name}</Card.Title>
                        </Card.Body>
                    </Card>
                </OverlayTrigger>
            </Col>
        )
    })



    return(
        <Row>
            {popularVideoList()}
        </Row>
    )
}

export default VideoList;