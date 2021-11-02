import React, { useEffect, useState, useRef } from 'react';
import { View, Text, TextInput, ImageBackground, FlatList, Keyboard, TouchableWithoutFeedback, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import axios from 'axios';
import AsyncStorage from "@react-native-community/async-storage";
import Iconback from 'react-native-vector-icons/Entypo';
import IconCircle from 'react-native-vector-icons/AntDesign'
import Icondelete from 'react-native-vector-icons/MaterialCommunityIcons'
import Icondot from 'react-native-vector-icons/Entypo'
const upImage = require('../images/sign1.png')

const AddJournal = ({ route, navigation }) => {

 

  const [title, setTitle] = useState('')
  const [notes, setNotes] = useState('')
  const [textColor, setColor] = useState('black')


  const notesRef = useRef();




  const done = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    var data = {
      "title": title,
      "description": notes,
      "text_color": textColor ? textColor : '#000'
    }



    axios.post('http://112.196.64.119:8000/api/admin/journal/create', data, {
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


  const deleteJournal=()=>{
    
  }





  return (
    <View
      style={{ flex: 1, backgroundColor: 'white', }}>

      <ImageBackground source={upImage} style={{ width: '100%', flexDirection: 'row', height: 230, borderBottomLeftRadius: 60, borderBottomRightRadius: 60, }}>
        <Iconback onPress={() => navigation.goBack()} name='chevron-thin-left' size={20} color='#000' style={{ width: 15, fontWeight: 'bold', height: 20, marginLeft: 20, marginTop: 30 }} />
      </ImageBackground>





      <KeyboardAvoidingView style={{ flex: 1, marginTop: '20%', width: '90%', position: 'absolute', height: 466, marginLeft: 20, marginRight: 20, backgroundColor: 'white', borderRadius: 10, borderColor: '#F2CFA9', borderWidth: 1 }}>

        <TextInput
          placeholder='Title'
          value={title}
          placeholderTextColor='#000'
          style={{ fontWeight: 'bold', marginTop: 10, marginLeft: 20, color: '#000', width: '90%', fontSize: 15, fontFamily: 'Montserrat-Bold' }}
          returnKeyLabel='done'
          onChangeText={(text) => setTitle(text)}
          onSubmitEditing={() => {
            notesRef.current.focus();
          }}
        />

        <View style={{ marginLeft: 25, marginRight: 25, marginTop: 5, borderWidth: 1, borderColor: '#FAE9D7', backgroundColor: 'yellow' }}></View>

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
            style={{ padding: 10, marginLeft: 20, color: textColor, fontSize: 13, fontFamily: 'Montserrat-Regular' }}

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




      <ScrollView horizontal style={{ flexDirection: 'row', left: 10, bottom: 10, position: 'absolute', }}>

        <TouchableOpacity onPress={() => done()} style={{ borderColor: 'red', width: 32, height: 32, borderRadius: 16, backgroundColor: '#fff', borderWidth: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'red' }}>OK</Text>

        </TouchableOpacity>

        <View style={{ marginLeft: 10 }}>
          {textColor == '#CE9D99' ? <IconCircle name='checkcircleo' size={32} color='#CE9D99' />
            : <TouchableOpacity activeOpacity={0.9} onPress={() => setColor('#CE9D99')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#CE9D99', }} />
          }
        </View>

        <View style={{ marginLeft: 10 }}>
          {textColor == '#D5B246' ? <IconCircle name='checkcircleo' size={32} color='#D5B246' />
            : <TouchableOpacity onPress={() => setColor('#D5B246')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#D5B246', }} />
          }
        </View>

        <View style={{ marginLeft: 10 }}>
          {textColor == '#A4CC73' ?
            <IconCircle name='checkcircleo' size={32} color='#A4CC73' />
            : <TouchableOpacity onPress={() => setColor('#A4CC73')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#A4CC73', }} />
          }
        </View>

        <View style={{ marginLeft: 10 }}>
          {textColor == '#83CEBD' ?
            <IconCircle name='checkcircleo' size={32} color='#83CEBD' />
            : <TouchableOpacity onPress={() => setColor('#83CEBD')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#83CEBD', }} />
          }
        </View>

        <View style={{ marginLeft: 10 }}>
          {textColor == '#8DD3E2' ?
            <IconCircle name='checkcircleo' size={32} color='#8DD3E2' />
            : <TouchableOpacity onPress={() => setColor('#8DD3E2')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#8DD3E2', }} />
          }
        </View>
        <View style={{ marginLeft: 10 }}>
          {textColor == '#AFCBFA' ?
            <IconCircle name='checkcircleo' size={32} color='#AFCBFA' />
            : <TouchableOpacity onPress={() => setColor('#AFCBFA')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#AFCBFA', }} />
          }
        </View>
        <View style={{ marginLeft: 10 }}>
          {textColor == '#D4B38A' ?
            <IconCircle name='checkcircleo' size={32} color='#D4B38A' />
            : <TouchableOpacity onPress={() => setColor('#D4B38A')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#D4B38A', }} />
          }
        </View>
        <View style={{ marginLeft: 10 }}>
          {textColor == '#F0E68C' ?
            <IconCircle name='checkcircleo' size={32} color='#F0E68C' />
            : <TouchableOpacity onPress={() => setColor('#F0E68C')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#F0E68C', }} />
          }
        </View>
        <View style={{ marginLeft: 10 }}>
          {textColor == '#FFA07A' ?
            <IconCircle name='checkcircleo' size={32} color='#FFA07A' />
            : <TouchableOpacity onPress={() => setColor('#FFA07A')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#FFA07A', }} />
          }
        </View>
        <View style={{ marginLeft: 10, }}>
          {textColor == '#F08080' ?
            <IconCircle name='checkcircleo' size={32} color='#F08080' />
            : <TouchableOpacity onPress={() => setColor('#F08080')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#F08080', }} />
          }
        </View>
        <View style={{ marginLeft: 10 }}>
          {textColor == '#F5DEB3' ?
            <IconCircle name='checkcircleo' size={32} color='#F5DEB3' />
            : <TouchableOpacity onPress={() => setColor('#F5DEB3')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#F5DEB3', }} />
          }
        </View>
        <View style={{ marginLeft: 10 }}>
          {textColor == '#CD5C5C' ?
            <IconCircle name='checkcircleo' size={32} color='#CD5C5C' />
            : <TouchableOpacity onPress={() => setColor('#CD5C5C')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#CD5C5C', }} />
          }
        </View>
        <View style={{ marginLeft: 10, marginRight: 20, }}>
          {textColor == '#8B4513' ?
            <IconCircle name='checkcircleo' size={32} color='#8B4513' />
            : <TouchableOpacity onPress={() => setColor('#8B4513')} style={{ height: 32, width: 32, borderRadius: 16, backgroundColor: '#8B4513', }} />
          }
        </View>
      </ScrollView>
    </View>


  )

}

export default AddJournal