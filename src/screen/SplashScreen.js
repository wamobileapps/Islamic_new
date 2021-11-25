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
    getData()
getUser()
getPrayerList()

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

    // const getData = async () => {
    //   const token = await AsyncStorage.getItem('token')
    //   console.log("auth token bio", token)
  
    //   axios.get( 'http://112.196.64.119:8000/api/user/setting/view', {
    //     headers: {
    //       'auth-token': token
    //     }
    //   })
    //     .then((response) => {
    //     console.log(" city response ata1===>", response.data);
    //     global.resposneData = response.data
    //      global.cityData = response.data[0].city
  
  
    //     })
    //     .catch((error) => {
    //       console.log('error', error)
    //     })
  
  
  
  
  
  
    // }
    
    const getData = async () => {
      const token = await AsyncStorage.getItem('token')
      console.log("auth token bio", token)
  
      axios.get('http://112.196.64.119:8000/api/user/setting/view', {
        headers: {
          'auth-token': token
        }
      })
        .then((response) => {
          console.log("prayer response===x>", response);
          if(response.data == ''){
  
            console.log("prayer response===x>", response);
          }
          else {
  
          var date = new Date();
          var month = date.getMonth() + 1
          var year = date.getFullYear()
  
  
          global.resposneData = response.data
          global.calCity= response.data[0].city
          global.calCountry= response.data[0].country
          global.calAsr= response.data[0].asr_method
          global.calMonth= response.data[0].go_to
          global.calYear= year
          axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
          .then((res) => {
    
    
            global.prayerDat = res.data.data
            console.log("prayer response===x> s", global.prayerDat, global.calMonth);
    
    
          })
  
        }
        })
        .catch((error) => {
          console.log('error', error)
        })
  
  
  
  
  
  
    }

    const getPrayerList = async () => {
      const token = await AsyncStorage.getItem('token')
  
      axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
        headers: {
          'auth-token': token
        }
      })
        .then((response) => {
          console.log("setting response data===>", response.data.data[0]);
          global.fajrrBegins = response.data.data[0].type1.begins_time
          global.fajrrJamah = response.data.data[0].type1.jamah_time
          global.fajrrAlarm = response.data.data[0].type1.alarm_time
          global.fajrPrayer = response.data.data[0].type1.prayerTime
  
          global.zuhrBegins = response.data.data[0].type2.begins_time
          global.zuhrJamah = response.data.data[0].type2.jamah_time
          global.zuhrAlarm = response.data.data[0].type2.alarm_time
          global.duhrPrayer = response.data.data[0].type2.prayerTime
  
          global.asrBegins = response.data.data[0].type3.begins_time
          global.asrJamah = response.data.data[0].type3.jamah_time
          global.asrAlarm = response.data.data[0].type3.alarm_time
          global.asrPrayer = response.data.data[0].type3.prayerTime
  
          global.maghribBegins = response.data.data[0].type4.begins_time
          global.maghribJamah = response.data.data[0].type4.jamah_time
          global.maghribAlarm = response.data.data[0].type4.alarm_time
          global.magribPrayer = response.data.data[0].type4.prayerTime
  
          global.ishaBegins = response.data.data[0].type5.begins_time
          global.ishaJamah = response.data.data[0].type5.jamah_time
          global.ishaAlarm = response.data.data[0].type5.alarm_time
          global.ishaPrayer = response.data.data[0].type5.prayerTime
  
          // global.ishaBegins = response.data.data[0].type5.begins_time
          // global.ishaJamah = response.data.data[0].type5.jamah_time
          // global.ishaAlarm = response.data.data[0].type5.alarm_time
          global.sunPrayer = response.data.data[0].type6.prayerTime
  
  
  
          // props.navigation.navigate('Drawer')
        })
  
        .catch((error) => {
          console.log('error', error)
        })
    }

  
    const getUser= async()=>{
      getData()
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