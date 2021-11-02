import React, { Component, useState, useEffect } from 'react';
import { View, Text, Image, KeyboardAvoidingView, ScrollView, Keyboard, TouchableOpacity, ImageBackground, TextInput, Touchable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'
import Icon3 from 'react-native-vector-icons/MaterialCommunityIcons'
import Iconpencil from 'react-native-vector-icons/FontAwesome'
import Icon2 from 'react-native-vector-icons/Entypo'
import * as ImagePicker from 'react-native-image-picker'
import AsyncStorage from "@react-native-community/async-storage";
import axios from 'axios';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { baseUrl } from '../Api/COntstant';

const upImage = require('../images/sign1.png')


function UserProfile({ navigation }) {
  const [firstName, setFirstName] = useState('jasmi Beem')
  const [password, setPassword] = useState('')
  const [confirmPassword, setconfirmPassword] = useState('')
  const [visible, setVisible] = useState(false)
  const [datee, setDatee] = useState(new Date())
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('abc@gmail.com')
  const [img, setImg] = useState('https://www.w3schools.com/howto/img_avatar.png')
  const [value, setValue] = useState(false)
  const [name, setName] = useState(false)
  const[imageUser, setUserImage] = useState('')
  const [address, setAddress] = useState(' NY 11873')
  const [adressVal, setAddressVal] = useState(false)

  useEffect(()=>{

    const unsubscribe = navigation.addListener('focus', () => {
     getProfile()
  });

  return unsubscribe;
}, [navigation]);

const getProfile=async()=>{
  const token = await AsyncStorage.getItem('token')
  console.log("auth token", token)

 var data = '';

     
    
    axios.post(baseUrl+ 'me', data, {
      headers: {
      "auth-token": token
  }})      
    .then((response) => {
      console.log('response',response.data)
      setUserImage(response.data.profile_image)
      // global.userImage = response.data.profile_image

    })
    .catch((error) => {
      console.log('error',error)
      // dispatch(userUpdateProfileFail())

    })


}


  const launchImageLibrary = () => {
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
        setImg(s)
        console.log("ssssss", img)
        updateImage(response)
        global.userImage = response.fileName
      }
    });

  }

  const updateImage=async(response)=>{
    let formdata = new FormData();
    // formdata.append("profile_image",   { uri: img.uri, name: img.fileName, type: 'image/jpeg'})
    formdata.append("profile_image",   { uri: response.uri, name: response.fileName, type: 'image/jpeg'})

    const token = await AsyncStorage.getItem('token')
    var params = null

    // params = {
    //   "profile_image": img
    // }

    var headers = {
      "auth-token": token,
      'Content-Type': 'multipart/form-data'
    }

    axios.patch(baseUrl+ `updateUserImage/${global.id}`, formdata, {
      headers
    }).then((res) => {
      // alert(res.data.msg)
     
      global.userImage = response.fileName
      getProfile()
      console.log("res-----", res.data,  "====", global.userImage)
      // global.email = res.data.email
    })
  }


  const updateEmail= async()=>{
   

    const token = await AsyncStorage.getItem('token')
    var params = null

    params = {
      "email": email
    }

    var headers = {
      "auth-token": token
    }

    axios.patch(baseUrl+ `update/${global.id}`, params, {
      headers
    }).then((res) => {
      // alert(res.data.msg)
      console.log("res-----", res.data)
      global.email = res.data.email
    })

  }

  const updateName = async()=>{
    const token = await AsyncStorage.getItem('token')
    var params = null

    params = {
      "name": firstName
    }

    var headers = {
      "auth-token": token
    }

    axios.patch(baseUrl+ `update/${global.id}`, params, {
      headers
    }).then((res) => {
      // alert(res.data.msg)
      console.log("res-----", res)
      global.userName = res.data.name
    })
  }

  const editName=()=>{
    setName(true)
    setFirstName('')
  }

  const editEmail=()=>{
    setValue(true)
    setEmail('')
  }

  const editAddress=()=>{
    setAddressVal(true)
    setAddress('')
  }

  const updateAddress = async()=>{
    const token = await AsyncStorage.getItem('token')
    var params = null

    params = {
      "address": address
    }

    var headers = {
      "auth-token": token
    }

    axios.patch(baseUrl+ `update/${global.id}`, params, {
      headers
    }).then((res) => {
      // alert(res.data.msg)
      console.log("res-----", res)
      global.userName = res.data.name
    })
  }


  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}
   
    >

