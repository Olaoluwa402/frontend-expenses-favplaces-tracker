import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { GlobalStyles } from '../../constants/style'
import { getFormattedDate } from '../../util/date'
import { useNavigation } from '@react-navigation/native'

const ExpenseItem = ({_id,description,amount,date}) => {

    console.log(_id, description, amount, date)
    const navigation = useNavigation()
    function expressPressHandler(){ 
        navigation.navigate('ManageExpense', {
            expenseId:_id
        })
    } 
  return (
      <Pressable onPress={expressPressHandler} android_ripple style={({pressed})=> pressed && styles.pressed}>
         <View style={styles.expenseItem}>
            <View>
                <Text style={[styles.textBase, styles.description]}>{description}</Text>
                <Text style={styles.textBase}>{getFormattedDate(new Date(date))}</Text>
            </View>
            <View style={styles.amountContainer}>
                <Text style={styles.amount}>{amount.toFixed(2)}</Text>
            </View>
         </View>
      </Pressable>
  )
}

export default ExpenseItem

const styles = StyleSheet.create({
    pressed:{
        opacity:0.75,
    },
    expenseItem:{
        padding:12,
        marginVertical:8,
        backgroundColor:GlobalStyles.colors.primary500,
        flexDirection:'row',
        justifyContent:'space-between',
        borderRadius:6,
        elevation:3,
        shadowColor:GlobalStyles.colors.gray500,
        shadowOpacity:.4,
        shadowRadius:4,
        shadowOffset: {width:1,height:1}
    },
    textBase:{
        color:GlobalStyles.colors.primary50
    },
    description:{
        fontSize:16,
        fontWeight:'bold',
        marginBottom:4
    },
    amountContainer:{
        paddingHorizontal:12,
        paddingVertical:4,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:4,
        minWidth:80
    },
    amount:{
        color:GlobalStyles.colors.primary500,
        fontWeight:'bold'
    }
})