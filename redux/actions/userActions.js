import axios from 'axios'
import {
    CREATE_USER_REQUEST,
    CREATE_USER_SUCCESS,
    CREATE_USER_FAIL,
    LOGIN_USER_REQUEST,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    CLEAR_ERRORS,
    USER_LOGOUT
} from '../constants/userConstants.js'
import AsyncStorage from '@react-native-async-storage/async-storage';

const rootUrl = `https://expenses-favplaces-tracker.herokuapp.com/`

const userLoginAction = (emailOrUsername, password) => async(dispatch, getState)=> {
    try{
        dispatch({
            type:LOGIN_USER_REQUEST
        }) 

        const config = { 
            headers: { 
            "Content-Type": "Application/json",
            }
        }; 
  console.log(emailOrUsername, password, 'shoew')
        const {data} = await axios.post(`${rootUrl}`, {emailOrUsername,password}, config)

        dispatch({
            type:LOGIN_USER_SUCCESS,
            payload:data.user
        })
    }catch(err){
        console.log(err)
        let message = err.message === 'Network Error' ? err.message : err.response && err.response.data.message ? err.response.data.message : err.message

        dispatch({
            type:LOGIN_USER_FAIL,
            payload:message
        })
    }
}



const createUserAction = (email, username, password) => async(dispatch, getState)=> {
    try{
        dispatch({
            type:CREATE_USER_REQUEST
        })

        const config = { 
            headers: { 
            "Content-Type": "Application/json",
            } 
        };

        const {data} = await axios.post(`${rootUrl}/api/v1/users/register`, {email,username,password}, config)

        dispatch({ 
            type:CREATE_USER_SUCCESS,
            payload:data.user
        })
    }catch(err){
        let message = err.message === 'Network Error' ? err.message : err.response && err.response.data.message ? err.response.data.message : err.message

        dispatch({
            type:CREATE_USER_FAIL,
            payload:message
        })
    }
}

const logout = () => async (dispatch) => {
    try{
        dispatch({ type: USER_LOGOUT });
    }catch(err){
        console.log(err)
    };
  };

export {
    logout,
    userLoginAction,
    createUserAction
}