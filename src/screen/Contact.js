import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
// import { TextInput } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { Appbar } from "react-native-paper";
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import AppColors from '../Colors/AppColors';

const Contact = ({navigation}) => {
  return (
    <View>
        <Appbar.Header style={styles.header}>

<View style={styles.headview}>

  {/* <Ionicons name='menu-outline' 
  onPress={() => navigation.openDrawer()}
  style={{alignSelf:'center',}} size={30} color='white'/> */}
  <Text style={{color:"white",fontSize:16,alignSelf:'center' ,marginLeft:"37%"}}>Contact Us</Text>
  <MaterialCommunityIcons  name='account-circle-outline' 
  onPress={() => { navigation.navigate('profile')}}
  style={{alignSelf:'center',}} size={30} color='white'/>
</View>

</Appbar.Header>
      {/* <Text>Contact</Text> */}
      <View style={{marginTop:10,borderWidth:2,width:"80%",alignSelf:"center",borderColor:"#EFDF79",height:"60%",}}>
      <TextInput  
            //  editable={} 
            //  label="DOT Number"
        // onChangeText={(Text)=>{setdotnumber(Text)}}
        // value={dotnumber}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="Phone"/> 
      <TextInput  
            //  editable={} 
            //  label="DOT Number"
        // onChangeText={(Text)=>{setdotnumber(Text)}}
        // value={dotnumber}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="Email"/> 
          <TextInput  
            //  editable={} 
            //  label="DOT Number"
        // onChangeText={(Text)=>{setdotnumber(Text)}}
        // value={dotnumber}
        placeholderTextColor={'grey'}
        style={styles.input}
        placeholder="Message"/> 
          <View style={styles.btnBorder}>

<TouchableOpacity style={styles.btnregister}
    //    onPress={()=>{registerApi()}}
>
   
 <Text style={{color:"black",fontSize:15,}}>Submit</Text>
</ TouchableOpacity>
</View>
</View>
    </View>
  )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
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
})
export default Contact

