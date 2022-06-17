import React from 'react'
import { View, Text } from 'react-native'
import AppNavigator from './src/route/AppNavigator'
import { NavigationContainer } from '@react-navigation/native';

// import AppNavigator from './src/route/AppNavigator'
// import Splash from './comp/Splash'

const App = () => {
  return (
    // <View>
    //   {/* <AppNavigator /> */}
    //   <Text>hi</Text>
    //  </View>

    <NavigationContainer>
   <AppNavigator />
  </NavigationContainer>
  )
}

export default App
