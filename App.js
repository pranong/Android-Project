import React from 'react';
import { Platform, StyleSheet, Text, View, Button } from 'react-native';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Tel from './src/components/Tel'
import Main from './src/components/Main'
import Maps from './src/components/Maps' 
import Test1 from './src/components/Test1';
import Test2 from './src/components/Test2';

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

class aedScreen extends React.Component {
  static navigationOptions = {
    title: 'AED Navigation'
  };
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Maps />
      </View>
    );
  }
}

class mainScreen extends React.Component {
  render() {
    return (
        <Main />
    );
  }
}

class otherScreen extends React.Component {
  render() {
    return (
      <View >
        <Tel />
      </View>
    );
  }
}

class videoScreen extends React.Component {
  static navigationOptions = {
    title: 'Video Calling'
  };
  render() {
    return (
        <Test2 />

    );
  }
}

class testScreen extends React.Component {
  render() {
    return (
      <Test1 />
    );
  }
}

// const mainStack = StackNavigator({
//   Home: { screen: mainScreen },
//   Details: { screen: DetailsScreen },
// });

export default TabNavigator(
  {
    Main: { screen: mainScreen },
    AED_Navigation: { screen: aedScreen },
    Video_Calling: { screen: videoScreen },
    Hotline: { screen: otherScreen },
    Test: { screen: testScreen },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        if (routeName === 'AED_Navigation') {
          iconName = `ios-compass${focused ? '' : '-outline'}`;
        } else if (routeName === 'Main') {
          iconName = `ios-warning${focused ? '' : '-outline'}`;
        } else if (routeName === 'Hotline') {
          iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Test') {
        iconName = `ios-information-circle${focused ? '' : '-outline'}`;
        } else if (routeName === 'Video_Calling') {
          iconName = `ios-videocam${focused ? '' : '-outline'}`;
          }
        return <Ionicons name={iconName} size={25} color={tintColor} />;
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    // tabBarOptions: {
    //   activeTintColor: 'tomato',
    //   inactiveTintColor: 'gray',
    // },
    animationEnabled: true,
    swipeEnabled: false,
  }
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

//----------------------------------------------------------------------

// 'use strict';
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   Dimensions,
//   StyleSheet,
//   Text,
//   TouchableOpacity,
//   View
// } from 'react-native';
// import { RNCamera } from 'react-native-camera';

// export default class App extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <RNCamera
//             ref={ref => {
//               this.camera = ref;
//             }}
//             style = {styles.preview}
//             type={RNCamera.Constants.Type.back}
//             flashMode={RNCamera.Constants.FlashMode.on}
//             permissionDialogTitle={'Permission to use camera'}
//             permissionDialogMessage={'We need your permission to use your camera phone'}
//         />
//         <View style={{flex: 0, flexDirection: 'row', justifyContent: 'center',}}>
//         <TouchableOpacity
//             onPress={this.takePicture.bind(this)}
//             style = {styles.capture}
//         >
//             <Text style={{fontSize: 14}}> SNAP </Text>
//         </TouchableOpacity>
//         </View>
//       </View>
//     );
//   }

//   takePicture = async function() {
//     if (this.camera) {
//       const options = { quality: 0.5, base64: true };
//       const data = await this.camera.takePictureAsync(options)
//       console.log(data.uri);
//     }
//   };
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     flexDirection: 'column',
//     backgroundColor: 'black'
//   },
//   preview: {
//     flex: 1,
//     justifyContent: 'flex-end',
//     alignItems: 'center'
//   },
//   capture: {
//     flex: 0,
//     backgroundColor: '#fff',
//     borderRadius: 5,
//     padding: 15,
//     paddingHorizontal: 20,
//     alignSelf: 'center',
//     margin: 20
//   }
// });

// //Upload
// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View,
//   Button,
//   Image,
//   ActivityIndicator,
//   TouchableOpacity
// } from 'react-native';
// import RNFetchBlob from 'react-native-fetch-blob'
// import ImagePicker from 'react-native-image-crop-picker'
// import firebase from './firebase'

// export default class App extends Component {
//   constructor(props) {
//    super(props)
//    this.state = {
//      loading: false,
//      dp: null
//     }
//   }
//   openPicker(){
//     this.setState({ loading: true })
//     const Blob = RNFetchBlob.polyfill.Blob
//     const fs = RNFetchBlob.fs
//     window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
//     window.Blob = Blob
//     //const { uid } = this.state.user
//     const uid = "12345"
//     ImagePicker.openPicker({
//       width: 300,
//       height: 300,
//       cropping: true,
//       mediaType: 'photo'
//     }).then(image => {

//       const imagePath = image.path

//       let uploadBlob = null

//       const imageRef = firebase.storage().ref(uid).child("dp.jpg")
//       let mime = 'image/jpg'
//       fs.readFile(imagePath, 'base64')
//         .then((data) => {
//           //console.log(data);
//           return Blob.build(data, { type: `${mime};BASE64` })
//       })
//       .then((blob) => {
//           uploadBlob = blob
//           return imageRef.put(blob, { contentType: mime })
//         })
//         .then(() => {
//           uploadBlob.close()
//           return imageRef.getDownloadURL()
//         })
//         .then((url) => {

//           let userData = {}
//           //userData[dpNo] = url
//           //firebase.database().ref('users').child(uid).update({ ...userData})

//           let obj = {}
//           obj["loading"] = false
//           obj["dp"] = url
//           this.setState(obj)

//         })
//         .catch((error) => {
//           console.log(error)
//         })
//     })
//     .catch((error) => {
//       console.log(error)
//     })
//   }
//   render() {
//     const dpr = this.state.dp ? (<TouchableOpacity onPress={ () => this.openPicker() }><Image
//          style={{width: 100, height: 100, margin: 5}}
//          source={{uri: this.state.dp}}
//        /></TouchableOpacity>) : (<Button
//       onPress={ () => this.openPicker() }
//       title={ "Change Picture" }
//     />)

//     const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (<View style={styles.container}>
//       <View style={{flexDirection: "row"}}>
//         { dpr }
//       </View>
//     </View>)

//     return (
//       <View style={styles.container}>
//         { dps }
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });

// // AppRegistry.registerComponent('RNF', () => RNF);