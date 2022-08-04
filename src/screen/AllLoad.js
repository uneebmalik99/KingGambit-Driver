import { View, Text, TouchableOpacity, TextInput, StyleSheet, FlatList,Dimensions, ScrollView,Image } from 'react-native'
import { Avatar, Button, Title, Card, Paragraph } from 'react-native-paper'
import React, { useEffect, useState } from 'react'
import { Appbar } from "react-native-paper";
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import AppConstance from '../constance/AppConstance';
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import { SafeAreaView } from 'react-native-safe-area-context';

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

const AllLoad = ({ navigation }) => {


  const [data,setdata] = useState([])


  const LoadApi =()=>{

// console.log(AppConstance.AUTH_KEY)
    // setshowIndicator(true)
    setTimeout(() => {
      // setshowIndicator(false)
    // navigation.navigate('welcome')
      
    }, 2000);
    alert(AppConstance.Id)

  // var url ='https://kinggambits.com/kinggambitapi/api/load?Driver_Id=' 
  var url = AppUrlCollection.LOAD + "?Driver_Id="+AppConstance.Id;

  fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type':  'application/json',
      'Authorization': "Bearer "+AppConstance.AUTH_KEY
    }
})
    .then((response) =>  response.json() )
    .then((responseJson) => {

      setdata(responseJson)
        if(responseJson.message == 'SUCCESS'){
          console.log('login data response',responseJson);
       
        }else if(responseJson.status == 422){
          alert(responseJson.errors.password)
        }else if(responseJson.status == 401){
          alert(responseJson.error)
        }
    console.log('login data response',responseJson);
  //   setspinner(false)  
    })
    .catch((error) => {
      // setspinner(false)
      alert(error)
        console.warn(error)
    });
    
    // <ActivityIndicator size='large' color="#EFDF79" animating={true}  />
}

useEffect(()=>{
  LoadApi()
},[])



  const renderItem = ({ item }) => (

     <TouchableOpacity 
                  style={{height:Platform.OS=='ios'? deviceHeight*0.15:deviceHeight*0.2,width:"100%",borderRadius:15,borderRadius:10, marginTop:10,backgroundColor:'#b3b3b3'}}
                    onPress={() =>
                      {
                    {console.log(item)}
                    navigation.navigate('trackyourDelivery',{data:item})
                      }
                    }>

      <View style={{ height:"20%", backgroundColor: "#EFDF79",borderRadius:10, justifyContent:"center"}}>
          <Text style={styles.txt}>Dock Number:{item.Dock_Number}</Text>
      </View>

      <View style={{  paddingVertical:"2%", height:"80%", paddingHorizontal:'3%',flexDirection: "row" }}>

          <View style={{  padding:"1%", width: "35%", height: "100%" }}>
            <Image source={require('../assets/bk.png')}  style={{width:"100%",borderRadius:10, height:"100%"}} />
          </View>




          <View style={{  width: "65%",paddingHorizontal:"1%", alignItems: "flex-start", justifyContent: "space-around" }}>

            <View style={{  width: "100%", }}>
              <Text style={styles.txt}>Pick Up Location: {item.P_Address}</Text>
            </View>

            <View style={{  width: "100%" }}>
              <Text style={styles.txt}>Drop Off Location: {item.D_Address}</Text>
            </View>

            <View style={{  width: "100%", }}>
            <Text style={styles.txt}>Status: {item.Status == '0'? "In Transit":"Complete"}</Text>
            </View>

          </View>

      </View>

     </TouchableOpacity>

  );

  return (


    <SafeAreaView>

<Appbar.Header style={styles.header}>

<View style={styles.headview}>
  <View style={{justifyContent:"center"}}>
    <Ionicons name='chevron-back' onPress={()=> {navigation.goBack()}} color={'grey'} style={{alignSelf:'center'}} size={25}/>
    </View>
  <Text style={{color:"black",fontSize:16,alignSelf:'center'}}>Loads</Text>
  <View>
    </View>
</View>

</Appbar.Header>
  
      <ScrollView>

        {/* <Text style={styles.text}>All Load</Text> */}

        <FlatList
          data={data}
          contentContainerStyle={{width:deviceWidth, paddingHorizontal:'5%',paddingBottom:"30%"}}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </ScrollView>
    </SafeAreaView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //   justifyContent: center,
    marginTop: 170,
    padding: 24,
    backgroundColor: "#eaeaea"
  },
  input: {
    height: 150,
    width: '70%',
    marginTop: 20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf: "center"
  }, text: {
    alignSelf: "center",
    marginTop: 70,
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
  card: {
    margin: 10,
    elevation: 5, // elevation shahdow deny k liye
    borderWidth: 2, borderRadius: 10, borderColor: '#EFDF79',
    backgroundColor: "lightgrey"

  },
  headview:{
        height:'100%',
        width:'100%',
        borderBottomRightRadius:15,
        borderBottomLeftRadius:15,
        flexDirection:'row',
        paddingHorizontal:10,
        justifyContent:'space-between',
        backgroundColor:'#EFDF79'
      },
  txt: {
    color: 'black',
    alignSelf:"center",
    
  }
});

export default AllLoad