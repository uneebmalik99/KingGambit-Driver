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
// import AppConstance from '../constance/AppConstance';
const Maps = ({navigation}) => {

  // alert( AppConstance.Id);
  const [pmapmodel , setpmapmodel] = useState(false)

  const [longitude,setlongitude] = useState()
  const [latitude,setlatitude] = useState()


  const [destinationLatitude,setdestinationLatitude] = useState(33.664703)
  const [destinationLongitude,setdestinationLongitude] = useState(73.079547)
  const [spinner,setspinner]=useState(false)
 

  const [pickupLatitude,setpickupLatitude] = useState(33.658566)
  const [pickupLongitude,setpickupLongitude] = useState(73.063308)
  const [confirmationPic,setconfirmationPic] = useState('')
  const [confirmationPicName,setconfirmationPicName] = useState('')
  const [sealedPicName,setsealedPicName] = useState('')
  const [sealedPic,setsealedPic] = useState('')

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

    }
    
     catch (e) {
      setspinner(false)
alert(e)
      console.log(e)
    }


   
    setspinner(false)



  
  
  }


  useEffect(()=>{

 getdata()


  
  },[])
  // alert( AppConstance.Id);
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

{/* <Modal  
  animationType="fade"
  visible={pmapmodel}
  transparent={true}
  style={{ backgroundColor:'black',height:"70%",borderWidth:1,
  }}
  >
  <View style={{backgroundColor:'red',alignSelf:"center"}}>
<Text>hbdhjfbj</Text>


</View>

    </Modal>  */}
    {/* <View style={{backgroundColor:"lightgrey"}}> */}
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
       {/* </View> */}

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


<Marker coordinate={{latitude:pickupLatitude,longitude:pickupLongitude}}>
    {/* <MaterialCommunityIcons name='truck-fast-outline' 
style={{ height: 35, width: 45 }} size={40} color='black'/> */}
</Marker>

  <MapViewDirections
    origin={{latitude:pickupLatitude , longitude:pickupLongitude}}
    destination={{latitude:destinationLatitude, longitude:destinationLongitude}}
    apikey={GOOGLE_MAPS_APIKEY}
    // stroke
    strokeWidth={3}
    strokeColor='red'
   
  />
<Marker coordinate={{latitude:destinationLatitude,longitude:destinationLongitude}}>
    {/* <MaterialCommunityIcons name='truck-fast-outline' 
style={{ height: 35, width: 45 }} size={40} color='black'/> */}
</Marker>

  
    
  </MapView>
  <View style={{width:"100%",height:"40%",borderWidth:1,borderTopLeftRadius:15,borderTopRightRadius:15,padding:5,}}>
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