
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, FlatList } from 'react-native';
import Iconback from 'react-native-vector-icons/Entypo';
import MyMood from '../components/MyMood'
import MyAction from '../components/MyAction'
import Conflict from '../components/Conflict'
import AsyncStorage from "@react-native-community/async-storage";
import Header from '../components/header'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { RFValue } from "react-native-responsive-fontsize";

export default class Muhasabah extends Component {

  constructor() {
    super();

    this.state = {
      myMood: true,
      myAction: false,
      conflict: false

    }
  }
  componentDidMount() {
    this.hjhjh()

  }


  hjhjh = async () => {
    // alert(token)
    const token = await AsyncStorage.getItem('token')
    console.log('mood token muhasaaa=============', token);
  }
  mymood = () => {
    this.setState({
      myMood: true,
      myAction: false,
      conflict: false
    });
  }
  myAction = () => {
    this.setState({
      myMood: false,
      myAction: true,
      conflict: false
    });
  }
  Conflict = () => {
    this.setState({
      myMood: false,
      myAction: false,
      conflict: true
    });
  }


  render() {
    const icon = this.props.route.params.icon
    console.log("===>icon", icon)
    return (
      <View style={{ flex: 1, backgroundColor: 'white' }}>

        <Header
          navigation={this.props.navigation}
          pageName="Muhasabah"
          icon={icon}
        />




        <View style={{ flexDirection: "row", justifyContent: 'space-evenly', marginTop: '5%', marginLeft: 10, marginRight: 10 }}>

          <TouchableOpacity onPress={() => this.mymood()} style={{ width: wp('28%'),height: 42, padding: 5, elevation: 5, backgroundColor: this.state.myMood ? '#F5DECD' : "white", alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', color: '#363636' }}>My Mood</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.myAction()} style={{ width: wp('28%'),height: 42, elevation: 5, backgroundColor: this.state.myAction ? '#F5DECD' : "white", padding: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', color: '#363636' }}>Muhasabah</Text>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginBottom: 2, color: '#363636' }}>of My Action</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => this.Conflict()} style={{ width: wp('28%'),height: 42, elevation: 5, backgroundColor: this.state.conflict ? '#F5DECD' : "white", padding: 5, alignItems: 'center', justifyContent: 'center', borderRadius: 6 }}>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold' , color: '#363636'}}>Muhasabah</Text>
            <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginBottom: 2, color: '#363636' }}>of Conflict</Text>
          </TouchableOpacity>
        </View>
        {this.state.myMood == true ?

          <MyMood navigation={this.props.navigation} /> : null}

        {this.state.myAction == true ?

          <MyAction navigation={this.props.navigation} /> : null}

        {this.state.conflict == true ?

          <Conflict navigation={this.props.navigation} /> : null}









      </View>
    )
  }
}