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
import AppColors from "../Colors/AppColors";


export function DrawerContent(props) {
  const paperTheme = useTheme();


  const signOut = async () => {
    await AsyncStorage.setItem('Name','')
    await AsyncStorage.setItem('Email','')
    await AsyncStorage.setItem('Phone','')
    await AsyncStorage.setItem('DateofBirth','')
    // await AsyncStorage.setItem('CompanyName','')
    // await AsyncStorage.setItem('EIN','')
    await AsyncStorage.setItem('HaveLoad','')
    await AsyncStorage.setItem('Role','')
    await AsyncStorage.setItem('PaymentType','')
    await AsyncStorage.setItem('BankInfo','')
    await AsyncStorage.setItem('BankNumber','')
    await AsyncStorage.setItem('CreditCardNo','')
    await AsyncStorage.setItem('ExpireDate','')
    await AsyncStorage.setItem('SecurityCode','')
    await AsyncStorage.setItem('ZipCode','')
    await AsyncStorage.setItem('Token','')

    await AsyncStorage.setItem('Login','0')
    await AsyncStorage.setItem('Rating','0')

    
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
    AppConstance.HaveLoad = '';
    AppConstance.rating = '0';
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
      <View style={{ backgroundColor:AppColors.Appcolor, height: "25%" }}>
        <View style={styles.userInfoSection}>
          <Image
            style={{ width: "60%", height: "50%", alignSelf: "center" , borderRadius:10, }}
            
            source={require("../assets/logocrop.png")}
          />
          <View style={{alignSelf:'center',   
          alignSelf:'center', width: "80%" }}>
            <Title style={{color:AppColors.Appcolor, alignSelf:'center', fontSize:18}}>{AppConstance.Name}</Title>
            <Title style={styles.title}>
            {AppConstance.Email}
            </Title>
            {/* <Caption style={styles.caption}>
              {AppConstance.Email}
            </Caption> */}
            <View style={{alignSelf:'center'}}>
            <StarReview 
          style={{alignSelf:'center'}}
              ratings={AppConstance.rating}
              stars={5}
              reviews={AppConstance.rating}
              disableReview={false}
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
                alert('Coming Soon')
                // props.navigation.navigate("setting");
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
    backgroundColor: AppColors.Appcolor,
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
    fontSize: 10,
    alignSelf:'center',

    color: 'grey',
  },
  caption: {
    fontSize: 12,
 alignSelf:'center',
 backgroundColor:'red',
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
    marginBottom:30,
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
