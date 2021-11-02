
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
    }
  }

  componentDidMount() {
     updatedArrayX = [];
 updatedArrayY = [];
 updatedArrayZ = [];
    // this.myConflictList()
    this.MyAction()
  }

  myConflictList = async () => {
    const token = await AsyncStorage.getItem('token')
    axios.get(baseUrl+ `myaction/list/${global.dateValue}`, {
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


    axios.get(baseUrl+ `myaction/list/${global.dateValue}`, {
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
          this.setState({ checkExistData: false })
        }
        // console.log(this.state.dataToRenderCircleX);
        else {
          if (this.state.dataToRenderCircleX.filter(e => e.name === item.name).length > 0) {

            const indexx = this.state.dataToRenderCircleX.findIndex(x => x.name === item.name);
            updatedArrayX.splice(indexx, 1);
          }
          else {

            if (this.state.dataToRenderCircleX.length < 3) {

              updatedArrayX.push({ "id": index, "name": item.name })
            }
          }
        }


      } else {

        updatedArrayX.push({ "id": index, "name": item.name })

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
          this.setState({ checkExistDataZ: false })
        }
        // console.log(this.state.dataToRenderCircleX);
        else {
          if (this.state.dataToRenderCircleZ.filter(e => e.name === item.name).length > 0) {

            const indexx = this.state.dataToRenderCircleZ.findIndex(x => x.name === item.name);
            updatedArrayZ.splice(indexx, 1);
          }
          else {

            if (this.state.dataToRenderCircleZ.length < 3) {

              updatedArrayZ.push({ "id": index, "name": item.name })
            }
          }
        }


      } else {

        updatedArrayZ.push({ "id": index, "name": item.name })

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

    });
  }
  CircleZ = () => {
    this.setState({
      circleY: false,
      circleX: false,

      circleZ: true
    });
  }


  renderItem = ({ item, index }) => {

    return (

      <View> 
        {this.state.circleX === true ?
          <TouchableOpacity onPress={() => this.selectItem(item, index)} 
          style={{ width: wp('22%'),  borderRadius: 2,  height: 27, elevation: 1,  marginLeft: '2%', marginTop: 10,
           backgroundColor: this.state.dataToRenderCircleX.filter(e => e.name === item.name).length > 0 ? '#ECCBB2' : "white",
            justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(9),color: '#454545' }}>{item.name}</Text>
          </TouchableOpacity>
          : null}

        {this.state.circleY === true ?
           <TouchableOpacity onPress={() => this.selectItem(item, index)} 
           style={{ width: wp('22%'),  borderRadius: 2,  height: 27, elevation: 1,  marginLeft: '2%', marginTop: 10,
            backgroundColor: this.state.dataToRenderCircleY.filter(e => e.name === item.name).length > 0 ? '#ECCBB2' : "white",
             justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(9),color: '#454545' }}>{item.name}</Text>
           </TouchableOpacity>
        : null}
        {this.state.circleZ === true ?
           <TouchableOpacity onPress={() => this.selectItem(item, index)} 
           style={{ width: wp('22%'),  borderRadius: 2,  height: 27, elevation: 1,  marginLeft: '2%', marginTop: 10,
            backgroundColor: this.state.dataToRenderCircleZ.filter(e => e.name === item.name).length > 0 ? '#ECCBB2' : "white",
             justifyContent: 'center', alignItems: 'center' }}>
               <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(9),color: '#454545' }}>{item.name}</Text>
           </TouchableOpacity>
            : null
        }
      </View>
    )

  }


  render() {
    var bgColor = this.state.circleZ ? 'rgba(222,184,145,1)' : "rgba(255,255,255,0.6)"
    return (

      <View style={{ flex: 1, backgroundColor: 'white', }}>

        <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '6%' }}>
          <View style={{ flexDirection: 'row', marginLeft: 40, marginRight: 30, }}>

            <TouchableOpacity disabled={this.state.circleY != '' && this.state.circleZ != '' ? false : true} onPress={() => this.CircleX()}
              style={{
                width: wp('46%'), height: wp('46%'), borderRadius: 100, marginLeft: 20,  backgroundColor: this.state.circleX ? 'rgba(222,184,145,1)' : "rgba(255,255,255,0.6)",
                borderWidth: 2, borderColor: this.state.circleX ? 'rgba(248,233,218,0.4)' :'rgba(222,184,145,0.3)' , zindex: 1,
              }}>
              <Text style={{ textAlign: "center", marginTop: 15, fontFamily: "Montserrat-Bold", fontSize: RFValue(12), color: '#454545' }}>How I Feel</Text>
              <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(12), marginBottom: 10, color: '#454545' }}>About MY Action</Text>




              {this.state.dataToRenderCircleX.map((item) => {
                return (

                  <View pointerEvents={this.state.circleY != '' && this.state.circleZ != '' ? 'auto' : 'none'} style={{ flexDirection: "column", justifyContent: "center", marginTop: 6, alignItems: 'center' }}>

                    <View style={{  borderColor: this.state.dataToRenderCircleX.length == 3 ? "#DFAF8C" : "#DFAF8C", width: wp('22%'), borderRadius: 8, backgroundColor: '#F9F1EB', 
                    elevation: 2, borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{  fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold',color: '#454545' }}>{item.name}</Text>

                    </View>
                  </View>
                )
              })}
            </TouchableOpacity>

            <View>
              <TouchableOpacity delayPressIn={150} disabled={this.state.dataToRenderCircleX.length == 3  && this.state.circleZ == false ? false : true} onPress={() => this.CircleY()}
                style={{
                  width: wp('46%'), height: wp('46%'), borderRadius: 100, right: 30, backgroundColor: this.state.circleY ? 'rgba(222,184,145,1)' : "rgba(255,255,255,0.6)", zindex: 1,
                  borderWidth: 2, borderColor: this.state.circleY ? 'rgba(248,233,218,0.4)' :'rgba(222,184,145,0.3)' ,
                }}>
                <Text style={{ textAlign: "center", marginTop: 8, fontFamily: "Montserrat-Bold", fontSize: RFValue(12), color: '#454545' }}>How The </Text>
                <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(12), color: '#454545'}}>Prosecutor</Text>
                <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(12), color: '#454545' }}>Within Me Feels</Text>


                {this.state.dataToRenderCircleY.map((item) => {
                  return (

                    <View pointerEvents={this.state.dataToRenderCircleX.length == 3 && this.state.circleZ == false ? 'auto' : 'none'} style={{ flexDirection: "column", justifyContent: "space-evenly", marginTop: 6 }}>

                      <View style={{  width: wp('22%'), borderColor: this.state.dataToRenderCircleY.length == 3 ? "#DFAF8C" : "#DFAF8C",
                       borderWidth: 1, alignSelf: 'center', justifyContent: 'center' ,borderRadius: 8, backgroundColor: '#F9F1EB', elevation: 2 }}>
                        <Text style={{ textAlign: "center", fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold',color: '#454545' }}>{item.name}</Text>

                      </View>
                    </View>
                  )
                })}
              </TouchableOpacity>
            </View>
          </View>
          <View>
            <TouchableOpacity delayPressIn={150} disabled={this.state.dataToRenderCircleY.length == 3 ? false : true} 
            onPress={() => this.CircleZ()} 
            style={{ width: wp('46%'), height: wp('46%'), borderRadius: 100, bottom: 50, backgroundColor: bgColor, borderWidth: 2, borderColor: this.state.circleZ ? 'rgba(248,233,218,0.4)' :'rgba(222,184,145,0.3)' , zindex: 1, }}>
              <Text style={{ textAlign: "center", marginTop: 20, fontFamily: "Montserrat-Bold", fontSize: RFValue(12), color: '#454545'  }}>How The Judge</Text>
              <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(12), color: '#454545' }}>Within Me feels</Text>


              {this.state.dataToRenderCircleZ.map((item) => {
                return (

                  <View pointerEvents={this.state.circleY != '' && this.state.circleX != '' ? 'auto' : 'none'} style={{ flexDirection: "column", justifyContent: "space-evenly", marginTop: 5 }}>

                    <View style={{ width: wp('22%') , borderColor: this.state.dataToRenderCircleY.length == 3 ? "#DFAF8C" : "#DFAF8C",
                       borderWidth: 1, alignSelf: 'center', justifyContent: 'center' , borderRadius: 8, alignSelf: "center", backgroundColor: '#F9F1EB', elevation: 2 }}>
                      <Text style={{ textAlign: "center", fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold',color: '#454545' }}>{item.name}</Text>

                    </View>
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
              style={{  marginBottom: 0}}
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

