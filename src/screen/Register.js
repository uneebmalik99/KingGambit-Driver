import React, { useState , useEffect} from 'react'
import { View, Text,TextInput,StyleSheet,Button, ScrollView, SafeAreaView,ImageBackground ,Dimensions, 
  TouchableOpacity, Alert, Image,Modal,FlatList, } from 'react-native'
import { ActivityIndicator, Appbar } from "react-native-paper";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import SelectList from 'react-native-dropdown-select-list'
import DeviceInfo from 'react-native-device-info';
import { CheckBox, Icon } from '@rneui/themed';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import Feather from 'react-native-vector-icons/dist/Feather';
// import ImagePicker from 'react-native-image-crop-picker';
import Spinner from 'react-native-loading-spinner-overlay';
// or ES6+ destructured imports
import DocumentPicker from 'react-native-document-picker';
import * as ImagePicker from "react-native-image-picker"
import AppColors from '../Colors/AppColors';
import { getUniqueId, getManufacturer } from 'react-native-device-info';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width



const Register = ({navigation}) => {


  const [spinner,setspinner] = useState(false)  
  const [imageuser,setimageuser] = useState('')
  const [deviceId,setdeviceId] = useState('')
  const [showIndicator,setshowIndicator] = useState(false)
  const [selected, setSelected] = useState()
  const [Vehical,setVehical] =useState()
  const [selectedState, setselectedState] = useState()
  const [check, setCheck] = useState(false);
  // const [paymenttype,setpaymenttype] = useState(3)
  const data = [
      {key:'0',value:'Bank Info'},{key:'1',value:'Credit Card'},
      ]
  const VehicalType = [
      {key:'0',value:'Reefer Van'},{key:'1',value:'Dry Van'},
      {key:'2',value:'FlatBed Van'}
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
  const [DriverPic,setDriverPic]=useState('')
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
    const [Filteredstates, setFilteredstates] = useState([
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
    

    const [statevalue ,setstatevalue] = useState('')
    const [stateid,setstateid] = useState('')
    const [showModal, setshowModal] = useState(false)



  const registerApi =()=>{

    setspinner(true)
    var value = new FormData()

    value.append('Name',name)
    value.append('Email',email)
    value.append('Phone',phone)
    value.append('Date_of_Birth',dateofbirth)
    value.append('SNN',snn)
    value.append('DL',dl)
    value.append('Dot_Number',dotnumber)
    value.append('MC_Number',name)
    value.append('Password',password)
    value.append('Bank_Number',bankacountnumber)
    value.append('Bank_Info',bankinfo)
    value.append('Credit_Card_No',creditcardnumber)
    value.append('Expire_Date',expiredate)
    value.append('Security_Code',securitycode)
    value.append('Token','token')
    value.append('Role',"1")
    value.append('Device_id',deviceId)
    // value.append('Driver_Pic', DriverPic )
    // value.append('Zip_Code',zipcode)
    value.append('Payment_Type',paymentType)
    value.append('Vehicle_Type',Vehical)
    value.append('State_id',stateid)
    value.append('State_Name',statevalue)

  

    // value.append('Driver_Pic',{
    //   uri:response.assets[0].uri,
    //      name:response.assets[0].fileName,
    //      type: response.assets[0].type
    //    });

    console.log(JSON.stringify(value));

    var url =AppUrlCollection.REGISTER;
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
                navigation.navigate('login')
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
const galleryPic= async()=>{


  try {
    const pickerResult = await DocumentPicker.pickSingle({
      type: [DocumentPicker.types.images],

      presentationStyle: 'fullScreen',
      copyTo: 'cachesDirectory',
    })
    console.log(pickerResult)
    setDriverPic(pickerResult)
    // value.append('Driver_Pic', pickerResult)

    setimageuser(pickerResult.uri)
    // setimage([pickerResult])
  } catch (e) {
    console.log(e)
  }

}
    
const searchFilterFunction = (text) => {
  if (text) {

    const newData = states.filter(
      function (item) {

        const itemData = item.state_name
          ? item.state_name.toUpperCase()
          : ''.toUpperCase();


        const textData = text.toUpperCase();

        if (itemData.indexOf(textData) > -1) {
          return itemData.indexOf(textData) > -1;
        }
      });

    setstates(newData)
    //   setFilteredDataSource(newData);

    //   setSearch(text);
    console.log('text is ' + text);
  } else {
    // Inserted text is blank
    setstates(Filteredstates)
    console.log('blank');
    //   this.setState({vehicleList: vehicleList2})
    //   setFilteredDataSource(data);
    //   setSearch(text);
  }
};

const GetStates =()=>{
  setspinner(true)
  var url = AppUrlCollection.STATES;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type':  'application/json',
    }
})
    .then((response) =>  response.json() )
    .then((responseJson) => {
setspinner(false)
      setstates(responseJson)
      setFilteredstates(responseJson)
      console.log('states data response',responseJson);

        if(responseJson.message == 'SUCCESS'){
          console.log('states data response',responseJson);
       
        }else if(responseJson.status == 422){
          alert(responseJson.errors.password)
        }else if(responseJson.status == 401){
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

const renderstateslist = ({ item }) => {

  let c;
  if (statevalue == item.state_name) {
    c = 1
  }
  return (

    <TouchableOpacity
      onPress={() => { setshowModal(false); setstatevalue(item.state_name), setstateid(item.id) }}
      style={{ marginVertical: 5, borderWidth: 0.5, flexDirection: 'row', borderColor: 'grey', borderRadius: 10, paddingVertical: 12, paddingHorizontal: 10, }}>

      {c == null ?
        <Ionicons name='ios-radio-button-off-sharp' color='grey' style={{ alignSelf: 'center' }} size={20} /> :
        <Ionicons name='ios-radio-button-on' color={AppColors.Appcolor} style={{ alignSelf: 'center' }} size={20} />
      }


      <Text style={{ alignSelf: 'center', color: AppColors.Appcolor, marginLeft: 5, }}>{item.state_name}</Text>
    </TouchableOpacity>

  )

}
 
   useEffect(()=>{
    GetStates()
   },[])
    return (
      <>
           <SafeAreaView style={styles.container}>
         
        <Spinner
          visible={spinner}
          textContent={'Loading...'}
          overlayColor='rgba(0, 0, 0, 0.25)'
          color	='#EFDF79'
          textStyle={{ color: '#EFDF79' }}
          // textStyle={styles.spinnerTextStyle}
        />
         

         <Modal
       transparent={true}
       visible={showModal}
       >
        <SafeAreaView style={{backgroundColor:"#000000aa",flex:1}} >
        <View style={{backgroundColor:"#ffffff",borderTopRightRadius:15,borderTopLeftRadius:15, flex:1}} >
     
        <View
            style={{ width: deviceWidth, flexDirection: 'row', backgroundColor:AppColors.Appcolor, paddingHorizontal: 13, paddingVertical: 15, height: 55 }}>

            <TouchableOpacity
              style={{ justifyContent: 'center', paddingHorizontal:10, borderRadius:10,  }}
              onPress={() => setshowModal(false)}

            >
            <Ionicons style={{ alignSelf: 'center', }} size={22} color='white' name='ios-close' />


            </TouchableOpacity>

            <View style={{ width: '70%', justifyContent: 'center', }}>
              <Text style={{ alignSelf: 'center', color: 'white', fontWeight: 'bold', fontSize: 20 }}>STATES</Text>
            </View>

            <View style={{ width: '10%', justifyContent: 'center' }}>
              <TouchableOpacity style={{ alignSelf: 'center', justifyContent: 'center' }}>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ marginHorizontal: 10,marginTop:10, justifyContent: 'center', paddingHorizontal: 5, borderBottomWidth:0.7,borderColor:AppColors.Appcolor, backgroundColor: 'white', flexDirection: 'row' }}>
            <Feather style={{ alignSelf: 'center', }} size={18} color='grey' name='search' />

            <TextInput style={{ backgroundColor: 'white', width: '90%', height: 40, paddingHorizontal: 10, borderRadius: 20 }}
              onChangeText={text => searchFilterFunction(text)}
              // onSubmitEditing={(Text) => searchFilterFunction(Text)}
              // this.callingVehicleContainerService()
              placeholder="Search State"
              placeholderTextColor='grey'
              underlineColorAndroid="transparent"
            ></TextInput>


          </View>


  


 <FlatList
          data={states}
          contentContainerStyle={{width:deviceWidth,marginTop:10, paddingHorizontal:'2%',paddingBottom:"20%"}}
          renderItem={renderstateslist}
          keyExtractor={item => item.id}
        />


</View>
</SafeAreaView>

       </Modal>

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
 <SelectList 
      
      dropdownStyles={{backgroundColor:"white", borderWidth: 1,borderColor:'#EFDF79',borderRadius:15,}}
      boxStyles={{backgroundColor:"white", borderWidth: 1, height:44,  margin: 12,
      alignSelf:"center",paddingHorizontal:10, alignContent:'center', width:"100%",
      borderColor:'#EFDF79',borderRadius:10,}}
      setSelected={setSelected}  
      onSelect={() => { setVehical(selected)}}

      data={VehicalType}  />

<TouchableOpacity
       onPress={() =>setshowModal(true) }
       > 
       <TextInput   
        onChangeText={(Text)=>{setstates(Text)}}
        value={statevalue}
        editable={false}
        placeholderTextColor={'grey'}
        style={[styles.input,{color:'black'}]}
        placeholder="States"/> 


</TouchableOpacity>
       {/* <TouchableOpacity
       onPress={() =>setshowModal(true) }
       > 
       <TextInput   
        onChangeText={(Text)=>{setstates(Text)}}
        value={states}
        editable={false}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="States"/> 
        

</TouchableOpacity> */}
      
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
