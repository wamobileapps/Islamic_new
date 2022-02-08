// /**
//  * @format
//  */

// import {AppRegistry} from 'react-native';
// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerComponent(appName, () => App);
// import HeartBeat  from './Heartbeat';

// import PushNotification, {Importance} from 'react-native-push-notification';
// import {Alert, AppRegistry, Platform} from 'react-native';
// import { setHeartBeat, store } from './store';


// PushNotification.configure({
//   onRegister: function (token) {
//       console.log("token:", token);

//   },

//   onNotification: function (notification) {
//       console.log("ntf:", notification);
//       if (notification.action === "ReplyInput") {
//           console.log("texto", notification)// this will contain the inline reply text. 
//       }
//     },
//     senderID: "136437729679",

//   // (optional) Called when Registered Action is pressed and invokeApp is false, if true onNotification will be called (Android)
//   onAction: function (notification) {
//       console.log("act:", notification.action);
//       console.log("ntfact:", notification);

//       // process the action
//   },

//   // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
//   onRegistrationError: function (err) {
//       console.error(err.message, err);
//   },
//   popInitialNotification: true,
// });

// PushNotification.createChannel(
//   {
//     channelId: "muslimm-channel", // (required)
//     channelName: "My channel", // (required)
//     channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
//     playSound: false, // (optional) default: true
//     soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
//     importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
//     vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
//   },
//   (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
// );

// const MyHeadlessTask = async () => {
//   console.log('Receiving HeartBeat!');
//   store.dispatch(setHeartBeat(true));
//   setTimeout(() => {
//     store.dispatch(setHeartBeat(false));
//   }, 5000);
// };


// import App from './App';
// import {name as appName} from './app.json';

// AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);

// AppRegistry.registerComponent(appName, () => App);



import { AppRegistry } from 'react-native';
import React from 'react';
import { Provider } from 'react-redux';
import App from './App';
import { name as appName } from './app.json';
import { setHeartBeat, store } from './store';
import ReactNativeAN from 'react-native-alarm-notification';
import axios from 'axios';
import moment from 'moment';
import AsyncStorage from "@react-native-community/async-storage";

const repeatAlarmNotifData = {
	title: 'Alarm',
	// vibrate:false,
	// vibrate: true,
	play_sound: true,
	schedule_type: 'daily',
	channel: 'wakeup',
	data: { content: 'my notification id is 22' },
	loop_sound: true,
	has_button: true,
	repeat_interval: 'daily',
	snooze_interval: 3,
	auto_cancel:false,
	volume: 1.0
	// repeat_interval: 'minutely',
	// interval_value: 5, // repeat after 5 minutes
};

var update;
const MyHeadlessTask = () => {
  
  setInterval(()=>{
    console.log('Receiving HeartBeat!');
    getData()
    console.log('Execution successfull')
  }, 600000)
return <></>
};

