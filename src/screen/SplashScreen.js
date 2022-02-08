import React, { Component } from 'react';
import { View, Image, NativeEventEmitter, NativeModules, AppState } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import moment from 'moment';
import Orientation from 'react-native-orientation';
import ReactNativeAN from 'react-native-alarm-notification';


const bg = require('../images/bg.png')
const { RNAlarmNotification } = NativeModules;

const RNAlarmEmitter = new NativeEventEmitter(RNAlarmNotification);

const month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

const d = new Date();
let name = month[d.getMonth()];
global.calMonth = name
global.calYear = d.getFullYear()
// alert(global.calMonth)

const alarmNotifData = {
  title: 'Alarm',
  vibrate: false,
  // vibrate: true,
  play_sound: true,
  schedule_type: 'repeat',
  channel: 'wakeup',
  // data: { content: 'my notification id is 22' },
  // loop_sound: true,
  // has_button: true,
  repeat_interval: 'daily',
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
};


global.a = '13:19:00';
global.b = '13:19:00';
global.c = '17:39:00';
global.d = '17:40:20';
global.e = '18:08:00';

// const dismissSubscription = RNAlarmEmitter.addListener(
//   'OnNotificationDismissed', (data) => console.log(JSON.parse(e))
// )

// const openedSubscription = RNAlarmEmitter.addListener(
//   'OnNotificationOpened', (data) => console.log(JSON.parse(e))
// )

class Splash extends Component {

  _subscribeOpen;
  _subscribeDismiss;

  state = {
    // fireDate: ReactNativeAN.parseDate(new Date(Date.now())),

    timeData: [],
    update: [],
    futureFireDate: '1',
    alarmId: null,
    fireData: [1, 2, 3, 4, 5]
  };




  async componentDidMount() {

console.log('fgafghasgfsahfgasgkahs')
this.loadData()

  }

 async loadData(){

    this._interval = setInterval(() => {
      this.getData()
    }, 1000);


    const value = await AsyncStorage.getItem('token')
    const val = await AsyncStorage.getItem('alarmVal')
    var date = moment().format("DD-MM-YYYY")
    console.log("global.fajrrBegins", global.calCity, global.a, global.b, global.c, global.d, global.e, global.ishaBegins, global.sun);

    Orientation.lockToPortrait();
    this.getData()
    this.getUser()
    this.getPrayerList()
    const token = await AsyncStorage.getItem('token')
    global.tokenVal = token



    setTimeout(() => {
      this.props.navigation.navigate('Logo')
    }, 3000);
  }

  componentWillUnmount() {
    clearInterval(this._interval);
  }
  //   componentWillUnmount(){
  //     dismissSubscription.remove();
  // openedSubscription.remove();
  //   }




