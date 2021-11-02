import React, { Component, useState, useRef } from 'react';
import { View, Text, Modal, ScrollView, KeyboardAvoidingView, StyleSheet, TextInput, ImageBackground , ToastAndroid} from 'react-native';
import { InputX, Button } from '../components/index';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { baseUrl } from '../Api/COntstant';

const upImage = require('../images/sign1.png')


const CreatePin = (props) => {
  const [enterPin, setEnterPin] = useState('')
  const [confirmPin, setConfirmPin] = useState('')
  const [pinValue, setPinValue] = useState('')

  
  const pinInput = useRef();


  const createPin = async () => {
    if(enterPin == confirmPin){
    const token = await AsyncStorage.getItem('token')
    var params = null

    params = {
      "token": enterPin,
      "confirm_token": confirmPin
    }

    var headers = {
      "auth-token": token
    }

    console.log("params,token", params, token, pinValue)

    axios.patch(baseUrl+ `create_pin/${global.id}`, params, {
      headers
    }).then(async (res) => {
      if(res.status == 200){
        // alert(res.data.msg)
        props.navigation.navigate('PinLogin')
        ToastAndroid.show("Pin created successfully", ToastAndroid.SHORT)
        await AsyncStorage.setItem('loginToken', JSON.stringify(confirmPin))
        console.log("res-----", res.status)
      }

      
    })
  }
  else{
    alert("Pin is not matched")
  }

  }

  return (

    <View style={{ flex: 1 , backgroundColor: 'white'}}>
       <ImageBackground source={upImage} style={{ width: '100%',  height: 230, alignItems: 'center', justifyContent: 'center' }}>
       <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', marginTop: '15%', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Create Your</Text>
        <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Pin</Text>
      </ImageBackground>


      <ScrollView style={{}}>
      <KeyboardAvoidingView style={{backgroundColor: 'white'}} behavior="padding" enabled >

      <View style={{ marginTop: 50, margin: 20, marginRight: 20, backgroundColor: 'white' }}>

        <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', color: '#363636' }}>Enter Pin</Text>
        <View style={{ marginTop: 20, alignItems: 'center' }}>

          <SmoothPinCodeInput
            cellStyle={{
              borderWidth: 2,
              borderRadius: 24,
              borderColor: '#FAE9D7',
              backgroundColor: '#FAE9D7',
             
            }}
            cellStyleFocused={{
              borderColor: '#FAE9D7',
              backgroundColor: '#FAE9D7',
            }}
            textStyle={{
              fontSize: 22,
              fontFamily: 'Montserrat-Medium',
              color: '#363636'
            }}
            textStyleFocused={{
              color: '#000'
            }}
            // cellSpacing={25}
            codeLength={5}
            ref={pinInput}
            value={enterPin}
            onTextChange={code => setEnterPin(code)}
          />
        </View>
      </View>

      <View style={{ marginTop: 30, margin: 20, marginRight: 20, backgroundColor: 'white' }}>

        <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', color: '#363636' }}>Confirm Pin</Text>
        <View style={{ marginTop: 20, alignItems: 'center' }}>

          <SmoothPinCodeInput
            // placeholder=""
            cellStyle={{
              borderWidth: 2,
              borderRadius: 24,
              borderColor: '#FAE9D7',
              backgroundColor: '#FAE9D7',
            }}
            cellStyleFocused={{
              borderColor: '#FAE9D7',
              backgroundColor: '#FAE9D7',
            }}
            textStyle={{
              fontSize: 22,
              fontFamily: 'Montserrat-Medium',
              color: '#363636'
            }}
            textStyleFocused={{
              color: '#000'
            }}
           
            codeLength={5}
            ref={pinInput}
            value={confirmPin}
            onTextChange={code => setConfirmPin(code)}
          />
        </View>
      </View>

      
      <View style={{ marginTop: 40 , marginBottom: 20}}>
      <Button
          labelStyle={{ color: "#363636", fontSize: 15, fontFamily: 'Montserrat-Bold',}}
          dark={true}
          color='#FAE9D7'
          onPress={createPin}
          label='Create'
        />
        </View>

      </KeyboardAvoidingView>

      </ScrollView>
      </View>
  )

}

export default CreatePin

