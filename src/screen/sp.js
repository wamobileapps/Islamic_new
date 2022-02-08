// // import React, { useEffect } from 'react';
// // import { View, Image, Text, TouchableOpacity } from 'react-native';
// // import AsyncStorage from "@react-native-community/async-storage";
// // import axios from 'axios';
// // const bg = require('../images/bg.png')
// // import Orientation from 'react-native-orientation';
// // import ReactNativeAN from 'react-native-alarm-notification';



// // const alarmNotifData = {
// // 	title: "My Notification Title",
// // 	message: "My Notification Message",
// //   snooze_interval: 1,
// //   vibration: 1000,
// // 	// channel: "my_channel_id",
// // 	// small_icon: "ic_launcher",

// // 	// You can add any additional data that is important for the notification
// // 	// It will be added to the PendingIntent along with the rest of the bundle.
// // 	// e.g.
// //   	data: { foo: "bar" },
// //     has_button: true
// // };

// // const fireDate = '13-12-2021 17:12:30';	
// // const fireDate1 = '13-12-2021 17:13:00';	
// // console.log(fireDate); 
// // const Splash = (props) => {

// //     useEffect(async()=>{

// //     })


// //     const stopInterval=()=>{
// //       console.log("xdsjkh");
// //       ReactNativeAN.stopAlarmSound = () => {
// //         return RNAlarmNotification.stopAlarmSound();
// //       };
// //     }

// //     const method=async()=>{

// //       const alarm = await ReactNativeAN.scheduleAlarm({ ...alarmNotifData, fire_date: fireDate });
// //       // console.log(alarm); // { id: 1 }
// //       console.log("aram---->",alarm);



// //       //Delete Scheduled Alarm
// //       ReactNativeAN.deleteAlarm(alarm.id);

// //       //Delete Repeating Alarm
// //       ReactNativeAN.deleteRepeatingAlarm(alarm.id);

// //       //Stop Alarm
// //       var a =ReactNativeAN.stopAlarmSound({fire_date: fireDate1});
// //       console.log("cdfkmgv", a);

// //       //Send Local Notification Now
// //       ReactNativeAN.sendNotification(alarmNotifData);

// //       //Get All Scheduled Alarms
// //       const alarms = await ReactNativeAN.getScheduledAlarms();

// //       //Clear Notification(s) From Notification Center/Tray
// //       ReactNativeAN.removeFiredNotification(alarm.id);
// //       ReactNativeAN.removeAllFiredNotifications();
// //   }




// //   return (
// //     <View style={{flex: 1, backgroundColor: '#FAE9D7', alignItems: 'center', justifyContent:'center'}}>
// //         <TouchableOpacity onPress={method}>
// //         <Text>vchjv</Text>
// //         </TouchableOpacity>
// //     </View>

// //   )

// // }

// // export default Splash


// // // import React, { useEffect } from 'react';
// // // import { View, Image } from 'react-native';
// // // import AsyncStorage from "@react-native-community/async-storage";
// // // import axios from 'axios';
// // // const bg = require('../images/bg.png')
// // // import Orientation from 'react-native-orientation';

// // // const Splash = (props) => {

// // //     useEffect(async()=>{
// // //       const value = await AsyncStorage.getItem('token')
// // //     console.log("TOKEN", value)
// // //     Orientation.lockToPortrait();
// // //     getData()
// // // getUser()
// // // getPrayerList()

// // // const token = await AsyncStorage.getItem('token')

// // // global.tokenVal = token
// // //     setTimeout(() => {
// // //       // if(value){
// // //       //   console.log("if")
// // //       //   if(value === ''){
// // //       //     console.log(" if--")
// // //       //     props.navigation.navigate("Login")
// // //       //    }else{
// // //       //      console.log("else if")
// // //       //     global.token = value





// // //           props.navigation.navigate("Logo")
// // //       //    }
// // //       // }else{
// // //       //   console.log("else")
// // //       //   props.navigation.navigate("Login")
// // //       // }

// // //     }, 3000)

// // //     })


// // //     const getLondonTime1 = async () => {
// // //       const dayData = []
// // //       const fajrData = []
// // //       const sunhrData = []
// // //       const duhrData = []
// // //       const asrData = []
// // //       const magrbData = []
// // //       const ishaData = []
// // //       const colData = []


// // //       var date = new Date().getMonth() + 1
// // //       console.log("date l=====> ", global.calMonth);
// // //       axios.get(`https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.calMonth}&24hours=false`)
// // //         .then((response) => {
// // //           global.prayerDat = response.data.times
// // //           global.calendarPrayerData = response.data.times






// // //           var filtered;
// // //           console.log(typeof response.data);
// // //           var currentDate = []
// // //           var filterArr = []
// // //           currentDate.push(moment().format("DD"))
// // //            var mon = global.calMonth.length == 2 ? global.calMonth : `0${global.calMonth}`

