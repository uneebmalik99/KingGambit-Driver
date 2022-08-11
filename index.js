/**
 * @format
 */

 import {AppRegistry} from 'react-native';
 import App from './App';
 import notifee, { EventType } from '@notifee/react-native';
 import {name as appName} from './app.json';
 import messaging from '@react-native-firebase/messaging';
import AppConstance from './src/constance/AppConstance';


 notifee.onBackgroundEvent(async ({ type, detail }) => {
  const { notification, pressAction } = detail;

  // Check if the user pressed the "Mark as read" action
  if (type === EventType.ACTION_PRESS && pressAction.id === 'mark-as-read') {
    // Update external API
    // await fetch(`https://my-api.com/chat/${notification.data.chatId}/read`, {
    //   method: 'POST',
    // });

    // Remove the notification
    await notifee.cancelNotification(notification.id);
  }
});
messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message index in the background!', remoteMessage);

    AppConstance.initialRouteName ='profile'

  });
 AppRegistry.registerComponent(appName, () => App);
 