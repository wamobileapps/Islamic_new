import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import Iconback from 'react-native-vector-icons/Entypo';

import IconPlay from 'react-native-vector-icons/AntDesign'

const upImage = require('../images/bgJournal.png')

const TVScreen = ({ navigation, route }) => {
    const [TvListTitle, setTvListTitle] = useState('')
    const [TvListDiscription, setTvListDiscription] = useState('')

    const id = route.params.TVListId;
    const player = useRef()

    useEffect(() => {



        getTvListData()
        const unsubscribe = navigation.addListener('focus', () => {
            getTvListData()
        });

        return unsubscribe;
    }, [navigation]);



    const getTvListData = async () => {


        axios.get(`http://112.196.64.119:8000/api/admin/tv/view/${id}`)
            .then((response) => {
                console.log('response===========>', response.data)


                setTvListTitle(response.data.title)
                setTvListDiscription(response.data.description)
            })
            .catch((error) => {
                console.log('error', error)


            })
    }




    return (
        <View style={{ flex: 1, backgroundColor: 'white', }}>
            <View style={{ backgroundColor: '#FAE9D7', height: 83, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row' }}>
                    <Iconback onPress={() => navigation.goBack()} name='chevron-thin-left' size={18} color='#000' style={{ width: 15, fontWeight: 'bold', height: 20, marginLeft: 20, marginTop: 5 }} />
                    <Text style={{ fontSize: 16, color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 10, }}>TV</Text>
                </View>
                <Image source={require('../images/tvv.png')} style={{ width: 30, height: 30, marginRight: 20 }} />
            </View>

            <ImageBackground source={require('../images/download.png')} style={{ borderRadius: 5, height: 204, marginLeft: 20, marginRight: 20, marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>

                <IconPlay onPress={() => navigation.goBack()} name='playcircleo' size={5} color='#fff' style={{}} />


            </ImageBackground>


            <View style={{ marginTop: 25, marginLeft: 10 }}>
                <Text style={{ fontSize: 13, fontFamily: 'Montserrat-SemiBold', marginLeft: 10, marginRight: 10, width: 145 }}>{TvListTitle}</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Regular', marginLeft: 10, margin: 5, marginRight: 10, }}>{TvListDiscription}</Text>
            </View>


        </View>

    )

}

var styles = StyleSheet.create({
    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },
});

export default TVScreen