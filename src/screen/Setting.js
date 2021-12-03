
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, Picker, FlatList, StatusBar, } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import { baseUrl } from '../Api/COntstant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import Iconback from 'react-native-vector-icons/Entypo';
import moment from 'moment';


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
  const [goToData, setGoToData] = useState('')
  const [timing, setTiming] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [latitudeValue, setLatitudeValue] = useState(false)
  const [selectedAsarMethod, setSelectedAsarMethod] = useState('Hanafi')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState('')
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

        setCountry(response.data[0].country)
        setCity(response.data[0].city)
        setValueM(response.data[0].go_to)
        setValue(response.data[0].high_lat_method)
        setValue1(response.data[0].prayer_method)

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




    if (country == '' && city == '' && valueM == null && value == null && value1 == null) {
      alert("Please add all fields.")
    }
    else if (country == '') {
      alert("Please Enter Country.")
    }
    else if (city == '') {
      alert("Please Enter City.")
    }
    else if (valueM == null) {
      alert("Please Enter Go To Value.")
    }
    else if (value == null) {
      alert("Please Enter High Laitude Method.")
    }
    else if (value1 == null) {
      alert("Please Enter Prayer Method.")
    }
    else {

      const token = await AsyncStorage.getItem('token')

      var param = {
        "country": country,
        "city": city,
        "go_to": valueM,
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
            props.navigation.navigate('Drawer')
            // getPrayerList()


          }
          console.log('params of settings==---=> ', response)


        })
        .catch((error) => {
          console.log('error', error)
          // dispatch(userUpdateProfileFail())

        })

    }
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



  const getPrayerList = async () => {
    const token = await AsyncStorage.getItem('token')

    axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("resonse prayer data", response.data);
        convertFajrTime(response.data.data[0].type1.prayerTime, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
        convertDuhrTime(response.data.data[0].type2.prayerTime, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
        convertAsrTime(response.data.data[0].type3.prayerTime, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
        convertMaghribTime(response.data.data[0].type4.prayerTime, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
        convertIshaTime(response.data.data[0].type5.prayerTime, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
        global.sun = response.data.data[0].type6.prayerTime



        console.log(global.fajrrBegins, global.ishaJamah);

        props.navigation.navigate('Drawer')
      })

      .catch((error) => {
        console.log('error', error)
      })
  }

  const setCityData = async (text) => {
    setCity(text)
    global.calCity = text
    const token = await AsyncStorage.getItem('token')


    axios.get(`https://api.pray.zone/v2/times/today.json?city=${text}`)
      .then((response) => {



        var getHoursFajr = response.data.results.datetime[0].times.Fajr.slice(0, 2)
        var getMinutesFajr = response.data.results.datetime[0].times.Fajr.slice(3, 5)
        var totalValFajrBegin //05:08


        totalValFajrBegin = `${getHoursFajr.length == 2 ? getHoursFajr : `0${getHoursFajr}`}:${getMinutesFajr.length == 2 ? getMinutesFajr : `0${getMinutesFajr}`}`
        global.fajrrBegins = totalValFajrBegin
        global.fajrrJamah = totalValFajrBegin
        global.fajrrAlarm = totalValFajrBegin

        var getHoursDuhr = response.data.results.datetime[0].times.Dhuhr.slice(0, 2)
        var getMinutesDuhr = response.data.results.datetime[0].times.Dhuhr.slice(3, 5)
        var totalValFajrDuhr

        totalValFajrDuhr = `${getHoursDuhr.length == 2 ? getHoursDuhr : `0${getHoursDuhr}`}:${getMinutesDuhr.length == 2 ? getMinutesDuhr : `0${getMinutesDuhr}`}`
        global.zuhrBegins = totalValFajrDuhr
        global.zuhrJamah = totalValFajrDuhr
        global.zuhrAlarm = totalValFajrDuhr





        var getHoursAsr = response.data.results.datetime[0].times.Asr.slice(0, 2)
        var getMinutesAsr = response.data.results.datetime[0].times.Asr.slice(3, 5)
        var totalValFajrAsr

        totalValFajrAsr = `${getHoursAsr.length == 2 ? getHoursAsr : `0${getHoursAsr}`}:${getMinutesAsr.length == 2 ? getMinutesAsr : `0${getMinutesAsr}`}`
        global.asrBegins = totalValFajrAsr
        global.asrJamah = totalValFajrAsr
        global.asrAlarm = totalValFajrAsr




        var getHoursMag = response.data.results.datetime[0].times.Maghrib.slice(0, 2)
        var getMinutesMag = response.data.results.datetime[0].times.Maghrib.slice(3, 5)
        var totalValFajrMag

        totalValFajrMag = `${getHoursMag.length == 2 ? getHoursMag : `0${getHoursMag}`}:${getMinutesMag.length == 2 ? getMinutesMag : `0${getMinutesMag}`}`
        global.maghribBegins = totalValFajrMag
        global.maghribJamah = totalValFajrMag
        global.maghribAlarm = totalValFajrMag





        var getHoursIsha = response.data.results.datetime[0].times.Isha.slice(0, 2)
        var getMinutesIsha = response.data.results.datetime[0].times.Isha.slice(3, 5)
        var totalValFajrIsha

        totalValFajrIsha = `${getHoursIsha.length == 2 ? getHoursIsha : `0${getHoursIsha}`}:${getMinutesIsha.length == 2 ? getMinutesIsha : `0${getMinutesIsha}`}`
        global.ishaBegins = totalValFajrIsha
        global.ishaJamah = totalValFajrIsha
        global.ishaAlarm = totalValFajrIsha




        global.sun = response.data.results.datetime[0].times.Sunrise

      })


  }


  const enterManualdata = async () => {

    axios.get(`https://api.pray.zone/v2/times/today.json?city=${global.calCity}`)
      .then((response) => {



        var getHoursFajr = response.data.results.datetime[0].times.Fajr.slice(0, 2)
        var getMinutesFajr = response.data.results.datetime[0].times.Fajr.slice(3, 5)
        var totalValFajrBegin //05:08


        totalValFajrBegin = `${getHoursFajr.length == 2 ? getHoursFajr : `0${getHoursFajr}`}:${getMinutesFajr.length == 2 ? getMinutesFajr : `0${getMinutesFajr}`}`
        global.fajrrBegins = totalValFajrBegin
        global.fajrrJamah = totalValFajrBegin
        global.fajrrAlarm = totalValFajrBegin

        var getHoursDuhr = response.data.results.datetime[0].times.Dhuhr.slice(0, 2)
        var getMinutesDuhr = response.data.results.datetime[0].times.Dhuhr.slice(3, 5)
        var totalValFajrDuhr

        totalValFajrDuhr = `${getHoursDuhr.length == 2 ? getHoursDuhr : `0${getHoursDuhr}`}:${getMinutesDuhr.length == 2 ? getMinutesDuhr : `0${getMinutesDuhr}`}`
        global.zuhrBegins = totalValFajrDuhr
        global.zuhrJamah = totalValFajrDuhr
        global.zuhrAlarm = totalValFajrDuhr





        var getHoursAsr = response.data.results.datetime[0].times.Asr.slice(0, 2)
        var getMinutesAsr = response.data.results.datetime[0].times.Asr.slice(3, 5)
        var totalValFajrAsr

        totalValFajrAsr = `${getHoursAsr.length == 2 ? getHoursAsr : `0${getHoursAsr}`}:${getMinutesAsr.length == 2 ? getMinutesAsr : `0${getMinutesAsr}`}`
        global.asrBegins = totalValFajrAsr
        global.asrJamah = totalValFajrAsr
        global.asrAlarm = totalValFajrAsr




        var getHoursMag = response.data.results.datetime[0].times.Maghrib.slice(0, 2)
        var getMinutesMag = response.data.results.datetime[0].times.Maghrib.slice(3, 5)
        var totalValFajrMag

        totalValFajrMag = `${getHoursMag.length == 2 ? getHoursMag : `0${getHoursMag}`}:${getMinutesMag.length == 2 ? getMinutesMag : `0${getMinutesMag}`}`
        global.maghribBegins = totalValFajrMag
        global.maghribJamah = totalValFajrMag
        global.maghribAlarm = totalValFajrMag





        var getHoursIsha = response.data.results.datetime[0].times.Isha.slice(0, 2)
        var getMinutesIsha = response.data.results.datetime[0].times.Isha.slice(3, 5)
        var totalValFajrIsha

        totalValFajrIsha = `${getHoursIsha.length == 2 ? getHoursIsha : `0${getHoursIsha}`}:${getMinutesIsha.length == 2 ? getMinutesIsha : `0${getMinutesIsha}`}`
        global.ishaBegins = totalValFajrIsha
        global.ishaJamah = totalValFajrIsha
        global.ishaAlarm = totalValFajrIsha




        global.sun = response.data.results.datetime[0].times.Sunrise

      })

    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token, global.userId)

    axios.get(`http://112.196.64.119:8000/api/user/manualprayerstime/view/${global.userId}`, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log('manual response data=====>', response.data)
        // global.fajrPrayer = response.data.data[0].type1.prayerTime
        // global.sunPrayer=response.data.data[0].type6.prayerTime
        // global.asrPrayer=response.data.data[0].type3.prayerTime
        // global.duhrPrayer = response.data.data[0].type2.prayerTime
        // global.magribPrayer=response.data.data[0].type4.prayerTime
        // global.ishaPrayer=response.data.data[0].type5.prayerTime

        props.navigation.navigate("ManuallyTime")

      })


      .catch((error) => {
        console.log('error', error)
        // dispatch(userUpdateProfileFail())

      })
  }

  const setCountryData = (text) => {

    setCountry(text)
    global.calCountry = text
  }


  const getLondonTime = async () => {
    var date = new Date().getMonth() + 1
    axios.get(`https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=2021&month=${date}&24hours=false`)
      .then((response) => {
        console.log("response.data", response.data)

        // var a = response.data.times.includes("2021-11-09")


        // if (Object.keys(response.data.times).includes('2021-11-29')) {
        //   alert('exists');
        // }

        // var myData = response.data.filter((i) => console.log(i.times));
        var filtered;
        console.log(typeof response.data);
        var currentDate = []
        var filterArr = []
        currentDate.push(moment().format("YYYY-MM-DD"))
        console.log(currentDate);
        filtered = Object.keys(response.data.times)
          .filter(key => currentDate.includes(key))
          .reduce((obj, key) => {
            obj[key] = response.data.times[key];
            return obj;
          }, {});
        console.log(filtered);
        filterArr.push(filtered)

        filterArr.map((i) => {
          console.log(i[currentDate[0]].fajr)
          // global.fajr = i[currentDate[0]].fajr
          global.fajrrBegins = i[currentDate[0]].fajr
          global.fajrrJamah = i[currentDate[0]].fajr_jamat
          global.fajrrAlarm = "--"

          global.zuhrBegins = i[currentDate[0]].dhuhr
          global.zuhrJamah = i[currentDate[0]].dhuhr_jamat
          global.zuhrAlarm = "--"

          global.asrBegins = i[currentDate[0]].asr
          global.asrJamah = i[currentDate[0]].asr_jamat
          global.asrAlarm = "--"

          global.maghribBegins = i[currentDate[0]].magrib
          global.maghribJamah = i[currentDate[0]].magrib_jamat
          global.maghribAlarm = "--"

          global.ishaBegins = i[currentDate[0]].isha
          global.ishaJamah = i[currentDate[0]].isha_jamat
          global.ishaAlarm = "--"

          global.sun = i[currentDate[0]].sunrise
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
              convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
              convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
              convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
              convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
              convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
              global.sun = response.data.data[0].type6.prayerTime




              console.log(global.fajrrBegins, global.ishaJamah);


            })

            .catch((error) => {
              console.log('error', error)
            })
        })
        // console.log("get london time====>", response.data.times,  moment().format("YYYY-MM-DD"), Object.values(response.data.times).includes('2021-11-29'));
      })
  }

  const changeTimeFormat = (timeString) => {
    var H = +timeString.substr(0, 2);
    var h = H % 12 || 12;
    timeString = h + timeString.substr(2, 3);

    var hr = timeString.slice(0, 2)
    var min = timeString.slice(3, 5)
    console.log("time", hr);
    var totalValFajeBegins = `${hr.length == 3 ? hr : `0${hr}`}${min.length == 2 ? min : `0${min}`}`
    // global.fajrrBegins =totalValFajeBegins

    return totalValFajeBegins;

  }
  const getBeginsData = async () => {
    const token = await AsyncStorage.getItem('token')

    axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${value1}&month=${global.calMonth}&year=2021`)
      .then((response) => {



        console.log("===", response.data.data[0].timings);

        global.fajrrBegins = changeTimeFormat(response.data.data[0].timings.Fajr);
        global.fajrrJamah = changeTimeFormat(response.data.data[0].timings.Fajr);
        global.fajrrAlarm = "-"

        global.asrBegins = changeTimeFormat(response.data.data[0].timings.Asr);
        global.asrJamah = changeTimeFormat(response.data.data[0].timings.Asr);
        global.asrAlarm = "-"

        global.zuhrBegins = changeTimeFormat(response.data.data[0].timings.Dhuhr);
        global.zuhrJamah = changeTimeFormat(response.data.data[0].timings.Dhuhr);
        global.zuhrAlarm = "-"

        global.maghribBegins = changeTimeFormat(response.data.data[0].timings.Maghrib);
        global.maghribJamah = changeTimeFormat(response.data.data[0].timings.Maghrib);
        global.maghribAlarm = "-"

        global.ishaBegins = changeTimeFormat(response.data.data[0].timings.Isha);
        global.ishaJamah = changeTimeFormat(response.data.data[0].timings.Isha);
        global.ishaAlarm = "-"
        global.sun = response.data.data[0].timings.Sunrise.slice(0,5)


        axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
            headers: {
              'auth-token': token
            }
          })
            .then((response) => {
              console.log("resonse prayer data", response.data);
              convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
              convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
              convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
              convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
              convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
              global.sun = response.data.data[0].timings.Sunrise




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
            style={{ paddingLeft: 20, color: 'black', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', width: '100%', marginLeft: -10 }}
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
            style={{ paddingLeft: 20, color: 'black', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', width: '100%', marginLeft: -10 }}
            onChangeText={(text) => setCityData(text)}
          />



        </View>









        <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Go To:</Text>

        <DropDownPicker
          listMode="SCROLLVIEW"
          style={{ borderColor: '#F2DEC9', width: '100%', fontSize: RFValue(11), marginTop: 8, height: 40 }}
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
        />




        {/* <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Timing:</Text> */}

        <TouchableOpacity onPress={() => country != '' && city != '' ? enterManualdata() : alert("Please enter locations.")} style={{
          justifyContent: 'center',
          height: 40, marginTop: 20, alignItems: 'center', flexDirection: 'row', width: '100%', shadowColor: '#000000',
          backgroundColor: '#FAE9D7', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
        }}>

          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginLeft: -15 }}>Manual Adjustments</Text>


        </TouchableOpacity>


        <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>High Latitude Method:</Text>




        <DropDownPicker
          listMode="SCROLLVIEW"
          style={{ borderColor: '#F2DEC9', width: '100%', fontSize: RFValue(11), marginTop: openM == true ? '15%' : '4%', height: 40 }}
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
              if (value1 == "London Unified Prayer Time") {
                getLondonTime()
              }
              else {
                getBeginsData()
              }
            }}
          />
        </View>

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
                <TouchableOpacity onPress={() => selectItem(item.index, item)} style={{ backgroundColor: selectedId === item.index ? '#D29F79' : '#FAE9D7', width: '45%', height: 40, borderRadius: 8, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ fontFamily: 'Montserrat-Bold', }}>{item.name}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>


      </ScrollView>




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
