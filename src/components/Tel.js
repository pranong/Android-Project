import React, { Component } from "react";
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ListView, ScrollView, Alert, TouchableOpacity, TouchableHighlight } from "react-native";
import { List, ListItem, SearchBar } from "react-native-elements";
import NavigationBar from 'react-native-navbar';
import call from 'react-native-phone-call';
import Communications from 'react-native-communications';

const list = [
  {
    name: 'แจ้งเหตุด่วนเหตุร้าย',
    avatar_url: 'http://3.bp.blogspot.com/_tF_DyjQ-CPA/TEPkblx7IJI/AAAAAAAAClE/PXDWnhX9fig/s1600/_1_~1.PNG',
    subtitle: '0860960850'
  },
  {
    name: 'แจ้งเหตุเพลิงไหม้',
    avatar_url: 'https://images.vexels.com/media/users/3/137264/isolated/preview/e3dd503272edc83a4bd853800a6048ff-fire-cartoon-contour-silhouette-by-vexels.png',
    subtitle: '199'
  },
  {
    name: 'กองปราบปราม',
    avatar_url: 'https://s.isanook.com/ns/0/rp/r/w0h0/ya0xa0m1w0/aHR0cDovL3d3dy5pbm5uZXdzLmNvLnRoL2ltYWdlcy9uZXdzLzIwMTIvNS80MjM5NzQtMDEuanBn.jpg' ,
    subtitle: '1195'
  },
  {
    name: 'ศูนย์ควบคุมจราจร',
    avatar_url: 'https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-9/23518913_737613203094179_4076736504550291840_n.jpg?oh=ca0391dbcd8b7d2d6d92e8ce87c8d680&oe=5B01DAC3',
    subtitle: '1197'
  },
  {
    name: 'แจ้งรถหาย',
    avatar_url: 'https://lh3.googleusercontent.com/OjZOv1JUrVcq_9jvb-S7OABxU4mguWMxifbdc7LMmLjD-CmFBufCH_ySLoEqv330pA=w300-rw',
    subtitle: '1192'
  },
  {
    name: 'เหตุด่วนทางน้ำ',
    avatar_url: 'http://clipart-library.com/images/kiKordedT.jpg',
    subtitle: '1199'
  },
  {
    name: 'แพทย์ฉุกเฉิน',
    avatar_url: 'https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-1/p720x720/22853224_1592246647481145_553733365756933386_n.jpg?oh=46398f2407317b72cc0b44a25a551352&oe=5B354271',
    subtitle: '1669'
  },
  {
    name: 'จส. 100',
    avatar_url: 'https://pbs.twimg.com/profile_images/924768130932412416/3ss-bbaQ_400x400.jpg',
    subtitle: '1137'
  },
  {
    name: 'กู้ชีพ นเรนทร',
    avatar_url: 'https://www.narenthorn.or.th/sites/default/files/field/image/narenthorn-logo.png',
    subtitle: '023548222'
  },
  {
    name: 'แจ้งเหตุประปาขัดข้อง',
    avatar_url: 'https://vignette.wikia.nocookie.net/bronies/images/a/af/Raindrops_cutie_mark.png/revision/latest?cb=20130611010209',
    subtitle: '1125'
  },
  {
    name: 'แจ้งเหตุไฟฟ้าขัดข้อง',
    avatar_url: 'http://www.clker.com/cliparts/L/j/U/f/3/O/thunder-bolt-plain-md.png',
    subtitle: '1130'
  },
  {
    name: 'Dummy',
    avatar_url: 'http://www.clker.com/cliparts/L/j/U/f/3/O/thunder-bolt-plain-md.png',
    subtitle: '1130'
  },
]

const titleConfig = {
  title: 'เบอร์โทรฉุกเฉิน',
};

export default class Tel extends React.Component {
  alert(n,i,no) {
    const args = {
        number: no, // String value with the number to call
        prompt: false// Optional boolean property. Determines if the user should be prompt prior to the call 
      }
    Alert.alert(
      'Alert',
      'Call '+ n + ' (' + no + ') ?',
      [
        {text: 'OK', onPress: () => Communications.phonecall(no, true)},
        // {text: 'OK', onPress: () => call(args).catch(console.error)},
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'}, 
      ],
      { cancelable: false }
    )
  }

  render() {
    return (
      <View>
        <NavigationBar
        title={titleConfig}
        />
        <ScrollView>
        <List containerStyle={{marginTop: -5, marginBottom: 30}}>
          {
            list.map((l, i) => (
              <ListItem
                component={TouchableHighlight}
                roundAvatar
                avatar={{uri:l.avatar_url}}
                key={i}
                title={(i+1) + '. ' + l.name}
                onPress={() => this.alert(l.name,i,l.subtitle)}
              />
            ))
          }
        </List>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%'
  }
});