// // //           var finalDate = `${2021}-${mon}-${currentDate}`
// // //           console.log("finalDate", finalDate);
// // //           filtered = Object.keys(response.data.times)
// // //             .filter(key => finalDate.includes(key))
// // //             .reduce((obj, key) => {
// // //               obj[key] = response.data.times[key];
// // //               return obj;
// // //             }, {});

// // //           console.log("filtered", filtered);
// // //           filterArr.push(filtered)

// // //           filterArr.map((i) => {
// // //             console.log(i[finalDate].fajr)
// // //             // global.fajr = i[currentDate[0]].fajr
// // //             global.fajrrBegins = i[finalDate].fajr
// // //             global.fajrrJamah = i[finalDate].fajr_jamat
// // //             global.fajrrAlarm = "-"

// // //             global.zuhrBegins = i[finalDate].dhuhr
// // //             global.zuhrJamah = i[finalDate].dhuhr_jamat
// // //             global.zuhrAlarm = "-"

// // //             global.asrBegins = i[finalDate].asr
// // //             global.asrJamah = i[finalDate].asr_jamat
// // //             global.asrAlarm = "-"

// // //             global.maghribBegins = i[finalDate].magrib
// // //             global.maghribJamah = i[finalDate].magrib_jamat
// // //             global.maghribAlarm = "-"

// // //             global.ishaBegins = i[finalDate].isha
// // //             global.ishaJamah = i[finalDate].isha_jamat
// // //             global.ishaAlarm = "-"

// // //             global.sun = i[finalDate].sunrise
// // //             // global.zuhr = i[currentDate[0]].dhuhr
// // //             // global.asr = i[currentDate[0]].asr
// // //             // global.maghrib = i[currentDate[0]].magrib
// // //             // global.isha = i[currentDate[0]].isha



// // //           })
// // //           // console.log("get london time====>", response.data.times,  moment().format("YYYY-MM-DD"), Object.values(response.data.times).includes('2021-11-29'));
// // //         })
// // //     }


// // //     const getData = async () => {
// // //       const token = await AsyncStorage.getItem('token')
// // //       console.log("auth token bio", token)

// // //       axios.get('http://112.196.64.119:8000/api/user/setting/view', {
// // //         headers: {
// // //           'auth-token': token
// // //         }
// // //       })
// // //         .then((response) => {
// // //           console.log("prayer respons", response.data);
// // //           if(response.data == ''){

// // //             console.log("prayer response===x>", response);
// // //           }
// // //           else {

// // //           var date = new Date();
// // //           var month = date.getMonth() + 1
// // //           var year = date.getFullYear()


// // //           global.resposneData = response.data
// // //           global.calCity= response.data[0].city
// // //           global.calCountry= response.data[0].country
// // //           global.calAsr= response.data[0].prayer_method
// // //           global.london = response.data[0].prayer_method
// // //           global.calMonth= response.data[0].go_to
// // //           global.calYear= year



// // //           if(global.london == "London Unified Prayer Time"){

// // //             getLondonTime1()
// // //           }
// // //           else{

// // //           console.log("djxnjkcn-", `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.calMonth}&year=2021`);

// // //           axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.calMonth}&year=${global.calYear}`)
// // //           .then((res) => {


// // //             global.prayerDat = res.data.data
// // //             console.log("prayer response===x> splash", global.prayerDat, global.calMonth, global.london);


// // //           })
// // //         }
// // //         }
// // //         })
// // //         .catch((error) => {
// // //           console.log('error', error)
// // //         })






// // //     }

// // //     const getPrayerList = async () => {
// // //       const token = await AsyncStorage.getItem('token')

// // //       axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
// // //         headers: {
// // //           'auth-token': token
// // //         }
// // //       })
// // //         .then((response) => {


// // //           console.log("response of maual prayer time", response.data.data); //[]
// // //           if(response.data.length !== 0 && response.data.length !== undefined){
// // //         convertFajrTime(response.data.data[0].type1.prayerTime, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
// // //         convertDuhrTime(response.data.data[0].type2.prayerTime, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
// // //         convertAsrTime(response.data.data[0].type3.prayerTime, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
// // //         convertMaghribTime(response.data.data[0].type4.prayerTime, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
// // //         convertIshaTime(response.data.data[0].type5.prayerTime, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
// // //         global.sun = response.data.data[0].type6.prayerTime
// // //           }

// // //           // props.navigation.navigate('Drawer')
// // //         })

// // //         .catch((error) => {
// // //           console.log('error', error)
// // //         })
// // //     }


// // //     const convertFajrTime = (getFajr, begins, jamah, alarm) => {

// // //       var getHours = getFajr.slice(0, 2) //4
// // //       var getMinutes = getFajr.slice(3, 5) //53
// // //       var totalMin = (60 * getHours) //240
// // //       var sum = parseInt(totalMin) + parseInt(getMinutes) //293
// // //       var fajrBeginsValCheck = begins 
// // //       var fajrjamahValCheck = jamah 
// // //       var fajralarmValCheck = alarm 


