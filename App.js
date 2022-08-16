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
import AppConstance,{deviceHeight,deviceWidth} from './src/constance/AppConstance';
import notifee , { EventType }from '@notifee/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppColors from './src/Colors/AppColors';
import IncomingLoad from './src/screen/IncomingLoad';
import StarReview from 'react-native-star-review';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Rating from './src/screen/Rating';




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
  const [notificationList, setnotificationList] = useState([
  ])
  const [notificationListUpdate, setnotificationListUpdate] = useState([

  ])
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
           {/* <AppDrawer.Screen
          name="rating"
          component={Rating}
          options={{ headerShown: false }}
        /> */}
  
      
  
        
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




  useEffect(() => {

  //foreGround
  messaging().onMessage(async remoteMessage => {


    // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
          setnotificationModal(true)

          // if(notificationList.length<1){

          //   let v = {}
          //   v.ff= remoteMessage.data.D_Address;
          //   // notificationList.push(v)
          //   setnotificationList(remoteMessage.data.D_Address)
          //   console.log('if wali',notificationList)
          //   console.log('if wali')

          // }
          // else{
            let newArray ={i:0}
            console.log('else  wali')

            notificationList.push(newArray)
                  setnotificationList(newArray)
                  console.log(notificationList)
                  // console.log(newArray)
          // }
          
          // let value = notificationList;
          // value.push(remoteMessage.data)
        

        // notificationList.push(remoteMessage.data)
        //   // setnotificationList(remoteMessage.data)
        //   console.log(notificationList)


          // notificationList.push(remoteMessage.data)
          // console.log('rrrrrrrrrr'+remoteMessage.data)
          // notificationList.push({i:0})


          // let v = [...notificationListUpdate,notificationList]

          // setnotificationListUpdate(v)
          // console.log(v)
          // console.log(notificationListUpdate)
          // notificationListUpdate.push(notificationList)
          // setnotificationListUpdate(notificationList)

  //   if(notificationModal == false)
  //   {
  //     setnotificationModal(true)
  //     // setnotificationList(remoteMessage.data)
  //     let value = {}
  //     value.ap = 'gft'
  //     setnotificationList(value)

  //     console.log('jfttrr'+notificationList)

  //   }else{
      
  //     notificationList.push(remoteMessage.data)

  //  console.log('ftytfvyu'+notificationList)
  //   }

    // console.log('data of notificayionlist'+JSON.stringify(notificationList));
    // console.log('data of notificayion'+JSON.stringify(remoteMessage));

    // notificationList.push('2')
    
  })

  // Assume a message-notification contains a "type" property in the data payload of the screen to open
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    // navigate('map');
    setnotificationModal(true)

    // setnotificationModal(true)
          let value = notificationList;
          value.push(remoteMessage.data)

          setnotificationList(value)
          // notificationList.push(remoteMessage.data)
          console.log(notificationList)

  })

  // Check whether an initial notification is available
  messaging().getInitialNotification().then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification caused app to open from quit state:',
        remoteMessage.notification,
      );
      // setinitialRouteName('register'); // e.g. "Settings"
      // navigate('contact');
      // console.log(initialRouteName)
      // AppConstance.notificationRecived='2'
    }
    // setLoading(false);
    setnotificationModal(true)

    // setnotificationModal(true)
          let value = notificationList;
          value.push(remoteMessage.data)
          value.push(remoteMessage.data)

          setnotificationList(value)
          // notificationList.push(remoteMessage.data)
          console.log(notificationList)
  });
  
}, []);
  // if (loading) {
  //   return null;
  // }
  
