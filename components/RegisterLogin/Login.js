import { StyleSheet, Text, View,ActivityIndicator} from 'react-native'
// import AsyncStorage from '@react-native-async-storage/async-storage';
import React,{useEffect, useState} from 'react'
import Input from '../ManageExpense/Input'
import Button from '../UI/Button'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '../UI/Alert' 
import { userLoginAction} from '../../redux/actions/userActions'
import { useNavigation } from '@react-navigation/native'
import Title from '../UI/Title'

const Login = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {loading, error, success,userInfo} = useSelector((state)=> state.userLogin)
    const [inputs,setInputs] = useState({
        emailOrUsername:{ 
            value:'', 
            isValid:true
        }, 
        password:{
            value: '',
            isValid:true
    }, 
    })


    useEffect(()=> {
        if(userInfo && userInfo.email){
            navigation.navigate('ExpensesOverview')
        }
    },[userInfo])

    // const storeUser = async (value) => {
    //     try {
    //       await AsyncStorage.setItem('userInfo', JSON.stringify(value))
          
    //     } catch (err) {
    //       // saving error
    //       console.log(err)
    //     }
    //   }


    function inputChangeHandler(inputIdentifier, inputValue){
        setInputs((curInputs)=> {
            return {
                ...curInputs,
                [inputIdentifier]:{value:inputValue, isValid:true}
            }
        })
    }

    const loginHandler = () => {
        //validation
        const emailOrUsernameIsValid = inputs.emailOrUsername.value.trim().length > 0;;
        const passwordIsValid = inputs.password.value.trim().length > 0;
        

        if(!emailOrUsernameIsValid || !passwordIsValid ){
            setInputs((curInputs)=> {
                return {
                    emailOrUsername:{value:curInputs.emailOrUsername.value, isValid: emailOrUsernameIsValid},
                    password:{value:curInputs.password.value, isValid: passwordIsValid},
                }
            })
            return;
        }
        dispatch(userLoginAction(inputs.emailOrUsername.value, inputs.password.value))

        setInputs({
            emailOrUsername:{ 
                value:'', 
                isValid:true
            }, 
            password:{
                value: '',
                isValid:true
        }, 
        })
    }

  return (
    <View style={styles.container}>
        <Title mb={10} color='white'>Track Your Expenses & Favorite Places</Title>
       <Input 
            label='Email/Username' 
            inValid={inputs.emailOrUsername.isValid}
            style={{minWidth:350}}
            textInputConfig={{
             type:'text',
            placeholder:'enter email or username',
            onChangeText:inputChangeHandler.bind(this, 'emailOrUsername'),
            value:inputs.emailOrUsername.value
        }}/>
        
        <Input 
            label='Password' 
            inValid={!inputs.password.isValid}
            style={{minWidth:350}}
            textInputConfig={{ 
                type:'password',
            placeholder:'enter password',
            onChangeText:inputChangeHandler.bind(this, 'password'),
            value:inputs.password.value
        }}/>

        {error && <Alert message={error} bgColor='red'/>}
        {loading ? <ActivityIndicator color='white' size='large'/> : (<Button style={{marginTop:10, paddingHorizontal:10}} onPress={loginHandler}>Login</Button>)}
    

         <Text style={styles.regLogText} onPress={()=>navigation.navigate('Register')}>Register instead ?</Text>
        

    </View>
  )
}

export default Login

const styles = StyleSheet.create({
    container:{
        // flex:1
        position:'relative',
        zIndex:3
    },
   
    regLogText:{
        color:'white', fontSize:22, fontWeight:'bold', marginTop:20
    }
})