import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, StatusBar, Image } from 'react-native';
import { Table, TableWrapper, Row, Col, Cols } from 'react-native-table-component';
import Iconback from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';
import moment from 'moment';
import { TextInput } from 'react-native-paper';
import { baseUrl } from '../Api/COntstant';
import AsyncStorage from '@react-native-community/async-storage';

const dayData = []
const fajrData = []
const sunhrData = []
const duhrData = []
const asrData = []
const magrbData = []
const ishaData = []
var color = ''
var month = ''
export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['    ', 'Day ', 'Fajr   ', 'Sunr ', "Dhuhr ", " Asr", "Magrb", "Isha "],
      widthArr: [36, 36, 36, 36, 36, 36, 36, 36, 36],
      tableTitle: ['01', '02', '03', '04'],
      dayDataa: [],
      color: 'green', 
    }
  }


  componentDidMount() {
    this.getData()
    
  }

  getData= async()=>{
    const token = await AsyncStorage.getItem('token')
        console.log("auth token bio", token)

        axios.get(baseUrl + 'setting/view/617fd4e32533f5595a927948', {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
              
                this.getPrayerData(response.data[0])
              
            })
            .catch((error) => {
                console.log('error', error)
            })


    
  
  

  }


  getPrayerData = (data) => {
    console.log('response-===', data)
    axios.get(`http://api.aladhan.com/v1/calendarByCity?city=London&country=United Kingdom&method=${data.asr_method}&month=04&year=2017`)
      .then((res) => {

        this.setState({ dayDataa: res.data.data })

        console.log("prayer response===x>", res.data.data);


      })

  }

  previousData=()=>{
    var date = new Date();
    var firstDay =
      new Date(date.getFullYear(), date.getMonth(), 1);
    global.month =  moment(firstDay-1).format("MMM"); 
    console.log("moment(firstDay).format()====>", global.month);
  }

  nextData=()=>{
    var date = new Date();
    var firstDay =
      new Date(date.getFullYear(), date.getMonth(), 1);
      global.month =  moment(firstDay+ 1).format("MMM"); 
  }

  render() {
    const state = this.state;
    const tableData = [];
    const colData = []
    for (let i = 1; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    for (let i = 1; i <= 31; i += 1) {

    }


    this.state.dayDataa.forEach(function (val, i) {

      if (i % 2 == 0) {
        color = 'orange'
      }
      else {
        color = '#F2DAC9'
      }
      colData.push(i + 1)
      console.log("column datas===>", "val", i);
      var d = val.date.gregorian.weekday.en.slice(0, 3)
      var fajr = val.timings.Fajr.slice(0, 5)
      var sunhr = val.timings.Fajr.slice(0, 5)
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
    })

   

    var date = new Date();
    var firstDay =
      new Date(date.getFullYear(), date.getMonth(), 1);

    var lastDay =
      new Date(date.getFullYear(), date.getMonth() + 1, 0);


      global.month =  moment(firstDay).format("MMM"); 
    var start_date = moment(firstDay).format("DD"); 
    var year = moment(firstDay).format("YYYY");

    var last_date = moment(lastDay).format("DD"); 

   var s_Date= `${start_date} ${global.month} ${year}-`
   var l_Date= `${last_date} ${global.month} ${year}`

  

    return (
      <View style={styles.container}>
        <StatusBar hidden />

        <View style={{ backgroundColor: '#FAE9D7', height: 47, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
            <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Settings</Text>
          </TouchableOpacity>
          {/* <Image source={require('../images/nafs.png')} style={{ width: 26, height: 26, marginRight: 20 }} /> */}
        </View>


        <View style={{  height: 48, backgroundColor: '#EAC1A3', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30, marginLeft: '5%', marginRight: '5%', borderTopLeftRadius: 6, borderTopRightRadius: 6 }}>
          <TouchableOpacity onPress={()=>this.previousData()} >
          <Image  source={require('../images/leftCircle.png')} style={{ width: 16, height: 16, marginLeft:15, }} />
          </TouchableOpacity>

          <View style={{ alignItems: 'center'}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: RFValue(13)}}>{s_Date}</Text>
            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: RFValue(13)}}>{l_Date}</Text>
          </View>
          <Text style={{fontFamily: 'Montserrat-Bold', fontSize: RFValue(10)}}>Sunnah Fasts (15)</Text>
          </View>

          <TouchableOpacity onPress={()=>this.nextData()}>
          <Image source={require('../images/rightCircle.png')} style={{ width: 16, height: 16, marginRight: 20, }} />
          </TouchableOpacity>
         
        </View>
        <ScrollView horizontal={true} style={{ marginLeft: '5%', marginRight: '5%', borderRadius: 15 }}>



          <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', borderRadius: 20 }}>
            <Row data={state.tableHead} style={styles.header} textStyle={{ textAlign: 'center', fontWeight: '100', padding: 5, fontSize: RFValue(12), fontFamily: 'Montserrat-Bold' }} />

            <ScrollView showsVerticalScrollIndicator={false} style={styles.dataWrapper}>
              <TableWrapper borderStyle={{ borderWidth: 0.4, borderColor: '#F1EDEA' }} style={{ flexDirection: 'row', width: '100%' }}>
              {colData == [] ? null
              :
                <Col data={colData} style={{ backgroundColor: color, }} heightArr={[28, 28]}  textStyle={{ textAlign: 'center', fontWeight: '100', margin: 5, fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold' }} />
              }

                {dayData == [] ? null
                  :
                  <Col data={dayData} style={{ backgroundColor: color, }} heightArr={[28, 28]}  textStyle={styles.text} />
                }

                {fajrData == [] ? null
                  :
                  <Col data={fajrData} style={{ backgroundColor: color, }} heightArr={[28, 28]}  textStyle={styles.text} />
                }

                {sunhrData == [] ? null
                  :
                  <Col data={sunhrData} style={{ backgroundColor: color, }} heightArr={[28, 28]}  textStyle={styles.text} />
                }

                {duhrData == [] ? null
                  :
                  <Col data={duhrData} style={{ backgroundColor: color, }} heightArr={[28, 28]}  textStyle={styles.text} />
                }

                {asrData == [] ? null
                  :
                  <Col data={asrData} style={{ backgroundColor: color, }} heightArr={[28, 28]}  textStyle={styles.text} />
                }

                {magrbData == [] ? null
                  :
                  <Col data={magrbData} style={{ backgroundColor: color, }} heightArr={[28, 28]}  textStyle={styles.text} />
                }

                {ishaData == [] ? null
                  :
                  <Col data={ishaData} style={{ backgroundColor: color, }} heightArr={[28, 28]} textStyle={styles.text} />
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#F2DDD0', },
  text: { textAlign: 'center', fontWeight: '100', padding: 5, fontSize: RFValue(12), fontFamily: 'Montserrat-SemiBold' },
  dataWrapper: { marginTop: -1, },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  title: { flex: 1, },
  wrapper: { flexDirection: 'row', },
});