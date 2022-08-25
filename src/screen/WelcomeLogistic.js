import React, { useState ,useEffect, useRef} from 'react'
import { View, Text,TouchableOpacity,TextInput,StyleSheet,Button, Image ,Modal, SafeAreaView} from 'react-native'

import MapView,{Marker} from 'react-native-maps';
import DocumentPicker from 'react-native-document-picker';

import MapViewDirections from 'react-native-maps-directions';

import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { Appbar } from "react-native-paper";
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import AppColors from '../Colors/AppColors';
import Geolocation from '@react-native-community/geolocation';
import StarReview from 'react-native-star-review'
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Spinner from 'react-native-loading-spinner-overlay';
import { set } from 'react-native-reanimated';

// import AppConstance from '../constance/AppConstance';
const Maps = ({route, navigation}) => {
 
      // const {Item,Data} =route.params
      // console.log(Item)
      // console.log(Data)
  // alert( AppConstance.Id);
  
  // const { data } = rout0e.params;

  const [ViewShow,setViewShow] = useState(false)  
  const [pmapmodel , setpmapmodel] = useState(false)

  const [longitude,setlongitude] = useState(73.079547)
  const [latitude,setlatitude] = useState(33.664703)
  const [haveLoad,sethaveLoad] = useState('0')
  const [chkk,setchkk] = useState('')


  const [destinationLatitude,setdestinationLatitude] = useState(33.664703)
  const [destinationLongitude,setdestinationLongitude] = useState(73.079547)
  const [spinner,setspinner]=useState(false)
 

  const [pickupLatitude,setpickupLatitude] = useState(33.658566)
  const [pickupLongitude,setpickupLongitude] = useState(73.063308)
  const [D_Address,setD_Address] = useState('')
  const [P_Address,setP_Address] = useState('')
  const [Weight,setWeight] = useState('')
  const [Vehicle_Type,setVehicle_Type] = useState('')
  const [confirmationPic,setconfirmationPic] = useState('')
  const [sealedPic,setsealedPic] = useState('')

  const [confirmationPicName,setconfirmationPicName] = useState('')
  const [sealedPicName,setsealedPicName] = useState('')

  const [showModal, setshowModal] = useState(false)
  const[maxRating,setMaxRating] = useState([1,2,3,4,5])
  const[defaultRating,setDefaultRating] = useState(1)
  const[message,setMessage] = useState('')

  const starImgFilled ='https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
  const starImgCorner ='https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
// curt loacation
Geolocation.getCurrentPosition(info =>
  {
    // console.log(info.coords.latitude)
    // console.log(info.coords.longitude)
    setlatitude(info.coords.latitude)
    setlongitude(info.coords.longitude)
    // console.log(longitude)
    
//    Geolocation.getCurrentPosition(info => console.log(info))
console.log(info)
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

   
        // setname(responseJson.Name)
        // setemail(responseJson.Email)
        // setphone(responseJson.Phone)
        // setdateofbirth(responseJson.Date_of_Birth)
        // setsnn(responseJson.SNN)
        // setdl(responseJson.DL)
        // setmcnumber(responseJson.MC_Number)
        // setdotnumber(responseJson.Dot_Number)
        // setimageuser(responseJson.Driver_Pic)
        // console.log(responseJson.Driver_Pic);
        // setstates(responseJson.States)


        // if(responseJson.Driver_Pic != null ||responseJson.Driver_Pic != '' ){
        //   setimageuser(responseJson.Driver_Pic)
        //   console.log(responseJson.Driver_Pic);
        // }
        // if(responseJson.Payment_Type == '0')
        // {
        //   setbankinfo(responseJson.Bank_Info)
        //   setbankacountnumber(responseJson.Bank_Number)
        // }
        // else 
        // {
        //   setcreditcardnumber(responseJson.Credit_Card_No)
        //   setexpiredate(responseJson.Expire_Date)
        //   setsecuritycode(responseJson.Security_Code)
          
        // }

          if(responseJson.result == 'SUCCESS'){
            // alert(responseJson.DATA.user.Bank_Info)
            // alert(JSON.stringify(responseJson))

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
      // console.log('have Load',responseJson.Have_Load)
      // AsyncStorage.setItem()
      // if(responseJson.Have_Load == '1')
      // {
      //   setViewShow(true)
      
      // }
    //   setspinner(false)  
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
      console.log(pickerResult)
      const str = pickerResult.name;

const last = str.slice(-10);
console.log(last); 
      setconfirmationPicName(last)
      setconfirmationPic(pickerResult)

      
    } catch (e) {
      console.log(e)
    }
    //

  //  let load_id = AsyncStorage.getItem(Load_id)
    var value = new FormData()
    value.append('Confirmation_Pic', confirmationPic )
    // value.append('Load_id',load_id)
    var url =AppUrlCollection.CONFIRMATION_PIC;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':  'multipart/form-data',
        'Accept': 'multipart/form-data'
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
                text: 'Registered Successfully',
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
      // value.append('Driver_Pic', pickerResult)
  
      // setimageuser(pickerResult.uri)
      // setimage([pickerResult])
    } catch (e) {
      console.log(e)
    }
  
    var value = new FormData()
    value.append('Sealed_Pic', sealedPic )

    var url =AppUrlCollection.SEALED_PIC;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':  'multipart/form-data',
        'Accept': 'multipart/form-data'
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
                text: 'Registered Successfully',
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
  }
  const getdata = async () => {


    try {
      setspinner(true)

   let Id =  await AsyncStorage.getItem('Id')
    let Name =  await AsyncStorage.getItem('Name')
    let Email = await AsyncStorage.getItem('Email')
    let Phone = await AsyncStorage.getItem('Phone')
    let DateofBirth = await AsyncStorage.getItem('DateofBirth')
    let DotNumber = await AsyncStorage.getItem('DotNumber')
    let SNN = await AsyncStorage.getItem('SNN')
    let Role = await AsyncStorage.getItem('Role')
    let McNumber = await AsyncStorage.getItem('McNumber')
    let DL = await AsyncStorage.getItem('DL')
    let HaveLoad = await AsyncStorage.getItem('HaveLoad')
    
    let PaymentType = await AsyncStorage.getItem('PaymentType')
    AppConstance.Login = "0";
    AppConstance.Id=Id;
    AppConstance.Name=Name;
    AppConstance.Email=Email;
    AppConstance.SNN =SNN;
    AppConstance.DL =DL;
    AppConstance.McNumber=McNumber;
    AppConstance.Phone=Phone;
    AppConstance.DateofBirth=DateofBirth;
    AppConstance.Role=Role;
    AppConstance.PaymentType=PaymentType;
    AppConstance.HaveLoad=HaveLoad;
   
    console.log(Id)
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
    setspinner(false)


    var url =AppUrlCollection.USER+'/'+Id;

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

        AsyncStorage.setItem('HaveLoad',responseJson.Have_Load)
        AppConstance.HaveLoad =responseJson.Have_Load;

        // alert(responseJson.load_id)
        if(responseJson.Have_Load == '1' && responseJson.load_id != null)
        {
          console.log('condition working')
          LoadApi(responseJson.load_id)
        }
        sethaveLoad(responseJson.Have_Load)
        setspinner(false)
        
   
   console.log('---------------'+ JSON.stringify( responseJson))
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

   
        // setname(responseJson.Name)
        // setemail(responseJson.Email)
        // setphone(responseJson.Phone)
        // setdateofbirth(responseJson.Date_of_Birth)
        // setsnn(responseJson.SNN)
        // setdl(responseJson.DL)
        // setmcnumber(responseJson.MC_Number)
        // setdotnumber(responseJson.Dot_Number)
        // setimageuser(responseJson.Driver_Pic)
        // console.log(responseJson.Driver_Pic);
        // setstates(responseJson.States)


        // if(responseJson.Driver_Pic != null ||responseJson.Driver_Pic != '' ){
        //   setimageuser(responseJson.Driver_Pic)
        //   console.log(responseJson.Driver_Pic);
        // }
        // if(responseJson.Payment_Type == '0')
        // {
        //   setbankinfo(responseJson.Bank_Info)
        //   setbankacountnumber(responseJson.Bank_Number)
        // }
        // else 
        // {
        //   setcreditcardnumber(responseJson.Credit_Card_No)
        //   setexpiredate(responseJson.Expire_Date)
        //   setsecuritycode(responseJson.Security_Code)
          
        // }

          if(responseJson.result == 'SUCCESS'){
            // alert(responseJson.DATA.user.Bank_Info)
            // alert(JSON.stringify(responseJson))

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
      // console.log('login data below error response',responseJson);
      // console.log('have Load',responseJson.Have_Load)
      // AsyncStorage.setItem()
      // if(responseJson.Have_Load == '1')
      // {
      //   setViewShow(true)
      
      // }
    //   setspinner(false)  
      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
    }
    
     catch (e) {
      setspinner(false)
alert(e)
      console.log(e)
    }


   
    setspinner(false)



  
  
  }
  const LoadApi =(load_id)=>{

        // alert(AppConstance.Id)
    console.log(load_id)
      // var url ='https://kinggambits.com/kinggambitapi/api/load?Driver_Id=' 
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
           
        console.log('login data iss ma data hi response',responseJson);

          // alert(responseJson[0].P_Latitude)
        setpickupLatitude(parseFloat(responseJson[0].P_Latitude))
        setpickupLongitude(parseFloat(responseJson[0].P_Longitude))
        setdestinationLatitude(parseFloat(responseJson[0].D_Latitude))
        setdestinationLongitude(parseFloat(responseJson[0].D_Longitudes))
        setD_Address(responseJson[0].D_Address)
        setP_Address(responseJson[0].P_Address)
        setVehicle_Type(responseJson[0].Vehicle_Type)
        setconfirmationPic(responseJson[0].Confirmation_Pic)
        setsealedPic(responseJson[0].Sealed_Pic)

        sethaveLoad('1')
      //   setspinner(false)  
        })
        .catch((error) => {
          // setspinner(false)
          alert(error)
            console.warn(error)
        });
        
        // <ActivityIndicator size='large' color="#EFDF79" animating={true}  />
    }

  useEffect( ()=>{


    console.log('load id   diosdu',route.params?.post)


   
      // if( route.params?.post != undefined){
      //   let load_id = route.params?.post
      //   LoadApi(load_id)
      // }
    //   {
    //     // alert(route.params?.post)
    //     const d = route.params?.post
    //  setchkk(d)

    //  console.log(d)


    // //  alert(chkk)

    //   }
    //   if(chkk != undefined)
    //   {
    //     console.log(chkk)

    //   }
    //   else{
    //  console.log(chkk)
        
    //   }
   
     
    //  console.log(chkk)
        // alert(chkk)

   

    // alert(r)
 getdata()
//  GetUserInfo()

  
  },[])




  // alert(route.params?.post);

  // setchkk(route.params?.post)
  console.log('load id   ----',route.params?.post)
  let getLoad_id = route.params?.post
  if(route.params?.post)
  {
  LoadApi(route.params?.post)
  }


  
