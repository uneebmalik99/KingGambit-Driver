import React, { useState , useRef} from 'react'
import { View, Text,TouchableOpacity,TextInput,StyleSheet,Button } from 'react-native'

import MapView,{Marker} from 'react-native-maps';

import MapViewDirections from 'react-native-maps-directions';


const Maps = ({navigation}) => {

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

            <Text  style={styles.text}>Maps</Text>
            {/* <View style={styles.mapShow}> */}
    <MapView 
    // ref={mapRef}
    style={{width:"100%",height:"70%"}}
    initialRegion={
      pickupLocation
    }
  >
    <Marker
    coordinate={pickupLocation}
    />
    <Marker
    coordinate={dropUpLocation}
    />

  <MapViewDirections
    origin={pickupLocation}
    destination={dropUpLocation}
    apikey={GOOGLE_MAPS_APIKEY}
    // stroke
    strokeWidth={3}
    strokeColor='red'
   
  />
    
  </MapView>
            </View>
        
        // </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
      //   justifyContent: center,
      // marginTop: 170,
      //   padding: 24,
      //   backgroundColor: "#eaeaea"
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
    text:{
        alignSelf:"center"
    },
    mapShow:{
      height:"100%",
      width:"100%",
      // margin: 20,
      // borderWidth: 1,
      // padding: 10,
    }
  });
export default Maps