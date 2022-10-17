import React, { useState , useEffect} from 'react'
import { View, Modal ,Text,StyleSheet,Button, ScrollView, SafeAreaView,ImageBackground ,Dimensions, TouchableOpacity, Alert, Image} from 'react-native'
import { ActivityIndicator, Appbar } from "react-native-paper";
import {  DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
// import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import SelectList from 'react-native-dropdown-select-list'
import DeviceInfo from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AppConstance from '../constance/AppConstance';
import { Input } from 'react-native-elements';
// or ES6+ destructured imports
import Spinner from 'react-native-loading-spinner-overlay';
import AppColors from '../Colors/AppColors';
import {TextInput} from 'react-native-paper';
import { getUniqueId, getManufacturer } from 'react-native-device-info';
import Snackbar from 'react-native-snackbar';
import AsyncStorage from '@react-native-async-storage/async-storage';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width
let editableColor ='#EFDF79'


const theme = {
  ...DefaultTheme,
  roundness: 2,
  version: 3,
  colors: {
    ...DefaultTheme.colors,
    primary: '#EFDF79',
    secondary: '#f1c40f',
    tertiary: '#a1b2c3'
  },
};

const Profile = ({navigation}) => {


  const [id ,setid] = useState('')
  const [spinner,setspinner] = useState(false)  
  const [imageuser,setimageuser] = useState('')
  const [deviceId,setdeviceId] = useState('')
  const [showIndicator,setshowIndicator] = useState(false)
  const [deletemodel,setdeletemodel] = useState(false)

  const [selected, setSelected] = useState()
  const [paymenttype,setpaymenttype] = useState(3)
  const data = [
      {key:'0',value:'Bank Info'},{key:'1',value:'Credit Card'},
      ]


  const [Editable,setEditable] = useState(false)
  const [editableColoru,seteditableColoru] = useState()

  const [email,setemail] = useState('')
  const [name,setname] = useState('')
  const [phone,setphone] = useState('')
  const [dateofbirth,setdateofbirth] = useState('')
  const [snn,setsnn] = useState('')
  const [dl,setdl] = useState('')
  const [dotnumber,setdotnumber] = useState('')
  const [mcnumber,setmcnumber] = useState('')
  const [bankinfo,setbankinfo] = useState('')
  const [bankacountnumber,setbankacountnumber] = useState('')
  const [creditcardnumber,setcreditcardnumber] = useState('')
  const [expiredate,setexpiredate] = useState('')
  const [securitycode,setsecuritycode] = useState('')
  const [zipcode,setzipcode] = useState('')
  const [password,setpassword] = useState('')
  const [paymentType,setpaymentType] = useState(selected)
  const [role,setrole] = useState('')
const [DrivePicture,setDrivePicture]= useState('')
const [states,setstates]=useState('')

  const changeInput =()=>{
    setEditable(true)
    seteditableColoru('#CE9829')

    // editableColor=editableColoru

  }
  
  editableColor=editableColoru
  
  const getApi =()=>{

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

        setspinner(false)
        setname(responseJson.Name)
        setid(responseJson.id)
        setemail(responseJson.Email)
        setphone(responseJson.Phone)
        setdateofbirth(responseJson.Date_of_Birth)
        setsnn(responseJson.SNN)
        setdl(responseJson.DL)
        setmcnumber(responseJson.MC_Number)
        setdotnumber(responseJson.Dot_Number)
        setimageuser(responseJson.Driver_Pic)
        console.log(responseJson.Driver_Pic);
        setstates(responseJson.States)

        if(responseJson.Driver_Pic != null ||responseJson.Driver_Pic != '' ){
          setimageuser(responseJson.Driver_Pic)
          console.log(responseJson.Driver_Pic);
        }
        if(responseJson.Payment_Type == '0')
        {
          setbankinfo(responseJson.Bank_Info)
          setbankacountnumber(responseJson.Bank_Number)
        }
        else 
        {
          setcreditcardnumber(responseJson.Credit_Card_No)
          setexpiredate(responseJson.Expire_Date)
          setsecuritycode(responseJson.Security_Code)
          
        }

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
      console.log('login data response',responseJson);
    //   setspinner(false)  
      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
 
  }

  const updateApi =()=>{

    let value = {};
    value.Id = id;
    value.Email = email;
    value.Name= name;
  value.Phone = phone;
  value.MC_Number= mcnumber;
  value.Dot_Number= dotnumber;


  console.log(value);

    setspinner(true)
    var url =AppUrlCollection.USER_UPDATE;

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':  'application/json',
      },
      body: JSON.stringify(value),
     
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {

        
       if(responseJson.Status == '1'){

        Snackbar.show({
          text: 'data have been updated',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor	:AppColors.Appcolor,
        });
        setspinner(false)
       }else{

        Snackbar.show({
          text: 'update failed',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor	:AppColors.Appcolor,
        });
        setspinner(false)

       }
       setspinner(false)

      console.log('login data response',responseJson);
    //   setspinner(false)  
      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
 
  }

  const deleteuserApi =()=>{

    setspinner(true)
    var url = AppUrlCollection.USER_DELETE+'?id='+AppConstance.Id;

    fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type':  'application/json',
      },
     
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {

        
       if(responseJson.Status == '1'){

        Snackbar.show({
          text: 'User Deleted Sucessfully',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor	:AppColors.Appcolor,
        });

        setdeletemodel(false)
        signOut()
        
        setspinner(false)
       }else{

        setdeletemodel(false)
        Snackbar.show({
          text: 'No Ueer Found',
          duration: Snackbar.LENGTH_SHORT,
          backgroundColor	:AppColors.Appcolor,
        });
        setspinner(false)

       }
       setspinner(false)

      console.log(' data response',responseJson);
    //   setspinner(false)  
      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
 
  }
  
  const signOut = async () => {
    await AsyncStorage.setItem('Login','0')
    await AsyncStorage.setItem('Name','')
    await AsyncStorage.setItem('Email','')
    await AsyncStorage.setItem('Phone','')
    await AsyncStorage.setItem('DateofBirth','')
    await AsyncStorage.setItem('CompanyName','')
    await AsyncStorage.setItem('EIN','')
    await AsyncStorage.setItem('Role','')
    await AsyncStorage.setItem('PaymentType','')
    await AsyncStorage.setItem('BankInfo','')
    await AsyncStorage.setItem('BankNumber','')
    await AsyncStorage.setItem('CreditCardNo','')
    await AsyncStorage.setItem('ExpireDate','')
    await AsyncStorage.setItem('SecurityCode','')
    await AsyncStorage.setItem('ZipCode','')
    await AsyncStorage.setItem('Token','')

    AppConstance.Login='0';
    AppConstance.Name='';
    AppConstance.Email='';
    AppConstance.Phone='';
    AppConstance.DateofBirth='';
    AppConstance.CompanyName='';
    AppConstance.EIN='';
    AppConstance.Role='';
    AppConstance.PaymentType='';
    AppConstance.BankInfo='';
    AppConstance.BankNumber='';
    AppConstance.CreditCardNo='';
    AppConstance.ExpireDate='';
    AppConstance.SecurityCode='';
    AppConstance.ZipCode='';
    AppConstance.AUTH_KEY='';
 
   navigation.navigate("login");
  };


  useEffect(()=>{
    getApi()
  },[])
 
    const galleryPic=()=>{

      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true
      }).then(image => {
        console.log(image);
        setimageuser(image.path)
      });
      // console.log('img')
    }

    return (
      <>
         <PaperProvider theme={theme}>
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
         

         <Modal
       transparent={true}
       visible={deletemodel}
       animationType="fade"
       
       >
        
        <SafeAreaView style={{backgroundColor:"#000000aa",justifyContent:'center', flex:1}} >
          
        <View style={{backgroundColor:"#ffffff",borderTopRightRadius:15,borderTopLeftRadius:15
        ,width:"90%" ,alignSelf:"center",marginTop:"0%", borderColor:AppColors.Appcolor}} >


          
<View style={{height:40,paddingHorizontal:5, width:'100%', backgroundColor:AppColors.AppGrey ,justifyContent:'center', borderTopLeftRadius:15, borderTopRightRadius:15,}}>

<TouchableOpacity 
 onPress={()=> { setdeletemodel(false)}}
style={{justifyContent:'center', alignSelf:'flex-end' 

 }}>

<Ionicons onPress={()=> setdeletemodel(false)} name='ios-close-outline'style={{alignSelf:'center', }} size={25} />
</TouchableOpacity>


</View>

     
     <Text style={{alignSelf:'center',paddingVertical:20, fontSize:18}}>Do you want to Delete Your Account ?</Text>

           <View style={{flexDirection:"row",paddingVertical:15, justifyContent:'space-around', width:"100%", 
        marginTop:"0%"}}>
         

<TouchableOpacity 
 onPress={()=> { setdeletemodel(false)}}
style={{justifyContent:'center',width:'40%', backgroundColor:AppColors.Appcolor,
 borderRadius:15,height:40,}}>
          <Text style={{fontWeight:'600',color:'white', alignSelf:'center'}}>
          No</Text>
        </TouchableOpacity>
        <TouchableOpacity 
         onPress={()=> { deleteuserApi()}}
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



      {/* <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}> 
        </ImageBackground> */}
        <Appbar.Header style={styles.header}>

        <View style={styles.headview}>

        <Ionicons name='chevron-back' onPress={()=> {navigation.goBack()}} color={'grey'} style={{alignSelf:'center'}} size={25}/>

<Text style={{color:"black",fontSize:16,alignSelf:'center',}}>Profile</Text>
{/* <Text>Edit</Text> */}
<Ionicons name='create-outline' 
onPress={() => changeInput()}
style={{alignSelf:'center',}} size={30} color='black'/>
</View>

      </Appbar.Header>


          <ScrollView>
     
      {/* <ActivityIndicator size='large' color="#EFDF79" animating={showIndicator}  /> */}
       
          <TouchableOpacity style={{alignSelf:"center"}}
          onPress={galleryPic}
          >
            {/* "../assets/logocrop.png" */}
          {imageuser == ''?
                         <Image style={{  borderRadius:130/2,
                         height:130,
                         width:130,}} source={require('../assets/NoImage.jpeg')} />
                    :
                         <Image style={{  borderRadius:130/2,
                         height:130,
                         width:130,}} source={{uri:imageuser}} />

          }
             {/* <Image style={{width:"100%",height:"80%",}} source={{uri:imageuser}} /> */}
             
          </TouchableOpacity>
          <View style={styles.logtxt}>   
   
             <TextInput  
             editable={Editable} 
             label="Name"
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setname(Text)}}
        value={name}
        style={styles.input}
        // style={[styles.input, {borderColor:name.length>0 && Editable == false ?"#EFDF79":"red"}]}
        placeholder="Name"/>
             {/* <TextInput  
             editable={Editable} 
             label="Picture"
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setDrivePicture(Text)}}
        value={DrivePicture}
        style={styles.input}
        // style={[styles.input, {borderColor:name.length>0 && Editable == false ?"#EFDF79":"red"}]}
        placeholder="Name"/> */}
         <TextInput   
             editable={Editable} 
             label="Email"
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setemail(Text)}}
        value={email}
        style={styles.input}
        placeholder="Email "/>
         <TextInput   
             editable={Editable} 
             label="Phone"
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setphone(Text)}}
        value={phone}
        style={styles.input}
        placeholder="Phone"
        keyboardType={"numeric"}
        />
       
         {/* <TextInput   
             editable={Editable} 
             label="Date of Birth"
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setdateofbirth(Text)}}
        value={dateofbirth}
        style={styles.input}
        // placeholderTextColor={'grey'}
        placeholder="Date of Birth"/> */}
         {/* <TextInput   
             editable={Editable} 
             label="SNN"
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setsnn(Text)}}
        value={snn}
        style={styles.input}

        placeholder="SNN"/>  */}
        {/* <TextInput   
             editable={Editable} 
             label="DL"
        onChangeText={(Text)=>{setdl(Text)}}
        value={dl}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="DL"/>  */}
        <TextInput   
             editable={Editable} 
             label="MC Number"
        onChangeText={(Text)=>{setmcnumber(Text)}}
        value={mcnumber}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="MC Number"/> 
        <TextInput   
             editable={Editable} 
             label="DOT Number"
        onChangeText={(Text)=>{setdotnumber(Text)}}
        value={dotnumber}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="DOT Number"/> 

    


    

      <View style={styles.btnBorder}>

     <TouchableOpacity style={styles.btnregister}
            onPress={()=>{updateApi()}}
    >
        
      <Text style={{color:"black",fontSize:15,}}>Update</Text>
   </ TouchableOpacity>
    </View>

 <View style={{backgroundColor:'red', width:'40%',alignSelf:'center', justifyContent:'center',padding:10,marginTop:20,borderRadius:10,}}>

    <TouchableOpacity  style={{alignSelf:'center'}}
          onPress={()=>{ setdeletemodel(true)}}
    >
      
    <Text style={{color:"white",fontSize:15,}}>Delete Account</Text>
    </ TouchableOpacity>

    </View>

    </View>


    </ScrollView>
    </SafeAreaView>
    </PaperProvider>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height:deviceHeight,
        width:deviceWidth,
      //   justifyContent: center,
      // marginTop: 170,
        // padding: 24,
        // backgroundColor: "transparent",
        backgroundColor:AppColors.Appcolor
      },
    input: {
      height: 45,
      margin: 3,
      alignSelf:"center",
      padding: 2,
      color:'black',
      fontWeight:'600',
      width:"100%",
      borderColor:editableColor, 
      borderRadius:10,
      backgroundColor:"white",
      // width:190

    },
    btnBorder:{
      marginTop:30,
      borderColor:AppColors.Appcolor,
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
  borderColor:AppColors.Appcolor,
  borderWidth:1,
  backgroundColor:AppColors.Appcolor,
  alignContent:"center"
  // fontSize:40
  
    },
    registerFirst:{
      width:"100%",
      height:deviceHeight*0.09,
      // textAlign:"center",
      alignItems:"center",
      justifyContent:"center",
      borderColor:'#EFDF79',
      borderWidth:2,
      backgroundColor:'#EFDF79',
      borderRadius:200,
      // marginBottom:40
    },
    register_txt:
    {
      fontSize:16,
      fontWeight:'600',
      alignSelf:'center' 
    },
      logtxt:{
      paddingVertical:15,
      height:'100%',
      marginTop:10,
      borderColor:'#EFDF79',
    borderWidth:1,
    backgroundColor:"white",
    width:"100%",
    alignSelf:"center",
  paddingHorizontal:10,
  borderTopRightRadius:40,
  borderTopLeftRadius:40
},
header: {
  elevation: 0,
  backgroundColor: 'transparent',
  alignItems: "center",
  justifyContent: "center",
  width:deviceWidth,
  paddingHorizontal:0,
  paddingVertical:0,

},

headview:{
  height:'100%',
  width:'100%',
  flexDirection:'row',
  borderBottomRightRadius:15,
  borderBottomLeftRadius:15,
  paddingHorizontal:10,
  justifyContent:'space-between',
  backgroundColor:AppColors.Appcolor
},
image:{
  justifyContent: "center",
  height:deviceHeight,
  width:deviceWidth,
  position:'absolute',
  paddingVertical:0
},
DropDowninput:{
  width:"100%",borderWidth: 1,
  paddingHorizontal:10,
  margin: 12,
alignSelf:"center",
          borderColor:'#EFDF79',
          borderRadius:10,
          backgroundColor:"white",
        height:40
}
  });
export default Profile
