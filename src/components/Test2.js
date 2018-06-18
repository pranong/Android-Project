import Test2 from './Test2'
import React, { Component } from "react";
import { AppRegistry, TextInput, View, Text, FlatList, ActivityIndicator, ListView, ScrollView, Alert, TouchableOpacity, TouchableHighlight, Image, StyleSheet, Button } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import NavigationBar from 'react-native-navbar';
import Ionicons from 'react-native-vector-icons/Ionicons';
var TimerMixin = require('react-timer-mixin');
import  Camera  from 'react-native-camera';
import { TabNavigator, TabBarBottom, StackNavigator } from 'react-navigation';
import RNFetchBlob from 'react-native-fetch-blob'
import ImagePicker from 'react-native-image-crop-picker'
import ModalSelector from 'react-native-modal-selector';
import firebase from '../../firebase'
var eventRef = firebase.database().ref("Event/");

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'Main'
  };

  alert(n,i) {
    Alert.alert(
      'Alert',
      'Lat: '+ n+', '+'Long: '+i,
      [
        {text: 'OK', onPress: () => console.log('OK Pressed')},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, 
      ],
      { cancelable: false }
    )
  }

  constructor(props) {
    super(props);
    this.state = {
      mapRegion: null,
      lastLat: 0,
      lastLong: 0,
      latlng: [],
      loading: false,
      error: null,
    }
  }

  
	componentDidMount() {
    TimerMixin.setInterval( () => { 
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.setState({
            lastLat: position.coords.latitude,
            lastLong: position.coords.longitude,
            error: null,
          });
        },
        (error) => this.setState({ error: error.message }),
        { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
      );
   }, 3000);
    this.watchId = navigator.geolocation.watchPosition(
      (position) => {
        this.setState({
          lastLat: position.coords.latitude,
          lastLong: position.coords.longitude,
          error: null,
        });
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000, distanceFilter: 10 },
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchId);
  }


  sendInfo() {
    // navigator.geolocation.getCurrentPosition(
    //   (position) => {
    //     this.setState({
    //       lastLat: position.coords.latitude,
    //       lastLong: position.coords.longitude,
    //       error: null,
    //     });
    //   },
    //   (error) => this.setState({ error: error.message }),
    //   { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    // );
    if(this.state.lastLat == 0 || this.state.lastLong == 0){
      Alert.alert('Generating the location. Please Try again later.');
    }else{
      var date = new Date().getDate();
      var month = new Date().getMonth() + 1;
      var year = new Date().getFullYear();

      var hour = new Date().getHours(); 
      var min = new Date().getMinutes();
      var sec = new Date().getSeconds();

      var fullDate = date + '/' + month + '/' + year;
      var fullTime = hour + ':' + min + ':' + sec;

      // var name = snapshot.name();

      var ref = eventRef.push({date: fullDate, time: fullTime, lat: this.state.lastLat, lng: this.state.lastLong});
      // var uid = ref.name();
      var n = ref.toString().lastIndexOf("Event");
      var num = (n + 6);
      var uid = ref.toString().substring(num);
      // var uid = '123698745'
      console.log('Inref : ' + uid);
      // Alert.alert(uid + ' ' + fullDate + '.....' + fullTime + '.....' + this.state.lastLat + ', ' + this.state.lastLong);
      this.props.navigation.navigate('Second', uid)
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.logoContainer}>
          <Image 
          style={styles.logo}
          source={require('../button.png')} />
          <TouchableOpacity
          onPress={() => this.sendInfo()}
          disabled={this.state.lastLat == 0 ? true : false}
          style={styles.buttonContainer}>
            <Text style={styles.button}>
              <Ionicons
              name='ios-paper-plane'
              size={35}
              color='white'
            />
           &nbsp;&nbsp;&nbsp;แจ้งเหตุฉุกเฉิน</Text>
          </TouchableOpacity>
          <Text>Latitude: {this.state.lastLat}</Text>
        <Text>Longitude: {this.state.lastLong}</Text>
        {/* {this.state.error ? <Text>Error: {this.state.error}</Text> : null} */}
        </View>
      </View>
    );
  }
}