// // //       var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
// // //       var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
// // //       var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


// // //       // alert(fajrTotalBegins)
// // //       var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
// // //       var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
// // //       var totalValFajeBegins

// // //       totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
// // //             global.fajrrBegins =totalValFajeBegins




// // //       var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
// // //       var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
// // //       var totalValFajeJammah
// // //       totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
// // //       global.fajrrJamah =totalValFajeJammah




// // //       var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
// // //       var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
// // //       var totalValFajeAlarm
// // //       totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
// // //       global.fajrrAlarm =totalValFajeAlarm

// // //     }





// // //     const convertDuhrTime = (getFajr, begins, jamah, alarm) => {

// // //       var getHours = getFajr.slice(0, 2) //4
// // //       var getMinutes = getFajr.slice(3, 5) //53
// // //       var totalMin = (60 * getHours) //240
// // //       var sum = parseInt(totalMin) + parseInt(getMinutes) //293


// // //       var fajrBeginsValCheck = begins 
// // //       var fajrjamahValCheck = jamah 
// // //       var fajralarmValCheck = alarm


// // //       var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
// // //       var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
// // //       var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


// // //       console.log("fajr time----", fajrTotalBegins);

// // //       var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
// // //       var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
// // //       var totalValFajeBegins

// // //       totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
// // //             global.zuhrBegins =totalValFajeBegins




// // //       var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
// // //       var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
// // //       var totalValFajeJammah
// // //       totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
// // //       global.zuhrJamah =totalValFajeJammah




// // //       var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
// // //       var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
// // //       var totalValFajeAlarm
// // //       totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
// // //       global.zuhrAlarm =totalValFajeAlarm





// // //     }


// // //     const convertAsrTime = (getFajr, begins, jamah, alarm) => {

// // //       var getHours = getFajr.slice(0, 2) //4
// // //       var getMinutes = getFajr.slice(3, 5) //53
// // //       var totalMin = (60 * getHours) //240
// // //       var sum = parseInt(totalMin) + parseInt(getMinutes) //293



// // //       var fajrBeginsValCheck = begins 
// // //       var fajrjamahValCheck = jamah 
// // //       var fajralarmValCheck = alarm 


// // //       var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
// // //       var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
// // //       var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


// // //       console.log("fajr time----", fajrTotalBegins);

// // //       var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
// // //       var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
// // //       var totalValFajeBegins

// // //       totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
// // //             global.asrBegins =totalValFajeBegins




// // //       var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
// // //       var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
// // //       var totalValFajeJammah
// // //       totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
// // //       global.asrJamah =totalValFajeJammah




// // //       var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
// // //       var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
// // //       var totalValFajeAlarm
// // //       totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
// // //       global.asrAlarm =totalValFajeAlarm







// // //     }


// // //     const convertMaghribTime = (getFajr, begins, jamah, alarm) => {

// // //       var getHours = getFajr.slice(0, 2) //4
// // //       var getMinutes = getFajr.slice(3, 5) //53
// // //       var totalMin = (60 * getHours) //240
// // //       var sum = parseInt(totalMin) + parseInt(getMinutes) //293



// // //       var fajrBeginsValCheck = begins 
// // //       var fajrjamahValCheck = jamah 
// // //       var fajralarmValCheck = alarm 


// // //       var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
// // //       var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
// // //       var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


// // //       console.log("fajr time----", fajrTotalBegins);

// // //       var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
// // //       var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
// // //       var totalValFajeBegins

// // //       totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
// // //             global.maghribBegins =totalValFajeBegins




// // //       var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
// // //       var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
// // //       var totalValFajeJammah
// // //       totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
// // //       global.maghribJamah =totalValFajeJammah




// // //       var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
// // //       var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
// // //       var totalValFajeAlarm
// // //       totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
// // //       global.maghribAlarm =totalValFajeAlarm







// // //     }


// // //     const convertIshaTime = (getFajr, begins, jamah, alarm) => {

// // //       var getHours = getFajr.slice(0, 2) //4
// // //       var getMinutes = getFajr.slice(3, 5) //53
// // //       var totalMin = (60 * getHours) //240
// // //       var sum = parseInt(totalMin) + parseInt(getMinutes) //293


// // //       var fajrBeginsValCheck = begins 
// // //       var fajrjamahValCheck = jamah 
// // //       var fajralarmValCheck = alarm 


// // //       var fajrTotalBegins = sum + parseInt(fajrBeginsValCheck)
// // //       var fajrTotalJamaah = sum + parseInt(fajrjamahValCheck)
// // //       var fajrTotalAlarm = sum + parseInt(fajralarmValCheck)


// // //       console.log("fajr time----", fajrTotalBegins);

// // //       var totalFajrBegingsHour = JSON.stringify(Math.floor(fajrTotalBegins / 60))
// // //       var totalFajrBegingsMinutes = JSON.stringify((fajrTotalBegins - Math.floor(fajrTotalBegins / 60) * 60))
// // //       var totalValFajeBegins

