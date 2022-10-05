import { StyleSheet, Text, View, ImageBackground, ActivityIndicator } from 'react-native'
import React,{useState, useEffect} from 'react'
import Input from '../ManageExpense/Input'
import Button from '../UI/Button'
import {useDispatch, useSelector} from 'react-redux'
import Alert from '../UI/Alert' 
import {createUserAction} from '../../redux/actions/userActions'
import { emailRegex, isNumberRegx, specialCharacterRegx} from '../../util/regex'
import PasswordStrengthIndicator from '../UI/PasswordStrengthIndicator'
import { useNavigation } from '@react-navigation/native'
import Title from '../UI/Title'

const Register = () => {
    const dispatch = useDispatch()
    const navigation = useNavigation()
    const {loading, error,success, user} = useSelector((state)=> state.createUser)
   
    const [inputs,setInputs] = useState({
        email:{
            value: '',
            isValid:true
        },
        username:{ 
            value:'', 
            isValid:true
        }, 
        password:{
            value: '',
            isValid:true
    },
    })
 
    const [passwordFocused, setPasswordFocused] = useState(false);
    const [passwordValidity, setPasswordValidity] = useState({
        minChar: null,
        number: null,
        specialChar: null,
        // pwMatched: null,
    });

    useEffect(()=> {
        if(success){
            navigation.navigate('Login')
        }
    },[success])


    function inputChangeHandler(inputIdentifier, inputValue){
        setInputs((curInputs)=> {
            return {
                ...curInputs,
                [inputIdentifier]:{value:inputValue, isValid:true}
            }
        })

        // validate password
        setPasswordValidity({
            minChar: inputs.password.value.length >= 8 ? true : false,
            number: isNumberRegx.test(inputs.password.value) ? true : false,
            specialChar: specialCharacterRegx.test(inputs.password.value) ? true : false,
            // pwMatched: false,
          });
    }

    const registerHandler = () => {
        //validation
        const emailIsValid =  emailRegex.test(inputs.email.value);
        const usernameIsValid = inputs.username.value.trim().length > 0;;
        const passwordIsValid = inputs.password.value.trim().length > 0;
        // const confirmPasswordIsValid = inputs.confirmPassword.value.trim().length > 0;

        if(!emailIsValid|| !usernameIsValid  || !passwordIsValid ){
            setInputs((curInputs)=> {
                return {
                    email:{value:curInputs.email.value, isValid: emailIsValid},
                    username:{value:curInputs.username.value, isValid: usernameIsValid},
                    password:{value:curInputs.password.value, isValid: passwordIsValid},
                    // confirmPassword:{value:curInputs.confirmPassword.value, isValid: confirmPasswordIsValid}
                }
            }) 
            return;
        }
        dispatch(createUserAction(inputs.email.value, inputs.username.value, inputs.password.value))
        
        setInputs({
            email:{ 
                value:'', 
                isValid:true
            }, 
            username:{ 
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
            label='Email' 
            inValid={!inputs.email.isValid}
            textInputConfig={{
            onChangeText:inputChangeHandler.bind(this, 'email'),
            value:inputs.email.value,
            placeholder:'enter email',
        }}/>

        <Input 
            label='Username' 
            inValid={!inputs.username.isValid}
            textInputConfig={{
            onChangeText:inputChangeHandler.bind(this, 'username'),
            value:inputs.username.value,
            placeholder:'enter username',
        }}/>
       
    
        <Input 
            label='Password' 
            inValid={!inputs.password.isValid}
            style={{minWidth:350}}
            textInputConfig={{ 
                type:'password',
            placeholder:'enter password',
            onFocus:() => setPasswordFocused(true),
            onChangeText:inputChangeHandler.bind(this, 'password'),
            value:inputs.password.value
        }}/>

        {passwordFocused && (<PasswordStrengthIndicator validity={passwordValidity}/>)}
        {error && <Alert message={error} bgColor='red'/>}
        {loading ? <ActivityIndicator color='white' size='large'/> : (<Button style={{marginTop:10,paddingHorizontal:10}} onPress={registerHandler}>Register</Button>)}


        <Text style={styles.regLogText} onPress={()=> navigation.navigate('Login')}>Login instead ?</Text>
        
    </View>
  )
}

export default Register

const styles = StyleSheet.create({
    container:{
        // flex:1
        overlay:{
            width:'100%',
            height:'100%',
            position:'absolute',
            top:0,
            left:0,
            right:0,
            bottom:0,
            zIndex:1,
            backgroundColor:'black',
            opacity:0.5
        },
    },
    regLogText:{
        color:'white', fontSize:22, fontWeight:'bold', marginTop:20
    }
})