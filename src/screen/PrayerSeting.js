import React, { Component, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, StatusBar, Image, Dimensions, ActivityIndicator } from 'react-native';
import { Table, TableWrapper, Row, Col, Cols } from 'react-native-table-component';
import Iconback from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import moment from 'moment';
import { baseUrl } from '../Api/COntstant';
import AsyncStorage from '@react-native-community/async-storage';
import SpinnerModal from '../components/SpinnerModal';


const windowWidth = Dimensions.get('window').width;

const dayData = []
const fajrData = []
const sunhrData = []
const duhrData = []
const asrData = []
const magrbData = []
const ishaData = []
const colData = []
global.dayData = []
global.fData = []
global.sData = []
global.dData = []
global.aData = []
global.mData = []
global.iData = []
global.colData = []
// global.color = ''

const PrayerSetting = ({ navigation }) => {


  const [tableHead, settableHead] = useState(['   ', 'Day', 'Fajr', 'Sun', "Zuhr", "Asr", "Mgrb", "Isha "])
  const [tableHeadL, settableHeadL] = useState(['   ', 'Fajr', 'Sun', "Zuhr", "Asr", "Mgrb", "Isha "])

  const [month, setmonth] = useState('')
  const [year, setyear] = useState('');
  const [man, setMan] = useState(global.calendarPrayerData)
  const [visibleM, setVisibleM] = useState(false)


  useEffect(() => {
    // global.calendarPrayerData.forEach(function (val, i) {
    //   console.log("global.calendarPrayerData=====>", val);
    //   // if(i%2 == 0){
    //   //   global.color= ["pink"]
    //   //   console.log("true====>",global.color);
    //   // }
    //   // else{
    //   //   global.color= ["yellow"]
    //   //   console.log("false====>",global.color);
    //   // }

    //   colData.push(i + 1)

    //   var d = val.date.gregorian.weekday.en.slice(0, 3)
    //   var fajr = val.timings.Fajr.slice(0, 5)
    //   var sunhr = val.timings.Sunrise.slice(0, 5)
    //   var dhuhr = val.timings.Dhuhr.slice(0, 5)
    //   var asr = val.timings.Asr.slice(0, 5)
    //   var maghrib = val.timings.Maghrib.slice(0, 5)
    //   var isha = val.timings.Isha.slice(0, 5)
    //   dayData.push(d)
    //   fajrData.push(fajr)
    //   sunhrData.push(sunhr)
    //   duhrData.push(dhuhr)
    //   asrData.push(asr)
    //   magrbData.push(maghrib)
    //   ishaData.push(isha)

    //   global.dayData = dayData
    //   global.fData = fajrData
    //   global.sData = sunhrData
    //   global.dData = duhrData
    //   global.aData = asrData
    //   global.mData = magrbData
    //   global.iData = ishaData
    //   global.colData = colData


    // })


    const unsubscribe = navigation.addListener('focus', () => {
      console.log('use effect', global.colData);
    });
    return () => unsubscribe;
  }, []
  )


  const getLondonTime1 = async () => {
    const dayData = []
    const fajrData = []
    const sunhrData = []
    const duhrData = []
    const asrData = []
    const magrbData = []
    const ishaData = []
    const colData = []


    console.log("london prayer time data of api", `https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.numMonth}&24hours=false`);


    var date = new Date().getMonth() + 1

    axios.get(`https://www.londonprayertimes.com/api/times/?format=json&key=9e2a1077-7c3f-4a0a-a284-2f68a58b02cc&year=${global.calYear}&month=${global.numMonth}&24hours=false`)
      .then((response) => {
        global.prayerDat = response.data.times
        global.calendarPrayerData = response.data.times
        console.log("date l=====> ", response.data.times);


        if (global.calendarPrayerData != undefined) {

          var c = []
          var a = Object.keys(global.prayerDat).reverse()
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

              global.fData = fajrData
              global.sData = sunhrData
              global.dData = duhrData
              global.aData = asrData
              global.mData = magrbData
              global.iData = ishaData
              global.colData = colData

              setVisibleM(false)

              return obj;
            }, {});
        }
        else {
          setVisibleM(false)
        }


        setMan(response.data.times)
        console.log("london n time===>", man, fajrData.reverse());
        // console.log("get london time====>", response.data.times,  moment().format("YYYY-MM-DD"), Object.values(response.data.times).includes('2021-11-29'));
      })
  }

  const previousData = () => {
    setVisibleM(true)
    const dayData = []
    const fajrData = []
    const sunhrData = []
    const duhrData = []
    const asrData = []
    const magrbData = []
    const ishaData = []
    const colData = []

    var month

    if (global.numMonth == 1) {
      // setcount(12)
      global.numMonth = 12;
      global.calYear--
      var lMonth = parseInt(global.numMonth)

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth - 1, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);



      global.selectMonth = moment(lMonth, 'MM').format('MMM');
      var monthh = moment(lMonth, 'MM').format('MMM')
      month = moment(firstDay).format("MMM")
      var start_date = moment(firstDay).format("DD");
      // var year = moment(firstDay).format("YYYY");
      var year = global.calYear
      setmonth(moment().month(monthh).format("M"))
      setyear(year)


      var last_date = moment(lastDay).format("DD");
      global.last_date = last_date
      var s_Date = `${start_date} ${monthh} ${year} -`
      global.sDate = s_Date
      var l_Date = ` ${last_date} ${monthh} ${year}`
      global.lDate = l_Date


      setmonth(moment().month(monthh).format("M"))
      setyear(year)

      if (global.london == "London Unified Prayer Time") {

        getLondonTime1()
      }
      else {
        console.log("djxnjkcn-", `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.numMonth}&year=${global.calYear}`);

        axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.numMonth}&year=${global.calYear}`)
          .then((res) => {



            global.prayerDat = res.data.data
            global.calendarPrayerData = res.data.data


            global.calendarPrayerData.forEach(function (val, i) {

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

              setVisibleM(false)

            })
            setMan(res.data.data)
          });
        console.log('previous if');
      }
    }
    else {
      const dayData = []
      const fajrData = []
      const sunhrData = []
      const duhrData = []
      const asrData = []
      const magrbData = []
      const ishaData = []
      const colData = []
      // setcount(count- 1)
      global.numMonth--;

      var lMonth = parseInt(global.numMonth)


      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      global.selectMonth = moment(lMonth, 'MM').format('MMM');
      //  month  = moment(lMonth, 'MM').format('MMM')
      month = moment(firstDay).format("MMM")
      var monthh = moment(lMonth, 'MM').format('MMM')
      var start_date = moment(firstDay).format("DD");
      // var year = moment(firstDay).format("YYYY");
      var year = global.calYear
      // global.month = month


      setmonth(moment().month(monthh).format("M"))
      setyear(year)

      var last_date = moment(lastDay).format("DD");
      global.last_date = last_date
      var s_Date = `${start_date} ${monthh} ${year} -`
      global.sDate = s_Date
      var l_Date = ` ${last_date} ${monthh} ${year}`
      global.lDate = l_Date

      setmonth(moment().month(monthh).format("M"))
      setyear(year)


      if (global.london == "London Unified Prayer Time") {

        getLondonTime1()
      }
      else {
        console.log("djxnjkcn-", `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.london}&month=${global.numMonth}&year=${global.calYear}`);

        axios.get(`https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.numMonth}&year=${global.calYear}`)
          .then((res) => {



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

              setVisibleM(false)

            })
            setMan(res.data.data)
          })
      }
    }
  }

  const nextData = () => {
    setVisibleM(true)
    const dayData = []
    const fajrData = []
    const sunhrData = []
    const duhrData = []
    const asrData = []
    const magrbData = []
    const ishaData = []
    const colData = []


    var month

    if (global.numMonth == 12) {
      global.numMonth = 1;
      var year = global.calYear;
      var lMonth = parseInt(global.numMonth)
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth + 1, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      global.selectMonth = moment(lMonth, 'MM').format('MMM');
      //  month  = moment(lMonth, 'MM').format('MMM')
      var monthh = moment(lMonth, 'MM').format('MMM')
      month = moment(firstDay).format("MMM")
      var start_date = moment(firstDay).format("DD");
      // var year = moment(firstDay).format("YYYY");


      // global.month = month

      var last_date = moment(lastDay).format("DD");
      global.last_date = last_date
      var s_Date = `${start_date} ${monthh} ${year} -`

      var l_Date = ` ${last_date} ${monthh} ${year}`


      // setmonth(moment().month(month).format("M"))
      setyear(year)
      global.sDate = s_Date
      global.lDate = l_Date

      console.log("set if data===>", global.sDate, global.lDate, year);



      if (global.london == "London Unified Prayer Time") {
        getLondonTime1()

      }
      else {
        console.log("djxnjkcn-", `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.numMonth}&year=${global.calYear}`);

        // console.log("pre prayer response===x>", global.calCity,global.calCountry, global.calAsr, global.calMonth,global.calYear );
        axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.numMonth}&year=${global.calYear}`)
          .then((res) => {



            global.prayerDat = res.data.data
            global.calendarPrayerData = res.data.data
            global.calendarPrayerData.forEach(function (val, i) {

              console.log("prayer data next if====>", global.prayerDat);
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

              console.log('next if');

              setVisibleM(false)
            })
            setMan(res.data.data)
          })

        global.sDate = s_Date
        global.lDate = l_Date
      }
    }
    else {
      // setcount(count+ 1)≥
      //           const dayData = []
      // const fajrData = []
      // const sunhrData = []
      // const duhrData = []
      // const asrData = []
      // const magrbData = []
      // const ishaData = []
      // const colData = []

      // setcount(prevState => {
      //    {prevState + 1}
      // })

      global.numMonth++;
      var lMonth = parseInt(global.numMonth)
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);

      console.log("month: ", lMonth, firstDay, lastDay)
      global.selectMonth = moment(lMonth, 'MM').format('MMM');
      //  month  = moment(lMonth, 'MM').format('MMM')
      month = moment(firstDay).format("MMM")
      var monthh = moment(lMonth, 'MM').format('MMM')
      var start_date = moment(firstDay).format("DD");
      var year = global.calYear;
      console.log("firstDay======>", month);
      // global.month = month
      var last_date = moment(lastDay).format("DD");
      global.last_date = last_date
      var s_Date = `${start_date} ${monthh} ${year} -`
      global.sDate = s_Date
      var l_Date = ` ${last_date} ${monthh} ${year}`
      global.lDate = l_Date

      console.log("start next date====>", firstDay, lastDay);


      setmonth(moment().month(month).format("M"))
      setyear(year)


      console.log("pre prayer response===x>", global.calCity, global.calCountry, global.calAsr, global.calMonth, global.calYear, "apiiiii=>", `http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.numMonth}&year=${global.calYear}`);

      if (global.london == "London Unified Prayer Time") {

        getLondonTime1()
      }
      else {

        console.log("djxnjkcn-", `https://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.numMonth}&year=${global.calYear}`);

        axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.numMonth}&year=${global.calYear}`)
          .then((res) => {
            // setdayDataa(res.data.data)


            global.prayerDat = res.data.data
            global.calendarPrayerData = res.data.data
            // if(man == res.data.data){
            console.log("next if", res);
            // }else{
            //   console.log("next else");
            // }

            global.calendarPrayerData.forEach(function (val, i) {


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

              console.log('next else');
              console.log("prayer next else data ====>", global.prayerDat);

              setVisibleM(false)

            })

            setMan(res.data.data)
          })
        // global.sDate = s_Date
        // global.lDate = l_Date
      }
    }
  }


  return (
    console.log('tarika 1', man),
    <View style={styles.container}>
      {/* <View style={{position:'absolute',zIndex:3,opacity:0.2,backgroundColor:'red',height:30,borderRadius:10,top:240,width:'100%'}}/> */}
      <StatusBar hidden />
      <View style={{ backgroundColor: '#FAE9D7', height: 47, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
          <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Calendar</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Setting')}>
          <Image source={require('../images/setting.png')} style={{ width: 26, height: 26, marginRight: 20 }} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 48, backgroundColor: '#EAC1A3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginLeft: '2%', marginRight: '2%', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
        <TouchableOpacity onPress={() => previousData()} >
          <Image source={require('../images/leftCircle.png')} style={{ width: 17, height: 17, marginLeft: 15, }} />
        </TouchableOpacity>
        <View style={{ alignItems: 'center' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: RFValue(13) }}>{global.sDate}</Text>
            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: RFValue(13) }}>{global.lDate}</Text>
          </View>
          <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: RFValue(10) }}>Sunnah Fasts (15)</Text>
        </View>
        <TouchableOpacity onPress={() => nextData()}>
          <Image source={require('../images/rightCircle.png')} style={{ width: 17, height: 17, marginRight: 20, }} />
        </TouchableOpacity>
      </View>
      <ScrollView style={{ borderRadius: 15, marginLeft: '2%', marginRight: '2%' }}>
        <View
          style={{ borderRadius: 20, }}>
          {global.calendarPrayerData != undefined ?
            <ScrollView  onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;
        console.log('Height of view',height)
            }}  style={{}} showsVerticalScrollIndicator={false}>
              <Row data={global.london == "London Unified Prayer Time" ? tableHeadL : tableHead} style={{ height: 35, backgroundColor: '#F2DAC9' }} textStyle={{ textAlign: 'center', padding: 5, fontSize: RFValue(8.5), fontFamily: 'Montserrat-Bold' }} />
              {global.london == "London Unified Prayer Time" ?
                <TableWrapper borderStyle={{ borderWidth: 0.4, borderColor: '#F1EDEA' }} style={{ flexDirection: 'row', }}>
                  {global.colData == [] ? null
                    :
                    <Col data={global.colData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={{ textAlign: 'center', fontWeight: '100', margin: 5, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold' }} />
                  }



                  {global.fData == [] ? null
                    :
                    <Col data={global.fData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.sData == [] ? null
                    :
                    <Col data={global.sData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.dData == [] ? null
                    :
                    <Col data={global.dData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.aData == [] ? null
                    :
                    <Col data={global.aData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.mData == [] ? null
                    :
                    <Col data={global.mData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.iData == [] ? null
                    :
                    <Col data={global.iData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                }

                </TableWrapper>
                :
                <TableWrapper borderStyle={{ borderWidth: 0.4, borderColor: '#F1EDEA', height: 100 }} style={{ flexDirection: 'row', }}>
                  {global.colData == [] ? null
                    :
                    <Col data={global.colData} style={{ backgroundColor: "#F2DAC9", }} heightArr={[28, 28]} textStyle={{ textAlign: 'center', fontWeight: '100', margin: 5, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold' }} />
                  }

                  {global.dayData == [] ? null
                    :
                    <Col data={global.dayData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={{color: global.color},styles.text} />
                  }

                  {global.fData == [] ? null
                    :
                    <Col data={global.fData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.sData == [] ? null
                    :
                    <Col data={global.sData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.dData == [] ? null
                    :
                    <Col data={global.dData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.aData == [] ? null
                    :
                    <Col data={global.aData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.mData == [] ? null
                    :
                    <Col data={global.mData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }

                  {global.iData == [] ? null
                    :
                    <Col data={global.iData} style={{ backgroundColor: "#FAE9D7", }} heightArr={[28, 28]} textStyle={styles.text} />
                  }



                </TableWrapper>
              }

            </ScrollView>
            :
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ fontSize: 20, textAlign: 'center', paddingTop: '40%' }} >No Result found</Text>
            </View>
          }
        </View>
      </ScrollView>
      {/* </ScrollView>
          </View>
        </ScrollView> */}


      <SpinnerModal
        visible={visibleM}
        heading="Please Wait ..."
      />
    </View>
  )

}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#F2DDD0', },
  text: { textAlign: 'center', padding: 6, fontSize: RFValue(8), fontFamily: 'Montserrat-SemiBold' },
  dataWrapper: { marginTop: -1, },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  title: { flex: 1, },
  wrapper: { flexDirection: 'row', },
});


export default PrayerSetting