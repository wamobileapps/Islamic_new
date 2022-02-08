import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, ImageBackground, Image, FlatList, TouchableOpacity, } from 'react-native';
import Iconsearch from "react-native-vector-icons/AntDesign"
import AsyncStorage from "@react-native-community/async-storage";
import HTMLView from 'react-native-htmlview';
import axios from "axios";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconDown from 'react-native-vector-icons/AntDesign';
import moment from 'moment'
import { FAB, Button } from 'react-native-paper';
import { baseUrl } from '../Api/COntstant';

const upImage = require('../images/bgJournal.png')

const data = [
  {
    name: 'Book Summary'
  },
  {
    name: '24 Hours In My Life'
  }
]

const BookSummary = ({ navigation }) => {
  const [bookList, setBookList] = useState('')
  const [description, setDescription] = useState('')
  const [dropDown, setDropDown] = useState('')
  const [val, setVal] = useState('Book Summary');
  const [lifedata, setLifeData] = useState([])

  useEffect(() => {

    getLifeData()
    const unsubscribe = navigation.addListener('focus', () => {
      getBookList()
    });

    return unsubscribe;
  }, [navigation]);


  const htmlContent = description

  const getBookList = async () => {
    getLifeData()
    const token = await AsyncStorage.getItem('token')
    console.log("auth token=-=========>>>", token)

    axios.get('http://112.196.64.119:8000/api/admin/book/list', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log('response========>>>', response.data.data)

        setBookList(response.data.data)
      })
      .catch((error) => {
        console.log('error', error)

      })

  }

  const getLifeData = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token bio", token)

    axios.get(baseUrl+ 'dailyUpdate/list/', {
      headers: {
        'auth-token': "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MGY4MDM5NmE0Zjc4MTFjOGRhZDU3YzciLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MjcyOTU4MTJ9.gK2sks-LlokY7Nvx5eQ_vHLuxl8zSEpwTSOsrq6J30k"
      }
    })
      .then((response) => {
        console.log('response-===', response.data.data)
        setLifeData(response.data.data)
      })
      .catch((error) => {
        console.log('error', error)
      })
  }



  const renderItem = ({ item, index }) => {
    console.log(`http://112.196.64.119:8000/books/${item.image}`)

    setDescription(item.description)

    const webViewStyle = StyleSheet.create({ p: { color: "#454545", fontSize: 11, fontFamily: 'Montserrat-Regular' } });



    return (

      <TouchableOpacity
        onPress={() =>
          navigation.navigate('BookDetail', {
            bookID: item._id,
          })

        }
        style={{ borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8, marginLeft: 15, marginRight: 15, backgroundColor: 'white', borderWidth: 1, flexDirection: 'row', marginBottom: 20 }}>
        <Image source={{ uri: `http://112.196.64.119:8000/books/${item.image}` }} style={{ marginBottom: 10, height: 108, width: 70, marginLeft: 10, marginTop: 10, borderRadius: 6, resizeMode: 'cover' }} />

        <View style={{ marginLeft: 10, marginTop: 6, }}>
          <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Bold' }}>{item.title}</Text>

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 10, fontFamily: 'Montserrat-SemiBold' }}>{item.author}</Text>
            <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Regular' }}> (admin)</Text>
          </View>

          <View style={{ flexDirection: 'row', marginTop: 20 }}>
            <Text style={{ fontSize: 10, fontFamily: 'Montserrat-SemiBold' }}>Book Summary - </Text>
            <View style={{ width: '50%' }}>
              <HTMLView
                value={htmlContent}
                stylesheet={webViewStyle}
              />
            </View>
          </View>




        </View>
      </TouchableOpacity>

    )

  }

  const setValue = (name) => {
    setDropDown(!dropDown)
    setVal(name)

  }

  const renderItemLife = ({ item, index }) => {

    let date = moment(item.activitycategories.created_at).format("DD/MM/YYYY")
    let time = moment(item.activitycategories.created_at).format('h:mm:ss a')
 

    const htmlDes = item.description
    const descriptionStyle = StyleSheet.create({ p: { color: "#454545", fontSize: 10, fontFamily: 'Montserrat-Regular', marginLeft: 10, marginTop: 20, marginBottom: 10 } });

    return (
      <TouchableOpacity key={index} style={{
        // height: 115,
        borderWidth: 1, marginLeft: 20, marginRight: 20, marginBottom: 20, padding: 4,
        backgroundColor: 'white',
        borderColor: '#ECC090', borderStyle: 'dashed', borderRadius: 8,
      }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ fontSize: 15, fontFamily: 'Montserrat-Bold', marginLeft: 10, marginRight: 10, width: 145 }}>{date}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 10 }}>Edited at: </Text>
            <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 10, marginLeft: 10, margin: 5, marginRight: 10, color: 'black' }}>{time}</Text>
          </View>
        </View>

        <Text style={{ fontFamily: 'Montserrat-Regular', fontSize: 10, marginLeft: 10, margin: 5, marginRight: 10, color: 'black' }}>{item.description}</Text>
      </TouchableOpacity>
    )


  }


  return (




    <ImageBackground source={upImage} style={{ width: wp('100%'), height: hp('100%'), }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Image source={require('../images/drawer.png')} style={{ width: 25, height: 15, marginTop: 25, marginLeft: 20 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setDropDown(!dropDown)} style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: '#000', marginTop: 20, color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 20, textAlign: 'center' }}>{val}</Text>
            <IconDown name='caretdown' type='AntDesign' color='#454545' size={12} style={{ marginTop: 28, marginLeft: 10 }} />
          </TouchableOpacity>
        </View>




        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#EBC7A1', marginTop: 25, right: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Iconsearch name='search1' size={18} color="black" style={{ position: 'absolute' }} />
        </View>

      </View>


      {dropDown ?
        <View style={{ width: '50%', height: 65, position: 'absolute', justifyContent: 'center', alignItems: 'center', backgroundColor: '#EBC7A1', top: 18, left: 50, borderRadius: 10 }}>
          <FlatList
            data={data}
            renderItem={(item) => {
              console.log("0---", item);
              return (
                <TouchableOpacity onPress={() => setValue(item.item.name)}>
                  <Text style={{ fontSize: 12, fontFamily: 'Montserrat-Regular', marginTop: 10 }}>{item.item.name}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>
        : null
      }



      {val === 'Book Summary' ?

        <FlatList
          data={bookList}
          renderItem={renderItem}
          keyExtractor={item => item.id}
          style={{ marginTop: dropDown ? 70 : 40 }}
        />

        :

        <FlatList
          data={lifedata}
          renderItem={renderItemLife}
          keyExtractor={item => item.id}
          style={{ flex: 1, marginTop: 50, marginBottom: 100 }}
        />
      }


      {val === 'Book Summary' ?
       null
      : <FAB
      style={{
        bottom: 100, position: 'absolute', right: 0, marginBottom: 20, marginRight: 20,
        backgroundColor: '#C28647',
      }}
      icon="plus"
      onPress={() => navigation.navigate('AddHourLife')}
    />}

    </ImageBackground>



  )

}




export default BookSummary