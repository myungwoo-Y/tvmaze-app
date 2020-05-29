import videos from'../apis/videos'
import history from '../history';
import firbase from '../firebase';
import { 
    FETCH_POPULAR,
    FETCH_SEARCH,
    SIGN_IN,
    SIGN_OUT,
    DELETE_ALL_MY_SERIES,
    FETCH_MY_SERIES,
    DELETE_SERIES,
    ADD_SERIES
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

export const fetchMySeries = () => async (dispatch) => {
    await firbase.getAllSeries()
        .then(response=>{
            dispatch({type: FETCH_MY_SERIES, payload: response});
        });
}

export const deleteAllMySeries = () => {
    return{
        type: DELETE_ALL_MY_SERIES
    };
};

export const deleteSeries = (seriesId) => {
    return{
        type: DELETE_SERIES,
        payload: seriesId
    };
};

export const addSeries = (seriesId) => {
    return{
        type: ADD_SERIES
    };
};

export const signIn = () => {
    return{
        type: SIGN_IN
    };
};

export const signOut = () => {
    return{
        type: SIGN_OUT
    };
};


