import React,{useState,useEffect} from 'react'
import { View,ImageBackground,BackHandler, Text,TextInput,StyleSheet ,ActivityIndicator,

TouchableOpacity,Button, SafeAreaView, Dimensions, ScrollView, Alert,PermissionsAndroid } from 'react-native'
import { Appbar } from "react-native-paper";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppConstance from '../constance/AppConstance';
import Spinner from 'react-native-loading-spinner-overlay';
import DeviceInfo from 'react-native-device-info';
import messaging from '@react-native-firebase/messaging';
import AppColors from '../Colors/AppColors'
import LocationEnabler from 'react-native-location-enabler';




const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;
// const image = {require('    ')};
const Login = ({navigation}) => {
  // 'Driver2@gmail.com'
  const [email,setemail] = useState()
  const [password,setpassword] = useState('12345678')
  const [deviceid,setdeviceid] = useState(0)
  const [spinner,setspinner]=useState(false)
  const [passMessage, setPassMessage] = useState("");
  const [message, setMessage] = useState('');
  const [firebaseToken,setfirebaseToken] = useState()

  const storeData = async (responseJson) => {

    // alert(JSON.stringify(responseJson.DATA.user))
    AppConstance.Login="1"
    AppConstance.Id =responseJson.DATA.user.id.toString()
    // alert(AppConstance.Id)
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

  function handleBackButtonClick() {
    BackHandler.exitApp();
    return true;
  }


  // const passRegex=/[0-9a-zA-Z]{6,}/
  // const emailRegex = /\S+@\S+\.\S+/;
  // const emailRegex = '';
// email ^[\w.+\-]+@gmail\.com$
// any email ([a-zA-Z0-9_.-]+)@([a-zA-Z]+)([\.])([a-zA-Z]+)

const validateEmail = (event) => {
  // const email = event;
 let emailRegex = /^[a-zA-z]+$/
  if (!emailRegex.test(event)) {
  //   setIsValid(true);
     console.log('invalid email')
    //  setemail('')
    // setMessage('Your Email Looks Good!');
    // setValidEmail(true)
  } else {
  //   setIsValid(false);
    setMessage('Please Enter a Valid Email!');
    setemail('')
  }
};
const validatePass = (event) => {
  // const email = event;
  if (passRegex.test(event)) {
  //   setIsValid(true);

    setPassMessage('Your Password Looks Good!');
  //   setValidPass(true)
  } else {
  //   setIsValid(false);
    setPassMessage('Please Enter at Least (6 Number) Valid Password!');
    setPassword('')

  }
};
// chck Location Permission
const {
  PRIORITIES: { HIGH_ACCURACY },
  useLocationSettings,
} = LocationEnabler;
const requestLocationPermission =async()=> {
  const chckLocationPermission = PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
  if (chckLocationPermission === PermissionsAndroid.RESULTS.GRANTED) {
      alert("You' rr access for the location");
    
  } else {
      try {
          const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
              {
                  'title': 'Cool Location App required Location permission',
                  'message': 'We required Location permission in order to get device location ' +
                      'Please grant us.'
              }
          )
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
              // alert("You've access for the location");
              setTimeout(()=>{
                {!enabled ?
                  requestResolution()
                  :
                  console.log('not enabled ')
                }
              },1500)
          } else {
              alert("You don't have access for the location");
          }
      } catch (err) {
          alert(err)
      }
  }
};
const [enabled, requestResolution] = useLocationSettings(
  {
    priority: HIGH_ACCURACY, // default BALANCED_POWER_ACCURACY
    alwaysShow: true, // default false
    needBle: true, // default false
  },
  false /* optional: default undefined */
);
  useEffect(async () => {

    requestLocationPermission()

    {!enabled ?
          requestResolution()
          :
          console.log('not enabled ')
        }
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
  
    let fcmToken = await messaging().getToken();
    if (fcmToken) {
      console.log("fcm"+fcmToken);
        // await AsyncStorage.setItem('device_token', fcmToken);
        setdeviceid(fcmToken)
        
    }
else {
    // do some work
    console.log('Device_token')
    console.log("----"+JSON.stringify(fcmToken))
}
    // let deviceId = DeviceInfo.getDeviceId();
    // setdeviceid(deviceId)
    // DeviceInfo.getAndroidId().then((androidId) => {
    //   // androidId here
    //   console.log(androidId)
    //   setdeviceId(androidId)
      // console.log(deviceId)


    // });

  //   DeviceInfo.getAndroidId().then((androidId) => {
  //     // androidId here
  //       console.log(androidId)
  //       setdeviceid(androidId)
  
  //   });
  //
  return () => {
    BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
  };
},[]
  );

  const loginApi =()=>{
    setspinner(true)

    if(email.length == 0 || email ==''){
      alert('email is required')
      setspinner(false)
    }
    else if(password.length == 0 || password =='') {
      alert('password is required')
      setspinner(false)

    }
    else{
    // setspinner(true)

      // setTimeout(() => {
      //   // setspinner(false)
      //   navigation.navigate('AppDrawer')
        
      // }, 2000);

    // setspinner(true)

   

    let value = {};
    value.Email = email;
    value.Password=password;
    value.Device_id=deviceid

    // alert(JSON.stringify(value))


   

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

          }
          else if(responseJson.status == 422){
            setspinner(false)

            alert(responseJson.errors.password)
          }
          else if(responseJson.status == 401){
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

    return (
      <>
        <SafeAreaView style={styles.container}>
        <Spinner
        visible={spinner}
        textContent={"Loading..."}
        color	={AppColors.Appcolor}
        animation	='fade'
        size='large'
        overlayColor='rgba(0, 0, 0, 0.25)'
         textStyle={{ color: AppColors.Appcolor }}
      />

            <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}>
            </ImageBackground>

            <Appbar.Header style={styles.header}>

              <View style={styles.headview}>
                <Text style={{color:"black",fontSize:15,alignSelf:'center'}}> Login</Text>
              </View>
              
            </Appbar.Header>
          
            <ScrollView>
           
           <View style={styles.logtxt}>  

            <View style={{ width:"90%",marginTop:20,alignSelf:"center",paddingHorizontal:10}}>
              {/* <TextInput   
        style={styles.input}
        onChangeText={(Text)=>{setemail(Text)}}
        value={email}
        // onBlur={()=>validateEmail(email)}
        // onBlur={()=>{validateEmail()}}
        placeholder="Enter Username or Email "
        placeholderTextColor={'grey'}
        /> */}
            <TextInput   
        style={styles.input}
        onChangeText={(Text)=>{setemail(Text)}}
        value={email}
        // onBlur={()=>validateEmail(email)}
        // onBlur={()=>{validateEmail()}}
        placeholder="Enter Username or Email "
        placeholderTextColor={'grey'}
        />
        
        <Text style={{color:'#6315EF'}}>{message } </Text>
            <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        onChangeText={(Text)=>{setpassword(Text)}}
        value={password}
        placeholder="Enter Password"
        placeholderTextColor={'grey'}

        secureTextEntry={true}

        
      />
       <Text style={{color:'#6315EF'}}>{passMessage } </Text>

           
           <TouchableOpacity 
   
    // title="Login"
     onPress={() => navigation.navigate('forgetPass')}
      >
        <Text style={styles.forgetPass}>Forget Password ?</Text>

    </TouchableOpacity>

    </View>

      <View style={styles.btnBorder}>
       <TouchableOpacity 
   style={styles.btnBorderSize}
    // title="Login"
    //  onPress={() => navigation.navigate('welcome')}
     onPress={() =>{
       

      loginApi()
    }}
      >
        <Text style={{color:"black",fontSize:15,}}>LOGIN</Text>

    </TouchableOpacity>
       </View>
      </View>
      <TouchableOpacity
        style={{marginTop:100,alignSelf:"center"}}
        onPress={() => navigation.navigate('register')}
      >
        <Text style={{color:'#EFDF79'}}>Don't have an account? Register</Text>
      </TouchableOpacity>
      </ScrollView>
        </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
      //   justifyContent: center,
      // marginTop: 170,
        backgroundColor: "#eaeaea",
        height:deviceHeight,
        width:deviceWidth

      },

      headview:{
        height:'100%',
        width:'100%',
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        justifyContent:'center',
        backgroundColor:'#EFDF79'
      },
    input: {
      height: 60,
      width:"100%",
      alignSelf:"center",
      paddingHorizontal:15,
      margin: 12,
      borderWidth: 1,
      // padding: 10,
      borderRadius:15,
      borderColor:'#EFDF79',
      backgroundColor:"white",
      color:"black"
      
      
    },
    logtxt:{
      marginTop:120,
      borderColor:'#EFDF79',
    borderWidth:1,
    
    height:"51%",
    paddingVertical:10,
    width:300,
    alignSelf:"center",
  // padding:30,
  backgroundColor:'rgba(0,0,0,0.3)',
  borderRadius:15
  

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
forgetPass:{
  alignSelf:"flex-end",
  marginBottom:45,
  color:'#EFDF79'
},
btnBorder:{
 borderColor:'#EFDF79',
 borderWidth:3,
 backgroundColor:'black',
 borderRadius:150/2,
 height:150,
width:150,
alignSelf:'center',
justifyContent:"center" 
},
btnBorderSize:{
  padding:10,
  justifyContent:"center",
  height:"70%",
  width:'70%',
  alignSelf:"center",
  alignItems:"center",
  borderRadius:400/2,
  borderColor:'#EFDF79',
  borderWidth:1,
  backgroundColor:'#EFDF79',
  alignContent:"center"
  // fontSize:40
},
image: {
  // flex: 1,
  // height:"100%",
  // width:"100%",
  justifyContent: "center",
  height:deviceHeight,
  width:deviceWidth,
  position:'absolute',
  paddingVertical:0
},
loginFirst:{
  // marginTop:0,
  width:"100%",
  height:50,
  // textAlign:"center",
  alignItems:"center",
  borderColor:'#EFDF79',
  borderWidth:2,
  backgroundColor:'#EFDF79',
  // borderRadius:200,
  borderBottomRightRadius:15,
  borderBottomLeftRadius:15,
  justifyContent:"center",
  },
  HeaderTxt:{
    color:'black',
    fontWeight:"500",
    fontSize:16,
    alignSelf:'center'
  }
  });
export default Login
