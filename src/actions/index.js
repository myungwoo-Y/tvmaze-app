import { 
    FETCH_POPULAR
} from './types';

export const fetchPopular = () => async (dispatch) => {
    dispatch({type: FETCH_POPULAR, payload: {popular : 1}});
};
