import React, { Component, useState, useRef } from 'react';
import { View, Text, ScrollView, Image, ToastAndroid, ImageBackground, KeyboardAvoidingView, TextInput, TouchableOpacity } from 'react-native';
import IconUser from 'react-native-vector-icons/FontAwesome'
import IconPencil from 'react-native-vector-icons/FontAwesome5'
import IconMessage from 'react-native-vector-icons/Ionicons'
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import { InputX, Button } from '../components/index';
import IconAdd from 'react-native-vector-icons/Octicons'
import * as ImagePicker from 'react-native-image-picker'
import { baseUrl } from '../Api/COntstant';



const upImage = require('../images/sign1.png')

const Feedback = (props) => {
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [image, setImage] = useState('')



    const subjectRef = useRef();
    const messageRef = useRef();


    const sendMessage = async () => {
        const token = await AsyncStorage.getItem('token')

        console.log("auth token", token)

        let formdata = new FormData();
        formdata.append("image",   { uri: image.uri, name: image.fileName, type: 'image/jpeg'})
        formdata.append("message",   message)
        formdata.append("subject", subject)

       



        axios.post(baseUrl+ 'feedback', formdata, {
            headers: {
                "auth-token": token
            }
        })
            .then((response) => {
                console.log('response contact us====>', response.data)
                ToastAndroid.show(response.data.msg, ToastAndroid.SHORT)
                // props.navigation.goBack()

            })
            .catch((error) => {
                console.log('error', error)
                // dispatch(userUpdateProfileFail())

            })
    }


    const addFile=()=>{

        let options = {
            storageOptions: {
              skipBackup: true,
              path: 'images',
            },
          };
          ImagePicker.launchImageLibrary(options, (response) => {
            console.log('Response = ', response);
      
            if (response.didCancel) {
              console.log('User cancelled image picker');
            } else if (response.error) {
              console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
              console.log('User tapped custom button: ', response.customButton);
              alert(response.customButton);
            } else {
              const source = response
              console.log('response', source);
              const s = response.fileName
              global.im = response.fileName
              setImage(s)

              console.log("image is===>", global.im)
            
              
            }
          });

    }

    return (
        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <ImageBackground source={upImage} style={{ width: '100%', height: 230, }}>

                <IconUser onPress={() => props.navigation.goBack()} name='chevron-left' type='Feather' size={16} style={{ margin: 20 }} />

                <Text style={{ fontSize: 22, color: '#000', marginTop: 50, color: '#454545', fontFamily: 'Montserrat-ExtraBold', textAlign: 'center' }}>Feedback</Text>

            </ImageBackground>


            <ScrollView style={{}}>
                <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', }} behavior="padding" enabled >



                    <View style={{
                        marginLeft: 15, height: 44, marginTop: 100, flexDirection: 'row',
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
                        />


                    </View>

                    {image ?  
                    <Text style={{ fontSize: 12, color: '#000', marginTop: 50, color: '#454545', fontFamily: 'Montserrat-Medium', textAlign: 'center', marginLeft: 20, marginRight: 20 }}>{global.im }</Text>
                        // <Image source={{uri: `http://112.196.64.119:8000/users/${image}` }} style={{ width: 80, height: 80, borderRadius: 40, marginTop: 20 }} />

                    : null}


                    <TouchableOpacity onPress={()=>addFile()} style={{ flexDirection: 'row',
                        marginTop: 30, justifyContent: 'center', alignItems: 'center', borderWidth: 1, marginLeft: 100,
                        marginRight: 100, height: 35, borderStyle: 'dashed', borderColor: 'black', backgroundColor: 'white', borderRadius: 20,
                    }}>
                        <IconAdd name='diff-added'  size={16} color='#000'  />
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', marginLeft: 10 }}>Add File</Text>
                    </TouchableOpacity>


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


export default Feedback