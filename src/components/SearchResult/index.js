import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import VideoList from '../VideoList';
import MySpinner from '../MySpinner';
import { fetchSearch } from '../../actions';
import { Container } from 'react-bootstrap';
const SearchResult = ({videos, match, fetchSearch}) => {
    const [lastWord, setLastWord] = useState("");

    useEffect(() => {
        
    }, [match.params.words])
    
    
    if(videos.length === 0){
        console.log(videos)
        return(
            <div>
                <MySpinner/>
            </div>
        )
    }else{
        console.log(videos)
        return(
            <Container>
                <VideoList 
                    videos={videos}
                />
            </Container>
        )
    }

}

const mapStateToProps = (state) => {
    console.log( Object.values(state.videos.searchResult))
    return { videos:  Object.values(state.videos.searchResult)}
};

export default connect(mapStateToProps, { fetchSearch })(SearchResult);