// import React, { Component } from "react";
// import { Dimensions, View, Text, FlatList, ActivityIndicator, ListView, ScrollView, Alert, TouchableOpacity, TouchableHighlight, StyleSheet } from "react-native";
// import { List, ListItem, SearchBar } from "react-native-elements";
// import NavigationBar from 'react-native-navbar';
// import MapView from 'react-native-maps';

// const {width,height}= Dimensions.get('window')

// const SCREEN_HEIGHT = height
// const SCREEN_WIDTH = width
// const ASPECT_RATIO = width/height

// const LATTITUDE_DELTA = 0.0922
// const LONGTITUDE_DELTA = 0.0922 
// // LATTITUDE_DELTA * ASPECT_RATIO

// export default class Map extends Component {
//  constructor(props) {
//    super(props)

//    this.state = {
//      initialPosition:{
//       latitude: 0,
//       longitude: 0,
//       latitudeDelta: 0,
//       longitudeDelta: 0
//      },
//      markerPosition:{
//       latitude: 0,
//       longitude: 0,
//      }
//    }
//  }

//  watchID: ?number = null

//  componentDidMount(){
//    navigator.geolocation.getCurrentPosition((position) => {
//      var lat = parseFloat(position.coords.latitude)
//      var long = parseFloat(position.coords.longitude)

//      var initialRegion = {
//        latitude: lat,
//        longitude: long,
//        latitudeDelta: LATTITUDE_DELTA,
//        longitudeDelta: LONGTITUDE_DELTA
//      }

//      this.setState({initialPosition: initialRegion})
//      this.setState({markerPosition: initialRegion})
//    }, (error) => alert(JSON.stringify(error)),
//    {enableHighAccuracy: true, timeout: 20000, maximunAge: 1000})

//    this.watchID = navigator.geolocation.watchPosition((position) => {
//       var lat = parseFloat(position.coords.latitude)
//       var long = parseFloat(position.coords.longitude)

//       var lastRegion = {
//         latitude: lat,
//         longitude: long,
//         latitudeDelta: LATTITUDE_DELTA,
//        longitudeDelta: LONGTITUDE_DELTA
//       }

//       this.setState({initialPosition: lastRegion})
//       this.setState({markerPosition: lastRegion})
//       console.log(position.coords.latitude + ' ' + position.coords.longitude)
//    })

//  }

//  componentWillUnmount(){
//    navigator.geolocation.clearWatch(this.watchID)
//  }

//   render() {
//     return (
//       <View style={styles.container}>
//         <MapView style={styles.map}
//           Region={this.state.initialPosition}>
//           <MapView.Marker
//             coordinate={this.state.markerPosition}>
//               <View style={styles.radius}>
//               <View style={styles.marker}>
//               </View>
//             </View>
//           </MapView.Marker>
//         </MapView>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   radius: {
//     height: 50,
//     width: 50,
//     borderRadius: 50/2,
//     overflow: 'hidden',
//     backgroundColor: 'rgba(0,122,255,0.1)',
//     borderWidth: 1,
//     borderColor: 'rgba(0,122,255,0.3)',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   marker: {
//     height: 20,
//     width: 20,
//     borderRadius: 20/2,
//     overflow: 'hidden',
//     backgroundColor: '#007AFF',
//     borderWidth: 3,
//     borderColor: 'white',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom :0,
//     right: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     bottom :0,
//     right: 0,
//   },
// });


//Right-------------------------------------------------------------

import React from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import MapView from 'react-native-maps';
import { showLocation } from 'react-native-map-link'

// import * as firebase from 'firebase';

// const firebaseConfig = {
//   apiKey: "AIzaSyBBIohzEGezqgyRer-v_y-oBy4VqJIUjuk",
//   authDomain: "sensorsdatabase.firebaseapp.com",
//   databaseURL: "https://sensorsdatabase.firebaseio.com",
//   projectId: "sensorsdatabase",
//   storageBucket: "sensorsdatabase.appspot.com",
//   messagingSenderId: "716682422710"
// };
// const firebaseApp = firebase.initializeApp(firebaseConfig);

// const rootRef = firebase.database().ref();
// const latlngRef = rootRef.child('Device')

import firebase from '../../firebase'
var latlngRef = firebase.database().ref("Device/");

