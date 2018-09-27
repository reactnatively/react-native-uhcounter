import {SET_USER,REMOVE_USER,STORE_LOCATION} from './types';

function setUser(user) {
    // console.log('user Action ');
    return (dispatch) => {dispatch({type: SET_USER, payload:user})};
}

function removeUser(user) {
    // console.log('get allUsers ');
    return (dispatch) => {dispatch({type: REMOVE_USER, payload:user })};
}

function setLocation(location) {

     console.log('setting location ');
    return (dispatch) => {dispatch({type: STORE_LOCATION, payload:location })};
}

export { setUser,removeUser,setLocation };