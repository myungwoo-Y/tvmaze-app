import {SIGN_IN, SIGN_OUT } from '../actions/types';

const INITAL_STATE = {
    isSignedIn: false,
};

export default (state = INITAL_STATE,  action) => {
    switch (action.type){
        case SIGN_IN:
            return {isSignedIn: true};
        case SIGN_OUT :
            return {isSignedIn: false};
        default:
            return state;
    }
}