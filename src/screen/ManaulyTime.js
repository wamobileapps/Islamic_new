
import React, { useEffect, useRef, useState } from "react"
import { StatusBar, Text, TouchableOpacity, View, StyleSheet,Switch, NativeEventEmitter, ScrollView, NativeModules, ActivityIndicator, KeyboardAvoidingView, TextInput, FlatList, SafeAreaView } from "react-native"
import Iconback from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../Api/COntstant';
import axios from "axios";
import moment from "moment";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
// import {  } from 'react-native-switch';
import ReactNativeAN from 'react-native-alarm-notification';
// import { Switchh } from 'react-native-paper';
import SpinnerModal from '../components/SpinnerModal';
import Slider from "react-native-slider";

import Icon from 'react-native-vector-icons/FontAwesome'
const alarmNotifData = {
  title: 'Alarm',
  vibrate: false,
  // vibrate: true,
  play_sound: true,
  // schedule_type: 'once',
  channel: 'wakeup',
  // data: { content: 'my notification id is 22' },
  loop_sound: true,
  has_button: true,
  repeat_interval: 'daily',
  auto_cancel:false,
	volume: 1.0
  // snooze_interval: 3,
};


const alarmNotifDataNext = {
  title: 'Alarm',
  // vibrate:false,
  // vibrate: true,
  play_sound: true,
  schedule_type: 'once',
  channel: 'wakeup',
  data: { content: 'my notification id is 22' },
  loop_sound: true,
  has_button: true,
  repeat_interval: 'daily',
  snooze_interval: 3,
  auto_cancel:false,
	volume: 1.0
};


const { RNAlarmNotification } = NativeModules;
const RNEmitter = new NativeEventEmitter(RNAlarmNotification);


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