export default class Maps extends React.Component {
  alert() {
    Alert.alert(
      'Alert',
      'Please select a AED Marker and try again!',
      [
        {text: 'OK', onPress: () => console.log('Ok Pressed')},
        // {text: 'OK', onPress: () => call(args).catch(console.error)},
        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, 
      ],
      { cancelable: false }
    )
  }
  alert2(pass) {
    Alert.alert(
      'Alert',
      'Your Passcode for AED ' + this.state.currentId + ' is ' + pass,
      [
        {text: 'OK', onPress: () => console.log('Ok Pressed')},
        // {text: 'OK', onPress: () => call(args).catch(console.error)},
        // {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, 
      ],
      { cancelable: false }
    )
  }
  constructor(props) {
    super(props);
    // this.state = ({
    //   latlng: [],
    //   loading: false,
    // });
  }
	state = {
		mapRegion: null,
		lastLat: 0,
    lastLong: 0,
    latlng: [],
    loading: false,
    disabled: true,
    currentId: null,
    selectLat: null,
    selectLng: null
	}

	componentDidMount() {
		this.watchID = navigator.geolocation.watchPosition((position) => {
		// Create the object to update this.state.mapRegion through the onRegionChange function
			let region = {
				latitude:       position.coords.latitude,
				longitude:      position.coords.longitude,
				latitudeDelta:  0.00922*1.5,
				longitudeDelta: 0.00421*1.5
			}
			this.onRegionChange(region, region.latitude, region.longitude);
    });
    
    latlngRef.on('value', (childSnapshot) => {
      const latlng = [];
      childSnapshot.forEach((doc) => {
        console.log('All: ' + doc.val());
        console.log('Lat: ' + doc.toJSON().lat);
        latlng.push({
          key: doc.key,
          lat: doc.toJSON().lat,
          lng: doc.toJSON().lng,
          status: doc.toJSON().status,
        });
        this.setState({
          latlng: latlng.sort((a, b) =>{
            return (a.key > b.key);
          }),
          loading: false,
        });
      });
      console.log(this.state.latlng);
    });
	}

	onRegionChange(region, lastLat, lastLong) {
		this.setState({
			mapRegion: region,
			// If there are no new values set the current ones
			lastLat: lastLat || this.state.lastLat,
			lastLong: lastLong || this.state.lastLong
		});
	}

	componentWillUnmount() {
		navigator.geolocation.clearWatch(this.watchID);
  }
  
  idPass(id,lat,lng) {
    this.state.currentId = id
    this.state.disabled = false
    this.state.selectLat = lat
    this.state.selectLng = lng
    console.log('currentId ' + this.state.currentId);
    console.log('disabled ' + this.state.disabled);
  }
  reset() {
    this.state.currentId = null
    this.state.disabled = true
    this.state.selectLat = null
    this.state.selectLng = null
    console.log('currentId ' + this.state.currentId);
    console.log('disabled ' + this.state.disabled);
  }
  getPass() {
    if(this.state.currentId==null){
      this.alert()
    }else{
      let pass = Math.floor(Math.random() * (9999 - 1000)) + 1000;
      //push Firebase Nowwwwwwwww
      latlngRef.child(this.state.currentId).update({password: pass});
      this.alert2(pass)
    }
  }
  checkStatus(stat) {
    if(stat==1){
      return 'Available'
    }else{
      return 'Unavailable'
    }
  }
  goto(){
    if(this.state.currentId==null){
      this.alert()
    }else{
      console.log('selectLat ' + this.state.selectLat);
      console.log('selectLng ' + this.state.selectLng);
      showLocation({
        latitude: this.state.selectLat,
        longitude: this.state.selectLng,  // optional
        app: 'google-maps'  // optionally specify specific app to use
    })
  }
}

	render () {
		return (
      <View style={styles.container}>
			<MapView
				style = { styles.map }
				region = { this.state.mapRegion }
        onPress={() => this.reset()}>

      {this.state.latlng.map(x => (
                  <MapView.Marker
                    onPress={() => this.idPass(x.key,x.lat,x.lng)}
                    title={'AED ' + x.key}
                    key={x.key}
                    description={this.checkStatus(x.status)}
                    coordinate={{
                      latitude: x.lat,
                      longitude: x.lng
                    }}>   
                  </MapView.Marker>
              ))
            }

      <MapView.Marker
            coordinate={{
              latitude: this.state.lastLat,
              longitude: this.state.lastLong,
            }}>
            <View style={styles.radius}>
             <View style={styles.marker}>
               </View>
             </View>
      </MapView.Marker>

      {/* <MapView.Callout>
                      <Text>Click Me!</Text>
      </MapView.Callout> */}

      

      

    </MapView>

      {/* <Button
        title = {'Get Password'}
        onPress={() => console.log('Button Pressed')}
        disabled={this.state.isClicked}>
      </Button> */}
      <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={() => this.getPass()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Get Password</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.goto()}
            style={[styles.bubble, styles.button]}
          >
            <Text>Get Direction</Text>
          </TouchableOpacity>
        </View>
    </View>
    );
	}
}