const renderNotificationListlist = ({ item }) => {
  return (

    <View
    // onPress={()=>{
    //   setnotificationModal(false)
    //   // navigate('incomingLoad',{item :item})   
    
    //   navigate('incomingLoad',{plat:33.0000,plong:73.0000,pAdd:'isb', dlat:33.23532,dlong:73.0234, dAdd:'lhr', tprice:'90', dprice:'80', vtype:"0"})
    // }}
    style={{backgroundColor:'white',height:deviceHeight*0.22, paddingBottom:'3%', borderRadius:8,  }}
      >
        <View style={{borderTopRightRadius:8, borderTopLeftRadius:8,height:5,backgroundColor:AppColors.Appcolor  }}>
          </View>

          <View style={{height:'66%',width:'100%',paddingHorizontal:'2%', flexDirection:'row', }}>


      <View style={{width:'70%',padding:3, }}>
        <Text style={{fontSize:16, fontWeight:'500'}}>{item.Dock_Number}</Text>
        <Text style={{fontSize:12, fontWeight:'500'}}>{item.Vehicle_Type}</Text>
        <Text style={{fontSize:12, fontWeight:'500'}}>DockNumber</Text>

        <View style={{marginTop:5, flexDirection:'row'}}>
        <Ionicons name='star'  size={20} color='#FF9529'/>
        <Text style={{marginLeft:5,}}>{item.Rating}</Text>
        <Text style={{marginLeft:5,}}>(233)</Text>

        </View>

        </View>

        <View style={{width:'28%', padding:3, alignItems:'flex-end'  }}>

          <Text style={{fontWeight:'800', fontSize:18}}>{item.Driver_Price}</Text>
          <Text style={{fontSize:12}}>{item.Weight}kg</Text>
          <Text style={{fontSize:12}}>{item.Distance}km</Text>


        </View>


          </View>

          <View style={{height:'28%',width:'100%', marginTop:5, flexDirection:'row',justifyContent:'space-around', }}>


          <TouchableOpacity style={{justifyContent:'center',width:'40%', backgroundColor:'#F4F6F6', borderRadius:5,}}>
          <Text style={{fontWeight:'600',color:'red', alignSelf:'center'}}>Decline</Text>
        </TouchableOpacity>

        <TouchableOpacity 
        onPress={()=> {

          setnotificationModal(false)
          navigate('incomingLoad',{item:item, plat:item.P_Latitude,plong:item.P_Longitude,pAdd:item.P_Address,
             dlat:item.D_Latitude,dlong:item.D_Longitudes, dAdd:item.D_Address, 
             tprice:item.Total_Price, dprice:item.Driver_Price, vtype:item.Vehicle_Type,dNumber:item.Dock_Number
            ,pTime:item.Pick_up_Time,dTime:item.Drop_of_Time,weightLoad:item.Weight
            })

        }}
        
        style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor, borderRadius:5,}}>
          <Text style={{fontWeight:'900',color:'white', alignSelf:'center'}}>View</Text>
        </TouchableOpacity>


    </View>
   

    </View>

  )

}
const RootStack = createNativeStackNavigator();
  return (
    <NavigationContainer ref={navigationRef}>


      {notificationModal == true ? 
             <Modal
             transparent={true}
             visible={notificationModal}
             >
              <SafeAreaView style={{backgroundColor:"#0009", height:'100%'}} >

               <View style={{backgroundColor:'white',paddingHorizontal:'5%', justifyContent:'center', height:deviceHeight*0.08}}>
               <TouchableOpacity 
                onPress={()=> {  

                 
              
                  let newArray =[...notificationList,'6']
                 
                  setnotificationList(newArray)
                }}
                style={{alignSelf:'flex-end'}}>
                  <Text style={{color:AppColors.Appcolor, fontWeight:'600'}}>ADD</Text>
                </TouchableOpacity>
           
                <TouchableOpacity 
                onPress={()=> {  setnotificationModal(false)}}
                style={{alignSelf:'flex-end'}}>
                  <Text style={{color:AppColors.Appcolor, fontWeight:'600'}}>Cancel</Text>
                </TouchableOpacity>
                 </View>

{notificationList.length>0 ?

          <FlatList
          data={notificationList}
          contentContainerStyle={{marginTop:10, paddingHorizontal:'2%',paddingBottom:"20%"}}
          renderItem={renderNotificationListlist}
          extraData={notificationList}
          keyExtractor={item => item.id}
          ItemSeparatorComponent={() => (
              <View style={{ height: 10 }} />
            )}
           
        />
        :null
          
          }
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