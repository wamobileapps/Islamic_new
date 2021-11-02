

import React from "react";
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text, ToastAndroid, Dimensions, Image, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import Iconback from 'react-native-vector-icons/Entypo';
import { InputX, Button } from '../components/index';
import { TouchableOpacity } from "react-native";
import Header from '../components/header'
import { baseUrl } from '../Api/COntstant';

const screenWidth = Dimensions.get('window').width;


export default class SliderExample extends React.Component {
    state = {
        value: 0,
        optionsData: [],
        text: '',
        FirstValue: '',
        SecondValue: '',
        ThirdValue: '',
        FourthValue: '',
        FifthValue: '',
        allData: []
    };

    componentDidMount = () => {
        const tazkiaName = this.props.route.params.tazkiaName
        const id = this.props.route.params.tazkiaId
        console.log("====", id, tazkiaName, global.dateValue)
        // this.setState({FirstValue: this.state.optionsData[0]})

        this.getDetails();

    }


    getDetails = async () => {
        const id = this.props.route.params.tazkiaId
        const token = await AsyncStorage.getItem('token')
        console.log("auth token===", token, id)

        axios.get(baseUrl+ `purification/view/${id}/${global.dateValue}`, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {


                this.setState({ allData: response.data.data[0] })
                console.log('purification details list===>', this.state.allData)
                this.setState({ optionsData: response.data.data[0].default_options ? response.data.data[0].default_options : response.data.data[0].options })

            })
            .catch((error) => {
                console.log('error', error)
            })

    }




    updateList = async () => {

        const token = await AsyncStorage.getItem('token')
        const id = this.props.route.params.tazkiaId
        console.log("auth token===", global.userId)

        let params = {


            "purification": {
                "_id": id
            },
            "type": {
                "_id": global.purificationId
            },
            "options": [this.state.FirstValue ? this.state.FirstValue : this.state.optionsData[0],
            this.state.SecondValue ? this.state.SecondValue : this.state.optionsData[1],
            this.state.ThirdValue ? this.state.ThirdValue : this.state.optionsData[2],
            this.state.FourthValue ? this.state.FourthValue : this.state.optionsData[3],
            this.state.FifthValue ? this.state.FifthValue : this.state.optionsData[4]],
            "rating": this.state.value,
            "user_id": global.userId,
            "date": global.dateValue

        }

        console.log("params===>", params);

        axios.post(baseUrl+ `purification/daily/create`, params, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {

                console.log('purification update list data list===>', response)
                // alert(response.data.msg)
                this.props.navigation.navigate('Tazkia')
                // this.setState({optionsData: response.data.data.options})
                // ToastAndroid.show(response.data.msg, ToastAndroid.SHORT)

            })
            .catch((error) => {
                console.log('error', error)
            })

    }

    render() {
        const id = this.props.route.params.tazkiaId
        const tazkiaName = this.props.route.params.tazkiaName
        const tazkiaIcon = this.props.route.params.tazkiaIcon

        const left = this.state.value * (screenWidth - 40) / 100 - 15;

        const textValue = `Rating is: ${Math.floor(this.state.value)}`

        return (
            <View style={{ flex: 1, flexDirection: 'column', }} >
                <Header
                    navigation={this.props.navigation}
                    pageName={tazkiaName}
                    icon={tazkiaIcon}
                />
               


                <ScrollView style={{ marginBottom: 40 }}>
                    <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', }} enabled>

                        <View style={{
                            marginLeft: 15, backgroundColor: '#fff', height: 57, marginTop: 20, alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput
                                placeholder={this.state.optionsData[0]}
                                value={this.state.FirstValue}
                                textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1,
                                    marginRight: 30,
                                    color: this.state.FirstValue ? '#000' : '#a9a9a9', fontSize: 13, fontFamily: 'Montserrat-SemiBold', fontSize: 13,
                                }}
                                onChangeText={text => this.setState({ FirstValue: text })}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyLabel="Done"


                            />




                        </View>
                        <View style={{
                            marginLeft: 15, backgroundColor: '#fff', height: 57, marginTop: 20, alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput placeholder={this.state.optionsData[1]}
                                value={this.state.SecondValue}
                                textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1,
                                    marginRight: 30,
                                    color: '#000', fontSize: 13, fontFamily: 'Montserrat-SemiBold', fontSize: 13,
                                }}
                                onChangeText={text => this.setState({ SecondValue: text })}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyLabel="Done"


                            />




                        </View>

                        <View style={{
                            marginLeft: 15, backgroundColor: '#fff', height: 57, marginTop: 20, alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput placeholder={this.state.optionsData[2]}
                                value={this.state.ThirdValue}
                                textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1,
                                    marginRight: 30,
                                    color: '#000', fontSize: 13, fontFamily: 'Montserrat-SemiBold', fontSize: 13,
                                }}
                                onChangeText={text => this.setState({ ThirdValue: text })}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyLabel="Done"


                            />




                        </View>

                        <View style={{
                            marginLeft: 15, backgroundColor: '#fff', height: 57, marginTop: 20, alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput placeholder={this.state.optionsData[3]}
                                value={this.state.FourthValue}
                                textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1,
                                    marginRight: 30,
                                    color: '#000', fontSize: 13, fontFamily: 'Montserrat-SemiBold', fontSize: 13,
                                }}
                                onChangeText={text => this.setState({ FourthValue: text })}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyLabel="Done"


                            />




                        </View>

                        <View style={{
                            marginLeft: 15, backgroundColor: '#fff', height: 57, marginTop: 20, alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput placeholder={this.state.optionsData[4]}
                                value={this.state.FifthValue}
                                textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1,
                                    marginRight: 30,
                                    color: '#000', fontSize: 13, fontFamily: 'Montserrat-SemiBold', fontSize: 13,
                                }}
                                onChangeText={text => this.setState({ FifthValue: text })}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyLabel="Done"


                            />




                        </View>





                        <View style={{ margin: 20, marginTop: 50 }}>
                            <Slider
                                value={this.state.allData.default_options ? 0 : this.state.value}

                                onValueChange={value => this.setState({ value })}
                                step={1}
                                thumbTintColor='#C68849'
                                thumbTouchSize={{ width: 30, height: 30 }}
                                minimumValue={0}
                                maximumValue={10}
                                minimumTrackTintColor='#C68849'
                                maximumTrackTintColor='#FAE4CD'
                            />


                            <Text style={{ textAlign: 'center' }}>
                                {textValue}
                            </Text>

                        </View>


                        <TouchableOpacity onPress={() => this.updateList()} style={{ marginBottom: 20, elevation: 5, marginTop: 45, marginLeft: 60, marginRight: 60, backgroundColor: '#FAE9D7', height: 44, borderRadius: 20, justifyContent: 'center', alignItems: 'center' }} >
                            <Text style={{ marginLeft: 15, marginRight: 15, borderRadius: 28, color: '#000', fontSize: 15, fontFamily: 'Montserrat-Bold', }}>Update</Text>



                        </TouchableOpacity>

                    </KeyboardAvoidingView>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    }
});
