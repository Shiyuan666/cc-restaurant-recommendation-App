import { createStore, combineReducers } from 'redux'
import user from '../reducer/user'
import error from '../reducer/error'

const rootReducer = combineReducers({user: user, error:error})

const store = createStore(rootReducer);

// const unsubscribe = store.subscribe(() => console.log(store.getState()))

export default store;