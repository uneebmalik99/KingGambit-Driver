import React from 'react'
import { View, Text,Button ,StyleSheet,} from 'react-native'

const Splash = ({navigation}) => {
    return (
    //     <View sty>
    //         <Text>splash scr</Text>
    //         <Button
    //     title="splash screen"
    //     onPress={() => navigation.navigate('login')}
    //   />
    //     </View>
    <View style={styles.container}>
    {/* <Text style={styles.title}>React Native</Text> */}
    <Button 
        title="splash screen"
         onPress={() => navigation.navigate('login')}
      />
  </View>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    //   justifyContent: center,
    marginTop: 300,
      padding: 24,
      backgroundColor: "#eaeaea"
    },
    title: {
      marginTop: 16,
      paddingVertical: 8,
      borderWidth: 4,
      borderColor: "#20232a",
      borderRadius: 6,
      backgroundColor: "#61dafb",
      color: "#20232a",
      textAlign: "center",
      fontSize: 30,
      fontWeight: "bold"
    }
  });
  
export default Splash
