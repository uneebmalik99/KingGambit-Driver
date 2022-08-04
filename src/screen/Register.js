import React, { useState , useEffect} from 'react'
import { View, Text,TextInput,StyleSheet,Button, ScrollView, SafeAreaView,ImageBackground ,Dimensions, 
  TouchableOpacity, Alert, Image,Modal,FlatList, } from 'react-native'
import { ActivityIndicator, Appbar } from "react-native-paper";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import SelectList from 'react-native-dropdown-select-list'
import DeviceInfo from 'react-native-device-info';
import { CheckBox, Icon } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
// import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
// or ES6+ destructured imports
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from "react-native-image-picker"

import { getUniqueId, getManufacturer } from 'react-native-device-info';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width



const Register = ({navigation}) => {


  const [spinner,setspinner] = useState(false)  
  const [imageuser,setimageuser] = useState('')
  const [deviceId,setdeviceId] = useState('')
  const [showIndicator,setshowIndicator] = useState(false)
  const [selected, setSelected] = useState()
  const [selectedState, setselectedState] = useState()
  const [check, setCheck] = useState(false);
  // const [paymenttype,setpaymenttype] = useState(3)
  const data = [
      {key:'0',value:'Bank Info'},{key:'1',value:'Credit Card'},
      ]
  const StateData = [
      {key:'0',value:'Folrida'},{key:'1',value:'Texes'},
      ]



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
  const [confpassword,setconfpassword] = useState('')
  const [paymentType,setpaymentType] = useState(3)
  const [role,setrole] = useState('')
  const [image, setimage] = useState()
  const [states, setstates] = useState([
    {
      id:1,
      statesname:'folrida'
    },
    {
      id:2,
      statesname:'Texes'
    }
  ]
    
    )
  const [showModal, setshowModal] = useState(false)



  const registerApi =()=>{

    setshowIndicator(true)
      setTimeout(() => {
      navigation.navigate('login')
        
      }, 2000);

      var value = new FormData()
    // let value = {};
    value.append('Name',name)
    value.append('Email',email)
    value.append('Phone',phone)
    value.append('Date_of_Birth',dateofbirth)
    value.append('SNN',snn)
    value.append('DL',dl)
    value.append('Dot_Number',dotnumber)
    value.append('MC_Number',name)
    value.append('Password',password)
    value.append('BankNumber',bankacountnumber)
    value.append('Credit_Card_No',creditcardnumber)
    value.append('Expire_Date',expiredate)
    value.append('Security_Code',securitycode)
    value.append('Token','token')
    value.append('Role',"1")
    value.append('Device_id','312342441')
    value.append('Driver_Pic',image)
    value.append('Zip_Code',zipcode)
    value.append('Payment_Type',paymentType)

    // value.append('Driver_Pic',{
    //   uri:response.assets[0].uri,
    //      name:response.assets[0].fileName,
    //      type: response.assets[0].type
    //    });


    value.Name= name;
    value.Email = email;
    value.Phone = phone;
    value.Date_of_Birth = dateofbirth;
    value.SNN= snn;
    value.DL= dl;
    value.Dot_Number= dotnumber;
    value.MC_Number= mcnumber;
    value.BankNumber=bankacountnumber;
    value.Password=password;
    value.Payment_Type= paymentType;
    value.Bank_Info=bankinfo;
    value.Bank_Number=bankacountnumber;
    value.Credit_Card_No=creditcardnumber;
    value.Expire_Date=expiredate;
    value.Security_Code=securitycode;
    value.Zip_Code=zipcode;
    value.Token= 'token';
    value.Role= "1";
    value.Device_id='312342441'
    value.Driver_Pic =''




    // console.log(value);

    var url =AppUrlCollection.REGISTER;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':  'multipart/form-data',
        'Accept': 'application/json'
      },
      body: value,
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {

          if(responseJson.result == 'SUCCESS'){
            // alert(responseJson.DATA.user.Bank_Info)
            // alert(JSON.stringify(responseJson))

            console.log('login data response',responseJson);
            // alert(responseJson.DATA)
            setshowIndicator(false)
            navigation.navigate('login')
            // storeData(responseJson)

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
const galleryPic= async()=>{
  let options = {
    quality: 0.8,
    videoQuality: 'low',
    durationLimit: 30, //Video max duration in seconds
    saveToPhotos: true,
  };
  ImagePicker.launchCamera(options, (response) => {
    console.log('Response = ', response);

    if (response.didCancel) {
      // alert('User cancelled camera picker');
      return;
    } else if (response.errorCode == 'camera_unavailable') {
      alert('Camera not available on device');
      return;
    } else if (response.errorCode == 'permission') {
      alert('Permission not satisfied');
      return;
    } else if (response.errorCode == 'others') {
      alert(response.errorMessage);
      return;
    }else{

    
      let temp = {} ;
      temp.name = response.assets[0].fileName;
      temp.size = response.assets[0].fileSize;
      temp.type = response.assets[0].type;
      temp.url = response.assets[0].uri;

        // alert(JSON.stringify(temp))
    }




    // console.log('base64 -> ', response.base64);
    // console.log('uri -> ', response.uri);
    // console.log('width -> ', response.width);
    // console.log('height -> ', response.height);
    // console.log('fileSize -> ', response.fileSize);
    // console.log('type -> ', response.type);
    // console.log('fileName -> ', response.fileName);
    // setFilePath(response);
  });
}
    // const galleryPic=()=>{

    //   ImagePicker.openPicker({
    //     width: 300,
    //     height: 400,
    //   }).then(image => {
    //     console.log(image);
    //     setimage(image)
    //     setimageuser(image.path)
    //   });
    //   // console.log('img')
    // }

 
    // let uriimage ='../assets/logocrop.png'

    const renderItem = ({ item }) => (

      <View>
        {/* <Text>{item.id}</Text> */}
        <View style={{borderWidth:1,borderColor:'#EFDF79',marginBottom:10,borderRadius:10}}>
<CheckBox
      
      title={item.statesname}
      checkedIcon="dot-circle-o"
      uncheckedIcon="circle-o"
      checked={item.statesname == 'Texes' ? true :false }
      
      checkedColor='#EFDF79'
      onPress={() => setCheck(!check)}
    />
</View>

     
        </View>


 
   );
 
    return (
      <>
           <SafeAreaView style={styles.container}>
         
        <Spinner
          visible={showIndicator}
          textContent={'Loading...'}
          overlayColor='rgba(0, 0, 0, 0.25)'
          color	='#EFDF79'
          textStyle={{ color: '#EFDF79' }}
          
          // textStyle={styles.spinnerTextStyle}
        />
         
      <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}> 
        
        <Appbar.Header style={styles.header}>

        <View style={styles.headview}>
          <View style={{justifyContent:"center"}}>
            <Ionicons name='chevron-back' onPress={()=> {navigation.goBack()}} color={'grey'} style={{alignSelf:'center'}} size={25}/>
            </View>
          <Text style={{color:"black",fontSize:16,alignSelf:'center'}}>Register</Text>
          <View>
            </View>
        </View>

      </Appbar.Header>


          <ScrollView>
     
          <View style={styles.logtxt}>   
      {/* <ActivityIndicator size='large' color="#EFDF79" animating={showIndicator}  /> */}
       
          <TouchableOpacity style={{width:"40%",height:"11%",justifyContent:"center",alignSelf:"center"}}
          onPress={galleryPic}
          >
            {/* "../assets/logocrop.png" */}
          {imageuser == ''?
                         <Image style={{width:"100%",height:"100%", borderRadius:400/2,}} source={{uri:'https://reactjs.org/logo-og.png'}} />
                    :
                         <Image style={{width:"100%",height:"100%",borderRadius:400/2,}} source={{uri:imageuser}} />

          }
             {/* <Image style={{width:"100%",height:"80%",}} source={{uri:imageuser}} /> */}
             
          </TouchableOpacity>
   
             <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setname(Text)}}
        value={name}
        style={styles.input}
        placeholder="Name"/>
         <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setemail(Text)}}
        value={email}
        style={styles.input}
        placeholder="Enter Email "/>
         <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setphone(Text)}}
        value={phone}
        style={styles.input}
        placeholder="Phone"
        keyboardType={"numeric"}
        />
       
         <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setdateofbirth(Text)}}
        value={dateofbirth}
        style={styles.input}
        placeholder="Date of Birth"/>
         <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setsnn(Text)}}
        value={snn}
        style={styles.input}
        placeholder="SNN"/> 
        <TextInput   
        onChangeText={(Text)=>{setdl(Text)}}
        value={dl}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="DL"/> 
        <TextInput   
        onChangeText={(Text)=>{setmcnumber(Text)}}
        value={mcnumber}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder=" MC Number"/> 
        <TextInput   
        onChangeText={(Text)=>{setdotnumber(Text)}}
        value={dotnumber}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="DOT Number"/> 

        {/* Model Code */}
       <Modal
       transparent={true}
       visible={showModal}
       >
        <View style={{backgroundColor:"#000000aa",flex:1}} >
        <View style={{backgroundColor:"#ffffff",margin:20,padding:40,borderRadius:25,flex:1}} >
     
     
     <TouchableOpacity
       onPress={() =>setshowModal(false) }
       > 
       {/* <Button
       
       ></Button> */}
       <TextInput   
        onChangeText={(Text)=>{setstates(Text)}}
        value={states}
        editable={false}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="Close Model"/> 

