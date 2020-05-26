import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import VideoList from '../VideoList';
import { fetchSearch } from '../../actions';
import { Container } from 'react-bootstrap';
const SearchResult = ({videos, match, fetchSearch}) => {
    useEffect(() => {
        if(videos.length === 0){
            fetchSearch(match.params.word)
        }
    }, [])
    
    return(
        <Container>
            <VideoList 
                videos={videos}
            />
        </Container>
    )
}

const mapStateToProps = (state) => {
    console.log( Object.values(state.videos.searchResult))
    return { videos:  Object.values(state.videos.searchResult)}
};

export default connect(mapStateToProps, { fetchSearch })(SearchResult);