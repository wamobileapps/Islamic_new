import React, { useEffect } from 'react';
import { View, Image } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
const bg = require('../images/bg.png')
import Orientation from 'react-native-orientation';

const Splash = (props) => {

    useEffect(async()=>{
      const value = await AsyncStorage.getItem('token')
    console.log("TOKEN", value)
    Orientation.lockToPortrait();

getUser()
const token = await AsyncStorage.getItem('token')

global.tokenVal = token
    setTimeout(() => {
      // if(value){
      //   console.log("if")
      //   if(value === ''){
      //     console.log(" if--")
      //     props.navigation.navigate("Login")
      //    }else{
      //      console.log("else if")
      //     global.token = value





          props.navigation.navigate("Logo")
      //    }
      // }else{
      //   console.log("else")
      //   props.navigation.navigate("Login")
      // }
       
    }, 3000)
       
    })
  
    const getUser= async()=>{
      const token = await AsyncStorage.getItem('token')
      console.log("auth token", token)
  
      var data = '';
  
      axios.post('http://112.196.64.119:8000/api/user/me', data, {
        headers: {
        "auth-token": token
    }})      
      .then(async(response) => {
        console.log('response user data',response.data)
        await AsyncStorage.setItem('pin', response.data.token)
        global.pin = response.data.token
        global.id = response.data._id
        global.userName = response.data.name
        global.email = response.data.email
        global.password = response.data.password
  
      })
      .catch((error) => {
        console.log('error',error)
      })
    }


  return (
    <View style={{flex: 1, backgroundColor: '#FAE9D7', alignItems: 'center', justifyContent:'center'}}>
        <Image source={require('../images/splash.png')}   />
    </View>

  )

}

export default Splash