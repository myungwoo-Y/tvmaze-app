import React, {useEffect, useState} from 'react';
import videos from '../../apis/videos';
import {Card, Row, Col, OverlayTrigger, Tooltip} from 'react-bootstrap';
import { HomeContainer } from './Home.styles'
import history from '../../history';
const Home = () => {

    const [popularVideo, setPopularVideo] = useState([]);

    const popularVideoUrl = '/shows?sortby=popularity&sortby_direction=desc&page=1';

    useEffect(() => {
        const fetchPopularVideo = async () => {
            await videos.get(popularVideoUrl)
                .then(response => {
                    setPopularVideo(response.data.slice(0, 10));
                })
                .catch(e => {
                    console.log(e)
                });
        } 
        fetchPopularVideo();
    }, [])

    const removeTagInString = (description) => {
        let removedString = '';
        let addFlag = true;
        for(const ch of description){
            if(ch === '<')
                addFlag = false;

            if(addFlag)
                removedString += ch;

            if(ch === '>')
                addFlag = true;
        }

        if(removedString.length > 100)
            return removedString.slice(0, 100) + ".....";
        else
            return removedString;
    }

    const videoClick = (id) => {
        history.push(`/video/${id}`)
    }

    const popularVideoList = () => popularVideo.map((video) => (
        <Col xs={6} md={3} key={video.id} className="mt-2 mb-2" onClick={() => videoClick(video.id)}>
            <OverlayTrigger
                placement='bottom'
                overlay={
                <Tooltip id={`tooltip-${video.id}`}>
                    <div className="text-bold">
                        {removeTagInString(video.summary)}
                    </div>
                </Tooltip>
                }
            >
                <Card style={{ width: '100%' }}>
                    <Card.Img variant="top" src={video.image.medium} alt="video image"/>
                    <Card.Body>
                        <Card.Title>{video.name}</Card.Title>
                    </Card.Body>
                </Card>
            </OverlayTrigger>
        </Col>
    ))


    return(
        <HomeContainer>
            <Row>
                {popularVideoList()}
            </Row>
        </HomeContainer>
    )
}

export default Home;