import {createStore, applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers/index'

import { persistStore} from 'redux-persist';


const middleware = [thunk];


export const store =createStore(rootReducer, applyMiddleware(...middleware))
export const persistor = persistStore(store);