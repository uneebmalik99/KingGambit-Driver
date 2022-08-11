import React, { useEffect } from 'react';
import { View, Button, Alert } from 'react-native';
import notifee from '@notifee/react-native';
import { FirebaseMessagingTypes } from '@react-native-firebase/messaging';
import messaging from '@react-native-firebase/messaging';
const NotifeeTest = () => {


    useEffect(()=>{
        requestPermission();
        const unsubscribe = messaging().onMessage(async remoteMessage => {
            console.log('remoteMessage',JSON.stringify(remoteMessage))
            Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
          });
      
          return unsubscribe;
    },[])

    const requestPermission =async()=>{
        const authStatus =await messaging().requestPermission();
    }

    async function onDisplayNotification() {
        // Request permissions (required for iOS)
        await notifee.requestPermission()
    
        // Create a channel (required for Android)
        const channelId = await notifee.createChannel({
          id: 'default',
          name: 'Default Channel',
        });
    
        // Display a notification
        notifee.displayNotification({
            title: '<p style="color: #4caf50;"><b>Styled HTMLTitle</span></p></b></p> &#128576;',
            subtitle: '&#129395;',
            body:
              'The <p style="text-decoration: line-through">body can</p> also be <p style="color: #ffffff; background-color: #9c27b0"><i>styled too</i></p> &#127881;!',
            android: {
              channelId,
              color: '#4caf50',
              actions: [
                {
                  title: '<b>Dance</b> &#128111;',
                  pressAction: { id: 'dance' },
                },
                {
                  title: '<p style="color: #f44336;"><b>Cry</b> &#128557;</p>',
                  pressAction: { id: 'cry' },
                },
              ],
            },
          });
      }
    
      return (
        <View style={{flex:1,justifyContent:'center'}}>
          <Button title="Display Notification" onPress={() => onDisplayNotification()} />
        </View>
      );
}

export default NotifeeTest