import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Navigation from './navigation';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import {store,persistor} from './redux/store'

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style='light'/>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
      {/* <Text>Hello</Text> */} 
    </View>
  );
} 

const styles = StyleSheet.create({
  container:{
    flex:1,
    justifyContent:'center'
  }
})

