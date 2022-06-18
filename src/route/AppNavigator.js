import { View, Text } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { NavigationContainer } from '@react-navigation/native';
import Splash from '../screen/Splash';
import Login from '../screen/Login';
import Register from '../screen/Register';
import WelcomeLogistic from '../screen/WelcomeLogistic';
import AllLoad from '../screen/AllLoad';
import TrackYourDelivery from '../screen/TrackYourDelivery';
import ConfirmationPage from '../screen/ConfirmationPage';
import IncomingLoad from '../screen/IncomingLoad';
import 'react-native-gesture-handler';
import { createDrawerNavigator, DrawerContent } from '@react-navigation/drawer';


 const DrawerNavigation=() =>{
    return (
        <>
           <Drawer.Navigator >
           <Drawer.Screen name="LoginScreen" component={LoginScreen} />
         <Drawer.Screen name="SignupScreen" component={SignupScreen} />
         {/* <Drawer.Screen name="Login" component={Login} /> */}
         <Drawer.Screen name="AdminScreen" component={AdminScreen} />
             {/* <Drawer.Screen name="Notifications" component={NotificationsScreen} /> */}
            </Drawer.Navigator> 
        </>
    )
}


const AppDrawer   = createDrawerNavigator();



const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator
      // drawerContent={(props) => <DrawerContent {...props} 
      // />}
    >
      
      <Stack.Screen name="welcomeLogistic" component={WelcomeLogistic} />

    
    </AppDrawer.Navigator>
  );
}

const WelcomeStack =()=>{
  return(
    
    <Stack.Navigator>
                <Stack.Screen name="welcomeLogistic" component={WelcomeLogistic} />


                </Stack.Navigator>
  )
}

const AppNavigator = () => {


    const Stack = createNativeStackNavigator()
  return (
    // <View>
    //   <Text>AppNavigator</Text>
    // </View>
    <Stack.Navigator>
                <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="login" component={Login} />
        <Stack.Screen name="register" component={Register} />
        <Stack.Screen name="AppDrawerScreen" component={AppDrawerScreen} />
        <Stack.Screen name="allLoad" component={AllLoad} />
        <Stack.Screen name="trackyourDelivery" component={TrackYourDelivery} />
        <Stack.Screen name="confirmationPage" component={ConfirmationPage} />
        <Stack.Screen name="incomingLoad" component={IncomingLoad} />


    </Stack.Navigator>
  )
}

export default AppNavigator