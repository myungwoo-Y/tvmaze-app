import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
import authReducer from './authReducer';

export default combineReducers({
    auth: authReducer,
    videos : videoReducer
})