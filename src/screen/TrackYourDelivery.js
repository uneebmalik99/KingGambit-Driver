import { View, Text,TouchableOpacity,TextInput,StyleSheet,Button } from 'react-native'

import React from 'react'

const TrackYourDelivery = ({navigation}) => {
  return (
    <View>
      <Text style={styles.text}>TrackYourDelivery</Text>
      <View style={styles.mapShow}>
      <Text style={styles.text}>Maps</Text>
    <View style={{marginTop:170}}>
      <Text style={styles.text}>Where He Pickup Load</Text>
      <Text style={styles.text2}>Where He Gonna Drop The Load</Text>
      </View>
</View>
{/* <TouchableOpacity
style={{marginTop:20}}
onPress={() => navigation.navigate('')}
>
<TextInput   
style={styles.input}
placeholder=" Delivered"
editable={false}
/>
</TouchableOpacity> */}
<Button 
title="Delivered"
onPress={() => navigation.navigate('confirmationPage')}
/>
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
    height: 40,
    width:'60%',
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf:"center",
    textAlign:"center"
  },
  text:{
      alignSelf:"center"
  },
  text2:{
    alignSelf:"center",
    marginTop:50
}
,mapShow:{
    height: 500,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  }
});
export default TrackYourDelivery