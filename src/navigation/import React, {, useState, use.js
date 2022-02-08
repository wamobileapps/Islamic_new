import React, { Component, useState, useRef, useEffect } from 'react';
import { useWindowDimensions, View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import ChangePassword from "../screen/ChangePassword";
import Home from '../screen/HomeScreen';
import AsyncStorage from "@react-native-community/async-storage";
import BottomTabs from './BottomNavigation'
const Drawer = createDrawerNavigator();
import { baseUrl } from '../Api/COntstant';
import axios from 'axios';
import moment from 'moment';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

global.CategoryList = []
let your_data = []
var videoData = []
var arrayOfArrays = [];
var countryArray = [];
global.moodData = []

const MyDrawer=({navigation})=> {
  const [name, setName] = useState('')
  const[number, setNumber] = useState('')
  const[imageUser, setUserImage] = useState('')



  useEffect(()=>{
    

    const unsubscribe = navigation.addListener('focus', () => {
      getProfile()
  });

  return unsubscribe;
}, [navigation]);
     

const changeTimeFormat = (timeString) => {
  var H = +timeString.substr(0, 2);
  var h = H % 12 || 12;
  timeString = h + timeString.substr(2, 3);

  var hr = timeString.slice(0, 2)
  var min = timeString.slice(2, 5)
  console.log("time", hr, timeString);
  var trimhr = hr.replace(':','');
  var trimMin = min.replace(':','')
  var totalValFajeBegins = `${trimhr.length == 2 ? trimhr : `0${trimhr}`}:${trimMin.length == 2 ? trimMin : `0${trimMin}`}`
  // global.fajrrBegins =totalValFajeBegins
 console.log("time string data ", totalValFajeBegins, timeString, H, h, hr, min);
  return totalValFajeBegins;

}


  const getProfile=async()=>{
    


    global.moodData = []
    getGraphData()
    moodGraph()
    getDataMonth()
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

   var data = '';

       
      
      axios.post('http://112.196.64.119:8000/api/user/me', data, {
        headers: {
        "auth-token": token
    }})      
      .then((response) => {
        console.log('response',response.data)
        setName(response.data.name)
        setNumber(response.data.mobile_number)
        setUserImage(response.data.profile_image)
        // global.userImage = response.data.profile_image

      })
      .catch((error) => {
        console.log('error',error)
        // dispatch(userUpdateProfileFail())

      })


  }


  const getLondonTime1 = async () => {
    const dayData = []
    const fajrData = []
    const sunhrData = []
    const duhrData = []
    const asrData = []
    const magrbData = []
    const ishaData = []
    const colData = []


    var date = new Date().getMonth() + 1
    console.log("date l=====> ", global.calMonth);
    axios.get(`https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.calMonth}&24hours=false`)
      .then((response) => {
        global.prayerDat = response.data.times
        global.calendarPrayerData = response.data.times

        
       var c = []
        var a  = Object.keys(global.calendarPrayerData).reverse()
        .reduce((obj, key) => {
          obj[key] = response.data.times[key];
       

         
          var fajr = response.data.times[key].fajr
          var sunhr = response.data.times[key].sunrise
          var dhuhr = response.data.times[key].dhuhr
          var asr = response.data.times[key].asr
          var maghrib = response.data.times[key].magrib
          var isha = response.data.times[key].isha
     
          fajrData.push(fajr)
          sunhrData.push(sunhr)
          duhrData.push(dhuhr)
          asrData.push(asr)
          magrbData.push(maghrib)
          ishaData.push(isha)
          colData.push(moment(response.data.times[key].date).format("DD"))

          // global.fData = fajrData.reverse()
          // global.sData = sunhrData.reverse()
          // global.dData = duhrData.reverse()
          // global.aData = asrData.reverse()
          // global.mData = magrbData.reverse()
          // global.iData = ishaData.reverse()
          // global.colData = colData.sort()

          global.fData = fajrData
          global.sData = sunhrData
          global.dData = duhrData
          global.aData = asrData
          global.mData = magrbData
          global.iData = ishaData
          global.colData = colData
          
          // global.fData = fajrData.sort()
          // global.sData = sunhrData.sort()
          // global.dData = duhrData.sort()
          // global.aData = asrData.sort()
          // global.mData = magrbData.sort()
          // global.iData = ishaData.sort()
          // global.colData = colData.sort()
         


          return obj;
        }, {});
        
        console.log("london time===>", Object.keys(global.calendarPrayerData).reverse());
        

        var filtered;
        console.log(typeof response.data);
        var currentDate = []
        var filterArr = []
        currentDate.push(moment().format("DD"))
         var mon = global.calMonth.length == 2 ? global.calMonth : `0${global.calMonth}`
        
        var finalDate = `${2021}-${mon}-${currentDate}`
        console.log("finalDate", finalDate);
        filtered = Object.keys(response.data.times)
          .filter(key => finalDate.includes(key))
          .reduce((obj, key) => {
            obj[key] = response.data.times[key];
            return obj;
          }, {});

        console.log("filtered", filtered);
        filterArr.push(filtered)

        filterArr.map((i) => {
          console.log(i[finalDate].fajr)
          // global.fajr = i[currentDate[0]].fajr
          global.fajrrBegins = i[finalDate].fajr
          global.fajrrJamah = i[finalDate].fajr_jamat
          global.fajrrAlarm = "-"

          global.zuhrBegins = i[finalDate].dhuhr
          global.zuhrJamah = i[finalDate].dhuhr_jamat
          global.zuhrAlarm = "-"

          global.asrBegins = i[finalDate].asr
          global.asrJamah = i[finalDate].asr_jamat
          global.asrAlarm = "-"

          global.maghribBegins = i[finalDate].magrib
          global.maghribJamah = i[finalDate].magrib_jamat
          global.maghribAlarm = "-"

          global.ishaBegins = i[finalDate].isha
          global.ishaJamah = i[finalDate].isha_jamat
          global.ishaAlarm = "-"

          global.sun = i[finalDate].sunrise
          // global.zuhr = i[currentDate[0]].dhuhr
          // global.asr = i[currentDate[0]].asr
          // global.maghrib = i[currentDate[0]].magrib
          // global.isha = i[currentDate[0]].isha

          axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
            headers: {
              'auth-token': token
            }
          })
            .then((response) => {
              console.log("resonse prayer data", response.data);
              if(response.data.data.length == 0){
              
              }
              else{
                convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
              convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
              convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
              convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
              convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
              global.sun = response.data.data[0].type6.prayerTime
              }



              console.log(global.fajrrBegins, global.ishaJamah);


            })

            .catch((error) => {
              console.log('error', error)
            })
        
        })
        // console.log("get london time====>", response.data.times,  moment().format("YYYY-MM-DD"), Object.values(response.data.times).includes('2021-11-29'));
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

    totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ? totalFajrBegingsHour : `0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ? totalFajrBegingsMinutes : `0${totalFajrBegingsMinutes}`}`
    global.fajrrBegins = totalValFajeBegins


    var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
    var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
    var totalValFajeJammah
    totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ? totalFajrJamaahHour : `0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ? totalFajrJammahMinutes : `0${totalFajrJammahMinutes}`}`
    global.fajrrJamah = totalValFajeJammah




    var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
    var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
    var totalValFajeAlarm
    totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.fajrrAlarm = totalValFajeAlarm

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

    totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ? totalFajrBegingsHour : `0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ? totalFajrBegingsMinutes : `0${totalFajrBegingsMinutes}`}`
    global.zuhrBegins = totalValFajeBegins




    var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
    var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
    var totalValFajeJammah
    totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ? totalFajrJamaahHour : `0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ? totalFajrJammahMinutes : `0${totalFajrJammahMinutes}`}`
    global.zuhrJamah = totalValFajeJammah




    var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
    var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
    var totalValFajeAlarm
    totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.zuhrAlarm = totalValFajeAlarm





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

    totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ? totalFajrBegingsHour : `0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ? totalFajrBegingsMinutes : `0${totalFajrBegingsMinutes}`}`
    global.asrBegins = totalValFajeBegins




    var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
    var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
    var totalValFajeJammah
    totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ? totalFajrJamaahHour : `0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ? totalFajrJammahMinutes : `0${totalFajrJammahMinutes}`}`
    global.asrJamah = totalValFajeJammah




    var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
    var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
    var totalValFajeAlarm
    totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.asrAlarm = totalValFajeAlarm







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

    totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ? totalFajrBegingsHour : `0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ? totalFajrBegingsMinutes : `0${totalFajrBegingsMinutes}`}`
    global.maghribBegins = totalValFajeBegins




    var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
    var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
    var totalValFajeJammah
    totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ? totalFajrJamaahHour : `0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ? totalFajrJammahMinutes : `0${totalFajrJammahMinutes}`}`
    global.maghribJamah = totalValFajeJammah




    var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
    var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
    var totalValFajeAlarm
    totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.maghribAlarm = totalValFajeAlarm







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

    totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ? totalFajrBegingsHour : `0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ? totalFajrBegingsMinutes : `0${totalFajrBegingsMinutes}`}`
    global.ishaBegins = totalValFajeBegins




    var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
    var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
    var totalValFajeJammah
    totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ? totalFajrJamaahHour : `0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ? totalFajrJammahMinutes : `0${totalFajrJammahMinutes}`}`
    global.ishaJamah = totalValFajeJammah




    var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
    var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
    var totalValFajeAlarm
    totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.ishaAlarm = totalValFajeAlarm





  }
  
  const getDataMonth=()=>{

    const dayData = []
    const fajrData = []
    const sunhrData = []
    const duhrData = []
    const asrData = []
    const magrbData = []
    const ishaData = []
    const colData = []


    var date = new Date();
    global.month = date.getMonth()
  
    var lMonth = parseInt(global.calMonth)
    var lMonthh = global.calMonth
    global.calYear = moment().format('YYYY')
  
    var firstDay =
      new Date(date.getFullYear(),lMonth - 1, 1);

    var lastDay =
      new Date(date.getFullYear(),lMonth , 0);

      console.log("get month daya--->",firstDay);

      global.selectMonth =  moment(lMonth, 'MM').format('MMM'); 
      var monthh  = moment(lMonth, 'MM').format('MMM')
      var month = moment(firstDay).format("MMM")
    var start_date = moment(firstDay).format("DD"); 
    var year = moment(firstDay).format("YYYY");

    var last_date = moment(lastDay).format("DD"); 
   global.last_date = last_date

    var s_Date= `${start_date} ${monthh} ${year} -`
    global.sDate = s_Date

    
    var l_Date= ` ${last_date} ${monthh} ${year}`
    global.lDate = l_Date

    if(global.london == "London Unified Prayer Time"){
   
      getLondonTime1()
    }
    else{

      console.log("djxnjkcn-", `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.calMonth}&year=2021`);
    axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.calMonth}&year=${global.calYear}`)
      .then((res) => {
     
        var d = moment().format("DD")
        console.log("daaaaaaaa======>", res)
        res.data.data.map((item)=>{
            if(item.date.readable.includes(d)){
              console.log("hdcj===========>", item.timings.Fajr, `http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`);


              global.fajrrBegins = changeTimeFormat(item.timings.Fajr);
              global.fajrrJamah = changeTimeFormat(item.timings.Fajr);
              global.fajrrAlarm = "-"
              
              global.asrBegins = changeTimeFormat(item.timings.Asr);
              global.asrJamah = changeTimeFormat(item.timings.Asr);
              global.asrAlarm = "-"
      
              global.zuhrBegins = changeTimeFormat(item.timings.Dhuhr);
              global.zuhrJamah = changeTimeFormat(item.timings.Dhuhr);
              global.zuhrAlarm = "-"
      
              global.maghribBegins = changeTimeFormat(item.timings.Maghrib);
              global.maghribJamah = changeTimeFormat(item.timings.Maghrib);
              global.maghribAlarm = "-"
      
              global.ishaBegins = changeTimeFormat(item.timings.Isha);
              global.ishaJamah = changeTimeFormat(item.timings.Isha);
              global.ishaAlarm = "-"
              global.sun = item.timings.Sunrise.slice(0,5)
            }
            console.log("response=====>", item.date.readable.slice(0,3), item, d, item.date.readable.includes(d));
          })

          axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
                  headers: {
                    'auth-token': token
                  }
                })
                  .then((response) => {
                    console.log("resonse prayer data setting", response.data);
                    if(response.data.data.length == 0){
                    
                    }
                    else{
                      convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
                    convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
                    convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
                    convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
                    convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
                    global.sun = response.data.data[0].type6.prayerTime
                    }
      
                        // props.navigation.navigate('Drawer')
                        
                    // console.log(global.fajrrBegins, global.ishaJamah);
                    console.log("resonse prayer data", global.fajrrBegins);
      
                  })
      
                  .catch((error) => {
                    console.log('error', error)
                  })
        
        global.prayerDat = res.data.data
        global.calendarPrayerData = res.data.data
        
        global.calendarPrayerData.forEach(function (val, i) {

          console.log("prayer next if data ====>", global.prayerDat);
          colData.push(i + 1)
         
          var d = val.date.gregorian.weekday.en.slice(0, 3)
          var fajr = val.timings.Fajr.slice(0, 5)
          var sunhr = val.timings.Sunrise.slice(0, 5)
          var dhuhr = val.timings.Dhuhr.slice(0, 5)
          var asr = val.timings.Asr.slice(0, 5)
          var maghrib = val.timings.Maghrib.slice(0, 5)
          var isha = val.timings.Isha.slice(0, 5)
          dayData.push(d)
          fajrData.push(fajr)
          sunhrData.push(sunhr)
          duhrData.push(dhuhr)
          asrData.push(asr)
          magrbData.push(maghrib)
          ishaData.push(isha)
    
          global.dayData = dayData
          global.fData = fajrData
          global.sData = sunhrData
          global.dData = duhrData
          global.aData = asrData
          global.mData = magrbData
          global.iData = ishaData
          global.colData = colData
    
          console.log("pre column datas===>", dayData, fajrData);
      console.log('previous else');

        })
        // setMan(res.data.data)
      })
    }


  }

  const moodGraph = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    axios.get(baseUrl + `moodGraph`, {
        headers: {
            'auth-token': token
        }
    })
        .then((res) => {

         console.log("graph data===>", res.data);

          
          var videoData = []
          var ratinglength = []
          var ratingArray = []
          var rootArray = [];
          var len = res.data.length;
          for (let ii = 0; ii < len; ii++) {

            var date = moment(res.data[ii].date).format('DD')
           
            ratinglength = res.data[ii].rating;
            var  a = (30 - ratinglength.length)
           

            for (let i = 1; i <= a; i++) {
             
                if(ratinglength.length <= i){
                  ratinglength.push(0);
                  // ratingArray.push(0)
                    }
                    
                    console.log("arrayOfArrayss: ",ratinglength);
            }
            
            for (let index = 0; index < 30; index++) {
              var d = Array(30).fill(date)

            }

           
            
            var videoItem = { x: d, y: ratinglength }
            rootArray.push(videoItem)
           

            var myarray = [];
        
    for (let i = 0; i < rootArray.length; i++) {
      for (let j = 0; j < rootArray[i].x.length; j++) {
        var d ={x: rootArray[i].x[j],  y : rootArray[i].y[j] }
        myarray.push(d);
      }

    }

    var arrayOfArrays = [];
    var arrayOfArrayss = []
    for (let id = 0; id < myarray.length; id += 30) {
      arrayOfArrays.push(myarray.slice(id, id + 30));
    }
  
            // console.log("mood data graph===>",arrayOfArrayss);
           
           
            // global.moodData = videoData
            // videoData.push(ratinglength);
        }
       

        var myarrayy = [];
        for (let i = 0; i <= 30; i++) {
          for (let j = 0; j < arrayOfArrays.length; j++) {
            myarrayy.push(arrayOfArrays[j][i]);
            // console.log(j,i);
          
          }
    
        }
    
    
        myarrayy = myarrayy.filter(function (element) {
          return element !== undefined;
        });
    
        var size = arrayOfArrays.length;
        for (let i = 0; i < myarrayy.length; i += size) {
          arrayOfArrayss.push(myarrayy.slice(i, i + size));
        }
    
    global.moodData = arrayOfArrayss

       
        })
        .catch((error) => {
            console.log('error', error)
        })
}


  const getGraphData = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token bio", token)

    axios.get('http://112.196.64.119:8000/api/user/dailyUpdate/graph', {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            console.log('response graph list==>', response.data)

            const arrayData = []
            const arrayColor = []
            const arrayData2 = [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5];


            if (response.data.data.length === 0) {
                response.data.CategoryList.map((item, index) => {
                    item.consumed_hrs = 0
                    arrayColor.push(entry.color)
                    arrayData.push({ x: item.consumed_hrs, y: 5, label: `${Math.round(item.consumed_hrs)}%` });
                })


            }
            else {
                const newArrayData = response.data.CategoryList.map(function (entry) {
                    for (var i = 0; i < response.data.data.length; i++) {

                        if (entry._id === response.data.data[i].activitycategories._id) {


                            const totalRating = (parseInt(response.data.data[i].consumed_hrs) / 15) * 10
                            entry.consumed_hrs = isNaN(totalRating) ? 0 : totalRating
                            
                             console.log("===>totalRating", totalRating);
                            break
                        }
                        else {
                            entry.consumed_hrs = 0
                            //   break
                        }

                    }



                    // 
                    return entry;
                });

                for (var i = 0; i < response.data.CategoryList.length; i++) {

                    let entry = response.data.CategoryList[i]
                    console.log("array data==>", entry.color);
                    arrayColor.push(entry.color)
                    arrayData.push({ x: entry.consumed_hrs, y: 5, label: `${Math.round(entry.consumed_hrs)}%` });
                  }
                  // console.log("===>", global.colorList);

               
            }

            console.log("category type===>", response.data.CategoryList);
            global.CategoryList = response.data.CategoryList
            global.list = arrayData
            global.colorData = arrayColor
            console.log("list----> d", global.colorData);

        })
        .catch((error) => {
            console.log('error', error)
        })
}

  const logout = async () => {
    await AsyncStorage.setItem('token', '')
    navigation.navigate('Login')

  }


  const CustomDrawerContent = (props) => {
    const width = 282;
    const height = 138;
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: '#fff2df', flex: 1 }} >
          <ImageBackground source={require('../images/drawerBack.png')}
            style={{ backgroundColor: '#fff2df', width: width, height: height, }}>
            <>

              <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', padding: 10, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', }}>
                  <Image source={{uri: imageUser ? `http://112.196.64.119:8000/users/${imageUser}` : 'https://www.w3schools.com/howto/img_avatar.png' }} style={{ width: 54, height: 54, borderRadius: 27, }} />

                  <View style={{ marginLeft: 10, width: '50%',  }}>
                    <View style={{ }}>
                    <Text style={{ fontSize: 13, fontFamily: 'Montserrat-SemiBold',  }}>{name}</Text>
                    <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium' }}>{number}</Text>
                    </View>



                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center' }}>
                      <TouchableOpacity onPress={()=> navigation.navigate('UserProfile')} style={{ flexDirection: 'row', }}>
                        <Icon  name='edit' type='AntDesign' color='#C28647' size={12} style={{}} />
                        <Text style={{ marginLeft: 3, color: '#C28647', fontSize: 10, fontFamily: 'Montserrat-SemiBold' }}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15 }} onPress={() => logout()}>
                        <Image source={require('../images/logout.png')} style={{ width: 12, height: 12 }} />
                        <Text style={{ marginLeft: 2, color: '#C28647', fontSize: 10, fontFamily: 'Montserrat-SemiBold' }}>Logout</Text>
                      </TouchableOpacity>

                    </View>
                  </View>

                  <Icon name='closecircleo' type='AntDesign' color='#454545' onPress={() => props.navigation.closeDrawer()} size={20} style={{ marginLeft: 20, marginRight: 10 }} />


                </View>

              </View>

              <View style={{ borderBottomWidth: 1, borderBottomColor: '#EBD6C0', marginLeft: 20, marginRight: 20, marginTop: 6 }} />


            </>

          </ImageBackground>



          <View style={{ backgroundColor: 'white', height: 800,  }}>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
              <Image source={require('../images/youIcon.png')} style={{ width: 7, height: 19, marginLeft: 12 }} />
              <Text style={{ marginLeft: 23, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>You</Text>
            </View>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Nafz')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15, }}>
              <Image source={require('../images/nafz.png')} style={{ width: 14, height: 12, marginLeft: 12 }} />
              <Text style={{ marginLeft: 16, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Nafz</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Setting')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15,  }}>
              <Image source={require('../images/akhlaq.png')} style={{ width: 25, height: 14, marginLeft: 5 }} />
              <Text style={{ marginLeft: 12, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Akhlaq </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('MyLifePlanGraph')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/Plan.png')} style={{ width: 18, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>My Life Plan</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Self')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/self.png')} style={{ width: 16, height: 18, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Self Psychology</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Goal')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/goal.png')} style={{ width: 15, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>My Life Goal</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Tree')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/tree.png')} style={{ width: 17, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>My Tree</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('MyMoodGraph')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/goal.png')} style={{ width: 15, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>My Mood Graph</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Setting')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/goal.png')} style={{ width: 15, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Prayer Times Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('PrayerSetting')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/goal.png')} style={{ width: 15, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Calendar</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/blog.png')} style={{ width: 16, height: 17, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Blog</Text>
            </View>

            <TouchableOpacity onPress={()=>props.navigation.navigate('News')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/news.png')} style={{ width: 16, height: 17, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>News</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('TVScreen')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/tv.png')} style={{ width: 16, height: 17, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>TV</Text>
            </TouchableOpacity>

            
            {/* <Image source={require('../images/logout.png')} style={{ width: 12, height: 12 }} />

            <DrawerItem
              style={{
                position: 'absolute',
                left: 0,
                width: width,
                height: width,
              }}
              label="Screen2"
              labelStyle={{ color: '#609806' }}
              onPress={() => {
                props.navigation.navigate('Signup');
              }}
            /> */}
          </View>


        </View>
      </DrawerContentScrollView>
    );
  }


  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>

      <Drawer.Screen name="BottomTabs" component={BottomTabs} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
});

export default MyDrawer