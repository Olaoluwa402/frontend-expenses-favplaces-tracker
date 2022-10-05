import { StyleSheet, Text, View, ActivityIndicator } from 'react-native'
import React, {useContext,useEffect, useLayoutEffect} from 'react'
import { useNavigation } from '@react-navigation/native'
import { useSelector, useDispatch } from 'react-redux'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import { getDateMinusDays } from '../util/date'
import {myExpensesAction} from '../redux/actions/expenseActions' 
import { CLEAR_ERRORS } from '../redux/constants/expenseConstants'
import Alert from '../components/UI/Alert'


const RecentExpense = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const store = useSelector((state)=> state.myExpenses)
  const {loading, error,expenses} = store;
  const {userInfo} = useSelector((state)=> state.userLogin)

  useEffect(()=> { 
    if(!userInfo && !userInfo.email){
      navigation.navigate('Login')
    }else{
      dispatch(myExpensesAction()) 
    }

  }, [dispatch, userInfo, userInfo.email, navigation]) 
 
 

  function recentExpenses(expenses){
     const result = expenses.filter((expense)=> {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);
        return new Date(expense.date) >= date7DaysAgo && (new Date(expense.date) <= today);
      })
   
      return result
  }


  return error ? (
        <Alert message={error} bgColor='red'/>
    ): loading ? (
        <ActivityIndicator size='large' color='green'/>
    ) : expenses && expenses.length > 0  ? ( 
    <ExpensesOutput 
      expenses={recentExpenses(expenses)} 
      expensesPeriod='Last 7 Days'
      />
  ) : <Text style={styles.infoText}>No expenses registered in the last 7 days</Text>
} 

export default RecentExpense

const styles = StyleSheet.create({
  infoText:{
    color:'black',
    fontSize:16,
    textAlign:'center',
    marginTop:32
}
})