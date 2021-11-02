// import React, { useEffect, useState } from 'react';
// import { View, Text, ActivityIndicator, StatusBar, TouchableOpacity, StyleSheet } from 'react-native';
// import Iconback from 'react-native-vector-icons/Entypo';
// import { baseUrl } from '../Api/COntstant';
// import { RFValue } from 'react-native-responsive-fontsize';
// import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
// import axios from 'axios';

// const tableData = [];
// const rowData = [];
// const PrayerSetting = (props) => {
//    const [tableHead, settableHead] = useState(['', 'Day', 'Fajr', 'Sunr', "Dhuhr", "Asr", "Magrb", "Isha"])
//    const [tableTitle, settableTitle] = useState(['01', '02', '03', '04'])
// //    const [tableData, settableData] = useState([['1', '2', '3',  '4', '5', '6', '7', ],
// //    ['a', 'b', 'c', 'd', 'e', 'f', 'g' ],
// //    ['1', '2', '3',  '4', '5', '6', '7'],
// //    ['a', 'b', 'c', 'd', 'e', 'f', 'g' ]])
   

//    useEffect(()=>{
    
//     for (let i = 0; i < 30; i += 1) {
     
//       for (let j = 0; j < 9; j += 1) {
//         rowData.push(`${i}${j}`);
//       }
//       tableData.push(rowData);
//     }
//        getPrayerData()
//    },[])

//    const getPrayerData=()=>{
//        axios.get('http://api.aladhan.com/v1/calendar?latitude=51.508515&longitude=-0.1254872&method=2&month=4&year=2017&juristicSchool=1&latiudeAdjustment=3')
//        .then((res)=>{
//            console.log("prayer response===>",res);
//        })
//    }

//     return (
//         <View style={{ flex: 1, backgroundColor: 'white' }}>

//             <StatusBar hidden />

//             <View style={{ backgroundColor: '#FAE9D7', height: 47, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

//                 <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
//                     <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
//                     <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Settings</Text>
//                 </TouchableOpacity>
//                 {/* <Image source={require('../images/nafs.png')} style={{ width: 26, height: 26, marginRight: 20 }} /> */}
//             </View>

//           <View style={styles.container}>
//           <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
//                 {
//                   tableData.map((rowData, index) => (
//                       <Rows data={rowData} flexArr={[1, 1, 1,1,1,1,1,1]} style={styles.row} textStyle={styles.text}/>
//                     // <Row
//                     //   key={index}
//                     //   data={rowData}
//                     //   widthArr={state.widthArr}
//                     //   style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
//                     //   textStyle={styles.text}
//                     // />
//                   ))
//                 }
//               </Table>
//             {/* <Table borderStyle={{borderBottomWidth: 1, marginTop: 50}}>
//           <Row data={tableHead}  style={styles.head} textStyle={styles.text}/>
//           <TableWrapper style={styles.wrapper}>
//             <Col data={tableTitle}  style={styles.title}  heightArr={[28,28]} textStyle={styles.text}/>
//             <Rows data={tableData} flexArr={[1, 1, 1,1,1,1,1,1]} style={styles.row} textStyle={styles.text}/>
//           </TableWrapper>
//         </Table> */}
//         </View>
//         </View>
//     )

// }

// const styles = StyleSheet.create({
//     container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
//     head: {  height: 40,  backgroundColor: '#f1f8ff'  },
//     wrapper: { flexDirection: 'row' },
//     title: { flex: 1, backgroundColor: '#f6f8fa', },
//     row: {  height: 28  },
//     text: { textAlign: 'center' }
//   });

// export default PrayerSetting


import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, TouchableOpacity, Text, StatusBar } from 'react-native';
import { Table, TableWrapper, Row, Col } from 'react-native-table-component';
import Iconback from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import axios from 'axios';


const dayData = []
export default class ExampleThree extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tableHead: ['', 'Day', 'Fajr', 'Sunr', "Dhuhr", "Asr", "Magrb", "Isha"],
      widthArr: [36, 36, 36, 36, 36, 36, 36, 36, 36],
      tableTitle: ['01', '02', '03', '04'],
      dayDataa: []
    }
  }


  componentDidMount(){
      this.getPrayerData()
  }


      getPrayerData=()=>{
       axios.get('http://api.aladhan.com/v1/calendar?latitude=51.508515&longitude=-0.1254872&method=2&month=4&year=2017&juristicSchool=1&latiudeAdjustment=3')
       .then((res)=>{
          
            this.setState({dayDataa: res.data.data})
        
            console.log("prayer response===x>",res.data.data[0]);


       })

   }
 
  render() {
    const state = this.state;
    const tableData = [];
    const colData=[]
    for (let i = 1; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
    }

    for(let i = 1; i <= 31; i += 1){
       colData.push(i)
    }

    console.log("column data===>", colData);
    


       for(var i = 0; i< this.state.dayDataa.length ; i++){
           var d  = this.state.dayDataa[i].date.gregorian.weekday.en.slice(0, 3)
               dayData.push(d)
               
           }


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

                          {/* <Table borderStyle={{borderBottomWidth: 1, marginTop: 50}}>
//           <Row data={tableHead}  style={styles.head} textStyle={styles.text}/>
//           <TableWrapper style={styles.wrapper}>
//             <Col data={tableTitle}  style={styles.title}  heightArr={[28,28]} textStyle={styles.text}/>
//             <Rows data={tableData} flexArr={[1, 1, 1,1,1,1,1,1]} style={styles.row} textStyle={styles.text}/>
//           </TableWrapper>
//         </Table> */}


        <ScrollView horizontal={true} style={{padding: 16, paddingTop: 30,}}>
          <View>
            <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
            <Row data={state.tableHead}  style={styles.header} textStyle={styles.text}/>
            </Table>
            <ScrollView style={styles.dataWrapper}>
            <TableWrapper style={styles.wrapper}>
             <Col data={colData}  style={styles.title}  heightArr={[28,28]} textStyle={styles.text}/>
            {dayData == [] ? null 
            :  
                <Col data={dayData}  style={styles.title}   heightArr={[28,28]} textStyle={styles.text}/>
            } 

              <Table borderStyle={{borderWidth: 1, borderColor: '#C1C0B9'}}>
                {
                  tableData.map((rowData, index) => (
                    <Row
                      key={index}
                      data={rowData}
                      widthArr={state.widthArr}
                      style={[styles.row, index%2 && {backgroundColor: '#F7F6E7'}]}
                      textStyle={styles.text}
                    />
                  ))
                }
              </Table>
           
            </TableWrapper>
            </ScrollView>
          </View>
        </ScrollView>
      </View>
    )
  }
}
 
const styles = StyleSheet.create({
  container: { flex: 1,  backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  dataWrapper: { marginTop: -1 },
  row: { height: 40, backgroundColor: '#E7E6E1' },
  title: { flex: 1, backgroundColor: '#f6f8fa', },
  wrapper: { flexDirection: 'row' },
});