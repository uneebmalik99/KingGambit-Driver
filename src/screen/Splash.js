import React,{useEffect, useState} from 'react'
import { View, Text,Button , Dimensions, ImageBackground, StyleSheet,ActivityIndicator} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
import AppConstance from '../constance/AppConstance';


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const Splash = ({navigation}) => {
const [deviceid,setdeviceid] =useState('')
  // componentDid

  const storeData = async (responseJson) => {

    AppConstance.Login="1"
    AppConstance.Id =responseJson.DATA.user.id.toString()
    AppConstance.Name=responseJson.DATA.user.Name;
    AppConstance.Email=responseJson.DATA.user.Email;
    AppConstance.Password=responseJson.DATA.user.Password;

    AppConstance.Phone=responseJson.DATA.user.Phone;
    AppConstance.DateofBirth=responseJson.DATA.user.Date_of_Birth;
    // AppConstance.CompanyName=responseJson.DATA.user.Company_Name;
    AppConstance.snn=responseJson.DATA.user.snn;
    AppConstance.Role=responseJson.DATA.user.Role;
    AppConstance.PaymentType=responseJson.DATA.user.Payment_Type;
    AppConstance.BankInfo=responseJson.DATA.user.Bank_Info;
    AppConstance.BankNumber=responseJson.DATA.user.Bank_Number;
    AppConstance.CreditCardNo=responseJson.DATA.user.Credit_Card_No;
    AppConstance.ExpireDate=responseJson.DATA.user.Expire_Date;
    AppConstance.SecurityCode=responseJson.DATA.user.Security_Code;
    AppConstance.ZipCode=responseJson.DATA.user.Zip_Code;

    AppConstance.AUTH_KEY=responseJson.DATA.token;

    try {
    await AsyncStorage.setItem('Login',"1")
    await AsyncStorage.setItem('Id',responseJson.DATA.user.id.toString())


    await AsyncStorage.setItem('Name', responseJson.DATA.user.Name)
    await AsyncStorage.setItem('Email', responseJson.DATA.user.Email)
    await AsyncStorage.setItem('Password', responseJson.DATA.user.Password)

    await AsyncStorage.setItem('Phone', responseJson.DATA.user.Phone)
    await AsyncStorage.setItem('DateofBirth', responseJson.DATA.user.Date_of_Birth)
    
    // if (responseJson.DATA.user.Company_Name!= null){
    //   // await AsyncStorage.setItem('SNN', responseJson.DATA.user.SNN)
    //   await AsyncStorage.setItem('CompanyName', responseJson.DATA.user.Company_Name)


    // }
      // await AsyncStorage.setItem('CompanyName', responseJson.DATA.user.Company_Name)
    
    if (responseJson.DATA.user.SNN != null){
      await AsyncStorage.setItem('SNN', responseJson.DATA.user.SNN)

    }
    if (responseJson.DATA.user.Dot_Number != null){
      await AsyncStorage.setItem('DotNumber', responseJson.DATA.user.Dot_Number)

    }
    if (responseJson.DATA.user.MC_Number != null){
      await AsyncStorage.setItem('McNumber', responseJson.DATA.user.MC_Number)

    }
    if (responseJson.DATA.user.DL != null){
      await AsyncStorage.setItem('DL', responseJson.DATA.user.DL)

    }
    
     
      // await AsyncStorage.setItem('DL', responseJson.DATA.user.DL)
    
   
    await AsyncStorage.setItem('Role', responseJson.DATA.user.Role)

    await AsyncStorage.setItem('PaymentType', responseJson.DATA.user.Payment_Type)
    if(responseJson.DATA.user.Payment_Type	 == "0"){
      await AsyncStorage.setItem('BankInfo', responseJson.DATA.user.Bank_Info)
      await AsyncStorage.setItem('BankNumber', responseJson.DATA.user.Bank_Number)
    }else{
      await AsyncStorage.setItem('CreditCardNo', responseJson.DATA.user.Credit_Card_No)
      await AsyncStorage.setItem('ExpireDate', responseJson.DATA.user.Expire_Date)
      await AsyncStorage.setItem('SecurityCode', responseJson.DATA.user.Security_Code)
      await AsyncStorage.setItem('ZipCode', responseJson.DATA.user.Zip_Code)
    }

    await AsyncStorage.setItem('Token', responseJson.DATA.token)
    setspinner(false)

    navigation.navigate('AppDrawer')

    }
     catch (e) {
      console.log(e)
    }
  
  }

  const loginApi =async ()=>{
    setspinner(true)

    let email = await  AsyncStorage.get('Email');
    let password = await  AsyncStorage.get('Password');
   
    if(email != null && password != null)
    {

    let value = {};
    value.Email = email;
    value.Password=password;
    value.Device_id=deviceid

    var url =AppUrlCollection.LOGIN;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(value),
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {

          if(responseJson.message == 'SUCCESS'){
            // alert(responseJson.DATA.user.Bank_Info)
            // alert(JSON.stringify(responseJson))

            console.log('login data response',responseJson);

            // alert(responseJson.DATA)
            storeData(responseJson)

        //  loginServiceCall( responseJson , responseJson.user.role, responseJson.user.username, responseJson.user.role_name, responseJson.user.photo)

          }else if(responseJson.status == 422){
            setspinner(false)

            alert(responseJson.errors.password)
          }else if(responseJson.status == 401){
            setspinner(false)

            alert(responseJson.error)
          }
      console.log('login data response',responseJson);
    //   setspinner(false)  
      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
    }
      // <ActivityIndicator size='large' color="#EFDF79" animating={true}  />
  }

  useEffect( async () => {
   
//  setTimeout(()=>{


  let fcmToken = await messaging().getToken();
  if (fcmToken) {
    console.log("fcm"+fcmToken);
      // await AsyncStorage.setItem('device_token', fcmToken);
      setdeviceid(fcmToken)
      
  }
  AsyncStorage.getItem('Login').then((logn)=>{
    if ( logn == '1')
    {
      loginApi()
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
