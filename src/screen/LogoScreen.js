import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import moment from 'moment';
const bg = require('../images/bg.png')



const Logo = (props) => {
  const [token, setToken] = useState('')
  const [text, setText] = useState('false')

  useEffect(async () => {

    getProfile()
    const value = await AsyncStorage.getItem('token')
    console.log("TOKEN====", global.tokenVal)


    setTimeout(() => {
      if (value) {
        console.log("if")
        if (value === '') {
          console.log(" if--")
          props.navigation.navigate("Login")
        } else {
          console.log("else if", token)
          global.token = value

          if (token === "null") {
            props.navigation.navigate("Login")
          } else {
            props.navigation.navigate("PinLogin")
          }
        }
      } else {
        console.log("else")
        props.navigation.navigate("Login")
      }

    }, 1000)

  })


  const getProfile = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    var data = '';



    axios.post('http://112.196.64.119:8000/api/user/me', data, {
      headers: {
        "auth-token": token
      }
    })
      .then((response) => {
        console.log('response', response.data)
        setToken(response.data.token)
        var date = moment(response.data.date).format('DD/MM/YYYY')
        console.log('date======>', date)
        global.pin = response.data.token
        global.id = response.data._id
        global.userName = response.data.name
        global.email = response.data.email
        global.password = response.data.password
        global.date = date
        global.birthday = response.data.birthday
        global.userId = response.data._id

      })
      .catch((error) => {
        console.log('error', error)
        // dispatch(userUpdateProfileFail())

      })


  }



  return (
    <View style={{ flex: 1, justifyContent: 'center', backgroundColor: 'white', alignItems: 'center' }}>

      <View style={{
        width: '70%', padding: 30, borderRadius: 20, backgroundColor: '#fff', sshadowColor: "#000", borderWidth: 1, borderColor: '#d9d9d9',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 4,
      }}>
        <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'Montserrat-Medium' }}>Wi-Islam</Text>
        <ActivityIndicator size="small" color="#000" style={{ margin: 20 }} />
        {/* <Text style={{ textAlign: 'center', fontSize: 14, fontFamily: 'Montserrat-Medium' }}>{text}</Text> */}


        <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Montserrat-Medium' }}>Please wait...</Text>



      </View>

    </View>

  )

}

export default Logo