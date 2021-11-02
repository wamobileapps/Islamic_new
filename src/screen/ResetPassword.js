import React, { useState } from 'react';
import { View, Text, Image, Modal, ScrollView, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconPassword from 'react-native-vector-icons/Entypo'
const upImage = require('../images/sign1.png')
import { InputX, Button } from '../components/index';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import { baseUrl } from '../Api/COntstant';

function ResetPassword(props) {
    const [newPassword, setNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')


    const update = async() => {

        if(newPassword == '' && confirmPassword == ''){
            alert("Please add fields")
        }
        else{
            const token = await AsyncStorage.getItem('token')
            var params = null
    
            console.log(token)
        
            params = {
              "new_password": newPassword,
              "confirm_password": confirmPassword
            }
        
            var headers = {
              "auth-token": token
            }
        
            axios.patch(baseUrl+ 'reset/60f80396a4f7811c8dad57c7', params, {
              headers
            }).then(async(res) => {
                await AsyncStorage.setItem('token','')
                props.navigation.navigate('Login')
              alert(res.data.msg)
              console.log("res-----", res)
            })
        }

    }


    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>



            <ImageBackground source={upImage} style={{ width: '100%', height: 230, borderBottomLeftRadius: 60, borderBottomRightRadius: 60 }}>

                <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', marginTop: '25%', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Reset</Text>
                <Text style={{ fontSize: 22, color: '#000', textAlign: 'center', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> Password</Text>

            </ImageBackground>


            <View style={{ marginTop: "10%" }}>

                <View style={{ marginLeft: 20, marginTop: 30, alignItems: 'center', flexDirection: 'row', marginRight: 20, elevation: 1, backgroundColor: '#fff', borderRadius: 28 }}>

                    <IconPassword name='lock-open' size={15} style={{ marginLeft: 20, }} />

                    <TextInput placeholder='New Password'
                        placeholderTextColor='#000'
                        style={{ marginLeft: 30, width: '75%', marginRight: 60, fontSize: 13, fontFamily: 'Montserrat-Medium' }}
                        value={newPassword}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        onChangeText={text => setNewPassword(text)}
                        secureTextEntry={true} />

                </View>

                <View style={{ marginLeft: 20, marginTop: 30, alignItems: 'center', flexDirection: 'row', marginRight: 20, elevation: 1, backgroundColor: '#fff', borderRadius: 28 }}>

                    <IconPassword name='lock-open' size={15} style={{ marginLeft: 20, }} />

                    <TextInput placeholder='Confirm Password'
                        placeholderTextColor='#000'
                        style={{ marginLeft: 30, width: '75%', marginRight: 60, fontSize: 13, fontFamily: 'Montserrat-Medium' }}
                        value={confirmPassword}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        onChangeText={text => setConfirmPassword(text)}
                        secureTextEntry={true} />

                </View>





                <View style={{ marginTop: 40 }}>

                    <Button
                        labelStyle={{ color: "#363636", padding: 2, fontSize: 15, fontFamily: 'Montserrat-Bold' }}
                        dark={true}
                        color='rgb(250,233,215)'
                        onPress={update}
                        label='Update'
                    />
                </View>






            </View>


        </View>
    )
}
export default ResetPassword