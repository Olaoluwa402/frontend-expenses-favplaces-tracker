import { StyleSheet, Text, View, KeyboardAvoidingView, ActivityIndicator} from 'react-native'
import Button from '../UI/Button'
import React, {useState, useEffect} from 'react'
import { useDispatch } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import Input from './Input'
import { getFormattedDate } from '../../util/date'
import { useSelector } from 'react-redux' 
import {CREATE_EXPENSE_RESET} from '../../redux/constants/expenseConstants'
import { GlobalStyles } from '../../constants/style'
import Alert from '../UI/Alert'
 
const ExpenseForm = ({onCancel,onSubmit, submitButtonLabel,defaultValues}) => {
    const navigate = useNavigation()
    const dispatch = useDispatch()
    const {loading, error, success} = useSelector((state)=> state.createExpense )
    const [inputs,setInputs] = useState({
        amount:{
            value:defaultValues ? defaultValues.amount.toString() : '',
            isValid:true// !!defaultValues  if defaultValues is provided, it sets a truthy value else it sets a falsy value
        },
        date:{ 
            value:defaultValues ? getFormattedDate(new Date(defaultValues.date)) : '', 
            isValid:true
        }, 
        description:{
            value:defaultValues ? defaultValues.description : '',
            isValid:true
    }
    })

  useEffect(()=> {
    if(success){
        dispatch({type:CREATE_EXPENSE_RESET})
        navigate.goBack()
    }
  }, [success])


    function inputChangeHandler(inputIdentifier, inputValue){
        setInputs((curInputs)=> {
            return {
                ...curInputs,
                [inputIdentifier]:{value:inputValue, isValid:true}
            }
        })
    }

    
  function submitHandler(){
    const expenseData = {
        amount:+inputs.amount.value,
        date:new Date(inputs.date.value),
        description:inputs.description.value
    }

    //validation
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== 'Invalid Date';
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if(!amountIsValid || !dateIsValid || !descriptionIsValid){
        setInputs((curInputs)=> {
            return {
                amount:{value:curInputs.amount.value, isValid: amountIsValid},
                date:{value:curInputs.date.value, isValid: dateIsValid},
                description:{value:curInputs.description.value, isValid: descriptionIsValid}
            }
        })
        return;
    }
    onSubmit(expenseData);
}

const formIsInvalid = !inputs.amount.value || !inputs.date.value || !inputs.description.value


  return (
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    style={styles.container}
    >
        <View style={styles.form}>
        <Text style={styles.title}>Your Expense</Text>
        <View style={styles.inputsRow}>
            <Input 
                label='Amount' 
                inValid={!inputs.amount.isValid}
                textInputConfig={{
                keyboardType:'decimal-pad',
                onChangeText:inputChangeHandler.bind(this, 'amount'),
                value:inputs.amount.value
            }
            }
            style={styles.rowInput}
            />
            <Input label='Date' 
             inValid={!inputs.date.isValid}
            textInputConfig={{
                    placeholder:'YYYY-MM-DD',
                    maxLength:10,
                    onChangeText:inputChangeHandler.bind(this,'date'),
                    value:inputs.date.value
                }  
                }
                style={styles.rowInput}
                />
        </View>
     
     <Input label='Description' 
             inValid={!inputs.description.isValid}
            textInputConfig={{
            multiline:true,
            onChangeText:inputChangeHandler.bind(this,'description'),
            value:inputs.description.value
        }  
        }/>

        {formIsInvalid && <Text style={styles.errorText}>Invalid Input values - Please check your entered data</Text>}
        {loading && <ActivityIndicator color='white' size='large'/>}
        {error && <Alert message={error} bgColor='red'/>}
        <View style={styles.buttons}>
            <Button style={styles.button} mode='flat' onPress={onCancel}>Cancel</Button>
            <Button style={styles.button} onPress={submitHandler}>{submitButtonLabel}</Button>
        </View>
    </View>
    </KeyboardAvoidingView>
    
  )
}

export default ExpenseForm

const styles = StyleSheet.create({
   
    form:{
        marginTop:40
    },
    title:{
        fontSize:18,
        fontWeight:'bold',
        color:'white',
        marginVertical:24,
        textAlign:'center'
    },
    inputsRow:{
        flexDirection:'row',
        justifyContent:'space-between'
    },
    rowInput:{
        flex:1
    },
    buttons:{
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center'
      },
      button:{
        minWidth:120,
        marginHorizontal:8
      },
      errorText:{
        textAlign:'center',
        margin:8,
        color:GlobalStyles.colors.error500
      }
})