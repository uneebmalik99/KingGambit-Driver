import React from 'react'
import { View, Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native'

import { Appbar } from "react-native-paper";

const IncomingLoad = () => {
  return (
    <View>
  <Appbar.Header style={styles.header}>
      <Text >
        Incoming Load
      </Text>
      
      </Appbar.Header>
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
// onPress={() => navigation.navigate('')}
>

<TextInput   
style={styles.input}
placeholder="Accept Load"
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