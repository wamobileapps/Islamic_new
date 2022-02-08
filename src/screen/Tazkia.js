import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, TouchableOpacity, Modal, Dimensions, TextInput, ImageBackground, FlatList, ScrollView } from "react-native";
import { VictoryCursorContainer, VictoryLabel, VictoryPie } from "victory-native";
import Svg, { Circle } from 'react-native-svg';
import Iconback from 'react-native-vector-icons/Entypo';
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { Calendar } from 'react-native-calendars';
import ReactNativeZoomableView from '@dudigital/react-native-zoomable-view/src/ReactNativeZoomableView';
import { baseUrl } from '../Api/COntstant';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ImageUrl } from '../Api/ImageUrl'
import { RFValue } from "react-native-responsive-fontsize";
const SCREEN_WIDTH = Dimensions.get('window').width;


const dataList = [
  {
    "name": "General",
    "val": 'You'
  },
  {
    "name": "Ethnic",
    "val": 'You'
  },
  {
    "name": "Muslim",
    "val": 'You'
  }
]
const General = "General"
const Ethic = "Ethnic"
const You = "You"
const Tazkia = ({ navigation, route }) => {

  const [generalModal, setGeneralModal] = useState(false)
  const [generalList, setGeneralList] = useState([])
  const [block1, setBlock1] = useState('');
  const [block2, setBlock2] = useState('');
  const [response, setResponse] = useState('');
  const [userinfo, setuserInfo] = useState(false);




  const name = route.params.name
  const id = route.params.id
  const icon = route.params.icon
  const info = route.params.info



  const colorRating = ["#DAA67F", "#D3A079", "#C59069", "#E3BFA4", "#DFB392", "#D3A079", "#C59069", "#DFB392", "#E3BFA4"]
  const [calenderVisible, setCalenderVisible] = useState('')
  const colors = []


  global.arrayData.map((item) => {
    colors.push(item.colors)
  })
  console.log("global.item_progressRating====>", global.item_progressRating);

  useEffect(async () => {
    const token = await AsyncStorage.getItem('token')

    axios
      .get('http://112.196.64.119:8000/api/user/generalyou/list/general', {
        headers: {
          'auth-token': token,
        },
      })
      .then(response => {
        console.log('responseTVLISTTT========>>.', response.data);
        setResponse(response.data[0]);
      })
      .catch(error => {
        console.log('error=======tcvvv', error);
      });





    getDashboardData()
    getAllSegmentsData(id)
    console.log("----", colors);

    const unsubscribe = navigation.addListener('focus', () => {
      getAllSegmentsData(id)
    });

    return unsubscribe;










  }, [navigation]);


  const getDashboardData = async () => {

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
                //   break
              }

            }



            // 
            return entry;
          });

        }
        global.totalRatingsData = response.data.types


        response.data.types.map((i) => {
          if (i._id == id) {
            global.item_progressRating = i.progress
            console.log("response.data.types===>", global.item_progressRating, " ====>", i.progress);
          }
          else {

            // 

          }
        })
        console.log("else===>", global.item_progressRating);
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


  const getAllSegmentsData = async (id) => {
    getDashboardData()
    console.log(global.dateValue, "===", id);
    global.purificationId = id
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    axios.get(baseUrl + `purification/list/${id}/${global.dateValue}`, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("response iman===", response);
        const arrayData = []
        const arrayData2 = [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5];

        if (response.data.data.length === 0) {
          console.log("ifff")
          entry.colors = '#C59069'
          response.data.PurificationList.map((item, index) => {
            arrayData.push({ x: 3.5, y: arrayData2[index], label: item.title, colors: entry.colors });
          })

        }
        else {
          console.log("kjkj");
          response.data.PurificationList.map(function (entry) {


            for (var i = 0; i < response.data.data.length; i++) {
              console.log("if-----f", response.data.PurificationList);
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
            // return entry
          })



          for (var i = 0; i < response.data.PurificationList.length; i++) {

            let entry = response.data.PurificationList[i]

            arrayData.push({ x: 3, y: entry.rating, label: entry.title, rating: entry.rating, colors: entry.colors })
          }
          console.log("===>", arrayData);

        }
        global.arrayData = arrayData

        global.tazkiaTitle = response.data.PurificationList
        console.log('purification list===>', global.arrayData)
        navigation.navigate('Tazkia', { name: name })
      })
      .catch((error) => {
        console.log('error', error)
      })
  }


  const onDateChangeValue = (day) => {
    console.log(day.dateString);
    // setDataChange(day.dateString)
    global.dateValue = day.dateString
    setCalenderVisible(!calenderVisible)
    getAllSegmentsData(id)
  }

  const getGeneralData = async (General) => {
    // const token = await AsyncStorage.getItem('token')
    var l = General.charAt(0).toLowerCase() + General.slice(1);
    axios.get(baseUrl + `generalyou/list/${l}`, {
      headers: {
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTEyNWM3ZDMyOTQ1ZDE3N2VmNDU4YjYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzE2OTQ0MjJ9.dtW95J8k-EBCXe0y3M45nE0eJSPt1V7ldMZjmCUyKgc"
      }
    })
      .then((response) => {


        setGeneralModal(!generalModal)
        setGeneralList(response.data)
        console.log('response====================', response.data)

      })
      .catch((error) => {
        console.log('error', error)
      })
  }




  const updateList = async (General) => {
    const token = await AsyncStorage.getItem('token')
    console.log("token88", token);
    var options = {
      "options": [
        block1 ? block1 : response.name,
        block2 ? block2 : response.name],
      "type": "general",
      "user_id": "61125c7d32945d177ef458b6"
    }
    console.log("options", options);
    axios
      .patch('http://112.196.64.119:8000/api/user/generalyou/update/6141a632f126bf5869e4781e', options, {
        headers: {
          'auth-token': token,
        },
      })
      .then(response => {
        console.log('response123333========>>.', response.data);
        setBlock1(response.data)
        setBlock2(response.data)
      })
      .catch(error => {
        console.log('error=======123', error);
      });
    setGeneralModal(!generalModal)

  }

  //  const  userinfoModal = () => {

  //  setuserInfo(true)

  //   }







  const renderItem = (item) => {
    console.log("---->", item.item.name);
    return (



      <TouchableOpacity onPress={() => getGeneralData(item.item.name)} style={{ justifyContent: 'space-evenly', marginLeft: 10, marginRight: 10, flexDirection: 'row', width: 100, borderRadius: 10, backgroundColor: 'white',height: 50 }}>
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ marginLeft: 5, marginRight: 5, fontSize: 13, fontFamily: 'Montserrat-Bold' }}>{item.item.name}</Text>
          <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Bold' }}>You</Text>
        </View>
      </TouchableOpacity>


    )
  }

