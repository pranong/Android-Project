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
import YouTube from 'react-native-youtube'
import firebase from '../../firebase'
var eventRef = firebase.database().ref("Event/");


const list = [
  {
    name: 'แขนหรือขาหัก',
    avatar_url: 'http://3.bp.blogspot.com/_tF_DyjQ-CPA/TEPkblx7IJI/AAAAAAAAClE/PXDWnhX9fig/s1600/_1_~1.PNG',
    subtitle: 'Second'
  },
  {
    name: 'หัวแตก',
    avatar_url: 'https://images.vexels.com/media/users/3/137264/isolated/preview/e3dd503272edc83a4bd853800a6048ff-fire-cartoon-contour-silhouette-by-vexels.png',
    subtitle: 'Third'
  },
  {
    name: 'เป็นลม',
    avatar_url: 'https://s.isanook.com/ns/0/rp/r/w0h0/ya0xa0m1w0/aHR0cDovL3d3dy5pbm5uZXdzLmNvLnRoL2ltYWdlcy9uZXdzLzIwMTIvNS80MjM5NzQtMDEuanBn.jpg' ,
    subtitle: 'Fourth'
  },
  {
    name: 'อาการชัก',
    avatar_url: 'https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-9/23518913_737613203094179_4076736504550291840_n.jpg?oh=ca0391dbcd8b7d2d6d92e8ce87c8d680&oe=5B01DAC3',
    subtitle: 'Fifth'
  },
  {
    name: 'แผลงูกัด',
    avatar_url: 'https://lh3.googleusercontent.com/OjZOv1JUrVcq_9jvb-S7OABxU4mguWMxifbdc7LMmLjD-CmFBufCH_ySLoEqv330pA=w300-rw',
    subtitle: 'Sixth'
  },
  {
    name: 'จมน้ำ',
    avatar_url: 'http://clipart-library.com/images/kiKordedT.jpg',
    subtitle: 'Seventh'
  },
  {
    name: 'อาการสำลัก',
    avatar_url: 'https://scontent.fbkk5-1.fna.fbcdn.net/v/t1.0-1/p720x720/22853224_1592246647481145_553733365756933386_n.jpg?oh=46398f2407317b72cc0b44a25a551352&oe=5B354271',
    subtitle: 'Eighth'
  }
]

class MainScreen extends React.Component {
  static navigationOptions = {
    title: 'การปฐมพยาบาลเบื้องต้น'
  };
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

  render() {
    return (
      <View>
        <ScrollView>
        <List containerStyle={{marginTop: -5, marginBottom: 25}}>
          {
            list.map((l, i) => (
              <ListItem
                component={TouchableHighlight}
                roundAvatar
                avatar={{uri:l.avatar_url}}
                key={i}
                title={(i+1) + '. ' + l.name}
                onPress={() => this.props.navigation.navigate(l.subtitle,l.subtitle)}
              />
            ))
          }
        </List>
        </ScrollView>
      </View>
    );
  }
}

