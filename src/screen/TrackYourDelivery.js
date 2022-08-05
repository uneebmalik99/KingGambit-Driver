// import { View, Text,TouchableOpacity,TextInput,StyleSheet,Button, Image } from 'react-native'
import { Appbar, Snackbar } from "react-native-paper";
import React, { useState , useRef,useEffect} from 'react'
// React Native Geolocation
// https://aboutreact.com/react-native-geolocation/
 
// import React in our code
// import React, {useState, useEffect} from 'react';
 
// import all the components we are going to use

import Geolocation from 'react-native-geolocation-service';
// import VIForegroundService from '@voximplant/react-native-foreground-service';
import {
  SafeAreaView,
  View,

  Text,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  TouchableOpacity
} from 'react-native';
 
//import all the components we are going to use.
// import Geolocation from '@react-native-community/geolocation';
import GeolocationS from 'react-native-geolocation-service';
import database from '@react-native-firebase/database';

import firebase from '@react-native-firebase/app';


// import MapView from 'react-native-maps';
import MapView, { Marker} from 'react-native-maps'
import MapViewDirections from 'react-native-maps-directions';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AppColors from "../Colors/AppColors";


// import React from 'react'
const TrackYourDelivery = ({route,navigation}) => {

  const [forceLocation, setForceLocation] = useState(true);
  const [highAccuracy, setHighAccuracy] = useState(true);
  const [locationDialog, setLocationDialog] = useState(true);
  const [significantChanges, setSignificantChanges] = useState(false);
  const [observing, setObserving] = useState(false);
  const [foregroundService, setForegroundService] = useState(false);
  const [useLocationManager, setUseLocationManager] = useState(false);
  // const [location, setLocation] = useState(null);
  // const [data, setData] = useState([]);

  const watchId = useRef(null);

  const { data ,plat,plong,dlat,dlong} = route.params;



  const [platitude,setplatitude] =useState(plat)

  const [plongitude,setplongitude] =useState(plong)
  const [dlatitude,setdlatitude] =useState(dlat)
  const [dlongitude,setdlongitude] =useState(dlong)

  // const reference = database().ref('/Firebasedemo99');
  // const reference = firebase
  // .app()
  // .database('https://kinggambit-1713f-default-rtdb.firebaseio.com/')
  // .ref('/Firebasedemo99');
  
  const GOOGLE_MAPS_APIKEY ='AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo'
  const origin = {latitude: 33.652562, longitude:  73.050059};
  const destination = {latitude:  33.652562, longitude:73.050059};
  ///////////////////
  // const [plocation, setplocation] = useState(
  //   {
  //     latitude : data.P_Latitude,
  //     longitude:data.P_Longitude
  //   }
  // )
  // const [dlocation, setdlocation] = useState(
  //   {
  //     latitude : data.D_Latitude,
  //     longitude:data.D_Longitudes
  //   }
  // )
  const [currentLongitude,setCurrentLongitude] = useState(2.2069771);
  const [currentLatitude,setCurrentLatitude] = useState(48.8587741);
  const [
    locationStatus,
    setLocationStatus
  ] = useState('');
  const [coordinate,setcoordinate] =useState(
    {
      latitude : 33.6538066,
      longitude:73.0819502
    }
  )
  const update =(LAT,LONG) => {


    //Create
      // database()
      // .ref('/kingGamBit/Loads/3')
      // .set({
      //   name: 'Ada Lovelace',
      //   age: 31,
      // })
      // .then(() => console.log('Data set.'));
    
    //Update 
      database()
      .ref('/kingGamBit/Loads/1')
      .update({
        C_Latitude: LAT,
        C_Longitude: LONG
      })
      .then(() => console.log('Data updated.'));
    }
  const postion =()=>{
    watchId.current = Geolocation.watchPosition(
      (position) => {
        setLocation(position);
        console.log(position);
        update(position.coords.latitude,position.coords.longitude)
      },
      (error) => {
        setLocation(null);
        console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: highAccuracy,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: forceLocation,
        forceLocationManager: useLocationManager,
        showLocationDialog: locationDialog,
        useSignificantChanges: significantChanges,
      },
    );

  }
  const requestLocationPermission = async () => {

    // alert(plocation.latitude)
    if (Platform.OS === 'ios') {
      getOneTimeLocation();
      subscribeLocationLocation();
    } else {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Access Required',
            message: 'This App needs to Access your location',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          //To Check, If Permission is granted
           getLivePosition()
          // getOneTimeLocation();
          // subscribeLocationLocation();
        } else {
          setLocationStatus('Permission Denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
  };
 const getLivePosition=()=>{
  Geolocation.getCurrentPosition(
    (position) => {
      console.log(position);
      setCurrentLatitude(position.coords.latitude)
      setCurrentLongitude(position.coords.longitude)
      // addressgenerator(position.coords.latitude, position.coords.longitude)

      // setcoordinates[0].latitude

      // setclatitude(position.coords.latitude);
      // setclongitude(position.coords.longitude);
    },
    (error) => console.log(error)
    //  this.setState({ error: error.message }),
    // { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
  );
  }
  useEffect(() => {



    requestLocationPermission();


      // const onValueChange = database()
      //   .ref(`/users/${userId}`)
      //   .on('value', snapshot => {
      //     console.log('User data: ', snapshot.val());
      //   });
  
      // Stop listening for updates when no longer required
      // return () => database().ref(`/users/${userId}`).off('value', onValueChange);

    // console.log('  '+data.D_Latitude)
    // console.log('  '+data.D_Longitudes)
    // database().ref('/kingGamBit/Loads/1').once('value').then((snapshot)=>   {console.log(snapshot)} )  
      // alert(dlocation.latitude)

    // new  creating
  //     database()
  // .ref('/kingGamBit/Loads/2')
  // .set({
  //   name: 'Ada Lovelace',
  //   age: 31,
  // })
  // .then(() => console.log('Data set.'));
   
// database()
// .ref('/users')
// .on('value', snapshot => {
//   console.log('User data: ', snapshot.val());
// });

        // return () => database().ref(`/kingGamBit/Loads/1/${}`).off('value', onValueChange);

  }, []);
 
  const getOneTimeLocation = () => {
    setLocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setLocationStatus('You are Here');
 
        //getting the Longitude from the location json
        const currentLongitude = 
          JSON.stringify(position.coords.longitude);
          console.log('location'+currentLongitude)
 
        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
 
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
        
        //Setting Longitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        timeout: 30000,
        maximumAge: 1000
      },
    );
  };
 
  const subscribeLocationLocation = () => {
    watchID = Geolocation.watchPosition(
      (position) => {
        //Will give you the location on location change
        
        setLocationStatus('You are Here');
        console.log('pppppp'+position.coords.latitude);
 
        //getting the Longitude from the location json        
        const currentLongitude =
          JSON.stringify(position.coords.longitude);
 
        //getting the Latitude from the location json
        const currentLatitude = 
          JSON.stringify(position.coords.latitude);
 
        //Setting Longitude state
        setCurrentLongitude(currentLongitude);
 
        //Setting Latitude state
        setCurrentLatitude(currentLatitude);
      },
      (error) => {
        setLocationStatus(error.message);
      },
      {
        enableHighAccuracy: false,
        maximumAge: 1000
      },
    );
  };
//////

  
let Clatitude =currentLatitude;
let Clongitude = currentLongitude;
// if(Clatitude && Clongitude)
// {
  const[location,setLocation] =useState({
    pickupLocation:{
      // latitude: Clatitude,
      // longitude: Clongitude,
      latitude:currentLatitude,
      longitude: currentLongitude,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    },
    dropUpLocation:{
      latitude:32.4404,
      longitude: 74.1203,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
    }
    
    
  })


  const mapRef =useRef()

  const {pickupLocation,dropUpLocation} = location



  const savedata = ()=> {
    console.log('working');

    database().ref('/kingGamBit/Loads/1').once('value').then((snapshot)=>   {console.log(snapshot)} )

    // let data ={
    //   d:'23'
    // };

  // database()
  // .ref('/users/')
  // .update(data)
  // .then(snapshot => {
  //   console.log('User data: ', snapshot);
  // });

  // database()
  // .ref('/users/id')
  // .on('value', snapshot => {
  //   console.log('User data: ', snapshot.val());
  // });

  // firebase.database().ref(`users/`).on('value', function (snapshot) {
  //  console.log(snapshot);
    
  // });


  // firebase.database().ref('/users').remove();

  // database()
  // .ref('/users/id')
  // .once('value')
  // .then(snapshot => {
  //   console.log('User data: check ', snapshot);
  // });

  //   database().ref('/Firebasedemo99').set({
  //   name: 'Ada Lovelace',
  //   age: 31,
  // })
  // .then(() => console.log('Data set.'));


    // let key;
    // key= 'id';
    // key = database().ref().push().key

    // let datatosave= {
    //   Id: key,
    // };
    // database().ref('/users').update(datatosave).then((snapshot)=> {
    //   console.log(snapshot);

    // })
  }
  return (
    <View>
      <Appbar.Header style={styles.header}>
      <TouchableOpacity 
      
      onPress={()=> {savedata()}}>
        <Text>Track your delivery</Text>
      </TouchableOpacity>
      
      </Appbar.Header>
      <View style={styles.mapShow}>
      {/* <Text style={styles.text}>Maps</Text> */}

   
      <MapView 
    // ref={mapRef}
    style={{width:"100%",height:"100%"}}
    initialRegion={
      pickupLocation
    }
  >
    {/* <Marker
    coordinate={pickupLocation}
    /> */}

{/* <Marker 
      coordinate={{latitude:platitude, longitude:plongitude}}

/>

<Marker 
      coordinate={{latitude:dlatitude, longitude:dlongitude}}

/> */}


    <Marker coordinate={{latitude:currentLatitude,longitude:currentLongitude}}>
    <MaterialCommunityIcons name='truck-fast-outline' 
style={{ height: 35, width: 45 }} size={40} color='black'/>
</Marker>
 

  {/* <MapViewDirections
    origin={origin}
    destination={destination}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor={AppColors.Appcolor}
   
  /> */}
          {/* <Marker coordinate={{latitude:dlatitude,longitude:dlongitude}}

    /> */}
  </MapView>
   
      {/* <Image  style={{width:"100%",height:"50%"}} source={require('../assets/MapPic.png')} /> */}
      

    <View style={{}}>
      {/* <Text style={styles.text}>Where He Pickup Load</Text>
      <Text style={styles.text2}>Where He Gonna Drop The Load</Text> */}
      {/* <TouchableOpacity style={styles.btnDelivered}
    
    // onPress={() => navigation.navigate('')}
   >
     <Text style={{color:"black"}}>Pick-up load Selected Location</Text>
  </ TouchableOpacity>
  <TouchableOpacity style={styles.btnDelivered}
    
    // onPress={() => navigation.navigate('')}
   >
     <Text style={{color:"black"}}>drop the load Selected Location
</Text>
  </ TouchableOpacity> */}
      </View>
</View>
{/* <TouchableOpacity
style={{marginTop:20}}
onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder=" Delivered"
editable={false}
/>
</TouchableOpacity> */}
{/* <Button 
title="Delivered"
onPress={() => navigation.navigate('confirmationPage')}
/> */}
<TouchableOpacity style={styles.btnnDelivered}
    
    onPress={() => postion()}
    // onPress={() => navigation.navigate('mylocation')}
   >
     <Text style={{color:"black"}}>Delivered</Text>
  </ TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
    //   justifyContent: center,
    marginTop: 170,
      padding: 24,
      backgroundColor: "#eaeaea"
    },
    btnDelivered:{
      marginTop:20,
      alignSelf:"center",
      alignItems:"center",
      width:"90%",

      // borderRadius:400/2,
      // width:,
      // borderColor:'#EFDF79',
      padding:20,
      borderWidth:1,
      // backgroundColor:'#EFDF79',
      alignContent:"center"
    },
    btnnDelivered:{
      marginTop:20,
      alignSelf:"center",
      alignItems:"center",
      // borderRadius:400/2,
      width:"73%",
      // borderColor:'#EFDF79',
      padding:20,
      borderWidth:1,
      // backgroundColor:'#EFDF79',
      // alignContent:"center"
    },
  input: {
    height: 40,
    width:'60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf:"center",
    textAlign:"center"
  },
  header: {
    elevation: 0,
    backgroundColor: '#EFDF79',
    alignItems: "center",
    justifyContent: "center",
    // width:deviceWidth*0.07,
    // height: deviceHeight * 0.07,
    // alignSelf: "flex-start",
    borderRadius:15
  },
  text:{
      alignSelf:"center"
  },
  text2:{
    alignSelf:"center",
    marginTop:50
}
,mapShow:{
    height: '75%',
    // width:'100%',
    margin: 5,
    // borderWidth: 1,
    padding: 10,
  }
});
export default TrackYourDelivery