// // //       totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
// // //             global.ishaBegins =totalValFajeBegins




// // //       var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
// // //       var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
// // //       var totalValFajeJammah
// // //       totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
// // //       global.ishaJamah =totalValFajeJammah




// // //       var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
// // //       var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
// // //       var totalValFajeAlarm
// // //       totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
// // //       global.ishaAlarm =totalValFajeAlarm





// // //     }


// // //     const getUser= async()=>{
// // //       getData()
// // //       const token = await AsyncStorage.getItem('token')
// // //       console.log("auth token", token)

// // //       var data = '';

// // //       axios.post('http://112.196.64.119:8000/api/user/me', data, {
// // //         headers: {
// // //         "auth-token": token
// // //     }})      
// // //       .then(async(response) => {
// // //         console.log('response user data',response.data)
// // //         await AsyncStorage.setItem('pin', response.data.token)
// // //         global.pin = response.data.token
// // //         global.id = response.data._id
// // //         global.userId = response.data._id
// // //         global.userName = response.data.name
// // //         global.email = response.data.email
// // //         global.password = response.data.password

// // //       })
// // //       .catch((error) => {
// // //         console.log('error',error)
// // //       })
// // //     }


// // //   return (
// // //     <View style={{flex: 1, backgroundColor: '#FAE9D7', alignItems: 'center', justifyContent:'center'}}>
// // //         <Image source={require('../images/splash.png')}   />
// // //     </View>

// // //   )

// // // }

// // // export default Splash




// import React, {Component} from 'react';
// import {
// 	View,
// 	Text,
// 	Button,
// 	TextInput,
// 	StyleSheet,
// 	ToastAndroid,
// 	Platform,
// 	NativeEventEmitter,
// 	NativeModules,
// } from 'react-native';
// import ReactNativeAN from 'react-native-alarm-notification';
// import moment from 'moment';


// const {RNAlarmNotification} = NativeModules;
// const RNEmitter = new NativeEventEmitter(RNAlarmNotification);

// const alarmNotifData = {
// 	title: 'Alarm',
// 	message: 'Stand up',
// 	vibrate: true,
// 	play_sound: true,
// 	// schedule_type: 'repeat',
// 	channel: 'wakeup',
// 	data: {content: 'my notification id is 22'},
// 	loop_sound: true,
// 	has_button: true,
// 	repeat_interval: 'daily',
// 	snooze_interval	: 3,
// };

// const repeatAlarmNotifData = {
// 	title: 'Alarme',
// 	message: 'ed up',
// 	vibrate: true,
// 	play_sound: true,
// 	channel: 'wakeup',
// 	data: {content: 'my notification id is 22'},
// 	loop_sound: true,
// 	schedule_type: 'repeat',
// 	repeat_interval: 'minutely',
// 	interval_value: 5, // repeat after 5 minutes
// };

// global.a = '13:50:00';
// global.b = '13:51:00';
// global.c = '13:52:00';
// // global.d = '13:35:00';
// // global.e = '13:40:00';

// class App extends Component {
// 	_subscribeOpen;
// 	_subscribeDismiss;

// 	state = {
// 		// fireDate: ReactNativeAN.parseDate(new Date(Date.now())),

//     timeData: [global.a,global.b,global.c],
// 		update: [],
// 		futureFireDate: '1',
// 		alarmId: null,
//     fireData: [1,2,3,4,5]
// 	};




//   componentDidMount() {
// 	  alert("1")
//      var date = moment().format("DD-MM-YYYY")



//     this.state.timeData.map((item) =>{
//       console.log("----->item timeData", `${date} ${item}`);
//       var cal= `${date} ${item}`
//     this.setAlarm(cal)

//     })




// 		this._subscribeDismiss = RNEmitter.addListener(
// 			'OnNotificationDismissed',
// 			(data) => {
// 				const obj = JSON.parse(data);
// 				console.log(`notification id: ${obj.id} dismissed`);
// 			},
// 		);

// 		this._subscribeOpen = RNEmitter.addListener(
// 			'OnNotificationOpened',
// 			(data) => {
// 				console.log(data);
// 				const obj = JSON.parse(data);
// 				console.log(`app opened by notification: ${obj.id}`);
// 			},
// 		);



// 		// check ios permissions
// 		if (Platform.OS === 'ios') {
// 			this.showPermissions();

// 			ReactNativeAN.requestPermissions({
// 				alert: true,
// 				badge: true,
// 				sound: true,
// 			}).then(
// 				(data) => {
// 					console.log('RnAlarmNotification.requestPermissions', data);
// 				},
// 				(data) => {
// 					console.log('RnAlarmNotification.requestPermissions failed', data);
// 				},
// 			);
// 		}
// 	}

// 	setAlarm = async (cal) => {
// 		const {fireDate, update} = this.state;

// 		const details = {...alarmNotifData, fire_date: cal, sound_name: 'beep.mp3',};
// 		console.log(`alarm set: ${cal}`);

