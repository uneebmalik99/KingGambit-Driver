import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { View, Text } from 'react-native'
import AppNavigator from './src/route/AppNavigator'

import { NavigationContainer , CommonActions} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";

import { createDrawerNavigator } from "@react-navigation/drawer";

import Splash from './src/screen/Splash';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import ForgetPass from './src/screen/ForgetPass';
import VerificationCode from './src/screen/VerificationCode';
import ConfirmationPage from './src/screen/ConfirmationPage';
import ChangePass from './src/screen/ChangePass';
import AllLoad from './src/screen/AllLoad';
import TrackYourDelivery from './src/screen/TrackYourDelivery';
import Profile from './src/screen/Profile';
import WelcomeLogistic from './src/screen/WelcomeLogistic';
import Maps from './src/screen/Maps';
import MyLocation from './src/screen/MyLocation';
import { DrawerContent } from './src/route/Drawer';
import NotifeeTest from './src/screen/NotifeeTest';
import AppConstance from './src/constance/AppConstance';
import notifee , { EventType }from '@notifee/react-native';

const App = ({navigation}) => {

  const [initialRouteName , setinitialRouteName] = useState('splash')
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
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
  
const WelcomeStack = () => {
  
  return (
    <Stack.Navigator >
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

const  bootstrap =async()=> {
  const initialNotification = await notifee.getInitialNotification();

  if (initialNotification) {
    console.log('Notification caused application to open', initialNotification.notification);
    console.log('Press action used to open the app', initialNotification.pressAction);
  }
}


  useEffect(() => {

    //  bootstrap()

    // messaging().onNotificationOpenedApp(remoteMessage=>{
    //   console.log('open app',remoteMessage.notification)
    // })

    // messaging().setBackgroundMessageHandler(async remoteMessage => {
    //   console.log('Message check in the background!', remoteMessage);
  
      
  
    // });

    // const unsubscribe = messaging().onMessage(async remoteMessage => {

      
    //   // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
    //   console.log('notifiif')
    //   onDisplayNotification(remoteMessage)

    // });


   

    // return unsubscribe;
    //    return notifee.onForegroundEvent(({ type, detail }) => {
    //   switch (type) {
    //     case EventType.DISMISSED:
    //       console.log('User dismissed notification', detail.notification);

    //       break;
    //     case EventType.PRESS:
    //       console.log('User pressed notification', detail.notification);
          
    //       // navigation.dispatch(
    //       //   CommonActions.navigate({
    //       //     name: 'login',
    //       //     params: {
    //       //       user: 'jane',
    //       //     },
    //       //   })
    //       // );
    //                 break;
    //   }
    // });
    // bootstrap()
    // .then(() => setLoading(false))
    // .catch(console.error);
  }, []);

  if (loading) {
    return null;
  }
  return (
    // <View>
    //   {/* <AppNavigator /> */}
    //   <Text>hi</Text>
    //  </View>

    <NavigationContainer>
      {/* //WelcomeStack */}
       <Stack.Navigator initialRouteName={initialRouteName}>
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
        name="notifee"
        component={NotifeeTest}
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
   {/* <AppNavigator /> */}
  </NavigationContainer>
  )
}


export default App
