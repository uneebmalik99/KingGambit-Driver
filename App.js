import React, { useEffect } from 'react';
import { Alert } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { View, Text } from 'react-native'
import AppNavigator from './src/route/AppNavigator'
import { NavigationContainer } from '@react-navigation/native';

// import AppNavigator from './src/route/AppNavigator'
// import Splash from './comp/Splash'

const App = () => {


  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);


  return (
    // <View>
    //   {/* <AppNavigator /> */}
    //   <Text>hi</Text>
    //  </View>

    <NavigationContainer>
   <AppNavigator />
  </NavigationContainer>
  )
}

export default App
