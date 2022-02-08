
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, FlatList } from 'react-native';
import Iconback from 'react-native-vector-icons/Entypo';
var updatedArrayX = [];
var updatedArrayY = [];
var updatedArrayZ = [];
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { baseUrl } from '../Api/COntstant';
import { RFValue } from "react-native-responsive-fontsize";

const updatedArrayIndex = []
const allahFeelingIndex = []
export default class Conflict extends Component {

  constructor() {
    super();

    this.state = {
      dataToRenderCircleX: [],
      dataToRenderCircleY: [],
      dataToRenderCircleZ: [],
      List: [


      ],
      circleX: true,
      circleY: false,
      circleZ: false,
      selectText: false,
      checkExistData: false,
      checkExistDataY: false,
      checkExistDataZ: false,
      name: '',
      borderColor: '#DFAF8C'

    }
  }

  componentDidMount() {
    updatedArrayX = [];
    updatedArrayY = [];
    updatedArrayZ = [];
    this.MyAction()
  }

  myConflictList = async () => {
    const token = await AsyncStorage.getItem('token')
    axios.get(baseUrl + `myconflict/list/${global.dateValue}`, {
      headers: {
        "auth-token": token
      }
    })
      .then((response) => {
        console.log('response==================== conflict', response.data.data[0].data[0].myfeeling)

        this.setState({ dataToRenderCircleX: response.data.data[0].data[0].myfeeling })
        this.setState({ dataToRenderCircleY: response.data.data[0].data[0].user_feeling })
        this.setState({ dataToRenderCircleZ: response.data.data[0].data[0].allah_feeling })
        if (this.state.dataToRenderCircleX.length > 0) {
          this.setState({ checkExistData: true })
        }
        // this.setState({ work: response.data.data[0].work })
        // this.setState({ user_mood: response.data.data[0].user_mood })


      })
      .catch((error) => {
        console.log('error', error)
      })
  }

  MyAction = async () => {

    const token = await AsyncStorage.getItem('token')
    console.log('Action token=============', token);


    axios.get(baseUrl + `myconflict/list/${global.dateValue}`, {
      headers: {
        "auth-token": token
      }
    })
      .then((response) => {
        console.log('response====================', response.data.moodList)
        this.setState({
          List: response.data.moodList
        });



      })
      .catch((error) => {
        console.log('error', error)
        // dispatch(userUpdateProfileFail())

      })
  }




