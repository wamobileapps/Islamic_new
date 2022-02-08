import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity, } from 'react-native';
import IconBack from "react-native-vector-icons/MaterialIcons"
import AsyncStorage from "@react-native-community/async-storage";
import HTMLView from 'react-native-htmlview';
import axios from "axios"
const upImage = require('../images/bgJournal.png')
import Iconsearch from "react-native-vector-icons/AntDesign";
import Iconback from 'react-native-vector-icons/Entypo';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const BookDetail = ({ navigation, route }) => {
    const [bookList, setBookList] = useState([])
    const [description, setDescription] = useState('')


    useEffect(() => {

        getBookList()
        console.log("hjhjhjjikjk====>", route.params.bookID)

    }, []);

    const htmlContent = bookList.description


    const getBookList = async () => {
        const id = route.params.bookID
        const token = await AsyncStorage.getItem('token')
        console.log("auth token=-=========>>>", token)

        axios.get(`http://112.196.64.119:8000/api/admin/book/view/${id}`, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {

                setBookList(response.data)
                setDescription(response.description)
                console.log('responsebooklist========>>>', bookList.description)
            })
            .catch((error) => {
                console.log('error', error)

            })
    }



    const webViewStyle = StyleSheet.create({ p: { color:"#454545", fontSize: 10, fontFamily: 'Montserrat-Regular' } });



    return (



        <ImageBackground source={upImage} style={{ width: wp('100%'), height: hp('100%'), }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', marginTop: 20, alignItems: 'center' }}>
                <Iconback onPress={() => navigation.goBack()} name='chevron-thin-left' size={18} color='#000' style={{ width: 15, fontWeight: 'bold', height: 20, marginLeft: 20,  }} />

                    {/* <TouchableOpacity onPress={() => navigation.openDrawer()}>
                        <Image source={require('../images/drawer.png')} style={{ width: 25, height: 15, marginTop: 25, marginLeft: 20 }} />
                    </TouchableOpacity> */}
                    <Text style={{ fontSize: 16, color: '#000',  color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 10, }}>Book Summary</Text>
                </View>

                <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#EBC7A1', marginTop: 25, right: 20, alignItems: 'center', justifyContent: 'center' }}>
                    <Iconsearch name='search1' size={18} color="black" style={{ position: 'absolute' }} />
                </View>
            </View>

            <View style={{ borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8, marginLeft: 20, marginRight: 20, height: "80%", backgroundColor: 'white', borderWidth: 1, marginTop: 30 }}>
                <View style={{ flexDirection: 'row', marginLeft: 15, marginTop: 15, }}>
                    <Image source={{ uri: `http://112.196.64.119:8000/books/${bookList.image}` }} style={{ height: 159, width: 112, borderRadius: 6, resizeMode: 'cover' }} />
                    <View style={{ marginLeft: 15 }}>
                        <Text style={{ fontSize: 16, fontFamily: 'Montserrat-Bold' }}>{bookList.title}</Text>
                        <View style={{ flexDirection: 'row' , marginTop: 5}}>
                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-SemiBold' }}>{bookList.author}</Text>
                            <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular' }}> (Admin)</Text>
                        </View>

                        <TouchableOpacity onPress={()=>navigation.navigate('BookChapter')}  style={{width: 82, marginTop: 40, height: 28, borderRadius: 14, backgroundColor: '#FAE9D7',alignItems: 'center', justifyContent: 'center'}}>
                            <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Bold' }}>View</Text>
                        </TouchableOpacity>


                    </View>


                </View>

                <View style={{ flexDirection: 'row', marginTop: 20, marginLeft: 15, alignItems: 'center' }}>
            <Text style={{ fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Book Summary - </Text>
            <HTMLView
              value={htmlContent}
              stylesheet={webViewStyle}
            />
          </View>

            </View>







        </ImageBackground>



    )

}

export default BookDetail