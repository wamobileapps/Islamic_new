
import { min } from 'moment';
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, PermissionsAndroid, TouchableOpacity, SafeAreaView, Image, TextInput, ImageBackground, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
const upImage = require('../images/home.png')
import * as Progress from 'react-native-progress';
import ProgressCircle from 'react-native-progress-circle'
import Orientation from 'react-native-orientation';
import { RFValue } from "react-native-responsive-fontsize";
import { baseUrl } from '../Api/COntstant';
import Geolocation from '@react-native-community/geolocation';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;
const arrayData = [];
const arrayDataa = []

global.windowHeight = windowHeight-70
global.windowWidth = windowWidth-70

// const paddingTopBottom =  '4.5%'
// const marGinBottom = '4%'
// const paddingTopBottomCircle =  '4%'
// const marginBottom =  '4%'

// const paddingTopBottom =  '9.8%'
// const marGinBottom = '5%'
// const paddingTopBottomCircle =  '7%'
// const marginBottom =  '4%'

const paddingTopBottom = windowHeight > 630 ? '7.5%' : '4.5%'
const marGinBottom = windowHeight > 630 ? '7%' : '4%'
const paddingTopBottomCircle = windowHeight > 630 ? '7%' : '4%'
const marginBottom = windowHeight > 630 ? '4.5%' : '4%'


const largeCircleWidth = Math.round((windowWidth - 20) / 7.5)
const largeCircleHeight = Math.round((windowHeight - 124) / 15)
const largeCircle = (largeCircleWidth + largeCircleHeight) / 2;

console.log("height=====>", Math.round((windowWidth - 20) / 8),Math.round((windowHeight - 124) / 16) );


const smallCircleWidth = Math.round((windowWidth - 65) / 9.3)
const smallCircleHeight = Math.round((windowHeight - 160) / 18)
const smallCircle = (smallCircleWidth + smallCircleHeight) / 2;

const config = {
  deviceWidth: Dimensions.get('window').width,
  deviceHeight: Dimensions.get('window').height
}

