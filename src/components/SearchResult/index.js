import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import VideoList from '../VideoList';
import { fetchSearch } from '../../actions';
const SearchResult = ({videos, match, fetchSearch}) => {
    // useEffect(() => {
    //     if(videos.length == 0){
    //         fetchSearch(match.params.word)
    //         console.log("empty ", match.params.word)
    //     }
    // }, [])
    console.log(videos)
    return(
        <div>
            <VideoList 
                videos={videos}
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    console.log( Object.values(state.videos.searchResult))
    return { videos:  Object.values(state.videos.searchResult)}
};

export default connect(mapStateToProps, { fetchSearch })(SearchResult);