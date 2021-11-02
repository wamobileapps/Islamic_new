import React, { Component, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, ToastAndroid, ImageBackground, KeyboardAvoidingView, } from 'react-native';


const upImage = require('../images/sign1.png')

const ServiceStatus = (props) => {



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <ImageBackground source={upImage} style={{ width: '100%', height: 230, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 22, color: '#000', marginTop: 20, color: '#454545', fontFamily: 'Montserrat-ExtraBold', textAlign: 'center' }}>Service Status</Text>
      </ImageBackground>

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 17, }}>Service status is fine</Text>
      </View>



    </View>

  )

}


export default ServiceStatus