// 		try {
// 			const alarm = await ReactNativeAN.scheduleAlarm(details);
// 			console.log(alarm);
// 			if (alarm) {
// 				this.setState({
// 					update: [...update, {date: `alarm set: ${cal}`, id: alarm.id}],
// 				});
// 			}
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	};

// 	setFutureRpeatAlarm = async () => {
// 		const {futureFireDate, update} = this.state;

// 		const _seconds = parseInt(futureFireDate, 10) * 60 * 1000;
// 		const fire_date = ReactNativeAN.parseDate(new Date(Date.now() + _seconds));

// 		const details = {
// 			...repeatAlarmNotifData,
// 			fire_date,
// 		};
// 		console.log(`alarm set: ${fire_date}`);

// 		try {
// 			const alarm = await ReactNativeAN.scheduleAlarm(details);
// 			console.log(alarm);
// 			if (alarm) {
// 				this.setState({
// 					update: [...update, {date: `alarm set: ${fire_date}`, id: alarm.id}],
// 				});
// 			}
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	};

// 	setFutureAlarm = async (cal) => {
// 		const {futureFireDate, update} = this.state;

// 		const _seconds = parseInt(futureFireDate, 10) * 60 * 1000;
// 		const fire_date = ReactNativeAN.parseDate(new Date(Date.now() + _seconds));

// 		const details = {
// 			...alarmNotifData,
// 			fire_date,
// 			sound_name: 'iphone_ringtone.mp3',
// 		};
// 		console.log(`alarm set: ${fire_date}`);

// 		try {
// 			const alarm = await ReactNativeAN.scheduleAlarm(details);
// 			console.log(alarm);
// 			if (alarm) {
// 				this.setState({
// 					update: [...update, {date: `alarm set: ${fire_date}`, id: alarm.id}],
// 				});
// 			}
// 		} catch (e) {
// 			console.log(e);
// 		}
// 	};

// 	stopAlarmSound = () => {
// 		ReactNativeAN.stopAlarmSound();
// 	};

// 	sendNotification = () => {
// 		const details = {
// 			...alarmNotifData,
// 			data: {content: 'my notification id is 45'},
// 			sound_name: 'iphone_ringtone.mp3',
// 			volume: 0.9,
// 		};
// 		console.log(details);
// 		ReactNativeAN.sendNotification(details);
// 	};



// 	componentWillUnmount() {
// 		this._subscribeDismiss.remove();
// 		this._subscribeOpen.remove();
// 	}

// 	showPermissions = () => {
// 		ReactNativeAN.checkPermissions((permissions) => {
// 			console.log(permissions);
// 		});
// 	};

// 	viewAlarms = async () => {
//     this.props.navigation.navigate('Logo')
// 		// const list = await ReactNativeAN.getScheduledAlarms();

// 		// console.log(list);
// 		// const update = list.map((l) => ({
// 		// 	date: `alarm: ${l.day}-${l.month}-${l.year} ${l.hour}:${l.minute}:${l.second}`,
// 		// 	id: l.id,
// 		// }));

// 		// this.setState({update});
// 	};

// 	deleteAlarm = async () => {
// 		const {alarmId} = this.state;
// 		if (alarmId !== '') {
// 			console.log(`delete alarm: ${alarmId}`);

// 			const id = parseInt(alarmId, 10);
// 			ReactNativeAN.deleteAlarm(id);
// 			this.setState({alarmId: ''});

// 			ToastAndroid.show('Alarm deleted!', ToastAndroid.SHORT);

// 			await this.viewAlarms();
// 		}
// 	};

// 	render() {
// 		const {update, fireDate, futureFireDate, alarmId} = this.state;
// 		return (
// 			<View style={styles.wrapper}>




// 				<View style={styles.margin}>
// 					<Button
// 						onPress={this.sendNotification}
// 						title="Send Notification Now"
// 						color="#007fff"
// 					/>
// 				</View>
// 				{/* <View style={styles.margin}>
// 					<Button
// 						onPress={this.stopAlarmSound}
// 						title="Stop Alarm Sound"
// 						color="#841584"
// 					/>
// 				</View> */}



// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	wrapper: {flex: 1, padding: 20},
// 	date: {height: 40, borderColor: 'gray', borderWidth: 1},
// 	margin: {marginVertical: 8},
// });

// export default App;






import React, { Component } from 'react';
import { View, Image, NativeEventEmitter, NativeModules, AppState,DeviceEventEmitter, StyleSheet, Text, TextInput, Button } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import moment from 'moment';
import Orientation from 'react-native-orientation';
import ReactNativeAN from 'react-native-alarm-notification';

const bg = require('../images/bg.png')
const { RNAlarmNotification } = NativeModules;

const RNEmitter = new NativeEventEmitter(RNAlarmNotification);

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
import BackgroundTimer from 'react-native-background-timer';