class secondScreen extends React.Component {
  static navigationOptions = {
    title: 'Take a Picture'
  };
  takePicture() {
    const options = {}
    this.camera.capture({metadata: options}).then((data) => {
      console.log(data)
    }).catch((error) => {
      console.log(error)
    })
  }
  // takePicture = async function() {
  //   if (this.camera) {
  //     const options = { quality: 0.5, base64: true };
  //     const data = await this.camera.takePictureAsync(options)
  //     console.log(data.uri);
  //   }
  // };
  render() {
    return (
      <View style={styles.container2}>
        <Camera
          ref={(cam) => {
            this.camera = cam
          }}
          style={styles.view}
          aspect={Camera.constants.Aspect.fill}>
            <View style={styles.buttonContainer2}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Third', this.props.navigation.state.params)}
                style={[styles.bubble, styles.button2]}
              >
                <Text>Next</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={this.takePicture.bind(this)}
                style={[styles.bubble, styles.button2]}
              >
                <Text>Capture</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                onPress={console.log(this.props.navigation)}
                style={[styles.bubble, styles.button2]}
              >
                <Text>log</Text>
              </TouchableOpacity>
            </View>
        </Camera>
      </View>
    );
  }
}

class thirdScreen extends React.Component {
  static navigationOptions = {
    title: 'Upload Image'
  };
  constructor(props) {
    super(props)
    this.state = {
      loading: false,
      dp: null,
      noImg: 'http://sanjivanihospitalsirsa.com/wp-content/uploads/2017/03/noimage.gif'
     }
   }
   openPicker(){
     this.setState({ loading: true })
     const Blob = RNFetchBlob.polyfill.Blob
     const fs = RNFetchBlob.fs
     window.XMLHttpRequest = RNFetchBlob.polyfill.XMLHttpRequest
     window.Blob = Blob
     //const { uid } = this.state.user
     const uid = this.props.navigation.state.params
     ImagePicker.openPicker({
       width: 300,
       height: 300,
       cropping: true,
       mediaType: 'photo'
     }).then(image => {
 
       const imagePath = image.path
 
       let uploadBlob = null
 
       let imgId = Math.floor(Math.random() * (99999 - 10000)) + 10000;
 
       const imageRef = firebase.storage().ref(uid).child(imgId + ".jpg")
       let mime = 'image/jpg'
       fs.readFile(imagePath, 'base64')
         .then((data) => {
           //console.log(data);
           return Blob.build(data, { type: `${mime};BASE64` })
       })
       .then((blob) => {
           uploadBlob = blob
           return imageRef.put(blob, { contentType: mime })
         })
         .then(() => {
           uploadBlob.close()
           return imageRef.getDownloadURL()
         })
         .then((url) => {
 
           let userData = {}
           //userData[dpNo] = url
           //firebase.database().ref('users').child(uid).update({ ...userData})
 
           let obj = {}
           obj["loading"] = false
           obj["dp"] = url
           this.setState(obj)
           eventRef.child(uid).child("img").push({url: url});
 
         })
         .catch((error) => {
           console.log(error)
         })
     })
     .catch((error) => {
       console.log(error)
     })
   }
   render() {
     const dpr = this.state.dp ? 
        (<TouchableOpacity 
         onPress={ () => this.openPicker() }>
           <Image
           style={{width: 100, height: 100, margin: 5}}
           source={{uri: this.state.dp}}/>
         </TouchableOpacity>
         ) : (<TouchableOpacity 
          onPress={ () => this.openPicker() }>
            <Image
            style={{width: 100, height: 100, margin: 5}}
            source={{uri: this.state.noImg}}/>
          </TouchableOpacity>)
        
 
     const dps = this.state.loading ? <ActivityIndicator animating={this.state.loading} /> : (<View style={styles.container}>
       <View style={{flexDirection: "row"}}>
         { dpr }
         
       </View>
     </View>)
 
     return (
       <View style={styles.container}>
         { dps }
         <View style={styles.buttonContainer2}>
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate('Fourth', this.props.navigation.state.params)}
                style={[styles.bubble, styles.button2]}
              >
                <Text>Next</Text>
              </TouchableOpacity>
              <Button
           onPress={ () => this.openPicker() }
           title={ "openPicker" }/>
            </View>
       </View>
     );
   }
}

class fourthScreen extends React.Component {
  static navigationOptions = {
    title: 'Details'
  };
  constructor(props) {
    super(props)
    this.state = {
      amount: 'null',
      location: 'null',
      detail: 'null',
      type: 'เลือกประเภทอุบัติเหตุ',
     }
   }

  sendDetail(){
    const uid = this.props.navigation.state.params
    eventRef.child(uid).update({
      amount: this.state.amount,
      location: this.state.location,
      detail: this.state.detail,
      type: this.state.type,
     });
    this.props.navigation.navigate('Thx')
  }

