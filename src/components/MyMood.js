
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, Dimensions, FlatList } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import Slider from "react-native-slider";
import { RadioButton } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { baseUrl } from '../Api/COntstant'
import { RFValue } from "react-native-responsive-fontsize";



const img1 = require('../images/1.png')
const img2 = require('../images/2.png')
const img3 = require('../images/3.png')
const img4 = require('../images/4.png')
const img5 = require('../images/5.png')
const img6 = require('../images/6.png')
const img7 = require('../images/7.png')
const img8 = require('../images/8.png')
const img9 = require('../images/9.png')
const img10 = require('../images/10.png')


var ratingArray = []
var updatedArrayX = [];
const updatedArrayIndex = []
const allID = []
const totalRating = []
const width = Dimensions.get('window').width
const height = Dimensions.get('window').height
const DATA = [
    {
        id: 0,
        name: 'I Am In Control'
    },
    {
        id: 1,
        name: "My Emotion Is In Control"
    }
];




const windowWidth = Dimensions.get('screen').width;

export default class myMood extends Component {

    constructor() {
        super();

        this.state = {
            dataToRenderCircleX: [],
            dataToRenderCircleY: [{ text: 'Kind', id: 0, }, { text: 'Patient', id: 1, }, { text: 'Beaten', id: 2, }],
            dataToRenderCircleZ: [{ text: 'Brave', id: 0, }, { text: 'Valuable', id: 1, }, { text: 'Weary', id: 2, }],
            List: [],
            circleX: true,
            circleY: false,
            circleZ: false,
            atWork: "",
            iAm: "I Am In Control",
            selectText: false,
            work: '',
            user_mood: '',
            moodModal: '',
            selectName: '',
            value: 2,
            selectId: '',
            allResult: [],
            checkExistData: false,
            textOne: true,
            textTwo: false,
            click: null,
            bgColor: 'white',
            controlModal: false,
            checked: '',
            controlText: '',
            borderColor: '#DFAF8C'


        }
    }
    componentDidMount() {
        updatedArrayX = [];
        console.log("dbefjdgthg", this.state.dataToRenderCircleX, updatedArrayX);
        this.MyMood()
    }




    MyMood = async () => {

        const token = await AsyncStorage.getItem('token')



        axios.get(baseUrl + `mymood/list/${global.dateValue}`, {
            headers: {
                "auth-token": token
            }
        })
            .then((response) => {
                // console.log('response====================',response.data.moodList)
                this.setState({
                    List: response.data.moodList
                });



            })
            .catch((error) => {
                console.log('error', error)
            })
    }



    selectItem = (item, index) => {
        console.log("item====>", item);
        this.setState({ selectName: item.name, selectId: item._id })

        if (this.state.dataToRenderCircleX.length > 0) {
            if (this.state.checkExistData === true) {

                this.setState({ dataToRenderCircleX: [] })
                console.log("exist: ", this.state.dataToRenderCircleX);
                updatedArrayX.push({ "id": index, "name": item.name })
                updatedArrayIndex.push(item._id)
                this.setState({ checkExistData: false })
            }
            // console.log(this.state.dataToRenderCircleX);
            else {
                if (this.state.dataToRenderCircleX.filter(e => e.name === item.name).length > 0) {

                    const indexx = this.state.dataToRenderCircleX.findIndex(x => x.name === item.name);
                    updatedArrayX.splice(indexx, 1);
                    updatedArrayIndex.splice(indexx, 1);
                    // this.setState({moodModal:false})
                }
                else {

                    if (this.state.dataToRenderCircleX.length < 3) {

                        updatedArrayX.push({ "id": index, "name": item.name })
                        updatedArrayIndex.push(item._id)
                    }
                }
            }


        } else {

            updatedArrayX.push({ "id": index, "name": item.name })
            updatedArrayIndex.push(item._id)

        }

        this.setState({
            dataToRenderCircleX: true,
            dataToRenderCircleX: updatedArrayX
        });


    };

    CircleX = () => {
        this.setState({
            circleX: true,
            circleY: false,
            circleZ: false,
        });
    }
    CircleY = () => {
        this.setState({
            circleX: false,
            circleY: true,
            circleZ: false,
            borderColor: 'white'
        });
    }
    CircleZ = () => {
        this.setState({
            circleY: false,
            circleX: false,
            circleZ: true,
            borderColor: '#DFAF8C',
            controlModal: !this.state.controlModal
        });
    }



