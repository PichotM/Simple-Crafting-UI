import {createStore, combineReducers} from 'redux'

import editorReducer from './reducer'

const reducers = combineReducers({
    craft: editorReducer
})

const store = createStore(reducers)

export default store