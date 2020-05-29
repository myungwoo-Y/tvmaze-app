import React, {useEffect, useState} from 'react';
import videos from '../../apis/videos'
import ImageGallery from 'react-image-gallery';
import { GalleryContainer, SeasonContainer, SeasonTitleStyle, DateStyle, SeasonDiscriptionStyle } from './SeasonsShow.styles';
import { imageMediumValidation, removeTagInString } from '../../utils';
import EpisodeList from './EpisodeList';


function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return { width, height };
}


const SeasonsShow = ({videoId}) => {
    const [seasons, setSeasons] = useState(null);
    const [episodes, setEpisodes] = useState(null);
    const [items, setItems] = useState([]);
    const [seasonNumber, setSeasonNumber] = useState(-1);
    const mediumWidth = 576;

    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

    useEffect(() => {
        function handleResize() {
            setWindowDimensions(getWindowDimensions());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const setDatasToItems = (datas) => {
        const newItems = [];
        datas.map((data, i) => {
            const imageUrl = imageMediumValidation(data.image);
            newItems.push({
                original: imageUrl,
                thumbnail: imageUrl,
                originalTitle : `Season ${i+1}`,
                thumbnailTitle : `Season ${i+1}`,
                description:  `Season ${i+1}`
            })
            return;
        })
        setItems(newItems);
    }

    useEffect(() => {
        const fetchVideo = async () => {
            await videos.get(`/shows/${videoId}/seasons`)
                .then(response => {
                    setDatasToItems(response.data);
                    setSeasons(response.data);
                })
                .catch(e => {
                    console.log(e)
                });
        } 
        fetchVideo();
    }, []);


    useEffect(() => {
        const fetchEpisodes = async () => {
            await videos.get(`/shows/${videoId}/episodes`)
                .then(response => {
                    setEpisodes(response.data);
                })
                .catch(e => {
                    console.log(e)
                });
        } 
        fetchEpisodes();
    }, []);


    const galleryClickHandle = (event) => {
        const currentSeason = event.target.title;
        const seasonNumber = currentSeason[currentSeason.length-1];
        setSeasonNumber(parseInt(seasonNumber)); 
    }

    const seasonInformation = () => {
        if(seasonNumber === -1){
            return <></>
        }else{
            const season = seasons[seasonNumber-1];
            const description = removeTagInString(season.summary ? season.summary : "");
            const start = season.premiereDate;
            const end = season.endDate;

            return(
                <>
                    <SeasonContainer>
                        <SeasonTitleStyle>
                            <h1>
                                {`Season ${seasonNumber}`}
                            </h1>
                        </SeasonTitleStyle>
                        <SeasonDiscriptionStyle>
                            {description}
                        </SeasonDiscriptionStyle>
                        <DateStyle>
                            <strong>{start + " ~  " + end}</strong>
                        </DateStyle>
                    </SeasonContainer>
                    <EpisodeList 
                        episodes={episodes}
                        seasonNumber={seasonNumber}
                    />
                </>
            )
        }
    }
    
    return(

        <div>
            <GalleryContainer>
                <ImageGallery 
                    items={items} 
                    showThumbnails={windowDimensions.width > mediumWidth}
                    showPlayButton={false}
                    showFullscreenButton={false}
                    onClick={galleryClickHandle}
                />
            </GalleryContainer>
            {seasonInformation()}
        </div>
    )
}

export default SeasonsShow;