  setAlarm = async (cal, msg) => {
    const { fireDate, update } = this.state;

    const details = {
      ...alarmNotifData, fire_date: cal, sound_name: 'beep.mp3',
      message: msg
    };
    // console.log(`alarm set: ${cal}`);

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

  getLondonTime1 = async () => {
    var dates = moment().format("DD-MM-YYYY")

    const token = await AsyncStorage.getItem('token')
    var dates = moment().format("DD-MM-YYYY")


    var date = new Date().getMonth() + 1
    axios.get(`https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.calMonth}&24hours=false`)
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
              console.log("response data m ===>", response.data.data[0], dates);

              if (response.data.data[0].type1.set_alarm == true) {
                console.log("----->item F", `${dates} ${response.data.data[0].type1.prayerTime}:00`);
                var cal = `${dates} ${response.data.data[0].type1.prayerTime}:00`
                var msg = "Fajr Time"
                this.setAlarm(cal, msg)
              }

              if (response.data.data[0].type6.set_alarm == true) {
                console.log("----->item S", `${dates} ${response.data.data[0].type6.prayerTime}:00`);
                var cal = `${dates} ${response.data.data[0].type6.prayerTime}:00`
                var msg = "Sunrise Time"
                this.setAlarm(cal, msg)
              }

              if (response.data.data[0].type2.set_alarm == true) {
                console.log("----->item Z", `${dates} ${response.data.data[0].type2.prayerTime}:00`);
                var cal = `${dates} ${response.data.data[0].type2.prayerTime}:00`
                var msg = "Zuhr Time"
                this.setAlarm(cal, msg)
              }

              if (response.data.data[0].type3.set_alarm == true) {
                console.log("----->item A", `${dates} ${response.data.data[0].type3.prayerTime}:00`);
                var cal = `${dates} ${response.data.data[0].type3.prayerTime}:00`
                var msg = "Asr Time"
                this.setAlarm(cal, msg)
              }

              if (response.data.data[0].type4.set_alarm == true) {
                console.log("----->item M", `${dates} ${response.data.data[0].type4.prayerTime}:00`);
                var cal = `${dates} ${response.data.data[0].type4.prayerTime}:00`
                var msg = "Magrib Time"
                this.setAlarm(cal, msg)
              }

              if (response.data.data[0].type5.set_alarm == true) {
                console.log("----->item I", `${dates} ${response.data.data[0].type5.prayerTime}:00`);
                var cal = `${dates} ${response.data.data[0].type5.prayerTime}:00`
                var msg = "Isha Time"
                this.setAlarm(cal, msg)
              }
            })