const getRadius=(string)=>{
let length=string.length/2
return 25* length

}


  return (
    <View style={styles.container}>

      <View style={{ backgroundColor: '#FAE9D7', height: 45, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
            <Text style={{ fontSize: RFValue(13), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>{name}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setuserInfo(!userinfo)}>
            <Image source={require('../images/info.png')} style={{ width: 13, height: 13, marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
        <Image source={{ uri: `${ImageUrl}${icon}` }} style={{ width: 26, height: 26, marginRight: 20 }} />

      </View>

      {/* <Header
        navigation={navigation}
        pageName={name}
        icon={icon}
      /> */}




      <View style={{ flex: 1 }} >
        <ReactNativeZoomableView
          maxZoom={1.5}
          minZoom={1}
          zoomStep={1}
          initialZoom={1}
          captureEvent={true}
          style={{ flex: 1 }}
        >

          {/* On Android onclick work with SVG and for IOS onclick work with TouchableOpacity */}
          <Svg width={400} height={410} viewBox="0 0 400 400"
            style={{ width: "100%", height: "auto", }}>

            <Circle cx={SCREEN_WIDTH * 0.5} cy={SCREEN_WIDTH * 0.5} r={27} stroke="#C59069"
              strokeWidth="4"
              fill="white" />


            <VictoryPie
              standalone={false}
              radius={({ datum }) => 18 + datum.y * 18}
              innerRadius={35}
              labelRadius={60}
              // padAngle={0.3}
              // labelPosition='centroid'
              labelPlacement='parallel'
              // containerComponent={
              //   <VictoryCursorContainer
              //     cursorLabel={({ datum }) => `${datum.x.toPrecision(2)}, ${datum.y.toPrecision(2)}`}
              //   />
              // }

              // labelComponent={<VictoryLabel 
              // verticalAnchor="end"
              // style={{ color: '#28323B', fontSize:10,top:0,position:'absolute', fontFamily: 'Montserrat-Bold', }}
              // />}

              style={{
                data: {
                  backgroundColor: 'black',justifyContent:'flex-start',alignItems:'flex-start'
                },
                labels: {
                  fontSize: 10, fill: "#454545", fontWeight: 'bold',position:'absolute',left:0
                },



              }}
              colorScale={colorRating}
              // radius={({ datum }) =>  getRadius(datum.label)}
              // data={global.arrayData}
              data={[
                     { x: 3, y: 5, label: "External ghjhjsd"},
                     { x: 3, y: 5, label: "Takia"},
                     { x: 3, y: 5, label: "xd"},
                     { x: 3, y: 5, label: "Internal " },
                     { x: 3, y: 5, label: "External"},
                     { x: 3, y: 5, label: "Takia"},
                     { x: 3, y: 5, label: "def"}]}

              events={[{
                target: "data",
                eventHandlers: {
                  onPressIn: () => {
                    return [
                      {
                        target: "labels",
                        mutation: ({ text, index }) => {
                          console.log("=====>", text, index, global.tazkiaTitle[index].title)

                          if (text === global.tazkiaTitle[index].title) {
                            navigation.navigate('TazkiaDetails', { tazkiaId: global.tazkiaTitle[index]._id, tazkiaName: global.tazkiaTitle[index].title, tazkiaIcon: global.tazkiaTitle[index].icons })
                          }

                        }
                      }

                    ];
                  }
                }
              }]}
            />

            <VictoryLabel
              textAnchor="middle"
              verticalAnchor="middle"
              style={{ color: '#28323B', lineHeight: 40, fontSize: 18, fontFamily: 'Montserrat-Bold', }}
              x={SCREEN_WIDTH * 0.5} y={SCREEN_WIDTH * 0.5
              }
              text={`${Math.round(global.item_progressRating)}%`}
            />
          </Svg>
        </ReactNativeZoomableView>

        {name == 'You' ?

          <FlatList
            data={dataList}
            renderItem={(item) => renderItem(item)}
            style={{ alignSelf: "center", position: 'absolute', bottom: 100, }}
            numColumns={3}
            key={3}
          />

          : null}


        <TouchableOpacity onPress={() => setCalenderVisible(!calenderVisible)} style={{
          justifyContent: 'center', alignItems: 'center', marginTop: 60, bottom: 20,
          padding: 10, marginLeft: 50, marginRight: 50, borderRadius: 30, elevation: 5, backgroundColor: '#E3BFA4'
        }}>
          <Text style={{ fontSize: 14, fontFamily: 'Montserrat-Bold' }}>Historical Data</Text>
        </TouchableOpacity>


        {calenderVisible == true ?
          <Modal
            animationType="slide"
            transparent={true}
            visible={calenderVisible}
            onRequestClose={() => {
            }}
          >
            <View style={styles.centeredView} >

              <Calendar
                current={new Date()}
                minDate="1800-01-01"
                maxDate={new Date()}
                onDayPress={(day) => onDateChangeValue(day)}
                style={{
                  borderWidth: 1,
                  borderColor: 'gray',
                  height: 400,
                 marginLeft: 20, marginRight:20
                }}
                // theme={{
                //   // backgroundColor: '#ffffff',
                //   // calendarBackground: '#ffffff',
                //   textSectionTitleColor: '#b6c1cd',
                //   textSectionTitleDisabledColor: '#d9e1e8',
                //   selectedDayBackgroundColor: '#00adf5',
                //   selectedDayTextColor: '#ffffff',
                //   todayTextColor: '#00adf5',
                //   dayTextColor: '#2d4150',
                //   textDisabledColor: '#d9e1e8',
                //   dotColor: '#00adf5',
                //   selectedDotColor: '#ffffff',
                //   arrowColor: 'orange',
                //   disabledArrowColor: '#d9e1e8',
                //   monthTextColor: 'blue',
                //   indicatorColor: 'blue',
                //   textDayFontFamily: 'monospace',
                //   textMonthFontFamily: 'monospace',
                //   textDayHeaderFontFamily: 'monospace',
                //   textDayFontWeight: '300',
                //   textMonthFontWeight: 'bold',
                //   textDayHeaderFontWeight: '300',
                //   textDayFontSize: 16,
                //   textMonthFontSize: 16,
                //   textDayHeaderFontSize: 16
                // }}
              />
            </View>

          </Modal>

          : null}

        {
          userinfo == true ?
            <Modal
              animationType="slide"
              transparent={true}
              visible={userinfo}
              onRequestClose={() => {
                //  setuserInfo(!userinfo)
              }}
            >
              <View style={{
                flex: 1, alignItems: 'center',
                backgroundColor: 'rgba(0,0,0,0.7)'
              }} >
                <View style={{
                  width: '90%', top: '5%',
                  backgroundColor: "white",
                  borderRadius: 20,
                  padding: 35,
                  shadowColor: "#000",
                  shadowOffset: {
                    width: 0,
                    height: 2
                  },
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5
                }}>

                  <TouchableOpacity onPress={()=>setuserInfo(!userinfo)} style={{ right: 10, position: 'absolute', top: 10 }}>
                    <Image source={require('../images/close.png')} style={{ width: 17, height: 18, }} />
                  </TouchableOpacity>
                  <Text style={{fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold'}}>{info}</Text>
                </View>
              </View>

            </Modal>

            : null}


        {generalModal ?
          <Modal
            animationType="slide"
            transparent={true}
            visible={generalModal}
            onRequestClose={() => {
              setGeneralModal(!generalModal)
            }}
          >
            <View style={styles.centeredView}>

              <View style={styles.modalView}>

                <TouchableOpacity onPress={() => updateList(General)} style={{ right: 10, position: 'absolute', top: 10 }}>
                  <Image source={require('../images/close.png')} style={{ width: 20, height: 21, }} />
                </TouchableOpacity>

                <ScrollView style={{ alignSelf: 'center', backgroundColor: 'white' }}>

                  <View style={{ alignSelf: 'center', backgroundColor: 'white' }}>

                    <ImageBackground
                      source={require('../images/upimage.png')}
                      style={{ height: hp('4.2%'), width: wp('61%') }}>
                      <TextInput
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '75%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text1}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <ImageBackground
                        source={require('../images/leftimage.png')}
                        style={{ height: hp('13%'), width: wp('16%'), bottom: 28, right: 2, marginTop: 5 }}>
                        <TextInput


                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginTop: 20,
                            right: 6,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text2}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>

                      <View style={{ marginTop: 9 }}>

                        <TextInput
                          placeholder={response.name}
                          placeholderTextColor="#000"
                          scrollEnabled={true}

                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginLeft: 10,

                            color: 'black',
                            width: 70,
                            height: 35,

                          }}
                          multiline={true}
                          value={block1}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setBlock1(text)}

                        />
                      </View>

                      <ImageBackground
                        source={require('../images/rightimage.png')}
                        style={{ height: hp('14%'), width: wp('18.8%'), bottom: 28, left: 11, marginTop: 2 }}>
                        <TextInput
                          // placeholder="Password"
                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            right: 6,
                            marginTop: 25,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text3}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>
                    </View>
                    <ImageBackground
                      source={require('../images/downimage.png')}
                      style={{ height: hp('4.6%'), width: wp('61%'), bottom: 55 }}>
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#000"
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '70%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text4}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>

                    {/* /////////////////////////////////////////1st block completed/////////////////////////////////////////////////////// */}


                    <ImageBackground
                      source={require('../images/upimage.png')}
                      style={{ height: hp('4.2%'), width: wp('61%') }}>
                      <TextInput
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '75%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text1}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <ImageBackground
                        source={require('../images/leftimage.png')}
                        style={{ height: hp('13%'), width: wp('16%'), bottom: 28, right: 2, marginTop: 5 }}>
                        <TextInput


                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginTop: 20,
                            right: 6,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text2}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>

                      <View style={{ marginTop: 9 }}>

                        <TextInput
                          placeholder={response.name}
                          placeholderTextColor="#000"
                          scrollEnabled={true}

                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginLeft: 10,

                            color: 'black',
                            width: 70,
                            height: 35,

                          }}
                          multiline={true}
                          value={block1}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setBlock1(text)}

                        />
                      </View>

                      <ImageBackground
                        source={require('../images/rightimage.png')}
                        style={{ height: hp('14%'), width: wp('18.8%'), bottom: 28, left: 11, marginTop: 2 }}>
                        <TextInput
                          // placeholder="Password"
                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            right: 6,
                            marginTop: 25,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text3}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>
                    </View>
                    <ImageBackground
                      source={require('../images/downimage.png')}
                      style={{ height: hp('4.6%'), width: wp('61%'), bottom: 55 }}>
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#000"
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '70%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text4}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>

                    {/* //////////////////////////////////////////////////2nd block completed////////////////////////////////////////////////////////////////////////////////// */}

                    <ImageBackground
                      source={require('../images/upimage.png')}
                      style={{ height: hp('4.2%'), width: wp('61%') }}>
                      <TextInput
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '75%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text1}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <ImageBackground
                        source={require('../images/leftimage.png')}
                        style={{ height: hp('13%'), width: wp('16%'), bottom: 28, right: 2, marginTop: 5 }}>
                        <TextInput


                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginTop: 20,
                            right: 6,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text2}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>

                      <View style={{ marginTop: 9 }}>

                        <TextInput
                          placeholder={response.name}
                          placeholderTextColor="#000"
                          scrollEnabled={true}

                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginLeft: 10,

                            color: 'black',
                            width: 70,
                            height: 35,

                          }}
                          multiline={true}
                          value={block1}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setBlock1(text)}

                        />
                      </View>

                      <ImageBackground
                        source={require('../images/rightimage.png')}
                        style={{ height: hp('14%'), width: wp('18.8%'), bottom: 28, left: 11, marginTop: 2 }}>
                        <TextInput
                          // placeholder="Password"
                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            right: 6,
                            marginTop: 25,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text3}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>
                    </View>
                    <ImageBackground
                      source={require('../images/downimage.png')}
                      style={{ height: hp('4.6%'), width: wp('61%'), bottom: 55 }}>
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#000"
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '70%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text4}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>


                    {/* ///////////////////////////////////////////////////////3rd completed///////////////////////////////////////////////// */}

                    <ImageBackground
                      source={require('../images/upimage.png')}
                      style={{ height: hp('4.2%'), width: wp('61%') }}>
                      <TextInput
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '75%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text1}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <ImageBackground
                        source={require('../images/leftimage.png')}
                        style={{ height: hp('13%'), width: wp('16%'), bottom: 28, right: 2, marginTop: 5 }}>
                        <TextInput


                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginTop: 20,
                            right: 6,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text2}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>

                      <View style={{ marginTop: 9 }}>

                        <TextInput
                          placeholder={response.name}
                          placeholderTextColor="#000"
                          scrollEnabled={true}

                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginLeft: 10,

                            color: 'black',
                            width: 70,
                            height: 35,

                          }}
                          multiline={true}
                          value={block1}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setBlock1(text)}

                        />
                      </View>

                      <ImageBackground
                        source={require('../images/rightimage.png')}
                        style={{ height: hp('14%'), width: wp('18.8%'), bottom: 28, left: 11, marginTop: 2 }}>
                        <TextInput
                          // placeholder="Password"
                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            right: 6,
                            marginTop: 25,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text3}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>
                    </View>
                    <ImageBackground
                      source={require('../images/downimage.png')}
                      style={{ height: hp('4.6%'), width: wp('61%'), bottom: 55 }}>
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#000"
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '70%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text4}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>

                    {/* //////////////////////////////////////////4th block completed////////////////////////////////////////////// */}

                    <ImageBackground
                      source={require('../images/upimage.png')}
                      style={{ height: hp('4.2%'), width: wp('61%') }}>
                      <TextInput
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '75%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text1}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                      <ImageBackground
                        source={require('../images/leftimage.png')}
                        style={{ height: hp('13%'), width: wp('16%'), bottom: 28, right: 2, marginTop: 5 }}>
                        <TextInput


                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginTop: 20,
                            right: 6,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text2}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>

                      <View style={{ marginTop: 9 }}>

                        <TextInput
                          placeholder={response.name}
                          placeholderTextColor="#000"
                          scrollEnabled={true}

                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            marginLeft: 10,

                            color: 'black',
                            width: 70,
                            height: 35,

                          }}
                          multiline={true}
                          value={block1}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setBlock1(text)}

                        />
                      </View>

                      <ImageBackground
                        source={require('../images/rightimage.png')}
                        style={{ height: hp('14%'), width: wp('18.8%'), bottom: 28, left: 11, marginTop: 2 }}>
                        <TextInput
                          // placeholder="Password"
                          placeholderTextColor="#000"
                          scrollEnabled={true}
                          textAlign={'center'}
                          style={{
                            fontSize: 13,
                            right: 6,
                            marginTop: 25,
                            color: 'white',
                            width: 70,
                            height: 45,
                          }}
                          multiline={true}
                          value={response.text3}
                          autoCapitalize="none"
                          keyboardType="email-address"
                          onChangeText={text => setResponse(text)}
                        />
                      </ImageBackground>
                    </View>
                    <ImageBackground
                      source={require('../images/downimage.png')}
                      style={{ height: hp('4.6%'), width: wp('61%'), bottom: 55 }}>
                      <TextInput
                        placeholder="Password"
                        placeholderTextColor="#000"
                        textAlign={'center'}
                        scrollEnabled={true}
                        style={{
                          fontSize: 13,
                          marginTop: 10,
                          color: 'white',
                          width: '70%',
                          left: 35,
                        }}
                        multiline={true}
                        value={response.text4}
                        autoCapitalize="none"
                        keyboardType="email-address"
                        onChangeText={text => setResponse(text)}
                      />
                    </ImageBackground>

                    {/* ///////////////////////////////////5th block completed////////////////////////////////////////// */}
                  </View>
                </ScrollView>
                <ImageBackground
                  source={require('../images/upimage.png')}
                  style={{ height: hp('4.2%'), width: wp('61%') }}>
                  <TextInput
                    textAlign={'center'}
                    scrollEnabled={true}
                    style={{
                      fontSize: 13,
                      marginTop: 10,
                      color: 'white',
                      width: '75%',
                      left: 35,
                    }}
                    multiline={true}
                    value={response.text1}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={text => setResponse(text)}
                  />
                </ImageBackground>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', }}>
                  <ImageBackground
                    source={require('../images/leftimage.png')}
                    style={{ height: hp('13%'), width: wp('16%'), bottom: 28, right: 2, marginTop: 5 }}>
                    <TextInput


                      placeholderTextColor="#000"
                      scrollEnabled={true}
                      textAlign={'center'}
                      style={{
                        fontSize: 13,
                        marginTop: 20,
                        right: 6,
                        color: 'white',
                        width: 70,
                        height: 45,
                      }}
                      multiline={true}
                      value={response.text2}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={text => setResponse(text)}
                    />
                  </ImageBackground>

                  <View style={{ marginTop: 9 }}>

                    <TextInput
                      placeholder={response.name}
                      placeholderTextColor="#000"
                      scrollEnabled={true}

                      textAlign={'center'}
                      style={{
                        fontSize: 13,
                        marginLeft: 10,

                        color: 'black',
                        width: 70,
                        height: 35,

                      }}
                      multiline={true}
                      value={block1}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={text => setBlock1(text)}

                    />
                  </View>

                  <ImageBackground
                    source={require('../images/rightimage.png')}
                    style={{ height: hp('14%'), width: wp('18.8%'), bottom: 28, left: 11, marginTop: 2 }}>
                    <TextInput
                      // placeholder="Password"
                      placeholderTextColor="#000"
                      scrollEnabled={true}
                      textAlign={'center'}
                      style={{
                        fontSize: 13,
                        right: 6,
                        marginTop: 25,
                        color: 'white',
                        width: 70,
                        height: 45,
                      }}
                      multiline={true}
                      value={response.text3}
                      autoCapitalize="none"
                      keyboardType="email-address"
                      onChangeText={text => setResponse(text)}
                    />
                  </ImageBackground>
                </View>
                <ImageBackground
                  source={require('../images/downimage.png')}
                  style={{ height: hp('4.6%'), width: wp('61%'), bottom: 55 }}>
                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="#000"
                    textAlign={'center'}
                    scrollEnabled={true}
                    style={{
                      fontSize: 13,
                      marginTop: 10,
                      color: 'white',
                      width: '70%',
                      left: 35,
                    }}
                    multiline={true}
                    value={response.text4}
                    autoCapitalize="none"
                    keyboardType="email-address"
                    onChangeText={text => setResponse(text)}
                  />
                </ImageBackground>






              </View>

            </View>
          </Modal>
          : null
        }


      </View>
    </View>
  );

}

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  // centeredView: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   backgroundColor: 'rgba(0,0,0,0.7)'
  // },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    // alignItems: "center",



    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalView: {

    width: '80%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
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

export default Tazkia