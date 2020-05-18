import {FETCH_POPULAR} from '../actions/types';

const INITAL_STATE = {
    popular: {},
    searchResult: {}
};

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case FETCH_POPULAR:
            return {...state, popular: action.payload};   
        default:
            return state;
    }
}