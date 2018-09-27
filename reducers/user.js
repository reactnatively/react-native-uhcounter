import { SET_USER, REMOVE_USER, STORE_LOCATION } from '../actions/types';

const INITIAL_USER = {
    userLogin : false,
    userID : '',
    location: '',
    user:{}
};

const userReducer = (state = INITIAL_USER, action) => {

    console.log('in user reducer');

    switch (action.type) {

    case SET_USER:
        console.log('Set user Reducer :', action.payload);
        state = Object.assign({}, state, { user: action.payload, userLogin:true });
        //return { ...INITIAL_USER, ...action.payload };
        return state;

    case STORE_LOCATION:
        console.log('updating location')
        state = Object.assign({}, state, { location: action.payload });
        return state;

    case REMOVE_USER:
        return { ...INITIAL_USER };

    default:
        return state;
    }
};

export default userReducer;
