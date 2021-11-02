import React, { Component, useState, useRef } from 'react';
import { View, Text, CheckBox, TouchableHighlight, TouchableOpacity, Modal, Image, ScrollView, StyleSheet, ToastAndroid, ImageBackground, KeyboardAvoidingView, TextInput, ActivityIndicator } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconDown from 'react-native-vector-icons/FontAwesome'
import IconGender from 'react-native-vector-icons/FontAwesome'
import IconUser from 'react-native-vector-icons/FontAwesome'
import IconEmail from 'react-native-vector-icons/MaterialCommunityIcons'
import IconPassword from 'react-native-vector-icons/Entypo'
import IconBirth from 'react-native-vector-icons/MaterialIcons'
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import DatePicker from 'react-native-datepicker';
import showToast from '../components/toast';


import { InputX, Button } from '../components/index';
import moment from 'moment';

import AuthManager from '../Api/ApiManager'


const upImage = require('../images/sign1.png')

const Signup = (props) => {
  const [firstName, setFirstName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [datee, setDatee] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [gender, setGender] = useState('Gender');
  const [loading, setLoading] = useState(false);
  const [passwordValue, setPasswordValue] = useState('')
  const [confirmPasswordValue, setconfirmPasswordValue] = useState('')
  const [buttonLoader, setButtonLoader] = useState('')

  const passwordRef = useRef();
  const [checked, setChecked] = React.useState('Male');


  const setDragGenderr = () => {
    setVisible(!visible)
    // alert(dragGender)
  }

  const Data = [{
    name: 'Male',
    id: 0
  },
  {
    name: 'Female',
    id: 1
  }]


  const loginUser = () => {

    props.navigation.navigate('Login')



  };

  const signuUser = () => {
    
    console.log(username, password, confirmPassword, firstName, gender, datee)
    var validEmail = email.replace(/\s/g, '')
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (username == '' && password == '' && email == '' && confirmPassword == '' && firstName == '' && datee == '' ) {
      alert('All fields are mandatory, try again !');
      return
    }

    else if (firstName.length > 25) {
      alert(" First name should not be 25 character")
    }
    else if (firstName == '') {
      alert("Please enter your name")
    }

    else if(gender != 'Male' && gender != 'Female'){
      alert("Please enter your gender")
    }

    else if (validEmail == '') {
      alert("Please enter your email")
    } 
    else if(reg.test(validEmail) === false){

      alert("Please enter valid email")


     }
    
     else if (password.length < 6) {
      alert("password must be 6 character ")
    }
    else if (password !== confirmPassword) {
      alert("Password does not match")
      return
    }
    else if(password.includes(' ') && confirmPassword.includes(' ')){
       alert("Password should not contain any space ")
     }
    else if(datee == ''){
      alert("Please enter you Date Of Birth")
    }
    
     

     else {
      signup()
     }



  }

  const signup = () => {

    
    setButtonLoader(!buttonLoader)
    setLoading(true)

    setTimeout(()=>{

   

    var params = null

    params = {
      "name": firstName,
      "email": email,
      "gender": gender,
      "mobile_number": "79874654655",
      "password": password,
      "birthday": datee,
      "user_role":"user"
    }
  console.log("params------->", params)
      

    AuthManager.registerUser(params).then(async (response) => {
     
      console.log("register response", response.json.data)
      if (response.code === 200) {
       
        global.pin = ''
        if(response.json.data.msg == 'Email already Exists')
        {
          setButtonLoader(false)
          alert(response.json.data.msg)
        }
        else{
          setButtonLoader(!buttonLoader)
        ToastAndroid.show("User Registered Successfully", ToastAndroid.SHORT)

        props.navigation.navigate('Login')
        }
      } else {
        setButtonLoader(!buttonLoader)
        console("=====", response)
        setLoading(false)
      }
    })
  }, 500 
  )

  }



  const selectItem = (item) => {
    setGender(item.name)
    setVisible(false)

  }

  const dateChange = (date) => {
    setDatee(date);


  }

  const returnOk = () => {
    setGender(checked)
    setVisible(!visible)
  }

  const paswwordStatus = () => {
    setPasswordValue(!passwordValue)
  }

  const confirmPaswwordStatus = () => {
    setconfirmPasswordValue(!confirmPasswordValue)
  }

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>

      <ImageBackground source={upImage} style={{ width: wp('100%'), height: hp('31%'), }}>

        <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', marginTop: '25%', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Create Your</Text>
        <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Account</Text>

      </ImageBackground>
      {/* <View style={{ height: 200, backgroundColor: 'rgb(250,233,215)', borderBottomLeftRadius: 50, borderBottomRightRadius: 50 }}>
       

      </View> */}


      <ScrollView style={{}}>
        <KeyboardAvoidingView style={{  }} behavior="padding" enabled >


          <View style={{
            marginLeft: 15, height: 44, marginTop: 50, flexDirection: 'row',
            marginRight: 15, elevation: 3, backgroundColor: '#fff', borderRadius: 28,
            alignItems: 'center'
          }}>

            <IconUser name='user' type='MaterialCommunityIcons' size={15} style={{ marginLeft: 20, }} />

            <TextInput placeholder='First Name'
              // textAlign={'center'}
              autoCapitalize='words'
              placeholderTextColor='#000'
              style={{
                flex: 1,
                paddingTop: 10,
                paddingRight: 20,
                paddingBottom: 10,
                paddingLeft: 50,
                color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium'
              }}
              value={firstName}
              keyboardType='email-address'
              returnKeyLabel='done'
              onChangeText={text => setFirstName(text)} />

          </View>


          {/* <InputX
            label="First Name"
            ref={firstUserName}
            style={{ backgroundColor: '#fff', textAlign: 'center' }}
            autoCapitalize="none"
            returnKeyType={'next'}
            onChangeText={text =>
              setFirstName(text)
            }
            value={firstName}
          /> */}

          

          <TouchableOpacity  onPress={() => setDragGenderr()} style={{ marginLeft: 14, justifyContent: 'space-between',
           height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 3, shadowColor: '#000000',
           backgroundColor: '#fff', borderRadius: 28 }}>

            <View style={{ flexDirection: 'row', marginLeft: 20, }}>
              <Image source={require('../images/gender.png')} style={{width: 20, height: 17}}/>

              <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', textAlign: 'center', paddingLeft: 50 }}>{gender}</Text>
            </View>

            <IconDown onPress={() => setDragGenderr()}  name='chevron-down' type='Entypo' size={15} style={{ marginRight: 20 }} />


          </TouchableOpacity>




          <View style={{ marginLeft: 14, height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 3, backgroundColor: '#fff', borderRadius: 28 }}>

            <IconEmail name='email' type='MaterialCommunityIcons' size={15} style={{ marginLeft: 20, }} />

            <TextInput placeholder='Email'
              autoCapitalize='words'
              placeholderTextColor='#000'
              style={{
                flex: 1,
                paddingTop: 10,
                paddingRight: 20,
                paddingBottom: 10,
                paddingLeft: 48,
                color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
              }}
              value={email}
              keyboardType='default'
              returnKeyLabel='done'
              onChangeText={text => setEmail(text)} />

          </View>

          {visible == false ?
            null :




            <Modal
              animationType='fade'
              transparent={true}
              visible={visible}
              onRequestClose={() => {
                // Alert.alert("Modal has been closed.");
                // setModalVisible(!visible);
              }}
            >
              <View style={styles.centeredView} >
                <View style={styles.modalView}>
                  <Text style={{ margin: 15, fontSize: 16, fontFamily: 'Montserrat-Bold', marginLeft: 30 }}>Select Gender</Text>

                  <View style={{ borderBottomWidth: 1, borderBottomColor: '#c9c9c9' }} />
                  <View style={{ margin: 15 }}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                      <RadioButton
                        color='#C28647'
                        uncheckedColor='#F8DFC5'
                        value="Male"
                        status={checked === 'Male' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Male')}
                      />
                      <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Montserrat-Regular' }}>Male</Text>


                    </View>

                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                      <RadioButton
                        color='#C28647'
                        uncheckedColor= '#F8DFC5'
                        value="Female"
                        status={checked === 'Female' ? 'checked' : 'unchecked'}
                        onPress={() => setChecked('Female')}
                      />
                      <Text style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Montserrat-Regular' }}>Female</Text>

                    </View>


                  </View>

                  <View style={{ borderBottomWidth: 1, borderBottomColor: '#c9c9c9' }} />

                  <View style={{ margin: 12, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 40 }}>
                    <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center'}} activeOpacity={0.8} underlayColor="#FAE9D7" onPress={() => setVisible(!visible)}>

                    <Text  style={{  padding: 5,fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>Cancel</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={{alignItems: 'center', justifyContent: 'center', marginLeft: 20}} activeOpacity={0.8} underlayColor="#FAE9D7" onPress={() => returnOk()}>

                    <Text  style={{  padding: 5, fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>OK</Text>
                    </TouchableHighlight>




                  </View>

                </View>
              </View>
            </Modal>

          }


          {/* <View style={{ marginLeft: 14, height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28 }}>

          <IconBirth name='date-range' size={15} style={{ marginLeft: 20 }} />

          <TextInput placeholder='Date Of Birth'
            textAlign={'center'}
            placeholderTextColor='#000'
            style={{ width: '75%', fontSize: 13, fontFamily: 'Montserrat-Medium' }}
            value={dateBirth}
            autoCapitalize='none'
            keyboardType='email-address'
            returnKeyLabel='done'
            onChangeText={text => setDateBirth(text)} />

        </View> */}


          <TouchableOpacity style={{ marginLeft: 14, height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 3, backgroundColor: '#fff', borderRadius: 28 }}>

            <IconBirth name='date-range' size={15} style={{ marginLeft: 20, }} />
            <DatePicker
              style={{
                marginLeft: -5,
                bottom: 2
                // width: 250,
                // textAlign: 'center'
              }}
              date={datee}
              textAlign='center'
              androidMode='spinner'
              mode="date"
              placeholder="Date Of Birth"
              // placeholderTextColor='#000'
              format="DD/MM/YYYY"
              minDate="01/01/1890"
              maxDate={new Date()}
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              showIcon={false}
              customStyles={{
                placeholderText: {
                  fontSize: 13, fontFamily: 'Montserrat-Medium',
                  color: '#000',

                }
              }}

              onDateChange={(date) => {

                dateChange(date)

              }}
            />
          </TouchableOpacity>


          <View style={{ marginLeft: 15, height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 3, backgroundColor: '#fff', borderRadius: 28 }}>

            <Image source={require('../images/password.png')} style={{width: 13, height: 16, marginLeft: 20}}/>


            <TextInput
              placeholder='Password'
              placeholderTextColor='#000'
              style={{
                flex: 1,
                paddingTop: 10,
                paddingRight: 20,
                paddingBottom: 10,
                paddingLeft: 48,
                color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
              }}
              onChangeText={text => setPassword(text)}
              defaultValue={password}
              value={password}
              secureTextEntry={passwordValue ? false : true}
              returnKeyLabel="done"
              keyboardType='default'
              onSubmitEditing={() => {
                passwordRef.current.focus();
              }} />

            <IconPassword onPress={() => paswwordStatus()} name={passwordValue ? 'eye' : 'eye-with-line'} type='Entypo' size={15} style={{ marginRight: 20 }} />


          </View>



          <View style={{ marginLeft: 15, height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 3, backgroundColor: '#fff', borderRadius: 28 }}>

            <Image source={require('../images/password.png')} style={{width: 13, height: 16, marginLeft: 20}}/>

            <TextInput
              ref={passwordRef}
              placeholder='Confirm Password'
              placeholderTextColor='#000'
              style={{
                flex: 1,
                paddingTop: 10,
                paddingRight: 20,
                paddingBottom: 10,
                paddingLeft: 48,
                color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
              }}
              onChangeText={text => setconfirmPassword(text)}
              defaultValue={confirmPassword}
              secureTextEntry={confirmPasswordValue ? false : true}
              returnKeyLabel="done"
              keyboardType='default'
            />

            <IconPassword onPress={() => confirmPaswwordStatus()} name={confirmPasswordValue ? 'eye' : 'eye-with-line'} type='Entypo' size={15} style={{ marginRight: 20 }} />


          </View>



          <TouchableOpacity style={{ marginTop: 40 ,}}>
            {buttonLoader ? 
            <View style={{marginLeft:  15,marginRight:15, height: 44,  borderRadius: 28, color: '#000', backgroundColor: 'rgb(250,233,215)'}}>
                <ActivityIndicator size="small" color="#000" style={{ margin: 20 }} /> 
                </View>: 

            <Button
              labelStyle={{ color: "black", padding: 2, fontSize: 15, fontFamily: 'Montserrat-Bold' }}
              dark={true}
              color='rgb(250,233,215)'
              onPress={signuUser}
              label='SignUp'
            />
}
          </TouchableOpacity>

          <View style={{ alignSelf: 'center', height: 44, flexDirection: 'row', marginBottom: 20 }}>
            <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', alignSelf: 'center', color: '#000' }}>Already user? </Text>
            <Text onPress={() => loginUser()} style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', alignSelf: 'center', fontWeight: 'bold', color: '#CC9458' }}>Login</Text>
          </View>


        </KeyboardAvoidingView>

      </ScrollView>




    </View>

  )

}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.30)'
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,


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
    marginBottom: 15,
    textAlign: "center"
  }
});

export default Signup