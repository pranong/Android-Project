import * as firebase from 'firebase';

const firebaseConfig = {
  apiKey: "AIzaSyBBIohzEGezqgyRer-v_y-oBy4VqJIUjuk",
  authDomain: "sensorsdatabase.firebaseapp.com",
  databaseURL: "https://sensorsdatabase.firebaseio.com",
  projectId: "sensorsdatabase",
  storageBucket: "sensorsdatabase.appspot.com",
  messagingSenderId: "716682422710"
};
// const firebaseApp = firebase.initializeApp(firebaseConfig);

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

