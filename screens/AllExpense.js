import { StyleSheet, Text, View,  ActivityIndicator } from 'react-native'
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput'
import React, {useContext, usecontext,useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {myExpensesAction} from '../redux/actions/expenseActions' 
import axios from 'axios'
import Alert from '../components/UI/Alert'
import { useNavigation } from '@react-navigation/native'

const AllExpense = () => { 
  const dispatch = useDispatch();
  const navigation = useNavigation()

  const store = useSelector((state)=> state.myExpenses)
  const {loading, error, expenses} = store;

  const {userInfo} = useSelector((state)=> state.userLogin)
 

  useEffect(()=> { 
    if(userInfo && !userInfo.email){
      navigation.navigate('Login')
    }else{
      dispatch(myExpensesAction()) 
    } 

  }, [dispatch, userInfo, userInfo.email,navigation]) 

 

  return error ? (
        <Alert message={error} bgColor='red'/>
    ): loading ? (
        <ActivityIndicator size='large' color='green'/>
    ) : expenses && expenses.length > 0 ? ( 
    <ExpensesOutput  
      expenses={expenses} 
      expensesPeriod='Total'
      />
  ) : <Text style={styles.infoText}>No registered expenses found</Text>
}

export default AllExpense

const styles = StyleSheet.create({
  infoText:{
    color:'black',
    fontSize:16,
    textAlign:'center',
    marginTop:32
}
})