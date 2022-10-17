import { View, Text, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
// import { TextInput } from 'react-native-paper'
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { Appbar } from "react-native-paper";
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import AppColors from '../Colors/AppColors';

let editableColor =AppColors.Appcolor

const Contact = ({navigation}) => {
  return (
    <View>
          <Appbar.Header style={styles.header}>

<View style={styles.headview}>

<Ionicons name='chevron-back-outline' 
onPress={() => navigation.goBack()}
style={{alignSelf:'center',}} size={30} color='white'/>
<Text style={{color:"white",fontSize:16,alignSelf:'center',}}>Contact Us</Text>
{/* <Text>Edit</Text> */}
{/* <Ionicons name='create-outline' 
onPress={() => changeInput()}
style={{alignSelf:'center',}} size={30} color='black'/> */}
<View>
  <Text></Text>
  </View>
</View>

</Appbar.Header>

      {/* <View style={{padding:10,margin:10,}}>
      </View> */}
      <View style={styles.logtxt}>   
   
   <TextInput  
  
placeholderTextColor={'grey'}
// onChangeText={(Text)=>{setname(Text)}}
// value={name}
style={styles.input}
placeholder="Name"/>
<TextInput  
placeholderTextColor={'grey'}
// onChangeText={(Text)=>{setname(Text)}}
// value={name}
style={styles.input}
placeholder="Email"/>
<TextInput  
placeholderTextColor={'grey'}
// onChangeText={(Text)=>{setname(Text)}}
// value={name}
numberOfLines={5}
multiline={true}
style={styles.input}

placeholder="Message"/>



<View style={styles.btnBorder}>

<TouchableOpacity style={styles.btnregister}
  // onPress={()=>{registerApi()}}
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
      height:deviceHeight,
      width:deviceWidth,
    //   justifyContent: center,
    // marginTop: 170,
      // padding: 24,
      // backgroundColor: "transparent",
      backgroundColor:AppColors.Appcolor
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
    marginTop:10,
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
    borderColor:AppColors.Appcolor,
    borderWidth:2,
    backgroundColor:AppColors.AppColors,
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
    marginTop:20,
    borderColor:AppColors.Appcolor,
  borderWidth:1,
  // flex:1,
  // backgroundColor:'rgba(0,0,0,0.3)',
  backgroundColor:"white",
  width:"100%",
  height:"100%",
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
        borderColor:AppColors.Appcolor,
        borderRadius:10,
        backgroundColor:"white",
      height:40
}
});
export default Contact

