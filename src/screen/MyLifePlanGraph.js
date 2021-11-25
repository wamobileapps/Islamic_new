import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, ImageBackground, FlatList, TouchableHighlight, Modal, Dimensions, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import Iconback from 'react-native-vector-icons/Entypo';
import IconDown from 'react-native-vector-icons/FontAwesome'
import { VictoryLabel, VictoryPie } from "victory-native";
import Svg, { Circle } from 'react-native-svg';
import { baseUrl } from '../Api/COntstant';
import { RFValue } from 'react-native-responsive-fontsize';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


const upImage = require('../images/sign1.png')
const SCREEN_WIDTH = Dimensions.get('window').width;
const colorRating = ["#DAA67F", "#D3A079", "#C59069", "#E3BFA4", "#DFB392", "#D3A079", "#C59069", "#DFB392", "#E3BFA4"]



    const MyLifePlanGraph = ({ navigation, route }) => {
         const [list, setList] = useState('')



    

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getGraphData()
        });

        return unsubscribe;
    }, [navigation]);


    const getGraphData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log("auth token bio", token)

        axios.get(baseUrl+ 'dailyUpdate/graph', {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                // console.log('response graph list==>', response.data)

               

                const arrayData = []
                const arrayColor = []
                const arrayData2 = [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5];


                if (response.data.data.length === 0) {
                    response.data.CategoryList.map((item, index) => {
                        item.consumed_hrs = 0
                        arrayColor.push(entry.color)
                        arrayData.push({ x: item.consumed_hrs, y: 5, label: `${Math.round(item.consumed_hrs)}%` });
                    })


                }
                else {
                    const newArrayData = response.data.CategoryList.map(function (entry) {
                        for (var i = 0; i < response.data.data.length; i++) {

                            if (entry._id === response.data.data[i].activitycategories._id) {


                                const totalRating = (parseInt(response.data.data[i].consumed_hrs) / 15) * 10
                                entry.consumed_hrs = isNaN(totalRating) ? 0 : totalRating
                                console.log("===>totalRating", totalRating);
                                break
                            }
                            else {
                                entry.consumed_hrs = 0
                                //   break
                            }

                        }



                        // 
                        return entry;
                    });

                    for (var i = 0; i < response.data.CategoryList.length; i++) {

                        let entry = response.data.CategoryList[i]
                        arrayColor.push(entry.color)
                        arrayData.push({ x: entry.consumed_hrs, y: 5, label: `${Math.round(entry.consumed_hrs)}%` });
                    }
                    console.log("===>", global.colorList);


                }

                console.log("category type===>", arrayData);
                global.CategoryList = response.data.CategoryList
                setList(response.data.CategoryList)
                global.list = arrayData
                global.colorData = arrayColor
                // console.log("list----> d", global.colorData);

            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    

        return (
            <View
                style={{ flex: 1, backgroundColor: 'white', }}>

                <View style={{ height: 45,backgroundColor: '#FAE9D7',  width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
                        <Text style={{ fontSize: RFValue(13), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>24 Hours In My Life</Text>
                    </TouchableOpacity>
                    <Image source={require('../images/life.png')} style={{ width: 26, height: 26, marginRight: 20 }} />
                </View>


         <View style={{flex: 0.60,  marginLeft: 20, marginRight: 20, }}>
                <FlatList
                    data={global.CategoryList}
                    style={{ marginTop: 20,}}
                    numColumns={3}
                    renderItem={({ item, index }) => {
                        // console.log("itemmm", item);
                        var text = `${item.title} (${Math.round(item.consumed_hrs)}%)`
                        return (
                            <View style={{ flexDirection: 'row', marginLeft: '5%',  marginTop:'2%', width: wp('21%'), alignItems: 'center' }}>
                                <View style={{width:15, height: 15, borderRadius:7.5, backgroundColor: item.color,}}/>
                                <Text style={{fontSize: RFValue(10), fontFamily: 'Montserrat-SmiBold', marginLeft:5}}>{text}</Text>
                            </View>
                        )
                    }}
                />
</View>
             
              <View style={{ marginTop: '-2%' }}>
                <Svg width={400} height={410} viewBox="0 0 400 400"
                    style={{ width: "100%", height: "auto", }}>

                    <Circle cx={SCREEN_WIDTH * 0.5} cy={SCREEN_WIDTH * 0.5} r={38} stroke="#C59069"
                        strokeWidth="4"
                        fill="white" />


                    <VictoryPie
                        standalone={false}
                        radius={({ datum }) => 25 + datum.y * 25}
                        innerRadius={65}
                        labelRadius={100}
                        labelPlacement='parallel'
                        padAngle={1}
                        style={{
                            data: {
                                backgroundColor: 'black'
                            },
                            labels: {
                                fontSize: 10, fill: "#454545", fontWeight: 'bold'
                            },



                        }}
                        colorScale={global.colorData}
                        data={global.list}

                        events={[{
                            target: "data",
                            eventHandlers: {
                                onPressIn: () => {
                                    return [
                                        {
                                            target: "labels",
                                            mutation: ({ text, index }) => {
                                                console.log("=====>", text, index, global.CategoryList[index])

                                                if (text === `${Math.round(global.CategoryList[index].consumed_hrs)}%`) {
                                                  navigation.navigate('AddHourLife', { title: global.CategoryList[index].title, consumed_hrs: Math.round(global.CategoryList[index].consumed_hrs) })
                                                }

                                            }
                                        }

                                    ];
                                }
                            }
                        }]}
                    />

                    <VictoryLabel
                        textAnchor="middle"
                        verticalAnchor="middle"
                        style={{ color: '#28323B', lineHeight: 40, fontSize: 12, fontFamily: 'Montserrat-Bold', }}
                        x={SCREEN_WIDTH * 0.5} y={SCREEN_WIDTH * 0.5
                        }
                        // text={`${Math.round(global.item_progressRatisng)}%`}
                        text='Wi-Islam'
                    />
                </Svg>

                </View>


            </View>


        )
    

}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
        elevation: 5,
        marginLeft: 15, marginRight: 15
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
});

export default MyLifePlanGraph