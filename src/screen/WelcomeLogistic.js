import React, { useState ,useEffect} from 'react'
import { View,PermissionsAndroid, Text,TouchableOpacity,TextInput,StyleSheet,Button, Image ,Modal, SafeAreaView} from 'react-native'

import MapView,{Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import DocumentPicker from 'react-native-document-picker';

import MapViewDirections from 'react-native-maps-directions';

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';


import { Appbar } from "react-native-paper";
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import AppColors from '../Colors/AppColors';
import Geolocation from '@react-native-community/geolocation';
import Geolocation1 from 'react-native-geolocation-service';
import messaging from '@react-native-firebase/messaging';

import StarReview from 'react-native-star-review'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { set } from 'react-native-reanimated';
import Snackbar from 'react-native-snackbar';
import database from '@react-native-firebase/database';
import { useFocusEffect,useIsFocused } from '@react-navigation/native';

import * as Progress from 'react-native-progress';
import ProgressBarAnimated from 'react-native-progress-bar-animated';
import ProgressBar from "react-native-animated-progress";



const Maps = ({route, navigation}) => {

  const isFocused = useIsFocused();

const [progressv,setprogressv ]= useState(0.1)
  const [ViewShow,setViewShow] = useState(false)  
  const [pmapmodel , setpmapmodel] = useState(false)
const [user_id,setuser_id ]= useState('')
  const [longitude,setlongitude] = useState(73.079547)
  const [latitude,setlatitude] = useState(33.664703)
  const [haveLoad,sethaveLoad] = useState('0')
  const [chkk,setchkk] = useState('')
  const [delivermodel, setdelivermodel]= useState(false)
  const [cancelcount, setcancelcount]= useState()
  const [destinationLatitude,setdestinationLatitude] = useState(33.664703)
  const [destinationLongitude,setdestinationLongitude] = useState(73.079547)
  const [spinner,setspinner]=useState(false)
 const [Load_id, setLoad_id] = useState('')


  const [pickupLatitude,setpickupLatitude] = useState(33.658566)
  const [pickupLongitude,setpickupLongitude] = useState(73.063308)
  const [D_Address,setD_Address] = useState('')
  const [P_Address,setP_Address] = useState('')
  const [Weight,setWeight] = useState('')
  const [Vehicle_Type,setVehicle_Type] = useState('')
  const [confirmationPic,setconfirmationPic] = useState('')
  const [sealedPic,setsealedPic] = useState('')
  const [status,setstatus] = useState(null)

  const [cancelmodal, setcancelmodal] = useState(false)

  const [confirmationPicName,setconfirmationPicName] = useState('')
  const [sealedPicName,setsealedPicName] = useState('')

  const [showModal, setshowModal] = useState(false)
  const[maxRating,setMaxRating] = useState([1,2,3,4,5])
  const[defaultRating,setDefaultRating] = useState(1)
  const[message,setMessage] = useState('')

  const starImgFilled ='https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
  const starImgCorner ='https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'


  // curt loacation
// Geolocation.getCurrentPosition(info =>
//   {
//     // console.log(info.coords.latitude)
//     // console.log(info.coords.longitude)
//     setlatitude(info.coords.latitude)
//     setlongitude(info.coords.longitude)
//     // console.log(longitude)
    
// //    Geolocation.getCurrentPosition(info => console.log(info))
// console.log(info)
//   } );

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


  const GetUserInfo = async ()=>{

    setspinner(true)
    var url =AppUrlCollection.USER+'/'+AppConstance.Id;

    // var url =AppUrlCollection.USER;
    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type':  'application/json',
        'Accept':'application/json',
        'Authorization': "Bearer "+AppConstance.AUTH_KEY
      }
     
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {

        AsyncStorage.setItem('HaveLoad',responseJson.DATA.user.Have_Load)
        AppConstance.HaveLoad =responseJson.DATA.user.Have_Load;

        sethaveLoad(responseJson.DATA.user.Have_Load)
        setspinner(false)
        
   
   console.log(responseJson)
  //  console.log(responseJson.Data.user)
   AppConstance.Id=responseJson.id;
   AppConstance.Name=responseJson.Name;
   AppConstance.Email=responseJson.Email;
   AppConstance.SNN =responseJson.SNN;
   AppConstance.DL =responseJson.DL;
   AppConstance.McNumber=responseJson.MC_Number;
   AppConstance.Phone=responseJson.Phone;
   AppConstance.DateofBirth=responseJson.Date_of_Birth;
   AppConstance.Role=responseJson.Role;
   AppConstance.PaymentType=responseJson.Payment_Type;
   AppConstance.HaveLoad=responseJson.Have_Load;

   if(responseJson.Payment_Type	== "0"){
     
     AppConstance.BankInfo=responseJson.Bank_Info;
     AppConstance.BankNumber=responseJson.Bank_Number;
   }else{

     AppConstance.CreditCardNo=responseJson.Credit_Card_No;
     AppConstance.ExpireDate=responseJson.Expire_Date;
     AppConstance.SecurityCode=responseJson.Security_Code;
    //  AppConstance.ZipCode=ZipCode;
   }

  //  AppConstance.AUTH_KEY=responseJson.Token;
   setspinner(false)
          if(responseJson.result == 'SUCCESS'){
     
            console.log('login data response',responseJson);
            // alert(responseJson.DATA)

        //  loginServiceCall( responseJson , responseJson.user.role, responseJson.user.username, responseJson.user.role_name, responseJson.user.photo)

          }else if(responseJson.status == 422){
            setspinner(false)

            alert(responseJson.errors.password)
          }else if(responseJson.status == 401){
            setspinner(false)

            alert(responseJson.error)
          }
      console.log('login data below error response',responseJson);
    
      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
 
  }

  const galleryConfirmationPic= async()=>{

    try {
      const pickerResult = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
  
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      })
      console.log('---'+pickerResult)
      const str = pickerResult.name;

const last = str.slice(-10);
console.log(last); 
      setconfirmationPicName(last)
      setconfirmationPic(pickerResult)

      console.log('--------'+Load_id +"       "+pickerResult)
      var value = new FormData()
      value.append('Confirmation_Pic', pickerResult )
      value.append('load_id',Load_id)
      var url =AppUrlCollection.CONFIRMATION_PIC;
      setspinner(true)
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: value,
    })
        .then((response) =>  response.json() )
        .then((responseJson) => {
          setspinner(false)
          console.log('login data response',responseJson);
          setspinner(false)
            if(responseJson.result == 'SUCCESS'){
  
              Snackbar.show({
                text: 'Pick-up Image Uploaded Successfully',
                duration: Snackbar.LENGTH_SHORT,
                backgroundColor	:AppColors.Appcolor,
              });

              console.log('login data response',responseJson);
              setspinner(false)
            }
        console.log('login data response',responseJson);
      //   setspinner(false)  
        })
        .catch((error) => {
          setspinner(false)
  
          alert('error'+error)
                // navigation.navigate('login')
  
            console.warn(error)
        });
    } catch (e) {
      console.log(e)
    }
    //

   
  }

  const gallerySealedPic= async()=>{

    try {
      const pickerResult = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.images],
  
        presentationStyle: 'fullScreen',
        copyTo: 'cachesDirectory',
      })
      // console.log(pickerResult.name)
      const str = pickerResult.name;

      const last = str.slice(-10);
      console.log(last); 
            setsealedPicName(last)
      setsealedPic(pickerResult.name)
      
      console.log("---"+pickerResult + '     '+ Load_id);
      setspinner(true)
      var value = new FormData()
      value.append('Sealed_Pic', pickerResult )
      value.append('load_id',Load_id)

      var url =AppUrlCollection.SEALED_PIC;
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type':  'multipart/form-data',
        },
        body: value,
    })
        .then((response) =>  response.json() )
        .then((responseJson) => {
          console.log('login data response',responseJson);
          setspinner(false)
            if(responseJson.result == 'SUCCESS'){
  
              setTimeout(() => {
                Snackbar.show({
                  text: 'Drop-Off Image Uploaded Successfully',
                  duration: Snackbar.LENGTH_SHORT,
                  backgroundColor	:AppColors.Appcolor,
                });
                // navigation.navigate('login')
              }, 200);
              
                  // navigation.navigate('login')
  
              console.log('login data response',responseJson);
              setspinner(false)
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
                // navigation.navigate('login')
  
            console.warn(error)
        });

    } catch (e) {
      console.log(e)
    }
  
   
  }
  const getdata = async () => {

   let Id =  await AsyncStorage.getItem('Id')
    let Name =  await AsyncStorage.getItem('Name')
    let Email = await AsyncStorage.getItem('Email')
    let Phone = await AsyncStorage.getItem('Phone')
    let DateofBirth = await AsyncStorage.getItem('DateofBirth')
    let DotNumber = await AsyncStorage.getItem('DotNumber')
    let SNN = await AsyncStorage.getItem('SNN')
    let Role = await AsyncStorage.getItem('Role')

    let Rating = await AsyncStorage.getItem('Rating')
    let McNumber = await AsyncStorage.getItem('McNumber')
    let DL = await AsyncStorage.getItem('DL')
    let HaveLoad = await AsyncStorage.getItem('HaveLoad')

    let PaymentType = await AsyncStorage.getItem('PaymentType')
    AppConstance.Login = "0";
    AppConstance.Id=Id;
    AppConstance.Name=Name;
    AppConstance.Email=Email;
    AppConstance.rating = Rating;
    AppConstance.SNN =SNN;
    AppConstance.DL =DL;
    AppConstance.McNumber=McNumber;
    AppConstance.Phone=Phone;
    AppConstance.DateofBirth=DateofBirth;
    AppConstance.Role=Role;
    AppConstance.PaymentType=PaymentType;
    AppConstance.HaveLoad=HaveLoad;

    if(PaymentType	== "0"){
      let BankInfo =await AsyncStorage.getItem('BankInfo')
      let BankNumber =await AsyncStorage.getItem('BankNumber')
      AppConstance.BankInfo=BankInfo;
      AppConstance.BankNumber=BankNumber;
    }else{
      let CreditCardNo = await AsyncStorage.getItem('CreditCardNo')
      let ExpireDate =await AsyncStorage.getItem('ExpireDate')
     let SecurityCode= await AsyncStorage.getItem('SecurityCode')
      let ZipCode =await AsyncStorage.getItem('ZipCode')
      AppConstance.CreditCardNo=CreditCardNo;
      AppConstance.ExpireDate=ExpireDate;
      AppConstance.SecurityCode=SecurityCode;
      AppConstance.ZipCode=ZipCode;
    }

    let Token = await AsyncStorage.getItem('Token')
    AppConstance.AUTH_KEY=Token;
   
    var url =AppUrlCollection.USER+'/'+Id;

    console.log('workes');

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type':  'application/json',
        'Accept':'application/json',
        'Authorization': "Bearer "+AppConstance.AUTH_KEY
      }
     
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {

        AsyncStorage.setItem('HaveLoad',responseJson.Have_Load)
        AppConstance.HaveLoad =responseJson.Have_Load;

        if(responseJson.Have_Load == '1' && responseJson.load_id != null)
        {
          setLoad_id(responseJson.load_id)
          LoadApi(responseJson.load_id)
       
        }
        sethaveLoad(responseJson.Have_Load)
   
   AppConstance.Id=responseJson.id;
   AppConstance.Name=responseJson.Name;
   AppConstance.Email=responseJson.Email;
   AppConstance.SNN =responseJson.SNN;
   AppConstance.DL =responseJson.DL;
   AppConstance.McNumber=responseJson.MC_Number;
   AppConstance.Phone=responseJson.Phone;
   AppConstance.DateofBirth=responseJson.Date_of_Birth;
   AppConstance.Role=responseJson.Role;
   AppConstance.PaymentType=responseJson.Payment_Type;
   AppConstance.HaveLoad=responseJson.Have_Load;


   if(responseJson.Payment_Type	== "0"){
     
     AppConstance.BankInfo=responseJson.Bank_Info;
     AppConstance.BankNumber=responseJson.Bank_Number;
   }else{

     AppConstance.CreditCardNo=responseJson.Credit_Card_No;
     AppConstance.ExpireDate=responseJson.Expire_Date;
     AppConstance.SecurityCode=responseJson.Security_Code;
   }


      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
    
   
  
  }

  const requestLocationPermission = async (load_id) => {

    // alert(plocation.latitude)
    if (Platform.OS === 'ios') {
      
      postion(load_id)  
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
          //  getLivePosition()
          postion(load_id)  
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

  const LoadApi =(load_id)=>{

    setspinner(true)

    
    requestLocationPermission(load_id)
      setLoad_id(load_id)
    console.log(load_id)
      var url = AppUrlCollection.LOAD + "?id="+load_id;
    
      fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type':  'application/json',
          'Authorization': "Bearer "+AppConstance.AUTH_KEY
        }
    })
        .then((response) =>  response.json() )
        .then((responseJson) => {
    
          // setdata(responseJson)
           setspinner(false)
        console.log('load data welcome',responseJson);

        setdelivermodel(true)
          // alert(responseJson[0].P_Latitude)
          setuser_id(responseJson[0].User_id)
        setpickupLatitude(parseFloat(responseJson[0].P_Latitude))
        setpickupLongitude(parseFloat(responseJson[0].P_Longitude))
        setdestinationLatitude(parseFloat(responseJson[0].D_Latitude))
        setdestinationLongitude(parseFloat(responseJson[0].D_Longitudes))
        setD_Address(responseJson[0].D_Address)
        setP_Address(responseJson[0].P_Address)
        setVehicle_Type(responseJson[0].Vehicle_Type)
        setconfirmationPic(responseJson[0].Confirmation_Pic)
        setsealedPic(responseJson[0].Sealed_Pic)
        setcancelcount(responseJson[0].Cancel_count)
        setdelivermodel(true)
        sethaveLoad('1')
        setstatus(responseJson[0].Status)
        
      //   setspinner(false)  
        })
        .catch((error) => {
          // setspinner(false)
          alert(error)
            console.warn(error)
        });
        
        // <ActivityIndicator size='large' color="#EFDF79" animating={true}  />
  }

  const postion =(load_id)=>{
   Geolocation1.watchPosition(
      (position) => {
        console.log(position);
        database()
        .ref('/kingGamBit/Loads/'+load_id)
        .update({
          C_Latitude:position.coords.latitude,
          C_Longitude:position.coords.longitude
        })
      },
      (error) => {
// alert('error'+error)     
   console.log(error);
      },
      {
        accuracy: {
          android: 'high',
          ios: 'best',
        },
        enableHighAccuracy: true,
        distanceFilter: 0,
        interval: 5000,
        fastestInterval: 2000,
        forceRequestLocation: true,
        forceLocationManager: true,
        showLocationDialog: true,
        useSignificantChanges: false,
      },
    );

  }
  
  const cancelapi = ()=>{

    console.log('cancel working');
    setspinner(true)
    
    let value = {};
    value.load_id = Load_id;

    if(parseInt(cancelcount) >= 4){
      value.Status="3";
    }else{
      value.Status="0";
    }

    value.user_type = "0";



    var url =AppUrlCollection.CANCEL_RIDE;
  

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(value),
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {
  // alert(JSON.stringify(responseJson))

  if(responseJson.result == "Success"){

        console.log(responseJson);
        setcancelmodal(false)
        setdelivermodel(false)
        setspinner(false)
        sethaveLoad(0)


      }

  
      })
      .catch((error) => {
        alert(error)
        setspinner(false)

          console.warn(error)
      });
    }

  useEffect( ()=>{

    messaging().onMessage(async remoteMessage => {
      // Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      if(remoteMessage.data.type == "5"){
   
        Snackbar.show({
          text: 'Client Cancelled the Load',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor	:AppColors.Appcolor,
        });

        sethaveLoad("0")
        setdelivermodel(false)
        setshowModal(false)

      }else if(remoteMessage.data.type == "6"){

        // console.log(remoteMessage.data.);
        setpickupLatitude(remoteMessage.data.P_Latitude)
        setpickupLongitude(remoteMessage.data.P_Longitude)

        setdestinationLatitude(remoteMessage.data.D_Latitude)
        setdestinationLongitude(remoteMessage.data.D_Longitudes)


        Snackbar.show({
          text: 'Pick-Up / Drop-Off Location Changed',
          duration: Snackbar.LENGTH_LONG,
          backgroundColor	:AppColors.Appcolor,
        });
      }else{
       console.log('notification else');
        
      }
    })



    // Geolocation.getCurrentPosition(info =>
    //   {
    
    //     setlatitude(info.coords.latitude)
    //     setlongitude(info.coords.longitude)

    // console.log(info)
    //   } );
 getdata()

//  if(isFocused){
//   if(route.params?.post)
//     {
//     console.log('works');
//       LoadApi(route.params?.post)
//     }  
//   // callback
// }

  },[])


