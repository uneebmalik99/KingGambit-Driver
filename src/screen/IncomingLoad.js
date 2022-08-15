import React,{useState,useRef, useEffect} from 'react'
import { View,Button,Modal,Image, Text,TouchableOpacity,TextInput,SafeAreaView, StyleSheet, ScrollView, PermissionsAndroid } from 'react-native'
import AppConstance,{deviceHeight,deviceWidth} from "../constance/AppConstance"
import DatePicker from 'react-native-date-picker'
import { Appbar } from "react-native-paper";
import Ionicons from 'react-native-vector-icons/dist/Ionicons';
import FontAwesome from 'react-native-vector-icons/dist/FontAwesome';
import MaterialIcons from 'react-native-vector-icons/dist/MaterialIcons';
import MapView, { AnimatedRegion, Animated, PROVIDER_GOOGLE ,Geojson, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import Geolocation from '@react-native-community/geolocation';
import MapViewDirections from 'react-native-maps-directions';
import AppColors from '../Colors/AppColors';
import AppUrlCollection from '../UrlCollection/AppUrlCollection';
import Geocoder from 'react-native-geocoding';
import {getDistance, getPreciseDistance} from 'geolib';
import SelectList from 'react-native-dropdown-select-list'
import Spinner from 'react-native-loading-spinner-overlay';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import BottomSheet from 'reanimated-bottom-sheet';
import RBSheet from "react-native-raw-bottom-sheet";


const IncomingLoad = ({route ,navigation}) => {
  
  const {plat , plong, pAdd, dlat, dlong,dAdd,tprice,dprice,vtype} = route.params
  const refRBSheet = useRef();
  const refRBSheet2 = useRef();

  const [mapState, setMapState] = useState({
		initialRegion: {
			latitude: 30.3753,
			longitude: 69.3451,
			latitudeDelta: 0.000522,
			longitudeDelta: 0.00321,
		},
		region: {
			latitude: 24.860966,
			longitude: 66.990501,
			latitudeDelta: 0.00522,
			longitudeDelta: 0.00321,
		},
		foundPlaceMarker: { latitude: 30.3753, longitude: 69.3451 },
		currentPosMarker: { latitude: 30.3753, longitude: 69.3451 },
	});

  const [modalVisible ,setmodalVisible] = useState(true)
  const [currentloclat,setcurrentloclat ]=useState(47.116386)
  const [currentloclon,setcurrentloclon ]=useState(-101.299591)
  const [pickupaddress , setpickupaddress] = useState(pAdd)
  const [ vehicletype , setvehicletype] = useState('0')
  const [selected, setSelected] = useState()

  const data = [
    {key:'0',value:'Reefer Van'},{key:'1',value:'Dry Van'},{key:'2',value:'Flatbed Van'},
    ]
  const myPlace = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [64.165329, 48.844287],
        }
      }
    ]
  };
  const [coordinates] = useState([
    {
      latitude: 48.8587741,
      longitude: 2.2069771,
    },
    {
      latitude: 48.8323785,
      longitude: 2.3361663,
    },
  ])
  const [isMapReady, setIsMapReady] = useState(false);

  const [platitude , setplatitude] = useState(plat)
  const [plongitude , setplongitude] = useState(plong)
  const [platitudeDelta,setplatitudeDelta]= useState('')
  const [plongitudeDelta ,setplongitudeDelta] = useState('')
  const [dlatitude , setdlatitude] = useState(dlat)
  const [dlongitude , setdlongitude] = useState(dlong)
  const [dropoffaddress , setdropoffaddress] = useState(dAdd)
  const [spinner , setspinner]= useState(false)
  const   [region , setregion]  = useState({
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.0922,
      longitudeDelta: 0.0421,
  })
  const origin = {latitude: plat,longitude: plong};
  const destination = {latitude: dlat,longitude: dlong};
  const GOOGLE_MAPS_APIKEY = 'AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo';

  const [pmapmodel , setpmapmodel] = useState(false)
  const [dmapmodel , setdmapmodel] = useState(false)
  const [date, setDate] = useState(new Date())
  const [pickuptimeopen, setpickuptimeopen] = useState(false)
  const [dropofftimeopen, setdropofftimeopen] = useState(false) 
  const [pickuptimedate, setpickuptimedate] = useState()
  const [dropofftimedate, setdropofftimedate] = useState()
  
  const [loaddescription, setloaddescription]= useState('')
  const [docknumber, setdocknumber] = useState('')
  const [price, setprice] = useState()
  const [distance, setdistance] =useState('')
  const [driverprice, setdriverprice] = useState(dprice)
  const [totalprice, settotalprice] = useState(tprice)
  const [weight ,setweight] = useState('')
	const mapRef = useRef(null);

  const requestCameraPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool Photo App Camera Permission",
          message:
            "Cool Photo App needs access to your camera " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        console.log('Granted');
        callLocation()
        // Geolocation.getCurrentPosition(
        //   (position) => {
        //     console.log(position);
        //     setcurrentloclat(position.coords.latitude)
        //     setcurrentloclon(position.coords.longitude)
        //     Geocoder.from(position.coords.latitude, position.coords.longitude)
        //     .then(json => {
        //       var addressComponent = json.results[0].formatted_address;
        //       setpickupaddress(addressComponent)
        //       })
        //     .catch(error => console.warn(error));
        //   },
        //   (error) => console.log(error)

        //   //  this.setState({ error: error.message }),
        //   // { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        // );
        // console.log("You can use the camera");
      } else {
        console.log("Camera permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const callLocation = () => {
    console.log("working1");

         Geolocation.getCurrentPosition(
          (position) => {
            console.log(position);
            setcurrentloclat(position.coords.latitude)
            setcurrentloclon(position.coords.longitude)
						let currentLatitude =position.coords.latitude
            let currentLongitude = position.coords.longitude
            
            			setMapState({
					...mapState,
					region: {
						...mapState.region,
						currentLatitude,
						currentLongitude,
					},
				});
            Geocoder.from(position.coords.latitude, position.coords.longitude)
            .then(json => {
              var addressComponent = json.results[0].formatted_address;
              setpickupaddress(addressComponent)
              })
            .catch(error => console.warn(error));
          },
          (error) => console.log(error)

          //  this.setState({ error: error.message }),
          // { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
        );
        console.log("You can use the camera");
		// Geolocation.getCurrentPosition(
		// 	(position) => {
		// 		const currentLongitude = JSON.stringify(
		// 			position.coords.longitude
		// 		);
		// 		//getting the Longitude from the location json
		// 		const currentLatitude = JSON.stringify(
		// 			position.coords.latitude
		// 		);
		// 		//getting the Latitude from the location json
		// 		setcurrentloclat(parseFloat(currentLongitude, 10));
		// 		//Setting state Longitude to re re-render the Longitude Text
		// 		setcurrentloclat(parseFloat(currentLatitude, 10));
		// 		//Setting state Latitude to re re-render the Longitude Text
		// 		console.log("success");

		// 		setMapState({
		// 			...mapState,
		// 			region: {
		// 				...mapState.region,
		// 				currentLatitude,
		// 				currentLongitude,
		// 			},
		// 		});


    //     // Geocoder.from(position.coords.latitude, position.coords.longitude)
    //     //     .then(json => {
    //     //       var addressComponent = json.results[0].formatted_address;
    //     //       setpickupaddress(addressComponent)
    //     //       })
    //     //     .catch(error => console.warn(error));
		// 	},
		// 	(error) => console.log(error.message),
		// 	{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
		// 	// navigator.geolocation.getCurrentPosition(
		// 	// 	(position) => {
		// 	// 		this.setState({
		// 	// 			latitude: position.coords.latitude,
		// 	// 			longitude: position.coords.longitude,
		// 	// 			error: null,
		// 	// 		});
		// 	// 	},
		// 	// 	(error) => this.setState({ error: error.message }),
		// 	// 	{ enableHighAccuracy: true, timeout: 25000, maximumAge: 3600000 }
		// 	// );
		// 	// Geolocation.getCurrentPosition(
		// 	//   position => {
		// 	//     const initialPosition = JSON.stringify(position);
		// 	//     // this.setState({initialPosition});
		// 	//   },
		// 	//   error => Alert.alert('Error', JSON.stringify(error)),
		// 	//   {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
		// 	// );
		// 	// this.watchID = Geolocation.watchPosition(position => {
		// 	//   const lastPosition = JSON.stringify(position);
		// 	//   // this.setState({lastPosition});
		// );
	};


  const calculatePreciseDistance = () => {
    var pdis = getPreciseDistance(
      {latitude: platitude, longitude: plongitude},
      {latitude: dlatitude, longitude: dlongitude},
    );

    let d= pdis / 1000 

    setdistance(d)

    calculateprice(d)

console.log( `Precise Distance\n\n${pdis} Meter\nOR\n${pdis / 1000} KM`
);
  
  };

  const setAddress = async ({
		latitude,
		longitude,
		latitudeDelta = 0.0522,
		longitudeDelta = 0.0322,
	}) => {
		try {
			setMapState({
				...mapState,
				region: { ...mapState.region, latitude, longitude },
			});

			mapRef.current.animateToRegion({
				latitude,
				longitude,
				latitudeDelta,
				longitudeDelta,
			});
			// setLatitude(latitude);
			// setlongitude(longitude);
			const { data } = await axios.get(
				`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyAJMmBVJLcJ7u6ieWKXUMsnsrHYrGM19ZU`
			);

			setGeneratedAddress(data.results[0].formatted_address);
		} catch (error) {
			// Toast.show({ text: "Error getting address ", type: "danger" });
			// Alert.alert(error.message);
		}
	};
  const edgepaddingValue = 70
  const edgepadding = {
    top:edgepaddingValue,
    right:edgepaddingValue,
    left:edgepaddingValue,
    bottom:edgepaddingValue,

  }
  const getloation=()=>{
    // alert(platitude+'plong  '+plongitude+' dlat'+dlatitude+'plong '+dlongitude)
    // mapRef.current?.fitToCoordinates([origin ,destination], {edgepadding})
  }
  useEffect(()=>{
    Geocoder.init("AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo"); // use a valid API key

    getloation();
    // requestCameraPermission()


  
    // Geocoder.fallbackToGoogle('AIzaSyC0PyPzbZ1oOzhm74aUjuXNxZcbD3bEhOo');

  },[])

  const onRegionChange=(region)=> {

    // console.log("=="+JSON.stringify(region));
    setplatitude(region.latitude);
    setplongitude(region.longitude);
    setplatitudeDelta(region.latitudeDelta);
    setplongitudeDelta(region.longitudeDelta);
  
  // alert(region.latitude)
    // this.setState({ region });
  }
  const onRegionChangeDropoff=(region)=> {

    // console.log("=="+JSON.stringify(region));
    setdlatitude(region.latitude);
    setdlongitude(region.longitude);
    // setplatitudeDelta(region.latitudeDelta);
    // setplongitudeDelta(region.longitudeDelta);
  
  // alert(region.latitude)
    // this.setState({ region });
  }

  const addressgenerator=(lat , lng)=>{
    Geocoder.from(lat, lng)
		.then(json => {
      // console.log(json.results[0].formatted_address);
        		var addressComponent = json.results[0].formatted_address;

      setpickupaddress(addressComponent)

			// console.log('--'+JSON.stringify(addressComponent));
		})
		.catch(error => console.warn(error));
    // let ret = await Geocoder.geocodePosition({lat, lng})
    // console.log('kkkhkhk');
    // alert(ret)
  }

  const daddressgenerator=(lat , lng)=>{
    Geocoder.from(dlatitude, dlongitude)
		.then(json => {

      // console.log(json.results);
        		var addressComponent = json.results[0].formatted_address;

      setdropoffaddress(addressComponent)

      calculatePreciseDistance()

			// console.log('--'+JSON.stringify(addressComponent));
		})
		.catch(error => console.warn(error));
    // let ret = await Geocoder.geocodePosition({lat, lng})
    // console.log('kkkhkhk');
    // alert(ret)
  }

  const calculateprice = (dis)=> {

    if(vehicletype == '0' ){
      console.log("vheicletype"+"Reefer van");
      
      let d =0;
      d=distance
      if(d==0){
        d=dis
      }
      d=d*(3.59)
      let p = d *(25)
      p  = p/100
      p= p+d
      setdriverprice(d)
      settotalprice(p)
      refRBSheet2.current.close()
        
    }else  if (vehicletype == '1'){
      console.log("vheicletype"+"Dry van");
      let d =0;
      d=distance
      if(d==0){
        d=dis
      }
      d=d*(3.31)
      let p = d *(25)
      p  = p/100
      p= p+d
      setdriverprice(d)
      settotalprice(p)
      refRBSheet2.current.close()

    }else {
      console.log("vheicletype"+"Flatbed van");
      let d =0;
      d=distance
      if(d==0){
        d=dis
      }
      d=d*(3.44)
      let p = d *(25)
      p  = p/100
      p= p+d
      setdriverprice(d)
      settotalprice(p)
      refRBSheet2.current.close()
    }
  }

  const CreateLoadAPI =()=>{

    setspinner(true)

    console.log(platitude, plongitude)

    let value = {};
    value.User_id = AppConstance.Id;

    value.P_Address=pickupaddress;
    value.P_Latitude = platitude;
    value.P_Longitude= plongitude,

    value.D_Address= dropoffaddress
    value.D_Latitude = dlatitude;
    value.D_Longitudes= dlongitude,

    value.Load_Description='none';
    value.Dock_Number=docknumber
    value.Destination= "vdvd";
    value.Vehicle_Type= vtype

    value.Pick_up_Time=pickuptimedate
    value.Drop_of_Time = dropofftimedate;

    value.Pricing='5' 
    value.Driver_Price=driverprice
    value.Total_Price=totalprice
    value.Status="0"

   

    console.log(value);
    // alert(JSON.stringaify(value))
    console.log(value);

    var url =AppUrlCollection.CREATELOAD;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type':  'application/json',
        'Authorization': 'Bearer '+AppConstance.AUTH_KEY,
      },
      body: JSON.stringify(value),
  })
      .then((response) =>  response.json() )
      .then((responseJson) => {
        // navigation.navigate('welcome')
        console.log('login data response',responseJson);
        setspinner(false)
          if(responseJson.j == 'iih'){
            // alert(responseJson.DATA.user.Bank_Info)
            // alert(JSON.stringify(responseJson))
            setspinner(false)
            console.log('login data response',responseJson);
            

            // alert(responseJson.DATA)
            // storeData(responseJson)

        //  loginServiceCall( responseJson , responseJson.user.role, responseJson.user.username, responseJson.user.role_name, responseJson.user.photo)

          }else if(responseJson.status == 422){
            setspinner(false)

            alert(responseJson.errors.password)
          }else if(responseJson.status == 401){
            setspinner(false)

            alert(responseJson.error)
          }
      console.log('login data response',responseJson);
    //   setspinner(false)  
      })
      .catch((error) => {
        setspinner(false)
        alert(error)
          console.warn(error)
      });
      
  }

  const renderContent = () => (
    <View
      style={{
        backgroundColor: 'red',
        padding: 16,
        height: '90%',
      }}
    >
      <Text>Swipe down to close</Text>
    </View>
  );

  const renderHeader = () =>{
    <View style={styles.headerbottom}>
      <View style={styles.panelHeader}>
        <View style={styles.panelHandle} />
      </View>
    </View>
  }

  const sheetRef = React.useRef(null);

  return (
    <SafeAreaView style={styles.container}>
 <Spinner
        visible={spinner}
        textContent={"Loading..."}
        color	={AppColors.Appcolor }
        animation	='fade'
        size='large'
        overlayColor='rgba(0, 0, 0, 0.30)'
         textStyle={{ color: AppColors.Appcolor }}
      />
<RBSheet
        ref={refRBSheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={deviceHeight*0.95}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View style={{height:'100%', paddingHorizontal:'3%'}}>
       
<GooglePlacesAutocomplete
       placeholder={pickupaddress}
       GooglePlacesDetailsQuery={{
         fields: 'geometry',
       }}
       fetchDetails={true}
       styles={{
         textInput:{
           height:'100%',
            
           borderBottomWidth:1.2,borderColor:AppColors.Appcolor,borderRadius:10,
         },
         loader: {
          backgroundColor:'red'
         },
         
        }}
 
        renderLeftButton={()=>(
         <FontAwesome name='circle-o' style={{alignSelf:'center'}} color={dropoffaddress !== 'From' || dropoffaddress !== "" || dropoffaddress != null ? "grey": AppColors.skyblue}  size={15} />
 
           
        )}
       onPress={(data, details = null) => {
         // 'details' is provided when fetchDetails = true
         console.log(data);
         
         console.log(JSON.stringify(details?.geometry?.location));

         setplatitude(details?.geometry?.location.lat)
         setdlongitude(details?.geometry?.location.lng)
        
         setpickupaddress(data.description)

 
       }}
       query={{
         key: GOOGLE_MAPS_APIKEY,
         language: 'en',
       }}
     /> 

     <View style={{height:'10%',bottom:20,justifyContent:'space-around', flexDirection:'row', width:deviceWidth,alignSelf:'center', }}>
       <TouchableOpacity 
        onPress={()=> {refRBSheet.current.close()}}
       style={{height:'80%',borderWidth:0.7,borderRadius:10,borderColor:AppColors.Appcolor,  justifyContent:'center', width:'30%'}}>
       <Text style={{fontWeight:'700', color:AppColors.Appcolor,alignSelf:'center'}}>Close</Text>
       </TouchableOpacity>

       <TouchableOpacity 
       onPress={()=> {refRBSheet.current.close()}}
       style={{height:'80%',borderWidth:0.7,borderRadius:10, borderColor:AppColors.Appcolor, justifyContent:'center', width:'30%'}}>
       <Text style={{fontWeight:'700',color:AppColors.Appcolor, alignSelf:'center'}}>Done</Text>
       </TouchableOpacity>
       </View>
        </View>

      </RBSheet>




      <RBSheet
        ref={refRBSheet2}
        closeOnDragDown={true}
        closeOnPressMask={false}
        height={deviceHeight*0.95}
        customStyles={{
          wrapper: {
            backgroundColor: "transparent"
          },
          draggableIcon: {
            backgroundColor: "#000"
          }
        }}
      >
        <View style={{height:'100%', paddingHorizontal:'3%'}}>
       
<GooglePlacesAutocomplete
       placeholder='To'
       value={dropoffaddress}
       GooglePlacesDetailsQuery={{
         fields: 'geometry',
       }}
       fetchDetails={true}
       styles={{
         textInput:{
           height:'100%',
            
           borderBottomWidth:1.2,borderColor:AppColors.Appcolor,borderRadius:10,
         },
         loader: {
          backgroundColor:'red'
         },
         
        }}
 
        renderLeftButton={()=>(
         <FontAwesome name='circle-o' style={{alignSelf:'center'}} color={dropoffaddress !== 'To' && dropoffaddress.length>0 !== "" || dropoffaddress != null ? "grey": AppColors.skyblue}  size={15} />
 
           
        )}
       onPress={(data, details = null) => {
         // 'details' is provided when fetchDetails = true
         console.log(data);
         
         console.log(JSON.stringify(details?.geometry?.location));

         setdlatitude(details?.geometry?.location.lat)
         setdlongitude(details?.geometry?.location.lng)
        
         setdropoffaddress(data.description)


 
       }}
       query={{
         key: GOOGLE_MAPS_APIKEY,
         language: 'en',
       }}
     /> 

     <View style={{height:'10%',bottom:20,justifyContent:'space-around', flexDirection:'row', width:deviceWidth,alignSelf:'center', }}>
       <TouchableOpacity 
        onPress={()=> {calculatePreciseDistance();}}
       style={{height:'80%',borderWidth:0.7,borderRadius:10,borderColor:AppColors.Appcolor,  justifyContent:'center', width:'30%'}}>
       <Text style={{fontWeight:'700', color:AppColors.Appcolor,alignSelf:'center'}}>Close</Text>
       </TouchableOpacity>

       <TouchableOpacity 
       onPress={()=> { calculatePreciseDistance(); }}
       style={{height:'80%',borderWidth:0.7,borderRadius:10, borderColor:AppColors.Appcolor, justifyContent:'center', width:'30%'}}>
       <Text style={{fontWeight:'700',color:AppColors.Appcolor, alignSelf:'center'}}>Done</Text>
       </TouchableOpacity>
       </View>
        </View>

      </RBSheet>

      

      <Modal  
      animationType="fade"
      visible={pmapmodel}
      transparent={true}
      style={{height:deviceHeight*0.5,marginTop:10, backgroundColor:'green', bottom:0, width:deviceWidth}}
      >
      <View style={{backgroundColor:'red',bottom:0, height:deviceHeight*0.3}}>
<Text>hbdhjfbj</Text>

{/* <View style={{position:'absolute',bottom:'7%', alignSelf:'flex-start', width:deviceWidth, paddingHorizontal:'5%'}}>
        
        <TouchableOpacity 
        onPress={async()=> {  
          addressgenerator(platitude,plongitude)

         setpmapmodel(false)}}
        style={{backgroundColor:AppColors.Appcolor,height:deviceHeight*0.08,justifyContent:'center', borderRadius:25}}>
          <Text style={{color:'white',fontWeight:'600',fontSize:18, alignSelf:'center'}}>Done</Text>
          </TouchableOpacity>
        </View> */}
    </View>

        </Modal>


        <Modal  
      animationType="fade"
      visible={dmapmodel}
      style={{height:deviceHeight, width:deviceWidth}}
      >
      <View style={styles.mapcontainer}>
        
      <MapView
      scrollEnabled={true}
      onRegionChange={onRegionChangeDropoff}

        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        showsUserLocation={true}
       showsMyLocationButton={false}
        initialRegion={{
          latitude: currentloclat,
          longitude: currentloclon,
          latitudeDelta: 0.0622,
          longitudeDelta: 0.0121,
        }}
        
      >
     
      </MapView>
      <View style={{position:'absolute',top:"3%",flexDirection:'row', justifyContent:'space-between',  width:deviceWidth, paddingHorizontal:'4%'}}>
     

        <TextInput
        
        style={{width:'100%',paddingHorizontal:10, height:40,borderWidth:0.8,alignSelf:'center',  borderColor:AppColors.Appcolor, borderRadius:10, backgroundColor:'white'}}
        placeholder='Search here'
        />
 
        </View>
  

<View style={{top:'50%', left:'50%', position:'absolute'}}>
  <Image  style={{height:deviceHeight*0.12, width:deviceWidth*0.12}} source={require('../assets/locationimage3.png')} resizeMode="contain" />
  </View>

<View style={{position:'absolute',bottom:'7%', alignSelf:'flex-start', width:deviceWidth, paddingHorizontal:'5%'}}>
        
        <TouchableOpacity 
        onPress={()=> { daddressgenerator() ,setdmapmodel(false) }}
        style={{backgroundColor:AppColors.Appcolor,height:deviceHeight*0.08,justifyContent:'center', borderRadius:25}}>
          <Text style={{color:'white',fontWeight:'600',fontSize:18, alignSelf:'center'}}>Done</Text>
          </TouchableOpacity>
        </View>
    </View>

        </Modal>

 <DatePicker
        modal
        open={pickuptimeopen}
        date={new Date()}
        mode='datetime'
        onConfirm={(date) => {
          // alert(date)
          setpickuptimedate(date.toString())
          
          console.log(date);
          setpickuptimeopen(false)

        }}
        onCancel={() => {
          setpickuptimeopen(false)
        }}
      />
       <DatePicker
        modal
        open={dropofftimeopen}
        mode='datetime'

        // date={dropofftimedate}
        date={new Date()}

        onConfirm={(date) => {
          setdropofftimeopen(false)
          setdropofftimedate(date.toString())
        }}
        onCancel={() => {
          setdropofftimeopen(false)
          // setOpen(false)
        }}
      />

        <Appbar.Header style={styles.header}>

        <View style={styles.headview}>
          <View style={{justifyContent:"center"}}>
            <Ionicons name='chevron-back' onPress={()=> {navigation.goBack(null)}} color={'white'} style={{alignSelf:'center'}} size={25}/>
            </View>
          <Text style={{color:"white",fontSize:16,alignSelf:'center'}}>Accept</Text>
          <View>
            </View>
        </View>

        </Appbar.Header>

    
      <View style={styles.mapcontainer}>
        
        <MapView
        mapRef
        scrollEnabled={true}
        onMapReady={() => setIsMapReady(true)}
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={styles.map}
          showsUserLocation={true}
         showsMyLocationButton={false}
         initialRegion={{
          latitude: plat,
          longitude: plong,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        // region={{latitude:platitude, 
        //   longitude:plongitude, 
        //   latitudeDelta: 0.0922,
        //   longitudeDelta: 0.0421,}} 
        //  onRegionChangeComplete={async ({
        //   latitude,
        //   longitude,
        //   latitudeDelta,
        //   longitudeDelta,
        // }) => {
        //   await setAddress({
        //     latitude,
        //     longitude,
        //     latitudeDelta,
        //     longitudeDelta,
        //   });
        // }}
        >
  
   

  <MapViewDirections
    origin={{latitude:platitude, longitude:plongitude}}
    destination={{latitude:dlatitude, longitude:dlongitude}}
    apikey={GOOGLE_MAPS_APIKEY}
    strokeWidth={3}
    strokeColor={AppColors.Appcolor}
  />
  
  <Marker 
      coordinate={{latitude:platitude, longitude:plongitude}}

/>

<Marker 
      coordinate={{latitude:dlatitude, longitude:dlongitude}}

/>



        </MapView>
       
    
 
      </View>
      


      <View style={{top:'9%',position:'absolute',alignSelf:'center', height:deviceHeight*0.15, margin:10, paddingVertical:2,backgroundColor:'white',borderColor:AppColors.Appcolor,borderWidth:0, borderRadius:5, flexDirection:'column',   width:'95%', paddingHorizontal:'2%'}}>

   

       <View style={{height:'95%',justifyContent:'center', paddingHorizontal:'1%'}}>

          <View style={{flexDirection:'row',  width:deviceWidth, height:'48%'}}>
          <FontAwesome name='circle-o' style={{alignSelf:'center'}} color={plat == 'From' || plat.length>0 ? "grey": AppColors.skyblue} size={15} />
          <View 
          // onPress={()=> {refRBSheet.current.open()}}
          style={{width:'85%',marginLeft:12, height:'95%',borderBottomWidth:0.4,borderColor:'#CACFD2',}}>
          <Text style={{fontSize:16, textAlignVertical:'center',width:'100%',  height:'100%', textAlign:'left'}}>{pAdd}</Text>
         </View>
          </View>

          <View style={{flexDirection:'row', width:deviceWidth, height:'48%'}}>
          <FontAwesome name='circle-o' style={{alignSelf:'center'}} color={dAdd == 'To' || dAdd.length >0 ? "grey": AppColors.skyblue}  size={15} />
          <View 
          // onPress={()=> {refRBSheet2.current.open()}}
          style={{width:'85%',marginLeft:12, height:'95%',borderColor:'#CACFD2',}}>
          <Text style={{fontSize:16, textAlignVertical:'center',width:'100%',  height:'100%', textAlign:'left'}}>{dAdd}</Text>
         </View>
          </View>

          {/* <View style={{flexDirection:'row', width:deviceWidth, height:'18%'}}>
          <FontAwesome name='dollar' style={{alignSelf:'center'}}  size={15} />
          <TouchableOpacity style={{width:'85%',marginLeft:12, height:'95%',borderBottomWidth:0.4,borderColor:'#CACFD2',}}>
          <Text style={{fontSize:15, textAlignVertical:'center',width:'100%',  height:'100%', textAlign:'left'}}>{totalprice}</Text>
         </TouchableOpacity>
          </View> */}

          {/* <View style={{flexDirection:'row',  width:deviceWidth, height:'18%'}}>
          <MaterialIcons name='text-snippet' style={{alignSelf:'center'}}  size={15} />
          <TouchableOpacity style={{width:'85%',marginLeft:12, height:'95%',borderBottomWidth:0.4,borderColor:'#CACFD2',}}>
          <Text style={{fontSize:15, textAlignVertical:'center',width:'100%',  height:'100%', textAlign:'left'}}>{docknumber}</Text>
         </TouchableOpacity>
          </View>
       */}

         

{/* <TouchableOpacity
style={{width:'95%',alignSelf:'center',borderRadius:400/2,height:'25%',justifyContent:'center', backgroundColor:AppColors.Appcolor}}
onPress={() => CreateLoadAPI()}
>
<Text   
style={{alignSelf:'center',fontSize:17, color:'white'}}>Next</Text>
</TouchableOpacity> */}

</View>
        
       {/* <GooglePlacesAutocomplete
       placeholder='Search'
       GooglePlacesDetailsQuery={{
         fields: 'geometry',
       }}
       fetchDetails={true}
 
       styles={{
         textInput:{
           height:'100%',
           borderWidth:1.2,borderColor:AppColors.Appcolor,borderRadius:10,
         },
         loader: {
          backgroundColor:'red'
         },
         
        }}
 
        renderLeftButton={()=>(
         <TouchableOpacity 
         onPress={()=> {setpmapmodel(false)}} 
         style={{backgroundColor:AppColors.Appcolor,width:'12%',marginTop:0, justifyContent:'center', borderRadius:10,marginRight:5}}>
      <Ionicons   name='md-close-outline'  color={'white'} style={{alignSelf:'center'}} size={25}/>
 
           </TouchableOpacity>
        )}
       onPress={(data, details = null) => {
         // 'details' is provided when fetchDetails = true
         console.log(data);
 
       }}
       query={{
         key: GOOGLE_MAPS_APIKEY,
         language: 'en',
       }}
     />

<GooglePlacesAutocomplete
       placeholder='Search'
       GooglePlacesDetailsQuery={{
         fields: 'geometry',
       }}
       fetchDetails={true}
 
       styles={{
         textInput:{
           height:'100%',
           borderWidth:1.2,borderColor:AppColors.Appcolor,borderRadius:10,
         },
         loader: {
          backgroundColor:'red'
         },
         
        }}
 
        renderLeftButton={()=>(
         <TouchableOpacity 
         onPress={()=> {setpmapmodel(false)}} 
         style={{backgroundColor:AppColors.Appcolor,width:'12%',marginTop:0, justifyContent:'center', borderRadius:10,marginRight:5}}>
      <Ionicons   name='md-close-outline'  color={'white'} style={{alignSelf:'center'}} size={25}/>
 
           </TouchableOpacity>
        )}
       onPress={(data, details = null) => {
         // 'details' is provided when fetchDetails = true
         console.log(data);
 
       }}
       query={{
         key: GOOGLE_MAPS_APIKEY,
         language: 'en',
       }}
     /> */}
        
     
   

{/* <TouchableOpacity 
          onPress={async()=> {  
            addressgenerator(platitude,plongitude)
  
           setpmapmodel(false)}}
          style={{backgroundColor:AppColors.Appcolor,height:deviceHeight*0.08,justifyContent:'center', borderRadius:25}}>
            <Text style={{color:'white',fontWeight:'600',fontSize:18, alignSelf:'center'}}>Create Load</Text>
            </TouchableOpacity> */}
         </View>



         <View style={{bottom:'9%',position:'absolute',alignSelf:'center', height:deviceHeight*0.2, margin:10, paddingVertical:2,backgroundColor:'white',borderColor:AppColors.Appcolor,borderWidth:0, borderRadius:5, flexDirection:'column',   width:'95%', paddingHorizontal:'2%'}}>

   

<View style={{height:'98%',justifyContent:'center', paddingHorizontal:'1%'}}>

<TouchableOpacity style={{width:'100%',marginLeft:12, height:'30%',borderBottomWidth:0.4,borderColor:'#CACFD2',}}>
   <TextInput style={{fontSize:15, textAlignVertical:'center',width:'100%',  height:'100%', textAlign:'left'}} 
   value={weight}
   onChangeText={(text)=> {setweight(text)}}
   placeholder={'Weight'}
   placeholderTextColor={'grey'}
   />
  </TouchableOpacity>

   <View style={{flexDirection:'row', justifyContent:'space-between', width:deviceWidth, height:'35%'}}>
   
   
   <View style={{flexDirection:'row', width:'35%',}}>
   <FontAwesome name='dollar' style={{alignSelf:'center'}}  size={15} />
   <View style={{width:'65%',marginLeft:10, height:'95%',borderBottomWidth:0.4,borderColor:'#CACFD2',}}>
   <Text style={{fontSize:15, textAlignVertical:'center',width:'100%',  height:'100%', textAlign:'left'}}>{totalprice}</Text>
  </View>
  </View>

  <TouchableOpacity style={{width:'65%',marginLeft:12, height:'95%',borderBottomWidth:0.4,borderColor:'#CACFD2',}}>
   <TextInput style={{fontSize:15, textAlignVertical:'center',width:'100%',  height:'100%', textAlign:'left'}} 
   value={docknumber}
   onChangeText={(text)=> {setdocknumber(text)}}
   placeholder={'Dock Number'}
   placeholderTextColor={'grey'}
   />
  </TouchableOpacity>

   </View>

   <View style={{flexDirection:'row',alignSelf:'center',  justifyContent:'space-evenly', width:deviceWidth, height:'35%'}}>
   
   <View style={{flexDirection:'row',width:'45%',}}>
   <FontAwesome name='clock-o' style={{alignSelf:'center'}}  size={15} />
   <TouchableOpacity 
     onPress={()=> {setpickuptimeopen(true)}}
   style={{width:'90%', marginLeft:8, height:'95%',borderBottomWidth:0.4,borderColor:'#CACFD2',}}>
   <Text style={{fontSize:14, textAlignVertical:'center',width:'100%',  height:'100%', textAlign:'left'}}>{pickuptimedate == '' || pickuptimedate== null ? 'Pick Up time':pickuptimedate}</Text>
  </TouchableOpacity>
  </View>

  

  <TouchableOpacity 
  onPress={()=> {setdropofftimeopen(true)}}
  style={{width:'48%',flexDirection:'row', marginLeft:0, height:'95%',borderBottomWidth:0.4,borderColor:'#CACFD2',}}>
  <FontAwesome name='clock-o' style={{alignSelf:'center'}}  size={15} />
   <Text style={{fontSize:15,marginLeft:8, textAlignVertical:'center', width:'85%',  height:'100%', textAlign:'left'}}>{dropofftimedate == '' ||dropofftimedate == null ?'Drop off time': dropofftimedate }</Text>
  </TouchableOpacity>

   </View>

  


</View>

 

<View style={{flexDirection:'row',justifyContent:'space-around', width:'100%'}}>


 <TouchableOpacity 
   onPress={async()=> {  
    //  addressgenerator(platitude,plongitude)
      // CreateLoadAPI()
    
    // setpmapmodel(false)
  }
  }
   style={{backgroundColor:'#F4F6F6' ,width:'40%',  height:deviceHeight*0.08,justifyContent:'center', borderRadius:10}}>
     <Text style={{color:'red',fontWeight:'600',fontSize:18, alignSelf:'center'}}>Decline</Text>
     </TouchableOpacity>

<TouchableOpacity 
   onPress={async()=> {  
    //  addressgenerator(platitude,plongitude)
      // CreateLoadAPI()
    
    // setpmapmodel(false)
  }
  }
   style={{backgroundColor:AppColors.Appcolor , width:'40%', height:deviceHeight*0.08,justifyContent:'center', borderRadius:10}}>
     <Text style={{color:'white',fontWeight:'600',fontSize:18, alignSelf:'center'}}>Accept</Text>
     </TouchableOpacity>


</View>
  </View>
   

{/* <TouchableOpacity
style={styles.brnAccept}
onPress={() => CreateLoadAPI()}
>
<Text   
style={{alignSelf:'center'}}>Create</Text>
</TouchableOpacity> */}

      {/* </ScrollView> */}

</SafeAreaView>
  )
}


  const styles = StyleSheet.create({
    container: {
        flex: 1,
      //   justifyContent: center,
      height:deviceHeight,
      width:deviceWidth,
      },

      mapcontainer: {
        // ...StyleSheet.absoluteFillObject,
        flex:1,
        backgroundColor:'grey',
      
        width: deviceWidth,
        
        alignItems: 'center',
        alignSelf:'center',
        
      },
      map: {
        height:'100%',
        width:'100%',
        alignSelf:'center',

        // ...StyleSheet.absoluteFillObject,
      },
     
    input: {
      height: '100%',
      width:"100%",
      alignSelf:"center",
      paddingHorizontal:15,
      borderWidth: 1,
      borderRadius:15,
      borderColor:'#EFDF79',
      backgroundColor:"white",
      
    },
    header: {
      elevation: 0,
      backgroundColor: 'transparent',
      alignItems: "center",
      justifyContent: "center",
      width:deviceWidth,
      paddingHorizontal:0,
      paddingVertical:0,
    
    },

    headerbottom: {
      backgroundColor: '#FFFFFF',
      shadowColor: '#333333',
      shadowOffset: {width: -1, height: -3},
      shadowRadius: 2,
      shadowOpacity: 0.4,
      // elevation: 5,
      paddingTop: 20,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    panelHeader: {
      alignItems: 'center',
    },
    panelHandle: {
      width: 40,
      height: 8,
      borderRadius: 4,
      backgroundColor: '#00000040',
      marginBottom: 10,
    },
    
    headview:{
      height:'100%',
      width:'100%',
      flexDirection:'row',
      borderBottomRightRadius:15,
      borderBottomLeftRadius:15,
      paddingHorizontal:10,
      justifyContent:'space-between',
      backgroundColor:AppColors.Appcolor
    },
    text:{
        alignSelf:"center"
    }
  });

export default IncomingLoad