class secondScreen extends React.Component {
  state = {
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    containerMounted: false,
    containerWidth: null,
  };
  static navigationOptions = {
    title: 'แขนหรือขาหัก'
  };
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text>แขนหักหรือขาหักมีอาการที่สังเกตเห็นได้ เช่น พบกระดูกโผล่ออกผิวหนัง เลือดทะลักออกจากแผลและไหลไม่หยุด แม้จะกดแผลห้ามเลือดอยู่หลายนาที หรืออาการบาดเจ็บที่ศีรษะ ลำคอ และหลัง ผู้ช่วยเหลือสามารถปฐมพยาบาลเบื้องต้นได้ด้วยวิธีการ ดังนี้</Text>
        </View>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ในกรณีที่ต้องห้ามเลือด กดแผลให้แน่นด้วยผ้าสะอาดจนกว่าเลือดจะหยุดไหล</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>การประคบน้ำแข็ง หรือยกแขนขึ้นเหนือหัวใจ อาจช่วยให้แผลบวมน้อยลงได้</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>หากเสื้อผ้าที่ผู้ป่วยสวมใส่ปกปิดแขนบริเวณที่หัก ให้ถอดหรือตัดเสื้อผ้าออกแต่ห้ามขยับแขนเด็ดขาด</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>สำหรับอาการแขนหักที่ไม่รุนแรงมากนัก ให้ดามแขนโดยพันม้วนกระดาษหนังสือพิมพ์ หรือไม้บรรทัด ด้วยเทปที่ใช้สำหรับการปฐมพยาบาลเบื้องต้น หรือดามแขนของผู้ป่วยโดยใช้ผ้าพันแผลพันไว้กับไม้กระดาน</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>หากพบว่าผู้ป่วยขาหัก ให้ผู้ช่วยเหลือดามที่ขาโดยใช้ผ้าพันแผลพันรอบหัวเข่า ข้อเท้า ในส่วนบน และล่างของบริเวณที่หักกับไม้กระดานหรือวัสดุดาม หรือดามไว้กับขาอีกข้างที่ไม่ได้รับบาดเจ็บ</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ตรวจสอบให้แน่ใจว่าการดามไม่ได้ส่งผลต่อการไหลเวียนเลือดที่บริเวณแขนหรือขา</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>หากผู้ป่วยมีอวัยวะหักเป็นแผลเปิดที่มีชิ้นส่วนของกระดูกโผล่ออกมา พยายามอย่าแตะต้อง และให้ใช้ผ้าพันแผลปราศจากเชื้อโรคพันไว้ และรอความช่วยเหลือทางการแพทย์</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ห้ามให้ผู้ป่วยรับประทานอาหารหรือดื่มเครื่องดื่มใด ๆ เนื่องจากอาจต้องเข้ารับการรักษาโดยการผ่าตัด</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
              <Text style={ styles.normalText }>รีบเข้ารับการรักษาจากแพทย์โดยทันที ซึ่งแพทย์อาจเอกซเรย์ เข้าเฝือกแขน หรือผ่าตัดในกรณีที่กระดูกทะลุผิวหนัง เพื่อฟื้นฟูกระดูกส่วนที่ที่แตกหัก</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bulletText }>
            <YouTube
              apiKey= 'AIzaSyBEi6rci2iIcbhbVCEASvHd7rbhldH30kk'
              videoId="2U2zFnNOFJw"   // The YouTube video ID
              startTime= {23}  
              play={false}             // control playback of video with true/false
              fullscreen={false}       // control whether the video should play in fullscreen or inline
              loop={true}             // control whether the video should loop when ended
              autoplay= {false}
              onReady={e => this.setState({ isReady: true })}
              onChangeState={e => this.setState({ status: e.state })}
              onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => this.setState({ error: e.error })}

              style={{ alignSelf: 'stretch', height: 300 }}
            />
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
              <Text style={ styles.normalText }>ที่มา : https://www.youtube.com/watch?v=2U2zFnNOFJw</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}

