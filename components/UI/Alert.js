import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Alert = ({message, bgColor}) => {
  return (
    <View style={styles.wrapper}>
        <View style={[styles.container, {backgroundColor:bgColor}]}>
            <Text style={styles.text}>{message}</Text>
        </View>
    </View>
  )
}

export default Alert

const styles = StyleSheet.create({
    wrapper:{
        justifyContent:'center',
        alignItems:'center'
    },
    container:{
        width:'100%',
        maxWidth:260,
        paddingHorizontal:10,
        paddingVertical:10,
        marginVertical:10,
        borderRadius:10,
        backgroundColor:'red'
    },
    text:{
        color:'white'
    }
})