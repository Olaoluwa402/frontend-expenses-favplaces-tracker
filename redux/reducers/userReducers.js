import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    CREATE_USER_RESET,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    LOGIN_USER_RESET,
    CLEAR_ERRORS,
    USER_LOGOUT
} from '../constants/userConstants.js'


const intialState = {
        userInfo:{}
}

const userLoginReducer = (state=intialState, action) => {
    switch(action.type){
     case LOGIN_USER_REQUEST:
        return {loading:true}
    case LOGIN_USER_SUCCESS:
        return {loading:false, success:true, userInfo:action.payload}
    case LOGIN_USER_FAIL:
        return {loading:false,error: action.payload}
    case LOGIN_USER_RESET:
        return {userInfo:{}}
    case USER_LOGOUT:
        return {userInfo:{}}
    case CLEAR_ERRORS:
     return {...state,error: null}
     default:
        console.log('state',state)
        return state
    }
}

const createUserReducer = (state={}, action) => {
    switch(action.type){
     case CREATE_USER_REQUEST:
        return {...state, loading:true}
    case CREATE_USER_SUCCESS:
        return {...state,loading:false, success:true, user:action.payload}
    case CREATE_USER_FAIL:
        return {...state,loading:false,error: action.payload}
    case CREATE_USER_RESET:
        return {}
    case CLEAR_ERRORS:
     return {...state,error: null}
     default:
        return state
    }
}



export {
    userLoginReducer,
    createUserReducer
}