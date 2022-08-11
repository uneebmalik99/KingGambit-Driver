import React, { useEffect } from 'react'
import { View, Text,TouchableOpacity,TextInput,SafeAreaView, StyleSheet, Button, ScrollView } from 'react-native'
import { Appbar } from "react-native-paper";
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
import AsyncStorage from '@react-native-async-storage/async-storage';
import database from '@react-native-firebase/database';
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import AppColors from '../Colors/AppColors';

const WelcomeLogistic = ({navigation}) => {




  const getData =async ()=>{

    let Id = await AsyncStorage.getItem('Id')
    let Name = await AsyncStorage.getItem('Name')
    let Email = await AsyncStorage.getItem('Email')
    let Phone= await AsyncStorage.getItem('Phone')
    let DateofBirth= await AsyncStorage.getItem('DateofBirth')
      //  let CompanyName= await AsyncStorage.getItem('CompanyName')
       let SNN=  await AsyncStorage.getItem('SNN')
       let DotNumber=  await AsyncStorage.getItem('DotNumber')
       let McNumber=  await AsyncStorage.getItem('McNumber')
       let DL=  await AsyncStorage.getItem('DL')
      //  let EIN=  await AsyncStorage.getItem('EIN')
     let Role= await AsyncStorage.getItem('Role')
     let PaymentType=  await AsyncStorage.getItem('PaymentType')
       let BankInfo=  await AsyncStorage.getItem('BankInfo')
       let BankNumber=  await AsyncStorage.getItem('BankNumber')
       let CreditCardNo=  await AsyncStorage.getItem('CreditCardNo')
       let ExpireDate=  await AsyncStorage.getItem('ExpireDate')
       let SecurityCode= await AsyncStorage.getItem('SecurityCode')
       let ZipCode = await AsyncStorage.getItem('ZipCode')
       let token = await AsyncStorage.getItem('Token')
   
   
       AppConstance.Name=Name;
       AppConstance.Id=Id;
       AppConstance.Email=Email;
       AppConstance.Phone=Phone;
       AppConstance.DateofBirth=DateofBirth;
       // AppConstance.CompanyName=CompanyName;
       AppConstance.McNumber=McNumber;
       AppConstance.DL=DL;
       AppConstance.DotNumber=DotNumber;
       AppConstance.SNN=SNN;
       AppConstance.Role=Role;
       AppConstance.PaymentType=PaymentType;
       AppConstance.BankInfo=BankInfo;
       AppConstance.BankNumber=BankNumber;
       AppConstance.CreditCardNo=CreditCardNo;
       AppConstance.ExpireDate=ExpireDate;
       AppConstance.SecurityCode=SecurityCode;
       AppConstance.ZipCode=ZipCode;
   
       AppConstance.AUTH_KEY=token;
  }

useEffect(()=>{

  getData()


    database().ref('/item').once('value').then((snapshot)=>   {console.log(snapshot)} )
    
    
   

 
//  let Name = await AsyncStorage.getItem('Name')
//  let Email = await AsyncStorage.getItem('Email')
//  let Phone= await AsyncStorage.getItem('Phone')
//  let DateofBirth= await AsyncStorage.getItem('DateofBirth')
//     let CompanyName= await AsyncStorage.getItem('CompanyName')
//     let SNN=  await AsyncStorage.getItem('SNN')
//     let DotNumber=  await AsyncStorage.getItem('DotNumber')
//     let McNumber=  await AsyncStorage.getItem('McNumber')
//     let DL=  await AsyncStorage.getItem('DL')
//     let EIN=  await AsyncStorage.getItem('EIN')
//   let Role= await AsyncStorage.getItem('Role')
//   let PaymentType=  await AsyncStorage.getItem('PaymentType')
//     let BankInfo=  await AsyncStorage.getItem('BankInfo')
//     let BankNumber=  await AsyncStorage.getItem('BankNumber')
//     let CreditCardNo=  await AsyncStorage.getItem('CreditCardNo')
//     let ExpireDate=  await AsyncStorage.getItem('ExpireDate')
//     let SecurityCode= await AsyncStorage.getItem('SecurityCode')
//     let ZipCode = await AsyncStorage.getItem('ZipCode')


//     AppConstance.Name=Name;
//     AppConstance.Email=Email;
//     AppConstance.Phone=Phone;
//     AppConstance.DateofBirth=DateofBirth;
//     // AppConstance.CompanyName=CompanyName;
//     AppConstance.McNumber=McNumber;
//     AppConstance.DL=DL;
//     AppConstance.DotNumber=DotNumber;
//     AppConstance.SNN=SNN;
//     AppConstance.Role=Role;
//     AppConstance.PaymentType=PaymentType;
//     AppConstance.BankInfo=BankInfo;
//     AppConstance.BankNumber=BankNumber;
//     AppConstance.CreditCardNo=CreditCardNo;
//     AppConstance.ExpireDate=ExpireDate;
//     AppConstance.SecurityCode=SecurityCode;
//     AppConstance.ZipCode=ZipCode;

//     AppConstance.AUTH_KEY=responseJson.DATA.token;
 
},[])

  return (

        <SafeAreaView style={styles.container}>

<Appbar.Header style={styles.header}>

<View style={styles.headview}>

  <Ionicons name='menu-outline' 
  onPress={() => navigation.openDrawer()}
  style={{alignSelf:'center',}} size={30} color='white'/>
  <Text style={{color:"white",fontSize:16,alignSelf:'center' , }}>Home</Text>
  <MaterialCommunityIcons  name='account-circle-outline' 
  onPress={() => { navigation.navigate('profile')}}
  style={{alignSelf:'center',}} size={30} color='white'/>
</View>

</Appbar.Header>
      <View   style={styles.allLoadd}>
        
      <TouchableOpacity
      
        onPress={() => navigation.navigate('allLoad')}
      >
        <Feather name={'box'} style={{alignSelf:'center'}} size={30}   color={'black'} />
       <Text style={{color:"black",fontSize:20}}>ALL Load</Text>
      </TouchableOpacity>
    
      </View>
      <View   style={styles.allLoadd}>
        
        <TouchableOpacity
        
          onPress={() => navigation.navigate('notifee')}
        >
          <Feather name={'box'} style={{alignSelf:'center'}} size={30}   color={'black'} />
         <Text style={{color:"black",fontSize:20}}>Notifee</Text>
        </TouchableOpacity>
      
        </View>
      {/* <View   style={styles.allLoadd}>
      <TouchableOpacity
        style={{justifyContent:'space-around'}}
        onPress={() => navigation.navigate('profile')}
      >
        <Feather name={'box'} style={{alignSelf:'center'}} size={30} color={'black'} />

       <Text style={{color:"black",fontSize:20}}>Profile</Text>
      </TouchableOpacity>
     
      </View> */}
      
      {/* <View   style={styles.allLoadd}>
      <TouchableOpacity
        style={{justifyContent:'space-around'}}
        onPress={() => navigation.navigate('trackyourDelivery')}
      >
        <Feather name={'box'} style={{alignSelf:'center'}} size={30} color={'black'} />

       <Text style={{color:"black",fontSize:20}}>maps</Text>
      </TouchableOpacity>
     
      </View> */}
      

      
      {/* <TouchableOpacity style={styles.btnChkLoad}
    
    onPress={() => navigation.navigate('incomingLoad')}
   >
     <Text style={{color:"black"}}>Check ALL Lodad</Text>
  </ TouchableOpacity> */}
      {/* <Button title='Chk All Load' onPress={()=>navigation.navigate('incomingLoad')}></Button> */}

{/* </ScrollView> */}

    </SafeAreaView>
    
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
    //   justifyContent: center,
    backgroundColor: "#eaeaea",
    height:deviceHeight,
    width:deviceWidth,
      // backgroundColor: "#eaeaea"
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
    btnChkLoad:{
      marginTop:20,
      alignSelf:"center",
      alignItems:"center",
      borderRadius:400/2,
      // borderColor:'#EFDF79',
      padding:20,
      borderWidth:1,
      backgroundColor:'#EFDF79',
      alignContent:"center"
    },
  input: {
    height: 40,
    width:'80%',
    // marginTop:80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf:"center",
    textAlign:"center",
    color:"black",
    borderColor:'#EFDF79'
  },
  text:{
      alignSelf:"center",
      marginTop:70,
      color:"black"
  },
  allLoadd:{
    marginTop:40, borderWidth:1.5,borderRadius:10,width:'80%', 
    alignSelf:"center",height:'20%', justifyContent:"center",
    alignItems:"center",borderColor:'#EFDF79'
  }
});
export default WelcomeLogistic