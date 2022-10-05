import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const Title = ({children, mb, color}) => {
  return (
    <View style={[styles.container, {marginBottom:mb}]}>
      <Text style={[styles.text, {color:color}]}>{children}</Text>
    </View>
  )
}

export default Title

const styles = StyleSheet.create({
    container:{},
    text:{
        fontSize:30,
        fontWeight:'bold',
        textAlign:'center'
    }
})