const convertTimeFrom12To24=(timeStr)=>{
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

const getLondonTime1 = async () => {
  var dates = moment().format("DD-MM-YYYY")

  const token = await AsyncStorage.getItem('token')
  var dates = moment().format("DD-MM-YYYY")


  var date = new Date().getMonth() + 1
  axios.get(`https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.calMonth}&24hours=true`)
    .then((response) => {
      global.prayerDat = response.data.times
      global.calendarPrayerData = response.data.times






      var filtered;
      var currentDate = []
      var filterArr = []
      currentDate.push(moment().format("DD"))
      var mm = moment().month(global.calMonth).format("M");
      var mon = mm.length == 2 ? mm : `0${mm}`

      var finalDate = `${global.calYear}-${mon}-${currentDate}`
      filtered = Object.keys(response.data.times)
        .filter(key => finalDate.includes(key))
        .reduce((obj, key) => {
          obj[key] = response.data.times[key];
          return obj;
        }, {});

      filterArr.push(filtered)

      filterArr.map((i) => {

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



        axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
          headers: {
            'auth-token': token
          }
        })
          .then((response) => {
            console.log("time format for london prayer", response);
            if (response.data.data.length == 0) {

            }
            else {
              convertFajrTime(response.data.data[0].type1.prayerTime, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time, response.data.data[0].type1.set_alarm)
              convertDuhrTime(response.data.data[0].type2.prayerTime, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time, response.data.data[0].type2.set_alarm)
             convertAsrTime(response.data.data[0].type3.prayerTime, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time, response.data.data[0].type3.set_alarm)
              convertMaghribTime(response.data.data[0].type4.prayerTime, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time, response.data.data[0].type4.set_alarm)
              convertIshaTime(response.data.data[0].type5.prayerTime, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time, response.data.data[0].type5.set_alarm)
              convertSunTime(response.data.data[0].type6.prayerTime, response.data.data[0].type6.begins_time, response.data.data[0].type6.jamah_time, response.data.data[0].type6.alarm_time, response.data.data[0].type6.set_alarm)
            }


          })


        axios.get(`http://112.196.64.119:8000/api/user/manualprayerstime/view/${global.userId}`, {
          headers: {
            'auth-token': token
          }
        })
          .then((response) => {

            console.log("response data m ===>", parseFloat(response.data.data[0].type1.alarmVolume), response.data.data[0], response.data.data[0].type6.prayerTime, dates, global.userId);
         

            const alarmForfajrA = convertTimeFrom12To24(`${response.data.data[0].type1.alarmTime} AM`)
            const alarmForSunA = convertTimeFrom12To24(`${response.data.data[0].type6.alarmTime} AM`)
            const alarmForAsrA = convertTimeFrom12To24(`${response.data.data[0].type3.alarmTime} PM`)
            const alarmForMagA = convertTimeFrom12To24(`${response.data.data[0].type4.alarmTime} PM`)
            const alarmForIshaA = convertTimeFrom12To24(`${response.data.data[0].type5.alarmTime} PM`)

            if (response.data.data[0].type1.set_alarm == true) {
              
              var calA = `${dates} ${alarmForfajrA}:00`
              var msg = "Fajr Time"
              // this.setAlarm(cal, msg)
              setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
            }

            if (response.data.data[0].type6.set_alarm == true) {
              
              var calA = `${dates} ${alarmForSunA}:00`
              var msg = "Sunrise Time"
              // this.setAlarm(cal, msg)
              setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
            }

            if (response.data.data[0].type2.set_alarm == true) {
            
              var calA = `${dates} ${response.data.data[0].type2.alarmTime}:00`
              var msg = "Zuhr Time"
             setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
            }

            if (response.data.data[0].type3.set_alarm == true) {
             
              var calA = `${dates} ${alarmForAsrA}:00`
              var msg = "Asr Time"
              setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
            }

            if (response.data.data[0].type4.set_alarm == true) {
             
              var calA = `${dates} ${alarmForMagA}:00`
              var msg = "Magrib Time"
              // this.setAlarm(cal, msg)
              setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
            }

            if (response.data.data[0].type5.set_alarm == true) {
              
              var calA = `${dates} ${alarmForIshaA}:00`
              var msg = "Isha Time"
              // this.setAlarm(cal, msg)
              setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
            }
          })

          .catch((error) => {
            console.log('error', error)
          })


      })
    })
}


