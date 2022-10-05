import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import AllExpense from "./screens/AllExpense";
import ManageExpense from "./screens/ManageExpense";
import RecentExpense from "./screens/RecentExpense";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { GlobalStyles } from "./constants/style";
import {Ionicons} from '@expo/vector-icons'
import IconButton from "./components/UI/IconButton";
import Dashboard from "./screens/Dashboard";


const Navigation = () => {
    const Stack = createNativeStackNavigator()
    const BottomTabs = createBottomTabNavigator()
    function ExpensesOverview(){
        return (
            <BottomTabs.Navigator screenOptions={({navigation}) => ({
                headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
                headerTintColor:'white',
                tabBarStyle:{backgroundColor:GlobalStyles.colors.primary500},
                tabBarActiveTintColor:GlobalStyles.colors.accent500,
                headerRight:({tintColor})=>(
                    <IconButton name='add' color={tintColor} size={26} onPress={()=>{
                        navigation.navigate('ManageExpense')
                    }}/>
                ) 
            })}>
                <BottomTabs.Screen name='RecentExpense' component={RecentExpense} options={
                    {title:"Recent Expenses", 
                    tabBarLabel:'Recent',
                    tabBarIcon:({color,size}) => <Ionicons name='hourglass' color={color} size={size}/>
                }
                }/>
                <BottomTabs.Screen name='AllExpense' component={AllExpense} options={
                    {title:"All Expenses", 
                    tabBarLabel:'All Expenses',
                    tabBarIcon:({color,size}) => <Ionicons name='calendar' color={color} size={size}/>
                }
                } />

                <BottomTabs.Screen name='dashboard' component={Dashboard} options={
                    {title:"Dashboard", 
                    tabBarLabel:'Dashboard',
                    tabBarIcon:({color,size}) => <Ionicons name='person-circle-outline' color={color} size={size}/>
                }
                } />
            </BottomTabs.Navigator>
        )
    }
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login" screenOptions={{
                headerStyle:{backgroundColor:GlobalStyles.colors.primary500},
                headerTintColor:'white'
            }}>
                <Stack.Screen name='Login' component={Login} options={{
                    title:'Login',
                    headerRight:({tintColor})=>(
                        <IconButton name='log-in-outline' color={tintColor} size={26}/>
                    ) 
                    }}/> 
                <Stack.Screen name='Register' component={Register} options={{
                    title:'Register',
                    headerRight:({tintColor})=>(
                        <IconButton name='receipt-outline' color={tintColor} size={26}/>
                    ) 
                    }}/>
                <Stack.Screen name='ManageExpense' component={ManageExpense} options={{presentation:'modal'}}/>
                <Stack.Screen name='ExpensesOverview' component={ExpensesOverview} options={{title:'Expenses Overview'}}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default Navigation