import React, { Component, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, ToastAndroid, ImageBackground, KeyboardAvoidingView,  } from 'react-native';
import IconNext from 'react-native-vector-icons/EvilIcons'

import { TouchableOpacity } from 'react-native';


const upImage = require('../images/sign1.png')

const Help = (props) => {



  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <ImageBackground source={upImage} style={{ width: '100%',  height: 230, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 22, color: '#000', marginTop: 20, color: '#454545', fontFamily: 'Montserrat-ExtraBold',textAlign: 'center' }}>Help</Text>
      </ImageBackground>


      <ScrollView style={{}}>
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', }} behavior="padding" enabled >

        <View style={{
            marginLeft: 15, height: 44, marginTop: 40, flexDirection: 'row',
            marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
            alignItems: 'center', justifyContent: 'space-between'
          }}>

            <Text style={{ fontSize: 13, marginLeft: 20, color: '#000',  color: '#454545', fontFamily: 'Montserrat-Medium',textAlign: 'center' }}>User Guide</Text>

            <IconNext name='chevron-right' type='EvilIcons' size={35} style={{ marginRight: 20 }} />

            

          </View>

          <View style={{
            marginLeft: 15, height: 44, marginTop: 30, flexDirection: 'row',
            marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
            alignItems: 'center', justifyContent: 'space-between', 
          }}>

            <Text style={{ fontSize: 13, marginLeft: 20, color: '#000',  color: '#454545', fontFamily: 'Montserrat-Medium',textAlign: 'center' }}>Forgot Pin</Text>

            <IconNext onPress={()=>props.navigation.navigate('ForgotPin')} name='chevron-right' type='EvilIcons' size={35} style={{ marginRight: 20 }} />

            

          </View>

          <View style={{
            marginLeft: 15, height: 44, marginTop: 30, flexDirection: 'row',
            marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
            alignItems: 'center', justifyContent: 'space-between', 
          }}>

            <Text style={{ fontSize: 13, marginLeft: 20, color: '#000',  color: '#454545', fontFamily: 'Montserrat-Medium',textAlign: 'center' }}>Change Your Pin</Text>

            <IconNext onPress={()=>props.navigation.navigate('ChangePin')} name='chevron-right' type='EvilIcons' size={35} style={{ marginRight: 20 }} />

            

          </View>

          <View style={{
            marginLeft: 15, height: 44, marginTop: 30, flexDirection: 'row',
            marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
            alignItems: 'center', justifyContent: 'space-between', 
          }}>

            <Text style={{ fontSize: 13, marginLeft: 20, color: '#000',  color: '#454545', fontFamily: 'Montserrat-Medium',textAlign: 'center' }}>Change Your Password</Text>

            <IconNext onPress={()=>props.navigation.navigate('ChangePassword')} name='chevron-right' type='EvilIcons' size={35} style={{ marginRight: 20 }} />

            

          </View>

          <View style={{
            marginLeft: 15, height: 44, marginTop: 30, flexDirection: 'row',
            marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
            alignItems: 'center', justifyContent: 'space-between'
          }}>

            <Text style={{ fontSize: 13, marginLeft: 20, color: '#000',  color: '#454545', fontFamily: 'Montserrat-Medium',textAlign: 'center' }}>Contact Us</Text>

            <IconNext onPress={()=>props.navigation.navigate('ContactUs')} name='chevron-right' type='EvilIcons' size={35} style={{ marginRight: 20 }} />

            

          </View>

          <TouchableOpacity  style={{
            marginLeft: 15, height: 44, marginTop: 30, flexDirection: 'row',
            marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
            alignItems: 'center', justifyContent: 'space-between'
          }}>

            <Text style={{ fontSize: 13, marginLeft: 20, color: '#000',  color: '#454545', fontFamily: 'Montserrat-Medium',textAlign: 'center' }}>Report an Issue</Text>

            <IconNext onPress={()=>props.navigation.navigate('Feedback')} name='chevron-right' type='EvilIcons' size={35} style={{ marginRight: 20 }} />

            

          </TouchableOpacity>

          <View style={{
            marginLeft: 15, height: 44, marginTop: 30, flexDirection: 'row',
            marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
            alignItems: 'center', justifyContent: 'space-between'
          }}>

            <Text style={{ fontSize: 13, marginLeft: 20, color: '#000',  color: '#454545', fontFamily: 'Montserrat-Medium',textAlign: 'center' }}>Service Status</Text>

            <IconNext onPress={()=>props.navigation.navigate('ServiceStatus')} name='chevron-right' type='EvilIcons' size={35} style={{ marginRight: 20 }} />

            

          </View>

          <View style={{
            marginLeft: 15, height: 44, marginTop: 30, flexDirection: 'row',
            marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
            alignItems: 'center', justifyContent: 'space-between', marginBottom:20
          }}>

            <Text style={{ fontSize: 13, marginLeft: 20, color: '#000',  color: '#454545', fontFamily: 'Montserrat-Medium',textAlign: 'center' }}>Feedback</Text>

            <IconNext onPress={()=>props.navigation.navigate('Feedback')} name='chevron-right' type='EvilIcons' size={35} style={{ marginRight: 20 }} />

            

          </View>


          </KeyboardAvoidingView>
          </ScrollView>



    </View>

  )

}


export default Help