class thirdScreen extends React.Component {
  static navigationOptions = {
    title: 'หัวแตก'
  };
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text>ใบหน้าและหนังศีรษะเป็นส่วนที่มีเส้นเลือดใกล้ผิวชั้นนอกมาก ดังนั้น รอยแผลหัวแตกมักจะมีเลือดไหลออกมาก ในกรณีที่บาดแผลลึกถึงกระโหลกศีรษะ ผู้ป่วยควรได้รับการรักษาอย่างเร่งด่วน แต่ในกรณีที่บาดแผลไม่สาหัส อาจปฐมพยาบาลห้ามเลือดได้เองที่บ้าน โดยมีวิธีดังต่อไปนี้</Text>
        </View>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>กดแผลห้ามเลือด หากเป็นไปได้ให้ล้างมือ หรือสวมถุงมือกันเชื้อโรคทุกครั้ง</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ให้ผู้ป่วยนอนลง หากมีสิ่งแปลกปลอมติดอยู่กับแผล ให้เอาออกให้หมด</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ใช้ผ้าพันแผล หรือผ้าสะอาดกดแผลไว้ให้แน่น 15 นาที อย่าหยุดกดจนกว่าจะครบเวลา หากเลือดซึมผ่านผ้า ให้ใช้ผ้าสะอาดผืนใหม่แปะแล้วกดต่อ</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ในกรณีที่บาดแผลค่อนข้างสาหัสและเลือดยังไม่ยอมหยุดไหล ให้กดแผลต่อไปเรื่อย ๆ ระหว่างรอความช่วยเหลือ พยายามให้แผลสะอาดและหลีกเลี่ยงไม่ให้บาดเจ็บซ้ำอีก</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ในกรณีที่บาดแผลไม่ร้ายแรง หลังจากกดแผลไว้แล้ว 15 นาที เลือดมักจะหยุดไหลได้เอง หรืออาจไหลซึมอยู่บ้างประมาณ 45 นาที</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ตรวจสอบให้แน่ใจว่าการดามไม่ได้ส่งผลต่อการไหลเวียนเลือดที่บริเวณแขนหรือขา</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>หากผู้ช่วยเหลือสังเกตพบว่ามีอาการแตกร้าวของกระโหลก ให้ปิดแผลด้วยผ้าพันแผลที่สะอาดปราศจากเชื้อโรค โดยห้ามออกแรงกดห้ามเลือดโดยตรง หรือหลีกเลี่ยงแตะต้องเศษเนื้อตายที่บริเวณบาดแผล</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>บาดแผลที่มีอาการบวม บรรเทาลงได้ด้วยการประคบน้ำแข็ง</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
              <Text style={ styles.normalText }>เฝ้าสังเกตอาการหมดสติ หรือช็อก</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
            <Image
              style={{height: 150, margin: 10}}
              source={{uri: 'https://res.cloudinary.com/dk0z4ums3/image/upload/v1504250431/attached_image_th/%E0%B8%AB%E0%B8%B1%E0%B8%A7%E0%B9%81%E0%B8%95%E0%B8%81%E0%B9%81%E0%B8%A5%E0%B9%89%E0%B8%A7%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%A1%E0%B8%B7%E0%B8%AD%E0%B8%AD%E0%B8%A2%E0%B9%88%E0%B8%B2%E0%B8%87%E0%B9%84-pobpad.jpg'}}/>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}

class fourthScreen extends React.Component {
  static navigationOptions = {
    title: 'เป็นลม'
  };
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text>อาการเป็นลมเกิดขึ้นจากภาวะเลือดเลี้ยงสมองไม่เพียงพอ ทำให้ผู้ป่วยหมดสติชั่วคราว การปฐมพยาบาลเบื้องต้นเมื่อเป็นลมอาจทำได้ดังนี้</Text>
        </View>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ในกรณีที่ตัวเรามีอาการเป็นลมซึ่งอาจสังเกตได้จากอาการที่เกิดฉับพลัน เช่น รู้สึกหน้ามืด ตาพร่าลาย หรือเวียนศีรษะ ให้รีบล้มตัวนอนหรือนั่งพัก โดยขณะมีอาการให้นั่งในท่าโน้มศีรษะลงมาอยู่ระหว่างเข่าพร้อมกับหายใจเข้าลึกเต็มปอด หากรู้สึกดีขึ้นจึงค่อย ๆ ลุกขึ้น ทั้งนี้ผู้ป่วยไม่ควรรีบลุกขึ้นเร็วจนเกินไปเนื่องจากอาจเป็นลมซ้ำได้</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ในกรณีที่พบผู้ป่วยเป็นลม ควรช่วยจัดท่าทางให้ผู้ป่วยนอนหงายราบ และยกขาขึ้นให้อยู่เหนือระดับหัวใจ (ประมาณ 30 เซนติเมตร) เพื่อให้โลหิตไหลเวียนไปหล่อเลี้ยงสมองได้ง่ายขึ้น รวมทั้งปลดเข็มขัด ปกคอเสื้อ หรือเสื้อผ้าส่วนอื่น ๆ ที่รัดแน่น เพื่อช่วยลดโอกาสเป็นลมซ้ำ หากผู้ป่วยฟื้นขึ้น อย่าเพิ่งให้ลุกขึ้นเร็วจนเกินไป และให้รีบติดต่อขอความช่วยเหลือจากหน่วยงานแพทย์หรือกู้ชีพ</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>สังเกตดูว่าผู้ป่วยอาเจียน และหายใจได้สะดวกดีหรือไม่</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>สังเกตการไหลเวียนโลหิต ซึ่งดูได้จากการหายใจ อาการไอ หรือการเคลื่อนไหว หากพบความผิดปกติว่าผู้ป่วยหยุดหายใจ ให้รีบติดต่อขอความช่วยเหลือ แล้วทำ CPR (การปั๊มหัวใจ)ไปเรื่อย ๆ จนกว่าผู้ป่วยจะมีสัญญาณชีพจรและกลับมาหายใจได้อีกครั้ง หรือเมื่อความช่วยเหลือมาถึง</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ในกรณีที่ผู้ป่วยเป็นลมล้มลงจนได้รับบาดเจ็บ ไม่ว่าจะเป็นบาดแผลฟกช้ำ หรือแผลที่มีเลือดออก ให้ดูแลบาดแผลและกดแผลห้ามเลือด</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ให้ผู้ช่วยเหลือพาผู้ป่วยที่เป็นลมไปอยู่ในสถานที่ที่มีอากาศถ่ายเทสะดวก หลีกเลี่ยงสถานที่ที่มีผู้คนจอแจ และให้ดมแอมโมเนีย หรือยาดม เพื่อบรรเทาอาการ โดยผู้ช่วยเหลืออาจใช้ผ้าชุบน้ำเช็ดหน้าควบคู่ไปด้วยได้เช่นกัน อย่างไรก็ตาม หากผู้ป่วยยังไม่มีอาการดีขึ้น ควรรีบพาส่งโรงพยาบาลเพื่อตรวจวินิจฉัยโดยแพทย์</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bulletText }>
            <YouTube
              apiKey= 'AIzaSyBEi6rci2iIcbhbVCEASvHd7rbhldH30kk'
              videoId="9sLvJZtz-sU"   // The YouTube video ID
              startTime= {118}  
              play={false}             // control playback of video with true/false
              fullscreen={false}       // control whether the video should play in fullscreen or inline
              loop={true}             // control whether the video should loop when ended
              autoplay= {false}
              onReady={e => this.setState({ isReady: true })}
              onChangeState={e => this.setState({ status: e.state })}
              onChangeQuality={e => this.setState({ quality: e.quality })}
              onError={e => this.setState({ error: e.error })}

              style={{ alignSelf: 'stretch', height: 300 }}
            />
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
              <Text style={ styles.normalText }>ที่มา : https://www.youtube.com/watch?v=9sLvJZtz-sU</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}