const sunriseBegin = [
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

const duhrJamah = [
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

const duhrAlarmm = [
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

const asrBegin = [
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

const asrJamah = [
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

const asrAlarmm = [
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


const maghribBegin = [
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

const maghribJamah = [
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

const maghribAlamm = [
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

const ishaBegin = [
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

const ishaJamah = [
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

const ishaAlarmm = [
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
var asrJamahItem = '+'
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


var totalValFajeAlarm
var totalValDUhrAlarm
var totalValAsrAlarm
var totalValMAgrbAlarm
var totalValishaAlarm
var totalValsunAlarm


const ManuallyTime = ({ route, navigation }) => {
  
  const [valueFajr, setValueFajr] = useState(5)
  const [valueSun, setValueSun] = useState(5)
  const [valueAsr, setValueAsr] = useState(5)
  const [valuezuhr, setValuezuhr] = useState(5)
  const [valueMagb, setValueMagb] = useState(5)
  const [valueIsha, setValueIsha] = useState(5)


  const [fajrVolume, setFajrVolume] = useState(false)
  const [sunVolume, setSunVolume] = useState(false)
  const [zuhrVolume, setZuhrVolume] = useState(false)

  const [asrVolume, setasrVolume] = useState(false)
  const [magbVolume, setMagbVolume] = useState(false)
  const [ishaVolume, setIshaVolume] = useState(false)



  const [isSwitchOnFajr, setIsSwitchOnFajr] = useState(false);
  const [isSwitchOnSun, setIsSwitchOnSun] = useState(false);
  const [isSwitchOnZuhr, setIsSwitchOnZuhr] = useState(false);
  const [isSwitchOnAsr, setIsSwitchOnAsr] = useState(false)
  const [isSwitchOnMagrb, setIsSwitchOnMagrb] = useState(false)
  const [isSwitchOnIsha, setIsSwitchOnIsha] = useState(false)

  const [isLoading, setisLoading] = useState(true)



  const [selectFajrAlarmId, setselectFajrAlarmId] = useState(null)
  const [selectFajrJamaahId, setselectFajrJamaahId] = useState(null)
  const [selectFajrBeginId, setselectFajrBeginId] = useState(null)

  const [selectsunriseBeginId, setselectsunriseBeginId] = useState(null)
  const [selectsunriseJamahId, setselectsunriseJamahId] = useState(null)
  const [selectsunriseAlammId, setselectsunriseAlarmmId] = useState(null)

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

  const [getFajrsign, setfajrSign] = useState('')
  const [getJamaahSignF, setJmaahSignF] = useState('')
  const [getAlarmSignF, setAlarmSignF] = useState('')
  
  const [getBeginsignS, setBeginSignS] = useState('')
  const [getJamaahSignS, setJmaahSignS] = useState('')
  const [getAlarmSignS, setAlarmSignS] = useState('')

  const [getBeginsignZ, setBeginSignZ] = useState('')
  const [getJamaahSignZ, setJmaahSignZ] = useState('')
  const [getAlarmSignZ, setAlarmSignZ] = useState('')

  const [getBeginsignA, setBeginSignA] = useState('')
  const [getJamaahSignA, setJmaahSignA] = useState('')
  const [getAlarmSignA, setAlarmSignA] = useState('')

  const [getBeginsignM, setBeginSignM] = useState('')
  const [getJamaahSignM, setJmaahSignM] = useState('')
  const [getAlarmSignM, setAlarmSignM] = useState('')

  const [getBeginsignI, setBeginSignI] = useState('')
  const [getJamaahSignI, setJmaahSignI] = useState('')
  const [getAlarmSignI, setAlarmSignI] = useState('')



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

  const [switchV, setSwitch] = useState(false);
  const [timeData, setTimeData] = useState([]);
  const [update, setUpdate] = useState([]);


  const [isVisible, unVisible] = useState(false)

  useEffect(async () => {
    getViewManualData()



  }, [navigation]);


  const getViewManualData = async () => {

    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    axios.get(`http://112.196.64.119:8000/api/user/manualprayerstime/view/${global.userId}`, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log('manual response data=====>', response.data)
        if(response.data.data == '')
{
  setisLoading(false)
}    
else{

 
        setisLoading(false)
        var a = parseInt(global.fajr) - parseInt(response.data.data[0].type1.begins_time)

        setfajrSign(response.data.data[0].type1.begins_time.slice(0,1))
        setJmaahSignF(response.data.data[0].type1.jamah_time.slice(0,1))
        setAlarmSignF(response.data.data[0].type1.alarm_time.slice(0,1))

        setBeginSignS(response.data.data[0].type6.begins_time.slice(0,1))
        setJmaahSignS(response.data.data[0].type6.jamah_time.slice(0,1))
        setAlarmSignS(response.data.data[0].type6.alarm_time.slice(0,1))

        setBeginSignZ(response.data.data[0].type2.begins_time.slice(0,1))
        setJmaahSignZ(response.data.data[0].type2.jamah_time.slice(0,1))
        setAlarmSignZ(response.data.data[0].type2.alarm_time.slice(0,1))

        setBeginSignA(response.data.data[0].type3.begins_time.slice(0,1))
        setJmaahSignA(response.data.data[0].type3.jamah_time.slice(0,1))
        setAlarmSignA(response.data.data[0].type3.alarm_time.slice(0,1))

        setBeginSignM(response.data.data[0].type4.begins_time.slice(0,1))
        setJmaahSignM(response.data.data[0].type4.jamah_time.slice(0,1))
        setAlarmSignM(response.data.data[0].type4.alarm_time.slice(0,1))

        setBeginSignI(response.data.data[0].type5.begins_time.slice(0,1))
        setJmaahSignI(response.data.data[0].type5.jamah_time.slice(0,1))
        setAlarmSignI(response.data.data[0].type5.alarm_time.slice(0,1))

        setFajrBegins(response.data.data[0].type1.begins_time.slice(1, 3))
        setFajrJamaah(response.data.data[0].type1.jamah_time.slice(1, 3))
        setFajrAlarm(response.data.data[0].type1.alarm_time.slice(1, 3))

        setIsSwitchOnFajr(response.data.data[0].type1.set_alarm)
        setIsSwitchOnSun(response.data.data[0].type6.set_alarm)
        setIsSwitchOnZuhr(response.data.data[0].type2.set_alarm)
        setIsSwitchOnAsr(response.data.data[0].type3.set_alarm)
        setIsSwitchOnMagrb(response.data.data[0].type4.set_alarm)
        setIsSwitchOnIsha(response.data.data[0].type5.set_alarm)

        setduhrBegins(response.data.data[0].type2.begins_time.slice(1, 3))
        setduhrJamaah(response.data.data[0].type2.jamah_time.slice(1, 3))
        setduhrAlarm(response.data.data[0].type2.alarm_time.slice(1, 3))



        setasrBegins(response.data.data[0].type3.begins_time.slice(1, 3))
        setasrJamaah(response.data.data[0].type3.jamah_time.slice(1, 3))
        setasrAlarm(response.data.data[0].type3.alarm_time.slice(1, 3))

        setmaghribBegins(response.data.data[0].type4.begins_time.slice(1, 3))
        setmaghribJamaah(response.data.data[0].type4.jamah_time.slice(1, 3))
        setmaghribAlarm(response.data.data[0].type4.alarm_time.slice(1, 3))

        setishaBegins(response.data.data[0].type5.begins_time.slice(1, 3))
        setishaJamaah(response.data.data[0].type5.jamah_time.slice(1, 3))
        setishaAlarm(response.data.data[0].type5.alarm_time.slice(1, 3))

        setsunriseBegins(response.data.data[0].type6.begins_time.slice(1, 3))
        setsunriseJamaah(response.data.data[0].type6.jamah_time.slice(1, 3))
        setsunriseAlarm(response.data.data[0].type6.alarm_time.slice(1, 3))
}
      })
      .catch((error) => {
        console.log('error', error)

      })
  }

  const convertTimeFrom12To24=(timeStr)=> {
		var colon = timeStr.indexOf(':');
		// alert(timeStr)
		var hours = timeStr.substr(0, colon),
			minutes = timeStr.substr(colon + 1, 2),
			meridian = timeStr.substr(colon + 4, 2).toUpperCase();


		var hoursInt = parseInt(hours, 10),
			offset = meridian == 'PM' ? 12 : 0;

		if (hoursInt === 12) {
			hoursInt = offset;
		} else {
			hoursInt += offset;
		}
		return hoursInt + ":" + minutes;
	}


  const getPrayerList = async () => {
    const fajrAlarm = await AsyncStorage.getItem('fajrAlarm')
    const sunAlarm = await AsyncStorage.getItem('sunAlarm')
    const zuhrAlarm = await AsyncStorage.getItem('zuhrAlarm')
    const asrAlarm = await AsyncStorage.getItem('asrAlarm')
    const magrbAlarm = await AsyncStorage.getItem('MagrbAlarm')
    const ishaAlarm = await AsyncStorage.getItem('ishaAlarm')
    var date = moment().format("DD-MM-YYYY")

    const token = await AsyncStorage.getItem('token')

    axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("resonse prayer data manually===>", response.data);
        

        convertFajrTime(response.data.data[0].type1.prayerTime, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
        convertDuhrTime(response.data.data[0].type2.prayerTime, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
        convertAsrTime(response.data.data[0].type3.prayerTime, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
        convertMaghribTime(response.data.data[0].type4.prayerTime, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
        convertIshaTime(response.data.data[0].type5.prayerTime, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
        convertSunTime(response.data.data[0].type6.prayerTime, response.data.data[0].type6.begins_time, response.data.data[0].type6.jamah_time, response.data.data[0].type6.alarm_time)

          console.log("d next===>", totalValFajeAlarm);

          // const alarmForfajrA = convertTimeFrom12To24(`${response.data.data[0].type1.alarmTime} AM`)
					// 		const alarmForSunA = convertTimeFrom12To24(`${response.data.data[0].type6.alarmTime} AM`)
					// 		const alarmForAsrA = convertTimeFrom12To24(`${response.data.data[0].type3.alarmTime} PM`)
					// 		const alarmForMagA = convertTimeFrom12To24(`${response.data.data[0].type4.alarmTime} PM`)
					// 		const alarmForIshaA = convertTimeFrom12To24(`${response.data.data[0].type5.alarmTime} PM`)


          const alarmForfajrA = response.data.data[0].type1.alarmTime
							const alarmForSunA = response.data.data[0].type6.alarmTime
							const alarmForAsrA = response.data.data[0].type3.alarmTime
							const alarmForMagA = response.data.data[0].type4.alarmTime
							const alarmForIshaA = response.data.data[0].type5.alarmTime

         if(response.data.data[0].type1.set_alarm == true)
          {
            console.log("----->item Fajr Alarm", `${date} ${alarmForfajrA}:00`);
               var cal = `${date} ${alarmForfajrA}:00`
               var msg = "Fajr Time Prayer"
               setAlarmNext(cal, msg)
          }

          if(response.data.data[0].type6.set_alarm == true)
          {
            console.log("----->item sun Alarm", `${date} ${alarmForSunA}:00`);
               var cal = `${date} ${alarmForSunA}:00`
               var msg = "Sunrise Time Prayer"
               setAlarmNext(cal, msg)
          }

          if(response.data.data[0].type2.set_alarm == true)
          {
            console.log("----->item Zuhr Alarm", `${date} ${response.data.data[0].type2.alarmTime}:00`);
               var cal = `${date} ${response.data.data[0].type2.alarmTime}:00`
               var msg = "Zuhr Time Prayer"
               setAlarmNext(cal, msg)
          }

          if(response.data.data[0].type3.set_alarm == true)
          {
            console.log("----->item Asr Alarm", `${date} ${alarmForAsrA}:00`);
               var cal = `${date} ${alarmForAsrA}:00`
               var msg = "Asr Time Prayer"
               setAlarmNext(cal, msg)
          }

          if(response.data.data[0].type4.set_alarm == true)
          {
            console.log("----->item Magrb Alarm", `${date} ${alarmForMagA}:00`);
               var cal = `${date} ${alarmForMagA}:00`
               var msg = "Magrib Time Prayer"
               setAlarmNext(cal, msg)
          }

          if(response.data.data[0].type5.set_alarm == true)
          {
            console.log("----->item Isha Alarm", `${date} ${alarmForIshaA}:00`);
               var cal = `${date} ${alarmForIshaA}:00`
               var msg = "Isha Time Prayer"
               setAlarmNext(cal, msg)
          }

      

        console.log("resonse prayer data====>", global.fajrrBegins, global.ishaAlarm, global.maghribAlarm, global.asrAlarm);
        unVisible(false)
        navigation.goBack()
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

    totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ? totalFajrBegingsHour : `0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ? totalFajrBegingsMinutes : `0${totalFajrBegingsMinutes}`}`
    global.fajrrBegins = totalValFajeBegins



    var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
    var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
    var totalValFajeJammah
    totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ? totalFajrJamaahHour : `0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ? totalFajrJammahMinutes : `0${totalFajrJammahMinutes}`}`
    global.fajrrJamah = totalValFajeJammah




    var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
    var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
   
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
   
    totalValDUhrAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.zuhrAlarm = totalValDUhrAlarm





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
   
    totalValAsrAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.asrAlarm = totalValAsrAlarm







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



    var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
    var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
    var totalValFajeBegins

    totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ? totalFajrBegingsHour : `0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ? totalFajrBegingsMinutes : `0${totalFajrBegingsMinutes}`}`
    global.maghribBegins = totalValFajeBegins
    console.log("fajr time mag----", getFajr);




    var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
    var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
    var totalValFajeJammah
    totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ? totalFajrJamaahHour : `0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ? totalFajrJammahMinutes : `0${totalFajrJammahMinutes}`}`
    global.maghribJamah = totalValFajeJammah




    var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
    var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
    
    totalValMAgrbAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.maghribAlarm = totalValMAgrbAlarm







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
   
    totalValishaAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.ishaAlarm = totalValishaAlarm





  }

  const convertSunTime = (getFajr, begins, jamah, alarm) => {

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




    var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
    var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
    var totalValFajeJammah
    totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ? totalFajrJamaahHour : `0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ? totalFajrJammahMinutes : `0${totalFajrJammahMinutes}`}`
    global.sunJamah = totalValFajeJammah




    var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
    var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
    
    totalValsunAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
    global.sunAlarm = totalValsunAlarm





  }

  const convertFajrAlarmTime = (getFajr, alarm) => {
    var getHours = getFajr.slice(0, 2) //4
    var getMinutes = getFajr.slice(3, 5) //53
    var totalMin = (60 * getHours) //240
    var sum = parseInt(totalMin) + parseInt(getMinutes) //293
    
  
    var fajralarmValCheck = alarm
    var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)
    var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
    var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
   
    var totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
   console.log("======>totalValFajeAlarm===>", totalValFajeAlarm);

    return totalValFajeAlarm;
  }


  const selectItem = async (id, item) => {

console.log("SELECT item add button click", valueFajr/10, valueSun/10, valuezuhr/10, valueAsr/10, valueMagb/10, valueIsha/10);

var valueFajrr = valueFajr/10
var valueSunn = valueSun/10
var valuezuhrr = valuezuhr/10
var valueAsrr = valueAsr/10
var valueMagbb = valueMagb/10
var valueIshaa = valueIsha/10


var dnext = []
    setSelectedId(id)
    unVisible(true)
    selectId = id

    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

      if(fajrBegins.length  > 2){
        alert("Fajr Begins must be 2 character ")
      }
      else if(fajrJamaah.length > 2){
        alert("Fajr Jamaah must be 2 character ")
      }
      else if(fajrAlarm.length > 2){
        alert("Fajr Alarm must be 2 character ")
      }
  
      else if(duhrBegins.length  > 2){
        alert("Duhr Begins must be 2 character ")
      }
      else if(duhrJamaah.length > 2){
        alert("Duhr Jamaah must be 2 character ")
      }
      else if(duhrAlarm.length > 2){
        alert("Sunrise Alarm must be 2 character ")
      }
      else if(asrBegins.length  > 2){
        alert("Asr Begins must be 2 character ")
      }
      else if(asrJamaah.length > 2){
        alert("Asr Jamaah must be 2 character ")
      }
      else if(asrAlarm.length > 2){
        alert("Asr Alarm must be 2 character ")
      }
      else if(maghribBegins.length  > 2){
        alert("Maghrib Begins must be 2 character ")
      }
      else if(maghribJamaah.length > 2){
        alert("Maghrib Jamaah must be 2 character ")
      }
      else if(maghribAlarm.length > 2){
        alert("Maghrib Alarm must be 2 character ")
      }
      else if(ishaBegins.length  > 2){
        alert("Isha Begins must be 2 character ")
      }
      else if(ishaJamaah.length > 2){
        alert("Isha Jamaah must be 2 character ")
      }
      else if(ishaAlarm.length > 2){
        alert("Isha Alarm must be 2 character ")
      }
      else{
     

    if (item.name == "Add") {

      setSelectedId(null)
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

 
      var alarmTimeFajr = convertFajrAlarmTime(global.fajrrBegins, totalFajrAlarm)
      var alarmTimeZuhr = convertFajrAlarmTime(global.zuhrBegins, totalZuhrAlarm)
      var alarmTimeAsr = convertFajrAlarmTime(global.asrBegins, totalAsrAlarm)
      var alarmTimeMagrib = convertFajrAlarmTime(global.maghribBegins, totalMaghirbAlarm)
      var alarmTimeIsha = convertFajrAlarmTime(global.ishaBegins, totalIshaAlarm)
      var alarmTimeSun = convertFajrAlarmTime(global.sun, totalSunAlarm)

      console.log("values of alatrm====>",alarmTimeFajr,  alarmTimeZuhr, alarmTimeAsr,alarmTimeMagrib, alarmTimeIsha, alarmTimeSun);

      var data = {
        "type1": {
          "type": "618e18d4f6d7bb10da227b17",
          "begins_time": totalFajrBegin,
          "jamah_time": totalFajrJamah,
          "alarm_time": totalFajrAlarm,
          "prayerTime": global.fajrrBegins,
          "set_alarm": isSwitchOnFajr,
          "alarmTime": alarmTimeFajr,
          "alarmVolume": valueFajrr == 0 ? "0.0" : valueFajrr == 1 ? "1.0" : valueFajrr
        },
        "type2": {
          "type": "618e18f1f6d7bb10da227b1b",
          "begins_time": totalZuhrBegin,
          "jamah_time": totalZuhrJamah,
          "alarm_time": totalZuhrAlarm,
          "prayerTime": global.zuhrBegins,
          "set_alarm": isSwitchOnZuhr,
          "alarmTime": alarmTimeZuhr,
          "alarmVolume" : valuezuhrr == 0 ? "0.0" : valuezuhrr == 1 ? "1.0" : valuezuhrr
        },
        "type3": {
          "type": "618e18f8f6d7bb10da227b1d",
          "begins_time": totalAsrBegin,
          "jamah_time": totalAsrJamah,
          "alarm_time": totalAsrAlarm,
          "prayerTime": global.asrBegins,
          "set_alarm": isSwitchOnAsr,
          "alarmTime": alarmTimeAsr,
          "alarmVolume" : valueAsrr == 0 ? "0.0" : valueAsrr == 1 ? "1.0" : valueAsrr
        },
        "type4": {
          "type": "618e1982f6d7bb10da227b1f",
          "begins_time": totalMaghirbBegin,
          "jamah_time": totalMaghirbJamah,
          "alarm_time": totalMaghirbAlarm,
          "prayerTime": global.maghribBegins,
          "set_alarm": isSwitchOnMagrb,
          "alarmTime": alarmTimeMagrib,
          "alarmVolume" :  valueMagbb == 0 ? "0.0" : valueMagbb == 1 ? "1.0" : valueMagbb
        },
        "type5": {
          "type": "618e198ef6d7bb10da227b21",
          "begins_time": totalIshaBegin,
          "jamah_time": totalIshaJamah,
          "alarm_time": totalIshaAlarm,
          "prayerTime": global.ishaBegins,
          "set_alarm": isSwitchOnIsha,
          "alarmTime": alarmTimeIsha,
          "alarmVolume" :  valueIshaa == 0 ? "0.0" : valueIshaa == 1 ? "1.0" : valueIshaa
        },
        "type6": {
          "type": "618e18e6f6d7bb10da227b19",
          "begins_time": totalSunBegin,
          "jamah_time": totalSunJamah,
          "alarm_time": totalSunAlarm,
          "prayerTime": global.sun,
          "set_alarm": isSwitchOnSun,
          "alarmTime": alarmTimeSun,
          "alarmVolume" : valueSunn == 0 ? "0.0" : valueSunn == 1 ? "1.0" : valueSunn
        },
        "user_id": global.userId
      }

      console.log("Manaual Time data for all Prayers====>", data,"==", valueSun, valueIsha, valueMagb, valueAsr, valuezuhr, valueFajr);

      axios.post(baseUrl + 'manualprayertime/create', data, {
        headers: {
          "auth-token": token
        }
      })
        .then((response) => {
          console.log('response user for add====>', response, valueSun == 0 ? "0.0" : valueSun == 1 ? "0.1" : valueSun, valueIsha, valueMagb, valueAsr, valuezuhr, valueFajr)


          
          alert(response.data.msg)
          getPrayerList()
          unVisible(false)

        })
        .catch((error) => {
          console.log('error', error)

        })

    }
    else {
      getData()
      unVisible(true)
      setSelectedId(null)
      var totalFajrBegin = "+0"
      var totalFajrJamah = "+0"
      var totalFajrAlarm = "+0"

      var totalSunBegin = "+0"
      var totalSunJamah = "+0"
      var totalSunAlarm = "+0"


      var totalZuhrBegin = "+0"
      var totalZuhrJamah = "+0"
      var totalZuhrAlarm = "+0"


      var totalAsrBegin = "+0"
      var totalAsrJamah = "+0"
      var totalAsrAlarm = "+0"

      var totalMaghirbBegin = "+0"
      var totalMaghirbJamah = "+0"
      var totalMaghirbAlarm = "+0"

      var totalIshaBegin = "+0"
      var totalIshaJamah = "+0"
      var totalIshaAlarm = "+0"


      var alarmTimeFajr = convertFajrAlarmTime(global.fajrrBegins, totalFajrAlarm)
      var alarmTimeZuhr = convertFajrAlarmTime(global.zuhrBegins, totalZuhrAlarm)
      var alarmTimeAsr = convertFajrAlarmTime(global.asrBegins, totalAsrAlarm)
      var alarmTimeMagrib = convertFajrAlarmTime(global.maghribBegins, totalMaghirbAlarm)
      var alarmTimeIsha = convertFajrAlarmTime(global.ishaBegins, totalIshaAlarm)
      var alarmTimeSun = convertFajrAlarmTime(global.sun, totalSunAlarm)

      var data = {
        "type1": {
          "type": "618e18d4f6d7bb10da227b17",
          "begins_time": totalFajrBegin,
          "jamah_time": totalFajrJamah,
          "alarm_time": totalFajrAlarm,
          "prayerTime": global.fajrrBegins,
          "set_alarm": isSwitchOnFajr,
          "alarmTime": alarmTimeFajr,
          "alarmVolume" : valueFajrr == 0 ? "0.0" : valueFajrr == 1 ? "1.0" : valueFajrr 
        },
        "type2": {
          "type": "618e18f1f6d7bb10da227b1b",
          "begins_time": totalZuhrBegin,
          "jamah_time": totalZuhrJamah,
          "alarm_time": totalZuhrAlarm,
          "prayerTime": global.zuhrBegins,
          "set_alarm": isSwitchOnZuhr,
          "alarmTime": alarmTimeZuhr,
          "alarmVolume" : valuezuhrr == 0 ? "0.0" : valuezuhrr == 1 ? "1.0" : valuezuhrr
        },
        "type3": {
          "type": "618e18f8f6d7bb10da227b1d",
          "begins_time": totalAsrBegin,
          "jamah_time": totalAsrJamah,
          "alarm_time": totalAsrAlarm,
          "prayerTime": global.asrBegins,
          "set_alarm": isSwitchOnAsr,
          "alarmTime": alarmTimeAsr,
          "alarmVolume" : valueAsrr == 0 ? "0.0" : valueAsrr == 1 ? "1.0" : valueAsrr
        },
        "type4": {
          "type": "618e1982f6d7bb10da227b1f",
          "begins_time": totalMaghirbBegin,
          "jamah_time": totalMaghirbJamah,
          "alarm_time": totalMaghirbAlarm,
          "prayerTime": global.maghribBegins,
          "set_alarm": isSwitchOnMagrb,
          "alarmTime": alarmTimeMagrib,
          "alarmVolume" : valueMagbb == 0 ? "0.0" : valueMagbb == 1 ? "1.0" : valueMagbb
        },
        "type5": {
          "type": "618e198ef6d7bb10da227b21",
          "begins_time": totalIshaBegin,
          "jamah_time": totalIshaJamah,
          "alarm_time": totalIshaAlarm,
          "prayerTime": global.ishaBegins,
          "set_alarm": isSwitchOnIsha,
          "alarmTime": alarmTimeIsha,
          "alarmVolume" : valueIshaa == 0 ? "0.0" : valueIshaa == 1 ? "1.0" : valueIshaa
        },
        "type6": {
          "type": "618e18e6f6d7bb10da227b19",
          "begins_time": totalSunBegin,
          "jamah_time": totalSunJamah,
          "alarm_time": totalSunAlarm,
          "prayerTime": global.sun,
          "set_alarm": isSwitchOnSun,
          "alarmTime": alarmTimeSun,
          "alarmVolume" : valueSunn == 0 ? "0.0" : valueSunn == 1 ? "1.0" : valueSunn
        },
        "user_id": global.userId
      }

      console.log("Manaual Time data for all Prayers====>", data);

      axios.post(baseUrl + 'manualprayertime/create', data, {
        headers: {
          "auth-token": token
        }
      })
        .then((response) => {
          console.log('response user====>', response)
          // alert(response.data.msg)
          // navigation.goBack()
          getPrayerList()
          unVisible(false)
        })
        .catch((error) => {
          console.log('error', error)

        })
    }
      }
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
    setAlarmSignF(item.name)
  }

  const selectFajrJamah = (id, item) => {
    setselectFajrJamaahId(id)
    FajrJamaahItem = item.name
    setJmaahSignF(item.name)
  }

  const selectFajrBegin = (id, item) => {
    setselectFajrBeginId(id)
    FajrBeginItem = item.name
    setfajrSign(item.name)
  }

  const selectsunriseBegin = (id, item) => {
    setselectsunriseBeginId(id)
    SunriseBeginItem = item.name
    setBeginSignS(item.name)
  }

  const selectsunriseJamah = (id, item) => {
    setselectsunriseJamahId(id)
    SunriseJamaahItem = item.name
    setJmaahSignS(item.name)
  }

  const selectsunriseAlamm = (id, item) => {
    setselectsunriseAlarmmId(id)
    SunriseAlarmItem = item.name
    setAlarmSignS(item.name)
  }

  const selectduhrBegin = (id, item) => {
    setselectduhrBeginId(id)
    duhrBeginItem = item.name
    setBeginSignZ(item.name)
  }

  const selectduhrJamah = (id, item) => {
    setselectduhrJamahId(id)
    duhrJamahItem = item.name
    setJmaahSignZ(item.name)
  }

  const selectduhrAlamm = (id, item) => {
    setselectduhrAlarmmId(id)
    duhrAlarmmItem = item.name
    setAlarmSignZ(item.name)
  }

  const selectasrBegin = (id, item) => {
    setselectasrBeginId(id)
    asrBeginItem = item.name
    setBeginSignA(item.name)
  }

  const selectasrJamah = (id, item) => {
    setselectasrJamahId(id)
    asrJamahItem = item.name
    setJmaahSignA(item.name)
  }

  const selectasrAlarmm = (id, item) => {
    setselectasrAlarmmId(id)
    asrAlarmmItem = item.name
    setAlarmSignA(item.name)
  }

  const selectmagribBegin = (id, item) => {
    setselectmagribBeginId(id)
    magribBeginItem = item.name
    setBeginSignM(item.name)
  }

  const selectmaghribJamah = (id, item) => {
    setselectmagribJamahId(id)
    magribJamahItem = item.name
    setJmaahSignM(item.name)
  }

  const selectmaghribAlarm = (id, item) => {
    setselectmagribAlarmmId(id)
    magribAlarmmItem = item.name
    setAlarmSignM(item.name)
  }

  const selectishaBegin = (id, item) => {
    setselectishaBeginId(id)
    ishaBeginItem = item.name
    setBeginSignI(item.name)
  }

  const selectishaJamah = (id, item) => {
    setselectishaJamahId(id)
    ishaJamahItem = item.name
    setJmaahSignI(item.name)
  }

  const selectishaAlamm = (id, item) => {
    setselectishaAlarmmId(id)
    ishaAlarmmItem = item.name
    setAlarmSignI(item.name)
  }


  const setAlarmNext = async (cal, msg) => {

    const details = { ...alarmNotifDataNext, fire_date: cal, 
      message: msg};
     // console.log(`alarm set: ${cal}`);

    try {
      const alarm = await ReactNativeAN.scheduleAlarm(details);
      console.log(alarm);
      if (alarm) {

        setUpdate([...update, { date: `alarm set: ${cal}`, id: alarm.id }])
       
      }
    } catch (e) {
      console.log(e);
    }
  };


  const setAlarm = async (cal, msg) => {

    const details = {
      ...alarmNotifData, fire_date: cal, sound_name: 'beep.mp3',
      message: msg
    };
    console.log(`alarm set: ${cal}`);

    try {
      const alarm = await ReactNativeAN.scheduleAlarm(details);
      console.log("alarm", alarm);
      if (alarm) {

        setUpdate([...update, { date: `alarm set: ${cal}`, id: alarm.id }])
        // this.setState({
        //   update: [...update, { date: `alarm set: ${cal}`, id: alarm.id }],
        // });
      }
    } catch (e) {
      console.log(e);
    }
  };

  
   const toggleSwitchFajr=async(p)=>{
    var date = moment().format("DD-MM-YYYY")
    setIsSwitchOnFajr(previousState => !previousState)
    // d.push(global.fajrrBegins, global.zuhrBegins, global.asrBegins, global.maghribBegins, global.ishaBegins)
    // alert(p)
    await AsyncStorage.setItem("fajrAlarm",JSON.stringify(p))

   if(p == true ){
      console.log("----->item F", `${date} ${global.f}:00`);
      var cal = `${date} ${global.f}:00`
      var msg = "Fajr Time"
      // setAlarm(cal, msg)
   }
  }

   const toggleSwitchSun=async(p)=>{
    var date = moment().format("DD-MM-YYYY")
    setIsSwitchOnSun(previousState => !previousState)
    await AsyncStorage.setItem("sunAlarm",JSON.stringify(p))

    if(p == true ){
      console.log("----->item S", `${date} ${global.sun}:00`);
      var cal = `${date} ${global.sun}:00`
      var msg = "Sunrise Time"
      // setAlarm(cal, msg)
   }
   }

   const toggleSwitchZuhr=async(p)=>{
    var date = moment().format("DD-MM-YYYY")
    setIsSwitchOnZuhr(previousState => !previousState)
    await AsyncStorage.setItem("zuhrAlarm",JSON.stringify(p))

    if(p == true ){
      console.log("----->item Z", `${date} ${global.z}:00`);
      var cal = `${date} ${global.z}:00`
      var msg = "Zuhr Time"
      // setAlarm(cal, msg)
   }
   }

   const toggleSwitchAsr=async(p)=>{
    var date = moment().format("DD-MM-YYYY")
    setIsSwitchOnAsr(previousState => !previousState)
    await AsyncStorage.setItem("asrAlarm",JSON.stringify(p))

    if(p == true ){
      console.log("----->item A", `${date} ${global.a}:00`);
      var cal = `${date} ${global.a}:00`
      var msg = "Asr Time"
      // setAlarm(cal, msg)
   }
   }

   const toggleSwitchMagrb=async(p)=>{
    var date = moment().format("DD-MM-YYYY")
    setIsSwitchOnMagrb(previousState => !previousState)
    await AsyncStorage.setItem("magrbAlarm",JSON.stringify(p))

    if(p == true ){
      console.log("----->item M", `${date} ${global.m}:00`);
      var cal = `${date} ${global.m}:00`
      var msg = "Magrib Time"
      // setAlarm(cal, msg)
   }
   }

   const toggleSwitchIsha=async(p)=>{
    var date = moment().format("DD-MM-YYYY")
    setIsSwitchOnIsha(previousState => !previousState)
    await AsyncStorage.setItem("ishaAlarm",JSON.stringify(p))

    if(p == true ){
      console.log("----->item I", `${date} ${global.i}:00`);
      var cal = `${date} ${global.i}:00`
      var msg = "Isha Time"
      // setAlarm(cal, msg)
   }
   }

   const setValueOfZuhrVolumn=()=>{
    setZuhrVolume(!zuhrVolume)
    setFajrVolume(false)
    setSunVolume(false)
    setasrVolume(false)
    setMagbVolume(false)
    setIshaVolume(false)
   }

   const setValueOfSunVolume=()=>{
    setSunVolume(!sunVolume)
    setFajrVolume(false)
    setZuhrVolume(false)
    setasrVolume(false)
    setMagbVolume(false)
    setIshaVolume(false)
   }

   const setValueOfFajrVolume=()=>{
    setFajrVolume(!fajrVolume)
    setZuhrVolume(false)
    setasrVolume(false)
    setMagbVolume(false)
    setIshaVolume(false)
    setSunVolume(false)
   }

   const setValueOfAsrVolume=()=>{
    setasrVolume(!asrVolume)
    setZuhrVolume(false)
    setFajrVolume(false)
    setMagbVolume(false)
    setIshaVolume(false)
    setSunVolume(false)
   }

   const setValueOfmagbVolume=()=>{
    setMagbVolume(!magbVolume)
    setZuhrVolume(false)
    setFajrVolume(false)
    setasrVolume(false)
    setIshaVolume(false)
    setSunVolume(false)
   }

   const setValueOfIshaVolume=()=>{
     setIshaVolume(!ishaVolume)
     setZuhrVolume(false)
    setFajrVolume(false)
    setasrVolume(false)
    setMagbVolume(false)
    setSunVolume(false)
   }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <StatusBar hidden />

      <View style={{ backgroundColor: '#FAE9D7', height: 47, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
          <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Manual Adjustments, Jamā'ah and Alarm</Text>
        </TouchableOpacity>
      </View>






      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: 20, marginTop: 20, marginLeft:5, marginRight:5 }}>


        <KeyboardAvoidingView style={{}} behavior="padding" enabled >

          <View style={{ flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center' }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', }}>Begins</Text>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginLeft: '5%' }}>Jamaah</Text>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginLeft: '5%', marginRight: '25%' }}>Alarm</Text>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Fajr:</Text>

            <View style={{
               flexDirection: 'row', alignItems: 'center'
               , marginLeft: 5
            }}>

              <View style={{ 
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center', color: 'black' }}>{global.fajrrBeginss}</Text>
              </View>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>


                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={fajrBegins}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, color: '#000', }}
                    onChangeText={(text) => setFajrBegins(text)}
                    keyboardType='numeric'
                    onFocus= {() => setFajrBegins("")}
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
                        <TouchableOpacity onPress={() => selectFajrBegin(item.index, item)} style={{ backgroundColor: selectFajrBeginId === item.index || getFajrsign == item.name ? '#D29F79' : '#FAE9D7', borderTopWidth: 0.4, borderColor: '#FAE9D7', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>

              <View style={{
                height: 40, flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={fajrJamaah}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, color: '#000', }}
                    onChangeText={(text) => setFajrJamaah(text)}
                    keyboardType='numeric'
                    onFocus= {() => setFajrJamaah("")}
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
                        <TouchableOpacity onPress={() => selectFajrJamah(item.index, item)} style={{ backgroundColor: selectFajrJamaahId === item.index || getJamaahSignF == item.name ? '#D29F79' : '#FAE9D7', borderTopWidth: 0.4, borderColor: '#FAE9D7', alignItems: 'center', justifyContent: 'center' }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>

              <View style={{
                height: 40, flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={fajrAlarm}
                    style={{ fontSize: RFValue(10), color: '#000', fontFamily: 'Montserrat-SemiBold', borderRightWidth: 1, marginLeft: 5, borderColor: '#F2DEC9', }}
                    onChangeText={(text) => setFajrAlarm(text)}
                    keyboardType='numeric'
                    onFocus= {() => setFajrAlarm("")}
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
                        <TouchableOpacity onPress={() => selectFajrAlarm(item.index, item)} style={{ backgroundColor: selectFajrAlarmId === item.index || getAlarmSignF == item.name ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>





              </View>

              <Switch
            style={{marginLeft: 5}}
         trackColor={{ false: "red", true: "green" }}
        thumbColor={isSwitchOnFajr ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchFajr}
        value={isSwitchOnFajr}
      />

<TouchableOpacity onPress={()=>isSwitchOnFajr ? setValueOfFajrVolume() : alert('Please set alarm time')}>
<Icon name={'volume-up'  } size={25} color={isSwitchOnFajr ? '#000' :'#a9a9a9'} style={{ marginLeft: 5, }}  />
</TouchableOpacity>

            </View>

            

            {/* <Switch
            value={switchV}
            onValueChange={(val) => onValueChange(val)}
            disabled={false}
            activeText={'On'}
            inActiveText={'Off'}
            backgroundActive={'green'}
            backgroundInactive={'red'}
            circleActiveColor={'green'}
            switchLeftPx={2}
            circleInActiveColor={'red'}
            circleBorderActiveColor={'#30a566'} /> */}
          </View>



          {/* =======================================Sunrise=========================================== */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Sun:</Text>

            <View style={{
             marginLeft: 5, flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center', marginLeft: 4,
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center' }}>{global.suns}</Text>
              </View>
              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={sunriseBegins}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5 }}
                    onChangeText={(text) => setsunriseBegins(text)}
                    keyboardType='numeric'
                    onFocus= {() => setsunriseBegins("")}
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
                        <TouchableOpacity onPress={() => selectsunriseBegin(item.index, item)} style={{ backgroundColor: selectsunriseBeginId === item.index || getBeginsignS == item.name ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>

              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={sunriseJamaah}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5 }}
                    onChangeText={(text) => setsunriseJamaah(text)}
                    keyboardType='numeric'
                    onFocus= {() => setsunriseJamaah("")}
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
                        <TouchableOpacity onPress={() => selectsunriseJamah(item.index, item)} style={{ backgroundColor: selectsunriseJamahId === item.index || getJamaahSignS == item.name ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={sunriseAlarm}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5 }}
                    onChangeText={(text) => setsunriseAlarm(text)}
                    keyboardType='numeric'
                    onFocus= {() => setsunriseAlarm("")}
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
                        <TouchableOpacity onPress={() => selectsunriseAlamm(item.index, item)} style={{ backgroundColor: selectsunriseAlammId === item.index  || getAlarmSignS == item.name? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>


              <Switch
             style={{marginLeft: 5}}
        trackColor={{ false: "red", true: "green" }}
        thumbColor={isSwitchOnSun ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchSun}
        value={isSwitchOnSun}
      />

<TouchableOpacity onPress={()=>isSwitchOnSun ? setValueOfSunVolume() : alert('Please set alarm time')}>
<Icon name={'volume-up'  } size={25} color={isSwitchOnSun ? '#000' :'#a9a9a9'} style={{ marginLeft: 5, }}  />
</TouchableOpacity>


            </View>
            
          </View>





          {/* =========================================Dhuhr===================================================== */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(10.5), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Zuhr:</Text>

            <View style={{
              marginLeft: 5, flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center', color: 'black' }}>{global.zuhrBeginss}</Text>
              </View>

              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={duhrBegins}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, color: '#000', }}
                    onChangeText={(text) => setduhrBegins(text)}
                    keyboardType='numeric'
                    onFocus= {() => setduhrBegins("")}
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
                        <TouchableOpacity onPress={() => selectduhrBegin(item.index, item)} style={{ backgroundColor: selectduhrBeginId === item.index || getBeginsignZ == item.name? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>




              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={duhrJamaah}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, color: '#000', }}
                    onChangeText={(text) => setduhrJamaah(text)}
                    keyboardType='numeric'
                    onFocus= {() => setduhrJamaah("")}
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
                        <TouchableOpacity onPress={() => selectduhrJamah(item.index, item)} style={{ backgroundColor: selectduhrJamahId === item.index || getJamaahSignZ == item.name ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={duhrAlarm}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 0, color: '#000', }}
                    onChangeText={(text) => setduhrAlarm(text)}
                    keyboardType='numeric'
                    onFocus= {() => setduhrAlarm("")}
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
                        <TouchableOpacity onPress={() => selectduhrAlamm(item.index, item)} style={{ backgroundColor: selectduhrAlammId === item.index || getAlarmSignZ == item.name? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>


              <Switch
              style={{marginLeft: 5}}
        trackColor={{ false: "red", true: "green" }}
        thumbColor={isSwitchOnZuhr ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchZuhr}
        value={isSwitchOnZuhr}
      />


<TouchableOpacity onPress={()=>isSwitchOnZuhr ? setValueOfZuhrVolumn() : alert('Please set alarm time')}>
<Icon name={'volume-up'  } size={25} color={isSwitchOnZuhr ? '#000' :'#a9a9a9'} style={{ marginLeft: 5, }}  />
</TouchableOpacity>
            </View>
            
          </View>



          {/* ===============================================Asr=============================================== */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Asr:  </Text>

            <View style={{
              marginLeft: 5, flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center', color: 'black' }}>{global.asrBeginss}</Text>
              </View>

              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={asrBegins}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5, color: '#000', }}
                    onChangeText={(text) => setasrBegins(text)}
                    keyboardType='numeric'
                    onFocus= {() => setasrBegins("")}
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
                        <TouchableOpacity onPress={() => selectasrBegin(item.index, item)} style={{ backgroundColor: selectasrBeginId === item.index || getBeginsignA == item.name ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={asrJamaah}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                    onChangeText={(text) => setasrJamaah(text)}
                    keyboardType='numeric'
                    onFocus= {() => setasrJamaah("")}
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
                        <TouchableOpacity onPress={() => selectasrJamah(item.index, item)} style={{ backgroundColor: selectasrJamahId === item.index || getJamaahSignA == item.name? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>



              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={asrAlarm}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                    onChangeText={(text) => setasrAlarm(text)}
                    keyboardType='numeric'
                    onFocus= {() => setasrAlarm("")}
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
                        <TouchableOpacity onPress={() => selectasrAlarmm(item.index, item)} style={{ backgroundColor: selectasrAlammId === item.index || getAlarmSignA == item.name? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>

              <Switch
              style={{marginLeft: 5}}
         trackColor={{ false: "red", true: "green" }}
        thumbColor={isSwitchOnAsr ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchAsr}
        value={isSwitchOnAsr}
      />

<TouchableOpacity onPress={()=>isSwitchOnAsr ? setValueOfAsrVolume() : alert('Please set alarm time')}>
<Icon name={'volume-up'  } size={25} color={isSwitchOnAsr ? '#000' :'#a9a9a9'} style={{ marginLeft: 5, }}  />
</TouchableOpacity>


            </View>
            
          </View>


          {/* ==============================================Maghrib======================================= */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(10.7), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Mgrb:</Text>

            <View style={{
              marginLeft: 5, flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center', color: 'black' }}>{global.maghribBeginss}</Text>
              </View>



              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={maghribBegins}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                    onChangeText={(text) => setmaghribBegins(text)}
                    keyboardType='numeric'
                    onFocus= {() => setmaghribBegins("")}
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
                        <TouchableOpacity onPress={() => selectmagribBegin(item.index, item)} style={{ backgroundColor: selectmaghribBeginId === item.index || getBeginsignM == item.name ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={maghribJamaah}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                    onChangeText={(text) => setmaghribJamaah(text)}
                    keyboardType='numeric'
                    onFocus= {() => setmaghribJamaah("")}
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
                        <TouchableOpacity onPress={() => selectmaghribJamah(item.index, item)} style={{ backgroundColor: selectmaghribJamahId === item.index || getJamaahSignM == item.name? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>



              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={maghribAlarm}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                    onChangeText={(text) => setmaghribAlarm(text)}
                    keyboardType='numeric'
                    onFocus= {() => setmaghribAlarm("")}
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
                        <TouchableOpacity onPress={() => selectmaghribAlarm(item.index, item)} style={{ backgroundColor: selectmaghribAlarmId === item.index || getAlarmSignM == item.name? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>



              <Switch
              style={{marginLeft: 5}}
        trackColor={{ false: "red", true: "green" }}
        thumbColor={isSwitchOnMagrb ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchMagrb}
        value={isSwitchOnMagrb}
      />
<TouchableOpacity onPress={()=>isSwitchOnMagrb ? setValueOfmagbVolume() : alert('Please set alarm time')}>
<Icon name={'volume-up'  } size={25} color={isSwitchOnMagrb ? '#000' :'#a9a9a9'} style={{ marginLeft: 5, }}  />
</TouchableOpacity>

            </View>
           
          </View>



          {/* ==============================isha==================================== */}


          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 20 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>Isha:</Text>

            <View style={{
              marginLeft: 5, flexDirection: 'row', alignItems: 'center'

            }}>

              <View style={{
                justifyContent: 'center',
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), justifyContent: 'center'
              }}>

                <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', alignItems: 'center', color: 'black' }}>{global.ishaBeginss}</Text>
              </View>

              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={ishaBegins}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                    onChangeText={(text) => setishaBegins(text)}
                    keyboardType='numeric'
                    onFocus= {() => setishaBegins("")}
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
                        <TouchableOpacity onPress={() => selectishaBegin(item.index, item)} style={{ backgroundColor: selectishaBeginId === item.index || getBeginsignI == item.name? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={ishaJamaah}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                    onChangeText={(text) => setishaJamaah(text)}
                    keyboardType='numeric'
                    onFocus= {() => setishaJamaah("")}
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
                        <TouchableOpacity onPress={() => selectishaJamah(item.index, item)} style={{ backgroundColor: selectishaJamahId === item.index || getJamaahSignI == item.name ? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>


              <View style={{
                height: 40, alignItems: 'center', flexDirection: 'row', shadowColor: '#000000',
                backgroundColor: '#fff', borderWidth: 1, borderColor: '#F2DEC9', width: wp('14%'), marginLeft: '3%'
              }}>

                <View style={{ width: '50%', }}>
                  <TextInput
                    placeholder=" 0"
                    value={ishaAlarm}
                    style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', color: '#000', }}
                    onChangeText={(text) => setishaAlarm(text)}
                    keyboardType='numeric'
                    onFocus= {() => setishaAlarm("")}
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
                        <TouchableOpacity onPress={() => selectishaAlamm(item.index, item)} style={{ backgroundColor: selectshaAlammId === item.index || getAlarmSignI == item.name? '#D29F79' : '#FAE9D7', alignItems: 'center', justifyContent: 'center', borderTopWidth: 0.4, borderColor: '#FAE9D7', }}>
                          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold', height: 20, }}>{item.name}</Text>
                        </TouchableOpacity>
                      )
                    }}
                  />
                </View>


              </View>




              <Switch
              style={{marginLeft: 5}}
        trackColor={{ false: "red", true: "green" }}
        thumbColor={isSwitchOnIsha ? "#f4f3f4" : "#f4f3f4"}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitchIsha}
        value={isSwitchOnIsha}
      />
<TouchableOpacity onPress={()=>isSwitchOnIsha ? setValueOfIshaVolume() : alert('Please set alarm time')}>
<Icon name={'volume-up'  } size={25} color={isSwitchOnIsha ? '#000' :'#a9a9a9'} style={{ marginLeft: 5, }}  />
</TouchableOpacity>

            </View> 
           
          </View>
















        </KeyboardAvoidingView>

        {/* <View style={{ flexDirection: 'row', marginTop: '20%', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontFamily: 'Montserrat-Bold', }}>Alarm: </Text>

          <Switch
            value={switchV}
            onValueChange={(val) => onValueChange(val)}
            disabled={false}
            activeText={'On'}
            inActiveText={'Off'}
            backgroundActive={'green'}
            backgroundInactive={'red'}
            circleActiveColor={'green'}
            switchLeftPx={2}
            circleInActiveColor={'red'}
            circleBorderActiveColor={'#30a566'} />
        </View> */}
      </ScrollView>

      {fajrVolume ? 
      <View style={{position: 'absolute',bottom: '25%',}}>
                        <Slider
                          value={valueFajr}
                          style={{ marginLeft: 40, marginRight: 40 , width: 250}}
                          onValueChange={value => setValueFajr(value)}
                          step={1}
                          thumbTintColor='#C68849'
                          thumbTouchSize={{ width: 30, height: 30 }}
                          minimumValue={0.0}
                          maximumValue={10}
                          minimumTrackTintColor='#C68849'
                          maximumTrackTintColor='#FAE4CD'
                        />
                      </View>

                      : null}

{sunVolume ? 
      <View style={{position: 'absolute',bottom: '25%',}}>
                        <Slider
                          value={valueSun}
                          style={{ marginLeft: 40, marginRight: 40 , width: 250}}
                          onValueChange={value => setValueSun(value)}
                          step={1}
                          thumbTintColor='#C68849'
                          thumbTouchSize={{ width: 30, height: 30 }}
                          minimumValue={0.0}
                          maximumValue={10}
                          minimumTrackTintColor='#C68849'
                          maximumTrackTintColor='#FAE4CD'
                        />
                      </View>

                      : null}


{asrVolume ? 
      <View style={{position: 'absolute',bottom: '25%',}}>
                        <Slider
                          value={valueAsr}
                          style={{ marginLeft: 40, marginRight: 40 , width: 250}}
                          onValueChange={value => setValueAsr(value)}
                          step={1}
                          thumbTintColor='#C68849'
                          thumbTouchSize={{ width: 30, height: 30 }}
                          minimumValue={0.0}
                          maximumValue={10}
                          minimumTrackTintColor='#C68849'
                          maximumTrackTintColor='#FAE4CD'
                        />
                      </View>

                      : null}

{magbVolume ? 
      <View style={{position: 'absolute',bottom: '25%',}}>
                        <Slider
                          value={valueMagb}
                          style={{ marginLeft: 40, marginRight: 40 , width: 250}}
                          onValueChange={value => setValueMagb(value)}
                          step={1}
                          thumbTintColor='#C68849'
                          thumbTouchSize={{ width: 30, height: 30 }}
                          minimumValue={0.0}
                          maximumValue={10}
                          minimumTrackTintColor='#C68849'
                          maximumTrackTintColor='#FAE4CD'
                        />
                      </View>

                      : null}

{ishaVolume ? 
      <View style={{position: 'absolute',bottom: '25%',}}>
                        <Slider
                          value={valueIsha}
                          style={{ marginLeft: 40, marginRight: 40 , width: 250}}
                          onValueChange={value => setValueIsha(value)}
                          step={1}
                          thumbTintColor='#C68849'
                          thumbTouchSize={{ width: 30, height: 30 }}
                          minimumValue={0.0}
                          maximumValue={10}
                          minimumTrackTintColor='#C68849'
                          maximumTrackTintColor='#FAE4CD'
                        />
                      </View>

                      : null}


{zuhrVolume ? 
      <View style={{position: 'absolute',bottom: '25%',}}>
                        <Slider
                          value={valuezuhr}
                          style={{ marginLeft: 40, marginRight: 40 , width: 250}}
                          onValueChange={value => setValuezuhr(value)}
                          step={1}
                          thumbTintColor='#C68849'
                          thumbTouchSize={{ width: 30, height: 30 }}
                          minimumValue={0.0}
                          maximumValue={10}
                          minimumTrackTintColor='#C68849'
                          maximumTrackTintColor='#FAE4CD'
                        />
                      </View>

                      : null}


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
                {isVisible && selectedId === item.index ?
                  <ActivityIndicator size="small" color="#000" />
                  : <Text style={{ fontFamily: 'Montserrat-Bold', }}>{item.name}</Text>
                }
              </TouchableOpacity>
            )
          }}
        />
      </View>

      


      <SpinnerModal
          visible={isLoading}
          heading="Please Wait ..."
        />

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({


});

export default ManuallyTime