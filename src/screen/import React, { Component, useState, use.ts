import React, { Component, useState, useRef, useEffect } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, StatusBar, Image, Dimensions } from 'react-native';
import { Table, TableWrapper, Row, Col, Cols } from 'react-native-table-component';
import Iconback from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import moment from 'moment';
import { baseUrl } from '../Api/COntstant';
import AsyncStorage from '@react-native-community/async-storage';
const windowWidth = Dimensions.get('window').width;

var newdatae = global.calMonth
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



const PrayerSetting=({navigation})=> {
 


  const [tableHead, settableHead] = useState(['   ', 'Day', 'Fajr', 'Sun', "Zuhr", "Asr", "Mgrb", "Isha "])
  const [widthArr, setwidthArr] = useState([36, 36, 36, 36, 36, 36, 36, 36, 36])
  const [tableTitle, settableTitle] = useState(['01', '02', '03', '04'])
  const [dayDataa, setdayDataa] = useState([])
  const [color, setcolor] = useState('green');
  const [previousMonth, setpreviousMonth] = useState(moment().month(global.month).format("MMM"))
  const [city, setcity] = useState('');
  const [country, setcountry] = useState('')
  const [asrMethod, setasrMethod] = useState('');
  const [month, setmonth] = useState('')
  const [year, setyear] = useState('');
  const [count, setcount] = useState(1)




  useEffect(() => {
    setdayDataa(global.prayerDat)
    getPrayerData()
    updateData()
    getData()


    const unsubscribe = navigation.addListener('focus', () => {
      updateData()
    });
    return () => unsubscribe;
  }, [] 
  )


  const updateData= async()=>{

    const dayData = []
const fajrData = []
const sunhrData = []
const duhrData = []
const asrData = []
const magrbData = []
const ishaData = []
const colData = []


   
    global.prayerDat.forEach(function (val, i) {

      // if (i % 2 == 0) {
      //   color = '#FAE9D7'
      // }
      // else {
      //   color = '#FAE9D7'
      // }
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

      console.log("column datas===>", dayData, global.dayData);
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

        var date = new Date();
        var month = date.getMonth() + 1
        var year = date.getFullYear()

        global.resposneData = response.data
        setcity(response.data[0].city)
        setcountry(response.data[0].country)
        setasrMethod(response.data[0].asr_method)
        setmonth(month)
        setyear(year)

        
        getPrayerData(response.data[0])


      })
      .catch((error) => {
        console.log('error', error)
      })






  }


  const getPrayerData = async (data) => {

   

    axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
      .then((res) => {
        setdayDataa(res.data.data)

        global.prayerDat = res.data.data
        // console.log("prayer response===x>", global.prayerDat);
        

        // updateData()
      })

  }

  const previousData = () => {
    //  newdatae = parseInt(global.month);
    var month

    if (global.calMonth == 0) {
      global.calMonth = 12;
      var lMonth = parseInt(global.calMonth)

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth - count, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      month = moment(JSON.stringify(lMonth)).format("MMM");

      var start_date = moment(firstDay).format("DD");
      var year = moment(firstDay).format("YYYY");
      // global.month = month
      // alert(newdatae)

      setmonth(moment().month(month).format("M"))
      setyear(year)


      var last_date = moment(lastDay).format("DD");

      global.last_date = last_date
      var s_Date = `${start_date} ${month} ${year} -`
      global.sDate = s_Date
      var l_Date = ` ${last_date} ${month} ${year}`
      global.lDate = l_Date

      console.log("pre next data===>", s_Date);

      global.calMonth = moment().month(month).format("M");
      setmonth(moment().month(month).format("M"))
      setyear(year)

      getPrayerData()
      updateData()
    }
    else {
      global.calMonth--;
      var lMonth = parseInt(global.calMonth)

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth - count, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      month = moment(JSON.stringify(lMonth)).format("MMM");

      var start_date = moment(firstDay).format("DD");
      var year = moment(firstDay).format("YYYY");
      // global.month = month
      // alert(newdatae)


      setmonth(moment().month(month).format("M"))
      setyear(year)

      var last_date = moment(lastDay).format("DD");

      global.last_date = last_date
      var s_Date = `${start_date} ${month} ${year} -`
      global.sDate = s_Date
      var l_Date = ` ${last_date} ${month} ${year}`
      global.lDate = l_Date

      console.log("pre next data===>", s_Date);
      setmonth(moment().month(month).format("M"))
      setyear(year)
      
      global.calMonth = moment().month(month).format("M");
      getPrayerData()
      updateData()
    }
  }

  const nextData = () => {

        const dayData = []
const fajrData = []
const sunhrData = []
const duhrData = []
const asrData = []
const magrbData = []
const ishaData = []
const colData = []

// console.log("pre prayer response===x>", global.calCity,global.calCountry, global.calAsr, global.calMonth,global.calYear );


    var month

    if (global.calMonth == 12) {
      global.calMonth = 1;
      var lMonth = parseInt(global.calMonth)
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth + count, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      month = moment(JSON.stringify(lMonth)).format("MMM");
      var start_date = moment(firstDay).format("DD");
      var year = moment(firstDay).format("YYYY");

      // global.month = month

      var last_date = moment(lastDay).format("DD");
      global.last_date = last_date
      var s_Date = `${start_date} ${month} ${year} -`
      global.sDate = s_Date
      var l_Date = ` ${last_date} ${month} ${year}`
      global.lDate = l_Date

      console.log("pre next data===>", s_Date);

      setmonth(moment().month(month).format("M"))
      setyear(year)

      global.calMonth = moment().month(month).format("M");
      // console.log("pre prayer response===x>", global.calCity,global.calCountry, global.calAsr, global.calMonth,global.calYear );

      axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
      .then((res) => {
     

        
        global.prayerDat = res.data.data
        
        global.prayerDat.forEach(function (val, i) {

          console.log("prayer data ====>", global.prayerDat);
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
      })
 
      
     
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


      global.calMonth++;

      var lMonth = parseInt(global.calMonth)
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth + count, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      month = moment(JSON.stringify(lMonth)).format("MMM");
      var start_date = moment(firstDay).format("DD");
      var year = moment(firstDay).format("YYYY");

      // global.month = month

      var last_date = moment(lastDay).format("DD");
      global.last_date = last_date
      var s_Date = `${start_date} ${month} ${year} -`
      global.sDate = s_Date
      var l_Date = ` ${last_date} ${month} ${year}`
      global.lDate = l_Date

      console.log("pre next data===>", s_Date);

      setmonth(moment().month(month).format("M"))
      setyear(year)

      global.calMonth = moment().month(month).format("M");

      // console.log("pre prayer response===x>", global.calCity,global.calCountry, global.calAsr, global.calMonth,global.calYear );

      axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
      .then((res) => {
        // setdayDataa(res.data.data)


        global.prayerDat = res.data.data
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
          console.log("prayer data ====>", global.prayerDat, dayData);
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
      })
 
    }
  }

 

  


 
    






    return (
      <View onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;


      }} style={styles.container}>
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
            <Image source={require('../images/leftCircle.png')} style={{ width: 16, height: 16, marginLeft: 15, }} />
          </TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: RFValue(13) }}>{global.sDate}</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: RFValue(13) }}>{global.lDate}</Text>
            </View>
            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: RFValue(10) }}>Sunnah Fasts (15)</Text>
          </View>

          <TouchableOpacity onPress={() => nextData()}>
            <Image source={require('../images/rightCircle.png')} style={{ width: 16, height: 16, marginRight: 20, }} />
          </TouchableOpacity>

        </View>
        {/* <ScrollView horizontal={true} style={{ borderRadius: 15, marginLeft: windowWidth  * 0.1  }}>



          <View 
            style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 20, }}>
             <Row data={state.tableHead} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: '100', padding: 5, fontSize: RFValue(12), fontFamily: 'Montserrat-Bold' }} />

            <ScrollView style={{ backgroundColor: 'red', }} showsVerticalScrollIndicator={false}> */}
        <ScrollView style={{ borderRadius: 15, marginLeft: '2%', marginRight: '2%' }}>
          <View
            style={{ borderRadius: 20, }}>
            <ScrollView style={{}} showsVerticalScrollIndicator={false}>
              <Row data={tableHead} style={{ height: 35, backgroundColor: '#F2DAC9' }} textStyle={{ textAlign: 'center', padding: 5, fontSize: RFValue(8.5), fontFamily: 'Montserrat-Bold' }} />

              <TableWrapper borderStyle={{ borderWidth: 0.4, borderColor: '#F1EDEA', height: 100 }} style={{ flexDirection: 'row', }}>
                {global.colData == [] ? null
                  :
                  <Col data={global.colData} style={{ backgroundColor: "#F2DAC9", }} heightArr={[28, 28]} textStyle={{ textAlign: 'center', fontWeight: '100', margin: 5, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold' }} />
                }

                {global.dayData == [] ? null
                  :
                  <Col data={global.dayData} style={{ backgroundColor: "#F2DAC9", }} heightArr={[28, 28]} textStyle={styles.text} />
                }

                {global.fData == [] ? null
                  :
                  <Col data={global.fData} style={{ backgroundColor: "#F2DAC9", }} heightArr={[28, 28]} textStyle={styles.text} />
                }

                {global.sData == [] ? null
                  :
                  <Col data={global.sData} style={{ backgroundColor: "#F2DAC9", }} heightArr={[28, 28]} textStyle={styles.text} />
                }

                {global.dData == [] ? null
                  :
                  <Col data={global.dData} style={{ backgroundColor: "#F2DAC9", }} heightArr={[28, 28]} textStyle={styles.text} />
                }

                {global.aData == [] ? null
                  :
                  <Col data={global.aData} style={{ backgroundColor: "#F2DAC9", }} heightArr={[28, 28]} textStyle={styles.text} />
                }

                {global.mData == [] ? null
                  :
                  <Col data={global.mData} style={{ backgroundColor: "#F2DAC9", }} heightArr={[28, 28]} textStyle={styles.text} />
                }

                {global.iData == [] ? null
                  :
                  <Col data={global.iData} style={{ backgroundColor: "#F2DAC9", }} heightArr={[28, 28]} textStyle={styles.text} />
                }

                {/* <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  {
                    tableData.map((rowData, index) => (
                      <Row
                        key={index}
                        data={rowData}
                        widthArr={state.widthArr}
                        style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                        textStyle={styles.text}
                      />
                    ))
                  }
                </Table> */}

              </TableWrapper>

            </ScrollView>
          </View>
        </ScrollView>
        {/* </ScrollView>
          </View>
        </ScrollView> */}
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