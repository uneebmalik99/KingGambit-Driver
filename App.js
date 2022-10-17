import React, { useEffect, useState } from 'react';
import { Alert, FlatList,Animated, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';
import { View, Text ,Modal, TouchableOpacity, SafeAreaView} from 'react-native'

import MapView,{Marker, PROVIDER_GOOGLE } from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';
import AppNavigator from './src/route/AppNavigator'

import { NavigationContainer , CommonActions, useNavigation,createNavigationContainerRef} from '@react-navigation/native';
import {
  createStackNavigator,
  HeaderBackground,
} from "@react-navigation/stack";
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

import { createDrawerNavigator } from "@react-navigation/drawer";
import AsyncStorage from '@react-native-async-storage/async-storage';

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
// import MyLocation from './src/screen/MyLocation';
import { DrawerContent } from './src/route/Drawer';
import NotifeeTest from './src/screen/NotifeeTest';
import AppConstance,{deviceHeight,deviceWidth} from './src/constance/AppConstance';
import notifee , { EventType }from '@notifee/react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AppColors from './src/Colors/AppColors';
import IncomingLoad from './src/screen/IncomingLoad';
import StarReview from 'react-native-star-review';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Snackbar from 'react-native-snackbar';

import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import Rating from './src/screen/Rating';
import database from '@react-native-firebase/database';

import * as Progress from 'react-native-progress';
import Setting from './src/screen/Setting';
import Contact from './src/screen/Contact';
import AppUrlCollection from './src/UrlCollection/AppUrlCollection';
import Spinner from 'react-native-loading-spinner-overlay';
import { set } from 'react-native-reanimated';



const navigationRef = createNavigationContainerRef()
const GOOGLE_MAPS_APIKEY ='AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo'

// function navigate(name, params) {
//   if (navigationRef.isReady()) {
//     navigationRef.navigate(name, params);
//   }
// }

const App = () => {

  const [progressv , setprogressv]= useState(0.3)

  const [longitude,setlongitude] = useState(73.079547)
  const [latitude,setlatitude] = useState(33.664703)
  const[spinner ,setspinner] = useState(false)

  const [pickupLatitude,setpickupLatitude] = useState(33.658566)
  const [pickupLongitude,setpickupLongitude] = useState(73.063308)
  
  const [dropoffLatitude,setdropoffLatitude] = useState(33.658566)
  const [dropoffLongitude,setdropoffLongitude] = useState(73.063308)
  
  const [initialRouteName , setinitialRouteName] = useState('splash')
  const [loading, setLoading] = useState(true);
  const [notificationModal,setnotificationModal] = useState(false)
  const [mapviewmodal ,setmapviewmodal] = useState(false)
  
  const [notificationList, setnotificationList] = useState([

  ])
  const [notificationListUpdate, setnotificationListUpdate] = useState([

  ])

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
  
      
  
        
        {/* <Stack.Screen
          name="mylocation"
          component={MyLocation}
          options={{ headerShown: false }}
        />
       */}
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

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  useEffect(async() => {
    requestUserPermission()

    messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      if(remoteMessage.data.type == "0"){ 
        if(notificationModal != true)
        {
          setnotificationModal(true)
        }
        // alert('0')
        setnotificationList(oldArray => [...oldArray, remoteMessage.data]);
        // alert('1')
        console.log('uihugufyfy'+notificationList);
        console.log('data notification',remoteMessage);    
      }
  
    })

    // Assume a message-notification contains a "type" property in the data payload of the screen to open
  
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
      // navigate('map');
      if(notificationModal != true)
      {
        setnotificationModal(true)
      }
  
      setnotificationList(oldArray => [...oldArray, remoteMessage.data]);

   
      console.log('uihugufyfy'+notificationList);
  
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

        if(notificationModal != true)
        {
          setnotificationModal(true)
        }
    
        setnotificationList(oldArray => [...oldArray, remoteMessage.data]);
  
     
        console.log('uihugufyfy'+notificationList);
      }
     
      // setLoading(false);
    });

  }, []);


  const deleteItem =(item,index) =>{

const newData =[...notificationList];
// const index = notificationList.findIndex(notificationList=> notificationList.key === item.key)
console.log(index)
newData.splice(index,1);
setnotificationList(newData)
// for(var i =0;i<= notificationList.length;i++)
// {
//   if(i== index)
//   {
//     notificationList.splice(index,1)
//   }
// }
if(notificationList.length<=1)
{
  console.log("sajljdfasfll")
  setnotificationModal(false)
}
console.log('jkukuukkk'+notificationList.length);

// let t = notificationList.filter((item,index)=>index !== index)
// setnotificationList(t)

    // const filteredData = notificationList.filter((index ,item)=> index !== index6);
    // //Updating List Data State with NEW Data.
    // setnotificationList(filteredData);
  }


  const AcceptAPI =async (item)=>{



console.log('data from notification -----'+JSON.stringify(item)) 
console.log('data from notification -----'+JSON.stringify(item.load_id)) 


setspinner(true)
    let Id = await AsyncStorage.getItem('Id')


    let value = {};
    value.User_id = item.User_id;
    value.driver_id=Id;
    value.load_id = item.load_id;
    value.status = '1',
    value.Have_Load = '1',
    
    console.log( '---------'+value);

   AsyncStorage.setItem('Load_id',item.load_id.toString())

    // alert(JSON.stringaify(value))

    var url =AppUrlCollection.ACCEPT;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(value),
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {

    if(responseJson.Status == "1"){

        database()
        .ref('/kingGamBit/Loads/'+item.Load_id)
        .set({
          C_Latitude: latitude,
          C_Longitude: longitude,
          Driver_id:Id,
          Status:'1',
          User_id:item.User_id
        })
        .then(() => console.log('Data set.'));

        // navigation.navigate('welcome')
        console.log('accpt data response',responseJson);
        setspinner(false)
        setnotificationList([])
        setnotificationModal(false)

      }else{
        alert('Something went wrong')
        setnotificationList([])
        setnotificationModal(false)
      }

      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
      
     

  }

    
  const renderNotificationListlist = ({ item ,index}) => {


    let progress= 0
    let indeterminate = true
    // const [progress,setprogress]=useState(0)
    // const [indeterminate,setindeterminate]=useState(true)
      // let progress = 0;
      // setprogress( progress );
      setTimeout(() => {
        indeterminate= false
        // setindeterminate(false );
        setInterval(() => {
          progress += Math.random() / 5;
          if (progress > 1) {
            progress = 1;
          }
          // setprogress(progress );
        }, 7000);
      }, 9500);
    

    // setTimeout(() => {
    //   console.warn('cnjdhjdscjj');
    // }, 1000);

    // let progress = 0.1;

    // let dis = item.Distance
    // dis=  Number((dis).toFixed(1))
    var number = item.Distance;
  var roundedNumber = Math.round(number * 10) / 10;
    console.log(index);
    return (

      <View
      // onPress={()=>{
      //   setnotificationModal(false)
      //   // navigate('incomingLoad',{item :item})   
      
      //   navigate('incomingLoad',{plat:33.0000,plong:73.0000,pAdd:'isb', dlat:33.23532,dlong:73.0234, dAdd:'lhr', tprice:'90', dprice:'80', vtype:"0"})
      // }}
      style={{backgroundColor:'white',paddingBottom:'3%', borderRadius:8,  }}
        >
  {/* <View style={{   height: 20,
      flexDirection: 'row',
      width: '100%',
      backgroundColor: 'white',
      borderColor: '#000',
      borderWidth: 2,
      borderRadius: 5,}}>
          <Animated.View
            style={
              ([StyleSheet.absoluteFill], 
              { backgroundColor: '#8BED4F', width:width })
            }></Animated.View>
        </View> */}


  {/* <Progress.Bar animationType={'timing'}  indeterminate={indeterminate}  borderWidth={0} color={AppColors.Appcolor}  progress={progress} width={1000} /> */}




          {/* <View style={{borderTopRightRadius:8, borderTopLeftRadius:8,height:5,backgroundColor:AppColors.Appcolor  }}>
            </View> */}

            <View style={{width:'100%',borderBottomWidth:0.7 ,borderColor:'grey', paddingHorizontal:'2%',marginTop:5, flexDirection:'row', }}>


        <View style={{width:'70%',padding:3,}}>
          <Text style={{fontSize:18, fontWeight:'500'}}>Dock Number: {item.Dock_Number}</Text>
          <Text style={{fontSize:14,marginTop:2, fontWeight:'500'}}>{item.Vehicle_Type == '0' ? "reefer van":item.Vehicle_Type == '1' ?"dry van":item.Vehicle_Type == '2' ?"flatbed van":null}</Text>

          <View style={{marginTop:2, flexDirection:'row'}}>
          <Ionicons name='star'  size={20} color='#FF9529'/>
          <Text style={{marginLeft:5,alignSelf:'center'}}>{item.Rating}</Text>
          <Text style={{marginLeft:5, alignSelf:'center'}}>(233)</Text>

          </View>

          </View>

          <View style={{width:'28%', padding:3, alignItems:'flex-end'  }}>

            <Text style={{fontWeight:'800', fontSize:18}}>${item.Driver_Price}</Text>
            <Text style={{fontSize:14, marginTop:2,}}>{roundedNumber} Miles</Text>
            <Text style={{fontSize:14,marginTop:2,}}>{item.Weight} Pounds</Text>



          </View>

      
            </View>







            <View style={{marginVertical:5,paddingHorizontal:7,  flexDirection:'row',justifyContent:'space-between', marginTop:15, }}>
              {/* <View  style={{width:'5%'}}>
              <Ionicons name='md-location-outline' style={{alignSelf:'center'}} color={'black'}  size={15} />
              <View style={{height:14,marginVertical:2, alignSelf:'center', borderWidth:1,borderColor:'black', width:0.7}}></View>
              <FontAwesome name='circle-o' style={{alignSelf:'center'}} color={'black'}  size={15} />

              </View> */}

              <View style={{flexDirection:'column' , width:"90%" }}>

        

              <View  style={{width:'95%',flexDirection:'row', justifyContent:'center', }}>
              <Ionicons name='md-location-outline' style={{alignSelf:'center'}} color={'black'}  size={15} />

              <Text style={{marginLeft:5,alignSelf:'center', fontSize:17}}>{item.P_Address}</Text>
              

              </View>

            

              <View  style={{width:'95%',flexDirection:'row', marginTop:5, justifyContent:'center',}}>
              <FontAwesome name='circle-o' style={{alignSelf:'center'}} color={'black'}  size={15} />

              <Text style={{marginLeft:5,alignSelf:'center', fontSize:17}}>{item.D_Address}</Text>
              

              </View>

              </View>



            



              <View  style={{width:'10%',justifyContent:'center', }}>

                  <TouchableOpacity 
                  
                  onPress={()=> {
                    setpickupLatitude(item.P_Latitude)
                    setpickupLongitude(item.P_Longitude)

                    setdropoffLatitude(item.D_Latitude)
                    setdropoffLongitude(item.D_Longitudes)

                    setmapviewmodal(true)

                  }}
                  style={{backgroundColor:AppColors.Appcolor, borderRadius:5, padding:5, paddingVertical:10,}}>
                    <Text style={{color:'white', alignSelf:'center'}}>Map</Text>
                  </TouchableOpacity>
                </View>

            </View>





            {/* <View style={{marginVertical:5,backgroundColor:'red', paddingHorizontal:5,flexDirection:'row',justifyContent:'space-between', marginTop:15, marginHorizontal:5}}>
              <View  style={{width:'5%'}}>
              <Ionicons name='md-location-outline' style={{alignSelf:'center'}} color={'black'}  size={15} />
              <View style={{height:14,marginVertical:2, alignSelf:'center', borderWidth:1,borderColor:'black', width:0.7}}></View>
              <FontAwesome name='circle-o' style={{alignSelf:'center'}} color={'black'}  size={15} />

              </View>

              <View  style={{width:'85%'}}>
              <Text style={{marginLeft:5, fontSize:17}}>{item.P_Address}</Text>
              <View style={{height:12}}>

              </View>
              <Text style={{marginLeft:5,fontSize:17}}>{item.D_Address}</Text>

              </View>

              <View  style={{width:'10%'}}>

                  <TouchableOpacity style={{backgroundColor:'green', borderRadius:5, padding:2,}}>
                    <Text>Map</Text>
                  </TouchableOpacity>
                </View>

            </View> */}


          


        
            <View style={{height:'25%',width:'100%', marginTop:20, flexDirection:'row',justifyContent:'space-around', }}>

  <View style={{alignSelf:'center'}}>


            <CountdownCircleTimer
      isPlaying
      size={30}
      duration={20}
      strokeWidth={4}
      colors={['#004777', '#F7B801', '#A30000', '#A30000']}
      colorsTime={[7, 5, 2, 0]}
      onComplete={() => {
    deleteItem(item,index)
      }}
    >
      {({ remainingTime }) => <Text>{remainingTime}</Text>}
    </CountdownCircleTimer>
    </View>
            <TouchableOpacity
            onPress={()=>{deleteItem(item,index)}}
            style={{justifyContent:'center',width:'40%', backgroundColor:'#F4F6F6', borderRadius:5,}}>
            <Text style={{fontWeight:'600',color:'red',fontSize:16, alignSelf:'center'}}>Decline</Text>
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=> {

            
            setnotificationModal(false)

            AcceptAPI(item)

            // navigate('incomingLoad',{item:item, plat:parseFloat(item.P_Latitude),plong:parseFloat(item.P_Longitude),pAdd:item.P_Address,
            //    dlat:parseFloat(item.D_Latitude),dlong:parseFloat(item.D_Longitudes), dAdd:item.D_Address, 
            //    tprice:item.Total_Price, dprice:item.Driver_Price, vtype:item.Vehicle_Type,dNumber:item.Dock_Number
            //   ,pTime:item.Pick_up_Time,dTime:item.Drop_of_Time,weightLoad:item.Weight
            //   })

          }}
          
          style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor, borderRadius:5,}}>
            <Text style={{fontWeight:'600', fontSize:16,color:'white', alignSelf:'center'}}>Accept</Text>
          </TouchableOpacity>


      </View>
    

      </View>

    )

  }

  const listfooter = () => {
    return (
      <View style={{backgroundColor:'Transparent', marginTop:20,}} >
        <Text style={{alignSelf:'center', fontWeight:'700', fontSize:20}}>All caught up</Text>
        {/* <Text style={{alignSelf:'center', fontWeight:'700', fontSize:20}}>All caught up</Text> */}
      </View>
    );
  };



  return (
   
    <NavigationContainer ref={navigationRef}>

<Spinner
        visible={spinner}
        textContent={"Loading..."}
        color	={AppColors.Appcolor }
        animation	='fade'
        size='large'
        overlayColor='rgba(0, 0, 0, 0.30)'
         textStyle={{ color: AppColors.Appcolor }}
      />

      {notificationModal == true ? 
             <Modal
             transparent={true}
             visible={notificationModal}
             >



{mapviewmodal == true ?


<Modal
             transparent={true}
             visible={mapviewmodal}
             >
              <SafeAreaView style={{backgroundColor:"#0001",justifyContent:'center', height:'100%'}} >

             <View style={{justifyContent:'center', height:'60%',margin:10, }}>

                <View style={{backgroundColor:AppColors.Appcolor,justifyContent:"space-between" ,flexDirection:'row', borderRadius:5, padding:10,}}>
                  <Text></Text>

                  <Text></Text>

              <Ionicons name='ios-close-outline' onPress={()=> {setmapviewmodal(false)}} style={{alignSelf:'flex-end'}} color='red' size={22}/>
                 
                 
                  </View>
                  
                  <MapView 
    provider={PROVIDER_GOOGLE}
      style={{width:"100%", height:"90%"}}
      initialRegion={
  {
    latitude:pickupLatitude,longitude:pickupLongitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
      }
    >


  {/* {
    // haveLoad == '1' ?
    mapviewmodal == true ?
      <Marker coordinate={{latitude:latitude,longitude:longitude}}>
      <Image style={{width:55,height:55 , resizeMode:'contain'}} source={require('../assets/truck22.png')} />
      </Marker>
      :
      null
      } */}
  {
    // haveLoad == '1' ?
    mapviewmodal == true ?

      <Marker coordinate={{latitude:pickupLatitude,longitude:pickupLongitude}}>
      </Marker>
    :
    null
    }
    {
    // haveLoad == '1' ?
    mapviewmodal == true ?

    <MapViewDirections
      origin={{latitude:pickupLatitude , longitude:pickupLongitude}}
      destination={{latitude:dropoffLatitude, longitude:dropoffLongitude}}
      apikey={GOOGLE_MAPS_APIKEY}
      // stroke
      strokeWidth={3}
      strokeColor='red'
    
    />
    :
    null
    }
      {
    // haveLoad == '1' ?s
    mapviewmodal == true ?

      <Marker coordinate={{latitude:dropoffLatitude,longitude:dropoffLongitude}}>
      </Marker>
      :
      null
      }
      

   
      
      
      </MapView>
      <TouchableOpacity onPress={()=> {setmapviewmodal(false)}}  style={{bottom:10 ,alignSelf:'center',backgroundColor:'red',paddingHorizontal:15, paddingVertical:10 ,borderRadius:10,  position:"absolute"}}>
        <Text style={{color:'white'}}>Close</Text>
      </TouchableOpacity>
     
             </View>
      </SafeAreaView>
      
             </Modal>
             :null
  }



              <SafeAreaView style={{backgroundColor:"#0009", height:'100%'}} >

               <View style={{backgroundColor:'white',paddingHorizontal:'5%', justifyContent:'center', height:deviceHeight*0.08}}>
               
           
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
          ListFooterComponent={listfooter}


          keyExtractor={({item,index}) => index}
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

  </NavigationContainer>
  )
}


export default App