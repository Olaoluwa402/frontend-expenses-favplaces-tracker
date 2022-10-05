import { StyleSheet, Text, View, ImageBackground} from 'react-native'
import React from 'react'
import Login from '../components/RegisterLogin/Login'
import bgLogin from '../assets/bgLogin-2.png'

const LoginScreen = () => {
  return (
    <View style={styles.container}>
        <ImageBackground source={bgLogin} style={styles.ImgStyle} resizeMode='cover'>
            <View style={styles.innerContainer}>
        
                <Login />
            </View>
        </ImageBackground>
    </View>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
    container:{
        width:'100%',
        height:'100%',
        flex:1,
        backgroundColor:'black'
        
    },
    innerContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        padding:10,
        
    },
    ImgStyle:{
        width:'100%',
        height:'100%'
    }
})