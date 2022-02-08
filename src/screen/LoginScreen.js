

import React, { useState, useRef, useEffect } from 'react';
import { View, KeyboardAvoidingView, TextInput, StyleSheet, Image, ScrollView, Dimensions, ActivityIndicator, Text, SafeAreaView, TouchableWithoutFeedback, ToastAndroid, Keyboard, TouchableOpacity, ShadowPropTypesIOS } from 'react-native';
import IconEmail from 'react-native-vector-icons/MaterialCommunityIcons'
import IconPassword from 'react-native-vector-icons/Entypo'
import Video from "react-native-video";
import Icon from 'react-native-vector-icons/Feather';
import { InputX, Button } from '../components/index';
import AuthManager from '../Api/ApiManager'
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import moment from 'moment';

const { width, height } = Dimensions.get("window");
const videos = require('../videos/login.mp4')

const Login = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [remember, setRemember] = useState('')
  const [borderColor, setBorderColor] = useState('white')
  const [borderColors, setBorderColors] = useState('white')
  const [passwordValue, setPasswordValue] = useState('')
  const [focusP, setFocus] = useState('40%')
  const [buttonLoader, setButtonLoader] = useState(false)


  const inputUserName = useRef();
  const inputPassword = useRef();
  const passwordRef = useRef();

  useEffect(() => {

    setButtonLoader(false)
    const unsubscribe = navigation.addListener('focus', () => {
      setPassword('')
      setEmail('')
      setButtonLoader('')
    });

    return unsubscribe;

  }, [navigation])

  const loginUser = () => {

    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    var validEmail = email.replace(/\s/g, '')
    if (validEmail == '' && password == '') {
      alert("Please fill all fields")
      setBorderColor('red')
      setBorderColors('red')
    }

    else if (validEmail === '') {
      alert("Please enter your email")
      // setBorderColor('red')
    }
    else if (reg.test(validEmail) === false) {

      alert("Please enter valid email")
    }
    else if (password === '') {

      alert("Please enter your password")
    }
    else{
    login()
    }
  };

  const login = async () => {


   
    setButtonLoader(!buttonLoader)
    setBorderColor('white')
    setBorderColors('white')
      setTimeout(() => {
       
        var params = null

        params = {
          "email": email,
          "password": password
        }




        AuthManager.loginUser(params).then(async (response) => {
          console.log("login response-----", response.code)
          if (response.code === 200) {
            setButtonLoader(!buttonLoader)
            await AsyncStorage.setItem('token', response.json.data.auth_token)
            console.log("login token", response.json.data.auth_token)
            getUser()


          } else if (response.code === 0) {
            setButtonLoader(false)
            alert("Email or password is not correct")
            console("=====", response)

          }
        })
      }, 400)

    
  }


  const getUser = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    var data = '';

    axios.post('http://112.196.64.119:8000/api/user/me', data, {
      headers: {
        "auth-token": token
      }
    })
      .then(async (response) => {
        console.log('response user data', response.data)
        await AsyncStorage.setItem('pin', response.data.token)
        var date = moment(response.data.date).format('DD/MM/YYYY')
        global.pin = response.data.token
        global.id = response.data._id
        global.userName = response.data.name
        global.email = response.data.email
        global.password = response.data.password
        global.pin == "null" ? navigation.navigate('CreatePin') : navigation.navigate('PinLogin')
        global.birthday = response.data.birthday
        global.date = date
        global.userId = response.data._id
      })
      .catch((error) => {
        console.log('error', error)
        // dispatch(userUpdateProfileFail())

      })
  }



  const Signup = () => {
    navigation.navigate('Signup')
  }

  const onChangeEmail = (text) => {
    setEmail(text)
    setBorderColor('white')
  }

  const onPasswordChange = (text) => {
    setPassword(text)
    setBorderColors('white')
  }

  const paswwordStatus = () => {
    setPasswordValue(!passwordValue)
  }


  return (
    <SafeAreaView style={styles.container}>

      <Video
        source={videos}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
      />


      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ flex: 1, justifyContent: 'center', marginTop: focusP }}>


          <KeyboardAvoidingView behavior="padding" enabled>
            <Text style={{ fontSize: 22, fontFamily: 'Montserrat-ExtraBold', color: '#fff', alignSelf: 'center', marginBottom: 70 }}> User Login</Text>

            <View style={{ marginLeft: 15, backgroundColor: '#fff', height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, borderRadius: 28, borderColor: borderColor, borderWidth: 1 }}>
              <IconEmail name='email' type='MaterialCommunityIcons' size={15} style={{ marginLeft: 20, }} />

              <TextInput
                onFocus={() => setFocus('20%')}
                placeholder='Email    '
                autoCapitalize='words'
                textAlign={'center'}
                placeholderTextColor='#000'
                style={{
                  flex: 1,
                  marginRight: 30,
                  textAlign:'center',
                  color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
                }} value={email}

                keyboardType='default'
                returnKeyLabel="Done"
                onChangeText={text => onChangeEmail(text)}
                onSubmitEditing={() => {
                  passwordRef.current.focus();
                }}
              />

            </View>


            <View style={{ marginLeft: 15, height: 44, marginTop: 30, alignItems: 'center', flexDirection: 'row', marginRight: 15, backgroundColor: '#fff', borderRadius: 28, borderColor: borderColors, borderWidth: 1 }}>

              <Image source={require('../images/password.png')} style={{ width: 13, height: 16, marginLeft: 20 }} />

              <TextInput
                // autoCapitalize='words'
                textAlign={'center'}
                ref={passwordRef}
                placeholder='Password'
                placeholderTextColor='#000'
                style={{
                  flex: 1,
                  textAlign:'center',
                  color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
                }}
                onChangeText={text => onPasswordChange(text)}
                defaultValue={password}
                secureTextEntry={passwordValue ? false : true}
                returnKeyLabel="done"
                keyboardType='default'
                onSubmitEditing={() => setFocus('40%')}
              />

              <IconPassword onPress={() => paswwordStatus()} name={passwordValue ? 'eye' : 'eye-with-line'} type='Entypo' size={15} style={{ marginRight: 20 }} />


            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <View style={{ flexDirection: 'row', marginTop: 10, marginLeft: 15 }}>
                <Icon name={remember ? 'check-square' : 'square'} color='#FAE9D7' size={16} onPress={() => setRemember(!remember)}></Icon>
                <Text style={{ marginLeft: 8, color: '#fff', fontSize: 11, fontFamily: 'Montserrat-Medium' }}>Remember me</Text>
              </View>

              <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                <Text style={{ marginTop: 10, marginRight: 19, color: '#fff', fontSize: 11, fontFamily: 'Montserrat-Medium', borderBottomWidth: 1, borderBottomColor: '#fff' }}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 45 }} />

            {buttonLoader  ?
              <View style={{ marginLeft: 15, marginRight: 15, height: 44, borderRadius: 28, color: '#000', backgroundColor: 'rgb(250,233,215)' }}>
                <ActivityIndicator size="small" color="#000" style={{ margin: 20 }} />
              </View> :

              <Button
                labelStyle={{ color: "black", padding: 2, fontSize: 15, fontFamily: 'Montserrat-Bold' }}
                dark={true}
                color='rgb(250,233,215)'
                onPress={loginUser}
                label='Login'
              />
            }

            <View style={{ alignSelf: 'center', flexDirection: 'row', marginTop: 20 }}>
              <Text style={{ fontSize: 18, alignSelf: 'center', color: '#FAE9D7', fontSize: 13, fontFamily: 'Montserrat-Medium', }}>New user? </Text>
              <Text onPress={() => Signup()} style={{ fontSize: 18, alignSelf: 'center', color: '#FAE9D7', fontSize: 13, fontFamily: 'Montserrat-Medium', }}>Sign Up</Text>
            </View>

          </KeyboardAvoidingView>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,


  },
  titleStyle: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  textInputStyle: {
    flexDirection: 'row',
    height: 40,
    marginTop: 20,
    marginLeft: 35,
    marginRight: 35,
    margin: 10,
  },
  buttonStyle: {
    backgroundColor: '#51D8C7',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#51D8C7',
    height: 40,
    alignItems: 'center',
    borderRadius: 5,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 30,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  inner: {


    flex: 1,
    justifyContent: 'center'
  },
  header: {
    fontSize: 36,

  },
  textInput: {
    height: 40,
    borderColor: "#000000",
    borderBottomWidth: 1,
    marginBottom: 36
  },
  btnContainer: {
    backgroundColor: "white",
    marginTop: 12
  },
  backgroundVideo: {
    height: height,
    position: "absolute",
    top: 0,
    left: 0,
    alignItems: "stretch",
    bottom: 0,
    right: 0,
    width: width
  }
});

export default Login;