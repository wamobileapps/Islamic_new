import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Iconsearch from "react-native-vector-icons/AntDesign";
import { baseUrl } from '../Api/COntstant';

const upImage = require('../images/bgJournal.png')

const BiaGraphyList = ({ navigation }) => {
    const [bioGraphy, setBioGraphy] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getBioGraphyData()
        });

        return unsubscribe;
    }, [navigation]);



    const getBioGraphyData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log("auth token bio", token)

        axios.get(baseUrl + 'biography/List', {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('response-===', response.data.data)
                setBioGraphy(response.data.data)
            })
            .catch((error) => {
                console.log('error', error)
            })
    }


    const renderItem = ({ item, index }) => {
        // console.log(item._id)

        return (
            <TouchableOpacity key={index} style={{
                // height: 115,
                borderWidth: 1, marginLeft: 20, marginRight: 20, marginTop: 20, padding: 4,
                backgroundColor: 'white',
                borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8,
            }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', marginLeft: 10, marginRight: 10, width: 145 }}>{item.year}</Text>
                    <View style={{ flexDirection: 'row',alignItems: 'center'  }}>
                        <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 13}}>Age: </Text>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 13,marginLeft: 10, margin: 5, marginRight: 10, color: 'black' }}>{item.age}</Text>
                    </View>
                </View>

                {/* <Text style={{ fontSize: 13, fontFamily: 'Montserrat-SemiBold', marginLeft: 10, marginRight: 10, marginTop: 10 }}>{item.title}</Text> */}
                <Text style={{ fontSize: 10, marginBottom: 10, fontFamily: 'Montserrat-Regular', marginLeft: 10, margin: 5, marginTop: 20, marginRight: 10, color: 'black' }}>{item.description}</Text>
            </TouchableOpacity>
        )

    }





    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(250,233,215)', }}>
            <ImageBackground source={upImage} style={{ width: wp('100%'), height: hp('100%'), }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image source={require('../images/drawer.png')} style={{ width: 25, height: 15, marginTop: 25, marginLeft: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, color: '#000', marginTop: 20, color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 20, textAlign: 'center' }}>BioGraphy</Text>
                    </View>

                    <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#EBC7A1', marginTop: 25, right: 20, alignItems: 'center', justifyContent: 'center' }}>
                        <Iconsearch name='search1' size={18} color="black" style={{ position: 'absolute' }} />
                    </View>

                </View>


                <FlatList
                    data={bioGraphy}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    style={{ flex: 1, marginTop: 50, marginBottom: 100 }}
                />




                <FAB
                    style={{
                        bottom: 100, position: 'absolute', right: 0, marginBottom: 20, marginRight: 20,
                        backgroundColor: '#C28647',
                    }}
                    icon="plus"
                    onPress={() => navigation.navigate('AddBioGRaphy')}
                />


            </ImageBackground>
        </View>

    )

}

export default BiaGraphyList