const openRatingModal=()=>{
  setshowModal(true)


}


const submit = async ()=>{
  let Id = await AsyncStorage.getItem('Id')


  let value = {};
  value.User_id = 53;
  value.Driver_Id=Id;
  value.load_id = '430';
  value.Status = '2',
  value.Rating = '4',


  // value.Have_Load = '0',
  

  fetch(AppUrlCollection.STATUS_UPDATE, {
    method: 'PUT',
    headers: {
      'Content-Type':  'application/json',
    },
    body: JSON.stringify(value),
})
    .then((response) =>  response.json() )
    .then((responseJson) => {


      console.log('login data response',responseJson);

    console.log('login data response',responseJson);
  //   setspinner(false)  
    })
    .catch((error) => {
      // setspinner(false)
      alert(error)
        console.warn(error)
    });
  
}
 
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
<Spinner
        visible={spinner}
        textContent={"Loading..."}
        color	={AppColors.Appcolor}
        animation	='fade'
        size='large'
        overlayColor='rgba(0, 0, 0, 0.25)'
         textStyle={{ color: AppColors.Appcolor }}
      />


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
<TextInput 
// style={{}}
placeholder="Feedback Message" 
            // value={message} 
            numberOfLines={4}
            multiline={true}
            style={{borderWidth:1,borderColor:AppColors.Appcolor,width:"90%"
          ,alignSelf:"center"}}
            onChangeText={text=>setMessage(text)}/>


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
         onPress={()=>submit()}
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
    // ref={mapRef}
    style={{width:"100%",height:haveLoad=='1'? "70%":'100%'}}
    initialRegion={
pickupLocation
    }
  >