class fifthScreen extends React.Component {
  static navigationOptions = {
    title: 'อาการชัก'
  };
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text>อาการชักมีหลายประเภทและมักจะหยุดลงในเวลาไม่กี่นาที อาจมีสัญญาณบอกล่วงหน้า เช่น รู้สึกหวาดกลัว หรือวิตกกังวลอย่างฉับพลัน รู้สึกปั่นป่วนในท้อง มึนงง ปวดศีรษะ การมองเห็นผิดปกติ ร่างกายชาไร้ความรู้สึก หรือการควบคุมแขนหรือขาเกิดความผิดปกติ ทั้งนี้ หากพบผู้ป่วยชักเกร็งกระตุกทั้งตัว ผู้ช่วยเหลือควรรีบปฐมพยาบาลเบื้องต้น ดังนี้</Text>
        </View>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ผู้ช่วยเหลือควรตั้งสติไว้ให้ดี และอยู่กับผู้ป่วยจนกว่าจะหายชัก หรือกลับมารู้สึกตัวปกติดีอีกครั้ง</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ให้ผู้ช่วยเหลือพยายามกันไม่ให้มีคนมุงดู โดยอาจขอความร่วมมือจากผู้อื่นให้เว้นระยะห่างให้ผู้ป่วยได้มีพื้นที่สงบและรู้สึกปลอดภัย ในกรณีที่เหตุการณ์เกิดขึ้นในสถานที่อันตราย เช่น บนท้องถนน หรือบันได ให้เคลื่อนย้ายผู้ป่วยไปอยู่ในที่ที่ปลอดภัยและเป็นส่วนตัว</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>จับผู้ป่วยนอนตะแคงหนุนหมอน เพื่อป้องกันการสำลักน้ำลาย หรือสำลักอาเจียน</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ระมัดระวังไม่ให้ศีรษะของผู้ป่วยกระทบกระเทือน โดยผู้ช่วยเหลืออาจหาเสื้อผ้ามารองไว้ใต้ศีรษะ</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ปลดเครื่องแต่งกายที่รัดแน่น เช่น กระดุมปกคอเสื้อ เพื่อให้ผู้ป่วยหายใจสะดวกขึ้น</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>พยายามให้ผู้ป่วยหายใจได้สะดวก โดยการจับกราม และดันศีรษะไปด้านหลังเล็กน้อย</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ห้ามเขย่าตัว ตะโกนใส่ หรือนำสิ่งของแปลกปลอมเข้าปากผู้ป่วยที่กำลังเกิดอาการโดยเด็ดขาด ไม่ว่าจะเป็นยาเม็ด หรือน้ำเปล่า เพราะอาจทำให้เกิดการสำลักได้</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
              <Text style={ styles.normalText }>ห้ามยึดยื้อหรือดึงรั้งแขนและขาของผู้ป่วยที่มีอาการชัก เว้นแต่ในกรณีที่ผู้ป่วยกำลังจะได้รับอันตรายจากการตกที่สูง หรือการตกน้ำ</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
              <Text style={ styles.normalText }>ในระหว่างปฐมพยาบาลควรจดจำอาการ และระยะเวลาที่เกิดอาการว่านานเท่าไร เพื่อจะได้แจ้งแก่ผู้ป่วยหรือแพทย์ได้</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
              <Text style={ styles.normalText }>หลังจากอาการชักสิ้นสุดลง มีความเป็นไปได้ว่าผู้ป่วยอาจเพลียหลับไป ในกรณีนี้ให้ผู้ช่วยเหลือจัดท่าผู้ป่วยนอนพลิกตะแคง เช็ดน้ำลาย หรือสิ่งแปลกปลอมที่ไปอุดกั้นทำให้หายใจไม่สะดวก เช่น ฟันปลอม หรือเศษอาหาร</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
              <Text style={ styles.normalText }>หากผู้ช่วยเหลือสังเกตพบว่าผู้ป่วยชักอยู่นานเกินกว่า 5 นาที มีอาการชักซ้ำ ๆ ติดกัน หายใจติดขัดผิดปกติ หรือผู้ป่วยได้รับการบาดเจ็บที่รุนแรงระหว่างชัก ควรรีบนำตัวผู้ป่วยส่งโรงพยาบาลเพื่อให้แพทย์ตรวจวินิจฉัยโดยด่วน</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
            <Image
              style={{height: 500, margin: 10}}
              source={{uri: 'http://haamor.com/media/images/articlepics/%E0%B9%81%E0%B8%99%E0%B8%A7%E0%B8%97%E0%B8%B2%E0%B8%87%E0%B8%9B%E0%B8%8F%E0%B8%B4%E0%B8%9A%E0%B8%B1%E0%B8%95%E0%B8%B4%E0%B8%AA%E0%B8%B3%E0%B8%AB%E0%B8%A3%E0%B8%B1%E0%B8%9A%E0%B8%9C%E0%B8%B9%E0%B9%89%E0%B8%A1%E0%B8%B5%E0%B8%AD%E0%B8%B2%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%8A%E0%B8%B1%E0%B8%81-1-01.jpg'}}/>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}

