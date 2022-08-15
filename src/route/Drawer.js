import React from "react";
import { View, StyleSheet, Image, Platform } from "react-native";
import {
  useTheme,
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  Text,
  TouchableRipple,
  Switch,
} from "react-native-paper";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AntDesign from "react-native-vector-icons/dist/AntDesign";
import FontAwesome from "react-native-vector-icons/dist/FontAwesome";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/dist/MaterialIcons";
import Ionicons from "react-native-vector-icons/dist/Ionicons";
import AppConstance, {
  deviceHeight,
  deviceWidth,
} from "../constance/AppConstance";
import { SafeAreaView } from "react-native-safe-area-context";
import StarReview from 'react-native-star-review'
import AsyncStorage from "@react-native-async-storage/async-storage";
import MaterialCommunityIcons from 'react-native-vector-icons/dist/MaterialCommunityIcons';


export function DrawerContent(props) {
  const paperTheme = useTheme();


  const signOut = async () => {
    await AsyncStorage.setItem('Name','')
    await AsyncStorage.setItem('Email','')
    await AsyncStorage.setItem('Phone','')
    await AsyncStorage.setItem('DateofBirth','')
    // await AsyncStorage.setItem('CompanyName','')
    // await AsyncStorage.setItem('EIN','')
    await AsyncStorage.setItem('Role','')
    await AsyncStorage.setItem('PaymentType','')
    await AsyncStorage.setItem('BankInfo','')
    await AsyncStorage.setItem('BankNumber','')
    await AsyncStorage.setItem('CreditCardNo','')
    await AsyncStorage.setItem('ExpireDate','')
    await AsyncStorage.setItem('SecurityCode','')
    await AsyncStorage.setItem('ZipCode','')
    await AsyncStorage.setItem('Token','')

    AppConstance.Name='';
    AppConstance.Email='';
    AppConstance.Phone='';
    AppConstance.DateofBirth='';
    // AppConstance.CompanyName='';
    // AppConstance.EIN='';
    AppConstance.Role='';
    AppConstance.PaymentType='';
    AppConstance.BankInfo='';
    AppConstance.BankNumber='';
    AppConstance.CreditCardNo='';
    AppConstance.ExpireDate='';
    AppConstance.SecurityCode='';
    AppConstance.ZipCode='';
    AppConstance.AUTH_KEY='';
    // await AsyncStorage.removeItem(AppConstance.USER_INFO_OBJ);
    // await AsyncStorage.setItem("ISUSERLOGIN", "0");
    // await AsyncStorage.setItem("ROLE", "");
    // AppConstance.ROLE = "";
    // AppConstance.IS_USER_LOGIN = "0";
    // // props.navigation.navigate("Welcome");

    props.navigation.navigate("login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "black" }}>
      <View style={{ backgroundColor:'#daa726', height: "25%" }}>
        <View style={styles.userInfoSection}>
          <Image
            style={{ width: "50%", height: "40%", alignSelf: "center" }}
            source={require("../assets/logocrop.png")}
          />
          <View style={{ flexDirection: "row",justifyContent:'space-around',  alignSelf:'center', width: "80%" }}>
            {/* <Title style={styles.title}>John Doe</Title> */}
            <Title style={styles.title}>
            {/* label={'fh'} */}
            </Title>
            {/* <Caption style={styles.caption}>
              {AppConstance.USER_INFO.USER_EMAIL}
            </Caption> */}
            <View style={{alignSelf:'center'}}>
            <StarReview 
          style={{alignSelf:'center'}}
              ratings={2}
              stars={5}
              starColor="#EFDF79"
            />
              </View>
         

          </View>
        </View>
      </View>
      <View style={styles.drawerContent}>
   
        <DrawerContentScrollView style={{ paddingVertical: 0,paddingTop:0, marginTop:5, }} {...props}>
          
          <Drawer.Section style={styles.drawerSection}>
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="home-outline" color="black" size={size} />
              )}
              label={AppConstance.CompanyName}
              labelStyle={{ color: "black" }}
              // onPress={() => {
              //   props.navigation.navigate("Home");
              // }}
            /> */}
            <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="CodeSandbox" size={size} color="black" />
              )}
              label={'Loads'}
              labelStyle={{ color: "black" }}
              onPress={() => {
                props.navigation.navigate("allLoad");
              }}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <Icon name="car" size={size} color="black" />
              )}
              label={AppConstance.Email}
              labelStyle={{ color: "black" }}
              // labelStyle={{ color: "black" }}
              onPress={() => {
                props.navigation.navigate("Profile");
              }}
             
            /> */}
            <DrawerItem
              icon={({ color, size }) => (
                <MaterialCommunityIcons  name='account-circle-outline' 
                onPress={() => { navigation.navigate('profile')}}
                style={{alignSelf:'center',}} size={30} color='black'/>              )}
              label={'Profile'}
              labelStyle={{ color: "black" }}
              onPress={() => {
                props.navigation.navigate("profile");
              }}
            />
            <DrawerItem
            style={{marginLeft:15}}
              icon={({ color, size }) => (
                <Ionicons name="ios-settings-outline" size={size} color="black" />
              )}
              label={'Setting'}
              labelStyle={{ color: "black" }}
              onPress={() => {
                props.navigation.navigate("setting");
              }}
            />
              <DrawerItem
            style={{marginLeft:15}}
              icon={({ color, size }) => (
                <MaterialIcons name="contact-support" size={size} color="black" />
              )}
              label={'Contact Us'}
              labelStyle={{ color: "black" }}
              onPress={() => {
                props.navigation.navigate("contact");
              }}
            />
            {/* <DrawerItem
              icon={({ color, size }) => (
                <AntDesign name="customerservice" size={size} color="black" />
              )}
              label={AppConstance.EIN}
              labelStyle={{ color: "black" }}
             
            /> */}
        
          </Drawer.Section>
        </DrawerContentScrollView>
        <Drawer.Section style={styles.bottomDrawerSection}>
          <DrawerItem
            icon={({ color, size }) => (
              <Icon name="exit-to-app" color="#EFDF79" size={size} />
            )}
            label={'Logout'}
            labelStyle={{ color: "#EFDF79" }}
            onPress={() => {
              signOut();
            }}
          />
        </Drawer.Section>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  drawerContent: {
    backgroundColor: '#daa726',
    borderTopLeftRadius: 35,
    width: "93%",
    justifyContent: "flex-start",
    height: Platform.OS == "ios" ? "80%" : "75%",
    paddingBottom: 8,
    alignSelf: "flex-end",
  },
  userInfoSection: {
    paddingVertical: 5,
    backgroundColor: "black",
    borderBottomRightRadius: 35,
   justifyContent:'space-around',
    alignItems: "center",
    height: "100%",
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: 'grey',
  },
  caption: {
    fontSize: 14,
    lineHeight: 14,
    color: 'grey',
  },
  row: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  section: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  paragraph: {
    fontWeight: "bold",
    marginRight: 3,
  },
  drawerSection: {
    marginTop: 0,
    paddingVertical:0,
  },
  bottomDrawerSection: {
    margin:20,
    borderRadius:10,
    backgroundColor:'black'
    // backgroundColor: "#1B55A3",
    // borderTopWidth: 1,
  },
  preference: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
