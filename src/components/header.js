
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, } from 'react-native';
import { ImageUrl} from '../Api/ImageUrl'
import Iconback from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
export default class myAction extends Component {

  constructor() {
    super();
    this.state = {
    }
  }
  render() {
      console.log("icon header",`${ImageUrl}${this.props.icon}`)
      const url = ``;
    return (
      <View style={{backgroundColor: '#FAE9D7', height: 45, width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'  }}>
        <TouchableOpacity  onPress={() => this.props.navigation.goBack()}style={{ flexDirection: 'row' , alignItems: 'center'}}>
          <Iconback  name='chevron-left' size={24} color='#000' style={{  marginLeft: 10, }} />
          <Text style={{ fontSize: RFValue(13), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5,  }}>{this.props.pageName}</Text>
        </TouchableOpacity>
        <Image source={{uri: `${ImageUrl}${this.props.icon}`}} style={{ width: 26, height: 26, marginRight: 20 }} />
      </View>      
    )
  }
}

