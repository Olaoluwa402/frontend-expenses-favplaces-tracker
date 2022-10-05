
import {
   MY_EXPENSE_REQUEST, MY_EXPENSE_SUCCESS, MY_EXPENSE_FAIL, MY_EXPENSE_RESET, CLEAR_ERRORS, DELETE_EXPENSE_REQUEST, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_FAIL, GET_EXPENSE_REQUEST, GET_EXPENSE_SUCCESS, GET_EXPENSE_FAIL, ALL_EXPENSE_REQUEST, ALL_EXPENSE_SUCCESS, ALL_EXPENSE_FAIL, UPDATE_EXPENSE_REQUEST, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_FAIL, UPDATE_EXPENSE_RESET, CREATE_EXPENSE_REQUEST,CREATE_EXPENSE_SUCCESS,CREATE_EXPENSE_FAIL,
 } from '../constants/expenseConstants.js'

 import { logout } from './userActions.js' 
 import axios from 'axios'
const rootUrl = 'https://expenses-favplaces-tracker.herokuapp.com/'


const createExpenseAction = (expenseData) => async(dispatch, getState)=> {
    try{
        dispatch({
            type:CREATE_EXPENSE_REQUEST
        }) 

        const {userLogin} = getState();

        const config = { 
            headers: { 
            "Content-Type": "Application/json",
            authorization:`Bearer ${userLogin.userInfo.token}`
            } 
        };

        const {data} = await axios.post(`${rootUrl}/api/v1/expenses`, {expenseData}, config)

        dispatch({
            type:CREATE_EXPENSE_SUCCESS, 
            payload:data.expense 
        })
    }catch(err){  
        let message = err.message === 'Network Error' ? err.message : err.response && err.response.data.message ? err.response.data.message : err.message
        if (message === "Not authorized, token failed" || /jwt/gi.test(message)) {
            console.log('logout')
            dispatch(logout());
          }
        dispatch({
            type:CREATE_EXPENSE_FAIL,
            payload:message
        })
    }
}

const myExpensesAction = () => async(dispatch, getState)=> {
    try{
        dispatch({
            type:MY_EXPENSE_REQUEST
        })
        const {userLogin} = getState();

        const config = { 
            headers: {
            "Content-Type": "Application/json",
            authorization:`Bearer ${userLogin ? userLogin.userInfo.token : ''}`
            } 
        };
 

        const {data} = await axios.get(`${rootUrl}/api/v1/expenses/my-expenses`, config)
       
        dispatch({
            type:MY_EXPENSE_SUCCESS, 
            payload:data.expenses
        }) 
    }catch(err){
        let message = err.message === 'Network Error' ? err.message : err.response && err.response.data.message ? err.response.data.message : err.message
        if (message === "Not authorized, token failed" || /jwt/gi.test(message) ) {
            console.log('logout')
            dispatch(logout());
          }
        dispatch({
            type:MY_EXPENSE_FAIL,
            payload:message 
        })
    }
}

const allExpenseAction = () => async(dispatch, getState) => {
    try{
        dispatch({
            type:ALL_EXPENSE_REQUEST
        })

        const {userLogin} = getState();

        const config = { 
            headers: {
            "Content-Type": "Application/json",
            authorization:`Bearer ${userLogin.userInfo.token}`
            } 
        };
        const {data} = await axios.get(`${rootUrl}/api/v1/expenses`, config)
  
        dispatch({
            type:ALL_EXPENSE_SUCCESS,
            payload:data.expenses
        })  
    }catch(err){
        let message = err.message === 'Network Error' ? err.message : err.response && err.response.data.message ? err.response.data.message : err.message
    console.log('err', err)
    if (message === "Not authorized, token failed" || /jwt/gi.test(message)) {
        console.log('logout')
        dispatch(logout());
      }
        dispatch({
            type:ALL_EXPENSE_FAIL,
            payload:message
        })
    } 
}

const updateExpenseAction = (expenseId, expenseData) => async(dispatch, getState)=> {
    try{
        dispatch({
            type:UPDATE_EXPENSE_REQUEST
        })

        const {userLogin} = getState();

        const config = { 
            headers: {
            "Content-Type": "Application/json",
            authorization:`Bearer ${userLogin.userInfo.token}`
            } 
        };

        const {data} = await axios.put(`${rootUrl}/expenses/${expenseId}`, {expenseData}, config)

        dispatch({
            type:UPDATE_EXPENSE_SUCCESS,
            payload:data.expense
        })
    }catch(err){
        let message = err.message === 'Network Error' ? err.message : err.response && err.response.data.message ? err.response.data.message : err.message
        if (message === "Not authorized, token failed" || /jwt/gi.test(message)) {
            console.log('logout')
            dispatch(logout());
          }
        dispatch({
            type:UPDATE_EXPENSE_FAIL,
            payload:message
        })
    }
}


const getExpenseAction = (expenseId) => async(dispatch, getState)=> {
    try{
        dispatch({
            type:UPDATE_EXPENSE_REQUEST
        })

        const {userLogin} = getState();

        const config = { 
            headers: {
            "Content-Type": "Application/json",
            authorization:`Bearer ${userLogin.userInfo.token}`
            } 
        };

        const {data} = await axios.put(`${rootUrl}/expenses/${expenseId}`, config)

        dispatch({
            type:UPDATE_EXPENSE_SUCCESS,
            payload:data.expense
        })
    }catch(err){
        let message = err.message === 'Network Error' ? err.message : err.response && err.response.data.message ? err.response.data.message : err.message
        if (message === "Not authorized, token failed" || /jwt/gi.test(message)) {
            console.log('logout')
            dispatch(logout());
          }
        dispatch({
            type:UPDATE_EXPENSE_FAIL,
            payload:message
        })
    }
}

const deleteExpenseAction = (expenseId) => async(dispatch, getState)=> {
    try{
        dispatch({
            type:UPDATE_EXPENSE_REQUEST
        })

        const config = {
            headers: {
            "Content-Type": "Application/json",
            }
        };

        const {data} = await axios.put(`${rootUrl}/expenses/${expenseId}`, config)

        dispatch({
            type:UPDATE_EXPENSE_SUCCESS,
            payload:data.message
        })
    }catch(err){
        let message = err.message === 'Network Error' ? err.message : err.response && err.response.data.message ? err.response.data.message : err.message
        if (message === "Not authorized, token failed" || /jwt/gi.test(message)) {
            console.log('logout')
            dispatch(logout());
          }
        dispatch({
            type:UPDATE_EXPENSE_FAIL,
            payload:message
        })
    }
}

export {
    createExpenseAction,
    updateExpenseAction,
    getExpenseAction,
    allExpenseAction,
    deleteExpenseAction,
    myExpensesAction
}