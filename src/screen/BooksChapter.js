import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity, } from 'react-native';
import AsyncStorage from "@react-native-community/async-storage";

import axios from "axios";
import Iconsearch from "react-native-vector-icons/AntDesign";
const upImage = require('../images/bgJournal.png');
import Iconback from 'react-native-vector-icons/Entypo';


import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BookDetail = ({ navigation, route }) => {
    const [content, setContent] = useState('')
    const [chapterList, setChapterList] = useState('')
    const [chapterListId, setChapterListID] = useState('')
    const [chapterDetails, setChapterDetails] = useState('')
    const [detailsVisible, setDetailsVisible] = useState('')


    const chapterListData = () => {
        setContent(!content)
        getListData()
    }

    const getListData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log("auth token=-=========>>>", token, global.id)

        axios.get(`http://112.196.64.119:8000/api/admin/chapter/${global.id}/list`, {
            // axios.get('http://112.196.64.119:8000/api/admin/chapter/61125b9932945d177ef458af/list', {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('response========>>>', response.data.data)

                setChapterList(response.data.data)
            })
            .catch((error) => {
                console.log('error', error)

            })

    }


    const chapterListDataDetail = async (item) => {
        setChapterListID(item._id)

        setDetailsVisible(true)

        const token = await AsyncStorage.getItem('token')
        console.log("auth token=-=========>>>", token, global.id)

        axios.get(`http://112.196.64.119:8000/api/admin/chapter/view/${chapterListId}/list`, {
        // axios.get('http://112.196.64.119:8000/api/admin/chapter/view/6114b94fc5a61112fe553adc', {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('response========>>>', response.data)

                setChapterDetails(response.data)
            })
            .catch((error) => {
                console.log('error', error)

            })


    }


    const renderItem = ({ item, index }) => {

        return (

            <TouchableOpacity
                onPress={() => chapterListDataDetail(item)}

                style={{ padding: 10, marginLeft: 15, marginRight: 20, marginBottom: 20 }}>

                <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', color: '#454545' }}>{item.title}</Text>
            </TouchableOpacity>

        )

    }




    return (



        <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', height: 80, backgroundColor: '#FAE9D7' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                <Iconback onPress={() => navigation.goBack()} name='chevron-thin-left' size={18} color='#000' style={{ width: 15, fontWeight: 'bold', height: 20, marginLeft: 20,  }} />

                    {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={require('../images/drawer.png')} style={{ width: 25, height: 15, marginLeft: 20 }} />
                    </TouchableOpacity> */}
                    <Text style={{ fontSize: 16, color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 10, }}>Book Summary</Text>
                </View>

                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#EBC7A1', marginTop: 25, right: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Iconsearch name='search1' size={18} color="black" style={{ position: 'absolute' }} />
                </View>
            </View>

            <View style={{ marginTop: 20, marginLeft: 20, marginRight: 20, borderRadius: 10, borderColor: '#F3D6B8', borderWidth: 1, backgroundColor: '#FAE9D7', }}>
                <View style={{ padding: 10, justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ marginLeft: 15, fontSize: 15, fontFamily: 'Montserrat-SemiBold', color: '#363636' }}>Table of Contents</Text>
                    <TouchableOpacity onPress={() => chapterListData()}>
                        <Image source={require('../images/content.png')} style={{ width: 47, height: 37, marginRight: 15 }} />
                    </TouchableOpacity>


                </View>
                {content ?

                    chapterList == '' ?

                        <View style={{ padding: 10, marginLeft: 15, marginRight: 20, marginBottom: 20 }}>
                            <Text style={{ color: 'black' }}>No data found</Text>
                        </View> :
                        <FlatList
                            data={chapterList}
                            renderItem={renderItem}
                            keyExtractor={item => item.id}
                        />
                    : null

                }

            </View>


            {detailsVisible ?
                <View style={{ flex: 1, marginTop: 40, marginLeft: 20, marginRight: 20 }}>
                    <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Bold', color: '#363636' }}>{chapterDetails.title}</Text>
                    <Text style={{ fontSize: 10, marginTop: 5, fontFamily: 'Montserrat-Regular', color: '#363636' }}>{chapterDetails.description}</Text>
                </View>
                : null}





        </View>



    )

}

export default BookDetail