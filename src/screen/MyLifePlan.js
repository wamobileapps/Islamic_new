

import React, { Component } from 'react'
import { Text, StyleSheet, View, StatusBar, TouchableOpacity, Image, ScrollView } from 'react-native'
import { VictoryArea, VictoryChart, createContainer, VictoryTooltip, VictoryScatter, VictoryLine, VictoryAxis } from 'victory-native';
import { range, first, last, maxBy } from 'lodash';
import Svg, { Line } from 'react-native-svg';
import Orientation from 'react-native-orientation';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Iconback from 'react-native-vector-icons/Entypo';
import { baseUrl } from '../Api/COntstant';

const VictoryZoomVoronoiContainer = createContainer("cursor", "voronoi");

// const data = range(20,81).map((x) => ({x, y: x*x}));

const data = [
    { x: 1, y: 1 },
    { x: 3, y: 3 },
    { x: 5, y: 5 },
    { x: 7, y: 7 },
    { x: 9, y: 9 },
    { x: 11, y: 11 }
];

const findClosestPointSorted = (data, value) => {
    console.log("move curser==>", data, "val--->",value);
    if (value === null) return null;
    const start = first(data).x;
    const range = (last(data).x - start);
    const index = Math.round((value - start) / range * (data.length - 1));
    return data[index];
};

export default class Chart extends Component {
    state = {
        activePoint: null,
        // data: data,
        ymax: 0,
        graphData: []
    }


    componentDidMount() {
        Orientation.lockToLandscapeRight();
        Orientation.addOrientationListener(this._orientationDidChange);

        this.getGoalGraphData()
    }

    _orientationDidChange = (orientation) => {
        console.log(orientation);
    }


    async getGoalGraphData() {
        const token = await AsyncStorage.getItem('token')

        let params = {
            "user_id": global.userId
        }



        axios.post(baseUrl+ `goalChart`, params, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('====>graph chart', response.data.data)
                // global.goalData= response.data.data
                this.setState({ graphData: response.data.data })

                // this.state.graphData.map((item, index) => {
                //     console.log("=====>", item.age.age,"=====>", item.age.income);
                //     return { x: item.age.age, y: item.age.income }
                //   });
            })
            .catch((error) => {
                console.log('error', error)
            })
    }



    componentWillUnmount() {
        const graph_data = global.goalData.map((item, index) => {
            return { x: item.age.age, y: item.age.income }
        });
        Orientation.getOrientation((err, orientation) => {
            console.log(`Current Device Orientation: ${orientation}`);
        });

        Orientation.removeOrientationListener(this._orientationDidChange);
        this.setState({ ymax: maxBy(graph_data, function (o) { return o.y; }).y })

    }



    handleCursorChange(value) {
        const graph_data = global.goalData.map((item, index) => {
            return { x: item.age.age, y: item.age.income }
        });
        this.setState({
            activePoint: findClosestPointSorted(graph_data, value)
        });
    }



    render() {
        console.log("render list", global.goalData)
        const graph_data = global.goalData.map((item, index) => {
            return { x: item.age.age, y: item.age.income }
        });

        console.log("graph_data===>", graph_data);
        const { activePoint } = this.state;
        const point = activePoint ?
            <VictoryScatter name="scatter" data={graph_data} style={{ data: { size: 200, fill: '#ffffff', stroke: '#1bad53', strokeWidth: 2 } }} />
            : null;

     
        return (

            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <StatusBar hidden />

                <View style={{ backgroundColor: '#FAE9D7', height: 83, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconback name='chevron-left' size={28} color='#000' style={{ marginLeft: 20, }} />
                        <Text style={{ fontSize: 16, color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>MyLifePlan</Text>
                    </TouchableOpacity>
                    <Image source={require('../images/lifePlan.png')} style={{ width: 28, height: 28, marginRight: 20 }} />
                </View>


                <ScrollView>

                    <View style={{ marginBottom: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>

                        <View style={{ width: '8%',  }}>
                            <Text style={{ transform: [{ rotate: '-90deg' }], textAlign: 'center', fontSize: 10, fontFamily: 'Montserrat-Medium', fontStyle:'italic' }} >Salary</Text>
                        </View>
                    
                            <View style={{padding:10, }}>
                            <VictoryChart
                                height={400}
                                width={550}

                                containerComponent={
                                    //                     <VictoryZoomVoronoiContainer
                                    //                     //  voronoiDimension="x"
                                    //                     cursorDimension="x"
                                    //                     labelComponent={<VictoryTooltip style={{fill:'red'}}  flyoutStyle={{
                                    //                     fill:  'rgba(52, 52, 52, 0.8)',}}/>}
                                    //                       voronoiBlacklist={["scatter"]}
                                    //     // labels={({ datum }) => `${datum.x}, ${datum.y}`}
                                    //   labels={({datum}) => {

                                    //                         try {

                                    //                             return(`${datum.x}, ${datum.y}`)
                                    //                         } catch (error) {
                                    //                             console.log(error)
                                    //                         }
                                    //                     }}
                                    //                     />


                                    <VictoryZoomVoronoiContainer
                                        // voronoiDimension="x"
                                        
                                        cursorDimension="x"
                                        voronoiBlacklist={["scatter"]}
                                        labelComponent={<VictoryTooltip  style={{ fill: '#363636' }} flyoutStyle={{
                                            fill: '#F7DFCC',
                                        }} />}
                                        onCursorChange={(value) => { this.handleCursorChange(value) }}
                                        labels={cursor => {
                                            console.log("curser---", cursor.datum.x,  "====>",cursor.datum.y);
                                            try {

                                                return (cursor.datum.x ? `${cursor.datum.x}, ${Math.round(cursor.datum.y)}\ndjh` : null)
                                            } catch (error) {
                                                console.log(error)
                                            }
                                        }}
                                    />
                                }

                            >
                                <VictoryAxis

                                    dependentAxis={true}
                                    style={{
                                        grid: { strokeDasharray: "5", stroke: "#F1D2BC", },
                                        ticks: { stroke: 'none' },
                                    }}
                                />

                                <VictoryAxis
                                    style={{
                                    }} />
                                {/* <VictoryScatter data={data} /> */}

                                <VictoryLine
                                    style={{
                                        data: { stroke: "#D29F79", strokeWidth: 3 },
                                        parent: { border: "2px solid #ccc" }
                                    }}
                                    data={graph_data}
                                    // data={[
                                    //     {x: 30, y: 35000},
                                    //     {x: 35, y: 2806},
                                    //     {x: 29, y: 12356},
                                    //     {x: 34, y: 12356},
                                    //     {x: 31, y: 13580}
                                    // ]}
                                />
                                {point}

                                {/* <Line  x1= {90}  stroke="black" strokeWidth="1"/> */}
                                

                            </VictoryChart>
                            </View>
                       


                        
                    </View>
                    <View style={{ alignItems: 'center', justifyContent: 'center' , marginTop: -40, marginBottom:20 }}>
                            <Text style={{  textAlign: 'center', fontSize: 10, fontFamily: 'Montserrat-Medium', fontStyle:'italic' }} >Age</Text>
                        </View>
                        
                </ScrollView>
            </View>
        )
    }
}