const alarmNotifData = {
	title: 'Alarm',
	message: 'Stand up',
	vibrate: true,
	play_sound: true,
	schedule_type: 'daily',
	channel: 'wakeup',
	data: { content: 'my notification id is 22' },
	loop_sound: true,
	has_button: true,
	auto_cancel:false,
	// volume: 1.0,
	bypass_dnd: true
};

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

// global.a = '13:50:00';
// global.b = '13:51:00';
// global.c = '13:52:00';
// // global.d = '13:35:00';
// // global.e = '13:40:00';

class App extends Component {


	constructor(props){
		super(props)
		this.state= {
			fireDate: ReactNativeAN.parseDate(new Date(Date.now())),
			update: [],
			futureFireDate: '1',
			alarmId: null,
		};
	}
	_subscribeOpen;
	_subscribeDismiss;






	async componentDidMount() {
		
		
	
		Orientation.lockToPortrait();
		
		this.getData()
		this.getUser()
		const token = await AsyncStorage.getItem('token')
		global.tokenVal = token


		setTimeout(() => {
			this.props.navigation.navigate('Logo')
		  }, 3000);

		

		

	}
	getUser = async () => {
		this.getData()
		const token = await AsyncStorage.getItem('token')

		var data = '';

		axios.post('http://112.196.64.119:8000/api/user/me', data, {
			headers: {
				"auth-token": token
			}
		})
			.then(async (response) => {
				await AsyncStorage.setItem('pin', response.data.token)
				global.pin = response.data.token
				global.id = response.data._id
				global.userId = response.data._id
				global.userName = response.data.name
				global.email = response.data.email
				global.password = response.data.password
			})
			.catch((error) => {
				console.log('error', error)
			})
	}

	changeTimeFormat = (timeString) => {
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


	convertTimeFrom12To24(timeStr) {
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

	getLondonTime1 = async () => {
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
								this.convertFajrTime(response.data.data[0].type1.prayerTime, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time, response.data.data[0].type1.set_alarm)
								this.convertDuhrTime(response.data.data[0].type2.prayerTime, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time, response.data.data[0].type2.set_alarm)
								this.convertAsrTime(response.data.data[0].type3.prayerTime, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time, response.data.data[0].type3.set_alarm)
								this.convertMaghribTime(response.data.data[0].type4.prayerTime, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time, response.data.data[0].type4.set_alarm)
								this.convertIshaTime(response.data.data[0].type5.prayerTime, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time, response.data.data[0].type5.set_alarm)
								this.convertSunTime(response.data.data[0].type6.prayerTime, response.data.data[0].type6.begins_time, response.data.data[0].type6.jamah_time, response.data.data[0].type6.alarm_time, response.data.data[0].type6.set_alarm)
							}


						})


					axios.get(`http://112.196.64.119:8000/api/user/manualprayerstime/view/${global.userId}`, {
						headers: {
							'auth-token': token
						}
					})
						.then((response) => {

							console.log("response data m ===>", parseFloat(response.data.data[0].type1.alarmVolume), response.data.data[0], response.data.data[0].type6.prayerTime, dates, global.userId);
							const alarmForfajr = this.convertTimeFrom12To24(`${response.data.data[0].type1.prayerTime} AM`)
							const alarmForSun = this.convertTimeFrom12To24(`${response.data.data[0].type6.prayerTime} AM`)
							const alarmForAsr = this.convertTimeFrom12To24(`${response.data.data[0].type3.prayerTime} PM`)
							const alarmForMag = this.convertTimeFrom12To24(`${response.data.data[0].type4.prayerTime} PM`)
							const alarmForIsha = this.convertTimeFrom12To24(`${response.data.data[0].type5.prayerTime} PM`)

							const alarmForfajrA = this.convertTimeFrom12To24(`${response.data.data[0].type1.alarmTime} AM`)
							const alarmForSunA = this.convertTimeFrom12To24(`${response.data.data[0].type6.alarmTime} AM`)
							const alarmForAsrA = this.convertTimeFrom12To24(`${response.data.data[0].type3.alarmTime} PM`)
							const alarmForMagA = this.convertTimeFrom12To24(`${response.data.data[0].type4.alarmTime} PM`)
							const alarmForIshaA = this.convertTimeFrom12To24(`${response.data.data[0].type5.alarmTime} PM`)

							if (response.data.data[0].type1.set_alarm == true) {
								console.log("----->item F", `${dates} ${alarmForfajr}:00`);
								var cal = `${dates} ${alarmForfajr}:00`
								var calA = `${dates} ${alarmForfajrA}:00`
								var msg = "Fajr Time"
								// this.setAlarm(cal, msg)
								this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
							}

							if (response.data.data[0].type6.set_alarm == true) {
								console.log("----->item S", `${dates} ${alarmForSun}:00`);
								var cal = `${dates} ${alarmForSun}:00`
								var calA = `${dates} ${alarmForSunA}:00`
								var msg = "Sunrise Time"
								// this.setAlarm(cal, msg)
								this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
							}

							if (response.data.data[0].type2.set_alarm == true) {
								console.log("----->item Z", `${dates} ${response.data.data[0].type2.prayerTime}:00`);
								var cal = `${dates} ${response.data.data[0].type2.prayerTime}:00`
								var calA = `${dates} ${response.data.data[0].type2.alarmTime}:00`
								var msg = "Zuhr Time"
								// this.setAlarm(cal, msg)
								this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
							}

							if (response.data.data[0].type3.set_alarm == true) {
								console.log("----->item A", `${dates} ${alarmForAsr}:00`);
								var cal = `${dates} ${alarmForAsr}:00`
								var calA = `${dates} ${alarmForAsrA}:00`
								var msg = "Asr Time"
								// this.setAlarm(cal, msg)
								this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
							}

							if (response.data.data[0].type4.set_alarm == true) {
								console.log("----->item M", `${dates} ${alarmForMag}:00`);
								var cal = `${dates} ${alarmForMag}:00`
								var calA = `${dates} ${alarmForMagA}:00`
								var msg = "Magrib Time"
								// this.setAlarm(cal, msg)
								this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
							}

							if (response.data.data[0].type5.set_alarm == true) {
								console.log("----->item I", `${dates} ${alarmForIsha}:00`);
								var cal = `${dates} ${alarmForIsha}:00`
								var calA = `${dates} ${alarmForIshaA}:00`
								var msg = "Isha Time"
								// this.setAlarm(cal, msg)
								this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
							}
						})