  render() {
    let index = 0;
        const data = [
            { key: index++, section: true, label: 'อุบัติเหตุ' },
            { key: index++, label: 'อุบัติเหตุจากไฟฟ้า' },
            { key: index++, label: 'อุบัติเหตุจากที่สูง' },
            { key: index++, label: 'อุบัติเหตุจากสารเคมี' },
            { key: index++, label: 'อุบัติเหตุจากยานพาหนะ' },
            { key: index++, label: 'อุบัติเหตุจากเครื่องจักร' },
            { key: index++, section: true, label: 'อุบัติภัย' },
            { key: index++, label: 'อุบัติภัยจากอัคคีภัย' },
            { key: index++, label: 'อุบัติภัยในการจราจรทางบก' },
            { key: index++, label: 'อุบัติภัยในการจราจรทางน้ำ' },
            { key: index++, label: 'อื่นๆ' },
        ];

    return (
      <View style={styles.containers}>
        <View style={styles.inputcontainer}>
          <View style={{alignItems: 'center'}}>
            <Text style={{marginBottom: 5, fontSize: 20}}>กรุณากรอกข้อมูลเบื้องต้น</Text>
            <Text style={{marginBottom: 25, fontSize: 20}}>ของผู้ได้รับบาดเจ็บ</Text>
          </View>
          <ModalSelector
            style={{height: 40, backgroundColor: 'rgba(180,180,180,0.2)', marginBottom: 10, paddingHorizontal: 10, borderRadius: 10}}
            data={data}
            initValue="Select something yummy!"
            onChange={(option)=>{ this.setState({type:option.label})}}>    
            <TextInput
              style={{color: '#000000'}}
              editable={false}
              placeholder="โปรดเลือกอุบัติเหตุเบื้องต้น"
              value={this.state.type} />         
          </ModalSelector>
          <TextInput placeholder="รายละเอียด (ถ้ามี)" 
            multiline={true}
            numberOfLines={4}
            style={styles.input} returnKeyType="next" 
            ref={(input) => this.fourthInput = input}
            onChangeText={(text) => this.setState({detail: text})}/>
          <TextInput placeholder="จำนวนผู้ได้รับบาดเจ็บ" 
            style={styles.input}
            keyboardType='numeric'
            returnKeyType="next" 
            onSubmitEditing={() => this.secondInput.focus()} 
            ref={(input) => this.firstInput = input}
            onChangeText={(text) => this.setState({amount: text})}/>
          <TextInput placeholder="สถานที่เกิดเหตุ (ถ้ามี)" 
            style={styles.input} returnKeyType="next" 
            onSubmitEditing={() => this.fourthInput.focus()} 
            ref={(input) => this.thirdInput = input}
            onChangeText={(text) => this.setState({location: text})}/>
          <TouchableOpacity style={styles.buttonContainer} onPress={() => this.sendDetail()}>
          <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

class thankScreen extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'null',
      surname: 'null',
      age: 'null',
      location: 'null',
      detail: 'null',
      type: 'null',
     }
   }

  render() {
    return (
      <View style={styles.container}>
        <Text>Reporting Successfully !!</Text>
      </View>
    );
  }
}


export default StackNavigator(
  { 
    Main: { screen: MainScreen },
    Second: { screen: secondScreen },
    Third: { screen: thirdScreen },
    Fourth: { screen: fourthScreen },
    Thx: { screen: thankScreen },
  })
  

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%'
  },
  containers: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%'
  },
  input: {
    height: 40,
    backgroundColor: 'rgba(180,180,180,0.2)',
    marginBottom: 10,
    color: '#000000',
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  inputcontainer: {
    padding: 20,
  },
  buttonContainer: {
    // fontSize: 20,
    // textAlign: 'center',
    // margin: 10,
    // color: 'white',
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: '#FFFFFF',
    fontWeight: '700'
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    // margin: 10,
    color: 'white',
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    // fontSize: 20,
    // textAlign: 'center',
    // margin: 10,
    // color: 'white',
    backgroundColor: '#2980b9',
    paddingVertical: 15,
    borderRadius: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },    
  logo: {
    height: 200,
    width: 200,
  },
  logoContent: {
    justifyContent: 'center',
    flexGrow: 1,
    alignItems: 'center',
  },
  logocontainer: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  container2: {
    flex: 1,
    flexDirection: 'row'
  },
  view: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: 'steelblue',
    borderRadius: 10,
    color: 'red',
    padding: 15,
    margin: 45
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
  button2: {
    width: 80,
    paddingHorizontal: 12,
    alignItems: 'center',
    marginHorizontal: 10,
  },
  buttonContainer2: {
    flexDirection: 'row',
    marginVertical: 20,
    backgroundColor: 'transparent',
  },
});
