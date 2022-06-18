import React from 'react'
import { View, Text,TextInput,StyleSheet ,TouchableOpacity,Button } from 'react-native'

const Login = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Text>login</Text>

            <TextInput   
        style={styles.input}
        placeholder="Enter username or password "/>
            <TextInput
        style={styles.input}
        // onChangeText={onChangeNumber}
        // value={number}
        placeholder="Enter password"
        secureTextEntry={true}

        // keyboardType="numeric"
      />
       <Button 
    
    title="Login"
     onPress={() => navigation.navigate('welcomeLogistic')}
  />
       <TouchableOpacity
        style={{marginTop:20}}
        onPress={() => navigation.navigate('register')}
      >
        <Text>Don't have an account? Register</Text>
      </TouchableOpacity>
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
export default Login
