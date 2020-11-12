import {ADD_ERROR, REMOVE_ERROR} from '../action/error'

function error(state={}, action){
    switch (action.type){
        case ADD_ERROR:
            return {
                message: action.message
            };
        case REMOVE_ERROR:
            return {}
        default:
            return state
    }
}

export default error