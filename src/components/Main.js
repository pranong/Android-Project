'use strict';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
  TextInput,
  ListView,
  Platform,
  Image,
  Picker,
  Dimensions,
} from 'react-native';

import io from 'socket.io-client';


const socket = io.connect('http://192.168.1.18:4443/', {transports: ['websocket']});
// const socket = io.connect('https://react-native-webrtc.herokuapp.com', {transports: ['websocket']});

import {
  RTCPeerConnection,
  RTCMediaStream,
  RTCIceCandidate,
  RTCSessionDescription,
  RTCView,
  MediaStreamTrack,
  getUserMedia,
} from 'react-native-webrtc';

const configuration = {"iceServers": [{"url": "stun:stun.l.google.com:19302"}]};

const pcPeers = {};
let localStream;

function getLocalStream(isFront, callback) {

  let videoSourceId;

  // on android, you don't have to specify sourceId manually, just use facingMode
  // uncomment it if you want to specify
  if (Platform.OS === 'ios') {
    MediaStreamTrack.getSources(sourceInfos => {
      console.log("sourceInfos: ", sourceInfos);

      for (const i = 0; i < sourceInfos.length; i++) {
        const sourceInfo = sourceInfos[i];
        if(sourceInfo.kind == "video" && sourceInfo.facing == (isFront ? "front" : "back")) {
          videoSourceId = sourceInfo.id;
        }
      }
    });
  }
  getUserMedia({
    audio: true,
    video: {
      mandatory: {
        minWidth: 640, // Provide your own width, height and frame rate here
        minHeight: 360,
        minFrameRate: 30,
      },
      facingMode: (isFront ? "user" : "environment"),
      optional: (videoSourceId ? [{sourceId: videoSourceId}] : []),
    }
  }, function (stream) {
    console.log('getUserMedia success', stream);
    callback(stream);
  }, logError);
}

function join(roomID) {
  socket.emit('join', roomID, function(socketIds){
    console.log('join', socketIds);
    for (const i in socketIds) {
      const socketId = socketIds[i];
      createPC(socketId, true);
    }
  });
}

function createPC(socketId, isOffer) {
  const pc = new RTCPeerConnection(configuration);
  pcPeers[socketId] = pc;

  pc.onicecandidate = function (event) {
    console.log('onicecandidate', event.candidate);
    if (event.candidate) {
      socket.emit('exchange', {'to': socketId, 'candidate': event.candidate });
    }
  };

  function createOffer() {
    pc.createOffer(function(desc) {
      console.log('createOffer', desc);
      pc.setLocalDescription(desc, function () {
        console.log('setLocalDescription', pc.localDescription);
        socket.emit('exchange', {'to': socketId, 'sdp': pc.localDescription });
      }, logError);
    }, logError);
  }

  pc.onnegotiationneeded = function () {
    console.log('onnegotiationneeded');
    if (isOffer) {
      createOffer();
    }
  }

  pc.oniceconnectionstatechange = function(event) {
    console.log('oniceconnectionstatechange', event.target.iceConnectionState);
    if (event.target.iceConnectionState === 'completed') {
      setTimeout(() => {
        getStats();
      }, 1000);
    }
    if (event.target.iceConnectionState === 'connected') {
      createDataChannel();
    }
  };
  pc.onsignalingstatechange = function(event) {
    console.log('onsignalingstatechange', event.target.signalingState);
  };

  pc.onaddstream = function (event) {
    console.log('onaddstream', event.stream);
    container.setState({info: 'One peer join!'});

    const remoteList = container.state.remoteList;
    remoteList[socketId] = event.stream.toURL();
    container.setState({ remoteList: remoteList });
  };
  pc.onremovestream = function (event) {
    console.log('onremovestream', event.stream);
  };

  pc.addStream(localStream);
  function createDataChannel() {
    if (pc.textDataChannel) {
      return;
    }
    const dataChannel = pc.createDataChannel("text");

    dataChannel.onerror = function (error) {
      console.log("dataChannel.onerror", error);
    };

    dataChannel.onmessage = function (event) {
      console.log("dataChannel.onmessage:", event.data);
      container.receiveTextData({user: socketId, message: event.data});
    };

    dataChannel.onopen = function () {
      console.log('dataChannel.onopen');
      container.setState({textRoomConnected: true});
    };

    dataChannel.onclose = function () {
      console.log("dataChannel.onclose");
    };

    pc.textDataChannel = dataChannel;
  }
  return pc;
}