</TouchableOpacity>
     {/* <SelectList 
      
      dropdownStyles={{backgroundColor:"white", borderWidth: 1,borderColor:'#EFDF79',borderRadius:15,}}
      boxStyles={{backgroundColor:"white", borderWidth: 1, height:44,  margin: 12,
      alignSelf:"center",paddingHorizontal:10, alignContent:'center', width:"100%",
      borderColor:'#EFDF79',borderRadius:10,}}
      setSelected={setselectedState}  
      onSelect={() => { setpaymentType(selected)}}

      data={StateData}  /> */}

<TextInput   
        // onChangeText={(Text)=>{setstates(Text)}}
        // value={states}
        // editable={false}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="Select State"/> 
 <FlatList
          data={states}
          // contentContainerStyle={{width:deviceWidth, paddingHorizontal:'2%',paddingBottom:"30%"}}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />


</View>
</View>
       </Modal>


        {/* Model Code close*/}

       <TouchableOpacity
       onPress={() =>setshowModal(true) }
       > 
       <TextInput   
        onChangeText={(Text)=>{setstates(Text)}}
        value={states}
        editable={false}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="States"/> 

</TouchableOpacity>
      
      <SelectList 
      
      dropdownStyles={{backgroundColor:"white", borderWidth: 1,borderColor:'#EFDF79',borderRadius:15,}}
      boxStyles={{backgroundColor:"white", borderWidth: 1, height:44,  margin: 12,
      alignSelf:"center",paddingHorizontal:10, alignContent:'center', width:"100%",
      borderColor:'#EFDF79',borderRadius:10,}}
      setSelected={setSelected}  
      onSelect={() => { setpaymentType(selected)}}

      data={data}  />

