
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, ActivityIndicator, FlatList, StatusBar, } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import { baseUrl } from '../Api/COntstant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import Iconback from 'react-native-vector-icons/Entypo';
import moment from 'moment';
import SpinnerModal from '../components/SpinnerModal';


const data = [
  {
    name: 'Hanafi',
    index: 0,
    id: 1
  },
  {
    name: 'Shafi',
    index: 1, id: 2
  }
]

let selectId = ''
let selectItemm = ''

function Setting(props) {
  const [isLoading, setisLoading] = useState(true)
  const [goToData, setGoToData] = useState('')
  const [timing, setTiming] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [latitudeValue, setLatitudeValue] = useState(false)
  const [selectedAsarMethod, setSelectedAsarMethod] = useState('Hanafi')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState(false)
  const [visibleM, setVisibleM] = useState(false)
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [items, setItems] = useState([
    { label: 'Middle of the Night Method', value: '1' },
    { label: 'One Seventh Rule', value: '2' },
    { label: 'Angle Based Method', value: '3' }
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: 'London Unified Prayer Time', value: 'London Unified Prayer Time' },
    { label: 'University of Islamic Sciences, Karachi', value: '1' },
    { label: 'Islamic Society of North America (ISNA)', value: '2' },
    { label: 'Muslim World League (MWL)', value: '3' },
    { label: 'Umm al-Qura, Makkah', value: '4' },
    { label: 'Egyptian General Authority of Survey', value: '5' },
    { label: 'Institute of Geophysics, University of Tehran', value: '6' },
    { label: 'Gulf Region', value: '7' },
    { label: 'Kuwait', value: '8' },
    { label: 'Qatar', value: '9' },
    { label: 'Majlis Ugama Islam Singapura, Singapore', value: '10' },
    { label: 'Union Organization Islamic de France', value: '11' },
    { label: 'Diyanet İşleri Başkanlığı, Turkey', value: '12' },
    { label: 'Spiritual Administration of Muslims of Russia', value: '13' },
    { label: 'Shia Ithna-Ashari', value: '14' }
  ]);

  const [openM, setOpenM] = useState(false);
  const [valueM, setValueM] = useState(null);
  const [itemsM, setItemsM] = useState([
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'Octobar', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
  ]);

  

  useEffect(() => {
    setSelectedId(null)
    console.log("user id====>", global.userId);

    getViewSettingData()
  }, []);



  const getViewSettingData = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    axios.get('http://112.196.64.119:8000/api/user/setting/view', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log('view response data=====>', response.data)
        if (response.data.length !== 0) {
          global.calCity = response.data[0].city
          global.calCountry = response.data[0].country
          setCountry(response.data[0].country)
          setCity(response.data[0].city)
          // setValueM(response.data[0].go_to)
          setValue(response.data[0].high_lat_method)
          setValue1(response.data[0].prayer_method)
          setisLoading(false)
        }
        else {
          setisLoading(false)
        }
      })
      .catch((error) => {
        console.log('error', error)
        // dispatch(userUpdateProfileFail())

      })
  }

  const selectItem = (id, item) => {
    setSelectedId(id)
    selectId = id
    selectItemm = item.id
    saveSettingData()
  }

  const saveSettingData = async () => {

    console.log("Fajrrr data====>", global.fajrrBegins, global.fajrrJamah, global.fajrrAlarm);
    console.log("sunriseeee data====>", global.sunriseeBegins, global.sunriseeJamah, global.sunriseeAlarm);
    console.log("dhuhrrrr data====>", global.zuhrBegins, global.zuhrJamah, global.zuhrAlarm);
    console.log("asrrrr data====>", global.asrBegins, global.asrJamah, global.asrAlarm);
    console.log("maghribbb data====>", global.maghribBegins, global.maghribJamah, global.maghribAlarm);
    console.log("ishaaaa data====>", global.ishaBegins, global.ishaJamah, global.ishaAlarm);




    if (country == '' && city == '' &&  value == null && value1 == null) {
      alert("Please add all fields.")
    }
    else if (country == '') {
      alert("Please Enter Country.")
    }
    else if (city == '') {
      alert("Please Enter City.")
    }
   
    else if (value == null) {
      alert("Please Enter High Laitude Method.")
    }
    else if (value1 == null) {
      alert("Please Enter Prayer Method.")
    }
    else {
      setVisible(true)
      const token = await AsyncStorage.getItem('token')

      var param = {
        "country": country,
        "city": city,
        "go_to": global.calMonth,
        "timing": "02:00",
        "high_lat_method": value,
        "prayer_method": value1,
        "asr_method": selectItemm,
        "user_id": global.userId


      }


      console.log("params of settings====>", param);

      axios.post(baseUrl + 'setting/create', param, {
        headers: {
          'auth-token': token
        }
      })
        .then((response) => {
          if (response.status == 200) {
            console.log('params of settings==---=> ', response.data, value1, global.fajrrBegins)

            if (value1 == "London Unified Prayer Time") {
              getLondonTime1()
            }
            else {
            
              axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${response.data.city}&country=${response.data.country}&method=${response.data.prayer_method}&month=${response.data.go_to}&year=2021`)
                .then((response) => {

                  var d = moment().format("DD")
                  console.log("daaaaaaaa======>", d)

                  response.data.data.map((item) => {
                    if (item.date.readable.includes(d)) {
                      console.log("hdcj===========>", item.timings);


                      global.fajrrBegins = changeTimeFormat(item.timings.Fajr);
                      global.fajrrJamah = changeTimeFormat(item.timings.Fajr);

                      console.log("===", response.data.data[0].timings, global.fajrrBegins);
                      global.asrBegins = changeTimeFormat(item.timings.Asr);
                      global.asrJamah = changeTimeFormat(item.timings.Asr);

                      global.zuhrBegins = changeTimeFormat(item.timings.Dhuhr);
                      global.zuhrJamah = changeTimeFormat(item.timings.Dhuhr);

                      global.maghribBegins = changeTimeFormat(item.timings.Maghrib);
                      global.maghribJamah = changeTimeFormat(item.timings.Maghrib);

                      global.ishaBegins = changeTimeFormat(item.timings.Isha);
                      global.ishaJamah = changeTimeFormat(item.timings.Isha);
                      global.sun = item.timings.Sunrise.slice(0, 5)
                    }
                    console.log("response=====> setting", item.date.readable.slice(0, 3), item, d, item.date.readable.includes(d));
                  })





                  axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
                    headers: {
                      'auth-token': token
                    }
                  })
                    .then((response) => {
                      console.log("resonse prayer data setting", response.data.data.length);
                      if (response.data.data.length == 0) {


                      }else{
                        convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time, response.data.data[0].type1.set_alarm)
                      convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time,response.data.data[0].type2.set_alarm)
                      convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time,response.data.data[0].type3.set_alarm)
                      convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time,response.data.data[0].type4.set_alarm)
                      convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time,response.data.data[0].type5.set_alarm)
                      convertSunTime(global.sun,response.data.data[0].type6.begins_time, response.data.data[0].type6.jamah_time, response.data.data[0].type6.alarm_time,response.data.data[0].type6.set_alarm)
                      }


                      setVisible(false)
                      // global.calYear = '2021'
                      props.navigation.navigate('Drawer')
                      console.log(global.fajrrBegins, global.ishaJamah);
                      console.log("resonse prayer data", global.fajrrBegins);

                    })

                    .catch((error) => {
                      console.log('error', error)
                    })
                })
              // props.navigation.navigate('Drawer')
              // getPrayerList()


            }

          }
        })
        .catch((error) => {
          console.log('error', error)
          // dispatch(userUpdateProfileFail())

        })

    }
  }


  const convertFajrTime = (getFajr, begins, jamah, alarm, val) => {

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
    global.fajrrAlarm = val == true ? totalValFajeAlarm : '-'
  }





  const convertDuhrTime = (getFajr, begins, jamah, alarm, val) => {

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
    global.zuhrAlarm = val == true ? totalValFajeAlarm : '-'





  }


  const convertAsrTime = (getFajr, begins, jamah, alarm, val) => {

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
    global.asrAlarm = val == true ? totalValFajeAlarm : '-'







  }


  const convertMaghribTime = (getFajr, begins, jamah, alarm, val) => {

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
    global.maghribAlarm = val == true ? totalValFajeAlarm : '-'







  }


  const convertIshaTime = (getFajr, begins, jamah, alarm, val) => {

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
    global.ishaAlarm = val == true ? totalValFajeAlarm : "-"





  }


  const convertSunTime = (getFajr, begins, jamah, alarm, val) => {

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
    global.sun = totalValFajeBegins




  }


  const setCityData = async (text) => {

    setCity(text)
    global.calCity = text


  }


  const enterManualdata = async () => {
    if(country == '' && city == ''  && value1 == null ){
      alert("Please add all fields")
    }else if(country == ''){
      alert("Please add Country Field First")
    }else if(city == ''){
      alert("Please add City Field First")
    }else if(value1 == null){
      alert("Please add Prayer Method First")
    }
    else{
          


    setVisibleM(true)

    if (value1 == "London Unified Prayer Time") {

      axios.get(`https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.calMonth}&24hours=false`)
        .then((response) => {



          var filtered;
          console.log(typeof response.data);
          var currentDate = []
          var filterArr = []
          currentDate.push(moment().format("DD"))
          var mm = moment().month(global.calMonth).format("M");
          var mon = mm.length == 2 ? mm : `0${mm}`

          var finalDate = `${global.calYear}-${mon}-${currentDate}`
          console.log("finalDate", finalDate);
          filtered = Object.keys(response.data.times)
            .filter(key => finalDate.includes(key))
            .reduce((obj, key) => {
              obj[key] = response.data.times[key];
              return obj;
            }, {});

          filterArr.push(filtered)

          filterArr.map((i) => {
            console.log("london data==>", i[finalDate], `https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.calMonth}&24hours=false`)
            global.fajrrBeginss = i[finalDate].fajr

            global.zuhrBeginss = i[finalDate].dhuhr

            global.asrBeginss = i[finalDate].asr

            global.maghribBeginss = i[finalDate].magrib

            global.ishaBeginss = i[finalDate].isha


            global.suns = i[finalDate].sunrise

            global.f = i[finalDate].fajr
              global.a =  i[finalDate].asr
              global.z =  i[finalDate].dhuhr
              global.m = i[finalDate].magrib
              global.i = i[finalDate].isha
          })
          setVisibleM(false)

          props.navigation.navigate("ManuallyTime")

        })
    }
    else {
      
      axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${value1 === null ? 1 : value1}&month=${global.calMonth}&year=${global.calYear}`)
        .then((res) => {

          var d = moment().format("DD")

          res.data.data.map((item) => {
            console.log("daaaaaaaa======>", item.date.readable.slice(0, 3).includes(d))
            if (item.date.readable.slice(0, 3).includes(d)) {
              console.log("hdcj===========>", item.date.readable, item.timings.Fajr.slice(0,5), `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`);


              global.fajrrBeginss = changeTimeFormat(item.timings.Fajr)
              global.f = item.timings.Fajr.slice(0,5)
              global.a =  item.timings.Asr.slice(0,5)
              global.z =  item.timings.Dhuhr.slice(0,5)
              global.m =  item.timings.Maghrib.slice(0,5)
              global.i =  item.timings.Isha.slice(0,5)

              global.asrBeginss = changeTimeFormat(item.timings.Asr)

              global.zuhrBeginss = changeTimeFormat(item.timings.Dhuhr)

              global.maghribBeginss = changeTimeFormat(item.timings.Maghrib)

              global.ishaBeginss = changeTimeFormat(item.timings.Isha)
              global.suns = item.timings.Sunrise.slice(0, 5)


              console.log("daaaaaaaa======>", global.f, global.a, global.z, global.m, global.i)

            }
            console.log("response=====>", item.date.readable.slice(0, 3), item, d, item.date.readable.includes(d));
            setVisibleM(false)

            props.navigation.navigate("ManuallyTime")
          })




        })
    }

  }

  }


  const setCountryData = (text) => {

    setCountry(text)
    global.calCountry = text
  }


  const getLondonTime = async () => {
    var date = new Date().getMonth() + 1
    console.log("date=====>", global.calMonth);
    axios.get(`https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.calMonth}&24hours=false`)
      .then((response) => {



        var filtered;
        console.log(typeof response.data);
        var currentDate = []
        var filterArr = []
        currentDate.push(moment().format("DD"))
        var mm = moment().month(global.calMonth).format("M");
          var mon = mm.length == 2 ? mm : `0${mm}`

          var finalDate = `${global.calYear}-${mon}-${currentDate}`

        console.log("finalDate", finalDate);
        filtered = Object.keys(response.data.times)
          .filter(key => finalDate.includes(key))
          .reduce((obj, key) => {
            obj[key] = response.data.times[key];
            return obj;
          }, {});

        // console.log("london data", response.data);
        filterArr.push(filtered)

        filterArr.map((i) => {
          console.log("london data==>", i[finalDate])
          // global.fajr = i[currentDate[0]].fajr
          global.fajrrBegins = i[finalDate].fajr
          global.fajrrJamah = i[finalDate].fajr_jamat

          global.zuhrBegins = i[finalDate].dhuhr
          global.zuhrJamah = i[finalDate].dhuhr_jamat

          global.asrBegins = i[finalDate].asr
          global.asrJamah = i[finalDate].asr_jamat

          global.maghribBegins = i[finalDate].magrib
          global.maghribJamah = i[finalDate].magrib_jamat
          global.maghribAlarm = "-"

          global.ishaBegins = i[finalDate].isha
          global.ishaJamah = i[finalDate].isha_jamat
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
              if (response.data.data.length == 0) {

              }
              else{
                convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time, response.data.data[0].type1.set_alarm)
              convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time,response.data.data[0].type2.set_alarm)
              convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time,response.data.data[0].type3.set_alarm)
              convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time,response.data.data[0].type4.set_alarm)
              convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time,response.data.data[0].type5.set_alarm)
              convertSunTime(global.sun,response.data.data[0].type6.begins_time, response.data.data[0].type6.jamah_time, response.data.data[0].type6.alarm_time,response.data.data[0].type6.set_alarm)
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


  const getPrayerList = async () => {
    const token = await AsyncStorage.getItem('token')

    axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("setting response data===>", response.data.data);
        if (response.data.data.length == 0) {

        }
        else{
          convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time, response.data.data[0].type1.set_alarm)
        convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time,response.data.data[0].type2.set_alarm)
        convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time,response.data.data[0].type3.set_alarm)
        convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time,response.data.data[0].type4.set_alarm)
        convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time,response.data.data[0].type5.set_alarm)
        convertSunTime(global.sun,response.data.data[0].type6.begins_time, response.data.data[0].type6.jamah_time, response.data.data[0].type6.alarm_time,response.data.data[0].type6.set_alarm)
        }
        // global.calYear = '2021'
        setVisible(false)
        props.navigation.navigate('Drawer')
      })

      .catch((error) => {
        console.log('error', error)
      })
  }



  const getLondonTime1 = async () => {
    var date = new Date().getMonth() + 1
    console.log("djxnjkcn", `https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.calMonth}&24hours=false`);

    axios.get(`https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.calMonth}&24hours=false`)
      .then((response) => {

        // setSelectedId(null)

        var filtered;
        console.log(typeof response.data);
        var currentDate = []
        var filterArr = []
        currentDate.push(moment().format("DD"))
        var mm = moment().month(global.calMonth).format("M");
          var mon = mm.length == 2 ? mm : `0${mm}`

          var finalDate = `${global.calYear}-${mon}-${currentDate}`

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

          global.zuhrBegins = i[finalDate].dhuhr
          global.zuhrJamah = i[finalDate].dhuhr_jamat

          global.asrBegins = i[finalDate].asr
          global.asrJamah = i[finalDate].asr_jamat

          global.maghribBegins = i[finalDate].magrib
          global.maghribJamah = i[finalDate].magrib_jamat

          global.ishaBegins = i[finalDate].isha
          global.ishaJamah = i[finalDate].isha_jamat

          global.sun = i[finalDate].sunrise
          // global.zuhr = i[currentDate[0]].dhuhr
          // global.asr = i[currentDate[0]].asr
          // global.maghrib = i[currentDate[0]].magrib
          // global.isha = i[currentDate[0]].isha


          // props.navigation.navigate('Drawer')



        })

        getPrayerList()

        // axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
        //     headers: {
        //       'auth-token': token
        //     }
        //   })
        //     .then((response) => {
        //       console.log("resonse prayer data", response.data);
        //       if(response.data.data.length == 0){
        //       }
        //       else{
        //         convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
        //       convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
        //       convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
        //       convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
        //       convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
        //       global.sun = response.data.data[0].type6.prayerTime
        //       // props.navigat/ion.navigate('Drawer')
        //       }

        //       setVisible(false)
        //         props.navigation.navigate('Drawer')

        //       console.log(global.fajrrBegins, global.ishaJamah);


        //     })

        //     .catch((error) => {
        //       console.log('error', error)
        //     })
        // console.log("get london time====>", response.data.times,  moment().format("YYYY-MM-DD"), Object.values(response.data.times).includes('2021-11-29'));
      })
  }


  const changeTimeFormat = (timeString) => {
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    timeString = h + timeString.substr(2, 3);

    var hr = timeString.slice(0, 2)
    var min = timeString.slice(2, 5)
    console.log("time", hr, timeString);
    var trimhr = hr.replace(':', '');
    var trimMin = min.replace(':', '')
    var totalValFajeBegins = `${trimhr.length == 2 ? trimhr : `0${trimhr}`}:${trimMin.length == 2 ? trimMin : `0${trimMin}`}`
    // global.fajrrBegins =totalValFajeBegins
    console.log("time string data ", totalValFajeBegins, timeString, H, h, hr, min);
    return totalValFajeBegins;

  }


  const getBeginsData = async () => {
    console.log("djxnjkcn-", `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${value1}&month=${global.calMonth}&year=${global.calYear}`);
    const token = await AsyncStorage.getItem('token')

    axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${value1}&month=${global.calMonth}&year=${global.calYear}`)
      .then((response) => {


        setSelectedId(null)

        global.fajrrBegins = response.data.data[0].timings.Fajr
        global.fajrrJamah = response.data.data[0].timings.Fajr
        // global.fajrrAlarm = response.data.data[0].timings.Fajr

        console.log("=== begin data", response.data.data[0].timings, response.data.data[0].timings.Asr, global.fajrrBegins);
        global.asrBegins = response.data.data[0].timings.Asr
        global.asrJamah = response.data.data[0].timings.Asr
        // global.asrAlarm = response.data.data[0].timings.Asr

        global.zuhrBegins = response.data.data[0].timings.Dhuhr
        global.zuhrJamah = response.data.data[0].timings.Dhuhr
        // global.zuhrAlarm = response.data.data[0].timings.Dhuhr

        global.maghribBegins = response.data.data[0].timings.Maghrib
        global.maghribJamah = response.data.data[0].timings.Maghrib
        // global.maghribAlarm = response.data.data[0].timings.Maghrib

        global.ishaBegins = response.data.data[0].timings.Isha
        global.ishaJamah = response.data.data[0].timings.Isha
        // global.ishaAlarm = response.data.data[0].timings.Isha
        global.sun = response.data.data[0].timings.Sunrise.slice(0, 5)


        axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
          headers: {
            'auth-token': token
          }
        })
          .then((response) => {
            console.log("resonse prayer data", response.data);
            if (response.data.data.length == 0) {

            }
            else{
              convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time, response.data.data[0].type1.set_alarm)
            convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time,response.data.data[0].type2.set_alarm)
            convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time,response.data.data[0].type3.set_alarm)
            convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time,response.data.data[0].type4.set_alarm)
            convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time,response.data.data[0].type5.set_alarm)
            convertSunTime(global.sun,response.data.data[0].type6.begins_time, response.data.data[0].type6.jamah_time, response.data.data[0].type6.alarm_time,response.data.data[0].type6.set_alarm)
            }




            console.log(global.fajrrBegins, global.ishaJamah);


          })

          .catch((error) => {
            console.log('error', error)
          })

      })

  };





  return (

    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <StatusBar hidden />
      <View style={{ backgroundColor: '#FAE9D7', height: 47, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
          <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Settings</Text>
        </TouchableOpacity>
        {/* <Image source={require('../images/nafs.png')} style={{ width: 26, height: 26, marginRight: 20 }} /> */}
      </View>


      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: 20, marginLeft: '5%', marginRight: '5%', }}>


        <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', }}>Location:</Text>

        <View style={{
          justifyContent: 'space-between',
          height: 40, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '100%', shadowColor: '#000000',
          backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
        }}>

          <TextInput
            placeholder="Enter Country"
            value={country}
            style={{ paddingLeft: 15, color: 'black', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', width: '100%', marginLeft: -10 }}
            onChangeText={(text) => setCountryData(text)}
          />



        </View>

        <View style={{
          justifyContent: 'space-between',
          height: 40, marginTop: 20, alignItems: 'center', flexDirection: 'row', width: '100%', shadowColor: '#000000',
          backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
        }}>

          <TextInput
            placeholder="Enter City"
            value={city}
            style={{ paddingLeft: 15, color: 'black', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', width: '100%', marginLeft: -10 }}
            onChangeText={(text) => setCityData(text)}
          />



        </View>









        {/* <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Go To:</Text>

        <DropDownPicker
          listMode="SCROLLVIEW"
          style={{ borderColor: '#F2DEC9', width: '100%', fontSize: RFValue(11), marginTop: 8, height: 40, }}
          open={openM}
          textStyle={{ fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', }}
          listChildContainerStyle={{ marginTop: 5 }}
          dropDownContainerStyle={{ height: 120, borderColor: '#F2DEC9' }}
          value={valueM}
          items={itemsM}
          setOpen={setOpenM}
          setValue={setValueM}
          setItems={setItemsM}
          onChangeValue={(label) => {
            console.log("value-=====", valueM);
            global.selectMonth = valueM
            global.calMonth = valueM
          }}
        /> */}




        {/* <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Timing:</Text> */}




        <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>High Latitude Method:</Text>




        <DropDownPicker
          listMode="SCROLLVIEW"
          style={{ borderColor: '#F2DEC9', width: '100%', fontSize: RFValue(11), marginTop: openM == true ? '25%' : '4%', height: 40 }}
          open={open}
          textStyle={{ fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', }}
          listChildContainerStyle={{ marginTop: 5 }}
          dropDownContainerStyle={{ height: 120, borderColor: '#F2DEC9' }}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(label) => {
            console.log("value-=====", value);
          }}
        />

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Prayer Method:</Text>

          <DropDownPicker
            listMode="SCROLLVIEW"
            style={{ width: '100%', height: 40, borderColor: '#F2DEC9', fontSize: RFValue(11), marginTop: open == true ? '25%' : '4%', }}
            open={open1}
            value={value1}
            textStyle={{ fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', }}
            // listItemContainerStyle={{marginTop: -10, }}
            listChildContainerStyle={{ marginTop: 5 }}
            dropDownContainerStyle={{ height: 120, borderColor: '#F2DEC9' }}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            onChangeValue={(label) => {
              console.log("value-=====", value1);
              global.london = value1
              // global.calAsr = value1
              if (value1 == "London Unified Prayer Time") {
                getLondonTime()
              }
              else {
                global.calAsr = value1
                getBeginsData()
              }
            }}
          />
        </View>

        {/* <TouchableOpacity onPress={() => country != '' && city != '' && valueM != '' && value != '' && value1 != '' ? enterManualdata() : alert("Please enter all details.")} style={{ */}
        {visibleM ?
         <TouchableOpacity onPress={() => country != '' && city != '' && valueM != '' && value != '' && value1 != '' ? enterManualdata() : alert("Please enter all details.")} style={{
          justifyContent: 'center',
          height: 40, marginTop: 10, alignItems: 'center', flexDirection: 'row', width: '100%', shadowColor: '#000000',
          backgroundColor: visibleM ? '#D29F79' : '#FAE9D7', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
        }}>
         
            <ActivityIndicator size="small" color="#000" style={{}} />
           
      


          
        </TouchableOpacity>
        :
         <TouchableOpacity onPress={() => enterManualdata() } style={{
          
          height: 40, marginTop: 10, alignItems: 'center', flexDirection: 'row', width: '100%', shadowColor: '#000000',
          backgroundColor: visibleM ? '#D29F79' : '#FAE9D7', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
        }}>
          {/* {visibleM ?
          <View style={{justifyContent: 'center'}}>
            <ActivityIndicator size="small" color="#000" style={{}} />
            </View>
            : */}

            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold',marginLeft: 5  }}>Manual Adjustments, Jamā'ah and Alarm</Text>

          
        </TouchableOpacity>
}

        <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: open1 == true ? '17%' : '2%' }}>Asar Method:</Text>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
          <FlatList
            data={data}
            numColumns={2}
            key={2}
            extraData={
              selectedId
            }
            renderItem={({ item, index }) => {
              return (
                <TouchableOpacity onPress={() => selectItem(index, item)} style={{ backgroundColor: selectedId === item.index ? '#D29F79' : '#FAE9D7', width: '45%', height: 40, borderRadius: 8, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                  {visible && selectedId === item.index ?
                    <ActivityIndicator size="small" color="#000" />
                    :
                    <Text style={{ fontFamily: 'Montserrat-Bold', }}>{item.name}</Text>
                  }
                </TouchableOpacity>
              )
            }}
          />
        </View>


      </ScrollView>

      <SpinnerModal
        visible={isLoading}
        heading="Please Wait ..."
      />


    </View>

  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerStyle: {
    height: 150,
    width: "38%",
    color: '#344953',
    justifyContent: 'center',
    borderWidth: 1, borderColor: '#F2DEC9',
  }
})

export default Setting
