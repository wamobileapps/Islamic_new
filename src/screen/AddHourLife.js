import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, ImageBackground, FlatList, TouchableHighlight, Modal, KeyboardAvoidingView, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import Iconback from 'react-native-vector-icons/Entypo';
import IconDown from 'react-native-vector-icons/FontAwesome'
import { baseUrl } from '../Api/COntstant';

const upImage = require('../images/sign1.png')

const AddHourLife = ({ navigation, route }) => {

  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [textColor, setColor] = useState('')
  const [hours, setHours] = useState('')
  const [description, setDescription ] = useState('')
  const [category, setCategory] = useState('Select Category');
  const [visible, setVisible] = useState(false)
  const [categoryId, setCategoryId] = useState('')
  const [categoryList, setCategoryList] = useState([])
  const notesRef = useRef();


  const hourxdss = route.params.consumed_hrs
  const titlee = route.params.title


  useEffect(()=>{
    getCategoryList()
  }, [])


  const getCategoryList= async()=>{
    const token = await AsyncStorage.getItem('token')
    console.log("auth token bio", token)

    axios.get(baseUrl + 'activityCategory/list', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        // console.log('response category lis==>', response.data.data)
        setCategoryList(response.data.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }


  const done = async () => {
    if(hours == '' && description == ''){
      alert("Please add all fields")
    }
    else{
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    var data = {
      "description": description,
      "consumed_hrs": JSON.parse(hours),
      "activitycategories":{
        "_id" : categoryId
     }
    }


console.log("data===>", data);
    axios.post('http://112.196.64.119:8000/api/user/dailyUpdate/create', data, {
      headers: {
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY4MDM5NmE0Zjc4MTFjOGRhZDU3YzciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcyOTU4MTJ9.gK2sks-LlokY7Nvx5eQ_vHLuxl8zSEpwTSOsrq6J30k"
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
  }

  const setDragCategory = () => {
    setVisible(!visible)
    // alert(dragGender)
  }

  const selectCategory=(title, id)=>{
    setCategory(title)
    setVisible(!visible)
    setCategoryId(id)
  }

  const renderItem=(item)=>{
    console.log("-====>", item);
    return(
      <TouchableOpacity onPress={()=>selectCategory(item.item.title, item.item._id)} style={{marginTop:20,borderBottomWidth:1, justifyContent: 'center', borderBottomColor: '#a9a9a9' }}>
        <Text style={{fontSize:12,fontFamily: 'Montserrat-SemiBold', marginLeft:50,}}>{item.item.title}</Text>
      </TouchableOpacity>
    )
  }


  return (
    <View
      style={{ flex: 1, backgroundColor: 'white', }}>

      <ImageBackground source={upImage} style={{ width: '100%', flexDirection: 'row', height: 230, borderBottomLeftRadius: 60, borderBottomRightRadius: 60, }}>
        <Iconback onPress={() => navigation.goBack()} name='chevron-thin-left' size={20} color='#000' style={{ width: 15, fontWeight: 'bold', height: 20, marginLeft: 20, marginTop: 30 }} />

        <Text style={{fontSize: 13, fontFamily: 'Montserrat-Bold', marginTop: 30, marginLeft: 10}}>24 hours in my life</Text>
      </ImageBackground>


      <KeyboardAvoidingView style={{ flex: 1, marginTop: '20%', width: '90%', position: 'absolute', height: 466, marginLeft: 20, marginRight: 20, backgroundColor: 'white', borderRadius: 10, borderColor: '#F2CFA9', borderWidth: 1 ,   borderColor: '#ECC090', borderStyle: 'dashed',}}>

          <View style={{flexDirection: 'row',justifyContent: 'space-between', marginLeft: 20, marginRight: 20, }}>
              <View style={{flexDirection: 'row' , alignItems: 'center', }}>
                  <Text style={{fontSize: 13, fontFamily: 'Montserrat-Bold'}}>Hours:</Text> 
                  <TextInput
                        placeholder= 'Hours  ' 
                        value={hours}
                        keyboardType = 'decimal-pad'
                        placeholderTextColor='#a9a9a9'
                        style={{ fontWeight: 'bold', paddingLeft: 10, color: '#000', fontSize: 13, fontFamily: 'Montserrat-Bold' }}
                        returnKeyLabel='done'
                        onChangeText={(text) => setHours(text)}
                        
                        />
              </View>

            

          </View>

          <TouchableOpacity  onPress={() => setDragCategory()} style={{ marginLeft: 14, justifyContent: 'space-between',
           height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, elevation: 3, shadowColor: '#000000',
           backgroundColor: '#fff', borderRadius: 4 }}>

          

              <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium', textAlign: 'center', paddingLeft: 50 }}>{category}</Text>
           

            <IconDown onPress={() => setDragCategory()}  name='chevron-down' type='Entypo' size={15} style={{ marginRight: 20 }} />


          </TouchableOpacity>


          {visible == false ?
            null :




            
              <View style={styles.centeredView} >
                
                 
                 <FlatList 
                   data={categoryList}
                   renderItem={renderItem}
                   />





              </View>
           

          }

          {/* <View style={{ marginLeft: 25, marginRight: 25, marginTop: 15, borderWidth: 1, borderColor: '#FAE9D7', backgroundColor: 'yellow' }}></View> */}




        <View style={{marginTop:20}}>
          <TextInput
            value={description}
            placeholder='Description'
            placeholderTextColor='#000'
            multiline={true}
            blurOnSubmit={true}
            returnKeyLabel='done'
            onChangeText={(text) => setDescription(text)}
            onSubmitEditing={() => done()}
            style={{ padding: 10, marginLeft: 20, color: textColor, fontSize: 10, fontFamily: 'Montserrat-Regular' }}

          />
        </View>


      </KeyboardAvoidingView>

     



      
    </View>


  )

}


const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'white',
      elevation:5, 
      marginLeft:15, marginRight:15
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

export default AddHourLife