class sixthScreen extends React.Component {
  static navigationOptions = {
    title: 'แผลงูกัด'
  };
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text>หากไม่สามารถจดจำลักษณะของงูหรือไม่ทราบชนิดของงูที่กัด ให้ผู้ช่วยเหลือและผู้ป่วยพึงสงสัยไว้ก่อนได้เลยว่างูที่กัดอาจมีพิษ และรีบติดต่อขอความช่วยเหลือจากแพทย์โดยทันที ทั้งนี้ อาการที่เกิดจากบาดแผลงูพิษอาจสังเกตได้จากการหายใจลำบาก หรือหมดสติ ในทางตรงกันข้ามถ้าทราบแน่ชัดแล้วว่างูที่กัดเป็นสายพันธุ์ที่ไม่มีพิษ ให้รักษาแผลเหมือนกับการรักษาแผลถูกของมีคมบาด และควรจดจำลักษณะของงูเอาไว้ให้ดี เมื่อผู้เชี่ยวชาญมาจะได้บอกรายละเอียดของงูได้ถูกต้อง ทั้งนี้ การปฐมพยาบาลเบื้องต้นบาดแผลงูกัดในระหว่างรอความช่วยเหลือควรปฏิบัติ ดังนี้</Text>
        </View>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>รีบพาผู้ป่วยหนีออกห่างจากงู และให้ผู้ป่วยนอนลง</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ผู้ช่วยเหลือควรพยายามทำให้ผู้ป่วยรู้สึกสงบ เคลื่อนไหวแขน ขา หรือส่วนที่ถูกงูกัดให้น้อยที่สุดเท่าที่จะเป็นไปได้ เพื่อไม่ให้พิษแพร่กระจาย พยายามจัดตำแหน่งให้บริเวณที่ถูกงูกัดอยู่ในระดับที่ต่ำกว่าหัวใจ เช่น หากถูกงูกัดที่มือหรือเท้าให้ห้อยลงต่ำ</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ปิดแผลด้วยพลาสเตอร์ปิดแผลแบบปราศจากเชื้อ</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ถอดเครื่องประดับที่อยู่ใกล้เคียงกับแผลออก หรือถอดรองเท้าหากถูกกัดที่ขา หรือเท้า</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ในระหว่างรอความช่วยเหลือ ห้ามกรีดบริเวณบาดแผล ดูดพิษ ขันชะเนาะ ล้างแผลด้วยน้ำ ประคบน้ำแข็ง ใช้ไฟหรือเล็กร้อนจี้บริเวณที่ถูกงูกัด ให้ใช้เครื่องดื่มที่มีส่วนผสมของคาเฟอีน หรือแอลกอฮอล์ รวมทั้งห้ามรักษาด้วยยาชนิดอื่นโดยเด็ดขาด</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ห้ามผู้ป่วยเดินเท้าในระหว่างการเดินทางไปยังสถานพยาบาล ให้ผู้ป่วยนั่งรถหรือแคร่หาม เพื่อป้องกันการแพร่กระจายของพิษงูไปทั่วร่างกาย</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}

