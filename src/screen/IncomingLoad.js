import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react'
import { View, Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';

import { Appbar } from "react-native-paper";
import AppConstance from '../constance/AppConstance';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';

const IncomingLoad = ({route,navigation}) => {

const {item} = route.params;
console.log('item data',item)

  const AcceptLoad= async()=>{

let driver_id = await   AsyncStorage.getItem('Id')
alert(item.data.load_id)
    let url = AppUrlCollection.Accept
    let value = {};
    value.load_id = item.data.load_id;
    value.driver_id = driver_id;
    value.User_id = parseInt(item.data.User_id);

    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type':  'application/json',
        
      },
      body:JSON.stringify(value) ,
  })

  .then((response) =>  response.json() )
  .then((responseJson) => {

     
  console.log('accept Data response data response',responseJson);
//   setspinner(false)  
  })
  .catch((error) => {
    setspinner(false)
    alert(error)
      console.warn(error)
  });
  }
  return (
    <View>
  <Appbar.Header style={styles.header}>
      <Text >
        Incoming Load
      </Text>
      
      </Appbar.Header>


      <ScrollView>
    <TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('maps')}
>
<TextInput   
style={styles.input}
placeholder="Load Details"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>
<TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder="Pick Up Location"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>
<TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder="Drop of Location"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>
<TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder="Dock Number"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>
<TouchableOpacity
style={{marginTop:20}}
onPress={() => {AcceptLoad()}}
>

<TextInput   
style={styles.input}
placeholder="Accept Load"
editable={false}

placeholderTextColor={'black'}

/>
</TouchableOpacity>

<TouchableOpacity
style={{marginTop:20,marginBottom:50}}
// onPress={() => navigation.navigate('')}
>

<TextInput   
style={styles.input}
placeholder="Deny Load"
editable={false}
placeholderTextColor={'black'}

/>
</TouchableOpacity>
{/* <TouchableOpacity
style={{marginTop:20}}
onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder="Save"
editable={false}
/>
</TouchableOpacity> */}

</ScrollView>
</View>
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
      height: 80,
      width:'60%',
      margin: 12,
      borderWidth: 1,
      padding: 10,
      alignSelf:"center",
      textAlign:"center"
    },
    header: {
      elevation: 0,
      backgroundColor: '#EFDF79',
      alignItems: "center",
      justifyContent: "center",
      // width:deviceWidth*0.07,
      // height: deviceHeight * 0.07,
      // alignSelf: "flex-start",
      borderRadius:15
    },
    text:{
        alignSelf:"center"
    }
  });
export default IncomingLoad