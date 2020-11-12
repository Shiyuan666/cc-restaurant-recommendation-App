export const INIT_USER = "INIT_USER"
export const GET_POSITION = "GET_POSITION"

export function initUser(user){
    return {
        type:INIT_USER,
        userID:user.id,
        userName:user.username
    }
}

export function getPosition(position){
    return {
        type:GET_POSITION,
        position:position
    }
}