<ImageBackground source={upImage} style={{ width: wp('100%'), height: hp('31%'), }}>

<Text style={{ fontSize: 22, color: '#000', textAlign: 'center', marginTop: '25%', color: '#454545', fontFamily: 'Montserrat-ExtraBold' }}> User Profile</Text>

</ImageBackground>

      <ScrollView style={{ marginTop: '-30%', top: 10}}>
        <KeyboardAvoidingView style={{ flex:1, width: '90%', marginRight: 20, marginLeft: 20, justifyContent: "center", }} behavior="padding" enabled >

      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}


        <View style={{ backgroundColor: "white", elevation: 5, borderRadius: 30, alignItems: 'center', marginBottom: 20,  }}>
          <TouchableOpacity onPress={() => launchImageLibrary()}>
            <Image source={{uri: imageUser ? `http://112.196.64.119:8000/users/${imageUser}` : 'https://www.w3schools.com/howto/img_avatar.png' }} style={{ width: 80, height: 80, borderRadius: 40, marginTop: 20 }} />

            <Icon3 name="circle-edit-outline" size={20} color='#C18546' style={{position: 'absolute', bottom:0, right: 0, marginLeft: 5}}  />


          </TouchableOpacity>
          <Text style={{ alignSelf: "center", fontSize: 13, color: '#000', marginTop: 10, fontFamily: 'Montserrat-SemiBold' }}>{global.userName}</Text>
          <View style={{ flexDirection: "row", alignSelf: "center", marginTop: 5 }}>
            <Icon name='call' size={15} style={{ marginRight: 8 }} />
            <Text style={{ fontSize: 13, fontWeight: "700", marginBottom: 20, fontFamily: 'Montserrat-Medium', }} >718-565-8493</Text>
          </View>
        </View>

        <View style={{ elevation: 5,  backgroundColor: "white", borderRadius: 30,  width: '100%',  marginBottom: 40}}>

          <View style={{ flexDirection: "row", alignItems: 'center', marginLeft: 30, marginTop: 20 }}>
            <Icon3 name='email' size={17} />
            <View style={{ width: '80%', }}>
              <Text style={{ fontFamily: 'Montserrat-Light',marginLeft: 10,  fontSize: 10, color: '#7D7D7D', marginBottom: value ? -15 : 0 }}>Email</Text>
              {value ?
                <TextInput
                  placeholderTextColor='#000'
                  style={{ width: '75%', marginLeft: 5, fontSize: 13, fontFamily: 'Montserrat-Medium', color: '#000'}}
                  value={email}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  autoFocus={true}
                  returnKeyLabel='done'
                  onChangeText={text => setEmail(text)}
                  onSubmitEditing={()=>updateEmail()} />
                :
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#000', marginLeft: 10 }}>{global.email}</Text>
              }
            </View>


            <Icon3 name="pencil" size={13} style={{ marginLeft: 8 }} onPress={() => editEmail()} />
          </View>
          <View style={{ borderBottomWidth: 0.2, borderBottomColor: '#c9c9c9', marginTop: value ? -5 : 10, marginLeft: 30, marginRight: 30 }} />



          <View style={{ flexDirection: "row", marginLeft: 30,  marginTop: 18 }}>
            <Iconpencil name='user' size={17} style={{marginTop:8}} />
            <View style={{ marginLeft: 10, width: '80%', }}>
              <Text style={{ fontFamily: 'Montserrat-Light', fontSize: 10, color: '#7D7D7D', marginBottom: name ? -15 : 0 }}> Name</Text>
              {name ?
                <TextInput
                  placeholderTextColor='#000'
                  style={{ width: '70%', fontSize: 13, fontFamily: 'Montserrat-Medium', color: '#000' }}
                  value={firstName}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  autoFocus={true}
                  returnKeyLabel='done'
                  onChangeText={text => setFirstName(text)} 
                  onSubmitEditing={()=>updateName()}/>
                :
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#000',marginLeft: 4 }}>{global.userName}</Text>
              }

            </View>

            <Icon3 name="pencil" size={13} style={{ marginTop:8, marginLeft: 5}} onPress={() => editName()} />
          </View>
          <View style={{ borderBottomWidth: 0.2, borderBottomColor: '#c9c9c9', marginTop: name ? -5 : 10, marginLeft: 30, marginRight: 30 }} />


          <View style={{ flexDirection: "row", marginLeft: 30, alignItems: 'center', marginTop: 20 }}>
            <Icon2 name='lock-open' size={17} />
            <View style={{ marginLeft: 10, width: '80%', }}>
              <Text style={{ fontFamily: 'Montserrat-Light', fontSize: 10, color: '#7D7D7D' }}>Password</Text>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#363636' }}>**********</Text>
            </View>

            <Icon3 name="pencil" size={13} style={{ marginRight: 20 }} onPress={() => navigation.navigate('ChangePassword')} />
          </View>
          <View style={{ borderBottomWidth: 0.2, borderBottomColor: '#c9c9c9', marginTop: 10, marginLeft: 30, marginRight: 30 }} />



          <View style={{ flexDirection: "row", marginLeft: 30, alignItems: 'center', marginTop: 20 }}>
            <Icon2 name='lock-open' size={17} />
            <View style={{ marginLeft: 10, width: '80%', }}>
              <Text style={{ fontFamily: 'Montserrat-Light', fontSize: 10, color: '#7D7D7D' }}>Pin</Text>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#363636' }}>*****</Text>
            </View>

            <Icon3 name="pencil" size={13} style={{ marginRight: 20 }} onPress={()=>navigation.navigate('ChangePin')} />
          </View>
          {/* <View style={{ borderBottomWidth: 0.2, borderBottomColor: '#c9c9c9', marginTop: 10, marginLeft: 30, marginRight: 30 }} />

          <View style={{ flexDirection: "row", marginLeft: 30, alignItems: 'center', marginTop: 20, marginBottom: 20 }}>
            <Icon2 name='location-pin' size={17} />
            <View style={{ marginLeft: 10, width: '80%', }}>
              <Text style={{ fontFamily: 'Montserrat-Light', fontSize: 10, color: '#7D7D7D' }}>Address</Text>
              <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#363636', width: '70%' }}>801 LongView Avenue Emhurst, NY 11873</Text>
            </View>

            <Icon3 name="pencil" size={13} style={{ marginRight: 20 }} />
          </View> */}

          <View style={{ flexDirection: "row", marginLeft: 30,  marginTop: 18 }}>
          <Icon2 name='location-pin' size={17} />
            <View style={{ marginLeft: 10, width: '80%', }}>
              <Text style={{ fontFamily: 'Montserrat-Light', fontSize: 10, color: '#7D7D7D', marginBottom: name ? -15 : 0 }}> Address</Text>
              {adressVal ?
                <TextInput
                  placeholderTextColor='#000'
                  style={{ width: '70%', fontSize: 13, fontFamily: 'Montserrat-Medium', color: '#000' }}
                  value={address}
                  autoCapitalize='none'
                  keyboardType='email-address'
                  autoFocus={true}
                  returnKeyLabel='done'
                  onChangeText={text => setAddress(text)} 
                  onSubmitEditing={()=>updateAddress()}/>
                :
                <Text style={{ fontFamily: 'Montserrat-Medium', fontSize: 13, color: '#000',marginBottom: 15 }}>{address}</Text>
              }

            </View>

            <Icon3 name="pencil" size={13} style={{ marginTop:8, marginLeft: 5, }} onPress={() => editAddress()} />
          </View>
          

          


       
      </View>
      </KeyboardAvoidingView>
       </ScrollView>
{/* </TouchableWithoutFeedback> */}
{/* </ImageBackground> */}
    </View>
   
  )
}
export default UserProfile