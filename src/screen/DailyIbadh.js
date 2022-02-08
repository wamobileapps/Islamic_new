import React from 'react'
import { View, Text, Image, StatusBar, Modal, StyleSheet, TouchableOpacity, Dimensions, Platform } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Svg from 'react-native-svg';
import { VictoryChart, VictoryBar, VictoryGroup, VictoryTheme, VictoryAxis } from "victory-native";
import Orientation from 'react-native-orientation';
import Slider from "react-native-slider";
import Header from '../components/header'
import { baseUrl } from '../Api/COntstant';
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Iconback from 'react-native-vector-icons/Entypo';

const windowWidth = Dimensions.get('window').width;


let your_data = []
var arrayOfArrays = [];
var videoData = []
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      externalMutations: undefined,
      dataIbadh: [],
      showModal: '',
      xValue: '',
      yValue: '',
      value: 0,
      cValue: '',
      rate1: 0,
      rate2: 0,
      rate3: 0,
      value1: 0,
      value2: 0,
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    }

    this.onLayout = this.onLayout.bind(this);
    this.focusListener = this.props.navigation.addListener("didFocus", () => {
      this.getDailyIbadhData()
    });
  }

  componentDidMount() {
    // const icon = route.params.icon
    Orientation.lockToLandscapeRight();
    const ibadhId = this.props.route.params.id


    this.getDailyIbadhData()

    Orientation.addOrientationListener(this._orientationDidChange);


  }

  _orientationDidChange = (orientation) => {
    console.log(orientation);
  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });


    // Remember to remove listener
    Orientation.removeOrientationListener(this._orientationDidChange);

  }

  getDailyIbadhData = async (ibadhId) => {

    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    axios.get(baseUrl + `daily_ibadah/list/6139aa33b0a41824d7261060/${global.dateValue}`, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("sdsdfsfsfsfsd", response.data.PrayerListData);

        if (response.data.data.length === 0) {
          response.data.PrayerListData.map((item) => {
            item.options = item.default_options
          })
          console.log("kjkj", response.data.PrayerListData);
          this.setState({ dataIbadh: response.data.PrayerListData })
        }
        else {
          console.log("kjkj", response);
          response.data.PrayerListData.map(function (entry) {


            for (var i = 0; i < response.data.data.length; i++) {
              console.log("iff", entry._id, response.data.data[i].prayer._id);
              if (entry._id === response.data.data[i].prayer._id) {

                entry.options = response.data.data[i].options

                break
              }
              else {


                entry.options = entry.default_options
              }

            }
            // return entry
          })




          this.setState({ dataIbadh: response.data.PrayerListData })
          global.PrayerListData = response.data.PrayerListData

        }
        console.log("===>", response.data.PrayerListData);
      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  removeMutation() {
    this.setState({
      externalMutations: undefined
    });
  }

  clearClicks() {
    this.setState({
      externalMutations: [
        {
          childName: "Bar-1",
          target: ["data"],
          eventKey: "all",
          mutation: () => ({ style: undefined }),
          callback: this.removeMutation.bind(this)
        }
      ]
    });
  }


  getIbadhData = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    axios.get(baseUrl + `daily_ibadah/list/6139aa33b0a41824d7261060/${global.dateValue}`, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("=====> all data====>", response.data.PrayerListData);

        if (response.data.data.length === 0) {
          response.data.PrayerListData.map((item) => {
            item.options = item.default_options
          })
          this.setState({ dataIbadh: response.data.PrayerListData })
        }
        else {
          response.data.PrayerListData.map(function (entry) {


            for (var i = 0; i < response.data.data.length; i++) {
              if (entry._id === response.data.data[i].prayer._id) {

                entry.options = response.data.data[i].options

                break
              }
              else {


                entry.options = entry.default_options
              }

            }
            // return entry
          })




          this.setState({ dataIbadh: response.data.PrayerListData })
          global.PrayerListData = response.data.PrayerListData

        }
      })
      .catch((error) => {
        console.log('error', error)
      })
  }


  updateIbadah = async (item) => {

    const val1 = this.state.value > 0 ? this.state.value : this.state.cValue.options[0].rating
    const val2 = this.state.value1 > 0 ? this.state.value1 : this.state.cValue.options[1].rating
    const val3 = this.state.value2 > 0 ? this.state.value2 : this.state.cValue.options[2].rating
    const token = await AsyncStorage.getItem('token')

    const Total_rating = val1 + val2 + val3
    let params = {


      // {
      "prayer": {
        "_id": item._id
      },
      "type": {
        "_id": item.type
      },
      "options": [{ "prayer": this.state.cValue.options[0].prayer, "rating": this.state.value > 0 ? this.state.value : this.state.cValue.options[0].rating },
      { "prayer": this.state.cValue.options[1].prayer, "rating": this.state.value1 > 0 ? this.state.value1 : this.state.cValue.options[1].rating },
      { "prayer": this.state.cValue.options[2].prayer, "rating": this.state.value2 > 0 ? this.state.value2 : this.state.cValue.options[2].rating }],
      "rating": Total_rating,
      "user_id": global.userId,
      "date": global.dateValue
    }


    console.log("params===>", params, "====", Total_rating, this.state.value2 ? this.state.value2 : this.state.cValue.options[2].rating, this.state.value
    );

    axios.post(baseUrl + `prayer/daily/create`, params, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {

        console.log('daily ibadh  list data 7list===>', response)
        this.setState({ showModal: !this.state.showModal })
        this.getIbadhData()

      })
      .catch((error) => {
        console.log('error', error)
      })

  }

  onLayout(e) {
    this.setState({
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    });
  }

  insert(arr) {
    return [
      ...arr
    ];
  }

  runTask() {
    console.log("fffff::  ", this.state.dataIbadh);
    for (var i = 0; i < this.state.dataIbadh.length; i++) {
      var country = this.state.dataIbadh[i].title;
      var countryArray = [];
      for (var x = 0; x < this.state.dataIbadh[i].options.length; x++) {
        var videoItem = { x: country, y: this.state.dataIbadh[i].options[x].rating }
        countryArray.push(videoItem);
      }

      videoData.push(countryArray);
    }



    your_data = videoData
    console.log("video data", videoData);

    var myarray = [];
    for (var i = 0; i < videoData.length; i++) {
      for (let j = 0; j < videoData.length; j++) {
        myarray.push(videoData[j][i]);
      }

    }


    myarray = myarray.filter(function (element) {
      return element !== undefined;
    });

    var size = videoData.length;
    for (var i = 0; i < myarray.length; i += size) {
      arrayOfArrays.push(myarray.slice(i, i + size));
    }
    console.log("value of i---->", myarray); 
    // videoData.forEach(( index) => {
    //    console.log("jwecx", index);
    // })



  }




  render() {
    const buttonStyle = {
      backgroundColor: "black",
      color: "white",
      padding: "10px",
      marginTop: "10px"
    };


    var allData = []
    this.state.dataIbadh.map((item, index) => {

      item.options.map((i) => {

        allData.push(i.rating)

      })
    })

    this.runTask()




    const your_data = this.state.dataIbadh.map((item, index) => {
      return { x: item.title, y: item.options[0].rating, x0: 100 }
    });
    const your_data1 = this.state.dataIbadh.map((item, index) => {
      return { x: item.title, y: item.options[1].rating, x0: 100 }
    });
    const your_data2 = this.state.dataIbadh.map((item, index) => {
      return { x: item.title, y: item.options[2].rating, x0: 100 }
    });


    console.log("your data", "===", global.windowWidth)

    const icon = this.props.route.params.icon
    console.log("icon daily ibadah===>", icon);
    // console.log("===>icon", arrayOfArrays)


    // allArrayData =()=>{

    //  for (let i = 0; i < arrayOfArrays.length; i++) {
    //    const element = array[index];

    //  }




    //   // {arrayOfArrays.map((item) => {
    //   //               console.log("item---", item);
    //   //               return ( 
    //   //                  <VictoryBar
    //   //                   data={[{x: 'Fajr', y: 2},
    //   //                   {x: 'Fajr', y: 3},
    //   //                    {x: 'Fajr', y: 0}]}
    //   //                 /> 

    //   //                );
    //   //             })
    //   //           }
    // }

    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <StatusBar hidden />
        <View style={{ height: 45, backgroundColor: '#FAE9D7', width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
            <Text style={{ fontSize: RFValue(13), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Daily Ibadah</Text>
          </TouchableOpacity>
          <Image source={{uri: `https://dev.nvinfobase.com/islamic-backend/uploads/icons/headerIcons/${icon}`}} style={{ width: 26, height: 26, marginRight: 20 }} />
        </View>

        {/* <Header
          navigation={this.props.navigation}
          pageName='Daily Ibadah'
          icon={icon}
        /> */}


        <View >




          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: '1%', marginLeft: 60 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
              <View style={{ width: 15, height: 15, borderRadius: 5, backgroundColor: '#BC8A5F', borderWidth: 1, borderColor: '#BC8A5F' }} />
              <Text style={{ marginLeft: 12, fontSize: RFValue(12), fontFamily: 'Montserrat-Medium', }}>Fard</Text>

            </View>

            <View style={{ flexDirection: 'row', marginLeft: 22, alignItems: 'center', }}>
              <View style={{ width: 15, height: 15, borderRadius: 5, backgroundColor: '#E0B385', borderWidth: 1, borderColor: '#E0B385' }} />
              <Text style={{ marginLeft: 12, fontSize: RFValue(12), fontFamily: 'Montserrat-Medium' }}>Sunnah</Text>

            </View>
            <View style={{ flexDirection: 'row', marginLeft: 22, alignItems: 'center', }}>
              <View style={{ width: 15, height: 15, borderRadius: 5, backgroundColor: '#EAC1A3', borderWidth: 1, borderColor: '#EAC1A3' }} />
              <Text style={{ marginLeft: 12, fontSize: RFValue(12), fontFamily: 'Montserrat-Medium' }}>Nafl</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 22, alignItems: 'center', }}>
              <View style={{ width: 15, height: 15, borderRadius: 5, backgroundColor: '#ECB27D', borderWidth: 1, borderColor: '#ECB27D' }} />
              <Text style={{ marginLeft: 12, fontSize: RFValue(12), fontFamily: 'Montserrat-Medium' }}>Witr</Text>
            </View>
            <View style={{ flexDirection: 'row', marginLeft: 22, alignItems: 'center', }}>
              <View style={{ width: 15, height: 15, borderRadius: 5, backgroundColor: '#FAC4A0', borderWidth: 1, borderColor: '#FAC4A0' }} />
              <Text style={{ marginLeft: 12, fontSize: RFValue(12), fontFamily: 'Montserrat-Medium' }}>Tahajjud</Text>
            </View>

            <View style={{ flexDirection: 'row', marginLeft: 22, alignItems: 'center', }}>
              <View style={{ width: 15, height: 15, borderRadius: 5, backgroundColor: '#FED9B8', borderWidth: 1, borderColor: '#FED9B8' }} />
              <Text style={{ marginLeft: 12, fontSize: RFValue(12), fontFamily: 'Montserrat-Medium' }}>Voluntary Salah</Text>
            </View>


          </View>


          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -30 }}>
            <View style={{ height: hp('10%') }}>
              <Text style={{ transform: [{ rotate: '-90deg' }], textAlign: 'center', fontSize: RFValue(12), fontFamily: 'Montserrat-Medium' }} >Khushu Levels</Text>
            </View>
            <Svg style={{ height: "100%", marginLeft: -40, }}>
              <VictoryChart width={global.windowHeight} domain={{ x: [1, 6], y: [0, 5] }} height={global.windowWidth}>
                <VictoryAxis

                  dependentAxis={true}
                  style={{
                    grid: { strokeDasharray: "5", stroke: "#F1D2BC", },
                    ticks: { stroke: 'none' },
                  }}
                />

                <VictoryAxis
                  style={{
                  }} />


                <VictoryGroup scale={{ x: "linear", y: "log" }} offset={20}
                  colorScale={"qualitative"}
                >



                  <VictoryBar
                    barWidth={15}
                    domainPadding={{ x: 30 }}
                    style={{
                      data: { fill: "#BF8B65" }
                    }}
                    events={[{
                      target: "data",
                      eventHandlers: {
                        onPressIn: () => {
                          return [
                            {
                              target: "data",
                              mutation: (props) => {
                                this.setState({ showModal: !this.state.showModal })
                                this.setState({ xValue: this.state.dataIbadh[props.index].title, yValue: this.state.dataIbadh[props.index].options, cValue: this.state.dataIbadh[props.index] })

                                console.log("inside loop props=====>", this.state.dataIbadh[props.index].options);
                                console.log("props=====>", props);
                                const fill = props.style && props.style.fill;
                                // return fill === "black" ? { style: { fill: "green" } } : { style: { fill: "black" } };
                              }
                            }
                          ];
                        }
                      }
                    }]}
                    data={your_data}
                  />

                  <VictoryBar
                    barWidth={15}
                    domainPadding={{ x: 30 }}
                    style={{
                      data: { fill: "#D9A782" }
                    }}
                    events={[{
                      target: "data",
                      eventHandlers: {
                        onPressIn: () => {
                          return [
                            {
                              target: "data",
                              mutation: (props) => {
                                this.setState({ showModal: !this.state.showModal })
                                this.setState({ xValue: this.state.dataIbadh[props.index].title, yValue: this.state.dataIbadh[props.index].options, cValue: this.state.dataIbadh[props.index] })

                                console.log("inside loop props=====>", this.state.dataIbadh[props.index].options);
                                console.log("props=====>", props);
                                const fill = props.style && props.style.fill;
                                // return fill === "black" ? { style: { fill: "green" } } : { style: { fill: "black" } };
                              }
                            }
                          ];
                        }
                      }
                    }]}
                    data={your_data1}
                  />


                  <VictoryBar domainPadding={{ x: 30 }}
                    barWidth={15}
                    style={{
                      data: { fill: "#EAC1A3" }
                    }}
                    events={[{
                      target: "data",
                      eventHandlers: {
                        onPressIn: () => {
                          return [
                            {
                              target: "data",
                              mutation: (props) => {

                                this.setState({ showModal: !this.state.showModal })
                                this.setState({ xValue: this.state.dataIbadh[props.index].title, yValue: this.state.dataIbadh[props.index].options, cValue: this.state.dataIbadh[props.index] })
                                console.log("props=====>", props);

                                const fill = props.style && props.style.fill;
                                // return fill === "black" ? { style: { fill: "green" } } : { style: { fill: "black" } };
                              }
                            }
                          ];
                        }
                      }
                    }]}
                    data={your_data2}
                  />




                </VictoryGroup>
              </VictoryChart>
            </Svg>

          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: -20 }}>
            <Text style={{ marginLeft: 12, fontSize: RFValue(12), fontFamily: 'Montserrat-Medium', marginLeft: '7%' }}>Adhkar</Text>
            <Image source={require('../images/check.png')} style={{ width: 12, height: 13, marginLeft: '4%' }} />

            <Image source={require('../images/check.png')} style={{ width: 12, height: 13, marginLeft: '12%' }} />
            <Image source={require('../images/check.png')} style={{ width: 12, height: 13, marginLeft: '13%' }} />
            <Image source={require('../images/uncheck.png')} style={{ width: 11, height: 11, marginLeft: '12%' }} />
            <Image source={require('../images/check.png')} style={{ width: 12, height: 13, marginLeft: '12%' }} />
          </View>

        </View>

        {this.state.showModal == true ?
          <Modal
            statusBarTranslucent
            animationType="slide"
            transparent={true}
            visible={this.state.showModal}
            onRequestClose={() => {
              Alert.alert("Modal has been closed.");
              this.setState({ showModal: !this.state.showModal });
            }}
          >

            <View style={styles.centeredView}>

              <View style={styles.modalView}>

                <TouchableOpacity onPress={() => this.updateIbadah(this.state.cValue)} style={{ left: '101%', top: -25 }}>
                  <Image source={require('../images/close.png')} style={{ width: 20, height: 20, }} />
                </TouchableOpacity>


                <Text style={styles.modalText}>{this.state.xValue}</Text>

                <View style={{ marginTop: 10 }}>
                  {this.state.cValue.options[0].rating == 0 ? null :
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                      <View>
                        <Slider
                          value={this.state.cValue.options[0].rating}
                          style={{ width: 268 }}
                          onValueChange={value => this.setState({ value: value })}
                          step={1}
                          thumbTintColor='#C68849'
                          thumbTouchSize={{ width: 30, height: 30 }}
                          minimumValue={0}
                          maximumValue={5}
                          minimumTrackTintColor='#C68849'
                          maximumTrackTintColor='#FAE4CD'
                        />
                      </View>


                      <Text style={{ width: 100, marginLeft: 30, fontSize: RFValue(13), fontFamily: 'Montserrat-Medium' }}>{this.state.cValue.options[0].prayer}</Text>

                    </View>
                  }

                  {this.state.cValue.options[1].rating == 0 ? null :
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                      <View>
                        <Slider
                          value={this.state.cValue.options[1].rating}
                          style={{ width: 268 }}
                          onValueChange={value => this.setState({ value1: value })}
                          step={1}
                          thumbTintColor='#C68849'
                          thumbTouchSize={{ width: 30, height: 30 }}
                          minimumValue={0}
                          maximumValue={5}
                          minimumTrackTintColor='#C68849'
                          maximumTrackTintColor='#FAE4CD'
                        />
                      </View>

                      <Text style={{ width: 100, marginLeft: 30, fontSize: RFValue(13), fontFamily: 'Montserrat-Medium' }}>{this.state.cValue.options[1].prayer}</Text>

                    </View>
                  }

                  {this.state.cValue.options[2].rating == 0 ? null :
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                      <View>
                        <Slider
                          value={this.state.cValue.options[2].rating}
                          style={{ width: 268 }}
                          onValueChange={value => this.setState({ value2: value })}
                          step={1}
                          thumbTintColor='#C68849'
                          thumbTouchSize={{ width: 30, height: 30 }}
                          minimumValue={0}
                          maximumValue={5}
                          minimumTrackTintColor='#C68849'
                          maximumTrackTintColor='#FAE4CD'
                        />
                      </View>

                      <Text style={{ width: 100, marginLeft: 30, fontSize: RFValue(13), fontFamily: 'Montserrat-Medium' }}>{this.state.cValue.options[2].prayer}</Text>

                    </View>
                  }

                </View>



              </View>

            </View>
          </Modal>
          : null}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    backgroundColor: 'rgba(0,0,0,0.4)'
  },
  modalView: {
    margin: 20,
    width: 440,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    fontSize: RFValue(15),
    fontFamily: 'Montserrat-Bold',

    textAlign: "center"
  }
});

export default App