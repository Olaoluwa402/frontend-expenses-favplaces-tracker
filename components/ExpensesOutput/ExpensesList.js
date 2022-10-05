import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ExpenseItem from './ExpenseItem'

function renderExpenseItem(itemData){
  return <ExpenseItem {...itemData.item}/>
}

const ExpensesList = ({expenses}) => {
  return (
    <View>
      <FlatList 
        data={expenses}
        renderItem={renderExpenseItem}
        keyExtractor={(item)=> item._id}
        // numColumns={2}
      />
    </View>
  )
}

export default ExpensesList

const styles = StyleSheet.create({})