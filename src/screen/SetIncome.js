import React from 'react'
import { View, Text, Image, StatusBar, Modal, StyleSheet, TouchableOpacity, TextInput, ScrollView } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import * as ImagePicker from 'react-native-image-picker'
import axios from 'axios';
import Iconback from 'react-native-vector-icons/Entypo';
import { baseUrl } from '../Api/COntstant';
import { RFValue } from 'react-native-responsive-fontsize';

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



 saveIncome=async()=>{

  // if(this.state.age != '' && this.state.income != ''){
  //   alert("Please add all fields")
  // }
  // else{
   
  //   const token = await AsyncStorage.getItem('token')

  //   let params = {


  //       "age": this.state.age,
  //       "income": this.state.income,
  //       "user_id": global.userId

  //   }

  //   axios.post(baseUrl+ `setIncome`, params, {
  //       headers: {
  //           'auth-token': token
  //       }
  //   })
  //       .then((response) => {
  //           console.log('====>mood list updated data', response)
            this.props.navigation.navigate("Setgoals")

  //       })
  //       .catch((error) => {
  //           console.log('error', error)
  //       })
  //     }
 }



  render() {
  
    return (
      <View style={{ flex: 1 , backgroundColor: 'white', }}>
        <StatusBar hidden />

        <View style={{backgroundColor: '#FAE9D7', height: 45, width: '100%',flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'  }}>
       
        <TouchableOpacity  onPress={() => this.props.navigation.goBack()}style={{ flexDirection: 'row' , alignItems: 'center'}}>
          <Iconback  name='chevron-left' size={24} color='#000' style={{  marginLeft: 20, }} />
          <Text style={{ fontSize: RFValue(13), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5,  }}>Set Income</Text>
        </TouchableOpacity>
        <Image source={require('../images/nameGoal.png')} style={{ width: 26, height: 26, marginRight: 20 }} />
      </View>

  

      <View style={{
                            marginLeft: 15, backgroundColor: '#fff', height: 57, marginTop: 40, alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput
                                placeholder="Age"
                                value={this.state.age}
                                // textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1, marginLeft:10,
                                    marginRight: 30,
                                    color: this.state.age ? '#000' : '#a9a9a9', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', fontSize: 13,
                                }}
                                onChangeText={text => this.setState({ age: text })}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                returnKeyLabel="Done"


                            />




                        </View>


                        <View style={{
                            marginLeft: 15, backgroundColor: '#fff', height: 57, marginTop: 20, alignItems: 'center',
                            flexDirection: 'row', marginRight: 15, borderRadius: 10, borderWidth: 1, borderColor: '#F2DEC9'
                        }}>


                            <TextInput
                                placeholder="Income"
                                value={this.state.income}
                                // textAlign={'center'}
                                placeholderTextColor='#a9a9a9'
                                style={{
                                    flex: 1, marginLeft:10,
                                    marginRight: 30,
                                    color: this.state.income ? '#000' : '#a9a9a9', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', fontSize: 13,
                                }}
                                onChangeText={text => this.setState({ income: text })}
                                autoCapitalize='none'
                                keyboardType='numeric'
                                returnKeyLabel="Done"


                            />




                        </View>




                        <TouchableOpacity onPress={()=>this.saveIncome()} style={{marginLeft: 100, marginRight: 100, backgroundColor: '#FAE9D7', height:41, borderRadius:22 , justifyContent: 'center', alignItems: 'center', marginTop:100}}>
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