						.catch((error) => {
							console.log('error', error)
						})


				})
			})
	}

	getData = async () => {
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

						this.getLondonTime1()
					}
					else {

						console.log("djxnjkcn-", `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.calMonth}&year=${global.calYear}`);

						axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.calMonth}&year=${global.calYear}`)
							.then((res) => {
								var d = moment().format("DD")
								res.data.data.map((item) => {
									if (item.date.readable.slice(0, 3).includes(d)) {


										global.fajrrBeginss = this.changeTimeFormat(item.timings.Fajr)

										global.asrBeginss = this.changeTimeFormat(item.timings.Asr);

										global.zuhrBeginss = this.changeTimeFormat(item.timings.Dhuhr)

										global.maghribBeginss = this.changeTimeFormat(item.timings.Maghrib);

										global.ishaBeginss = this.changeTimeFormat(item.timings.Isha)
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
										// const alarmForfajr = this.convertTimeFrom12To24(`${response.data.data[0].type1.prayerTime} AM`)
										// const alarmForSun = this.convertTimeFrom12To24(`${response.data.data[0].type6.prayerTime} AM`)
										// const alarmForAsr = this.convertTimeFrom12To24(`${response.data.data[0].type3.prayerTime} PM`)
										// const alarmForMag = this.convertTimeFrom12To24(`${response.data.data[0].type4.prayerTime} PM`)
										// const alarmForIsha = this.convertTimeFrom12To24(`${response.data.data[0].type5.prayerTime} PM`)

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
											this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
										}

										if (response.data.data[0].type6.set_alarm == true) {
											console.log("----->item S=", `${dates} ${alarmForSun}:00`);
											var cal = `${dates} ${alarmForSun}:00`
											var calA = `${dates} ${alarmForSunA}:00`
											var msg = "Sunrise Time"
											// this.setAlarm(cal, msg)
											this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
										}

										if (response.data.data[0].type2.set_alarm == true) {
											console.log("----->item Z=", `${dates} ${response.data.data[0].type2.prayerTime}:00`);
											var cal = `${dates} ${response.data.data[0].type2.prayerTime}:00`
											var calA = `${dates} ${response.data.data[0].type2.alarmTime}:00`
											var msg = "Zuhr Time"
											// this.setAlarm(cal, msg)
											this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
										}

										if (response.data.data[0].type3.set_alarm == true) {
											console.log("----->item A=", `${dates} ${alarmForAsr}:00`);
											var cal = `${dates} ${alarmForAsr}:00`
											var calA = `${dates} ${alarmForAsrA}:00`
											var msg = "Asr Time"
											// this.setAlarm(cal, msg)
											this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
										}

										if (response.data.data[0].type4.set_alarm == true) {
											console.log("----->item M=", `${dates} ${alarmForMag}:00`);
											var cal = `${dates} ${alarmForMag}:00`
											var calA = `${dates} ${alarmForMagA}:00`
											var msg = "Magrib Time"
											// this.setAlarm(cal, msg)
											this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
										}

										if (response.data.data[0].type5.set_alarm == true) {
											console.log("----->item I=", `${dates} ${alarmForIsha}:00`);
											var cal = `${dates} ${alarmForIsha}:00`
											var calA = `${dates} ${alarmForIshaA}:00`
											var msg = "Isha Time"
											// this.setAlarm(cal, msg)
											this.setAlarmNext(calA, msg, parseFloat(response.data.data[0].type1.alarmVolume))
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

	convertFajrTime = async (getFajr, begins, jamah, alarm, val) => {
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

	convertDuhrTime = async (getFajr, begins, jamah, alarm, val) => {
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


	convertAsrTime = async (getFajr, begins, jamah, alarm, val) => {
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


	convertMaghribTime = async (getFajr, begins, jamah, alarm, val) => {
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


	convertIshaTime = async (getFajr, begins, jamah, alarm, val) => {
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

	convertSunTime = async (getFajr, begins, jamah, alarm, val) => {
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



	setAlarm = async (cal, msg) => {
		// let a  = [18,19,20,22,24];
		// a.map((i) => this.setFutureRpeatAlarm(i));
             const stop = await ReactNativeAN.stopAlarmSound()	
			var val = 0.0
console.log("stop====>", stop)
		const { futureFireDate, update } = this.state;
         var cal1 = "20-01-2022 15:17:10"
		const details = {
			...alarmNotifData, fire_date: cal1, sound_name: 'beep.mp3',
			message: msg, volume: val == 0.0 ? this.stopAlarmSound() : 0.1
		};


		console.log(`alarm set: ${cal1}`);

		try {
			const alarm = await ReactNativeAN.scheduleAlarm(details);
			console.log(alarm);
			if (alarm) {
				this.setState({
					update: [...update, { date: `alarm set: ${fire_date}`, id: alarm.id }],
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	setAlarmNext = async (cal, msg) => {
		// let a  = [18,19,20,22,24];
		// a.map((i) => this.setFutureRpeatAlarm(i));


		const { futureFireDate, update } = this.state;

		const details = {
			...repeatAlarmNotifData, fire_date: cal,
			message: msg
		};





		console.log(`alarm set: ${cal}`);

		try {
			const alarm = await ReactNativeAN.scheduleAlarm(details);
			console.log(alarm);
			if (alarm) {
				this.setState({
					update: [...update, { date: `alarm set: ${cal}`, id: alarm.id }],
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	setFutureRpeatAlarm = async (i) => {
		const { futureFireDate, update } = this.state;

		const _seconds = parseInt(futureFireDate, 10) * 60 * 1000;
		const fire_date = `13-01-2022 16:${i}:00`;

		const details = {
			...repeatAlarmNotifData,
			fire_date,
		};
		console.log(`alarm set: ${fire_date}`);

		try {
			const alarm = await ReactNativeAN.scheduleAlarm(details);
			console.log(alarm);
			if (alarm) {
				this.setState({
					update: [...update, { date: `alarm set: ${fire_date}`, id: alarm.id }],
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	setFutureAlarm = async () => {
		const { futureFireDate, update } = this.state;

		const _seconds = parseInt(futureFireDate, 10) * 60 * 1000;
		const fire_date = ReactNativeAN.parseDate(new Date(Date.now() + _seconds));

		const details = {
			...alarmNotifData,
			fire_date,
			sound_name: 'iphone_ringtone.mp3',
		};
		console.log(`alarm set: ${fire_date}`);

		try {
			const alarm = await ReactNativeAN.scheduleAlarm(details);
			console.log(alarm);
			if (alarm) {
				this.setState({
					update: [...update, { date: `alarm set: ${fire_date}`, id: alarm.id }],
				});
			}
		} catch (e) {
			console.log(e);
		}
	};

	stopAlarmSound = () => {
		// alert("1")
		ReactNativeAN.stopAlarmSound();
	};

	sendNotification = () => {
		const details = {
			...alarmNotifData,
			data: { content: 'my notification id is 45' },
			sound_name: 'iphone_ringtone.mp3',
			volume: 0.9,
		};
		console.log(details);
		ReactNativeAN.sendNotification(details);
	};

	



	showPermissions = () => {
		ReactNativeAN.checkPermissions((permissions) => {
			console.log(permissions);
		});
	};

	viewAlarms = async () => {
		const list = await ReactNativeAN.getScheduledAlarms();

		console.log(list);
		const update = list.map((l) => ({
			date: `alarm: ${l.day}-${l.month}-${l.year} ${l.hour}:${l.minute}:${l.second}`,
			id: l.id,
		}));

		this.setState({ update });
	};

	deleteAlarm = async () => {
		const { alarmId } = this.state;
		if (alarmId !== '') {
			console.log(`delete alarm: ${alarmId}`);

			const id = parseInt(alarmId, 10);
			ReactNativeAN.deleteAlarm(id);
			this.setState({ alarmId: '' });

			ToastAndroid.show('Alarm deleted!', ToastAndroid.SHORT);

			await this.viewAlarms();
		}
	};

	render() {
		return (
			<View style={{ flex: 1, backgroundColor: '#FAE9D7', alignItems: 'center', justifyContent: 'center' , position: 'relative'}}>
        <Image source={require('../images/splash.png')} />
      </View>
		);
	}
}

const styles = StyleSheet.create({
	wrapper: { flex: 1, padding: 20 },
	date: { height: 40, borderColor: 'gray', borderWidth: 1 },
	margin: { marginVertical: 8 },
});

export default App;
