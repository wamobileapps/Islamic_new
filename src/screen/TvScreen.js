
import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import Iconback from 'react-native-vector-icons/Entypo';
import Video from 'react-native-video';
import IconPlay from 'react-native-vector-icons/AntDesign'

const upImage = require('../images/bgJournal.png')

const TVScreen = ({ navigation }) => {
    const [TvList, setTvList] = useState([])


    const player = useRef()

    useEffect(() => {



        getTvListData()
        const unsubscribe = navigation.addListener('focus', () => {
            getTvListData()
        });

        return unsubscribe;
    }, [navigation]);



    const getTvListData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log("auth token", token)

        axios.get('http://112.196.64.119:8000/api/admin/tv/list', {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('response', response.data.data)


                setTvList(response.data.data)

            })
            .catch((error) => {
                console.log('error', error)

            })
    }

    const renderItem = ({ item, index }) => {
        console.log('idddd', item._id)

        return (
            <TouchableOpacity onPress={() => navigation.navigate('TVDetail', {
                TVListId: item._id
            })}



                style={{
                    borderWidth: 1, marginLeft: 20, marginTop: 20, padding: 4, marginRight: 20,
                    backgroundColor: 'white',
                    borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8, flexDirection: 'row'
                }}>

                <View style={{ justifyContent: "flex-start", flexDirection: "row" }}>
                    <ImageBackground source={require('../images/download.png')} style={{ width: 70, height: 66, marginLeft: 5, marginTop: 10, margin: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>

                        <IconPlay onPress={() => navigation.goBack()} name='playcircleo' size={22} color='#fff' style={{}} />


                    </ImageBackground>




                    <View style={{ marginTop: 5 }}>
                        <Text style={{ fontSize: 13, fontFamily: 'Montserrat-SemiBold', marginLeft: 10, marginRight: 10, width: 145 }}>{item.title}</Text>
                        <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Regular', marginLeft: 10, margin: 5, marginRight: 10, }}>{item.description}</Text>
                    </View>
                </View>
            </TouchableOpacity>
        )
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


            <FlatList
                data={TvList}
                renderItem={renderItem}
            />



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