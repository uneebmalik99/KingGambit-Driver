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

async function onDisplayNotification() {
  console.log('notifee');
  // Request permissions (required for iOS)
  // await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the notification',
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}


const AppNavigator = (props) => {

  useEffect(() => {
 

     messaging().onMessage(async remoteMessage => {

      
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      console.log('notifiif')
      console.log('App navigator')

      // onDisplayNotification(remoteMessage)

    });

  }, []);
  return (
    <Stack.Navigator initialRouteName={AppConstance.initialRouteName}>
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
    </Stack.Navigator>
  );
};

export default AppNavigator;
