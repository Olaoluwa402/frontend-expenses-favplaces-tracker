import {
   MY_EXPENSE_REQUEST, MY_EXPENSE_SUCCESS, MY_EXPENSE_FAIL, MY_EXPENSE_RESET, CLEAR_ERRORS, DELETE_EXPENSE_REQUEST, DELETE_EXPENSE_SUCCESS, DELETE_EXPENSE_FAIL, DELETE_EXPENSE_RESET, GET_EXPENSE_REQUEST, GET_EXPENSE_SUCCESS, GET_EXPENSE_FAIL, GET_EXPENSE_RESET, ALL_EXPENSE_REQUEST, ALL_EXPENSE_SUCCESS, ALL_EXPENSE_FAIL, ALL_EXPENSE_RESET, UPDATE_EXPENSE_REQUEST, UPDATE_EXPENSE_SUCCESS, UPDATE_EXPENSE_FAIL, UPDATE_EXPENSE_RESET, CREATE_EXPENSE_REQUEST,CREATE_EXPENSE_SUCCESS,CREATE_EXPENSE_FAIL,CREATE_EXPENSE_RESET
} from '../constants/expenseConstants.js'

const createExpenseReducer = (state={}, action)=> {
    switch(action.type){
        case CREATE_EXPENSE_REQUEST:
            return {loading:true}
        case CREATE_EXPENSE_SUCCESS:
            return {loading:false, success:true, expense:action.payload}
        case CREATE_EXPENSE_FAIL:
            return {loading:false, error:action.payload}
        case CREATE_EXPENSE_RESET:
            return {}
        case CLEAR_ERRORS:
            return {error:null}
        default:
            return state
    }

}

const getExpenseReducer = (state={}, action)=> {
    switch(action.type){
        case GET_EXPENSE_REQUEST:
            return {loading:true}
        case GET_EXPENSE_SUCCESS:
            return {loading:false, success:true, expense:action.payload}
        case GET_EXPENSE_FAIL:
            return {loading:false, error:action.payload}
        case GET_EXPENSE_RESET:
            return {}
        case CLEAR_ERRORS:
            return {error:null}
        default:
            return state
    }

}

const myExpenseReducer = (state={expenses:[]}, action)=> {
    switch(action.type){
        case MY_EXPENSE_REQUEST:
            return {loading:true}
        case MY_EXPENSE_SUCCESS:
            return {loading:false, success:true, expenses:action.payload}
        case MY_EXPENSE_FAIL:
            return {loading:false, error:action.payload}
        case MY_EXPENSE_RESET: 
            return {}
        case CLEAR_ERRORS:
            return {error:null}
        default:
            return state
    }

}

const allExpenseReducer = (state={expenses:[]}, action)=> {
    switch(action.type){
        case ALL_EXPENSE_REQUEST:
            return {...state, loading:true}
        case ALL_EXPENSE_SUCCESS:
            return {loading:false, success:true, expenses:action.payload}
        case ALL_EXPENSE_FAIL:
            return {...state, loading:false, error:action.payload}
        case ALL_EXPENSE_RESET:
            return {}
        case CLEAR_ERRORS:
            return {...state,error:null}
        default:
            return state
    }

}

const updateExpenseReducer = (state={}, action)=> {
    switch(action.type){
        case UPDATE_EXPENSE_REQUEST:
            return {loading:true}
        case UPDATE_EXPENSE_SUCCESS:
            return {loading:false, success:true, expense:action.payload}
        case UPDATE_EXPENSE_FAIL:
            return {loading:false, error:action.payload}
        case UPDATE_EXPENSE_RESET:
            return {}
        case CLEAR_ERRORS:
            return {error:null}
        default:
            return state
    }

}

const deleteExpenseReducer = (state={}, action)=> {
    switch(action.type){
        case DELETE_EXPENSE_REQUEST:
            return {loading:true}
        case DELETE_EXPENSE_SUCCESS:
            return {loading:false, success:true, expense:action.payload}
        case DELETE_EXPENSE_FAIL:
            return {loading:false, error:action.payload}
        case DELETE_EXPENSE_RESET:
            return {}
        case CLEAR_ERRORS:
            return {error:null}
        default:
            return state
    }

}

export {
    createExpenseReducer,
    allExpenseReducer,
    getExpenseReducer,
    updateExpenseReducer,
    deleteExpenseReducer,
    myExpenseReducer
}