  selectItem = (item, index) => {

    if (this.state.circleX == true) {
      if (this.state.dataToRenderCircleX.length > 0) {

        if (this.state.checkExistData === true) {

          this.setState({ dataToRenderCircleX: [] })
          console.log("exist: ", this.state.dataToRenderCircleX);
          updatedArrayX.push({ "id": index, "name": item.name })
          updatedArrayIndex.push(item._id)
          this.setState({ checkExistData: false })
        }
        // console.log(this.state.dataToRenderCircleX);
        else {
          if (this.state.dataToRenderCircleX.filter(e => e.name === item.name).length > 0) {

            const indexx = this.state.dataToRenderCircleX.findIndex(x => x.name === item.name);
            updatedArrayX.splice(indexx, 1);
            updatedArrayIndex.splice(indexx, 1);
          }
          else {

            if (this.state.dataToRenderCircleX.length < 3) {

              updatedArrayX.push({ "id": index, "name": item.name })
              updatedArrayIndex.push(item._id)
            }
          }
        }


      } else {

        updatedArrayX.push({ "id": index, "name": item.name })
        updatedArrayIndex.push(item._id)
      }
    }

    else if (this.state.circleY == true) {

      if (this.state.dataToRenderCircleY.length > 0) {
        if (this.state.checkExistDataY === true) {

          this.setState({ dataToRenderCircleY: [] })
          console.log("exist: ", this.state.dataToRenderCircleY);
          updatedArrayY.push({ "id": index, "name": item.name })
          this.setState({ checkExistDataY: false })
        }
        // console.log(this.state.dataToRenderCircleX);
        else {
          if (this.state.dataToRenderCircleY.filter(e => e.name === item.name).length > 0) {

            const indexx = this.state.dataToRenderCircleY.findIndex(x => x.name === item.name);
            updatedArrayY.splice(indexx, 1);
          }
          else {

            if (this.state.dataToRenderCircleY.length < 3) {

              updatedArrayY.push({ "id": index, "name": item.name })
            }
          }
        }


      } else {

        updatedArrayY.push({ "id": index, "name": item.name })

      }
    }

    else if (this.state.circleZ == true) {



      if (this.state.dataToRenderCircleZ.length > 0) {
        if (this.state.checkExistDataZ === true) {

          this.setState({ dataToRenderCircleZ: [] })
          console.log("exist: ", this.state.dataToRenderCircleZ);
          updatedArrayZ.push({ "id": index, "name": item.name })
          allahFeelingIndex.push(item._id)
          this.setState({ checkExistDataZ: false })
        }
        // console.log(this.state.dataToRenderCircleX);
        else {
          if (this.state.dataToRenderCircleZ.filter(e => e.name === item.name).length > 0) {

            const indexx = this.state.dataToRenderCircleZ.findIndex(x => x.name === item.name);
            updatedArrayZ.splice(indexx, 1);
            allahFeelingIndex.splice(indexx, 1);
          }
          else {

            if (this.state.dataToRenderCircleZ.length < 3) {

              updatedArrayZ.push({ "id": index, "name": item.name })
              allahFeelingIndex.push(item._id)
            }
          }
        }


      } else {

        updatedArrayZ.push({ "id": index, "name": item.name })
        allahFeelingIndex.push(item._id)
      }








    }


    this.setState({
      // dataToRenderCircleX: true,
      dataToRenderCircleX: updatedArrayX
    });


    this.setState({
      // dataToRenderCircleX: true,
      dataToRenderCircleY: updatedArrayY
    });

    this.setState({
      // dataToRenderCircleX: true,
      dataToRenderCircleZ: updatedArrayZ
    });

    if (this.state.dataToRenderCircleZ.length == 3) {
      // alert("y")
      this.submitAPi()
    }

  };



  CircleX = () => {
    this.setState({
      circleX: true,
      circleY: false,
      circleZ: false,
    });
  }
  CircleY = () => {
    this.setState({
      circleX: false,
      circleY: true,
      circleZ: false,
      borderColor: 'white'
    });
  }
  CircleZ = () => {
    this.setState({
      circleY: false,
      circleX: false,
      borderColor: '#DFAF8C',
      circleZ: true
    });
  }


  submitAPi = async () => {
    if (updatedArrayZ.length == 3 && this.state.name != '' && updatedArrayX.length == 3) {


      const token = await AsyncStorage.getItem('token')

      let params = {
        "myfeeling": updatedArrayIndex,
        "allah_feeling": allahFeelingIndex,
        "rating": 14,
        "date": global.dateValue,
        "user_id": global.userId,
        "person_name": this.state.name
      }






      console.log("====>params", params);


      axios.post(`http://112.196.64.119:8000/api/user/conflict/daily/create/`, params, {
        headers: {
          'auth-token': token
        }
      })
        .then((response) => {

          console.log('====>mood list updated data', response)


        })
        .catch((error) => {
          console.log('error', error)
        })
    }
    else {
      alert("err")
    }

  }


