import React, { useState , useEffect} from 'react'
import { View, Text,TextInput,StyleSheet,Button, ScrollView, SafeAreaView,ImageBackground ,Dimensions, TouchableOpacity, Alert, Image} from 'react-native'
import { ActivityIndicator, Appbar } from "react-native-paper";
// import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import SelectList from 'react-native-dropdown-select-list'
import DeviceInfo from 'react-native-device-info';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AppConstance from '../constance/AppConstance';
import { Input } from 'react-native-elements';
// or ES6+ destructured imports

import { getUniqueId, getManufacturer } from 'react-native-device-info';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width
let editableColor ='#EFDF79'


const Profile = ({navigation}) => {


  const [spinner,setspinner] = useState(false)  
  const [imageuser,setimageuser] = useState('https://reactjs.org/logo-og.png')
  const [deviceId,setdeviceId] = useState('')
  const [showIndicator,setshowIndicator] = useState(false)
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
    alert("change")

  }
  
  editableColor=editableColoru
  
  const getApi =()=>{

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


        setname(responseJson.Name)
        setemail(responseJson.Email)
        setphone(responseJson.Phone)
        setdateofbirth(responseJson.Date_of_Birth)
        setsnn(responseJson.SNN)
        setdl(responseJson.DL)
        setmcnumber(responseJson.MC_Number)
        setdotnumber(responseJson.Dot_Number)
        setDrivePicture(responseJson.Driver_Pic)
        setstates(responseJson.States)

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

 
    let uriimage ='../assets/logocrop.png'
    return (
      <>
           <SafeAreaView style={styles.container}>
         
         
      {/* <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}> 
        </ImageBackground> */}
        <Appbar.Header style={styles.header}>

        <View style={styles.headview}>

<Ionicons name='menu-outline' 
onPress={() => navigation.openDrawer()}
style={{alignSelf:'center',}} size={30} color='black'/>
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
                         width:130,}} source={{uri:'https://reactjs.org/logo-og.png'}} />
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
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setname(Text)}}
        value={name}
        style={[styles.input, {borderColor:name.length>0 && Editable == false ?"#EFDF79":"red"}]}
        placeholder="Name"/>
         <TextInput   
             editable={Editable} 

        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setemail(Text)}}
        value={email}
        style={styles.input}
        placeholder="Enter Email "/>
         <TextInput   
             editable={Editable} 

        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setphone(Text)}}
        value={phone}
        style={styles.input}
        placeholder="Phone"
        keyboardType={"numeric"}
        />
       
         <TextInput   
             editable={Editable} 

        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setdateofbirth(Text)}}
        value={dateofbirth}
        style={styles.input}
        placeholder="Date of Birth"/>
         <TextInput   
             editable={Editable} 

        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setsnn(Text)}}
        value={snn}
        style={styles.input}
        placeholder="SNN"/> 
        <TextInput   
             editable={Editable} 

        onChangeText={(Text)=>{setdl(Text)}}
        value={dl}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="DL"/> 
        <TextInput   
             editable={Editable} 
        onChangeText={(Text)=>{setmcnumber(Text)}}
        value={mcnumber}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder=" MC Number"/> 
        <TextInput   
             editable={Editable} 
        onChangeText={(Text)=>{setdotnumber(Text)}}
        value={dotnumber}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="DOT Number"/> 

      <SelectList 
      
      dropdownStyles={{backgroundColor:"white", borderWidth: 1,borderColor:'#EFDF79',borderRadius:15,}}
      boxStyles={{backgroundColor:"white", borderWidth: 1, height:44,  margin: 12,
      alignSelf:"center",paddingHorizontal:10, alignContent:'center', width:"100%",borderColor:'#EFDF79',borderRadius:10,}}
      setSelected={setSelected}  
      
      data={data}  />

{
  selected == 0
  ?
  <View >
   <TextInput   
             editable={Editable} 

            onChangeText={(Text)=>{setbankinfo(Text)}}
            value={bankinfo}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Bank Information"/>
        <TextInput   
             editable={Editable} 

            onChangeText={(Text)=>{setbankacountnumber(Text)}}
            value={bankacountnumber}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Account Number"/>
    </View>
    :
    selected == 1?

    <View >
        <TextInput   
             editable={Editable} 

        onChangeText={(Text)=>{setcreditcardnumber(Text)}}
        value={creditcardnumber}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Credit Card Number"
        secureTextEntry={true}
        /> 
     <TextInput   
             editable={Editable} 

         onChangeText={(Text)=>{setexpiredate(Text)}}
         value={expiredate}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Expire Date"
        secureTextEntry={true}
        /> 
         <TextInput   
             editable={Editable} 

         onChangeText={(Text)=>{setsecuritycode(Text)}}
         value={securitycode}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Security Code"/>
        <TextInput   
             editable={Editable} 

        onChangeText={(Text)=>{setzipcode(Text)}}
        value={zipcode}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Zip Code "/>
      
    </View>
    :
    <View>

    </View>
}

    

      <View style={styles.btnBorder}>

     <TouchableOpacity style={styles.btnregister}
            onPress={()=>{registerApi()}}
    >
        
      <Text style={{color:"black",fontSize:15,}}>Save</Text>
   </ TouchableOpacity>
    </View>

    </View>


    </ScrollView>
    </SafeAreaView>
        
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
        backgroundColor:"#EFDF79"
      },
    input: {
      height: 40,
      margin: 12,
      alignSelf:"center",
      padding: 10,
      borderWidth: 1,
      width:"100%",
      borderColor:editableColor, 
      borderRadius:10,
      backgroundColor:"white",
      // width:190

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
      // flex:1,
      paddingVertical:10,
      marginTop:10,
      borderColor:'#EFDF79',
    borderWidth:1,
    flex:1,
    // backgroundColor:'rgba(0,0,0,0.3)',
    backgroundColor:"white",
    width:"100%",
    // height:"%",
    alignSelf:"center",
  paddingVertical:10,
  paddingHorizontal:20,
  // borderRadius:40,
  borderTopRightRadius:40,
  borderTopLeftRadius:40
  // marginBottom:100,
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
  backgroundColor:'#EFDF79'
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