const submit = async (defaultRating)=>{
  setspinner(true)
  let Id = await AsyncStorage.getItem('Id')
  let value = {};
  value.User_id = user_id;
  value.Driver_Id=Id;
  value.load_id = Load_id;
  value.Status = 2,
  value.Rating = defaultRating,

  fetch(AppUrlCollection.STATUS_UPDATE, {
    method: 'PUT',
    headers: {
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(value),
})
    .then((response) =>  response.json() )
    .then((responseJson) => {
      // alert(JSON.stringify(responseJson))
setspinner(false)
      if(responseJson.Status == '1'){
        setspinner(false)
        sethaveLoad('0')
// alert('jnk')

 database().ref('/kingGamBit/Loads/'+Load_id)
.remove();

        setshowModal(false)

        setdelivermodel(false)



        
      }
      console.log('res of status update', responseJson);


  //   setspinner(false)  
    })
    .catch((error) => {
      // setspinner(false)
      alert(error)
        console.warn(error)
    });
  
}


    return (
        <View style={styles.container}>

      <Spinner
        visible={spinner}
        textContent={"Loading..."}
        color	={AppColors.Appcolor}
        animation	='fade'
        size='large'
        overlayColor='rgba(0, 0, 0, 0.25)'
         textStyle={{ color: AppColors.Appcolor }}
      />

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

          {/* <TouchableOpacity onPress={()=> {postion()}}>
            <Text>jkdfsjkdfsnkd</Text>
          </TouchableOpacity> */}

          </Appbar.Header>


          <Modal
       transparent={true}
       visible={cancelmodal}
       animationType="fade"
       
       >
        
        <SafeAreaView style={{backgroundColor:"#000000aa",justifyContent:'center', flex:1}} >
          
        <View style={{backgroundColor:"#ffffff",borderTopRightRadius:15,borderTopLeftRadius:15
        ,width:"90%" ,alignSelf:"center",marginTop:"0%", borderColor:AppColors.Appcolor}} >


          
<View style={{height:40,paddingHorizontal:5, width:'100%', backgroundColor:AppColors.AppGrey ,justifyContent:'center', borderTopLeftRadius:15, borderTopRightRadius:15,}}>

<TouchableOpacity 
 onPress={()=> {setcancelmodal(false)}}
style={{justifyContent:'center',alignSelf:'flex-end' 

 }}>

<Ionicons onPress={()=> setcancelmodal(false)} name='ios-close-outline'style={{alignSelf:'center', }} size={25} />

</TouchableOpacity>


</View>

     
     <Text style={{alignSelf:'center',paddingVertical:20, fontSize:18}}>Do you want to Cancel Load ?</Text>

           <View style={{flexDirection:"row",paddingVertical:15, justifyContent:'space-around', width:"100%", 
        marginTop:"0%"}}>
         

<TouchableOpacity 
 onPress={()=> { setcancelmodal(false)}}
style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor,
 borderRadius:15,height:40,}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
          No</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=> { cancelapi()}}
        style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor, borderRadius:15,
        height:40}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
          Yes                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
          </Text>
        </TouchableOpacity>
        
            </View>


  


 


