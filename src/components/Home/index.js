import React, {useEffect, useState} from 'react';
import videos from '../../apis/videos';
import VideoList from '../VideoList';
const Home = () => {

    const [popularVideo, setPopularVideo] = useState([]);

    const popularVideoUrl = '/schedule?country=US&date=2020-05-23';

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

    return(
        <div>
            <VideoList
                videos={popularVideo}
                objectType="home"
            />
        </div>
    )
}

export default Home;