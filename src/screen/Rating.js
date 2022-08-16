import React,{useEffect,useState} from 'react'
import { View, Text, TouchableOpacity, StyleSheet,Image, Alert,KeyboardAvoidingView,ScrollView } from 'react-native'
import {TextInput,Button} from 'react-native-paper'
// import firestore from '@react-native-firebase/firestore'
// // import storage from '@react-native-firebase/storage'
// import auth from '@react-native-firebase/auth'
export default function FeedbackRating() {
    //chat screen see for this
    

    // console.log(route.params.ref._documentPath._parts[1])
    // let routeId = route.params;
    
    // console.log(id)
    // console.log(userName)
    const[maxRating,setMaxRating] = useState([1,2,3,4,5])
    const[defaultRating,setDefaultRating] = useState(1)
    const[message,setMessage] = useState('')

    const starImgFilled ='https://raw.githubusercontent.com/tranhonghan/images/main/star_filled.png'
    const starImgCorner ='https://raw.githubusercontent.com/tranhonghan/images/main/star_corner.png'
   
    const CustomRatingBar = () =>{
        
        return (
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
        )
    }
    
    return (
        <ScrollView>

        <View style={styles.container}>
        {/* <KeyboardAvoidingView behavior="position"> */}
            {/* <TextInput></TextInput> */}
          
            <Text style={styles.text}>Please Rate Us</Text>
            <CustomRatingBar />
            <Text style={styles.text}>
               
                {
                    defaultRating +"/"+ maxRating.length
                }
                </Text>

                {/* <TextInput label="FeedBack Message " 
            // value={year} 
            // maxLength={4}
            numberOfLines={4}
            // keyboardType="numeric"
            mode="outlined" 
           /> */}
           
<View style={{width:"80%"}}>

<TextInput label="Feedback Message" 
            value={message} 
            numberOfLines={4}
            multiline={true}
            mode="outlined" 
            onChangeText={text=>setMessage(text)}/>

           </View>
        {/* </KeyboardAvoidingView> */}
        {/* <Button  mode="contained" style={{marginVertical:5}}
         onPress={() => navigation.navigate("otheruserprofile")}>Submit</Button> */}
         <Button style={{marginVertical:5}} disabled={message?false:true} mode="contained" 
         onPress={()=>{postMsgData()}}>
             Submit</Button>

        <Button  mode="contained" onPress={() => navigation.navigate("otheruserprofile")}>Go Back</Button>

        </View>
        </ScrollView>

    )
}
const styles = StyleSheet.create({
    container:{
      flex:1,
     padding:10,
    //   justifyContent:"center"
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
       });