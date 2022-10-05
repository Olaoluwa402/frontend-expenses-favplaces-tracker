import { StyleSheet, Text, View, ImageBackground} from 'react-native'
import React from 'react'
import Register from '../components/RegisterLogin/Register'
import bgLogin from '../assets/bgLogin-2.png'

const RegisterScreen = () => {
  return (
    <View style={styles.container}>
        <View style={styles.overlay}>
    </View>
        <ImageBackground source={bgLogin} style={styles.ImgStyle} resizeMode='cover'>
            <View style={styles.innerContainer}>
                <Register />
            </View>
        </ImageBackground>
    </View>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({
    container:{
        width:'100%',
        flex:1,
        backgroundColor:'black'
    },
    innerContainer:{
        width:'100%',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    ImgStyle:{
        width:'100%',
        height:'100%'
    }
})