import React, { useState } from 'react'
import { View,ImageBackground,Dimensions, Text,TextInput,StyleSheet ,TouchableOpacity,Button, SafeAreaView } from 'react-native'
import { Appbar } from "react-native-paper";

import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Snackbar from 'react-native-snackbar';
import Spinner from 'react-native-loading-spinner-overlay';
import AppColors from '../Colors/AppColors';


const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width

const ForgetPass = ({navigation}) => {

  const [spinner,setspinner] = useState(false)  

  const [email,setemail] = useState('')
  const [Passwordreset,setPasswordreset] = useState()


  const ForgetApi =()=>{

    let value = {}
    value.Email = email
    var url =AppUrlCollection.Submit_Forget;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
      },
      body:JSON.stringify( value),
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {
        console.log('login data response',responseJson);
        setspinner(false)
        navigation.navigate('verificationCode',
        {
          password:responseJson.Password_reset_Token.password_resets ,
          Data:responseJson
        })

         
    
    //   setspinner(false)  
      })
      .catch((error) => {
        setspinner(false)

        alert(error)
              // navigation.navigate('login')

          console.warn(error)
      });
 
  
  }



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
  <ImageBackground source={require('../assets/bk.png')} resizeMode="cover" style={styles.image}>
  </ImageBackground>

<Appbar.Header style={styles.header}>

<View style={styles.headview}>
          <View style={{justifyContent:"center"}}>
            <Ionicons name='chevron-back' onPress={()=> {navigation.goBack()}} color={'grey'} style={{alignSelf:'center'}} size={25}/>
            </View>
          <Text style={{color:"black",fontSize:16,alignSelf:'center'}}>Forget Password</Text>
          <View>
            </View>
        </View>

</Appbar.Header>


     <View style={styles.logtxt}>   
      <View style={{ width:"90%",marginTop:20,alignSelf:"center",paddingHorizontal:10}}>
      <TextInput   
        placeholderTextColor={'grey'}
        onChangeText={(Text)=>{setemail(Text)}}
        value={email}
        style={styles.input}
        placeholder="Enter Email "/>
     
     
    

</View>

<View style={styles.btnBorder}>
 <TouchableOpacity 
 disabled={email == ''? true:false}
style={styles.btnBorderSize}
// title="Login"
onPress={() =>{ 
  
  // alert("forget call")
  ForgetApi()

  }}
>
  <Text style={{color:"black",fontSize:15,}}>Submit</Text>

</TouchableOpacity>
 </View>
</View>

  </SafeAreaView>
  </>
  )
}
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: "#eaeaea",
      height:"100%"

    },
    header: {
      elevation: 0,
      backgroundColor: 'transparent',
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
      alignItems: "center",
      paddingHorizontal:0,
      paddingVertical:0,
      justifyContent: "center",
      borderRadius:15
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
  headview:{
    height:'100%',
    width:'100%',
    flexDirection:'row',
    justifyContent:'center',
    borderBottomRightRadius:15,
    borderBottomLeftRadius:15,
    paddingHorizontal:10,
    justifyContent:'space-between',
    backgroundColor:'#EFDF79'
  },
  register_txt:{
  fontSize:16,
  fontWeight:'600',
  alignSelf:'center' 
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
forgetPass:{
alignSelf:"flex-end",
// backgroundColor:'red',
marginBottom:45,
color:'#EFDF79'
},
btnBorder:{
// marginTop:30,
borderColor:'#EFDF79',
borderWidth:3,
backgroundColor:'black',
borderRadius:130/2,
height:130,
// paddingVertical:10,
width:130,
alignSelf:'center',
justifyContent:"center" 
//  justifyContent:"center"
},
btnBorderSize:{
// width:100,
padding:10,
// height:40,
// marginTop:20,
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
  marginTop:0
}
});
export default ForgetPass
