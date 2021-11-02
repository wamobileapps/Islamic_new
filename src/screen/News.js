

import React, { useEffect, useState, useRef } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Image, ImageBackground } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import Iconback from 'react-native-vector-icons/Entypo';
import HTMLView from 'react-native-htmlview';
import IconPlay from 'react-native-vector-icons/AntDesign'

const upImage = require('../images/bgJournal.png')

const NewsScreen = ({ navigation }) => {
    const [NewsList, setNewsList] = useState([])


    const player = useRef()

    useEffect(() => {



        getTvListData()
        const unsubscribe = navigation.addListener('focus', () => {
            getTvListData()
        });

        return unsubscribe;
    }, [navigation]);

    const webViewStyle = StyleSheet.create({ p: { color: "#454545", fontSize: 10, fontFamily: 'Montserrat-Regular' } });


    const getTvListData = async () => {


        axios.get('http://112.196.64.119:8000/api/admin/news/list')
            .then((response) => {
                console.log('response====================', response.data.data)


                setNewsList(response.data.data)

            })
            .catch((error) => {
                console.log('error', error)
                // dispatch(userUpdateProfileFail())

            })
    }

    const renderItem = ({ item, index }) => {
        const htmlContent = item.description
        return (
            <TouchableOpacity





                style={{
                    borderWidth: 1, marginLeft: 20, marginTop: 20, padding: 4, marginRight: 20,
                    backgroundColor: 'white',
                    borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8, flexDirection: 'row'
                }}>
                {/* <Video source={{ uri: "http://112.196.64.119:8000/tv/v09044220000bto0o15p672dhfu2mtr0.mp4" }}   // Can be a URL or a local file.
                    paused={true}
                    controls={false}
                /> */}
                <View style={{ justifyContent: "flex-start", flexDirection: "row" }}>
                    <ImageBackground source={require('../images/download.png')} style={{ width: 70, height: 66, marginLeft: 5, marginTop: 10, margin: 10, justifyContent: 'center', alignItems: 'center', borderRadius: 6 }}>

                        <IconPlay onPress={() => navigation.goBack()} name='playcircleo' size={22} color='#fff' style={{}} />


                    </ImageBackground>



                    <View style={{ marginTop: 12 }}>
                        <Text style={{ fontSize: 13, marginLeft: 0, marginRight: 10, }}>{item.title}</Text>
                        {/* <Text style={{ fontSize: 10,  marginLeft: "10%", margin: 5, marginRight: 10, }}>{item.description}</Text> */}
                        <HTMLView
                            value={htmlContent}
                            stylesheet={webViewStyle}
                        />
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
                    <Text style={{ fontSize: 16, color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 10, }}>News</Text>
                </View>
                {/* <Image source={require('../images/download.png')} style={{ width: 28, height: 28, marginRight: 20 }} /> */}
            </View>




            {/* <Video source={{
          uri:
            'https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4',
        }}   // Can be a URL or a local file.
         ref={player}                                  // Store reference
                // Callback when video cannot be loaded
       style={styles.backgroundVideo} /> */}
            <FlatList
                data={NewsList}
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

export default NewsScreen