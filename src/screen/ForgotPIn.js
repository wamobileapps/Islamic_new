import React, { useState } from 'react';
import { View, Text, TextInput, SafeAreaView, ImageBackground, KeyboardAvoidingView, ScrollView, ToastAndroid } from 'react-native';
import IconEmail from 'react-native-vector-icons/MaterialCommunityIcons'
import { InputX, Button } from '../components/index';
import Iconback from 'react-native-vector-icons/SimpleLineIcons';
import AuthManager from '../Api/ApiManager'
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const upImage = require('../images/sign1.png')

function ForgotPin(props) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false);



  const forgotPassword = async () => {
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
    if (email === '') {
      alert("Please enter your email")
    } 
    else if(reg.test(email) === false){

      alert("Please enter valid email")


     }
    else {
      setLoading(true)

      var params = null

      params = {
        "email": email
      }


      console.log(params)

      // axios.post('http://112.196.64.119:8000/api/user/forget_password', params)
      // .then((res)=>{
      //   console.log("res-----", res)
      // })

      AuthManager.forgotPin(params).then(async (response) => {
        console.log("forgot PIn response", response)
        if (response.code === 200) {
            ToastAndroid.show(response.json.data.msg, ToastAndroid.SHORT)
          
          props.navigation.goBack()
        } else {
          console("=====", response)
          setLoading(false)
        }
      })
    }
  }


  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
 <ImageBackground source={upImage} style={{ width: wp('100%'), height: hp('31%'),}}>
        <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', marginTop: '25%', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Forgot</Text>
        <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Pin</Text>

      </ImageBackground>

      <ScrollView style={{ flex: 1 }}>
      <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column',}} behavior="padding" enabled >

        <View style={{ marginTop: "13%", alignItems: "center" }}>
          <Text style={{ fontSize: 13, color: "#8D8D8D", fontFamily: 'Montserrat-Medium', textAlign: 'center' }}>
          Please enter your registered email address </Text>

          <Text style={{ fontSize: 13, color: "#8D8D8D", fontFamily: 'Montserrat-Medium' }}>and we will send you a link to reset </Text>
          <Text style={{ fontSize: 13, color: "#8D8D8D", fontFamily: 'Montserrat-Medium' }}>your Pin</Text>
        </View>

        <View style={{ marginLeft: 15, height: 44, marginTop: 50, alignItems: 'center', elevation: 1, flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', borderRadius: 28 }}>

          <IconEmail name='email' type='MaterialCommunityIcons' size={15} style={{ marginLeft: 20, }} />

          <TextInput placeholder='Email'
          textAlign = {'center'}
            placeholderTextColor='#000'
            style={{
              flex: 1, marginRight: 30,
              color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
            }}            value={email}
            autoCapitalize='none'
            keyboardType='email-address'
            returnKeyLabel="done"
            onChangeText={text => setEmail(text)} />

        </View>


        <View style={{ width: '100%', marginTop: 40, marginBottom: 30 }}>

          <Button
            labelStyle={{ color: "black", fontSize: 15, fontFamily: 'Montserrat-Bold', }}
            dark={true}
            color='rgb(250,233,215)'
            onPress={forgotPassword}
            label='Send'
          />
        </View>
 
 </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  )
}
export default ForgotPin