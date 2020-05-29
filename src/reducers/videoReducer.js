import _mapKeys from 'lodash/mapKeys';
import _omit from 'lodash/omit';

import {
    FETCH_POPULAR,
    FETCH_SEARCH,
    DELETE_ALL_MY_SERIES,
    FETCH_MY_SERIES,
    DELETE_SERIES
} from '../actions/types';

const INITAL_STATE = {
    popular: {},
    searchResult: {},
    mySeries: {}
};

export default (state = INITAL_STATE, action) => {
    switch(action.type){
        case FETCH_POPULAR:
            return {...state, popular: action.payload};   
        case FETCH_SEARCH:
            return {...state, searchResult: _mapKeys(action.payload, (o) => { return o.show.id; })};   
        case FETCH_MY_SERIES:
            return {...state, mySeries: _mapKeys(action.payload, (o) => { return o.id; })};
        case DELETE_ALL_MY_SERIES:
            return {...state, mySeries: {}};
        case DELETE_SERIES:
            const newMySeries = _omit(state.mySeries, action.payload);
            return {...state, mySeries: newMySeries};
        default:
            return state;
    }
}