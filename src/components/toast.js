import React from 'react';
import Toast from 'react-native-simple-toast';

let toast;

export default function showToast(message, type, duration = 2000) {
  Toast.show(message, {
    position: -1,
    duration: duration,

    containerStyle: {
      

      borderRadius: 10,
      padding: 20,
      margin: 10,
    },
  });
}