import  React,{useEffect} from "react";
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "./Drawer";
import Splash from '../screen/Splash';
import Login from '../screen/Login';
import Register from '../screen/Register';
// import Welcome from '../screen/Welcome';
import WelcomeLogistic from '../screen/WelcomeLogistic';
// import CreateLoad from '../screen/CreateLoad';
import Maps from '../screen/Maps';
import AllLoad from '../screen/AllLoad';
import TrackYourDelivery from '../screen/TrackYourDelivery';
// import TrackYourLoad from '../screen/TrackYourLoad';
import ForgetPass from '../screen/ForgetPass';
import VerificationCode from '../screen/VerificationCode';
import ChangePass from '../screen/ChangePass';
import ConfirmationPage from '../screen/ConfirmationPage';
import Profile from "../screen/Profile";
import MyLocation from "../screen/MyLocation";
import AppConstance from "../constance/AppConstance";
import IncomingLoad from "../screen/IncomingLoad";
import messaging from '@react-native-firebase/messaging';
import notifee , { EventType }from '@notifee/react-native';
import Setting from "../screen/Setting";
import Contact from "../screen/Contact";

const Stack = createStackNavigator();
const AppDrawer = createDrawerNavigator();


const AppDrawerScreen = () => {
  return (
    <AppDrawer.Navigator
      drawerContent={(props) => <DrawerContent {...props} />}
    >
      <AppDrawer.Screen
        name="welcomeLogistic"
        component={WelcomeLogistic} 
        options={{ headerShown: false }}
      />
   {/* <AppDrawer.Screen
        name="createLoad"
        component={CreateLoad}
        options={{ headerShown: false }}  
      /> */}


         <AppDrawer.Screen
        name="maps"
        component={Maps}
        options={{ headerShown: false }}
      />

    

      
      <Stack.Screen
        name="mylocation"
        component={MyLocation}
        options={{ headerShown: false }}
      />
    
   <Stack.Screen
        name="map"
        component={Maps}
        options={{ headerShown: false }}
      />
    </AppDrawer.Navigator>
  );
};

const WelcomeStack = () => {
  
  return (
    <Stack.Navigator>
        <Stack.Screen name="Splash" component={Splash} options={{
          headerShown: false
        }} />
        <Stack.Screen name="login" component={Login} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="register" component={Register} options={{
          headerShown: false
        }}/>
         <Stack.Screen name="forgetPass" component={ForgetPass}options={{
          headerShown: false
        }} />
        <Stack.Screen name="verificationCode" component={VerificationCode} options={{
          headerShown: false
        }}/>
          <Stack.Screen name="confirmationPage" component={ConfirmationPage} options={{
          headerShown: false
        }}/>
        <Stack.Screen name="changePass" component={ChangePass}options={{
          headerShown: false
        }} />

    </Stack.Navigator>
  );
};

const AppNavigator = (props) => {
  return (
    <Stack.Navigator initialRouteName={'splash'}>
      <Stack.Screen
        name="WelcomeStack"
        component={WelcomeStack}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AppDrawer"
        component={AppDrawerScreen}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="allLoad"
        component={AllLoad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="IncomingLoad"
        component={IncomingLoad}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="trackyourDelivery"
        component={TrackYourDelivery}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="profile"
        component={Profile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="setting"
        component={Setting}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="contact"
        component={Contact}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
