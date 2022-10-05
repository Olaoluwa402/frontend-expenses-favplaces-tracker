import { ActivityIndicator, StyleSheet, Text, View,  } from 'react-native'
import ExpensesList from './ExpensesList'
import React from 'react'
import ExpensesSummary from './ExpensesSummary'
import { GlobalStyles } from '../../constants/style'
import Alert from '../UI/Alert'

ActivityIndicator
const ExpensesOutput = ({expenses,expensesPeriod}) => {
    console.log(expenses)
    
  return  (
            <View style={styles.container}>
                <ExpensesSummary expenses={expenses} periodName={expensesPeriod}/>
                 <ExpensesList expenses={expenses}/>
            </View>
        ) 
}

export default ExpensesOutput
 
const styles = StyleSheet.create({
    container:{
        flex:1, 
        paddingHorizontal:24,
        paddingTop:24,
        paddingBottom:0,
        backgroundColor:GlobalStyles.colors.primary700
    },
})