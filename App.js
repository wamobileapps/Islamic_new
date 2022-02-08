import React, { useEffect } from 'react'
import { Provider as PaperProvider } from 'react-native-paper'
import AppNavigator from './src/navigation/AppNavigation';
import { Provider as StoreProvider } from 'react-redux';
import firebase from '@react-native-firebase/app';
import messaging from '@react-native-firebase/messaging';
import PushNotification, { Importance } from 'react-native-push-notification'
import {Text, DeviceEventEmitter, NativeEventEmitter, NativeModules } from 'react-native'
// import * as firebase from "firebase/app";

const nameModule = NativeModules.RNNameModule;
const nameManagerEmitter = new NativeEventEmitter(nameModule);

export default function App() {
   const config= {
     clientId: '136437729679-bjm06k840nev2um72a6dekq6072hd19e.apps.googleusercontent.com',
     appId: '1:136437729679:android:a44f46ba18aef1797823fa',
     apiKey: 'AIzaSyASmhiEtr-Rer-ignSqgP4d-EwaNB5enCo',
  databaseURL: 'https://mulsimapp-default-rtdb.firebaseio.com/',
  storageBucket: 'mulsimapp.appspot.com',
  messagingSenderId: '',
  projectId: 'mulsimapp',
   }

  //  firebase.initializeApp(config)
  
  // const createChannel = (channelId) => {
  //   PushNotification.createChannel(
  //     {
  //       channelId: "test-channel", // (required)
  //       channelName: "My channel", // (required)
  //       channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
  //       playSound: false, // (optional) default: true
  //       soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
  //       importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
  //       vibrate: true, // (optional) default: true. Creates the default vibration patten if true.
  //     },
  //     (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
  //   );
  // }
  const showNotification = (channelId, options) => {
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: "muslimm-channel", // (required) channelId, if the channel doesn't exist, notification will not trigger.
      largeIconUrl: "https://cdn4.iconfinder.com/data/icons/logos-brands-5/24/react-128.png", // (optional) default: undefined
      smallIcon: "ic_notification", // (optional) default: "ic_notification" with fallback for "ic_launcher". Use "" for default small icon.
      subText: options.subText, // (optional) default: none
      bigPictureUrl: options.bigImage, // (optional) default: undefined
      bigLargeIconUrl: "https://cdn0.iconfinder.com/data/icons/logos-brands-in-colors/128/react-128.png", // (optional) default: undefined
      color: options.color, // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      priority: "high", // (optional) set notification priority, default: high
      actions: ["ReplyInput"],
      reply_placeholder_text: "Merhaba De..", // (required)
      reply_button_text: "Cevapla", // (required)

      title: options.title, // (optional)
      message: options.message, // (required)
    });
  }

  messaging().setBackgroundMessageHandler(async remoteMessage => {
    console.log('Message handled in the background!', remoteMessage);
  });

  useEffect(async() => {
    console.log("apphcvjhhj");

    nameManagerEmitter.addListener("EventName_Name", (data) => { console.log(data) });

//   async function SubscribeEvent(){
//     DeviceEventEmitter.emit('Simple', (data) => {
//       console.warn("check data  update", data)
//   });
//   }
// SubscribeEvent()
    
  
          firebase.messaging().getToken(firebase.app().options.messagingSenderId).then(async(token) => {
      console.log(`token=`, token)
      
    })
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
     
      console.log('remoteMsg', remoteMessage)

    })
    messaging().setBackgroundMessageHandler(async remoteMsg => {
      console.log(`remoteMsg Background=`, remoteMsg)
    })

  

    return() => {
       unsubscribe,
       nameManagerEmitter.removeListener("Simple", e => {
        // Error handling
    })
      }
  }, [])

  
  return (
    // <StoreProvider store={store}>
    //    <StatusBar   barStyle={'dark-content'} />
    
      <PaperProvider>
        <React.Fragment>
        <AppNavigator />
        </React.Fragment>
      </PaperProvider>
    // </StoreProvider>
  )
}



// import React from 'react';
// import {
//   StyleSheet, Text, View, TouchableOpacity, Image,
// } from 'react-native';
// import { connect } from 'react-redux';
// import Heartbeat from './Heartbeat';
// // import heart from './heart.png';

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: 'white',
//   },
//   view: {
//     flex: 0.5,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   button: {
//     backgroundColor: 'gray',
//     padding: 10,
//     margin: 10,
//   },
//   text: {
//     fontSize: 20,
//     color: 'white',
//   },
// });


// const App = ({ heartBeat }) => {
//   alert(heartBeat)
//   const imageSize = heartBeat ? 150 : 100;
//   return (
//     <View style={styles.container}>
//       <View style={styles.view}>
//         <Image  style={{ width: imageSize, height: imageSize, backgroundColor: 'red' }} resizeMode="contain" />
//       </View>
//       <View style={styles.view}>
//         <TouchableOpacity style={styles.button} onPress={() => Heartbeat.startService()}>
//           <Text style={styles.instructions}>Start</Text>
//         </TouchableOpacity>
//         <TouchableOpacity style={styles.button} onPress={() => Heartbeat.stopService()}>
//           <Text style={styles.instructions}>Stop</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// };

// const mapStateToProps = store => ({
//   heartBeat: store.App.heartBeat,
// });

// export default connect(mapStateToProps)(App);
