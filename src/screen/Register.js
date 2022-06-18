import React from 'react'
import { View, Text,TextInput,StyleSheet,Button } from 'react-native'

const Register = ({navigation}) => {
    return (
        <View>
             <TextInput   
        style={styles.input}
        placeholder="Enter username or Email "/>
         <TextInput   
        style={styles.input}
        placeholder="Phone"
        keyboardType={"numeric"}
        />
         <TextInput   
        style={styles.input}
        placeholder="Date of Birth"/>
         <TextInput   
        style={styles.input}
        placeholder="SNN "/> 
        <TextInput   
        style={styles.input}
        placeholder="DL "/> 
        <TextInput   
        style={styles.input}
        placeholder="DOT Number "
        secureTextEntry={true}
        /> 
         <TextInput   
        style={styles.input}
        placeholder="MC Number "
        secureTextEntry={true}
        /> 
         <TextInput   
        style={styles.input}
        placeholder=" Bank Name"/>
        <TextInput   
        style={styles.input}
        placeholder=" Bank Account Holder Name "/>
            <TextInput   
        style={styles.input}
        placeholder="Bank Account Number"/>
         <TextInput   
        style={styles.input}
        secureTextEntry={true}
        placeholder="Password"/>
     <Button 
    title="Sign Up"
     onPress={() => navigation.navigate('login')}
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
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
  });
export default Register
