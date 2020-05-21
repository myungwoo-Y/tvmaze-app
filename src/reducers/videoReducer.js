import _ from 'lodash';
import {
    FETCH_POPULAR,
    FETCH_SEARCH
} from '../actions/types';

const INITAL_STATE = {
    popular: {},
    searchResult: {}
};

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case FETCH_POPULAR:
            return {...state, popular: action.payload};   
        case FETCH_SEARCH:
            return {...state, searchResult: _.mapKeys(action.payload, (o) => { return o.show.id; })};   
        default:
            return state;
    }
}