import React from 'react'
import { View, Text, Image, StatusBar, Modal, StyleSheet, TouchableOpacity, Dimensions, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Header from '../components/header'
import HTMLView from 'react-native-htmlview';
import Iconback from 'react-native-vector-icons/Entypo';
import { baseUrl } from '../Api/COntstant';
import { RFValue } from 'react-native-responsive-fontsize';

class Nafz extends React.Component {
  constructor() {
    super();
    this.state = {
      nafsData: []
    }


  }

  componentDidMount() {
    this.getnafsdata()
  }


  async getnafsdata() {
    const token = await AsyncStorage.getItem('token')
    axios.get(baseUrl+ 'nafs/view/6151bd954031a145006804bf', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log('response====================', response.data.data)

        this.setState({ nafsData: response.data.data })
      })
      .catch((error) => {
        console.log('error', error)
      })
  }




  render() {
    const htmlContent = this.state.nafsData.description
    const webViewStyle = StyleSheet.create({ b: { color:"#454545", fontSize: 13, fontFamily: 'Montserrat-Bold' }, p: { color:"#454545", fontSize: 10, fontFamily: 'Montserrat-Regular' } });

    return (
      <View style={{ flex: 1 , backgroundColor: 'white', }}>
        <StatusBar hidden />

        <View style={{backgroundColor: '#FAE9D7', height: 45, width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'  }}>
       
        <TouchableOpacity  onPress={() => this.props.navigation.goBack()}style={{ flexDirection: 'row' , alignItems: 'center'}}>
          <Iconback  name='chevron-left' size={24} color='#000' style={{  marginLeft: 10, }} />
          <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5,  }}>Nafs</Text>
        </TouchableOpacity>
        <Image source={require('../images/nafs.png')} style={{ width: 26, height: 26, marginRight: 20 }} />
      </View>

  
        <View style={{ flex: 1, backgroundColor: 'white', marginLeft: 20, marginRight: 20, marginTop: 40, marginBottom: 40 }}>
          {/* <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Bold' }}>{this.state.nafsData.name}</Text> */}
          <HTMLView
              value={htmlContent}
              stylesheet={webViewStyle}
            />
        </View>

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

});

export default Nafz