</View>

</SafeAreaView>

       </Modal>


          

 
      <Modal
       transparent={true}
       visible={showModal}
       animationType="fade"
       
       >
        
        <SafeAreaView style={{backgroundColor:"#000000aa",flex:1}} >
        <View style={{backgroundColor:"#ffffff",borderTopRightRadius:15,borderTopLeftRadius:15
        ,width:"90%" ,alignSelf:"center",height:"40%",justifyContent:"center",marginTop:"40%",
        borderWidth:1,borderColor:AppColors.Appcolor}} >
     
 <View 
            style={styles.customRatingBarStyle}
            >
                {
                    maxRating.map((item,key)=>{
                        return(
                            <TouchableOpacity
                            activeOpacity={0.7}
                            key={item}
                            onPress ={()=> setDefaultRating(item)}
                            >
                                <Image
                                    style={styles.starImgStyle}
                                    source={
                                        item <= defaultRating ?
                                        {uri: starImgFilled}
                                        :
                                        {uri : starImgCorner}
                                    }
                                />
                                
                            </TouchableOpacity>
                        )
                    })
                    
                }
                
            </View>
     <View >
     <Text style={styles.text}>
               
               {
                   defaultRating +"/"+ maxRating.length
               }
               </Text>



           </View>

           <View style={{flexDirection:"row",justifyContent:'space-around',width:"100%",
           height:'33%',marginTop:"3%"}}>

