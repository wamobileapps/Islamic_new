import React from 'react'
import { View, Text, Image, StatusBar, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'react-native-image-picker'
import axios from 'axios';
import Iconback from 'react-native-vector-icons/Entypo';
import Slider from "react-native-slider";
import { baseUrl } from '../Api/COntstant';
import {RFValue} from 'react-native-responsive-fontsize'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class Goal extends React.Component {
  constructor() {
    super();
    this.state = {
        achieveGoal: '',
        money: '',
        achieve: '',
        value: 20,
       image :'',
       img: require('../images/plus.png')
    }


  }

   launchImageLibrary = () => {
    let options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const source = response
        console.log('response', source);
        const s = source
        this.setState({image:s})
        console.log("ssssss", this.state.image)
        // updateImage(response)
        // global.userImage = response.fileName
      }
    });

  }



 saveGoal=async()=>{
    if(this.state.achieveGoal != '' && this.state.money != '' && this.state.achieve != '' &&  this.state.value != ''){
      alert("Please add all fields")
    }
    else {
    const token = await AsyncStorage.getItem('token')

let formdata = new FormData();
    
   
    formdata.append("name",this.state.achieveGoal)
    formdata.append("required_money",this.state.money)
    formdata.append("steps", this.state.achieve)
    formdata.append("progress",this.state.value)
    formdata.append("image",{ uri: this.state.image.uri, name: this.state.image.fileName, type: 'image/jpeg'})
    formdata.append("user_id", global.userId)

    console.log("paramsssss",formdata);
    axios.post(baseUrl+ `goal/create`, formdata, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            console.log('====>mood list updated data', response)
            this.setState({ moodModal: false })
            this.props.navigation.navigate("SetIncome")
        })
        .catch((error) => {
            console.log('error', error)
        })
      }
 }



  render() {
  
    return (
      <View style={{ flex: 1 , backgroundColor: 'white', }}>
        <StatusBar hidden />

        <View style={{backgroundColor: '#FAE9D7', height: 45, width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'  }}>
       
        <TouchableOpacity  onPress={() => this.props.navigation.goBack()}style={{ flexDirection: 'row' , alignItems: 'center'}}>
          <Iconback  name='chevron-left' size={24} color='#000' style={{  marginLeft: 10, }} />
          <Text style={{ fontSize: RFValue(13), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5,  }}>Name of the Goal</Text>
        </TouchableOpacity>
        <Image source={require('../images/nameGoal.png')} style={{ width: 28, height: 26, marginRight: 26 }} />
      </View>

  

      <View style={{
                            marginLeft: 15, backgroundColor: '#fff', height: 57, marginTop: '5%', alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput
                                placeholder="How long will it take to achieve this goal?"
                                value={this.state.achieveGoal}
                                // textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1, marginLeft:10,
                                    marginRight: '10%',
                                    color: this.state.achieveGoal ? '#000' : '#a9a9a9', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', fontSize: 13,
                                }}
                                onChangeText={text => this.setState({ achieveGoal: text })}
                                autoCapitalize='none'
                                keyboardType='default'
                                returnKeyLabel="Done"


                            />




                        </View>


                        <View style={{
                            marginLeft: 15, backgroundColor: '#fff', height: 57, marginTop: 20, alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput
                                placeholder="How much money will you require?"
                                value={this.state.money}
                                // textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1, marginLeft:10,
                                    marginRight: '10%',
                                    color: this.state.money ? '#000' : '#a9a9a9', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', fontSize: 13,
                                }}
                                onChangeText={text => this.setState({ money: text })}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                returnKeyLabel="Done"


                            />




                        </View>


                        <View style={{
                            marginLeft: 15, backgroundColor: '#fff', marginTop: 20, alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput
                                placeholder="What 5 steps do you need to take to achieve this goal?"
                                value={this.state.achieve}
                                multiline={true}
                                // textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1, marginLeft:10,
                                    marginRight: '10%',
                                    color: this.state.achieve ? '#000' : '#a9a9a9', 
                                    fontFamily: 'Montserrat-SemiBold', fontSize: RFValue(11),
                                }}
                                onChangeText={text => this.setState({ achieve: text })}
                                autoCapitalize='none'
                                keyboardType='email-address'
                                returnKeyLabel="Done"


                            />




                        </View>

                        <View  style={{ height: hp('20%'), justifyContent: 'center', alignItems: 'center',
                            marginLeft: 15, backgroundColor: '#FAE9D7', marginTop: 20, alignItems: 'center',
                           marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>

                            <TouchableOpacity onPress={() =>this.launchImageLibrary()}>
                           {this.state.image ? 
                            <Image source={this.state.image } style={{height: 100,width:100, resizeMode: 'contain'}} /> 
                            :  <Image source={this.state.img} style={{height: 60,width:60}} /> }
                            </TouchableOpacity>

                            <Text style={{fontSize: 13, fontFamily: 'Montserrat-Bold', color: '#DCB58D', marginLeft: 10}}>Add Image</Text>


                        </View>

                        <View style={{ margin: 20, marginTop: 30 }}>
                        <Slider
                                    style={{ marginTop: 20 }}
                                    value={this.state.value}
                                    onValueChange={value => this.setState({ value })}
                                    step={1}
                                    thumbTintColor='#C68849'
                                    thumbTouchSize={{ width: 30, height: 30 }}
                                    minimumValue={20}
                                    maximumValue={80}
                                    minimumTrackTintColor='#C68849'
                                    maximumTrackTintColor='#FAE4CD'
                                />


                            <Text style={{ textAlign: 'center' }}>
                            Accomplished
                            </Text>

                        </View>


                        <TouchableOpacity onPress={()=>this.saveGoal()} style={{marginLeft: 100, marginRight: 100, backgroundColor: '#FAE9D7', height:41, borderRadius:22 , justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{fontFamily: 'Montserrat-Bold', fontSize: 13}}>Save</Text>
                        </TouchableOpacity>



       

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

});

export default Goal