class seventhScreen extends React.Component {
  static navigationOptions = {
    title: 'จมน้ำ'
  };
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text>การจมน้ำมักไม่มีอาการอื่น ๆ แสดงให้เห็นนอกเสียจากพบว่าผู้ป่วยหยุดหายใจ หรือพบว่านอนอยู่ที่ฝั่งแล้ว การปฐมพยาบาลเบื้องต้นทำได้โดยปฏิบัติดังนี้</Text>
        </View>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>หากผู้ป่วยหยุดหายใจหรือเรียกแล้วไม่ตอบสนอง ให้เปิดทางเดินหายใจให้โล่งขึ้น และทำ CPR ก่อนเป็นเวลา 1 นาที จากนั้นจึงร้องขอความช่วยเหลือจากผู้คนที่อยู่ในบริเวณใกล้เคียงให้ติดต่อกับหน่วยงานฉุกเฉินที่หมายเลข 1669 โดยทันที ภายหลังให้ทำ CPR ร่วมกับการผายปอดอย่างต่อเนื่อง (หากเคยมีประสบการณ์หรือผ่านการเรียนวิธีผายปอดที่ถูกต้องมาก่อน) จนกว่าความช่วยเหลือจะมาถึง</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>หากพบว่าผู้ป่วยหมดสติแต่ยังคงหายใจอยู่ จัดผู้ป่วยให้อยู่ในท่าพัก โดยให้ศีรษะอยู่ในระดับที่ต่ำกว่าตัว แต่สำหรับกรณีที่ผู้ป่วยจมน้ำรู้สึกตัว ให้ผู้ช่วยเหลือรีบเช็ดตัว เปลี่ยนเสื้อผ้า แล้วพาผู้ป่วยส่งโรงพยาบาลโดยเร็วที่สุด</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>คอยเฝ้าสังเกตอาการ เพื่อให้แน่ใจว่าผู้ป่วยยังหายใจอยู่</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ผู้ช่วยเหลือไม่ควรพยายามกำจัดน้ำในตัวผู้ป่วยออกด้วยวิธีการอุ้มพาดบ่าแล้วกระทุ้งเอาน้ำออก เพราะน้ำที่ไหลออกจากการกระทุ้งนั้นอาจไม่ใช่น้ำที่ค้างในปอด แต่อาจเป็นน้ำจากกระเพาะอาหาร ซึ่งการปฏิบัติดังกล่าวก่อให้เกิดอันตรายกับผู้ป่วยตามมาได้</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      </View>
    );
  }
}