{
  haveLoad == '1' ?
    <Marker coordinate={{latitude:latitude,longitude:longitude}}>
    <Image style={{width:55,height:55}} source={require('../assets/truck.jpg')} />
    </Marker>
    :
    null
    }
{
  haveLoad == '1' ?
    <Marker coordinate={{latitude:pickupLatitude,longitude:pickupLongitude}}>
    </Marker>
  :
  null
  }
  {
  haveLoad == '1' ?
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
  haveLoad == '1' ?
    <Marker coordinate={{latitude:destinationLatitude,longitude:destinationLongitude}}>
    </Marker>
    :
    null
    }
    
  </MapView>

  




{haveLoad == '1'?



  <View 
  
  style={{width:"100%",height:"40%",borderWidth:1,borderTopLeftRadius:15,
  borderTopRightRadius:15,padding:5,}}>
  
           
           <View>
  <View style={{flexDirection:"row",justifyContent:'space-around',width:"100%",height:'33%'
  }}>

<TouchableOpacity 
 onPress={galleryConfirmationPic}
style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor,
 borderRadius:15,height:"50%",}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
            {confirmationPic==''?"Confirmation":  confirmationPicName}</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={gallerySealedPic}
        style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor, borderRadius:15,
        height:"50%"}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
          {sealedPic==''?"Sealed":  sealedPicName}
          </Text>
        </TouchableOpacity>
        
            </View>
            <View style={{alignSelf:'center'}}>
            <StarReview 
          style={{alignSelf:'center'}}
              ratings={3}
              stars={5}
              starColor="#EFDF79"
            />
              </View>
            <TouchableOpacity
            onPress={openRatingModal}
            style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor,alignSelf:"center",
             borderRadius:15,
        height:"18%",}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>Delivered</Text>
        </TouchableOpacity>
</View>
           
           </View>

           : null}



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