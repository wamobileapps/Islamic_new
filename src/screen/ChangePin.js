import React, { useState, useRef } from 'react';
import { View, Text, ImageBackground, KeyboardAvoidingView, ScrollView} from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import SmoothPinCodeInput from 'react-native-smooth-pincode-input'
import { InputX, Button } from '../components/index';
import { baseUrl } from '../Api/COntstant';

const upImage = require('../images/sign1.png')

const ChangePin = (props) => {
  const [code, setCode] = useState('')
  const [currentPin , setCurrentPin] = useState('')
  const [newPin , setNewPin] = useState('')
  const [confirmPin , setConfirmPin] = useState('')
  const [ token, settoken] = useState('')

  const pinInput = useRef();


  const getProfile=async()=>{
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)
  
   var data = '';
  
       
      
      axios.post(baseUrl+ 'me', data, {
        headers: {
        "auth-token": token
    }})      
      .then((response) => {
        console.log('response',response.data)
        settoken(response.data.token)
        // global.userImage = response.data.profile_image
  
      })
      .catch((error) => {
        console.log('error',error)
        // dispatch(userUpdateProfileFail())
  
      })
  
  
  }


  const updatePin=async ()=>{
    getProfile()
    const loginPin = await AsyncStorage.getItem('pin')
    console.log("login pin===>", loginPin, token)
    if(loginPin == token){
    const token = await AsyncStorage.getItem('token')
        var params = null

        // console.log(token)
    
        params = {
          "old_pin": currentPin,
          "token": newPin,
          "confirm_token": confirmPin
      }
    
        var headers = {
          "auth-token": token
        }
    
        axios.patch(baseUrl+ `changePin/${global.id}`, params, {
          headers
        }).then(async(res) => {
          alert(res.data.msg)
          await AsyncStorage.setItem('pin', newPin)
          await AsyncStorage.setItem('loginToken', newPin)
          props.navigation.goBack()
          console.log("res-----", res.data.msg)
        })
      }
      else{
        alert("Current Pin is incorrect")
      }
      
  }




  return (

    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <ImageBackground source={upImage} style={{ width: '100%', height: 230, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>

        <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', marginTop: '25%', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Change Your</Text>
        <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Pin</Text>

      </ImageBackground>


      <ScrollView style={{}}>
      <KeyboardAvoidingView style={{backgroundColor: 'white'}} behavior="padding" enabled >

      <View style={{ marginTop: 50, margin: 20, marginRight: 20, backgroundColor: 'white' }}>

        <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', color: '#363636' }}>Current Pin</Text>
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
            codeLength={5}
            ref={pinInput}
            value={currentPin}
            onTextChange={code => setCurrentPin(code)}
          />
        </View>
      </View>

      <View style={{ marginTop: 30, margin: 20, marginRight: 20, backgroundColor: 'white' }}>

        <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', color: '#363636' }}>New Pin</Text>
        <View style={{ marginTop: 20, alignItems: 'center'  }}>

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
            value={newPin}
            onTextChange={code => setNewPin(code)}
          />
        </View>
      </View>

      <View style={{ marginTop: 30, margin: 20, marginRight: 20, backgroundColor: 'white' }}>

        <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', color: '#363636' }}>Confirm Pin</Text>
        <View style={{ marginTop: 20, alignItems: 'center'  }}>

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
          onPress={updatePin}
          label='Update'
        />
        </View>

      </KeyboardAvoidingView>

      </ScrollView>

      
    </View>
  )

}

export default ChangePin