{
  selected == 0
  ?
  
  <View >
        {/* {console.log(selected)} */}
    
   <TextInput   
            onChangeText={(Text)=>{setbankinfo(Text)}}
            value={bankinfo}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Bank Information"/>
        <TextInput   
            onChangeText={(Text)=>{setbankacountnumber(Text)}}
            value={bankacountnumber}
        // {setpaymentType(selected)}

        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Account Number"/>
        {/* {setpaymentType(selected)} */}

        {/* {console.log(paymentType)} */}

    </View>
    :
    selected == 1?

    <View >
        {/* {console.log(selected)} */}

        <TextInput   
        onChangeText={(Text)=>{setcreditcardnumber(Text)}}
        value={creditcardnumber}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Credit Card Number"
        secureTextEntry={true}
        /> 
     <TextInput   
         onChangeText={(Text)=>{setexpiredate(Text)}}
         value={expiredate}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Expire Date"
        secureTextEntry={true}
        /> 
         <TextInput   
         onChangeText={(Text)=>{setsecuritycode(Text)}}
         value={securitycode}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Security Code"/>
        <TextInput   
        onChangeText={(Text)=>{setzipcode(Text)}}
        value={zipcode}
        placeholderTextColor={'grey'}
        style={styles.DropDowninput}
        placeholder="Zip Code "/>
        {/* {setpaymentType(selected)} */}
      
    </View>
    :
    <View>

    </View>
}

     
        <TextInput   
         onChangeText={(Text)=>{setpassword(Text)}}
         value={password}
        style={styles.input}
        secureTextEntry={true}
        placeholderTextColor={'grey'}
        placeholder="Enter Password"/>
        <TextInput   
         onChangeText={(Text)=>{setconfpassword(Text)}}
         value={confpassword}
        style={styles.input}
        secureTextEntry={true}
        placeholderTextColor={'grey'}
        placeholder="Enter Confirm Password"/>

    

      <View style={styles.btnBorder}>

     <TouchableOpacity style={styles.btnregister}
            onPress={()=>{registerApi()}}

    //  onPress={() => navigation.navigate('login')}
    >
        {/* onPress={()=>{registerApi()}} */}
      <Text style={{color:"black",fontSize:15,}}>Register</Text>
   </ TouchableOpacity>
    </View>

    </View>

    <TouchableOpacity
  
  style={{marginTop:50,alignSelf:"center",marginBottom:200, }}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={{color:'#EFDF79'}}>Already have an account? Login</Text>
      </TouchableOpacity>

    </ScrollView>
   
    
    </ImageBackground>
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
        backgroundColor: "transparent",
      },
      
      loader:{
        minHeight:"100%",
        display:"flex",
        justifyContent:"center",
        alignItems:"center",
        // backgroundColor:"lightgrey",
        // background: rgba(76, 175, 80, 0.3)
        backgroundColor:'rgba(76, 175, 80, 0.1)'
        // opacity:1
      }
      ,
    input: {
      height: 40,
      margin: 12,
      alignSelf:"center",
      padding: 10,
      borderWidth: 1,
      width:"100%",
      borderColor:'#EFDF79',
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
    
    backgroundColor:'rgba(0,0,0,0.3)',
    width:"90%",
    alignSelf:"center",
  paddingVertical:10,
  paddingHorizontal:20,
  borderRadius:10,
  marginBottom:10,
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
export default Register