            .catch((error) => {
              console.log('error', error)
            })


        })
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
                    console.log("response dataA ===>", response);

                    if (response.data.data[0].type1.set_alarm == true) {
                      console.log("----->item F", `${dates} ${response.data.data[0].type1.prayerTime}:00`);
                      var cal = `${dates} ${response.data.data[0].type1.prayerTime}:00`
                      var msg = "Fajr Time"
                      this.setAlarm(cal, msg)
                    }

                    if (response.data.data[0].type6.set_alarm == true) {
                      console.log("----->item S", `${dates} ${response.data.data[0].type6.prayerTime}:00`);
                      var cal = `${dates} ${response.data.data[0].type6.prayerTime}:00`
                      var msg = "Sunrise Time"
                      this.setAlarm(cal, msg)
                    }

                    if (response.data.data[0].type2.set_alarm == true) {
                      console.log("----->item Z", `${dates} ${response.data.data[0].type2.prayerTime}:00`);
                      var cal = `${dates} ${response.data.data[0].type2.prayerTime}:00`
                      var msg = "Zuhr Time"
                      this.setAlarm(cal, msg)
                    }

                    if (response.data.data[0].type3.set_alarm == true) {
                      console.log("----->item A", `${dates} ${response.data.data[0].type3.prayerTime}:00`);
                      var cal = `${dates} ${response.data.data[0].type3.prayerTime}:00`
                      var msg = "Asr Time"
                      this.setAlarm(cal, msg)
                    }

                    if (response.data.data[0].type4.set_alarm == true) {
                      console.log("----->item M", `${dates} ${response.data.data[0].type4.prayerTime}:00`);
                      var cal = `${dates} ${response.data.data[0].type4.prayerTime}:00`
                      var msg = "Magrib Time"
                      this.setAlarm(cal, msg)
                    }

                    if (response.data.data[0].type5.set_alarm == true) {
                      console.log("----->item I", `${response.data.data[0].type5.prayerTime}:00`);
                      var cal = `${dates} ${response.data.data[0].type5.prayerTime}:00`
                      var msg = "Isha Time"
                      this.setAlarm(cal, msg)
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

  getPrayerList = async () => {
    const val = await AsyncStorage.getItem('alarmVal')
    const token = await AsyncStorage.getItem('token')
    var date = moment().format("DD-MM-YYYY")
    axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {

        var dnext = []
        console.log("response of maual prayer time", response.data.data); //[]
        if (response.data.data.length == 0) {

        }
        else {
          this.convertFajrTime(response.data.data[0].type1.prayerTime, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time, response.data.data[0].type1.set_alarm)
          this.convertDuhrTime(response.data.data[0].type2.prayerTime, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time, response.data.data[0].type2.set_alarm)
          this.convertAsrTime(response.data.data[0].type3.prayerTime, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time, response.data.data[0].type3.set_alarm)
          this.convertMaghribTime(response.data.data[0].type4.prayerTime, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time, response.data.data[0].type4.set_alarm)
          this.convertIshaTime(response.data.data[0].type5.prayerTime, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time, response.data.data[0].type5.set_alarm)
          this.convertSunTime(response.data.data[0].type6.prayerTime, response.data.data[0].type6.begins_time, response.data.data[0].type6.jamah_time, response.data.data[0].type6.alarm_time, response.data.data[0].type6.set_alarm)

          var data = '';
          axios.post('http://112.196.64.119:8000/api/user/me', data, {
            headers: {
              "auth-token": token
            }
          })
            .then(async (response) => {
              console.log("alarm res000", response, global.fajrrAlarm, global.zuhrAlarm, global.asrAlarm, global.maghribAlarm, global.ishaAlarm);

              axios.get(`http://112.196.64.119:8000/api/user/manualprayerstime/view/${response.data._id}`, {
                headers: {
                  'auth-token': token
                }
              })
                .then((response) => {

                  console.log("alarm res", response);

                  if (response.data.data[0].type1.set_alarm == true) {
                    console.log("----->item Fajr Alarm", `${date} ${response.data.data[0].type1.alarmTime}:00`);
                    var cal = `${date} ${response.data.data[0].type1.alarmTime}:00`
                    var msg = "Fajr Time Prayer"
                    this.setAlarmNext(cal, msg)
                  }

                  if (response.data.data[0].type6.set_alarm == true) {
                    console.log("----->item sun Alarm", `${date} ${response.data.data[0].type6.alarmTime}:00`);
                    var cal = `${date} ${response.data.data[0].type6.alarmTime}:00`
                    var msg = "Sunrise Time Prayer"
                    this.setAlarmNext(cal, msg)
                  }

                  if (response.data.data[0].type2.set_alarm == true) {
                    console.log("----->item Zuhr Alarm", `${date} ${response.data.data[0].type2.alarmTime}:00`);
                    var cal = `${date} ${response.data.data[0].type2.alarmTime}:00`
                    var msg = "Zuhr Time Prayer"
                    this.setAlarmNext(cal, msg)
                  }

                  if (response.data.data[0].type3.set_alarm == true) {
                    console.log("----->item Asr Alarm", `${date} ${response.data.data[0].type3.alarmTime}:00`);
                    var cal = `${date} ${response.data.data[0].type3.alarmTime}:00`
                    var msg = "Asr Time Prayer"
                    this.setAlarmNext(cal, msg)
                  }

                  if (response.data.data[0].type4.set_alarm == true) {
                    console.log("----->item Magrb Alarm", `${date} ${response.data.data[0].type4.alarmTime}:00`);
                    var cal = `${date} ${response.data.data[0].type4.alarmTime}:00`
                    var msg = "Magrib Time Prayer"
                    this.setAlarmNext(cal, msg)
                  }

                  if (response.data.data[0].type5.set_alarm == true) {
                    console.log("----->item Isha Alarm", `${date} ${response.data.data[0].type5.alarmTime}:00`);
                    var cal = `${date} ${response.data.data[0].type5.alarmTime}:00`
                    var msg = "Isha Time Prayer"
                    this.setAlarmNext(cal, msg)
                  }
                })
            })
        }

      })

      .catch((error) => {
        console.log('payer error', error)
      })
  }


  setAlarmNext = async (cal, msg) => {
    const { fireDate, update } = this.state;

    const details = {
      ...alarmNotifDataNext, fire_date: cal,
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


  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#FAE9D7', alignItems: 'center', justifyContent: 'center' , position: "relative"}}>
        <Image source={require('../images/splash.png')} />
      </View>

    )
  }
}


export default Splash