    renderItem = ({ item, index }) => {

        console.log("====>", (windowWidth - 40) / 10);
        return (
            <TouchableOpacity disabled={this.state.circleZ == false && this.state.circleY == false ? false : true} onPress={() => this.selectItem(item, index)}
                style={{
                    width: wp('22%'), borderRadius: 2, height: 27, elevation: 1, marginLeft: '2%', marginTop: 10,
                    backgroundColor: this.state.dataToRenderCircleX.filter(e => e.name === item.name).length > 0 ? '#ECCBB2' : "white",
                    justifyContent: 'center', alignItems: 'center'
                }}>
                <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(8), color: '#454545' }}>{item.name}</Text>
            </TouchableOpacity>

 

        )

    }

    updateMood = async () => {
        console.log("heyyyy :  ", updatedArrayIndex);

        // if (allID.length == 3 && this.state.atWork != '' && this.state.iAm != '') {
        const token = await AsyncStorage.getItem('token')

        console.log("this.state.dataToRenderCircleX.length===>", global.userId, this.state.dataToRenderCircleX.length, "===", this.state.dataToRenderCircleX.length <= 3)




        let params = {
            "moods": updatedArrayIndex,
            "rating": this.state.value,
            "work": this.state.atWork,
            "user_mood": this.state.iAm,
            "date": global.dateValue,
            "user_id": global.userId
        }


        console.log("====>params", params);


        axios.post(`http://112.196.64.119:8000/api/user/moods/daily/create`, params, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {

                console.log('====>mood list updated data', response.data.data)
               


                this.setState({ moodModal: false, circleX: false, circleY: false })

            })
            .catch((error) => {
                console.log('error', error)
            })


    }


    selectTextOne = (item, index) => {
        // alert(index)
        // this.setState({click: index})
    }

    selectTextTwo = () => {
        this.setState({ textOne: false, textTwo: true })
    }



    onPress = (item) => {
        this.setState({ click: item.id, iAm: item.name })
    }




    renderItemData = ({ item, index }) => {

        const backgroundColor = item.id === this.state.click ? "#DAA27A" : "white";

        return (
            <TouchableOpacity onPress={() => this.onPress(item)} style={{ justifyContent: 'center', backgroundColor: backgroundColor, height: 30, width: 100, borderColor: "#C38B61", borderRadius: 12, alignSelf: "center", borderWidth: 1, marginTop: 10 }}>
                <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: 10, }}>{item.name}</Text>
            </TouchableOpacity>

        )

    }


    returnOk = () => {
        // this.setState({moodModal: !this.state.moodModal})
        this.setState({ controlText: this.state.checked, controlModal: !this.state.controlModal, })
        this.setState({ moodModal: !this.state.moodModal })
        // setTimeout(() => {

        // }, 100)

    }



    setControlValue() {
        this.setState({ controlModal: !this.state.controlModal })
        this.CircleZ()
    }

    render() {
        
        const moodval = this.state.value == 1 ? img1 : this.state.value == 2 ? img2 : this.state.value == 3 ? img3 :
          this.state.value == 4 ?img4  : this.state.value == 5 ? img5 : this.state.value == 6 ? img6 : this.state.value == 7 ? img7 : 
          this.state.value == 8 ? img8 : this.state.value == 9 ? img9 :  this.state.value == 10 ? img10 : img1
          console.log("rating value====>", this.state.value, moodval);
        return (

            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: '6%', marginLeft: 20, marginRight: 20 }}>
                    <View style={{ flexDirection: 'row', }}>

                        <TouchableOpacity disabled={this.state.circleY != '' && this.state.circleZ != '' ? false : true} onPress={() => this.CircleX()}
                            style={{
                                width: wp('47%'), height: wp('47%'), borderRadius: 100, marginLeft: 30, backgroundColor: this.state.circleX ? 'rgba(222,184,145,1)' : "rgba(255,255,255,0.6)",
                                borderWidth: 2, borderColor: this.state.circleX ? 'rgba(248,233,218,0.4)' : 'rgba(222,184,145,0.3)', zindex: 1,
                            }}>
                            <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(12), marginTop: 20, marginBottom: 10, color: '#454545' }}> I Am</Text>



                            {this.state.dataToRenderCircleX.map((item) => {

                                return (

                                    <View pointerEvents={this.state.circleY != '' && this.state.circleZ != '' ? 'auto' : 'none'} style={{ flexDirection: "column", justifyContent: "center", marginTop: 5, alignItems: 'center' }}>

                                        <View style={{ height: 15, width: wp('20%'), borderColor: "black", borderRadius: 8, alignItems: "center", justifyContent: 'center', backgroundColor: '#F9F1EB', elevation: 2 }}>
                                            <Text style={{ textAlign: "center", fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold', color: '#454545' }}>{item.name}</Text>

                                        </View>
                                    </View>
                                )
                            })}
                        </TouchableOpacity>

                        <View>
                            <TouchableOpacity disabled={this.state.dataToRenderCircleX.length == 3 && this.state.circleZ == false && this.state.iAm != '' ? false : true} onPress={() => this.CircleY()}
                                style={{
                                    width: wp('47%'), height: wp('47%'), borderRadius: 100, right: 30, backgroundColor: this.state.circleY ? 'rgba(222,184,145,1)' : "rgba(255,255,255,0.6)", zindex: 1,
                                    borderWidth: 2, borderColor: this.state.circleY ? 'rgba(248,233,218,0.4)' : 'rgba(222,184,145,0.3)',
                                }}>
                                <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: 20, fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', color: '#454545' }}>Location </Text>

                                <View style={{ height: hp('6.5%'), width: wp('26%'), borderColor: this.state.borderColor, backgroundColor: 'white', borderWidth: 2, borderRadius: 12, alignSelf: "center", marginTop: '10%', }}>

                                    <TextInput
                                        editable={this.state.dataToRenderCircleX.length == 3 && this.state.circleZ == false && this.state.iAm != '' ? true : false}
                                        placeholder={this.state.work}
                                        autoCapitalize='words'
                                        // placeholderTextColor='#a9a9a9'
                                        style={{ fontSize: RFValue(9), fontFamily: 'Montserrat-Medium', color: '#000' }}
                                        value={this.state.atWork}
                                        multiline={true}

                                        keyboardType='email-address'
                                        returnKeyLabel="next"
                                        onChangeText={(text) => this.setState({ atWork: text })}
                                        onFocus={() => this.CircleY()}
                                    />

                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View>
                        <TouchableOpacity disabled={this.state.atWork && this.state.dataToRenderCircleX.length == 3 ? false : true} onPress={() => this.CircleZ()}
                            style={{ width: wp('47%'), height: wp('47%'), borderRadius: 100, bottom: 50, backgroundColor: this.state.circleZ ? 'rgba(222,184,145,1)' : "rgba(255,255,255,0.6)", borderWidth: 2, borderColor: this.state.circleZ ? 'rgba(248,233,218,0.4)' : 'rgba(222,184,145,0.3)', zindex: 1, }}>
                            <Text style={{ marginTop: 30, textAlign: "center", fontFamily: "Montserrat-Bold", justifyContent: 'center', fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', color: '#454545' }}>Control</Text>

                            <View pointerEvents={this.state.atWork && this.state.dataToRenderCircleX.length == 3 ? 'auto' : 'none'}
                                style={{ height: hp('5%'), backgroundColor: 'white', width: wp('26%'), borderColor: '#DFAF8C', borderWidth: 2, borderRadius: 12, alignSelf: "center", marginTop: 17, justifyContent: 'center', }}>

                                <Text onPress={() => this.setControlValue()} style={{ padding: 2, textAlign: "center", fontSize: RFValue(9), fontFamily: 'Montserrat-SemiBold', color: '#454545' }}>{this.state.controlText}</Text>

                            </View>
                        </TouchableOpacity>
                    </View>
                </View>


                <ScrollView style={{ flex: 1, marginBottom: 5, marginTop: -30, marginLeft: '2%', marginRight: '2%' }}>
                    <View>
                        <FlatList
                            data={this.state.List}
                            renderItem={(item, index) => this.renderItem(item, index)}
                            style={{ marginBottom: 0 }}
                            // style={{ marginBottom: 5, backgroundColor: 'rgb(248,244,242)',marginTop: -10,marginLeft: -4  }}
                            //   contentContainerStyle={{alignItems: "center",}}
                            keyExtractor={item => item.id}
                            numColumns={4}
                            key={4}

                        />
                    </View>
                </ScrollView>


                {this.state.controlModal ?
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.controlModal}
                        onRequestClose={() => {
                        }}
                    >
                        <View style={styles.centeredView}>


                            <View style={{
                                width: '80%',
                                backgroundColor: "white",
                                borderRadius: 20,
                                padding: 15,

                                shadowColor: "#000",
                                shadowOffset: {
                                    width: 0,
                                    height: 2
                                },
                                shadowOpacity: 0.25,
                                shadowRadius: 4,
                                elevation: 5
                            }}>
                                <Text style={{ margin: 10, fontSize: 16, fontFamily: 'Montserrat-Bold' }}>Select Any Options</Text>

                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#c9c9c9', width: '100%' }} />
                                <View style={{ margin: 20 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center', }}>
                                        <RadioButton
                                            color='#C28647'
                                            uncheckedColor='#F8DFC5'
                                            value="I Am In Control"
                                            status={this.state.checked === 'I Am In Control' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ checked: 'I Am In Control' })}
                                        />
                                        <Text style={{ marginLeft: 20, fontSize: RFValue(12), fontFamily: 'Montserrat-Regular', color: '#454545' }}>I Am In Control</Text>


                                    </View>

                                    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                        <RadioButton
                                            color='#C28647'
                                            uncheckedColor='#F8DFC5'
                                            value="My Emotion Is In Control"
                                            status={this.state.checked === 'My Emotion Is In Control' ? 'checked' : 'unchecked'}
                                            onPress={() => this.setState({ checked: 'My Emotion Is In Control' })}
                                        />
                                        <Text style={{ marginLeft: 20, fontSize: RFValue(12), fontFamily: 'Montserrat-Regular', color: '#454545' }}>My Emotion Is In Control</Text>

                                    </View>


                                </View>

                                <View style={{ borderBottomWidth: 1, borderBottomColor: '#c9c9c9' }} />

                                <View style={{ margin: 10, flexDirection: 'row', justifyContent: 'flex-end', marginRight: 40 }}>
                                    <Text onPress={() => this.setState({ controlModal: !this.state.controlModal })} style={{ marginLeft: 20, fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>Cancel</Text>
                                    <Text onPress={() => this.returnOk()} style={{ marginLeft: 30, fontSize: 14, fontFamily: 'Montserrat-SemiBold' }}>OK</Text>





                                </View>

                            </View>




                        </View>
                    </Modal>
                    : null}


                {this.state.moodModal == true ?
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={this.state.moodModal}
                        onRequestClose={() => {
                            alert("Modal has been closed.");
                            this.setState({ moodModal: !this.state.moodModal });
                        }}
                    >
                        <View style={styles.centeredView}>

                            <View style={styles.modalView}>

                                <TouchableOpacity onPress={() => this.updateMood()} style={{ right: 10, position: 'absolute', top: 10 }}>
                                    <Image source={require('../images/close.png')} style={{ width: 20, height: 21, }} />
                                </TouchableOpacity>

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
                                    <View style={{ width: 40, height: 40, backgroundColor: '#FAE4CD', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: 12, color: '#454545' }}>-VE</Text>
                                    </View>

                                    <View style={{ width: 40, height: 40, backgroundColor: '#FAE4CD', borderRadius: 20, alignItems: 'center', justifyContent: 'center' }}>
                                        <Text style={{ textAlign: 'center', fontFamily: 'Montserrat-SemiBold', fontSize: 12, color: '#454545' }}>+VE</Text>
                                    </View>
                                </View>


                                <Slider
                                    style={{ marginTop: 20 }}
                                    value={this.state.value}
                                    onValueChange={value => this.setState({ value })}
                                    step={1}
                                    thumbTintColor='#C68849'
                                    thumbTouchSize={{ width: 30, height: 30 }}
                                    minimumValue={0}
                                    maximumValue={10}
                                    minimumTrackTintColor='#C68849'
                                    maximumTrackTintColor='#FAE4CD'
                                />
                                <View style={{flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                                <Text style={{ textAlign: 'center' }}>Rating is : {this.state.value}</Text>
                                <Image source={moodval} style={{width: 20, height: 20, marginLeft: 5}}/>
                                </View>

                            </View>

                        </View>
                    </Modal>
                    : null}



            </View>

        )
    }

}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",


        backgroundColor: 'rgba(0,0,0,0.4)'
    },
    modalView: {
        marginLeft: 20, marginBottom: 20, marginRight: 20,
        width: '80%',
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,

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
        fontSize: 15,
        fontFamily: 'Montserrat-Bold',
        marginTop: 10,
        textAlign: "center"
    }
});
