import React from 'react'
import { View, Text,TouchableOpacity,TextInput,StyleSheet } from 'react-native'


const IncomingLoad = () => {
  return (
    <View>
    <Text style={styles.text} >Incoming Load</Text>
    <TouchableOpacity
style={{marginTop:20}}
// onPress={() => navigation.navigate('maps')}
>
<TextInput   
style={styles.input}
placeholder="Load Details"
editable={false}
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
    text:{
        alignSelf:"center"
    }
  });
export default IncomingLoad