const getData = async () => {
  console.log('Get data is called')
  var dates = moment().format("DD-MM-YYYY")
  const token = await AsyncStorage.getItem('token')
  console.log("setting response", token);
  axios.get('http://112.196.64.119:8000/api/user/setting/view', {
    headers: {
      'auth-token': token
    }
  })
    .then((response) => {

      if (response.data == '') {

      }
      else {

        var date = new Date();
        var month = date.getMonth() + 1
        var year = date.getFullYear()


        global.resposneData = response.data
        global.calCity = response.data[0].city

        global.calCountry = response.data[0].country
        global.calAsr = response.data[0].prayer_method
        global.london = response.data[0].prayer_method
        // global.calMonth = response.data[0].go_to
        global.calYear = year

        console.log("get Data");

        if (global.london == "London Unified Prayer Time") {

          getLondonTime1()
        }
        else {

          console.log("djxnjkcn-", `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.calMonth}&year=${global.calYear}`);

          axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.calMonth}&year=${global.calYear}`)
            .then((res) => {
              var d = moment().format("DD")
              res.data.data.map((item) => {
                if (item.date.readable.slice(0, 3).includes(d)) {


                  global.fajrrBeginss = changeTimeFormat(item.timings.Fajr)

                  global.asrBeginss = changeTimeFormat(item.timings.Asr);

                  global.zuhrBeginss = changeTimeFormat(item.timings.Dhuhr)

                  global.maghribBeginss = changeTimeFormat(item.timings.Maghrib);

                  global.ishaBeginss = changeTimeFormat(item.timings.Isha)
                  global.suns = item.timings.Sunrise.slice(0, 5)
                }
                console.log("response=====>", global.fajrrBeginss, item.timings.Fajr, item.date.readable.slice(0, 3), item, d, item.date.readable.includes(d));

              })


              global.prayerDat = res.data.data

              axios.get(`http://112.196.64.119:8000/api/user/manualprayerstime/view/${global.userId}`, {
                headers: {
                  'auth-token': token
                }
              })
                .then((response) => {
                  console.log("response of adhan prayers====>", response.data.data[0]);

                  const alarmForfajr = response.data.data[0].type1.prayerTime
                  const alarmForSun = response.data.data[0].type6.prayerTime
                  const alarmForAsr = response.data.data[0].type3.prayerTime
                  const alarmForMag = response.data.data[0].type4.prayerTime
                  const alarmForIsha = response.data.data[0].type5.prayerTime

                  const alarmForfajrA = response.data.data[0].type1.alarmTime
                  const alarmForSunA = response.data.data[0].type6.alarmTime
                  const alarmForAsrA = response.data.data[0].type3.alarmTime
                  const alarmForMagA = response.data.data[0].type4.alarmTime
                  const alarmForIshaA = response.data.data[0].type5.alarmTime


                  // const alarmForfajrA = this.convertTimeFrom12To24(`${response.data.data[0].type1.alarmTime} AM`)
                  // const alarmForSunA = this.convertTimeFrom12To24(`${response.data.data[0].type6.alarmTime} AM`)
                  // const alarmForAsrA = this.convertTimeFrom12To24(`${response.data.data[0].type3.alarmTime} PM`)
                  // const alarmForMagA = this.convertTimeFrom12To24(`${response.data.data[0].type4.alarmTime} PM`)
                  // const alarmForIshaA = this.convertTimeFrom12To24(`${response.data.data[0].type5.alarmTime} PM`)

                  if (response.data.data[0].type1.set_alarm == true) {
                    console.log("----->item F=", `${dates} ${alarmForfajr}:00`);
                    var cal = `${dates} ${alarmForfajr}:00`
                    var calA = `${dates} ${alarmForfajrA}:00`
                    var msg = "Fajr Time"
                    // this.setAlarm(cal, msg)
                    setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
                  }

                  if (response.data.data[0].type6.set_alarm == true) {
                    console.log("----->item S=", `${dates} ${alarmForSun}:00`);
                    var cal = `${dates} ${alarmForSun}:00`
                    var calA = `${dates} ${alarmForSunA}:00`
                    var msg = "Sunrise Time"
                    // this.setAlarm(cal, msg)
                   setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
                  }

                  if (response.data.data[0].type2.set_alarm == true) {
                    console.log("----->item Z=", `${dates} ${response.data.data[0].type2.prayerTime}:00`);
                    var cal = `${dates} ${response.data.data[0].type2.prayerTime}:00`
                    var calA = `${dates} ${response.data.data[0].type2.alarmTime}:00`
                    var msg = "Zuhr Time"
                    // this.setAlarm(cal, msg)
                    setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
                  }

                  if (response.data.data[0].type3.set_alarm == true) {
                    console.log("----->item A=", `${dates} ${alarmForAsr}:00`);
                    var cal = `${dates} ${alarmForAsr}:00`
                    var calA = `${dates} ${alarmForAsrA}:00`
                    var msg = "Asr Time"
                    // this.setAlarm(cal, msg)
                    setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
                  }

                  if (response.data.data[0].type4.set_alarm == true) {
                    console.log("----->item M=", `${dates} ${alarmForMag}:00`);
                    var cal = `${dates} ${alarmForMag}:00`
                    var calA = `${dates} ${alarmForMagA}:00`
                    var msg = "Magrib Time"
                    // this.setAlarm(cal, msg)
                    setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
                  }

                  if (response.data.data[0].type5.set_alarm == true) {
                    console.log("----->item I=", `${dates} ${alarmForIsha}:00`);
                    var cal = `${dates} ${alarmForIsha}:00`
                    var calA = `${dates} ${alarmForIshaA}:00`
                    var msg = "Isha Time"
                    // this.setAlarm(cal, msg)
                    setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
                  }
                })
            })
        }
      }
    })
    .catch((error) => {
      console.log('error get data', error)
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

const convertFajrTime = async (getFajr, begins, jamah, alarm, val) => {
  const fajrAlarm = await AsyncStorage.getItem('fajrAlarm')


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
  global.fajrrAlarm = val == true ? totalValFajeAlarm : "-"
}

const convertDuhrTime = async (getFajr, begins, jamah, alarm, val) => {
  const zuhrAlarm = await AsyncStorage.getItem('zuhrAlarm')

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
  global.zuhrAlarm = val == true ? totalValFajeAlarm : "-"
}


const convertAsrTime = async (getFajr, begins, jamah, alarm, val) => {
  const asrAlarm = await AsyncStorage.getItem('asrAlarm')

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
  global.asrAlarm = val == true ? totalValFajeAlarm : "-"
}


const convertMaghribTime = async (getFajr, begins, jamah, alarm, val) => {
  const magrbAlarm = await AsyncStorage.getItem('MagrbAlarm')

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




  var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
  var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
  var totalValFajeJammah
  totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ? totalFajrJamaahHour : `0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ? totalFajrJammahMinutes : `0${totalFajrJammahMinutes}`}`
  global.maghribJamah = totalValFajeJammah




  var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
  var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
  var totalValFajeAlarm
  totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ? totalFajrAlarmHour : `0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ? totalFajrAlarmMinutes : `0${totalFajrAlarmMinutes}`}`
  global.maghribAlarm = val == true ? totalValFajeAlarm : "-"







}


const convertIshaTime = async (getFajr, begins, jamah, alarm, val) => {
  const ishaAlarm = await AsyncStorage.getItem('ishaAlarm')

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

const convertSunTime = async (getFajr, begins, jamah, alarm, val) => {
  const sunAlarm = await AsyncStorage.getItem('sunAlarm')

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
  global.sun = totalValFajeBegins

}

const setAlarmNext = async (cal, msg) => {
  // let a  = [18,19,20,22,24];
  // a.map((i) => this.setFutureRpeatAlarm(i));

  const details = {
    ...repeatAlarmNotifData, fire_date: cal,
    message: msg
  };





  console.log(`alarm set: ${cal}`);

  try {
    const alarm = await ReactNativeAN.scheduleAlarm(details);
    console.log(alarm);
    if (alarm) {
        update= [...update, { date: `alarm set: ${cal}`, id: alarm.id }]
    }
  } catch (e) {
    console.log(e);
  }
};

const RNRedux = () => (
  <Provider store={store}>
    <App />
    <MyHeadlessTask/>
  </Provider>
);


AppRegistry.registerHeadlessTask('Heartbeat', () => MyHeadlessTask);
AppRegistry.registerComponent(appName, () => RNRedux);
