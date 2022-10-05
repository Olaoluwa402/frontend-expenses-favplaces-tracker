import { combineReducers } from "redux";
import {userLoginReducer,createUserReducer} from './userReducers'
import {myExpenseReducer, createExpenseReducer,allExpenseReducer,updateExpenseReducer,getExpenseReducer,deleteExpenseReducer} from './expenseReducers'
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';

//persist configuration 
const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['userInfo']
  };

const rootReducer = combineReducers({
    userLogin:persistReducer(persistConfig,userLoginReducer),
    createUser:createUserReducer,
    createExpense:createExpenseReducer,
    myExpenses:myExpenseReducer,
    allExpenses:allExpenseReducer,
    getExpense:getExpenseReducer,
    updateExpense:updateExpenseReducer,
    deleteExpense:deleteExpenseReducer
})

export default rootReducer;