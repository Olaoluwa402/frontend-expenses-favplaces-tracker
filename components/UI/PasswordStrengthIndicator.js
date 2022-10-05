import React from "react";
import {StyleSheet, View,Text} from 'react-native'

const PasswordStrengthIndicator = ({
    validity: { minChar, number, specialChar, pwMatched }
}) => {

    
    return (
        <View style={[styles.passwordMeter, styles.textLeft, styles.mb4]}>
            <Text style={{color:'#333333', fontSize:12}}>Strong password must:</Text>
            <View style={styles.textMuted}>
                <PasswordStrengthIndicatorItem
                    isValid={minChar}
                    text="Have at least 8 characters"
                /> 
                <PasswordStrengthIndicatorItem
                    isValid={number}
                    text="Have at least 1 number"
                />
                <PasswordStrengthIndicatorItem
                    isValid={specialChar}
                    text="Have at least 1 special character"
                />
                {/* <PasswordStrengthIndicatorItem 
                    isValid={pwMatched}
                    text="Password matched with confirm password"
                /> */}
            </View>
        </View>
    );
};

const PasswordStrengthIndicatorItem = ({ isValid, text }) => {
    // console.log('validity', isValid)
    // const highlightClass = isValid
    //     ? "textSuccess"
    //     : isValid !== null
    //     ? "textDanger"
    //     : "";
    return <Text style={[styles.text, {color:isValid ? 'green' : 'red'}]}>{text}</Text>;
};

export default PasswordStrengthIndicator;

const styles = StyleSheet.create({
    passwordMeter:{
        padding:10,
        backgroundColor:'white',
        borderRadius:5
    },
    textLeft:{

    },
    mb4:{

    },
    textMuted:{
        fontSize:12,
        color:'#f3f3f3'
    },
    text:{
            fontWeight:'bold'
    },
    // textSuccess:{
    //     color:'green',
    // },
    // textDanger:{
    //     color:'red'
    // },
    textDark:{
        color:'#333333'
    }
})