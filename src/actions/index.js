import videos from'../apis/videos'
import history from '../history';
import { 
    FETCH_POPULAR,
    FETCH_SEARCH
} from './types';

export const fetchPopular = () => async (dispatch) => {
    dispatch({type: FETCH_POPULAR, payload: {popular : 1}});
};

export const fetchSearch = (keyword) => async (dispatch) => {
    await videos.get(`/search/shows?q=${keyword}`)
        .then(response=>{
            dispatch({type: FETCH_SEARCH, payload: response.data});
            history.push(`/search/${keyword}`);
        })
}