  renderItem = ({ item, index }) => {

    return (

      <View>
        {this.state.circleX === true ?

          <TouchableOpacity onPress={() => this.selectItem(item, index)} style={{ width: wp('22%'), borderRadius: 2, height: 27, elevation: 1, marginLeft: '2%', marginTop: 10, backgroundColor: this.state.dataToRenderCircleX.filter(e => e.name === item.name).length > 0 ? '#ECCBB2' : "white", justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(9), color: '#454545' }}>{item.name}</Text>
          </TouchableOpacity>

          : null}

        {this.state.circleY === true ?

          <TouchableOpacity onPress={() => this.selectItem(item, index)} style={{ width: wp('22%'), borderRadius: 2, height: 27, elevation: 1, marginLeft: '2%', marginTop: 10, backgroundColor: this.state.dataToRenderCircleY.filter(e => e.name === item.name).length > 0 ? '#ECCBB2' : "white", justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(9), color: '#454545' }}>{item.name}</Text>
          </TouchableOpacity>

          : null
        }
        {this.state.circleZ === true ?
          <TouchableOpacity onPress={() => this.selectItem(item, index)} style={{ width: wp('22%'), borderRadius: 2, height: 27, elevation: 1, marginLeft: '2%', marginTop: 10, backgroundColor: this.state.dataToRenderCircleZ.filter(e => e.name === item.name).length > 0 ? '#ECCBB2' : "white", justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(9), color: '#454545' }}>{item.name}</Text>
          </TouchableOpacity>
          : null
        }
      </View>
    )

  }


  render() {
    return (

      <View style={{ flex: 1, backgroundColor: 'white', }}>


        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '6%', marginLeft: 20, marginRight: 20 }}>
          <View style={{ flexDirection: 'row', }}>

            <TouchableOpacity disabled={this.state.circleY != '' && this.state.circleZ != '' ? false : true} onPress={() => this.CircleX()}
              style={{
                width: wp('46%'), height: wp('46%'), borderRadius: 100, marginLeft: 20, backgroundColor: this.state.circleX ? 'rgba(222,184,145,1)' : "rgba(255,255,255,0.6)",
                borderWidth: 2, borderColor: this.state.circleX ? 'rgba(248,233,218,0.4)' : 'rgba(222,184,145,0.3)', zindex: 1,
              }}>
              <Text style={{ textAlign: "center", marginTop: 15, fontFamily: "Montserrat-Bold", fontSize: RFValue(12), marginBottom: 10, color: '#454545' }}>How I Feel</Text>



              {this.state.dataToRenderCircleX.map((item) => {
                return (

                  <View style={{ flexDirection: "column", justifyContent: "center", marginTop: 5,  alignItems: 'center' }}>
                       <View style={{ height: 15, width: wp('20%'), borderColor: "black", borderRadius: 8, alignItems: "center", justifyContent: 'center', backgroundColor: '#F9F1EB', elevation: 2 }}>
                            <Text style={{ textAlign: "center", fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold', color: '#454545' }}>{item.name}</Text>

                        </View>
                    {/* <View style={{
                      width: wp('22%'), borderColor: this.state.dataToRenderCircleX.length == 3 ? "#DFAF8C" : "#DFAF8C",
                      borderWidth: 1, alignSelf: 'center', justifyContent: 'center', borderRadius: 8, alignSelf: "center", backgroundColor: '#F9F1EB', elevation: 2
                    }}>
                      <Text style={{ textAlign: "center", fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold', color: '#454545' }}>{item.name}</Text>

                    </View> */}
                  </View>
                )
              })}
            </TouchableOpacity>

            <View>
              <TouchableOpacity delayPressIn={150} disabled={this.state.dataToRenderCircleX.length == 3 && this.state.circleZ == false ? false : true} onPress={() => this.CircleY()}
                style={{
                  width: wp('46%'), height: wp('46%'), borderRadius: 100, right: 30, backgroundColor: this.state.circleY ? 'rgba(222,184,145,1)' : "rgba(255,255,255,0.6)", zindex: 1,
                  borderWidth: 2, borderColor: this.state.circleY ? 'rgba(248,233,218,0.4)' : 'rgba(222,184,145,0.3)',
                }}>
                <Text style={{ textAlign: "center", marginTop: 15, fontFamily: "Montserrat-Bold", fontSize: RFValue(12), color: '#454545' }}>How Does </Text>

                <View style={{ height: hp('5%'), width: wp('45%'), alignSelf: "center", marginTop: '-3%', }}>

                  <TextInput
                    editable={this.state.dataToRenderCircleX.length == 3 && this.state.circleZ == false ? true : false}
                    placeholder=" enter name "
                    autoCapitalize='words'
                    // placeholderTextColor='#a9a9a9'
                    style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Medium', color: '#000' }}
                    value={this.state.name}
                    multiline={true}
                    textAlign="center"
                    keyboardType='email-address'
                    returnKeyLabel="next"
                    onChangeText={(text) => this.setState({ name: text })}
                    onFocus={() => this.CircleY()}
                  />

                </View>


                <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(12), marginTop: -10, color: '#454545' }}>Feel</Text>


