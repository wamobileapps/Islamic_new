import React from 'react'
import { View, Text, Image, StatusBar, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView, FlatList } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
import Iconback from 'react-native-vector-icons/Entypo';
import ProgressCircle from 'react-native-progress-circle'
import IconDown from 'react-native-vector-icons/Entypo'
import Orientation from 'react-native-orientation';
import { baseUrl } from '../Api/COntstant';
import { RFValue } from 'react-native-responsive-fontsize';

const goalSet = []
global.goalData = []
class Setgoals extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: 20,
            goalList: [],
            financial: '',
            incomeList: [],
            ageVal: 'Select Age',
            dropDown: '',
            checked: ''
        }
        this.didFocus = props.navigation.addListener("didFocus", (payload) =>
        Orientation.lockToPortrait()
      );

    }


    async componentDidMount() {
        Orientation.lockToPortrait();
        this.getGoalListData()
        this.getIncome()
    }

    async getIncome() {
        const token = await AsyncStorage.getItem('token')
        console.log("auth token", token)

        axios.get(baseUrl+ `getIncome`, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log("response age income===", response.data.userIncome);
                this.setState({ incomeList: response.data.userIncome })
            })
            .catch((error) => {
                console.log('error', error)
            })
    }


    async getGoalListData() {
        const token = await AsyncStorage.getItem('token')
        console.log("auth token", token)

        axios.get(baseUrl+ `goal/list`, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log("response lisat===", response.data.data);
                this.setState({ goalList: response.data.data })
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    selectItem(data, index) {

        data.item.isSelect = !data.item.isSelect;
        data.item.selectedClass = data.item.isSelect?styles.selected: styles.list;
        console.log("this.state.goalList", this.state.goalList);
        const indexx = this.state.goalList.findIndex(
            item => data.item._id === item._id
           );
           this.state.goalList[indexx] = data.item;



        goalSet.push(data.item._id)
        this.setState({checked: data.item._id})
        this.setState({
            goalList: this.state.goalList,
           });
        console.log("--->goalSet", goalSet,"-", data.item._id);
    }
    


    renderItem = (item, index) => {
   
        return (

            <TouchableOpacity onPress={() => this.selectItem(item, index)}
             style={[{ marginLeft: 15, marginBottom: 1, flexDirection: 'row', elevation: 2, justifyContent: 'center',
              backgroundColor: 'white', height: 35, width: 100, 
              borderRadius: 10, alignItems: "center", marginTop: 10 }, item.item.selectedClass]}>
                <Text style={{ textAlign: "center", fontFamily: "Montserrat-Bold", fontSize: RFValue(10), marginRight: 10, width: 50 }}>{item.item.name}</Text>
                <ProgressCircle
                    percent={`${Math.round(item.item.progress)}`}
                    radius={15}
                    borderWidth={2}
                    color="#ECC090"
                    shadowColor="#FCF5EC"
                    bgColor="#fff"
                >
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Bold', }}>{Math.round(item.item.progress)}</Text>
                        <Text style={{ fontSize: 6, fontFamily: 'Montserrat-Bold', }}>%</Text>
                    </View>

                </ProgressCircle>
            </TouchableOpacity>

        )
    }


    saveGoal = async () => {
        if(this.state.ageId != '' && this.state.financial != ''){
            alert("Please add all fields")
        }
        else{

        const token = await AsyncStorage.getItem('token')

        let params = {


            "age": this.state.ageId,
            "financial_needed": this.state.financial,
            "goals": goalSet,
            "user_id": global.userId,

        }



        axios.post(`http://112.196.64.119:8000/api/user/goal/set`, params, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('====>goal list updated data', response)
                this.getGoalGraphData()
                this.setState({ moodModal: false })
                this.props.navigation.navigate("MyLifePlan")
            })
            .catch((error) => {
                console.log('error', error)
            })
        }
    }

    async getGoalGraphData() {
        const token = await AsyncStorage.getItem('token')

        let params = {
            "user_id": global.userId
        }



        axios.post(`http://112.196.64.119:8000/api/user/goalChart`, params, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('====>graph chart set', response.data.data)
                global.goalData = response.data.data
              
            })
            .catch((error) => {
                console.log('error', error)
            })
    }

    incomeList(item) {
        console.log("item list name", item);
        return (
            <TouchableOpacity onPress={() => this.setState({ ageVal: item.item.age, dropDown: !this.state.dropDown, ageId: item.item._id })} style={{ marginTop: 10, marginLeft: 20 }}>
                <Text style={{fontSize: RFValue(9), fontFamily: 'Montserrat-Medium'}} >{item.item.age}</Text>
            </TouchableOpacity>
        )
    }


    render() {

        return (
            <View style={{ flex: 1, backgroundColor: 'white', }}>
                <StatusBar hidden />

                <View style={{ backgroundColor: '#FAE9D7', height: 45, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
                        <Text style={{ fontSize: RFValue(13), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Set Goal Data Entry</Text>
                    </TouchableOpacity>
                    <Image source={require('../images/nameGoal.png')} style={{ width: 28, height: 26, marginRight: 26 }} />
                </View>


                <ScrollView>

                    <View style={{ margin: 20, marginTop: 50 }}>

                        <Text style={{ fontSize: RFValue(11), fontFamily: 'Montserrat-Bold' }}>
                            Age (21 to 24) Range
                        </Text>

                        <TouchableOpacity onPress={() => this.setState({ dropDown: !this.state.dropDown })} style={{ height: 34, marginTop: 20, alignItems: 'center', flexDirection: 'row', borderWidth: 1, backgroundColor: '#fff', borderRadius: 2, borderColor: '#a9a9a9' }}>

                            <Text style={{
                                flex: 1, marginLeft: 20,
                                color: '#000', fontSize: RFValue(9), fontFamily: 'Montserrat-Medium',
                            }}>{this.state.ageVal}</Text>


                            <IconDown onPress={() => this.setState({ dropDown: !this.state.dropDown })} name={this.state.dropDown ? 'chevron-up' : 'chevron-down'} type='Entypo' size={15} style={{ marginRight: 20 }} />


                        </TouchableOpacity>
                        {this.state.dropDown ?
                            <View style={{ backgroundColor: 'white', borderLeftWidth: 1, borderLeftColor: '#a9a9a9', borderRightColor: '#a9a9a9', borderBottomColor: '#a9a9a9', borderRightWidth: 1, borderBottomWidth: 1, marginTop: -1, }}>
                                <FlatList
                                    data={this.state.incomeList}
                                    renderItem={(item) => this.incomeList(item)}
                                />
                            </View>

                            : null}







                    </View>


                    <View style={{ margin: 20, marginRight: 20, borderWidth: 1, borderColor: '#F2DEC9', paddingBottom: 20, borderRadius: 10, }}>
                        <Text style={{ fontFamily: 'Montserrat-SemiBold', fontSize: 13, margin: 20 }}>Goals</Text>

                        <FlatList
                            data={this.state.goalList}
                            numColumns={3}
                            key={3}
                            renderItem={(item, index) => this.renderItem(item, index)}
                        />
                    </View>

                    <View style={{ margin: 20, marginRight: 20, borderWidth: 1, borderColor: '#F2DEC9', paddingBottom: 20, borderRadius: 10, justifyContent: 'center', }}>
                        <Text style={{ marginLeft: 20, fontFamily: 'Montserrat-SemiBold', fontSize: 13, marginTop: 20 }}>Financial Need</Text>

                        <View style={{  height: 44, marginLeft: 100, marginRight:100,  justifyContent: 'center', marginTop: 20, alignSelf: 'center', flexDirection: 'row',  backgroundColor: '#fff', borderColor: '#CCC5C5', borderWidth: 1, borderRadius: 4, }}>
                        {/* <Text style={{ marginLeft: 20, fontFamily: 'Montserrat-SemiBold', fontSize: 13,  }}>Financial Need</Text> */}

                            <TextInput

                                placeholder="Financial Value"
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1,
                                    paddingTop: 10,
                                  
                                    paddingBottom: 10, textAlign: 'center',
                                    color: '#000', fontSize: RFValue(11), fontFamily: 'Montserrat-Medium', fontSize: 13, fontFamily: 'Montserrat-Medium'
                                  }}
                                value={this.state.financial}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                returnKeyLabel="next"
                                onChangeText={(text) => this.setState({ financial: text })}

                            />

                        </View>

                        
                    </View>


                   



                    <TouchableOpacity onPress={() => this.saveGoal()} style={{ marginBottom: 20, marginLeft: 100, marginRight: 100, backgroundColor: '#FAE9D7', height: 41, borderRadius: 22, justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontFamily: 'Montserrat-Bold', fontSize: 15 }}>Save</Text>
                    </TouchableOpacity>
                </ScrollView>
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
    list: {
        paddingVertical: 5,
        margin: 3,
        flexDirection: "row",
        backgroundColor: "white",
        justifyContent: "flex-start",
        alignItems: "center",
        zIndex: -1
       },
       selected: {backgroundColor: "#C18547"},

});

export default Setgoals