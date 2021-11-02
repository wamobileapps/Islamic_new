

import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, ImageBackground, FlatList, Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import { baseUrl } from '../Api/COntstant';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Iconback from 'react-native-vector-icons/Entypo';


const Self = ({ navigation }) => {

    const [data, setData] = useState('');
    const [visible, unVisible] = useState('');
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('')

    useEffect(() => {
        getSelfList()
    }, [])

    const getData = async () => {

        const token = await AsyncStorage.getItem('token')
        axios.get(baseUrl+ `info/view/614ae207e5ac0c1eecc6c5c4`, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('response====================', response.data.data)

                setTitle(response.data.data.title)
                setDescription(response.data.data.description)

            })
            .catch((error) => {
                console.log('error', error)
            })
    }


    const getSelfList = async () => {
        getData()
        const token = await AsyncStorage.getItem('token')
        axios.get(baseUrl+ 'info/list', {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('response====================', response.data.data)
                setData(response.data.data)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    const selectItem = async (item) => {
        unVisible(!visible)
        console.log(item._id);

        const token = await AsyncStorage.getItem('token')
        axios.get(baseUrl+ `info/view/${item._id}`, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('response====================', response.data.data.title,response.data.data.description )

                setTitle(response.data.data.title)
                setDescription(response.data.data.description)

            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    const webViewStyle = StyleSheet.create({ p: { color: "#454545", fontSize: 10, fontFamily: 'Montserrat-Regular' } });
    const htmlContent = description

    return (

        <View style={{ flex: 1, backgroundColor: 'white' }}>

            <View style={{ backgroundColor: '#FAE9D7', height: 45, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
                    <Text style={{ fontSize: RFValue(13), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Self Psycology</Text>
                </TouchableOpacity>
                <Image source={require('../images/selff.png')} style={{ width: 26, height: 26, marginRight: 20 }} />
            </View>


            <View style={{marginLeft: 20, marginRight: 20}}>

                <FlatList
                    data={data}
                    style={{ marginTop: 20, }}
                    numColumns={2}
                    renderItem={({ item, index }) => {
 
                        return (
                            <TouchableOpacity onPress={() => selectItem(item)} style={{ flexDirection: 'row', marginTop: 10, }}>
                                <View style={{ width: wp('40%'), height: 40, borderRadius: 4, borderWidth: 1, borderColor: item ? '#E89846' : '#F3D6B8', borderStyle: 'dashed', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAE9D7', marginLeft: '5%',  }}>
                                    <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', marginLeft: 5 }}>{item.title}</Text>
                                </View>
                            </TouchableOpacity>
                        )
                    }}
                />
            </View>


            <View style={{ marginTop: 30, marginLeft: 20, marginRight: 20 }}>
                <Text style={{ fontSize: RFValue(11), fontFamily: 'Montserrat-Bold' }}>{title}</Text>
                <Text style={{ fontSize: RFValue(9), fontFamily: 'Montserrat-Regular', marginTop:5 }}>{description}</Text>
                {/* <HTMLView
                    value={htmlContent}
                    stylesheet={webViewStyle}
                /> */}
            </View>



        </View>

    )

}

export default Self