                {/* {this.state.dataToRenderCircleY.map((item) => {
                  return (

                    <View style={{ flexDirection: "column", justifyContent: "space-evenly", marginTop: 5 }}>

                      <View style={{ width: wp('22%'), borderColor: this.state.dataToRenderCircleY.length == 3 ? "#DFAF8C" : "#DFAF8C",
                       borderWidth: 1, alignSelf: 'center', justifyContent: 'center' , borderRadius: 8, alignSelf: "center", backgroundColor: '#F9F1EB', elevation: 2 }}>
                        <Text style={{ textAlign: "center", fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold',color: '#454545' }}>{item.name}</Text>

                      </View>
                    </View>
                  )
                })} */}
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity delayPressIn={150} disabled={this.state.name != '' ? false : true}
              onPress={() => this.CircleZ()}
              style={{ width: wp('46%'), height: wp('46%'), borderRadius: 100, bottom: 50, backgroundColor: this.state.circleZ ? 'rgba(222,184,145,1)' : "rgba(255,255,255,0.6)", borderWidth: 2, borderColor: this.state.circleZ ? 'rgba(248,233,218,0.4)' : 'rgba(222,184,145,0.3)', zindex: 1, }}>
              <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(12), marginTop: 20, color: '#454545' }}>How Do I  Feel</Text>
              <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(12), marginBottom: 5, color: '#454545' }}>With Allah</Text>


              {this.state.dataToRenderCircleZ.map((item) => {
                return (

                  <View style={{ flexDirection: "column", justifyContent: "center", alignItems: 'center', marginTop: 5 }}>
<View style={{ height: 15, width: wp('20%'), borderColor: "black", borderRadius: 8, alignItems: "center", justifyContent: 'center', backgroundColor: '#F9F1EB', elevation: 2 }}>
                            <Text style={{ textAlign: "center", fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold', color: '#454545' }}>{item.name}</Text>

                        </View>
                    {/* <View style={{
                      width: wp('22%'), borderColor: this.state.dataToRenderCircleY.length == 3 ? "#DFAF8C" : "#DFAF8C",
                      borderWidth: 1, alignSelf: 'center', justifyContent: 'center', borderRadius: 8, alignSelf: "center", backgroundColor: '#F9F1EB', elevation: 2
                    }}>
                      <Text style={{ textAlign: "center", fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold', color: '#454545' }}>{item.name}</Text>

                    </View> */}
                  </View>
                )
              })}
            </TouchableOpacity>
          </View>
        </View>



        <ScrollView style={{ flex: 1, marginBottom: 5, marginLeft: '2%', marginRight: '2%', marginTop: -30 }}>
          <View>
            <FlatList
              data={this.state.List}
              renderItem={(item, index) => this.renderItem(item, index)}
              style={{ marginBottom: 0 }}
              // contentContainerStyle={{alignItems: "center",}}
              keyExtractor={item => item.id}
              numColumns={4}
              key={4}

            />
          </View>
        </ScrollView>






      </View>

    )
  }

}