<TouchableOpacity 
 onPress={()=>setshowModal(false)}
style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor,
 borderRadius:15,height:"50%",}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
            Ignore</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=>submit(defaultRating)}
        style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor, borderRadius:15,
        height:"50%"}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
        Submit                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
          </Text>
        </TouchableOpacity>
        
            </View>


  


 


</View>

</SafeAreaView>

       </Modal>

      <MapView 
    // showsUserLocation={true}
    // showsMyLocationButton={true}
    provider={PROVIDER_GOOGLE}
      style={{width:"100%",height:haveLoad=='1'? "70%":'100%'}}
      initialRegion={
  {
    latitude:latitude,longitude:longitude,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  }
      }
    >



      




  {
    // haveLoad == '1' ?
    delivermodel == true ?
      <Marker coordinate={{latitude:latitude,longitude:longitude}}>
      <Image style={{width:55,height:55 , resizeMode:'contain'}} source={require('../assets/truck22.png')} />
      </Marker>
      :
      null
      }
  {
    // haveLoad == '1' ?
    delivermodel == true ?

      <Marker coordinate={{latitude:pickupLatitude,longitude:pickupLongitude}}>
      </Marker>
    :
    null
    }
    {
    // haveLoad == '1' ?
    delivermodel == true ?

    <MapViewDirections
      origin={{latitude:pickupLatitude , longitude:pickupLongitude}}
      destination={{latitude:destinationLatitude, longitude:destinationLongitude}}
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
    delivermodel == true ?

      <Marker coordinate={{latitude:destinationLatitude,longitude:destinationLongitude}}>
      </Marker>
      :
      null
      }




      
      </MapView>

  


      {/* {delivermodel == true ?


<View style={{backgroundColor:'white',position:'absolute', width:'90%',alignSelf:'center',paddingHorizontal:10,marginTop:'25%', borderRadius:8,paddingVertical:5, flexDirection:'column'}}>


<View style={{ flexDirection:'row',paddingVertical:5, }}>
<FontAwesome name='circle-o' style={{alignSelf:'center'}} color={AppColors.skyblue} size={15} />

<Text style={{marginLeft:10 , fontSize:16}}>{P_Address}</Text>

  </View>


  <View style={{borderTopWidth:0.5,borderColor:'#CACFD2',paddingVertical:5, flexDirection:'row' }}>
<FontAwesome name='circle-o' style={{alignSelf:'center'}} color={AppColors.skyblue} size={15} />

<Text style={{marginLeft:10 , fontSize:16}}>{D_Address}</Text>

  </View>
  
</View>

:
null

} */}
     

    





          {delivermodel == true ?



            <SafeAreaView 
            
            style={{width:"100%",  borderWidth:2,borderTopLeftRadius:15,
            borderTopRightRadius:15,position:'absolute',bottom:0, backgroundColor:'white',   borderColor:AppColors.Appcolor}}>



<View style={{backgroundColor:'white', borderWidth:0.3, marginVertical:10, borderColor:'grey', width:'90%',alignSelf:'center',paddingHorizontal:10, borderRadius:8,paddingVertical:5, flexDirection:'column'}}>


<View style={{ flexDirection:'row',paddingVertical:5, }}>
<FontAwesome name='circle-o' style={{alignSelf:'center'}} color={AppColors.skyblue} size={15} />

<Text style={{marginLeft:10 , fontSize:16}}>{P_Address}</Text>

  </View>


  <View style={{borderTopWidth:0.5,borderColor:'#CACFD2',paddingVertical:5, flexDirection:'row' }}>
<FontAwesome name='circle-o' style={{alignSelf:'center'}} color={AppColors.skyblue} size={15} />

<Text style={{marginLeft:10 , fontSize:16}}>{D_Address}</Text>

  </View>
  
</View>
            
                    
            
            <View style={{justifyContent:'space-around',height:50,marginVertical:5, flexDirection:'row',  width:'90%', alignSelf:'center', marginTop:4,}}>

              <TouchableOpacity 
              onPress={()=> {galleryConfirmationPic()}}

              style={{width:'45%',justifyContent:'center',  backgroundColor:AppColors.Appcolor, borderRadius:10,}}>
              <Text style={{alignSelf:'center',fontSize:12, color:'white'}}>{confirmationPicName == ''?"Upload Pick-Up Image":confirmationPicName}</Text>
              </TouchableOpacity>

              <TouchableOpacity 
                            onPress={()=> {gallerySealedPic()}}

              style={{width:'45%',justifyContent:'center', backgroundColor:AppColors.Appcolor,  borderRadius:10,}}>
              <Text style={{alignSelf:'center',fontSize:12, color:'white'}}>{sealedPicName == ''?"Upload Drop_Off Image":sealedPicName}</Text>
              </TouchableOpacity>





            </View>
       
                     

        <View style={{justifyContent:'space-around',height:100,alignItems:'center',  paddingHorizontal:10, }}>
            

            <TouchableOpacity
                      // disabled={confirmationPic && sealedPic == null || confirmationPic && sealedPic == '' ? false :true}
                      onPress={()=> {   setcancelmodal(true)

                      }}
                      style={{justifyContent:'center',alignSelf:'center', width:'80%', backgroundColor:'red',alignSelf:"center",
                      borderRadius:15,
                  height:"45%",}}>
                    <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>Cancel Load</Text>
                  </TouchableOpacity>

                      <TouchableOpacity
                      // disabled={confirmationPic && sealedPic == null || confirmationPic && sealedPic == '' ? false :true}
                      onPress={()=> { setshowModal(true)
                      }}
                      style={{justifyContent:'center',width:'80%', backgroundColor:confirmationPic && sealedPic != null ? AppColors.Appcolor:"grey",alignSelf:"center",
                      borderRadius:15,
                  height:"45%",}}>
                    <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>Delivered</Text>
                  </TouchableOpacity>


        </View>
                    
                    </SafeAreaView>

                    : null}



                      {/* {delivermodel == true ?

<View style={{backgroundColor:'white',justifyContent:'space-around', borderRadius:10,paddingVertical:5, paddingHorizontal:5, width:'90%', alignSelf:'center', marginTop:5}}>

    <View style={{flexDirection:'row', paddingVertical:5}}>
    <FontAwesome name='circle-o' style={{alignSelf:'center'}} color={AppColors.skyblue} size={15} />
      <Text style={{marginLeft:10, fontSize:16}}>{P_Address}</Text>
    </View>

    <View style={{flexDirection:'row',borderTopWidth:0.5,borderColor:'#CACFD2', paddingVertical:5}}>
    <FontAwesome name='circle-o' style={{alignSelf:'center'}} color={AppColors.skyblue} size={15} />
      <Text style={{marginLeft:10, fontSize:16}}>{D_Address}</Text>
    </View>

  </View>

:
null

} */}



                  </View>
              )
          }

  
const styles = StyleSheet.create({
  container: {
      flex: 1,
      marginBottom:"2%"
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
    box2:{
      paddingHorizontal:40
  },
  text:{
      fontSize:22,
      textAlign:"center",
      marginTop:10
  },
   card:{
       margin:10,
       elevation:2,
       borderWidth:1,borderRadius:8,borderColor:"#6615EF",
       opacity:1
   },
   img:{
     width:'100%',
     height:"6.5%"
   },
   customRatingBarStyle:{
     justifyContent:"center",
     flexDirection:"row",
     marginTop:30
   },
   starImgStyle:{
       width:40,
       height:40,
       resizeMode:'cover'

   }
})

export default Maps