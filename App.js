import React, { useEffect, useState } from 'react';
import { Alert, FlatList } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { View, Text ,Modal, TouchableOpacity, SafeAreaView} from 'react-native'
import AppNavigator from './src/route/AppNavigator'

import { NavigationContainer , CommonActions, useNavigation,createNavigationContainerRef} from '@react-navigation/native';
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
// import  from './src/screen/Maps';
import MyLocation from './src/screen/MyLocation';
import { DrawerContent } from './src/route/Drawer';
import NotifeeTest from './src/screen/NotifeeTest';
import AppConstance from './src/constance/AppConstance';
import notifee , { EventType }from '@notifee/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppColors from './src/Colors/AppColors';
import IncomingLoad from './src/screen/IncomingLoad';




const navigationRef = createNavigationContainerRef()

function navigate(name, params) {
  if (navigationRef.isReady()) {
    navigationRef.navigate(name, params);
  }
}

const App = () => {

  const [initialRouteName , setinitialRouteName] = useState('splash')
  const [loading, setLoading] = useState(true);
  const [notificationModal,setnotificationModal] = useState(false)
  const [notificationList, setnotificationList] = useState([])
  // const Navigation = useNavigation();

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






  //foreGround

  messaging().onMessage(async remoteMessage => {
    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
   
    if(notificationModal != true)
    {
      setnotificationModal(true)
    }

    let newArray =[...notificationList,remoteMessage]
    // newArray.push(remoteMessage)
   
    setnotificationList(newArray)

    // notificationList.push('2')
    
  })
  // Assume a message-notification contains a "type" property in the data payload of the screen to open

  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    navigate('map');

    })

  // Check whether an initial notification is available

  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
      // setinitialRouteName('register'); // e.g. "Settings"
      // navigate('contact');
      // console.log(initialRouteName)
      AppConstance.notificationRecived='2'
    }
    // setLoading(false);
  });
  
}, []);
  // if (loading) {
  //   return null;
  // }
  
const renderNotificationListlist = ({ item }) => {


  return (

    <TouchableOpacity
    onPress={()=>{

      setnotificationModal(false)
      navigate('incomingLoad',{item :item})

    }
    }
      style={{ marginVertical: 5, borderWidth: 0.5, flexDirection: 'row', borderColor: 'grey', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 10, }}>

   

      <Text style={{ alignSelf: 'center', color: AppColors.Appcolor, marginLeft: 5, }}>item.state_name</Text>
    </TouchableOpacity>

  )

}
const RootStack = createNativeStackNavigator();
  return (
    // <View>
    //   {/* <AppNavigator /> */}
    //   <Text>hi</Text>
    //  </View>

    
    <NavigationContainer ref={navigationRef}>


      {notificationModal == true ? 
             <Modal
             transparent={true}
             visible={notificationModal}
             >
              <SafeAreaView style={{backgroundColor:"#000000aa",}} >

               
           <Text>hi mapo</Text>

          <FlatList
          data={notificationList}
          contentContainerStyle={{marginTop:10, paddingHorizontal:'2%',paddingBottom:"20%"}}
          renderItem={renderNotificationListlist}
          keyExtractor={item => item.id}
          extraData={notificationList}
        />
           <TouchableOpacity
           style={{backgroundColor:"red"}}
                onPress={()=>  setnotificationModal(false)}
                >
                <Text>hi mapo</Text>

                </TouchableOpacity>
      </SafeAreaView>
      
             </Modal>
             :null
  }


            
   
       <Stack.Navigator initialRouteName={'Splash'}>
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
        name="incomingLoad"
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

  </NavigationContainer>
  )
}


export default App
