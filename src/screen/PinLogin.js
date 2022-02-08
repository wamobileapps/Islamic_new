import Icon from "react-native-vector-icons/Feather"
import Iconn from "react-native-vector-icons/AntDesign"
import React, { useEffect, useRef, useState } from "react"
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View, StyleSheet, Dimensions, PermissionsAndroid, ActivityIndicator, Modal } from "react-native"
import ReactNativePinView from "react-native-pin-view"
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Video from "react-native-video";
import { RFValue } from "react-native-responsive-fontsize";
import { baseUrl } from '../Api/COntstant';
import Geolocation from '@react-native-community/geolocation';
import moment from "moment"

const { width, height } = Dimensions.get("window");

const loginn = require('../images/login.png');
const videos = require('../videos/login.mp4')
const dayData = []
const fajrData = []
const sunhrData = []
const duhrData = []
const asrData = []
const magrbData = []
const ishaData = []
const colData = []
global.dayData = []
global.fData =[]
global.sData = []
global.dData = []
global.aData = []
global.mData = []
global.iData = []
global.colData = []

const PinLogin = ({ route, navigation }) => {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [resposneData, setResponseData] = useState()
    const [token, setToken] = useState('')
    const [modal, setModal] = useState(false)
    const [timeEStimate, setTimeEstimate] = useState(false)
    const [loggingIn, setloggingIn] = useState(false)
    const [entered, setEntered] = useState(false)
    const [val, setVal] = useState(false)
    const [established, setestablished] = useState(false)

    const pin = route.params
   

    useEffect(async () => {
        console.log("global.arrayData====>", global.arrayData)
        console.log("entered pin-======?", global.BloodtimeDiff, global.MinutestimeDiff, global.HearttimeDiff, global.BreathtimeDiff)
       
        getProfile()

        const unsubscribe = navigation.addListener('focus', () => {
            // setEnteredPin('')
            pinView.current.clearAll()
            console.log("entered pin-======? focus", global.BloodtimeDiff, global.MinutestimeDiff, global.HearttimeDiff, global.BreathtimeDiff)

        });

        return unsubscribe;





    }, [navigation]);

    const requestLocationPermission = async () => {

        try {
    
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    
          },
          )
    
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(info => {
    
    
    
             
    
              console.log("info=====>", info)
            },
            //   (error) => alert("Error: Are location services on?"),
              // { enableHighAccuracy: true }
              {
                enableHighAccuracy: false,
                timeout: 18000000,
                maximumAge: 0,
                forceRequestLocation: true
    
              }
            );
    
    
          }
    
        }
        catch (err) {
          console.log("err")
        }
    
      };
    
    //   const getBeginsData = async (data) => {

    //     axios.get(`https://api.pray.zone/v2/times/today.json?city=${global.calCity}`)
    //     .then((response) => {
    //         console.log("get given date data====>", response.data.results.datetime[0].times);
           
          
    //         global.fajr = response.data.results.datetime[0].times.Fajr
    //         global.sun = response.data.results.datetime[0].times.Sunrise
    //         global.zuhr = response.data.results.datetime[0].times.Dhuhr
    //         global.asr = response.data.results.datetime[0].times.Asr
    //         global.maghrib = response.data.results.datetime[0].times.Maghrib
    //         global.isha = response.data.results.datetime[0].times.Isha
    //       })


        
    //   };

    const getProfile = async () => {
        // getBeginsData()
        const token = await AsyncStorage.getItem('token')
        console.log("auth token", token)

        var data = '';



        axios.post(baseUrl + 'me', data, {
                headers: {
                    "auth-token": token
                }
            })
            .then((response) => {
                console.log('response user', response.data)
                setToken(response.data.token)
                global.userId = response.data._id

            })
            .catch((error) => {
                console.log('error', error)
                // dispatch(userUpdateProfileFail())

            })


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
      global.fajrrAlarm = val == true ? totalValFajeAlarm : "-"
  
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
      global.zuhrAlarm = val == true ? totalValFajeAlarm : "-"
  
  
  
  
     
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
  
      totalValFajeBegins = `${totalFajrBegingsHour.length == 2 ?totalFajrBegingsHour:`0${totalFajrBegingsHour}`}:${totalFajrBegingsMinutes.length == 2 ?totalFajrBegingsMinutes:`0${totalFajrBegingsMinutes}`}` 
            global.asrBegins =totalValFajeBegins
           
  
  
  
      var totalFajrJamaahHour = JSON.stringify(Math.floor(fajrTotalJamaah / 60))
      var totalFajrJammahMinutes = JSON.stringify((fajrTotalJamaah - Math.floor(fajrTotalJamaah / 60) * 60))
      var totalValFajeJammah
      totalValFajeJammah = `${totalFajrJamaahHour.length == 2 ?totalFajrJamaahHour:`0${totalFajrJamaahHour}`}:${totalFajrJammahMinutes.length == 2 ?totalFajrJammahMinutes:`0${totalFajrJammahMinutes}`}` 
      global.asrJamah =  totalValFajeJammah
  
     
  
  
      var totalFajrAlarmHour = JSON.stringify(Math.floor(fajrTotalAlarm / 60))
      var totalFajrAlarmMinutes = JSON.stringify((fajrTotalAlarm - Math.floor(fajrTotalAlarm / 60) * 60))
      var totalValFajeAlarm
      totalValFajeAlarm = `${totalFajrAlarmHour.length == 2 ?totalFajrAlarmHour:`0${totalFajrAlarmHour}`}:${totalFajrAlarmMinutes.length == 2 ?totalFajrAlarmMinutes:`0${totalFajrAlarmMinutes}`}` 
      global.asrAlarm = val == true ?  totalValFajeAlarm : "-"
  
  
  
  
  
     
  
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
      global.maghribAlarm = val == true ? totalValFajeAlarm : "-"
  
  
  
      
  
  
  
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

    const getPrayerList = async () => {
        const token = await AsyncStorage.getItem('token')
    
        axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
          headers: {
            'auth-token': token
          }
        })
          .then((response) => {
            console.log("setting response data===>", response.data.data);
            if(response.data.data.length == 0){
            
            }
            else{
                convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time, response.data.data[0].type1.set_alarm)
              convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time,response.data.data[0].type2.set_alarm)
              convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time,response.data.data[0].type3.set_alarm)
              convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time,response.data.data[0].type4.set_alarm)
              convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time,response.data.data[0].type5.set_alarm)
              convertSunTime(global.sun,response.data.data[0].type6.begins_time, response.data.data[0].type6.jamah_time, response.data.data[0].type6.alarm_time,response.data.data[0].type6.set_alarm)
              }
    
    
            navigation.navigate('Drawer')
          })
    
          .catch((error) => {
            console.log('error', error)
          })
      }


    const dashboardData = async () => {
        
        getPrayerList()
        // requestLocationPermission()
        getData()
        
        var currentDate = new Date(),
            month = ("0" + (currentDate.getMonth() + 1)).slice(-2),
            day = ("0" + currentDate.getDate()).slice(-2),
            year = ("0" + currentDate.getFullYear()).slice(-4)
        var dd = [year, month, day].join("-")
        global.dateValue = dd


        const token = await AsyncStorage.getItem('token')
        console.log("auth token", token, global.dateValue)
        var param = {
            "date": global.dateValue
        }

        axios.post(baseUrl+ 'dashboard', param, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log("response-====>", response)

                if (response.data.data.length === 0) {
                    response.data.types.map((item) => {
                        item.progress = 0
                    })


                }
                else {
                    const newArrayData = response.data.types.map(function (entry) {
                        for (var i = 0; i < response.data.data.length; i++) {

                            console.log("==== entry id", entry._id, response.data.data[i]._id)

                            if (entry._id === response.data.data[i]._id) {
                                console.log(entry._id, response.data.data[i]._id);

                                if (entry.numberOfSegments === undefined) {
                                    entry.numberOfSegments = 0;
                                }

                                const totalRating = (parseInt(response.data.data[i].totalRatings) / parseInt(entry.numberOfSegments)) * 10

                                entry.progress = isNaN(totalRating) ? 0 : totalRating

                                break
                            }
                            else {
                                entry.progress = 0
                                //   break
                            }

                        }


                        return entry;
                    });

                }
                global.totalRatingsData = response.data.types
                console.log("response.data.types===>", global.totalRatingsData);



            })
            .catch((error) => {
                console.log('error', error)
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
    
            //   navigation.navigate('Drawer')

            
            
            })
            getPrayerList()
            // axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
            //     headers: {
            //       'auth-token': token
            //     }
            //   })
            //     .then((response) => {
            //       console.log("resonse prayer data", response.data.data);
            //       if(response.data.data.length == 0){
            //         navigation.navigate('Drawer')
            //       }
            //       else{ 
            //         convertFajrTime(global.fajrrBegins, response.data.data[0].type1.begins_time, response.data.data[0].type1.jamah_time, response.data.data[0].type1.alarm_time)
            //         convertDuhrTime(global.zuhrBegins, response.data.data[0].type2.begins_time, response.data.data[0].type2.jamah_time, response.data.data[0].type2.alarm_time)
            //         convertAsrTime(global.asrBegins, response.data.data[0].type3.begins_time, response.data.data[0].type3.jamah_time, response.data.data[0].type3.alarm_time)
            //         convertMaghribTime(global.maghribBegins, response.data.data[0].type4.begins_time, response.data.data[0].type4.jamah_time, response.data.data[0].type4.alarm_time)
            //         convertIshaTime(global.ishaBegins, response.data.data[0].type5.begins_time, response.data.data[0].type5.jamah_time, response.data.data[0].type5.alarm_time)
            //         global.sun = response.data.data[0].type6.prayerTime
            //         navigation.navigate('Drawer')
            //       }
    
                  
    
            navigation.navigate('Drawer')
    
    
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
        
        var trimhr = hr.replace(':','');
        var trimMin = min.replace(':','')
        var totalValFajeBegins = `${trimhr.length == 2 ? trimhr : `0${trimhr}`}:${trimMin.length == 2 ? trimMin : `0${trimMin}`}`
        // global.fajrrBegins =totalValFajeBegins
        return totalValFajeBegins;
    
      }

    const getData = async () => {
        const dayData = []
const fajrData = []
const sunhrData = []
const duhrData = []
const asrData = []
const magrbData = []
const ishaData = []
const colData = []
        const token = await AsyncStorage.getItem('token')
    
        axios.get(baseUrl + 'setting/view', {
          headers: {
            'auth-token': token
          }
        })
          .then((response) => {
          if(response.data.length == 0){
          
            navigation.navigate('Setting')
        }
        else{
           
        
          
          setResponseData(response.data)
      
          var date = new Date();
          var month = date.getMonth() + 1
          var year = date.getFullYear()


          global.resposneData = response.data
          global.calCity= response.data[0].city
          global.calCountry= response.data[0].country
          global.calAsr= response.data[0].prayer_method
        //   global.calMonth= response.data[0].go_to

           global.calYear= year

           if(global.london == "London Unified Prayer Time"){
   
            getLondonTime1()
          }
          else{


           axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
           .then((res) => {
     
            var d = moment().format("DD")
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


     
             global.prayerDat = res.data.data
             global.calendarPrayerData = res.data.data
             console.log("prayer response===x> d", global.prayerDat, global.calMonth);
   
             global.prayerDat.forEach(function (val, i) {
   
              
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
             })
     
             navigation.navigate('Drawer')
           })
          
        }
    }
          })
          .catch((error) => {
            console.log('error', error)
          })
    
    
    
    
    
    
      }



    function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }



    const enterPinValue = async (value) => {
        setEnteredPin(value)
        console.log("====",value, enteredPin)
        const token = await AsyncStorage.getItem('loginToken')
        const loginPin = await AsyncStorage.getItem('pin')
        console.log(JSON.parse(token), "--", enteredPin, "==", loginPin, value)

        if (JSON.parse(token) === value || loginPin == value) {
            setestablished(!established)
            

            setTimeout(() => {
                setModal(!modal)
                setTimeout(() => {
                    setloggingIn(!loggingIn)
                    setTimeout(() => {
                        validData(value)
                       
                      }, 1000)
                  }, 1500)
              }, 1500)

             

             
            
            console.log("entered--->", modal);

           




        }
        else if(value.length == 5){
            if(value != JSON.parse(token) ){
                pinView.current.clearAll()
                alert("Pin not matched")
            }
        }

    }


    const validData= async(value)=>{
 const tokens = await AsyncStorage.getItem('token')

            var params = null

            const headers = {

            };

            params = {
                "token": value,
            }
            console.log("response ---t", tokens, value, global.birthday,)


            axios.post('http://112.196.64.119:8000/api/user/pin_login', params, {
                headers: {
                    "auth-token": tokens
                }
            })
                .then((response) => {

                   console.log("resposne--->", response.data.msg);

                   if(response.status == 200){
                    var currentDate = new Date(),
                    month = ("0" + (currentDate.getMonth() + 1)).slice(-2),
                    day = ("0" + currentDate.getDate()).slice(-2),
                    year = ("0" + currentDate.getFullYear()).slice(-4)
                  var dd = [month, day, year].join("/")
                  var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                  console.log(time);


                  //change the format of any date
                  var date = global.birthday;
                  var datearray = date.split("/");
                  var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];


                  var default_time = ' 00:00:00' // for default time
                  var defaultGivenTime = dd + ' ' + time //for current date and time


                  let datetime = newdate.concat(default_time); 

                  let converTimeStamp = toTimestamp(datetime)
                  let givenDateTimeStamp = toTimestamp(defaultGivenTime)

                  global.converTimeStamp = converTimeStamp

                  const diffreTime = Math.abs(givenDateTimeStamp - converTimeStamp); 

                  var sepratorData = diffreTime.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")


                  global.BloodtimeDiff = diffreTime
                  global.MinutestimeDiff = diffreTime
                  global.HearttimeDiff = diffreTime
                  global.BreathtimeDiff = diffreTime

                  global.seconds = '00'
                  setestablished(false)
                    setTimeout(()=>{
                        setModal(false)
                        // setestablished(false)
                    },1000)
                
                   console.log(global.userId);
                   setVal(!val)
                   dashboardData()
                   console.log("resposneData------>", global.resposneData)
                //    alert(typeof global.fajrrBegins)

                


                //    global.resposneData == '' ? navigation.navigate('Setting') : navigation.navigate('Drawer')  
                   }
                  
                })
                .catch((error) => {
                    console.log('error', error.response)
                    // dispatch(userUpdateProfileFail())

                })
    }
   


    return (
        <>
            <StatusBar hidden />
            <Video
        source={videos}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
      />

            {modal ?

                <Modal
                    animationType='fade'
                    transparent={true}
                    // visible={visible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        // setModalVisible(!visible);
                    }}
                >
                    <View style={{ alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'}} >
                        <View style={{
                            width: '70%', padding: 30, borderRadius: 20, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 },
                            shadowColor: '#363636',
                            shadowOpacity: 1,
                            elevation: 4,
                        }}>
                            <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'Montserrat-Medium' }}>Wi-Islam</Text>
                            <ActivityIndicator size="small" color="#000" style={{ margin: 20 }} />

                        { loggingIn  ? 
                         <View>
                             
                         <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Montserrat-Medium' }}>Logging in...</Text>
                         
                     </View> 
                     :  
                           <View>
                           <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Montserrat-Medium' }}>Locating account...</Text>
                           
                       </View> 
                      } 
                           





                        </View>
                    </View>
                </Modal>
                :

                <SafeAreaView
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)", alignItems: "center" }}>

                    <Text
                        style={{
                            marginTop: '8%',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: RFValue(22),
                            fontFamily: 'Montserrat-Regular'
                        }}>
                        Assalamu Alaikum
                    </Text>

                    {global.userName <= 5 ?
                        <Text
                            style={{
                                width: global.userName <= 5 ? 100 : 0,
                                marginTop: 8,
                                color: 'black',
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                borderRadius: 30,
                                fontFamily: 'Montserrat-Medium',
                                fontSize: RFValue(20),
                                backgroundColor: 'white',
                                textAlign: 'center',

                            }}>
                            {global.userName}
                        </Text>

                        :

                        <Text
                            style={{
                                marginTop: 8,
                                color: 'black',
                                padding: 5,
                                paddingLeft: 25,
                                paddingRight: 25,
                                borderRadius: 30,
                                fontFamily: 'Montserrat-Medium',
                                fontSize: 20,
                                backgroundColor: 'white',
                                textAlign: 'center',

                            }}>
                            {global.userName}
                        </Text>
                    }


                    <Text
                        style={{
                            marginTop: 20,
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 13,

                        }}>
                        Enter your 5 digit passcode to login
                    </Text>
                    <ReactNativePinView
                        style={{ marginTop: 10 }}
                        inputSize={15}
                        ref={pinView}
                        pinLength={5}
                        buttonSize={70}
                        onValueChange={value => enterPinValue(value)}
                        customRightAccessibilityLabel='true'
                        buttonAreaStyle={{
                            marginTop: 10,
                        }}
                        inputAreaStyle={{
                            marginBottom: 10,
                        }}
                        inputViewEmptyStyle={{
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "#FFF",
                        }}
                        inputViewFilledStyle={{
                            backgroundColor: "#FFF",
                        }}
                        buttonViewStyle={{
                            borderWidth: 1,
                            marginTop: 5,
                            backgroundColor: '#fff',

                            borderColor: "#FFF",
                        }}
                        buttonTextStyle={{
                            color: "#000",
                            fontSize: 24,
                            fontFamily: 'Montserrat-Medium'
                        }}
                        onButtonPress={key => {
                            console.log("===", key)

                            if (key === "custom_left") {
                                pinView.current.clear()
                            }
                            if (key === "custom_right") {
                                pinView.current.clearAll()

                            }

                        }}
                        customLeftButton={<View style={{ marginTop: 5 }}>
                            <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 35 }}>
                                <Icon name={"delete"} size={25} color={"#000"} />
                            </View>
                        </View>}

                        customRightButton={<View style={{ marginTop: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Help')} style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 35 }}>

                                <Iconn name={"question"} size={28} color={"#000"} />
                            </TouchableOpacity>

                        </View>}
                    />
                </SafeAreaView>
           } 

            {established? 
                <Modal
                animationType='fade'
                transparent={true}
                // visible={visible}
                onRequestClose={() => {
                  // Alert.alert("Modal has been closed.");
                  // setModalVisible(!visible);
                }}
              >
                <View style={styles.centeredView} >
                <View style={{ width: '70%', padding: 30, borderRadius: 20, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 },
  shadowColor: '#363636',  
  shadowOpacity: 1,
  elevation: 4,}}>
                <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'Montserrat-Medium' }}>Wi-Islam</Text>
                <ActivityIndicator size="small" color="#000" style={{ margin: 20 }} />
                
           
               <View>
               <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Montserrat-Medium' }}>Establishing identity...</Text>
           </View>

          

              

            </View>
            </View>
              </Modal> 
              : null
                }

            {/* </ImageBackground> */}
        </>
    )
}

const styles = StyleSheet.create({


    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0,
        width: width
    },
    centeredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,


        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
});

export default PinLogin