const styles = StyleSheet.create({
  radius: {
    height: 50,
    width: 50,
    borderRadius: 50/2,
    overflow: 'hidden',
    backgroundColor: 'rgba(0,122,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(0,122,255,0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    height: 20,
    width: 20,
    borderRadius: 20/2,
    overflow: 'hidden',
    backgroundColor: '#007AFF',
    borderWidth: 3,
    borderColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom :0,
    right: 0,
  },
  bubble: {
    flex: 1,
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
  },
  latlng: {
    width: 200,
    alignItems: 'stretch',
  },
  button: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});

  
//----------------------------------------------------------------------------

// const styles = StyleSheet.create ({
// 	mapContainer: {
// 		...StyleSheet.absoluteFillObject,
// 	}
// })


// import React from 'react';
// import { StyleSheet, View, Text } from 'react-native';
// import MapView from 'react-native-maps';

// export default class Maps extends React.Component {
// 	render() {
//     return (
//       <MapView
//         style={ styles.map }
//         initialRegion={{
//           latitude: 37.78825,
//           longitude: -122.4324,
//           latitudeDelta: 0.0922,
//           longitudeDelta: 0.0421,
//         }}
//       />
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     justifyContent: 'flex-end',
//     alignItems: 'center',
//   },
//   map: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//   },
// });

// ----------------------------------

// import React from 'react';
// import {
//   Alert,
//   Platform,
//   StyleSheet
// } from 'react-native';
// import MapView from 'react-native-maps'

// const LATITUDE_DELTA = 0.01;
// const LONGITUDE_DELTA = 0.01;

// const initialRegion = {
//   latitude: -37.78825,
//   longitude: -122.4324,
//   latitudeDelta: 0.0922,
//   longitudeDelta: 0.0421,
// }

// class Maps extends React.Component {

//   map = null;

//   state = {
//     region: {
//       latitude: -37.78825,
//       longitude: -122.4324,
//       latitudeDelta: 0.0922,
//       longitudeDelta: 0.0421,
//     },
//     ready: true,
//     filteredMarkers: []
//   };

//   setRegion(region) {
//     if(this.state.ready) {
//       setTimeout(() => this.map.mapview.animateToRegion(region), 10);
//     }
//     //this.setState({ region });
//   }

//   componentDidMount() {
//     console.log('Component did mount');
//     this.getCurrentPosition();
//   }

//   getCurrentPosition() {
//     try {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           const region = {
//             latitude: position.coords.latitude,
//             longitude: position.coords.longitude,
//             latitudeDelta: LATITUDE_DELTA,
//             longitudeDelta: LONGITUDE_DELTA,
//           };
//           this.setRegion(region);
//         },
//         (error) => {
//           //TODO: better design
//           switch (error.code) {
//             case 1:
//               if (Platform.OS === "ios") {
//                 Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Privacidad - Localización");
//               } else {
//                 Alert.alert("", "Para ubicar tu locación habilita permiso para la aplicación en Ajustes - Apps - ExampleApp - Localización");
//               }
//               break;
//             default:
//               Alert.alert("", "Error al detectar tu locación");
//           }
//         }
//       );
//     } catch(e) {
//       alert(e.message || "");
//     }
//   };

//   onMapReady = (e) => {
//     if(!this.state.ready) {
//       this.setState({ready: true});
//     }
//   };

//   onRegionChange = (region) => {
//     console.log('onRegionChange', region);
//   };

//   onRegionChangeComplete = (region) => {
//     console.log('onRegionChangeComplete', region);
//   };

//   render() {

//     const { region } = this.state;
//     const { children, renderMarker, markers } = this.props;

//     return (
//       <MapView style={ styles.map }
//         showsUserLocation
//         ref={ map => { this.map = map }}
//         data={markers}
//         initialRegion={initialRegion}
//         renderMarker={renderMarker}
//         onMapReady={this.onMapReady}
//         showsMyLocationButton={false}
//         onRegionChange={this.onRegionChange}
//         onRegionChangeComplete={this.onRegionChangeComplete}
//         style={StyleSheet.absoluteFill}
//         textStyle={{ color: '#bc8b00' }}
//         containerStyle={{backgroundColor: 'white', borderColor: '#BC8B00'}}>

//         <MapView.Marker
//             coordinate={renderMarker}>
//         </MapView.Marker>

//       </MapView>
//     );
//   }
// }

// export default Maps;

//-----------------------------------------------------------------------
