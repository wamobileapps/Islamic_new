import React, { Component, useState, useRef } from 'react';
import { View, Text, ScrollView, StyleSheet, ToastAndroid, ImageBackground, KeyboardAvoidingView, TextInput } from 'react-native';
import IconUser from 'react-native-vector-icons/FontAwesome'
import IconEmail from 'react-native-vector-icons/MaterialCommunityIcons'
import IconPencil from 'react-native-vector-icons/FontAwesome5'
import IconMessage from 'react-native-vector-icons/Ionicons'
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import { baseUrl } from '../Api/COntstant';

import { InputX, Button } from '../components/index';
import moment from 'moment';



const upImage = require('../images/sign1.png')

const ContactUs = (props) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')



    const emailRef = useRef();
    const subjectRef = useRef();
    const messageRef = useRef();




   const sendMessage=async ()=>{
    const token = await AsyncStorage.getItem('token')

    console.log("auth token", token)

    var data= {
        "email": email,
        "name": name,
        "message": message,
        "subject": subject
    }

       
      
      axios.post(baseUrl+ 'contactus', data, {
        headers: {
        "auth-token": token
    }})      
      .then((response) => {
        console.log('response contact us====>',response.data)
        ToastAndroid.show(response.data.msg, ToastAndroid.SHORT)
        props.navigation.goBack()

      })
      .catch((error) => {
        console.log('error',error)
        // dispatch(userUpdateProfileFail())

      })
   }







    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <ImageBackground source={upImage} style={{ width: '100%', height: 230, }}>

                <IconUser onPress={() => props.navigation.goBack()} name='chevron-left' type='Feather' size={16} style={{ margin: 20 }} />

                <Text style={{ fontSize: 22, color: '#000', marginTop: 30, color: '#454545', fontFamily: 'Montserrat-ExtraBold', textAlign: 'center' }}>Contact Us</Text>
                <Text style={{ fontSize: 13, color: '#000', marginTop: 5, color: '#454545', fontFamily: 'Montserrat-SemiBold', textAlign: 'center' }}>How can we help you?</Text>

            </ImageBackground>


            <ScrollView style={{}}>
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', }} behavior="padding" enabled >

                    <View style={{
                        marginLeft: 15, height: 44, marginTop: 80, flexDirection: 'row',
                        marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
                        alignItems: 'center'
                    }}>

                        <IconUser name='user' type='MaterialCommunityIcons' size={15} style={{ marginLeft: 20, }} />

                        <TextInput placeholder='Name'
                            textAlign={'center'}
                            placeholderTextColor='#000'
                            style={{
                                flex: 1,
                                marginRight: 30,
                                color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
                            }}
                            value={name}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            returnKeyLabel="Done"
                            onChangeText={text => setName(text)}
                            onSubmitEditing={() => {
                                emailRef.current.focus();
                            }}
                        />

                    </View>



                    <View style={{
                        marginLeft: 15, height: 44, marginTop: 30, flexDirection: 'row',
                        marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
                        alignItems: 'center', justifyContent: 'space-between'
                    }}>

                        <IconEmail name='email' type='MaterialCommunityIcons' size={15} style={{ marginLeft: 20, }} />

                        <TextInput
                            ref={emailRef}
                            placeholder='Email'
                            textAlign={'center'}
                            placeholderTextColor='#000'
                            style={{
                                flex: 1,
                                marginRight: 30,
                                color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
                            }}
                            value={email}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            returnKeyLabel="Done"
                            onChangeText={text => setEmail(text)}
                            onSubmitEditing={() => {
                                subjectRef.current.focus();
                            }}
                        />


                    </View>

                    <View style={{
                        marginLeft: 15, height: 44, marginTop: 30, flexDirection: 'row',
                        marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
                        alignItems: 'center', justifyContent: 'space-between'
                    }}>

                        <IconPencil name='pencil-alt' type='FontAwesome5' size={15} style={{ marginLeft: 20, }} />

                        <TextInput
                            ref={subjectRef}
                            placeholder='Subject'
                            textAlign={'center'}
                            placeholderTextColor='#000'
                            style={{
                                flex: 1,
                                marginRight: 30,
                                color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
                            }}
                            value={subject}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            returnKeyLabel="Done"
                            onChangeText={text => setSubject(text)}
                            onSubmitEditing={() => {
                                messageRef.current.focus();
                            }}
                        />


                    </View>

                    <View style={{
                        marginLeft: 15, height: 113, marginTop: 30, flexDirection: 'row',
                        marginRight: 15, elevation: 10, backgroundColor: '#fff', borderRadius: 28,
                        alignItems: 'center', justifyContent: 'space-between', marginBottom: 20
                    }}>

                        <IconMessage name='ios-chatbubble-outline' type='Ionicons' size={15} style={{ marginLeft: 20, }} />

                        <TextInput
                            ref={messageRef}
                            placeholder='Message'
                            textAlign={'center'}
                            placeholderTextColor='#000'
                            numberOfLines={2}
                            style={{
                                flex: 1,
                                marginRight: 30,
                                color: '#000', fontSize: 13, fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
                            }}
                            value={message}
                            autoCapitalize='none'
                            keyboardType='email-address'
                            returnKeyLabel="Done"
                            onChangeText={text => setMessage(text)}
                        // onSubmitEditing={() => {
                        //     passwordRef.current.focus();
                        // }}
                        />


                    </View>


                    <View style={{ marginTop: 40, marginBottom: 20 }}>

                        <Button
                            labelStyle={{ color: "black", padding: 2, fontSize: 15, fontFamily: 'Montserrat-Bold' }}
                            dark={true}
                            color='#FAE9D7'
                            onPress={sendMessage}
                            label='Send message'
                        />
                    </View>


                </KeyboardAvoidingView>
            </ScrollView>



        </View>

    )

}


export default ContactUs