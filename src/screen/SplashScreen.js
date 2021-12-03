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
  

          console.log("response of maual prayer time", response.data.data); //[]
        convertFajrTime(response.data.data[0].type1.prayerTime, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
        convertDuhrTime(response.data.data[0].type2.prayerTime, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
        convertAsrTime(response.data.data[0].type3.prayerTime, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
        convertMaghribTime(response.data.data[0].type4.prayerTime, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
        convertIshaTime(response.data.data[0].type5.prayerTime, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
        global.sun = response.data.data[0].type6.prayerTime
  
          // props.navigation.navigate('Drawer')
        })
  
        .catch((error) => {
          console.log('error', error)
        })
    }


    const convertFajrTime = (getFajr, begins, jamah, alarm) => {

      var getHours = getFajr.slice(0, 2) //4
      var getMinutes = getFajr.slice(3, 5) //53
      var totalMin = (60 * getHours) //240
      var sum = parseInt(totalMin) + parseInt(getMinutes) //293
      var fajrBeginsValCheck = begins 
      var fajrjamahValCheck = jamah 
      var fajralarmValCheck = alarm 
  
  
      var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
      var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
      var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)
  
  
      // alert(fajrTotalBegins)
      var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
      var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
      var totalValFajeBegins
  
      totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
            global.fajrrBegins =totalValFajeBegins
           
  
  
  
      var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
      var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
      var totalValFajeJammah
      totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
      global.fajrrJamah =totalValFajeJammah
  
     
  
  
      var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
      var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
      var totalValFajeAlarm
      totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
      global.fajrrAlarm =totalValFajeAlarm
  
    }
  
  
    
  
  
    const convertDuhrTime = (getFajr, begins, jamah, alarm) => {
  
      var getHours = getFajr.slice(0, 2) //4
      var getMinutes = getFajr.slice(3, 5) //53
      var totalMin = (60 * getHours) //240
      var sum = parseInt(totalMin) + parseInt(getMinutes) //293
  
  
      var fajrBeginsValCheck = begins 
      var fajrjamahValCheck = jamah 
      var fajralarmValCheck = alarm
  
  
      var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
      var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
      var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)
  
  
      console.log("fajr time----", fajrTotalBegins);
  
      var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
      var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
      var totalValFajeBegins
  
      totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
            global.zuhrBegins =totalValFajeBegins
           
  
  
  
      var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
      var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
      var totalValFajeJammah
      totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
      global.zuhrJamah =totalValFajeJammah
  
     
  
  
      var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
      var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
      var totalValFajeAlarm
      totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
      global.zuhrAlarm =totalValFajeAlarm
  
  
  
  
     
    }
  
  
    const convertAsrTime = (getFajr, begins, jamah, alarm) => {
  
      var getHours = getFajr.slice(0, 2) //4
      var getMinutes = getFajr.slice(3, 5) //53
      var totalMin = (60 * getHours) //240
      var sum = parseInt(totalMin) + parseInt(getMinutes) //293
  
  
  
      var fajrBeginsValCheck = begins 
      var fajrjamahValCheck = jamah 
      var fajralarmValCheck = alarm 
  
  
      var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
      var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
      var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)
  
  
      console.log("fajr time----", fajrTotalBegins);
  
      var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
      var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
      var totalValFajeBegins
  
      totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
            global.asrBegins =totalValFajeBegins
           
  
  
  
      var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
      var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
      var totalValFajeJammah
      totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
      global.asrJamah =totalValFajeJammah
  
     
  
  
      var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
      var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
      var totalValFajeAlarm
      totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
      global.asrAlarm =totalValFajeAlarm
  
  
  
  
  
     
  
    }
  
  
    const convertMaghribTime = (getFajr, begins, jamah, alarm) => {
  
      var getHours = getFajr.slice(0, 2) //4
      var getMinutes = getFajr.slice(3, 5) //53
      var totalMin = (60 * getHours) //240
      var sum = parseInt(totalMin) + parseInt(getMinutes) //293
  
  
  
      var fajrBeginsValCheck = begins 
      var fajrjamahValCheck = jamah 
      var fajralarmValCheck = alarm 
  
  
      var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
      var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
      var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)
  
  
      console.log("fajr time----", fajrTotalBegins);
  
      var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
      var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
      var totalValFajeBegins
  
      totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
            global.maghribBegins =totalValFajeBegins
           
  
  
  
      var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
      var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
      var totalValFajeJammah
      totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
      global.maghribJamah =totalValFajeJammah
  
     
  
  
      var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
      var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
      var totalValFajeAlarm
      totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
      global.maghribAlarm =totalValFajeAlarm
  
  
  
      
  
  
  
    }
  
  
    const convertIshaTime = (getFajr, begins, jamah, alarm) => {
  
      var getHours = getFajr.slice(0, 2) //4
      var getMinutes = getFajr.slice(3, 5) //53
      var totalMin = (60 * getHours) //240
      var sum = parseInt(totalMin) + parseInt(getMinutes) //293
  
  
      var fajrBeginsValCheck = begins 
      var fajrjamahValCheck = jamah 
      var fajralarmValCheck = alarm 
  
  
      var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
      var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
      var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)
  
  
      console.log("fajr time----", fajrTotalBegins);
  
      var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
      var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
      var totalValFajeBegins
  
      totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
            global.ishaBegins =totalValFajeBegins
           
  
  
  
      var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
      var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
      var totalValFajeJammah
      totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
      global.ishaJamah =totalValFajeJammah
  
     
  
  
      var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
      var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
      var totalValFajeAlarm
      totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
      global.ishaAlarm =totalValFajeAlarm
  
  
  
  
  
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