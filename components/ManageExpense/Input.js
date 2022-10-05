import { StyleSheet, Text, TextInput,View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/style'

const Input = ({label,inValid,textInputConfig, style}) => {

    let inputStyle = [styles.input]
    if(textInputConfig && textInputConfig.multiline){
        inputStyle.push(styles.inputMultipleline)
    }

    if(inValid){
        inputStyle.push(styles.invalidInput)
    }
  return (
    <View style={[styles.inputContainer, style]}>
      <Text style={[styles.label, inValid && styles.invalidLabel]}>{label}</Text>
      <TextInput {...textInputConfig} style={inputStyle}/>
    </View>
  )
}

export default Input

const styles = StyleSheet.create({
    inputContainer:{
        marginHorizontal:4,
        marginVertical:0,
        padding:8,
    },
    label:{
        fontSize:14,
        color:GlobalStyles.colors.primary100,
        marginBottom:4
    },
    input:{
        backgroundColor:GlobalStyles.colors.primary100,
        color:GlobalStyles.colors.primary700,
        padding:8,
        borderRadius:6,
        fontSize:16
    },
    inputMultipleline:{
        minHeight:100,
        textAlignVertical:'top'
    },
    invalidLabel:{
        color:GlobalStyles.colors.error500,
    },
    invalidInput:{
        backgroundColor:GlobalStyles.colors.error50
    }
})