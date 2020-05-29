import React, {useEffect, useState} from 'react';
import videos from '../../apis/videos';
import VideoList from '../VideoList';
import { Container } from 'react-bootstrap';
import { getUsDate } from '../../utils';
import _mapKeys from 'lodash/mapKeys';

const Home = () => {

    const [popularVideo, setPopularVideo] = useState([]);

    const dateString = getUsDate('string');
    useEffect(() => {
        const fetchPopularVideo = async () => {
            const popularVideoUrl = `/schedule?country=US&date=${dateString}`;
            await videos.get(popularVideoUrl)
                .then(response => {
                    const videos = response.data.slice(0, 15);
                    const removedVideos = _mapKeys(videos, (o) => { return o.show.id; });
                    setPopularVideo(Object.values(removedVideos));
                })
                .catch(e => {
                    console.log(e)
                });
        } 
        fetchPopularVideo();
    }, [])

    return(
        <div>
            <Container className="mt-4 text-center">
                <h1>Today Series</h1>
            </Container>
            <VideoList
                videos={popularVideo}
                objectType="home"
            />
        </div>
    )
}

export default Home;