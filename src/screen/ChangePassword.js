import React, { useState } from 'react';
import { View, Text, ScrollView, TextInput, ImageBackground } from 'react-native';
import IconPassword from 'react-native-vector-icons/Entypo'
import Iconback from 'react-native-vector-icons/SimpleLineIcons';
import { InputX, Button } from '../components/index';
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
const upImage = require('../images/sign1.png')
import { baseUrl } from '../Api/COntstant';


function ChangePassword(props) {
    const [currentPassword, setcurrentPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const changePassword = async () => {
      if (currentPassword == '' && newPassword == '' && confirmPassword == '' ) {
        alert('All fields are mandatory, try again !');
        return
      }
      else  {
        const token = await AsyncStorage.getItem('token')
        var params = null

        // console.log(token)
    
        params = {
          "current_password": currentPassword,
          "new_password": newPassword,
          "confirm_password": confirmPassword
      }
    
        var headers = {
          "auth-token": token
        }
    
        axios.patch(baseUrl+ `reset/${global.id}`, params, {
          headers
        }).then(async(res) => {
          alert(res.data.msg)
          global.password = confirmPassword
          // await AsyncStorage.setItem('token','')
          props.navigation.goBack()
          console.log("res-----", res.data.msg)
        })
      }
    
      }


    return (
        <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>



          <ImageBackground source={upImage} style={{ width: '100%', height: 230, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>

          <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', marginTop: '25%', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Change Your</Text>
          <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Password</Text>

          </ImageBackground>


            <View style={{ marginTop: "10%" }}>
                {/* <View style={{ marginLeft: 20, marginTop: 30, flexDirection: 'row', marginRight: 20, elevation: 10, backgroundColor: '#fff', borderRadius: 28 }}>

                    <IconPassword name='lock-open' size={22} style={{ marginLeft: 20, top: 14 }} />

                    <TextInput placeholder='Current Password'
                        placeholderTextColor='#000'
                        style={{ marginLeft: 30, textAlign: 'center', marginRight: 60 }}
                        value={currentPassword}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        onChangeText={text => setcurrentPassword(text)}
                        secureTextEntry={true} />

                </View> */}

<View style={{ marginLeft: 15,height:44,  marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28 }}>

<IconPassword name='lock-open' size={15} style={{ marginLeft: 20,  }} />

<TextInput 
  placeholder='Current Password'
  textAlign={'center'}
  placeholderTextColor='#000'
  style={{  width: '75%', marginRight: 60, fontSize: 13, fontFamily: 'Montserrat-Medium' }}
  value={currentPassword}
  autoCapitalize='none'
  keyboardType='email-address'
  onChangeText={text => setcurrentPassword(text)}
  secureTextEntry={true} />

</View>

<View style={{ marginLeft: 15,height:44,  marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28 }}>

<IconPassword name='lock-open' size={15} style={{ marginLeft: 20,  }} />

<TextInput 
  placeholder='New Password'
  textAlign={'center'}
  placeholderTextColor='#000'
  style={{  width: '75%', marginRight: 60, fontSize: 13, fontFamily: 'Montserrat-Medium' }}
  value={newPassword}
  autoCapitalize='none'
  keyboardType='email-address'
  onChangeText={text => setNewPassword(text)}
  secureTextEntry={true} />

</View>

<View style={{ marginLeft: 15,height:44,  marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28 }}>

<IconPassword name='lock-open' size={15} style={{ marginLeft: 20,  }} />

<TextInput 
  placeholder='Confirm Password'
  textAlign={'center'}
  placeholderTextColor='#000'
  style={{  width: '75%', marginRight: 60, fontSize: 13, fontFamily: 'Montserrat-Medium' }}
  value={confirmPassword}
  autoCapitalize='none'
  keyboardType='email-address'
  onChangeText={text => setConfirmPassword(text)}
  secureTextEntry={true} />

</View>








                <View style={{ marginTop: 40, marginBottom: 10 }}>

                    <Button
                        labelStyle={{ color: "black", padding: 2, fontSize: 15, fontFamily: 'Montserrat-Bold'  }}
                        dark={true}
                        color='rgb(250,233,215)'
                        onPress={changePassword}
                        label='Update'
                    />
                </View>


            </View>


        </ScrollView>
    )
}
export default ChangePassword