function exchange(data) {
  const fromId = data.from;
  let pc;
  if (fromId in pcPeers) {
    pc = pcPeers[fromId];
  } else {
    pc = createPC(fromId, false);
  }

  if (data.sdp) {
    console.log('exchange sdp', data);
    pc.setRemoteDescription(new RTCSessionDescription(data.sdp), function () {
      if (pc.remoteDescription.type == "offer")
        pc.createAnswer(function(desc) {
          console.log('createAnswer', desc);
          pc.setLocalDescription(desc, function () {
            console.log('setLocalDescription', pc.localDescription);
            socket.emit('exchange', {'to': fromId, 'sdp': pc.localDescription });
          }, logError);
        }, logError);
    }, logError);
  } else {
    console.log('exchange candidate', data);
    pc.addIceCandidate(new RTCIceCandidate(data.candidate));
  }
}

function leave(socketId) {
  console.log('leave', socketId);
  const pc = pcPeers[socketId];
  const viewIndex = pc.viewIndex;
  pc.close();
  delete pcPeers[socketId];

  const remoteList = container.state.remoteList;
  delete remoteList[socketId]
  container.setState({ remoteList: remoteList });
  container.setState({info: 'One peer leave!'});
}

socket.on('exchange', function(data){
  exchange(data);
});
socket.on('leave', function(socketId){
  leave(socketId);
});

socket.on('connect', function(data) {
  console.log('connect');
  getLocalStream(true, function(stream) {
    localStream = stream;
    container.setState({selfViewSrc: stream.toURL()});
    container.setState({status: 'ready', info: 'Please Login'});
  });
});

function logError(error) {
  console.log("logError", error);
}

function mapHash(hash, func) {
  const array = [];
  for (const key in hash) {
    const obj = hash[key];
    array.push(func(obj, key));
  }
  return array;
}

function getStats() {
  const pc = pcPeers[Object.keys(pcPeers)[0]];
  if (pc.getRemoteStreams()[0] && pc.getRemoteStreams()[0].getAudioTracks()[0]) {
    const track = pc.getRemoteStreams()[0].getAudioTracks()[0];
    console.log('track', track);
    pc.getStats(track, function(report) {
      console.log('getStats report', report);
    }, logError);
  }
}

socket.on('message', function(message){
  var data = message;
  switch(data.type) {
       case "login":
              onLogin(data);
              break;
      case "answer":
            console.log("getting called");
              onAnswer(data);
              break;
      case "call_response":
              onResponse(data);
            break;
      default:
          break;
  }
})

function onLogin(data){
  if (data.success === false) {
     _this.setState({ message: "oops...try a different username" })
 } else {
     //var loginContainer = document.getElementById('loginContainer');
     //loginContainer.parentElement.removeChild(loginContainer);
     var username = data.username;
     var socketid = data.socketid;
     console.log("Login Successfull");
     console.log("logged in as :" + username + ", " + socketid);
     console.log(data.userlist);
    //  console.log(data.userlist);
    //  let toArray = _.keys(data.userlist);
    //  const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    //  _this.setState({ currScreen: 'userList', dataSource: ds.cloneWithRows(toArray) })
  }
}

function onAnswer(data){
  if(busy == false){
      busy = true
      incallwith = data.callername
      //var res = confirm(data.callername+" is calling you");
      Alert.alert(
        'Incoming Call',
        data.callername+" is calling you",
        [
          {text: 'Cancel', onPress: () => callReject(data), style: 'cancel'},
          {text: 'OK', onPress: () => callAccept(data) },
        ],
        { cancelable: false }
      )

       }else{
           console.log("call busy");
           //this.setState({ callResponse: "Call accepted by :"+ data.responsefrom })
           socket.send({
                  type: "call_busy",
                  callername: data.callername,
                  from: username
           })

       }
}

let container;

export default class Test2 extends React.Component {
  constructor(props) {
    super(props);
    console.ignoredYellowBox = ['Setting a timer', 'Remote debugger'];
    // console.ignoredYellowBox = ['Remote debugger'];
    this.state = {
      info: 'Initializing',
      status: 'init',
      roomID: 'PranongPunkrawk',
      isFront: true,
      selfViewSrc: null,
      remoteList: {},
      textRoomConnected: false,
      textRoomData: [],
      textRoomValue: '',
      username: '',
      call: 'PranongPunkrawk'
    };
  }
  
