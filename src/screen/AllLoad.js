import { View, Text,TouchableOpacity,TextInput,StyleSheet, FlatList, ScrollView } from 'react-native'

import React from 'react'

const AllLoad = ({navigation}) => {

  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'Pick Up Location Distination Load Details Dock Number',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    
      title: 'Pick up Confirmation Drop of Location Dock Number',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
     
      title: 'Pick up Confirmation Drop of Location Dock Number',

    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
       
        title: 'Pick up Confirmation Drop of Location Dock Number',

      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
       
        title: 'Pick Up Location Distination Load Details Dock Number',
      },
  ];

  const Item = ({ title }) => (
    <TouchableOpacity onPress={()=>navigation.navigate('trackyourDelivery')}> 
      <View style={styles.input}>
      <Text style={styles.title}>{title}</Text>
    </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.title} />
  );

  return (
    // <View>
    //   <Text style={styles.text}>All Load</Text>
    //   <TouchableOpacity
    //     style={{marginTop:20}}
    //     onPress={() => navigation.navigate('allLoad')}
    //   >
    //    <TextInput   
    //     style={styles.input}
    //     placeholder="Pick up Confirmation 
    //     Drop of Location 
    //     Dock Number"
    //     editable={false}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     style={{marginTop:20}}
    //     onPress={() => navigation.navigate('allLoad')}
    //   >
    //    <TextInput   
    //     style={styles.input}
    //     placeholder="Pick up Confirmation 
    //     Drop of Location 
    //     Dock Number"
    //     editable={false}
    //     />
    //   </TouchableOpacity>
    //   <TouchableOpacity
    //     style={{marginTop:20}}
    //     onPress={() => navigation.navigate('allLoad')}
    //   >
    //    <TextInput   
    //     style={styles.input}
    //     placeholder="Pick up Confirmation 
    //     Drop of Location 
    //     Dock Number"
    //     editable={false}
    //     />
    //   </TouchableOpacity>
    // </View>
   
   
   

 
      <View>
          
          {/* <Text style={styles.text}>All Load</Text>
          <View style={styles.input}>
          <Text>Pick Up Location</Text>
          <Text>Distination</Text>
          <Text>Load Details Dock Number</Text>
          
      </View>
      <View style={styles.input}>
      <Text>Pick Up Location</Text>
          <Text>Distination</Text>
          <Text>Load Details Dock Number</Text>
      </View>
      <View style={styles.input}>
      <Text>Pick Up Location</Text>
          <Text>Distination</Text>
          <Text>Load Details Dock Number</Text>
      </View> */}
      <ScrollView>

      <Text style={styles.text}>All Load</Text>
      
     <FlatList
      data={DATA}
      renderItem={renderItem}
      keyExtractor={item => item.id}
    />
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
    height: 150,
    width:'70%',
    marginTop:20,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    alignSelf:"center"
  },text:{
    alignSelf:"center",
    marginTop:70,
}
});

export default AllLoad