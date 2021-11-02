import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, ImageBackground, FlatList, TouchableHighlight, Modal, Dimensions, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import Iconback from 'react-native-vector-icons/Entypo';
import Orientation from 'react-native-orientation';
import { baseUrl } from '../Api/COntstant';
import { VictoryChart, VictoryBar, VictoryGroup, VictoryTheme, VictoryAxis } from "victory-native";
import Svg from 'react-native-svg';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
const windowWidth = Dimensions.get('screen').width;
import moment from 'moment'

let your_data = []
var videoData = []
var arrayOfArrays = [];

    const MyMoodGraph = ({ navigation, route }) => {
        const [moodListData, setmoodListData] = useState('')

    

        useEffect(() => {
            console.log("chndfjnv===>", global.moodData, global.windowHeight, global.windowWidth);
            function _onOrientationDidChange(orientation) {
                if (orientation == 'PORTRAIT') {
                  Orientation.lockToLandscapeRight();
                }
                console.log(orientation);
              }
                Orientation.lockToLandscapeRight();
                Orientation.addOrientationListener(_onOrientationDidChange);
            
                //cleanup optional code
                return () => {
                   Orientation.unlockAllOrientations()
                   Orientation.removeOrientationListener(_onOrientationDidChange);
                };

            
        }, [navigation]);


        


   

        return (
            <View
                style={{ flex: 1, backgroundColor: 'white', }}>

                <View style={{ backgroundColor: '#FAE9D7', height: 60, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconback name='chevron-left' size={28} color='#000' style={{ marginLeft: 20, }} />
                        <Text style={{ fontSize: 16, color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>My Mood Graph</Text>
                    </TouchableOpacity>
                    <Image source={require('../images/life.png')} style={{ width: 28, height: 28, marginRight: 20 }} />
                </View>




                <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', marginLeft: 30 }}>

                    {/* <Svg style={{ width: wp('100%'), height: "100%", marginLeft: -20, }}> */}
                    <VictoryChart   width={global.windowWidth} height={global.windowHeight}   >
                        <VictoryAxis

                            dependentAxis={true}
                            style={{
                                grid: { strokeDasharray: "10", stroke: "#F1D2BC", },
                                ticks: { stroke: 'none' },
                            }}
                        />

                        <VictoryAxis
                            style={{
                            }} />


                        <VictoryGroup scale={{ x: "linear", y: "log" }} offset={7}
                            
                        >

                            {/* { global.moodData.map((item, index) => {
                                console.log("itemda---", item); */}
                                {/* return ( */}
                                    <VictoryBar
                                        barWidth={5}
                                        // domainPadding={{ x: 30 }}
                                        style={{
                                            data: { fill: "#BF8B65" }
                                        }}
                                        data={global.moodData}
                                        events={[{
                                            target: "data",
                                            eventHandlers: {
                                                onPressIn: () => {
                                                    return [
                                                        {
                                                            target: "data",
                                                            mutation: (props) => {

                                                                console.log("props=====>", props);
                                                            }
                                                        }
                                                    ];
                                                }
                                            }
                                        }]}
                                    />
                                {/* ) */}
                                    {/* })
                                } */}
                                
                

                        </VictoryGroup>
                    </VictoryChart>
                    {/* </Svg> */}
                </View>


            </View>


        )

    
}




export default MyMoodGraph