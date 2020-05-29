import React, {useEffect, useState} from 'react';
import videos from '../../apis/videos'
import {Row, Col} from 'react-bootstrap';
import { DesciptionStyle, MainPosterStyle, MainInfoContainer, ButtonStyles } from './VideoDetail.styles'
import MySpinner from '../MySpinner';
import SeasonsShow from '../SeasonsShow';
import { removeTagInString, imageOriginalValidation } from '../../utils'
import firebase from '../../firebase';
import { connect } from 'react-redux';
import { fetchMySeries, deleteSeries } from '../../actions';
import MySeries from '../MySeries';

const VideoDetail = ({ match, fetchMySeries, mySeries, deleteSeries, isSignedIn }) => {
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

    const addHandler = () => {
        if(isSignedIn){
            firebase.addSeries(videoId, video)
            .then(() => {
                fetchMySeries();
                alert("성공적으로 추가하였습니다.");
            })
        }else{
            alert("로그인을 먼저 해주세요")
        }

    }

    const deleteHandler = () => {
        if(isSignedIn){
            firebase.deleteSeries(videoId)
            .then(() => {
                deleteSeries(videoId);
                alert("성공적으로 제거하였습니다.");
            })
        }else{
            alert("로그인을 먼저 해주세요")
        }
 
    }

    

    const buttonRender = () => {
        if(mySeries[videoId] === undefined){
            return(
                <ButtonStyles
                    variant="success"
                    className="rounded-circle mt-3"
                    onClick={addHandler}
                >   
                    <i className="fas fa-plus"></i>
    
                </ButtonStyles>
            )
        }else{
            return(
                <ButtonStyles
                    variant="danger"
                    className="rounded-circle mt-3"
                    onClick={deleteHandler}
                >   
                    <i className="fas fa-minus"></i>
    
                </ButtonStyles>
            )
        }

    }

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
                                <img src={image} alt="Main Poster"></img>
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
                            {buttonRender()}
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

const mapStateProps = state => {
    return{
        mySeries: state.videos.mySeries,
        isSignedIn: state.auth.isSignedIn
    }
}

export default connect(mapStateProps, { fetchMySeries, deleteSeries })(VideoDetail);