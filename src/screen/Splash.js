import React,{useEffect} from 'react'
import { View, Text,Button , Dimensions, ImageBackground, StyleSheet,ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Splash = ({navigation}) => {

  // componentDid

  useEffect(() => {
   
//  setTimeout(()=>{
  AsyncStorage.getItem('Login').then((logn)=>{
    if ( logn == '1')
    {
      navigation.navigate('AppDrawer')
    
    }
    else if(logn == '0' || logn ==null){
    
      navigation.navigate('login')
    
    }
    
    
        }
        )
// },2000)
  },[]);

    return (
    <SafeAreaView style={styles.container}>
    
    <ImageBackground source={require('../assets/Splash.png')} resizeMode="cover" style={styles.image}>
            </ImageBackground>
  </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      justifyContent: "center",
      height:deviceHeight,
      width:deviceWidth,
      position:'absolute',
      paddingVertical:0
    },
    title: {
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    }
  });
  
export default Splash