class eighthScreen extends React.Component {
  static navigationOptions = {
    title: 'อาการสำลัก'
  };
  render() {
    return (
      <View style={styles.container}>
      <ScrollView>
        <View style={styles.container2}>
          <Text>การสำลักเกิดจากสิ่งแปลกปลอมเข้าไปติดค้างอยู่ในลำคอหรือกีดขวางหลอดลม สังเกตเห็นได้จากอาการบางอย่าง เช่น เล็บ ริมฝีปาก และผิวหนังของผู้ป่วยคล้ำหรือเปลี่ยนเป็นสีเขียว พูดไม่มีเสียงหายใจลำบาก หายใจเสียงดัง ไม่สามารถไอแรง ๆ หรือหมดสติ การปฐมพยาบาลเบื้องต้นควรทำโดยทันที เนื่องจากการสำลักจะทำให้สมองขาดออกซิเจน โดยปฏิบัติดังนี้</Text>
        </View>
        <View style={ styles.column }>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ตบหลัง 5 ครั้ง ระหว่างกระดูกสะบักของผู้ป่วยด้วยส้นมือ โดยผู้ช่วยเหลือควรเรียนเทคนิคการตบหลังก่อนการช่วยเหลือ ไม่เช่นนั้นให้ใช้วิธีการกดกระแทกที่ท้องแทน หรือจะทำ 2 วิธีสลับกันก็ได้</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>กดกระแทกที่ท้อง (Abdominal Thrusts) 5 ครั้ง ควรทำก่อนการขอความช่วยเหลือ โดยให้ยืนข้างหลัง เอาแขนรัดรอบเอว แล้วโน้มตัวผู้ป่วยไปด้านหน้าเล็กน้อย กำหมัดแล้ววางไว้ตรงสะดือของผู้ป่วย จากนั้นใช้มืออีกข้างจับที่หมัด แล้วกดลงแรงและเร็วที่ท้องของผู้ป่วย ให้เหมือนกับกำลังพยายามยกตัวผู้ป่วยขึ้น วิธีนี้สามารถทำซ้ำจนกว่าสิ่งแปลกปลอมจะหลุดออกมา และสามารถใช้ได้กับเด็กที่มีอายุมากกว่า 1 ปีและผู้ใหญ่</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>ในกรณีที่ผู้ป่วยเป็นทารกที่อายุต่ำกว่า 1 ปี ให้ผู้ช่วยเหลือวางท้องแขนลงบนหน้าตัก จับผู้ป่วยอยู่ในท่านั่ง แล้ววางใบหน้าของผู้ป่วยลงบนท้องแขน จากนั้นค่อย ๆ ทุบลงกลางหลังให้แรงมากพอจะทำให้สิ่งแปลกปลอมหลุดออกมาได้</Text>
              </Text>
            </View>
          </View>
          <View style={ styles.row }>
            <View style={ styles.bullet }>
              <Text>{'\u2022' + " "}</Text>
            </View>
            <View style={ styles.bulletText }>
              <Text>
                <Text style={ styles.normalText }>หากยังไม่ได้ผลให้ใช้ 2 นิ้ววางตรงกลางกระดูกหน้าอก และปั๊มหัวใจ 5 รอบแบบเร็ว ๆ ทำซ้ำจนกว่าสิ่งแปลกปลอมจะหลุดออกมา ในกรณีที่ไม่มีสิ่งแปลกปลอมขวางทางเดินหายใจ หากทารกหยุดหายใจ ให้รีบติดต่อขอความช่วยเหลือแล้วจึงทำ CPR</Text>
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
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
    Fifth: { screen: fifthScreen },
    Sixth: { screen: sixthScreen },
    Seventh: { screen: seventhScreen },
    Eighth: { screen: eighthScreen },
  })
  

  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    width: '100%'
  },
  button: {
    fontSize: 20,
    textAlign: 'center',
    fontWeight: '700',
    // margin: 10,
    color: 'white',
    paddingVertical: 10,
  },
  buttonContainer: {
    // fontSize: 20,
    // textAlign: 'center',
    // margin: 10,
    // color: 'white',
    backgroundColor: 'skyblue',
    // paddingVertical: 5,
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
    marginLeft: 20,
    marginRight: 20,

    marginTop: 30
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
  column: {
    flexDirection: 'column',
    alignItems: 'flex-start',
},
row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
},
bullet: {
    width: 10
},
bulletText: {
    flex: 1
},
boldText: {
    fontWeight: 'bold'
},
normalText: {
}
});
