import React, { Component } from 'react';
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
var color = ''


export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['   ', 'Day', 'Fajr', 'Sun', "Zuhr", "Asr", "Mgrb", "Isha "],
      widthArr: [36, 36, 36, 36, 36, 36, 36, 36, 36],
      tableTitle: ['01', '02', '03', '04'],
      dayDataa: [],
      color: 'green',
      previousMonth: moment().month(global.month).format("MMM"),
      city: '',
      country: '',
      asrMethod: '',
      month: '',
      year: '',
      count: 1,
      count1: 1,
    }


    

  }




  componentDidMount() {
    // this.setState({previousMonth: moment().month(global.month).format("MMM")})
    this.updateData()
    this.getData()



    // const dayData = []
    // const fajrData = []
    // const sunhrData = []
    // const duhrData = []
    // const asrData = []
    // const magrbData = []
    // const ishaData = []
    // const colData = []
    
  }


  updateData= async()=>{
   
    global.prayerDat.forEach(function (val, i) {

      if (i % 2 == 0) {
        color = '#FAE9D7'
      }
      else {
        color = '#FAE9D7'
      }
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

      console.log("column datas===>", d);
    })
  }

  getData = async () => {
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
        // global.calMonth = response.data[0].go_to  
        this.setState({ city: response.data[0].city })
        this.setState({ country: response.data[0].country })
        this.setState({ asrMethod: response.data[0].asr_method })
        this.setState({ month: month })
        this.setState({ year: year })
        this.getPrayerData(response.data[0])


      })
      .catch((error) => {
        console.log('error', error)
      })






  }


  getPrayerData = async (data) => {

    console.log('response-===', global.calMonth, this.state.month, this.state.year, this.state.city, this.state.country, this.state.asrMethod)


    axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
      .then((res) => {

        this.setState({ dayDataa: res.data.data })

        global.prayerDat = res.data.data
        console.log("prayer response===x>", global.prayerDat);


      })

  }

  previousData = () => {
    const dayData = []
const fajrData = []
const sunhrData = []
const duhrData = []
const asrData = []
const magrbData = []
const ishaData = []
const colData = []
    //  newdatae = parseInt(global.month);
    var month

    if (global.calMonth == 0) {
      global.calMonth = 12;
      var lMonth = parseInt(global.calMonth)

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth - this.state.count, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      month = moment(JSON.stringify(lMonth)).format("MMM");

      var start_date = moment(firstDay).format("DD");
      var year = moment(firstDay).format("YYYY");
      // global.month = month
      // alert(newdatae)


      this.setState({ month: moment().month(month).format("M"), year: year })


      var last_date = moment(lastDay).format("DD");

      global.last_date = last_date
      var s_Date = `${start_date} ${month} ${year} -`
      global.sDate = s_Date
      var l_Date = ` ${last_date} ${month} ${year}`
      global.lDate = l_Date

      console.log("pre next data===>", s_Date);
      this.setState({ month: moment().month(month).format("M"), year: year })
      global.calMonth = moment().month(month).format("M");
      axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
      .then((res) => {
     

        
        global.prayerDat = res.data.data
        
        global.prayerDat.forEach(function (val, i) {

          console.log("prayer data ====>", global.prayerDat);
          colData.push(i + 1)
         
          var d = val.date.gregorian.weekday.en.sli6ce(0, 3)
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
      global.calMonth--;
      var lMonth = parseInt(global.calMonth)

      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth - this.state.count, 1);
      var lastDay = new Date(date.getFullYear(), lMonth, 0);


      month = moment(JSON.stringify(lMonth)).format("MMM");

      var start_date = moment(firstDay).format("DD");
      var year = moment(firstDay).format("YYYY");
      // global.month = month
      // alert(newdatae)


      this.setState({ month: moment().month(month).format("M"), year: year })


      var last_date = moment(lastDay).format("DD");

      global.last_date = last_date
      var s_Date = `${start_date} ${month} ${year} -`
      global.sDate = s_Date
      var l_Date = ` ${last_date} ${month} ${year}`
      global.lDate = l_Date

      console.log("pre next data===>", s_Date);
      this.setState({ month: moment().month(month).format("M"), year: year })
      global.calMonth = moment().month(month).format("M");
      axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
      .then((res) => {
     

        
        global.prayerDat = res.data.data
        
        global.prayerDat.forEach(function (val, i) {

          console.log("prayer data ====>", global.prayerDat);
          colData.push(i + 1)
         
          var d = val.date.gregorian.weekday.en.sli6ce(0, 3)
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
  }

  nextData = () => {
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
      var lMonth = parseInt(global.calMonth)
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth + this.state.count, 1);
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
      this.setState({ month: moment().month(month).format("M"), year: year })
      global.calMonth = moment().month(month).format("M");
      axios.get(`http://api.aladhan.com/v1/calendarByCity?city=${global.calCity}&country=${global.calCountry}&method=${global.calAsr}&month=${global.calMonth}&year=${global.calYear}`)
      .then((res) => {
     

        
        global.prayerDat = res.data.data
        
        global.prayerDat.forEach(function (val, i) {

          console.log("prayer data ====>", global.prayerDat);
          colData.push(i + 1)
         
          var d = val.date.gregorian.weekday.en.sli6ce(0, 3)
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

      global.calMonth++;

      var lMonth = parseInt(global.calMonth)
      var date = new Date();
      var firstDay = new Date(date.getFullYear(), lMonth + this.state.count, 1);
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
      this.setState({ month: moment().month(month).format("M"), year: year })
      global.calMonth = moment().month(month).format("M");
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
    
          console.log("pre column datas===>", dayData, global.dayData);
        })
      })
      
    }
  }

  render() {
    const state = this.state;
    const tableData = [];
  


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

    // console.log("prayer response===x> render", global.prayerDat);
    global.prayerDat.forEach(function (val, i) {

      if (i % 2 == 0) {
        color = '#FAE9D7'
      }
      else {
        color = '#FAE9D7'
      }
      colData.push(i + 1)
      // console.log("column datas===>", "val", val.timings);
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

    







    return (
      <View onLayout={(event) => {
        var { x, y, width, height } = event.nativeEvent.layout;


      }} style={styles.container}>
        <StatusBar hidden />

        <View style={{ backgroundColor: '#FAE9D7', height: 47, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
            <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('Setting')}>
            <Image source={require('../images/setting.png')} style={{ width: 26, height: 26, marginRight: 20 }} />
          </TouchableOpacity>
        </View>


        <View style={{ height: 48, backgroundColor: '#EAC1A3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginLeft: '2%', marginRight: '2%', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
          <TouchableOpacity onPress={() => this.previousData()} >
            <Image source={require('../images/leftCircle.png')} style={{ width: 16, height: 16, marginLeft: 15, }} />
          </TouchableOpacity>

          <View style={{ alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: RFValue(13) }}>{global.sDate}</Text>
              <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: RFValue(13) }}>{global.lDate}</Text>
            </View>
            <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: RFValue(10) }}>Sunnah Fasts (15)</Text>
          </View>

          <TouchableOpacity onPress={() => this.nextData()}>
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
              <Row data={state.tableHead} style={{ height: 35, backgroundColor: '#F2DAC9' }} textStyle={{ textAlign: 'center', padding: 5, fontSize: RFValue(8.5), fontFamily: 'Montserrat-Bold' }} />

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