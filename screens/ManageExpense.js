import { StyleSheet, Text, View } from 'react-native'
import React,{useLayoutEffect, useContext} from 'react'
import IconButton from '../components/UI/IconButton'
import { useDispatch, useSelector } from 'react-redux'
import { GlobalStyles } from '../constants/style'
// import { ExpenseContext } from '../ExpensesContext'
import ExpenseForm from '../components/ManageExpense/ExpenseForm'
import { createExpenseAction, updateExpenseAction} from '../redux/actions/expenseActions'

const ManageExpense = ({route, navigation}) => {
  const dispatch = useDispatch()
  const store = useSelector((state)=> state.allExpenses)
  const expenseId = route.params?.expenseId
  const isEditing = !!expenseId //converting to boolean from truthy or falsy

  const selectedExpense = store.expenses.find((expense)=> expense.id === expenseId);


  useLayoutEffect(()=>{ 
    navigation.setOptions({
      title:isEditing ? 'Edit Expense' : 'Add expense'
    })
  } ,[isEditing, navigation])

  const deleteExpenseHandler = ()=> {
      // store.deleteExpense(expenseId)
      navigation.goBack()
  }

  const cancelHandler = ()=> {
    navigation.goBack()
  }

  const confirmHandler = (expenseData)=> {
    if(isEditing){
      // store.updateExpense(expenseId, expenseData)
      dispatch(updateExpenseAction(expenseId, expenseData))
    }else{
      // store.addExpense(expenseData)
      dispatch(createExpenseAction(expenseData))
    }
    // navigation.goBack()
  }

  return (
    <View style={styles.container}>
      <ExpenseForm 
        onCancel={cancelHandler}  
        onSubmit={confirmHandler } 
        submitButtonLabel={isEditing ? 'Update':'Add'}
        defaultValues={selectedExpense}
        />
      {isEditing && (
        <View style={styles.deleteContainer}>
        <IconButton name='trash' color={GlobalStyles.colors.error500} size={26} onPress={deleteExpenseHandler}/>
        </View>
      )}
    </View>
  ) 
}

export default ManageExpense

const styles = StyleSheet.create({
  container:{
    flex:1,
    padding:24,
    backgroundColor:GlobalStyles.colors.primary800
  },
  deleteContainer:{
    marginTop:16,
    paddingTopWidth:2,
    borderTop:GlobalStyles.colors.primary200,
    alignItems:'center'
  }
})