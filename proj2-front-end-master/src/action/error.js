export const ADD_ERROR = 'ADD_ERROR'
export const REMOVE_ERROR = 'REMOVE_ERROR'

export function setError(error){
    console.log(error)
    return {
        type: ADD_ERROR,
        message: error
    }
}

export function removeError(){
    return {
        type: REMOVE_ERROR
    }
}