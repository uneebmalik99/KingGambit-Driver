import { View, Text,TouchableOpacity,TextInput,StyleSheet, Button } from 'react-native'

import React from 'react'

const WelcomeLogistic = ({navigation}) => {
  return (
    <View>
      <Text style={styles.text}>Welcome ABC Logistic</Text>
      <TouchableOpacity
        style={{marginTop:20}}
        onPress={() => navigation.navigate('allLoad')}
      >
       <TextInput   
        style={styles.input}
        placeholder="All Load"
        editable={false}
        />
      </TouchableOpacity>
      <Button title='Chk All Load' onPress={()=>navigation.navigate('incomingLoad')}></Button>
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
    height: 170,
    width:'60%',
    marginTop:80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf:"center",
    textAlign:"center"
  },
  text:{
      alignSelf:"center",
      marginTop:70,
  }
});
export default WelcomeLogistic