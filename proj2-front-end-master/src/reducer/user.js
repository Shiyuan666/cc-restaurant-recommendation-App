import {INIT_USER, GET_POSITION} from '../action/user'

function user(state={}, action){
    switch(action.type){
        case INIT_USER:
            return {
                userID: action.userID,
                userName: action.userName,
                position:{
                    latitude:'40',
                    longitude:'-77',
                }
            }
        case GET_POSITION:
            return {
                ...state,
                position: action.position
            }
        default:
            return state;
    }
}

export default user