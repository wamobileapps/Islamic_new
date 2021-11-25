
import React, { useEffect, useRef, useState } from "react"
import { StatusBar, Text, TouchableOpacity, View, StyleSheet, ScrollView, KeyboardAvoidingView, TextInput, FlatList, SafeAreaView } from "react-native"
import Iconback from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../Api/COntstant';
import axios from "axios";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropDownPicker from 'react-native-dropdown-picker';

const data = [
  {
    name: "Add",
    index: 0,
    id: 1
  },
  {
    name: 'Cancel',
    index: 1,
    id: 2
  }
]

const fajrRemind = [
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const fajrJamaahh = [
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const fajrBegin = [
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const sunriseBegin =[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const sunriseJamah = [
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const sunriseAlarmm = [
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const duhrBegin = [
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const duhrJamah=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const duhrAlarmm=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const asrBegin=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const asrJamah=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const asrAlarmm=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]


const maghribBegin=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const maghribJamah=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const maghribAlamm=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const ishaBegin=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const ishaJamah=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]

const ishaAlarmm=[
  {
    name: '+',
    index: 0,
    id: 1
  },
  {
    name: '-',
    index: 1,
    id: 2
  }
]


let selectId = ''
var FajrAlarmItem = '+'
var FajrJamaahItem = '+'
var FajrBeginItem = '+'
var duhrBeginItem = '+'
var duhrJamahItem = '+'
var duhrAlarmmItem = '+'
var asrBeginItem = '+'
var asrJamahItem  = '+'
var asrAlarmmItem = '+'
var magribBeginItem = '+'
var magribJamahItem = '+'
var magribAlarmmItem = '+'
var ishaBeginItem = '+'
var ishaJamahItem = '+'
var ishaAlarmmItem = '+'
var SunriseAlarmItem = "+"
var SunriseBeginItem = "+"
var SunriseAlarmItem = "+"
var SunriseJamaahItem = "+"




var fajrBEginsData = ''
var fajrJamahData = ''
var fajeAlarmmData = ''
var sunriseBEginsData = ''
var sunriseJamahData = ''
var sunriseAlarmmData = ''
var duhrBeginData = ''
var duhrJamahData = ''
var duhrAlarmmData = ''
var asrBeginData = ''
var asrJamahData  = ''
var asrAlarmmData = ''
var magribBeginData = ''
var magribJamahData = ''
var magribAlarmmData = ''
var ishaBeginData = ''
var ishaJamahData = ''
var ishaAlarmmData = ''


const ManuallyTime = ({ route, navigation }) => {

  const [selectFajrAlarmId, setselectFajrAlarmId] = useState(null)
  const [selectFajrJamaahId, setselectFajrJamaahId] = useState(null)
  const [selectFajrBeginId, setselectFajrBeginId] = useState(null)

  const [selectsunriseBeginId, setselectsunriseBeginId] = useState(null)
  const [selectsunriseBeginItem, setselectsunriseBeginItem] = useState(null)
  const [selectsunriseJamahId, setselectsunriseJamahId] = useState(null)
  const [selectsunriseJamahItem, setselectsunriseJamahItem] = useState(null)
  const [selectsunriseAlammId, setselectsunriseAlarmmId] = useState(null)
  const [selectsunriseAlarmmItem, setselectsunriseAlarmmItem] = useState(null)

  const [selectduhrBeginId, setselectduhrBeginId] = useState(null)
  const [selectduhrJamahId, setselectduhrJamahId] = useState(null)
  const [selectduhrAlammId, setselectduhrAlarmmId] = useState(null)

  const [selectasrBeginId, setselectasrBeginId] = useState(null)
  const [selectasrJamahId, setselectasrJamahId] = useState(null)
  const [selectasrAlammId, setselectasrAlarmmId] = useState(null)

  const [selectmaghribBeginId, setselectmagribBeginId] = useState(null)
  const [selectmaghribJamahId, setselectmagribJamahId] = useState(null)
  const [selectmaghribAlarmId, setselectmagribAlarmmId] = useState(null)


  const [selectishaBeginId, setselectishaBeginId] = useState(null)
  const [selectishaJamahId, setselectishaJamahId] = useState(null)
  const [selectshaAlammId, setselectishaAlarmmId] = useState(null)

  const [selectedId, setSelectedId] = useState(null)

  const [fajrBegins, setFajrBegins] = useState('')
  const [fajrJamaah, setFajrJamaah] = useState('')
  const [fajrAlarm, setFajrAlarm] = useState('')

  const [sunriseBegins, setsunriseBegins] = useState('')
  const [sunriseJamaah, setsunriseJamaah] = useState('')
  const [sunriseAlarm, setsunriseAlarm] = useState('')

  const [duhrBegins, setduhrBegins] = useState('')
  const [duhrJamaah, setduhrJamaah] = useState('')
  const [duhrAlarm, setduhrAlarm] = useState('')

  const [asrBegins, setasrBegins] = useState('')
  const [asrJamaah, setasrJamaah] = useState('')
  const [asrAlarm, setasrAlarm] = useState('')

  const [maghribBegins, setmaghribBegins] = useState('')
  const [maghribJamaah, setmaghribJamaah] = useState('')
  const [maghribAlarm, setmaghribAlarm] = useState('')

  const [ishaBegins, setishaBegins] = useState('')
  const [ishaJamaah, setishaJamaah] = useState('')
  const [ishaAlarm, setishaAlarm] = useState('')

  const [openM, setOpenM] = useState(false);
  const [valueM, setValueM] = useState(null);
  const [itemsM, setItemsM] = useState([
    { label: '+', value: '+' },
    { label: '-', value: '_' }
  ]);

  useEffect(async () => {

    getViewManualData()

    // const unsubscribe = navigation.addListener('focus', () => {

    // });

    // return unsubscribe;


  }, [navigation]);


  const getViewManualData= async()=>{
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    axios.get(`http://112.196.64.119:8000/api/user/manualprayerstime/view/${global.userId}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            console.log('manual response data=====>', response.data,global.fajr,response.data.data[0].type1.begins_time , "bbb", parseInt(global.fajr) - parseInt(response.data.data[0].type1.begins_time))
            var a = parseInt(global.fajr) - parseInt(response.data.data[0].type1.begins_time)
           
            // setFajrBegins(response.data.data[0].type1.begins_time)
            // setFajrJamaah(response.data.data[0].type1.jamah_time)
            // setFajrAlarm(response.data.data[0].type1.alarm_time)

            // setsunriseBegins(response.data.data[0].type6.alarm_time)
            // setsunriseJamaah(response.data.data[0].type6.alarm_time)
            // setsunriseAlarm(response.data.data[0].type6.alarm_time)

            // setduhrBegins(response.data.data[0].type2.alarm_time)
            // setduhrJamaah(response.data.data[0].type2.alarm_time)
            // setduhrAlarm(response.data.data[0].type2.alarm_time)

            // setasrBegins(response.data.data[0].type3.alarm_time)
            // setasrJamaah(response.data.data[0].type3.alarm_time)
            // setasrAlarm(response.data.data[0].type3.alarm_time)

            // setmaghribBegins(response.data.data[0].type4.alarm_time)
            // setmaghribJamaah(response.data.data[0].type4.alarm_time)
            // setmaghribAlarm(response.data.data[0].type4.alarm_time)

            // setishaBegins(response.data.data[0].type5.alarm_time)
            // setishaJamaah(response.data.data[0].type5.alarm_time)
            // setishaAlarm(response.data.data[0].type5.alarm_time)
            
        })
        .catch((error) => {
            console.log('error', error)
            // dispatch(userUpdateProfileFail())

        })
  }


  const convertFajrTime = (getFajr, begins, jamah, alarm) => {

    var getHours = getFajr.slice(0, 2) //4
    var getMinutes = getFajr.slice(3, 5) //53
    var totalMin = (60 * getHours) //240
    var sum = parseInt(totalMin) + parseInt(getMinutes) //293
    var fajrBeginsValCheck = begins ? begins : '00'
    var fajrjamahValCheck = jamah ? jamah : '00'
    var fajralarmValCheck = alarm ? alarm : '00'


    var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
    var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
    var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


    console.log("fajr time----", fajrTotalBegins);
    // alert(fajrTotalBegins)
    var totalFajrBegingsHour = Math.floor(fajrTotalBegins / 60)
    var totalFajrBegingsMinutes = (fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60)
    var totalValFajeBegins
    if (totalFajrBegingsMinutes >= 10 || totalFajrBegingsHour >= 10) {
      totalValFajeBegins = `${totalFajrBegingsHour}:${totalFajrBegingsMinutes}`
      global.fajrrBegins = begins ? totalValFajeBegins : global.fajr
      fajrBEginsData = begins ? totalValFajeBegins : global.fajr
    }
    else {
      totalValFajeBegins = `0${totalFajrBegingsHour}:0${totalFajrBegingsMinutes}`
      global.fajrrBegins = begins ? totalValFajeBegins : global.fajr
      fajrBEginsData = begins ? totalValFajeBegins : global.fajr
    }



    var totalFajrJamaahHour = Math.floor(fajrTotalJamaah / 60)
    var totalFajrJammahMinutes = (fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60)
    var totalValFajeJammah
    if (totalFajrJammahMinutes >= 10 || totalFajrJamaahHour >= 10) {
      totalValFajeJammah = `${totalFajrJamaahHour}:${totalFajrJammahMinutes}`
      global.fajrrJamah = jamah ? totalValFajeJammah : global.fajr
      fajrJamahData = jamah ? totalValFajeJammah : global.fajr
    }
    else {
      totalValFajeJammah = `0${totalFajrJamaahHour}:0${totalFajrJammahMinutes}`
      global.fajrrJamah = jamah ? totalValFajeJammah : global.fajr
      fajrJamahData = jamah ? totalValFajeJammah : global.fajr
    }



    var totalFajrAlarmHour = Math.floor(fajrTotalAlarm / 60)
    var totalFajrAlarmMinutes = (fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60)
    var totalValFajeAlarm
    if (totalFajrAlarmMinutes >= 10 || totalFajrAlarmHour >= 10) {
      totalValFajeAlarm = `${totalFajrAlarmHour}:${totalFajrAlarmMinutes}`
      global.fajrrAlarm = alarm ? totalValFajeAlarm : global.fajr
      fajeAlarmmData = alarm ? totalValFajeAlarm : global.fajr
    }
    else {
      totalValFajeAlarm = `0${totalFajrAlarmHour}:0${totalFajrAlarmMinutes}`
      global.fajrrAlarm = alarm ? totalValFajeAlarm : global.fajr
      fajeAlarmmData = alarm ? totalValFajeAlarm : global.fajr
    }

  }


  const convertSunriseTime = (getFajr, begins, jamah, alarm) => {

    var getHours = getFajr.slice(0, 2) //4
    var getMinutes = getFajr.slice(3, 5) //53
    var totalMin = (60 * getHours) //240
    var sum = parseInt(totalMin) + parseInt(getMinutes) //293


    var fajrBeginsValCheck = begins ? begins : '00'
    var fajrjamahValCheck = jamah ? jamah : '00'
    var fajralarmValCheck = alarm ? alarm : '00'


    var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
    var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
    var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


   
    var totalFajrBegingsHour = Math.floor(fajrTotalBegins / 60)
    var totalFajrBegingsMinutes = (fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60)
    
    var totalValFajeBegins
    if (totalFajrBegingsMinutes >= 10 || totalFajrBegingsHour >= 10) {
      totalValFajeBegins = `${totalFajrBegingsHour}:${totalFajrBegingsMinutes}`
      global.sunriseeBegins = begins ? totalValFajeBegins : global.Sunrise
      sunriseBEginsData = begins ? totalValFajeBegins : global.Sunrise
    }
    else {
      totalValFajeBegins = `0${totalFajrBegingsHour}:0${totalFajrBegingsMinutes}`
      global.sunriseeBegins = begins ? totalValFajeBegins : global.Sunrise
      sunriseBEginsData = begins ? totalValFajeBegins : global.Sunrise
    }

    



    var totalFajrJamaahHour = Math.floor(fajrTotalJamaah / 60)
    var totalFajrJammahMinutes = (fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60)
    var totalValFajeJammah
    if (totalFajrJammahMinutes >= 10 || totalFajrJamaahHour >= 10) {
      totalValFajeJammah = `${totalFajrJamaahHour}:${totalFajrJammahMinutes}`
      global.sunriseeJamah = jamah ? totalValFajeJammah : global.Sunrise
      sunriseJamahData = jamah ? totalValFajeJammah : global.Sunrise
    }
    else {
      totalValFajeJammah = `0${totalFajrJamaahHour}:0${totalFajrJammahMinutes}`
      global.sunriseeJamah = jamah ? totalValFajeJammah : global.Sunrise
      sunriseJamahData = jamah ? totalValFajeJammah : global.Sunrise
    }


    var totalFajrAlarmHour = Math.floor(fajrTotalAlarm / 60)

    var totalFajrAlarmMinutes = (fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60)

    var totalValFajeAlarm
    if (totalFajrAlarmMinutes >= 10 || totalFajrAlarmHour >= 10) {
      totalValFajeAlarm = `${totalFajrAlarmHour}:${totalFajrAlarmMinutes}`
      global.sunriseeAlarm = alarm ? totalValFajeAlarm : global.Sunrise
      sunriseAlarmmData = alarm ? totalValFajeAlarm : global.Sunrise
    }
    else {
      totalValFajeAlarm = `0${totalFajrAlarmHour}:0${totalFajrAlarmMinutes}`
      global.sunriseeAlarm = alarm ? totalValFajeAlarm : global.Sunrise
      sunriseAlarmmData = alarm ? totalValFajeAlarm : global.Sunrise
    }

    


  }


  const convertDuhrTime = (getFajr, begins, jamah, alarm) => {

    var getHours = getFajr.slice(0, 2) //4
    var getMinutes = getFajr.slice(3, 5) //53
    var totalMin = (60 * getHours) //240
    var sum = parseInt(totalMin) + parseInt(getMinutes) //293


    var fajrBeginsValCheck = begins ? begins : '00'
    var fajrjamahValCheck = jamah ? jamah : '00'
    var fajralarmValCheck = alarm ? alarm : '00'


    var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
    var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
    var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


    console.log("fajr time----", fajrTotalBegins);
    var totalFajrBegingsHour = Math.floor(fajrTotalBegins / 60)
    var totalFajrBegingsMinutes = (fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60)
    var totalValFajeBegins
    if (totalFajrBegingsMinutes >= 10 || totalFajrBegingsHour >= 10) {
      totalValFajeBegins = `${totalFajrBegingsHour}:${totalFajrBegingsMinutes}`
      global.zuhrBegins = begins ? totalValFajeBegins : global.zuhr
      duhrBeginData = begins ? totalValFajeBegins : global.zuhr
    }
    else {
      totalValFajeBegins = `0${totalFajrBegingsHour}:0${totalFajrBegingsMinutes}`
      global.zuhrBegins = begins ? totalValFajeBegins : global.zuhr
      duhrBeginData = begins ? totalValFajeBegins : global.zuhr
    }



    var totalFajrJamaahHour = Math.floor(fajrTotalJamaah / 60)
    var totalFajrJammahMinutes = (fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60)
    var totalValFajeJammah
    if (totalFajrJammahMinutes >= 10 || totalFajrJamaahHour >= 10) {
      totalValFajeJammah = `${totalFajrJamaahHour}:${totalFajrJammahMinutes}`
      global.zuhrJamah = jamah ? totalValFajeJammah : global.zuhr
      duhrJamahData = jamah ? totalValFajeJammah : global.zuhr
    }
    else {
      totalValFajeJammah = `0${totalFajrJamaahHour}:0${totalFajrJammahMinutes}`
      global.zuhrJamah = jamah ? totalValFajeJammah : global.zuhr
      duhrJamahData = jamah ? totalValFajeJammah : global.zuhr
    }



    var totalFajrAlarmHour = Math.floor(fajrTotalAlarm / 60)
    var totalFajrAlarmMinutes = (fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60)
    var totalValFajeAlarm
    if (totalFajrAlarmMinutes >= 10 || totalFajrAlarmHour >= 10) {
      totalValFajeAlarm = `${totalFajrAlarmHour}:${totalFajrAlarmMinutes}`
      global.zuhrAlarm = alarm ? totalValFajeAlarm : global.zuhr
      duhrAlarmmData = alarm ? totalValFajeAlarm : global.zuhr
    }
    else {
      totalValFajeAlarm = `0${totalFajrAlarmHour}:0${totalFajrAlarmMinutes}`
      global.zuhrAlarm = alarm ? totalValFajeAlarm : global.zuhr
      duhrAlarmmData = alarm ? totalValFajeAlarm : global.zuhr
    }




  }


  const convertAsrTime = (getFajr, begins, jamah, alarm) => {

    var getHours = getFajr.slice(0, 2) //4
    var getMinutes = getFajr.slice(3, 5) //53
    var totalMin = (60 * getHours) //240
    var sum = parseInt(totalMin) + parseInt(getMinutes) //293



    var fajrBeginsValCheck = begins ? begins : '00'
    var fajrjamahValCheck = jamah ? jamah : '00'
    var fajralarmValCheck = alarm ? alarm : '00'


    var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
    var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
    var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


    console.log("fajr time----", fajrTotalBegins);
    var totalFajrBegingsHour = Math.floor(fajrTotalBegins / 60)
    var totalFajrBegingsMinutes = (fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60)
    var totalValFajeBegins
    if (totalFajrBegingsMinutes >= 10 || totalFajrBegingsHour >= 10) {
      totalValFajeBegins = `${totalFajrBegingsHour}:${totalFajrBegingsMinutes}`
      global.asrBegins = begins ? totalValFajeBegins : global.asr
      asrBeginData = begins ? totalValFajeBegins : global.asr
    }
    else {
      totalValFajeBegins = `0${totalFajrBegingsHour}:0${totalFajrBegingsMinutes}`
      global.asrBegins = begins ? totalValFajeBegins : global.asr
      asrBeginData = begins ? totalValFajeBegins : global.asr
    }



    var totalFajrJamaahHour = Math.floor(fajrTotalJamaah / 60)
    var totalFajrJammahMinutes = (fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60)
    var totalValFajeJammah
    if (totalFajrJammahMinutes >= 10 || totalFajrJamaahHour >= 10) {
      totalValFajeJammah = `${totalFajrJamaahHour}:${totalFajrJammahMinutes}`
      global.asrJamah = jamah ? totalValFajeJammah : global.asr
      asrJamahData = jamah ? totalValFajeJammah : global.asr
    }
    else {
      totalValFajeJammah = `0${totalFajrJamaahHour}:0${totalFajrJammahMinutes}`
      global.asrJamah = jamah ? totalValFajeJammah : global.asr
      asrJamahData = jamah ? totalValFajeJammah : global.asr
    }



    var totalFajrAlarmHour = Math.floor(fajrTotalAlarm / 60)
    var totalFajrAlarmMinutes = (fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60)
    var totalValFajeAlarm
    if (totalFajrAlarmMinutes >= 10 || totalFajrAlarmHour >= 10) {
      totalValFajeAlarm = `${totalFajrAlarmHour}:${totalFajrAlarmMinutes}`
      global.asrAlarm = alarm ? totalValFajeAlarm : global.asr
      asrAlarmmData = alarm ? totalValFajeAlarm : global.asr
    }
    else {
      totalValFajeAlarm = `0${totalFajrAlarmHour}:0${totalFajrAlarmMinutes}`
      global.asrAlarm = alarm ? totalValFajeAlarm : global.asr
      asrAlarmmData = alarm ? totalValFajeAlarm : global.asr
    }





  }


  const convertMaghribTime = (getFajr, begins, jamah, alarm) => {

    var getHours = getFajr.slice(0, 2) //4
    var getMinutes = getFajr.slice(3, 5) //53
    var totalMin = (60 * getHours) //240
    var sum = parseInt(totalMin) + parseInt(getMinutes) //293



    var fajrBeginsValCheck = begins ? begins : '00'
    var fajrjamahValCheck = jamah ? jamah : '00'
    var fajralarmValCheck = alarm ? alarm : '00'


    var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
    var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
    var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


    console.log("fajr time----", fajrTotalBegins);
    var totalFajrBegingsHour = Math.floor(fajrTotalBegins / 60)
    var totalFajrBegingsMinutes = (fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60)
    var totalValFajeBegins
    if (totalFajrBegingsMinutes >= 10 || totalFajrBegingsHour >= 10) {
      totalValFajeBegins = `${totalFajrBegingsHour}:${totalFajrBegingsMinutes}`
      global.maghribBegins = begins ? totalValFajeBegins : global.maghrib
      magribBeginData = begins ? totalValFajeBegins : global.maghrib
    }
    else {
      totalValFajeBegins = `0${totalFajrBegingsHour}:0${totalFajrBegingsMinutes}`
      global.maghribBegins = begins ? totalValFajeBegins : global.maghrib
      magribBeginData = begins ? totalValFajeBegins : global.maghrib
    }



    var totalFajrJamaahHour = Math.floor(fajrTotalJamaah / 60)
    var totalFajrJammahMinutes = (fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60)
    var totalValFajeJammah
    if (totalFajrJammahMinutes >= 10 || totalFajrJamaahHour >= 10) {
      totalValFajeJammah = `${totalFajrJamaahHour}:${totalFajrJammahMinutes}`
      global.maghribJamah = jamah ? totalValFajeJammah : global.maghrib
      magribJamahData = jamah ? totalValFajeJammah : global.maghrib
    }
    else {
      totalValFajeJammah = `0${totalFajrJamaahHour}:0${totalFajrJammahMinutes}`
      global.maghribJamah = jamah ? totalValFajeJammah : global.maghrib
      magribJamahData = jamah ? totalValFajeJammah : global.maghrib
    }



    var totalFajrAlarmHour = Math.floor(fajrTotalAlarm / 60)
    var totalFajrAlarmMinutes = (fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60)
    var totalValFajeAlarm = `${totalFajrAlarmHour}:${totalFajrAlarmMinutes}`

    if (totalFajrAlarmMinutes >= 10 || totalFajrAlarmHour >= 10) {
      totalValFajeAlarm = `${totalFajrAlarmHour}:${totalFajrAlarmMinutes}`
      global.maghribAlarm = alarm ? totalValFajeAlarm : global.maghrib
      magribAlarmmData = alarm ? totalValFajeAlarm : global.maghrib
    }

    else {
      totalValFajeAlarm = `0${totalFajrAlarmHour}:0${totalFajrAlarmMinutes}`
      global.maghribAlarm = alarm ? totalValFajeAlarm : global.maghrib
      magribAlarmmData = alarm ? totalValFajeAlarm : global.maghrib
    }




  }


  const convertIshaTime = (getFajr, begins, jamah, alarm) => {

    var getHours = getFajr.slice(0, 2) //4
    var getMinutes = getFajr.slice(3, 5) //53
    var totalMin = (60 * getHours) //240
    var sum = parseInt(totalMin) + parseInt(getMinutes) //293


    var fajrBeginsValCheck = begins ? begins : '00'
    var fajrjamahValCheck = jamah ? jamah : '00'
    var fajralarmValCheck = alarm ? alarm : '00'


    var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
    var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
    var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


    console.log("fajr time----", fajrTotalBegins);
    var totalFajrBegingsHour = Math.floor(fajrTotalBegins / 60)
    var totalFajrBegingsMinutes = (fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60)
    var totalValFajeBegins
    if (totalFajrBegingsMinutes >= 10 || totalFajrBegingsHour >= 10) {
      totalValFajeBegins = `${totalFajrBegingsHour}:${totalFajrBegingsMinutes}`
      global.ishaBegins = begins ? totalValFajeBegins : global.isha
      ishaBeginData = begins ? totalValFajeBegins : global.isha
    }
    else {
      totalValFajeBegins = `0${totalFajrBegingsHour}:0${totalFajrBegingsMinutes}`
      global.ishaBegins = begins ? totalValFajeBegins : global.isha
      ishaBeginData = begins ? totalValFajeBegins : global.isha
    }



    var totalFajrJamaahHour = Math.floor(fajrTotalJamaah / 60)
    var totalFajrJammahMinutes = (fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60)
    var totalValFajeJammah
    if (totalFajrJammahMinutes >= 10 || totalFajrJamaahHour >= 10) {
      totalValFajeJammah = `${totalFajrJamaahHour}:${totalFajrJammahMinutes}`
      global.ishaJamah = jamah ? totalValFajeJammah : global.isha
      ishaJamahData = jamah ? totalValFajeJammah : global.isha
    }
    else {
      totalValFajeJammah = `0${totalFajrJamaahHour}:0${totalFajrJammahMinutes}`
      global.ishaJamah = jamah ? totalValFajeJammah : global.isha
      ishaJamahData = jamah ? totalValFajeJammah : global.isha
    }



    var totalFajrAlarmHour = Math.floor(fajrTotalAlarm / 60)
    var totalFajrAlarmMinutes = (fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60)
    var totalValFajeAlarm
    if (totalFajrAlarmMinutes >= 10 || totalFajrAlarmHour >= 10) {
      totalValFajeAlarm = `${totalFajrAlarmHour}:${totalFajrAlarmMinutes}`
      global.ishaAlarm = alarm ? totalValFajeAlarm : global.isha
      ishaAlarmmData = alarm ? totalValFajeAlarm : global.isha
    }
    else {
      totalValFajeAlarm = `0${totalFajrAlarmHour}:0${totalFajrAlarmMinutes}`
      global.ishaAlarm = alarm ? totalValFajeAlarm : global.isha
      ishaAlarmmData = alarm ? totalValFajeAlarm : global.isha
    }





  }


  const getAddData = async()=>{
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    var data = {
      "type1":{
          "type":"618e18d4f6d7bb10da227b17",
          "begins_time": fajrBEginsData,
          "jamah_time": fajrJamahData,
          "alarm_time": fajeAlarmmData,
          "prayerTime": global.fajr
      },
       "type2":{
          "type":"618e18f1f6d7bb10da227b1b",
          "begins_time": duhrBeginData,
          "jamah_time": duhrJamahData,
          "alarm_time": duhrAlarmmData,
          "prayerTime": global.zuhr
      },
       "type3":{
          "type":"618e18f8f6d7bb10da227b1d",
          "begins_time": asrBeginData,
          "jamah_time": asrJamahData,
          "alarm_time": asrAlarmmData,
          "prayerTime": global.asr
      },
       "type4":{
          "type":"618e1982f6d7bb10da227b1f",
          "begins_time": magribBeginData,
          "jamah_time": magribJamahData,
          "alarm_time": magribAlarmmData,
          "prayerTime": global.maghrib
      },
       "type5":{
          "type":"618e198ef6d7bb10da227b21",
          "begins_time": ishaBeginData,
          "jamah_time": ishaJamahData,
          "alarm_time": ishaAlarmmData,
          "prayerTime": global.isha
      },
      "type6":{
        "type":"618e18e6f6d7bb10da227b19",
        "begins_time": sunriseBEginsData,
        "jamah_time": sunriseJamahData,
        "alarm_time": sunriseAlarmmData,
        "prayerTime": global.Sunrise
    },
      "user_id": global.userId
  }

 console.log("Manaual Time data for all Prayers====>", data);

    axios.post(baseUrl+ 'manualprayertime/create', data, {
        headers: {
            "auth-token": token
        }
    })
        .then((response) => {
          console.log('response user====>', response)
          alert(response.data.msg)
          navigation.goBack()

        })
        .catch((error) => {
            console.log('error', error)

        })
  }

  const selectItem = (id, item) => {
    setSelectedId(id)

    selectId = id
    if (item.name == "Add") {


      getData()

     var totalFajrBegin = `${FajrBeginItem}${fajrBegins ? fajrBegins : '0'}`
     var totalFajrJamah = `${FajrJamaahItem}${fajrJamaah ? fajrJamaah : '0'}`
     var totalFajrAlarm = `${FajrAlarmItem}${fajrAlarm ? fajrAlarm : '0'}`

     var totalSunBegin = `${SunriseBeginItem}${sunriseBegins ? sunriseBegins : '0'}`
     var totalSunJamah = `${SunriseJamaahItem}${sunriseJamaah ? sunriseJamaah : '0'}`
     var totalSunAlarm = `${SunriseAlarmItem}${sunriseAlarm ? sunriseAlarm : '0'}`


     var totalZuhrBegin = `${duhrBeginItem}${duhrBegins ? duhrBegins : '0'}`
     var totalZuhrJamah = `${duhrJamahItem}${duhrJamaah ? duhrJamaah : '0'}`
     var totalZuhrAlarm = `${duhrAlarmmItem}${duhrAlarm ? duhrAlarm : '0'}`


     var totalAsrBegin = `${asrBeginItem}${asrBegins ? asrBegins : '0'}`
     var totalAsrJamah = `${asrJamahItem}${asrJamaah ? asrJamaah : '0'}`
     var totalAsrAlarm = `${asrAlarmmItem}${asrAlarm ? asrAlarm : '0'}`

     var totalMaghirbBegin = `${magribBeginItem}${maghribBegins ? maghribBegins : '0'}`
     var totalMaghirbJamah = `${magribJamahItem}${maghribJamaah ? maghribJamaah : '0'}`
     var totalMaghirbAlarm = `${magribAlarmmItem}${maghribAlarm ? maghribAlarm : '0'}`

     var totalIshaBegin = `${ishaBeginItem}${ishaBegins ? ishaBegins : '0'}`
     var totalIshaJamah = `${ishaJamahItem}${ishaJamaah ? ishaJamaah : '0'}`
     var totalIshaAlarm = `${ishaAlarmmItem}${ishaAlarm ? ishaAlarm : '0'}`


      convertFajrTime(global.fajr, totalFajrBegin, totalFajrJamah, totalFajrAlarm)
      convertSunriseTime(global.Sunrise, totalSunBegin, totalSunJamah, totalSunAlarm)
      convertDuhrTime(global.zuhr, totalZuhrBegin, totalZuhrJamah, totalZuhrAlarm)
      convertAsrTime(global.asr, totalAsrBegin, totalAsrJamah, totalAsrAlarm)
      convertMaghribTime(global.maghrib, totalMaghirbBegin, totalMaghirbJamah, totalMaghirbAlarm)
      convertIshaTime(global.isha, totalIshaBegin, totalIshaJamah, totalIshaAlarm)

    


      console.log("Fajrrr data====>", global.fajrrBegins, global.fajrrJamah, global.fajrrAlarm);
      console.log("sunriseeee data====>", global.sunriseeBegins, global.sunriseeJamah, global.sunriseeAlarm);
      console.log("dhuhrrrr data====>", global.zuhrBegins, global.zuhrJamah, global.zuhrAlarm);
      console.log("asrrrr data====>", global.asrBegins, global.asrJamah, global.asrAlarm);
      console.log("maghribbb data====>", global.maghribBegins, global.maghribJamah, global.maghribAlarm);
      console.log("ishaaaa data====>", global.ishaBegins, global.ishaJamah, global.ishaAlarm);
      

      getAddData()
      
    }
    else {
      getData()

      global.fajrrBegins = global.fajr
      global.fajrrJamah = global.fajr
      global.fajrrAlarm = global.fajr

      global.sunriseeBegins = global.Sunrise
      global.sunriseeJamah = global.Sunrise
      global.sunriseeAlarm = global.Sunrise

      global.zuhrBegins = global.zuhr
      global.zuhrJamah = global.zuhr
      global.zuhrAlarm = global.zuhr

      global.asrBegins = global.asr
      global.asrJamah = global.asr
      global.asrAlarm = global.asr

      global.maghribBegins = global.maghrib
      global.maghribJamah = global.maghrib
      global.maghribAlarm = global.maghrib

      global.ishaBegins = global.isha
      global.ishaJamah = global.isha
      global.ishaAlarm = global.isha
      // navigation.goBack()
      getAddData1()
    }

  }


  const getAddData1=async()=>{
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    var data = {
      "type1":{
          "type":"618e18d4f6d7bb10da227b17",
          "begins_time": global.fajr,
          "jamah_time": global.fajr,
          "alarm_time": global.fajr,
          "prayerTime": global.fajr
      },
       "type2":{
          "type":"618e18f1f6d7bb10da227b1b",
          "begins_time": global.zuhr,
          "jamah_time": global.zuhr,
          "alarm_time": global.zuhr,
          "prayerTime": global.zuhr
      },
       "type3":{
          "type":"618e18f8f6d7bb10da227b1d",
          "begins_time": global.asr,
          "jamah_time": global.asr,
          "alarm_time": global.asr,
          "prayerTime": global.asr
      },
       "type4":{
          "type":"618e1982f6d7bb10da227b1f",
          "begins_time": global.maghrib,
          "jamah_time": global.maghrib,
          "alarm_time": global.maghrib,
          "prayerTime": global.maghrib
      },
       "type5":{
          "type":"618e198ef6d7bb10da227b21",
          "begins_time": global.isha,
          "jamah_time": global.isha,
          "alarm_time": global.isha,
          "prayerTime": global.isha
      },
      "type6":{
        "type":"618e18e6f6d7bb10da227b19",
        "begins_time": global.Sunrise,
        "jamah_time": global.Sunrise,
        "alarm_time": global.Sunrise,
        "prayerTime": global.Sunrise
    },
      "user_id": global.id
  }

 console.log("Manaual Time data for all Prayers====>", data);

    axios.post('http://112.196.64.119:8000/api/user/manualprayertime/create', data, {
        headers: {
            "auth-token": token
        }
    })
        .then((response) => {
          alert(response.data.msg)
            console.log('response user====>', response)
            navigation.goBack()

        })
        .catch((error) => {
            console.log('error', error)

        })
  }



  const getData = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token bio", token)

    axios.get(baseUrl + 'setting/view', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("response data====>", response.data);
        if (response.data == '') {

          console.log("prayer response===x>", response);
        }
        else {
          global.resposneData = response.data
          global.cityData = response.data[0].city
          global.calCity = response.data[0].city
          global.calMonth = response.data[0].go_to
        }
      })
      .catch((error) => {
        console.log('error', error)
      })






  }



  const selectFajrAlarm = (id, item) => {
    setselectFajrAlarmId(id)
    FajrAlarmItem = item.name
  }

  const selectFajrJamah = (id, item) => {
    setselectFajrJamaahId(id)
    FajrJamaahItem = item.name
  }

  const selectFajrBegin = (id, item) => {
    setselectFajrBeginId(id)
    FajrBeginItem = item.name
  }

  const selectsunriseBegin = (id, item) => {
    setselectsunriseBeginId(id)
    SunriseBeginItem = item.name
  }

  const selectsunriseJamah = (id, item) => {
    setselectsunriseJamahId(id)
    SunriseJamaahItem = item.name
  }

  const selectsunriseAlamm = (id, item) => {
    setselectsunriseAlarmmId(id)
    SunriseAlarmItem = item.name
  }

  const selectduhrBegin = (id, item) => {
    setselectduhrBeginId(id)
    duhrBeginItem = item.name
  }

  const selectduhrJamah = (id, item) => {
    setselectduhrJamahId(id)
    duhrJamahItem = item.name
  }

  const selectduhrAlamm = (id, item) => {
    setselectduhrAlarmmId(id)
    duhrAlarmmItem = item.name
  }

  const selectasrBegin = (id, item) => {
    setselectasrBeginId(id)
    asrBeginItem =  item.name
  }

  const selectasrJamah = (id, item) => {
    setselectasrJamahId(id)
    asrJamahItem = item.name
  }

  const selectasrAlarmm = (id, item) => {
    setselectasrAlarmmId(id)
    asrAlarmmItem = item.name
  }

  const selectmagribBegin = (id, item) => {
    setselectmagribBeginId(id)
    magribBeginItem = item.name
  }

  const selectmaghribJamah = (id, item) => {
    setselectmagribJamahId(id)
    magribJamahItem = item.name
  }

  const selectmaghribAlarm = (id, item) => {
    setselectmagribAlarmmId(id)
    magribAlarmmItem = item.name
  }

  const selectishaBegin = (id, item) => {
    setselectishaBeginId(id)
    ishaBeginItem = item.name
  }

  const selectishaJamah = (id, item) => {
    setselectishaJamahId(id)
    ishaJamahItem = item.name
  }

  const selectishaAlamm = (id, item) => {
    setselectishaAlarmmId(id)
    ishaAlarmmItem = item.name
  }



  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar hidden />

      <View style={{ backgroundColor: '#FAE9D7', height: 47, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
          <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Manual Adjustments</Text>
        </TouchableOpacity>
      </View>






      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: 20, margin: 20 }}>


        <KeyboardAvoidingView style={{}} behavior="padding" enabled >

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', }}>Begins</Text>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginLeft: '5%' }}>Jamaah</Text>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginLeft: '5%', marginRight: 5 }}>Remind</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Fajr:</Text>

            <View style={{
              justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center', color: 'black' }}>{global.fajrPrayer}</Text>
              </View>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>


                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={fajrBegins}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, color: '#000', }}
                    onChangeText={(text) => setFajrBegins(text)}
                    keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    showsVerticalScrollIndicator={false}
                    data={fajrBegin}
                    style={{}}
                    extraData={
                      selectFajrBeginId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectFajrBegin(item.index, item)} style={{ backgroundColor: selectFajrBeginId === item.index ? '#D29F79' : '#FAE9D7', borderTopWidth: 0.4, borderColor: '#FAE9D7', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>

              <View style={{
                height: 40, flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={fajrJamaah}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, color: '#000', }}
                    onChangeText={(text) => setFajrJamaah(text)}
                    keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={fajrJamaahh}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectFajrJamaahId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectFajrJamah(item.index, item)} style={{ backgroundColor: selectFajrJamaahId === item.index ? '#D29F79' : '#FAE9D7', borderTopWidth: 0.4, borderColor: '#FAE9D7', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>

              <View style={{
                height: 40, flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={fajrAlarm}
                    style={{ fontSize: RFValue(10),color: '#000', fontFamily: 'Montserrat-SemiBold', borderRightWidth: 1, marginLeft: 5, borderColor: '#F2DEC9', }}
                    onChangeText={(text) => setFajrAlarm(text)}
                    keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={fajrRemind}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectFajrAlarmId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectFajrAlarm(item.index, item)} style={{ backgroundColor: selectFajrAlarmId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>





              </View>

            </View>
          </View>



{/* =======================================Sunrise=========================================== */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Sunrise:</Text>

            <View style={{
              justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff',  borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center' }}>{global.sunPrayer}</Text>
              </View>
              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={sunriseBegins}
                   style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5 }}
                   onChangeText={(text) => setsunriseBegins(text)}
                   keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={sunriseBegin}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectsunriseBeginId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectsunriseBegin(item.index, item)} style={{ backgroundColor: selectsunriseBeginId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

                
              </View>

              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={sunriseJamaah}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5 }}
                  onChangeText={(text) => setsunriseJamaah(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={sunriseJamah}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectsunriseJamahId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectsunriseJamah(item.index, item)} style={{ backgroundColor: selectsunriseJamahId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={sunriseAlarm}
                   style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5}}
                   onChangeText={(text) => setsunriseAlarm(text)}
                   keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={sunriseAlarmm}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectsunriseAlammId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectsunriseAlamm(item.index, item)} style={{ backgroundColor: selectsunriseAlammId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>



            
            </View>
          </View>





{/* =========================================Dhuhr===================================================== */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Dhuhr:</Text>

            <View style={{
              justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center', color: 'black' }}>{global.duhrPrayer}</Text>
              </View>

              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={duhrBegins}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold',marginLeft: 5 , color: '#000',}}
                  onChangeText={(text) => setduhrBegins(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={duhrBegin}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectduhrBeginId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectduhrBegin(item.index, item)} style={{ backgroundColor: selectduhrBeginId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>




              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={duhrJamaah}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, color: '#000', }}
                  onChangeText={(text) => setduhrJamaah(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={duhrJamah}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectduhrJamahId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectduhrJamah(item.index, item)} style={{ backgroundColor: selectduhrJamahId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={duhrAlarm}
                   style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 0, color: '#000', }}
                   onChangeText={(text) => setduhrAlarm(text)}
                   keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={duhrAlarmm}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectduhrAlammId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectduhrAlamm(item.index, item)} style={{ backgroundColor: selectduhrAlammId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>
              

              

              

            </View>
          </View>



          {/* ===============================================Asr=============================================== */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Asr:</Text>

            <View style={{
              justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff',  borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center' , color: 'black'}}>{global.asrPrayer}</Text>
              </View>

              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={asrBegins}
                   style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, color: '#000',}}
                   onChangeText={(text) => setasrBegins(text)}
                   keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={asrBegin}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectasrBeginId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectasrBegin(item.index, item)} style={{ backgroundColor: selectasrBeginId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={asrJamaah}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                  onChangeText={(text) => setasrJamaah(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={asrJamah}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectasrJamahId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectasrJamah(item.index, item)} style={{ backgroundColor: selectasrJamahId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>


              
              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={asrAlarm}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                  onChangeText={(text) => setasrAlarm(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={asrAlarmm}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectasrAlammId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectasrAlarmm(item.index, item)} style={{ backgroundColor: selectasrAlammId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>
              

              

            </View>
          </View>


          {/* ==============================================Maghrib======================================= */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Maghrib:</Text>

            <View style={{
              justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center' , color: 'black'}}>{global.magribPrayer}</Text>
              </View>
              


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={maghribBegins}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold',  color: '#000',}}
                  onChangeText={(text) => setmaghribBegins(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={maghribBegin}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectmaghribBeginId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectmagribBegin(item.index, item)} style={{ backgroundColor: selectmaghribBeginId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={maghribJamaah}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                  onChangeText={(text) => setmaghribJamaah(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={maghribJamah}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectmaghribJamahId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectmaghribJamah(item.index, item)} style={{ backgroundColor: selectmaghribJamahId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>



              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={maghribAlarm}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                  onChangeText={(text) => setmaghribAlarm(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={maghribAlamm}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectmaghribAlarmId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectmaghribAlarm(item.index, item)} style={{ backgroundColor: selectmaghribAlarmId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>


              

             

            </View>
          </View>



          {/* ==============================isha==================================== */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Isha'a:</Text>

            <View style={{
              justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center', color: 'black' }}>{global.ishaPrayer}</Text>
              </View>

              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={ishaBegins}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold',  color: '#000',}}
                  onChangeText={(text) => setishaBegins(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={ishaBegin}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectishaBeginId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectishaBegin(item.index, item)} style={{ backgroundColor: selectishaBeginId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={ishaJamaah}
                   style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                   onChangeText={(text) => setishaJamaah(text)}
                   keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={ishaJamah}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectishaJamahId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectishaJamah(item.index, item)} style={{ backgroundColor: selectishaJamahId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('15%'), marginLeft: '5%'
              }}>

<View style={{ width: '50%', }}>
                  <TextInput
                   placeholder=" 0"
                   value={ishaAlarm}
                  style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold',  color: '#000',}}
                  onChangeText={(text) => setishaAlarm(text)}
                  keyboardType='default'
                  />
                </View>

                <View style={{ width: '50%', }}>
                  <FlatList
                    scrollEnabled={false}
                    data={ishaAlarmm}
                    showsVerticalScrollIndicator={false}
                    style={{}}
                    extraData={
                      selectshaAlammId
                    }
                    renderItem={({ item }) => {
                      return (
                        <TouchableOpacity onPress={() => selectishaAlamm(item.index, item)} style={{ backgroundColor: selectshaAlammId === item.index ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>

               
              </View>


              

              

             
            </View>
          </View>
















        </KeyboardAvoidingView>

      </ScrollView>
      <View style={{ justifyContent: 'center', alignItems: 'center', bottom: 20, position: 'absolute', marginLeft: 20 }}>
        <FlatList
          data={data}
          numColumns={2}
          key={2}
          extraData={
            selectedId
          }
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity onPress={() => selectItem(item.index, item)} style={{ backgroundColor: selectedId === item.index ? '#D29F79' : '#FAE9D7', width: '44%', height: 40, borderRadius: 8, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'Montserrat-Bold', }}>{item.name}</Text>
              </TouchableOpacity>
            )
          }}
        />
      </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({


});

export default ManuallyTime