  onPressLogin(){
    let username = this.state.username
    if(username == ""){
      this.setState({ info: "Please enter Username" })
    }else{
        socket.send({
              type: "login",
              name: username
                 })
    }
  }
  componentDidMount() {
    container = this;
  }
  _press(event) {
    this.refs.roomID.blur();
    this.setState({status: 'connect', info: 'Connecting'});
    console.log("Pressed status:" + this.state.status + " Info: " + this.state.info)
    // socket.send({
    //   type: "call_user",
    //   name: this.state.username,
    //   callername: this.state.call
    // })
    join(this.state.call);
  }
  _switchVideoType() {
    const isFront = !this.state.isFront;
    this.setState({isFront});
    getLocalStream(isFront, function(stream) {
      if (localStream) {
        for (const id in pcPeers) {
          const pc = pcPeers[id];
          pc && pc.removeStream(localStream);
        }
        localStream.release();
      }
      localStream = stream;
      container.setState({selfViewSrc: stream.toURL()});

      for (const id in pcPeers) {
        const pc = pcPeers[id];
        pc && pc.addStream(localStream);
      }
    });
  }
  callUser(){
    socket.send({
     type: "call_user",
     name: "my name",
     callername: "json"
   })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          {this.state.info}
        </Text>
        {this.state.textRoomConnected}
        <View style={{flexDirection: 'row'}}>
        </View>
        { this.state.status == 'ready' ?
          (
            <View>
              <Text>Input Username</Text>
              <TextInput
              ref='user'
              autoCorrect={false}
              style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
              onChangeText={(text) => this.setState({username: text})}
              value={this.state.username}/>
                <TouchableHighlight
                  style={{borderWidth: 1, borderColor: 'black'}}
                  onPress={() => this.onPressLogin() }>
                    <Text>Login</Text>
                  </TouchableHighlight>
                <View>
                  <Picker
                    selectedValue={this.state.call}
                    style={{ height: 50, width: 250 }}
                    onValueChange={(itemValue, itemIndex) => this.setState({call: itemValue})}>
                    <Picker.Item label="Dr. Nuttapat Panong" value="PranongPunkrawk" />
                    <Picker.Item label="Doctor B" value="abc" />
                    <Picker.Item label="Doctor C" value="Doctor C" />
                    <Picker.Item label="Doctor D" value="Doctor D" />
                  </Picker>
                  <TextInput
                    ref='roomID'
                    autoCorrect={false}
                    style={{width: 200, height: 40, borderColor: 'gray', borderWidth: 1}}
                    onChangeText={(text) => this.setState({roomID: text})}
                    value={this.state.roomID}
                  />
                  <TouchableHighlight
                    style={{borderWidth: 1, borderColor: 'black'}}
                    onPress={this._press.bind(this)}>
                    <Text>Enter room</Text>
                  </TouchableHighlight>
                </View>
            </View> 
          ) : null
        }
        <TouchableOpacity onPress={this._switchVideoType.bind(this)}>
            <Image 
              style={{width: 50, height: 50, alignSelf: 'flex-end', opacity: .5}}
              source={{uri: 'https://cdn.icon-icons.com/icons2/510/PNG/512/ios7-reverse-camera_icon-icons.com_50174.png'}} 
            />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={this._switchVideoType.bind(this)}>
            <Image 
              style={{width: 500, height: 500, position: "absolute", justifyContent: 'center', alignItems: 'center', opacity: .5}}
              source={{uri: 'https://cdn.icon-icons.com/icons2/510/PNG/512/ios7-reverse-camera_icon-icons.com_50174.png'}} 
            />
        </TouchableOpacity> */}
        
            <View
              style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.optionButton}
                // onPress={this._onEndButtonPress}
                >
                <Image 
                  style={{width: 65, height: 65, opacity: 1}}
                  source={{uri: 'https://cdn2.iconfinder.com/data/icons/weby-flat-vol-2/512/weby-flat_call_end-call_drop-128.png'}} 
                />
              </TouchableOpacity>
            </View>
            <RTCView streamURL={this.state.selfViewSrc} style={styles.selfView}/>
        {
          mapHash(this.state.remoteList, function(remote, index) {
            return <RTCView key={index} streamURL={remote} style={styles.remoteView}/>
          })
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  selfView: {
    width: 200,
    height: 150,
    position: "absolute",
    bottom: 10,
    right: -50
  },
  remoteView: {
    // width: Dimensions.get('window').width,
    height: 300,
  },
  container: {
    ...StyleSheet.absoluteFillObject,
    alignSelf: 'flex-end',
    marginTop: -5,
    position: 'absolute', // add if dont work with above
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  listViewContainer: {
    height: 150,
  },
  optionsContainer: {
    position: "absolute",
    left: 0,
    bottom: 0,
    right: 0,
    height: 100,
    flexDirection: "row",
    justifyContent: 'center',
    alignItems: "center"
  },
  optionButton: {
    width: 60,
    height: 60,
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 100 / 2,
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: "center"
  }
});


// AppRegistry.registerComponent('RCTWebRTCDemo', () => RCTWebRTCDemo);
