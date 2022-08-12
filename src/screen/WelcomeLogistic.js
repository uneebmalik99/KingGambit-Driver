import React, { useState , useRef} from 'react'
import { View, Text,TouchableOpacity,TextInput,StyleSheet,Button, Image } from 'react-native'

import MapView,{Marker} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { Appbar } from "react-native-paper";
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import AppColors from '../Colors/AppColors';
import Geolocation from '@react-native-community/geolocation';

const Maps = ({navigation}) => {

  const [longitude,setlongitude] = useState()
  const [latitude,setlatitude] = useState()
// curt loacation
Geolocation.getCurrentPosition(info =>
  {
    // console.log(info.coords.latitude)
    // console.log(info.coords.longitude)
    setlatitude(info.coords.latitude)
    setlongitude(info.coords.longitude)
    // console.log(longitude)

  } );

  const GOOGLE_MAPS_APIKEY ='AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo'
  const[location,setLocation] =useState({
    pickupLocation:{
      latitude: 33.5651,
      longitude: 73.0169,
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
    return (
        <View style={styles.container}>
<Appbar.Header style={styles.header}>

<View style={styles.headview}>

  <Ionicons name='menu-outline' 
  onPress={() => navigation.openDrawer()}
  style={{alignSelf:'center',}} size={30} color='white'/>
  <Text style={{color:"white",fontSize:16,alignSelf:'center' ,}}>Home</Text>
  <MaterialCommunityIcons  name='account-circle-outline' 
  onPress={() => { navigation.navigate('profile')}}
  style={{alignSelf:'center',}} size={30} color='white'/>
</View>

</Appbar.Header>
            <Text  style={styles.text}>Maps</Text>
            <Text  style={styles.text}>latitude {latitude}</Text>
            <Text  style={styles.text}>longitude {longitude}</Text>
            {/* <View style={styles.mapShow}> */}
    <MapView 
    // ref={mapRef}
    style={{width:"100%",height:"70%"}}
    initialRegion={
      pickupLocation
    }
  >
    <Marker coordinate={{latitude:latitude,longitude:longitude}}>
    <Image style={{width:55,height:55}} source={require('../assets/truck.jpg')} />
    {/* <MaterialCommunityIcons name='truck-fast-outline' 
style={{ height: 35, width: 45 }} size={40} color='black'/> */}
</Marker>
    {/* <Marker
    coordinate={pickupLocation}
    />
    <Marker
    coordinate={dropUpLocation}
    /> */}

  {/* <MapViewDirections
    origin={pickupLocation}
    // destination={dropUpLocation}
    // apikey={GOOGLE_MAPS_APIKEY}
    // stroke
    strokeWidth={3}
    strokeColor='red'
   
  /> */}
    
  </MapView>
            </View>
        
        // </View>
    )
}

  
const styles = StyleSheet.create({
  container: {
      flex: 1,
  },
  text:{
    alignSelf:"center"
},
mapShow:{
  height:"100%",
  width:"100%",
  // margin: 20,
  // borderWidth: 1,
  // padding: 10,
},
  header: {
      elevation: 0,
      backgroundColor: 'transparent',
      alignItems: "center",
      justifyContent: "center",
      width:deviceWidth,
      paddingHorizontal:0,
      paddingVertical:0,
      // width:deviceWidth*0.07,
      // height: deviceHeight * 0.07,
      // alignSelf: "flex-start",
    
    },
    btnBorder:{
      borderColor:'#EFDF79',
      borderWidth:3,
      // borderRadius:200,
      // height:100,
      borderRadius:130/2,
      height:130,
      width:130,
      justifyContent:"center",
      alignSelf:"center"
    },
    btnregister :{
    //  / / width:100,
  padding:10,
  // height:40,
  // marginTop:20,
  justifyContent:"center",
  height:"70%",
  width:'71%',
  alignSelf:"center",
  alignItems:"center",
  borderRadius:400/2,
  borderColor:'#EFDF79',
  borderWidth:1,
  backgroundColor:'#EFDF79',
  alignContent:"center"
  // fontSize:40
  
    },
  headview:{
      height:'100%',
      paddingHorizontal:13,
      width:'100%',
      flexDirection:'row',
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
      justifyContent:'space-between',
      backgroundColor:AppColors.Appcolor
    },
  input: {
      height: 45,
      margin: 3,
      alignSelf:"center",
      padding: 2,
      color:'black',
      fontWeight:'600',
      width:"70%",
      borderColor:'#EFDF79',
      borderWidth:1,
      borderRadius:10,
      backgroundColor:"white",
      // width:190

    },
})

export default Maps