global.entry = []
const Home = ({ navigation }) => {

  const [total, totalTravlled] = useState('')
  const [minutesOnEarth, setMinutesOnEarth] = useState('')
  const [totalHeartBeats, setTotalHeartBeats] = useState('')
  const [bloodCirculated, setBloodCirculated] = useState('')
  const [locationStatus, setLocationStatus] = useState('');


  var heartBeats = 100000 / 86400;
  var totalbreaths = 20000 / 86400;
  var onEarth = 1440 / 86400;
  var bloodTravel = 19000 / 86400;

  useEffect(() => {
    Orientation.lockToPortrait();
    requestLocationPermission();

    var currentDate = new Date(),
      month = ("0" + (currentDate.getMonth() + 1)).slice(-2),
      day = ("0" + currentDate.getDate()).slice(-2),
      year = ("0" + currentDate.getFullYear()).slice(-4)
    var dd = [year, month, day].join("-")
    global.dateValue = dd
    console.log("currentDate====>", currentDate);

    seconds += 1;
    var currentDate = new Date()
    var time = currentDate.getTime();
    let givenDateTimeStamp = time / 1000;
    const diffreTime = Math.abs(givenDateTimeStamp - global.converTimeStamp);


    var minutes = Math.floor(diffreTime / 60);
    var seconds = Math.floor(diffreTime) - (minutes * 60);
    var totalMinutes = `${minutes}:${seconds}`


    var totalTravlle = diffreTime * bloodTravel
    totalTravlled(totalTravlle.toFixed(2))

    if (seconds >= 10) {
      var totalMinutes = `${minutes}:${seconds}`
      var sepratorData = totalMinutes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      setMinutesOnEarth(sepratorData)
    }
    else {
      var totalMinutes = `${minutes}:0${seconds}`
      var sepratorData = totalMinutes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      setMinutesOnEarth(sepratorData)
    }


    var totalHeartbeats = parseInt(diffreTime * heartBeats)
    var sepratorData = totalHeartbeats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    setTotalHeartBeats(sepratorData)
    // console.log("totalHeartbeats", totalHeartbeats)

    var totalbreathss = parseInt(diffreTime * totalbreaths)
    var sepratorDataa = totalbreathss.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    setBloodCirculated(sepratorDataa)

    const minuteInterval = setInterval(() => {
      seconds += 1;
      var currentDate = new Date()
      var time = currentDate.getTime(); //for get timestamp of currentdate and time 
      let givenDateTimeStamp = time / 1000;
      const diffreTime = Math.abs(givenDateTimeStamp - global.converTimeStamp);


      var minutes = Math.floor(diffreTime / 60);
      var seconds = Math.floor(diffreTime) - (minutes * 60);
      var totalMinutes = `${minutes}:${seconds}`




      if (seconds >= 10) {
        var totalMinutes = `${minutes}:${seconds}`
        var sepratorData = totalMinutes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        setMinutesOnEarth(sepratorData)
      }
      else {
        var totalMinutes = `${minutes}:0${seconds}`
        var sepratorData = totalMinutes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        setMinutesOnEarth(sepratorData)
      }



    }, -100);


    const interval = setInterval(() => {
      seconds += 1;
      var currentDate = new Date()
      var time = currentDate.getTime(); //for get timestamp of currentdate and time 
      let givenDateTimeStamp = time / 1000;
      const diffreTime = Math.abs(givenDateTimeStamp - global.converTimeStamp);


      var minutes = Math.floor(diffreTime / 60);
      var seconds = Math.floor(diffreTime) - (minutes * 60);
      var totalMinutes = `${minutes}:${seconds}`




      if (seconds >= 10) {
        var totalMinutes = `${minutes}:${seconds}`
        var sepratorData = totalMinutes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        setMinutesOnEarth(sepratorData)
      }
      else {
        var totalMinutes = `${minutes}:0${seconds}`
        var sepratorData = totalMinutes.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        setMinutesOnEarth(sepratorData)
      }


      var totalHeartbeats = parseInt(diffreTime * heartBeats)
      var sepratorData = totalHeartbeats.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      setTotalHeartBeats(sepratorData)





      var totalbreathss = parseInt(diffreTime * totalbreaths)
      var sepratorDataa = totalbreathss.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      setBloodCirculated(sepratorDataa)


    }, 1000);

    const intervall = setInterval(() => {
      seconds += 1;
      var currentDate = new Date()
      var time = currentDate.getTime(); //for get timestamp of currentdate and time 
      let givenDateTimeStamp = time / 1000;
      const diffreTime = Math.abs(givenDateTimeStamp - global.converTimeStamp);



      var totalTravlle = diffreTime * bloodTravel
      var i = totalTravlle.toFixed(2)
      var sepratorData = i.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      totalTravlled(sepratorData)


    }, 1);







    const unsubscribe = navigation.addListener('focus', () => {
      getDashboardData()
    });
    return () => clearInterval(minuteInterval, interval, intervall), unsubscribe;
  }, []);


  //===============================================get current loaction=========================================
  const requestLocationPermission = async () => {

    try {

      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {

      },
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        Geolocation.getCurrentPosition(info => {


          getBeginsData(info)

          console.log("info=====>", info)
        },
          (error) => alert("Error: Are location services on?"),
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

  const getBeginsData = async (data) => {
    console.log("get given date data====>", data);
    axios.get(`https://api.aladhan.com/v1/timings/${data.timestamp}?latitude=${data.coords.latitude}&longitude=${data.coords.longitude}`, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("get given date data====>", response.data.data.timings);
        setLocationStatus(response.data.data.timings)
        global.fajr = response.data.data.timings.Fajr
        global.zuhr = response.data.data.timings.Dhuhr
        global.asr = response.data.data.timings.Asr
        global.maghrib = response.data.data.timings.Maghrib
        global.isha = response.data.data.timings.Isha
      })
      .catch((error) => {
        console.log('error', error)
      })
  };


  const getDashboardData = async () => {
    requestLocationPermission();
    Orientation.lockToPortrait();

    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token, global.dateValue)
    var param = {
      "date": global.dateValue
    }

    axios.post(baseUrl + 'dashboard', param, {
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


  const getColorData = (rating) => {
    let color = '#C59069';
    if (rating == 1) {
      color = '#DAA67F'
    }
    else if (rating == 2) {
      color = '#D3A079'
    }
    else if (rating == 3) {
      color = '#E3BFA4'
    }
    else if (rating == 4) {
      color = '#DFB392'
    }
    else if (rating == 5) {
      color = '#D3A079'
    }
    else if (rating == 6) {
      color = '#C59069'
    }
    else if (rating == 7) {
      color = '#DFB392'
    }
    else if (rating == 8) {
      color = '#E3BFA4'
    }
    return color;
  }


  const getTazkiaScreen = async (item) => {
    console.log("item tazkia===>", item);
    var currentDate = new Date(),
      month = ("0" + (currentDate.getMonth() + 1)).slice(-2),
      day = ("0" + currentDate.getDate()).slice(-2),
      year = ("0" + currentDate.getFullYear()).slice(-4)
    var dd = [year, month, day].join("-")
    global.dateValue = dd

    console.log(global.dateValue, "===", item);
    global.purificationId = item._id
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    axios.get(baseUrl + `purification/list/${item._id}/${dd}`, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("response iman===", response);
        const arrayData = []
        const arrayData2 = [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5];

        if (response.data.data.length === 0) {
          console.log("ifff")
          entry.colors = '#C59069'
          response.data.PurificationList.map((item, index) => {
            arrayData.push({ x: 3.5, y: arrayData2[index], label: item.title, colors: '#C59069' });
          })

        }
        else {
          console.log("kjkj");
          response.data.PurificationList.map(function (entry) {


            for (var i = 0; i < response.data.data.length; i++) {
              console.log("iff", response.data.data.length);
              if (entry._id === response.data.data[i].purification) {

                entry.colors = getColorData(response.data.data[i].rating)
                entry.rating = 3.5 + parseFloat(response.data.data[i].rating) / 3

                break
              }
              else {


                entry.colors = getColorData(0)
                entry.rating = 3.5
              }

            }
          })



          for (var i = 0; i < response.data.PurificationList.length; i++) {

            let entry = response.data.PurificationList[i]

            arrayData.push({ x: 3, y: entry.rating, label: entry.title, rating: entry.rating, colors: entry.colors })
          }
          console.log("===>", arrayData);

        }
        global.arrayData = arrayData

        global.tazkiaTitle = response.data.PurificationList
        console.log('purification list uxhd===>', response.data.PurificationList)
        navigation.navigate('Tazkia', { name: item.name, id: item._id, icon: item.icons, info: item.info })
      })
      .catch((error) => {
        console.log('error', error)
      })

  }


  const getMinutesOnEarth = () => {
    var buttonsListArr = [];

    for (let i = 0; i < minutesOnEarth.length; i++) {

      buttonsListArr.push(
        <Text style={{ fontSize: 12, color: '#C28647', fontFamily: 'Montserrat-SemiBold', flexDirection: 'row', width: minutesOnEarth.charAt(i) == ',' || minutesOnEarth.charAt(i) == ':' ? 4 : 9, }}>{minutesOnEarth.charAt(i)}</Text>
      );
    }
    return buttonsListArr
  }

  const getBloodTravelled = () => {
    var totalListArr = []
    for (let i = 0; i < total.length; i++) {

      totalListArr.push(
        <Text style={{ fontSize: 12, color: '#C28647', fontFamily: 'Montserrat-SemiBold', flexDirection: 'row', width: total.charAt(i) == ',' || total.charAt(i) == '.' ? 4 : 9, }}>{total.charAt(i)}</Text>
      );
    }

    return totalListArr
  }

  const getTotalHeartBeat = () => {
    var totalHeartData = [];

    for (let i = 0; i < totalHeartBeats.length; i++) {

      totalHeartData.push(
        <Text style={{ fontSize: 12, color: '#C28647', fontFamily: 'Montserrat-SemiBold', flexDirection: 'row', width: totalHeartBeats.charAt(i) == ',' ? 4 : 9, }}>{totalHeartBeats.charAt(i)}</Text>
      );
    }
    return totalHeartData
  }

  const getTotalBreath = () => {
    var totalBreathData = []
    for (let i = 0; i < bloodCirculated.length; i++) {

      totalBreathData.push(
        <Text style={{ fontSize: 12, color: '#C28647', fontFamily: 'Montserrat-SemiBold', flexDirection: 'row', width: bloodCirculated.charAt(i) == ',' ? 4 : 9, }}>{bloodCirculated.charAt(i)}</Text>
      );
    }
    return totalBreathData
  }

  const getDailyIbadhdata = async (icons) => {

    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token, global.dateValue)
    var param = {
      "date": global.dateValue
    }

    axios.post(baseUrl + 'daily_ibadah/dashboard', param, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {


        navigation.navigate('DailyIbadh', { id: '6139aa33b0a41824d7261060', icon: icons })

      
      })
      .catch((error) => {
        console.log('error', error)
      })

  }


  const getMuhasabahData = (icons) => {
    navigation.navigate('Muhasabah', { icon: icons })
  }

  return (

    <SafeAreaView style={{ flex: 1,  }}>

      <ImageBackground source={upImage} style={{ width: windowWidth, height: windowHeight, }}>
        <View style={{ flexDirection: 'row', borderBottomLeftRadius: 60, borderBottomRightRadius: 60, }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../images/menu.png')} style={{ width: 25, height: 15, marginTop: 25, marginLeft: 20 }} />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: '#000', marginTop: 20, color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 20, textAlign: 'center' }}>Dashboard</Text>
        </View>




        <View onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          console.log("value of x===>", width, "height", height)
        }} style={{ top: windowHeight > 630 ? '4%' : '4%' }}>

          <View style={{ backgroundColor: 'white',flexDirection: 'row', marginLeft: 20, paddingTop: paddingTopBottom, paddingBottom: paddingTopBottom, alignItems: 'flex-start', justifyContent: 'center', marginBottom: marGinBottom, marginRight: 20, elevation: 5, borderRadius: 20 }}>
          <View style={{  marginLeft: 20,  justifyContent: 'center'}}>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' }}></Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#C18446',  marginTop: 10  }}>Begins</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#C18446', marginTop: 10 }}>Jamaah</Text>
              
            </View>
            
            <View style={{  marginLeft: 10, justifyContent: 'center' , alignItems: 'center' }}>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' }}>Fajr</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636',  marginTop: 10 }}>{global.fajr}</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' ,  marginTop: 10}}></Text>
            
            </View>

            <View style={{  marginLeft: 10,  justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' }}>Zuhr</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636',  marginTop: 10 }}>{global.zuhr}</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' ,  marginTop: 10}}></Text>
            
            </View>

            <View style={{  marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' }}>Asr</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636',  marginTop: 10 }}>{global.asr}</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' ,  marginTop: 10}}></Text>
            
            </View>

            <View style={{  marginLeft: 10, justifyContent: 'center', alignItems: 'center'}}>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' }}>Maghrib</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636',  marginTop: 10 }}>{global.maghrib}</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' ,  marginTop: 10}}></Text>
            
            </View>

            <View style={{  marginLeft: 10,  justifyContent: 'center', alignItems: 'center', marginRight: 20}}>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' }}>Isha</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636',  marginTop: 10 }}>{global.isha}</Text>
              <Text style={{  fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#363636' ,  marginTop: 10}}></Text>
            
            </View>

            

            {/* <View style={{  marginRight: 20 , justifyContent: 'space-evenly',marginTop:10}}>
              <Text style={{ marginLeft: 20, fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#C18446',  }}>Begins</Text>
              <Text style={{ marginLeft: '9%', fontFamily: 'Montserrat-Medium', fontSize: RFValue(12), color: '#363636' }}>{global.fajr}</Text>
              <Text style={{ marginLeft: 20, fontFamily: 'Montserrat-Medium', fontSize: RFValue(12), color: '#363636' }}>{ global.zuhr}</Text>
              <Text style={{ marginLeft: 20, fontFamily: 'Montserrat-Medium', fontSize: RFValue(12), color: '#363636' }}>{global.asr}</Text>
              <Text style={{ marginLeft: 20, fontFamily: 'Montserrat-Medium', fontSize: RFValue(12), color: '#363636' }}>{global.maghrib}</Text>
              <Text style={{ marginLeft: 20, fontFamily: 'Montserrat-Medium', fontSize: RFValue(12), color: '#363636' }}>{global.isha}</Text>

            </View>

            <Text style={{ marginLeft: 20, fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(12), color: '#C18446', marginTop: 10 }}>Jamaah</Text> */}
          </View>




          <View style={{ backgroundColor: 'white', alignItems: 'center', marginLeft: 20, marginRight: 20, elevation: 5, borderRadius: 20 }}>


            <FlatList
              data={global.totalRatingsData}
              style={{ paddingTop: paddingTopBottomCircle, paddingBottom: paddingTopBottomCircle, }}

              numColumns={4}

              renderItem={({ item, index }) => {

                let progress = item.progress

                return (
                  index > 3 ?
                    <TouchableOpacity onPress={() => item.name == 'Daily Ibadah' ? getDailyIbadhdata(item.icons) :
                      item.name == 'My Mood' ? getMuhasabahData(item.icons) : getTazkiaScreen(item)}
                      style={{ justifyContent: 'center', alignItems: 'center', marginLeft: index == 4 ? -5 : config.deviceWidth * .001, }}>




                      <ProgressCircle
                        outerCircleStyle={{ marginLeft: 10 }}
                        percent={`${Math.round(item.progress)}`}
                        radius={largeCircle}
                        borderWidth={5}
                        color="#ECC090"
                        shadowColor="#FCF5EC"
                        bgColor="#fff"
                      >
                        <Text style={{ fontSize: RFValue(13), fontFamily: 'Montserrat-Bold', }}>{`${Math.round(item.progress)}%`}</Text>
                      </ProgressCircle>





                      <Text style={{ fontSize: RFValue(10), marginTop: 5, color: '#363636', marginLeft: 10, fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>{item.name}</Text>

                    </TouchableOpacity>

                    :

                    <TouchableOpacity onPress={() => item.name == 'Daily Ibadah' ? getDailyIbadhdata(item.icons) :
                      item.name == 'Muhasabah' ? getMuhasabahData(item.icons) : getTazkiaScreen(item)}
                      style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 15, }}>



                      <View style={{ alignItems: 'center', justifyContent: 'center', marginLeft: index == 0 ? -10 : config.deviceWidth * .002 }}>
                        <ProgressCircle
                          outerCircleStyle={{ marginLeft: 10, }}
                          percent={`${Math.round(item.progress)}`}
                          radius={smallCircle}
                          borderWidth={5}
                          color="#ECC090"
                          shadowColor="#FCF5EC"
                          bgColor="#fff"
                        >
                          <Text style={{ fontSize: RFValue(14), fontFamily: 'Montserrat-Bold', }}>{`${Math.round(item.progress)}%`}</Text>
                        </ProgressCircle>



                        <Text style={{ fontSize: RFValue(10), marginTop: 5, color: '#363636', marginLeft: 10, fontFamily: 'Montserrat-Bold', alignItems: 'center' }}>{item.name}</Text>
                      </View>
                    </TouchableOpacity>
                )
              }}
            />



          </View>


          <View style={{ backgroundColor: 'white', marginLeft: 20, marginBottom: 10, marginRight: 20, marginTop: marGinBottom, paddingTop: paddingTopBottom, paddingBottom: paddingTopBottom, elevation: 5, borderRadius: 20 }}>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ width: '43%', borderWidth: 1, borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8, height: 45, backgroundColor: '#FCF5EC', marginBottom: marginBottom, marginLeft: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 9, color: '#000', color: '#363636', fontFamily: 'Montserrat-Medium', textAlign: 'center' }}>Blood travelled (kms)</Text>
                <View style={{ flexDirection: 'row', }}>
                  {getBloodTravelled()}
                </View>

              </View>

              <View style={{ width: '43%', borderWidth: 1, borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8, backgroundColor: '#FCF5EC', marginBottom: marginBottom, marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 9, color: '#000', color: '#363636', fontFamily: 'Montserrat-Medium', textAlign: 'center' }}>Minutes on earth</Text>
                <View style={{ flexDirection: 'row' }}>
                  {getMinutesOnEarth()}
                </View>
              </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
              <View style={{ width: '43%', borderWidth: 1, borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8, height: 45, backgroundColor: '#FCF5EC', marginLeft: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 9, color: '#000', color: '#363636', fontFamily: 'Montserrat-Medium', textAlign: 'center' }}>Total heart beats</Text>
                <View style={{ flexDirection: 'row' }}>
                  {getTotalHeartBeat()}
                </View>
              </View>

              <View style={{ width: '43%', borderWidth: 1, borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8, height: 45, backgroundColor: '#FCF5EC', marginRight: 15, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 9, color: '#000', color: '#363636', fontFamily: 'Montserrat-Medium', textAlign: 'center' }}>Your Total Breaths</Text>
                <View style={{ flexDirection: 'row' }}>
                  {getTotalBreath()}
                </View>
              </View>
            </View>

          </View>





        </View>
      </ImageBackground>
    </SafeAreaView>

  )

}

export default Home