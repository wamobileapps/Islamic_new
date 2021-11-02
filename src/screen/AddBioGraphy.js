import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, ImageBackground, FlatList, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import Iconback from 'react-native-vector-icons/Entypo';
import IconCircle from 'react-native-vector-icons/AntDesign'
import Icondelete from 'react-native-vector-icons/MaterialCommunityIcons'
import Icondot from 'react-native-vector-icons/Entypo';
import { baseUrl } from '../Api/COntstant';

const upImage = require('../images/sign1.png')

const AddJournal = ({ navigation }) => {

  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [textColor, setColor] = useState('')
  const [year, setYear] = useState('')
  const [age, setAge ] = useState('')


  const notesRef = useRef();




  const done = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    var data = {
      "title": title,
      "description": notes,
      "year": year,
      "age": age
    }



    axios.post(baseUrl +'biography/create', data, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log('response journal ', response.data)
        navigation.goBack()

      })
      .catch((error) => {
        console.log('error', error)
        // dispatch(userUpdateProfileFail())

      })


  }


  return (
    <View
      style={{ flex: 1, backgroundColor: 'white', }}>

      <ImageBackground source={upImage} style={{ width: '100%', flexDirection: 'row', height: 230, borderBottomLeftRadius: 60, borderBottomRightRadius: 60, }}>
        <Iconback onPress={() => navigation.goBack()} name='chevron-thin-left' size={20} color='#000' style={{ width: 15, fontWeight: 'bold', height: 20, marginLeft: 20, marginTop: 30 }} />

        <Text style={{fontSize: 13, fontFamily: 'Montserrat-Bold', marginTop: 30, marginLeft: 10}}>My Biography</Text>
      </ImageBackground>


      <KeyboardAvoidingView style={{ flex: 1, marginTop: '20%', width: '90%', position: 'absolute', height: 466, marginLeft: 20, marginRight: 20, backgroundColor: 'white', borderRadius: 10, borderColor: '#F2CFA9', borderWidth: 1 ,   borderColor: '#ECC090', borderStyle: 'dashed',}}>

          <View style={{flexDirection: 'row',justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
              <View style={{flexDirection: 'row' , alignItems: 'center', }}>
                  <Text style={{fontSize: 13, fontFamily: 'Montserrat-Bold'}}>Year:</Text> 
                  <TextInput
                        placeholder='Year  ' 
                        value={year}
                        keyboardType = 'decimal-pad'
                        placeholderTextColor='#a9a9a9'
                        style={{ fontWeight: 'bold', paddingLeft: 10, color: '#000', fontSize: 13, fontFamily: 'Montserrat-Bold' }}
                        returnKeyLabel='done'
                        onChangeText={(text) => setYear(text)}
                        
                        />
              </View>

              <View style={{flexDirection: 'row' , alignItems: 'center'}}>
                  <Text style={{fontSize: 13, fontFamily: 'Montserrat-Bold'}}>Age:</Text>  
                  <TextInput
                        placeholder='Age  '
                        value={age}
                        keyboardType = 'decimal-pad'
                        placeholderTextColor='#a9a9a9'
                        style={{ fontWeight: 'bold', paddingLeft: 10, color: '#000', fontSize: 13, fontFamily: 'Montserrat-Bold' }}
                        returnKeyLabel='done'
                        onChangeText={(text) => setAge(text)}
                       
                        />
              </View>

          </View>

          <View style={{ marginLeft: 25, marginRight: 25, marginTop: 5, borderWidth: 1, borderColor: '#FAE9D7', backgroundColor: 'yellow' }}></View>


        <TextInput
          placeholder='Title'
          value={title}
          placeholderTextColor='#000'
          style={{  marginTop: 10, marginLeft: 20, color: '#000', width: '90%', fontSize: 13, fontFamily: 'Montserrat-Bold' }}
          returnKeyLabel='done'
          onChangeText={(text) => setTitle(text)}
          onSubmitEditing={() => {
            notesRef.current.focus();
          }}
        />


        <View style={{}}>
          <TextInput
            ref={notesRef}
            value={notes}
            placeholder='Note'
            placeholderTextColor='#000'
            multiline={true}
            blurOnSubmit={true}
            returnKeyLabel='done'
            onChangeText={(text) => setNotes(text)}
            onSubmitEditing={() => done()}
            style={{ padding: 10, marginLeft: 20, color: textColor, fontSize: 10, fontFamily: 'Montserrat-Regular' }}

          />
        </View>


      </KeyboardAvoidingView>

      {/* <View style={{ flexDirection: "row", justifyContent: "space-between", marginLeft: 20, marginRight: 20, position: "absolute", bottom: 75, alignItems: 'center' }}>
        <TouchableOpacity onPress={()=>deleteJournal()} style={{ flexDirection: "row", alignItems: 'center' }}>
          <Icondelete name='delete' size={20} />
          <Text style={{ fontSize: 18 }}>Delete</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{ flexDirection: "row", marginLeft: "60%", alignItems: 'center' }}>
          <Icondelete name='label' size={20} />
          <Text style={{ fontSize: 18 }}>labels</Text>
        </TouchableOpacity>
      </View> */}




      
    </View>


  )

}

export default AddJournal