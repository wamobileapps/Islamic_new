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
  const [count, setcount] = useState(parseInt(global.calMonth))
  const [man, setMan] = useState(global.calendarPrayerData)



  useEffect(() => {
  
    const unsubscribe = navigation.addListener('focus', () => {
      console.log('use effect');
    });
    return () => unsubscribe;
  },[]
  )

  const previousData = () => {
    
    const dayData = []
const fajrData = []
const sunhrData = []
const duhrData = []
const asrData = []
const magrbData = []
const ishaData = []              
const colData = []

var month
// global.calMonth = count

if (global.calMonth == 1) {
  // setcount(12)
  global.calMonth = 12;
  global.calYear--
  var lMonth = parseInt(global.calMonth)

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth - 1 , 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


    
      global.selectMonth =  moment(lMonth, 'MM').format('MMM');
      var monthh  = moment(lMonth, 'MM').format('MMM')
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


      global.calMonth = moment().month(monthh).format("M")
      setmonth(moment().month(monthh).format("M"))
      setyear(year)

      axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
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
    
        })
        setMan(res.data.data)
      });
      console.log('previous if');

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
      global.calMonth--;

      var lMonth = parseInt(global.calMonth)
      

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      global.selectMonth =  moment(lMonth, 'MM').format('MMM'); 
      //  month  = moment(lMonth, 'MM').format('MMM')
       month = moment(firstDay).format("MMM")
       var monthh  = moment(lMonth, 'MM').format('MMM')
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
      
      // global.calMonth = moment(lMonth, 'MM').format('MMM')
      global.calMonth = moment().month(monthh).format("M")
      axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
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

        })
        setMan(res.data.data)
      })
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


    var month

    if (global.calMonth == 12) {
      global.calMonth = 1;
    var lYear = global.calYear++
    var year = global.calYear;
      var lMonth = parseInt(global.calMonth)

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth + 1, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      global.selectMonth =  moment(lMonth, 'MM').format('MMM'); 
      //  month  = moment(lMonth, 'MM').format('MMM')
      var monthh  = moment(lMonth, 'MM').format('MMM')
       month = moment(firstDay).format("MMM")
      var start_date = moment(firstDay).format("DD");
      // var year = moment(firstDay).format("YYYY");
      
      console.log("set if data===>",firstDay, lastDay );

      // global.month = month

      var last_date = moment(lastDay).format("DD");
      global.last_date = last_date
      var s_Date = `${start_date} ${monthh} ${year} -`
     
      var l_Date = ` ${last_date} ${monthh} ${year}`


      // setmonth(moment().month(month).format("M"))
      setyear(year)

      // global.calMonth =moment(lMonth, 'MM').format('MMM')
      global.calMonth = moment().month(monthh).format("M")

      

      // console.log("pre prayer response===x>", global.calCity,global.calCountry, global.calAsr, global.calMonth,global.calYear );
      axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
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
        })
        setMan(res.data.data)
      })
 
      global.sDate = s_Date
      global.lDate = l_Date
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
      // global.calMonth = count
      
      // global.calMonth= global.calMonth + 1
      global.calMonth++;
      var lMonth = parseInt(global.calMonth)
      var lYear =global.calYear
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth, 1);
      var lastDay = new Date(date.getFullYear(), lMonth , 0);
      
      console.log("month: ",lMonth, firstDay, lastDay)
      global.selectMonth =  moment(lMonth, 'MM').format('MMM'); 
      //  month  = moment(lMonth, 'MM').format('MMM')
       month = moment(firstDay).format("MMM")
       var monthh  = moment(lMonth, 'MM').format('MMM')
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

      // global.calMonth = moment(lMonth, 'MM').format('MMM')
      global.calMonth = moment().month(monthh).format("M")

      console.log("pre prayer response===x>", global.calCity,global.calCountry, global.calAsr, global.calMonth,global.calYear, "apiiiii=>", `http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}` );

      axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
      .then((res) => {
        // setdayDataa(res.data.data)
        

        global.prayerDat =res.data.data
        global.calendarPrayerData = res.data.data
        // if(man == res.data.data){
          console.log("next if");
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
          


        })

setMan(res.data.data)
      })
      // global.sDate = s_Date
      // global.lDate = l_Date
    }
  }

 

  


 
    





    return (
      console.log('tarika 1',man),
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

        {/* <View style={{flexDirection: 'row', margin:5}}>
          <Text>{global.dayData}</Text>
        </View> */}
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