
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, Picker, FlatList, KeyboardAvoidingView } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import IconDown from 'react-native-vector-icons/FontAwesome';
import DropDownPicker from 'react-native-dropdown-picker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { baseUrl } from '../Api/COntstant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'


const data = [
  {
    name: 'Hanafi',
    index: 0
  },
  {
    name: 'Shafi',
    index: 1
  }
]

let selectId = ''
let selectItemm = ''
function Setting() {
  const [goToData, setGoToData] = useState('')
  const [timing, setTiming] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [latitudeValue, setLatitudeValue] = useState(false)
  const [selectedAsarMethod, setSelectedAsarMethod] = useState('Hanafi')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [address, setAddress] = useState('')
  const [items, setItems] = useState([
    { label: 'Middle of the Night Method', value: '1' },
    { label: 'One Seventh Rule', value: '2' },
    { label: 'Angle Based Method', value: '3' }
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: 'Shia Ithna-Ashari', value: '0' },
    { label: 'University of Islamic Sciences, Karachi', value: '1' },
    { label: 'Islamic Society of North America (ISNA)', value: '2' },
    { label: 'Muslim World League (MWL)', value: '3' },
    { label: 'Umm al-Qura, Makkah', value: '4' },
    { label: 'Egyptian General Authority of Survey', value: '5' },
    { label: 'Institute of Geophysics, University of Tehran', value: '6' },
    { label: 'Gulf Region', value: '7' },
    { label: 'Kuwait', value: '8' },
    { label: 'Qatar', value: '9' },
    { label: 'Majlis Ugama Islam Singapura, Singapore', value: '10' },
    { label: 'Union Organization Islamic de France', value: '11' },
    { label: 'Diyanet İşleri Başkanlığı, Turkey', value: '12' },
    { label: 'Spiritual Administration of Muslims of Russia', value: '13' }
  ]);


  const selectItem = (id, item) => {
    setSelectedId(id)
    selectId = id
    selectItemm = item.name
    saveSettingData()
  }

  const saveSettingData = async () => {
    const token = await AsyncStorage.getItem('token')

    var param = {
      "location": address,
      "go_to": goToData,
      "timing": timing,
      "high_lat_method": value,
      "prayer_method": value1,
      "asr_method": selectItemm,
      "user_id": global.userId



    }


    console.log("params of settings====>", param);

    axios.post(baseUrl + 'setting/create', param, {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log('params of settings==---=> ', response.data)


      })
      .catch((error) => {
        console.log('error', error)
        // dispatch(userUpdateProfileFail())

      })


  }





  return (

    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <ScrollView style={{ flex: 1, marginTop: 40, margin: 20 }}>

        <KeyboardAvoidingView style={{}} behavior="padding" enabled >
          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', }}>Locaion:</Text>

          <TouchableOpacity style={{
            justifyContent: 'space-between',
            height: 44, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '40%', shadowColor: '#000000',
            backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
          }}>

            <Text style={{ fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', textAlign: 'center', paddingLeft: 20 }}>Location</Text>

            <IconDown name='chevron-down' type='Entypo' size={10} style={{ marginRight: 20 }} />


          </TouchableOpacity>


          <TextInput
            placeholder="Enter data"
            value={address}
            style={{ paddingLeft: 20, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', width: '90%', }}
            onChangeText={(text) => setAddress(text)}
          />

          <GooglePlacesAutocomplete
            placeholder='Search Place/Event Location'
            minLength={2}
            autoFocus={false}
            returnKeyType={'search'}
            keyboardAppearance={'light'}
            fetchDetails={true}
            value={address}
            renderDescription={row => row.description}
            onPress={(data, details = null) => {
              console.log("data", details, data);



            }}

            getDefaultValue={() => ''}
            listViewDisplayed={false}


            query={{
              key: 'AIzaSyCV5HmY_q1S8_0Kp0uhAxEchmaruTxwD0g',
              // key: ' AIzaSyBo845OUtzzTagCIIJ_SlwZxI9-W65zAxY',
              language: 'en',

            }}
            textInputProps={{
              onFocus: () => shouldDisplayListView = true,
              onBlur: () => shouldDisplayListView = false
            }}

            styles={{
              textInputContainer: {
                backgroundColor: '#fff',
                width: '100%',
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 15,
                marginTop: 25,
                marginBottom: 15,
                height: 55,
                fontFamily: 'NunitoSans-Light'
              },
              description: {
                fontFamily: 'NunitoSans-Light'
              },
              predefinedPlacesDescription: {
                color: '#1faadb'
              },
              loader: { color: "#1797DE", backgroundColor: '#1797DE', fontSize: 25, width: 20, height: 20 }
            }}

            nearbyPlacesAPI='GooglePlacesSearch'
            GoogleReverseGeocodingQuery={{
            }}
            GooglePlacesSearchQuery={{
              rankby: 'distance',
              type: 'cafe'
            }}

            GooglePlacesDetailsQuery={{
              fields: 'formatted_address',
            }}

            filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

            debounce={200}

          />



          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 100 }}>Go To:</Text>

          <TouchableOpacity style={{
            justifyContent: 'space-between',
            height: 44, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '36%', shadowColor: '#000000',
            backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
          }}>

            <TextInput
              placeholder="Enter data"
              value={goToData}
              style={{ paddingLeft: 20, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', width: '90%', }}
              onChangeText={(text) => setGoToData(text)}
            />


          </TouchableOpacity>


          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 30 }}>Timing:</Text>

          <TouchableOpacity style={{
            justifyContent: 'space-between',
            height: 44, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '38%', shadowColor: '#000000',
            backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
          }}>

            <TextInput
              placeholder="Timing"
              value={timing}
              style={{ paddingLeft: 20, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', width: '90%', }}
              onChangeText={(text) => setTiming(text)}
            />


          </TouchableOpacity>


          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 30 }}>High Latitude Method:</Text>



          <DropDownPicker
            style={{ width: '45%', height: 44, borderColor: '#F2DEC9', fontSize: 10, marginTop: 8, }}
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={setValue}
            setItems={setItems}
            onChangeValue={(label) => {
              console.log("value-=====", value);
            }}
          />



          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 30 }}>Prayer Method:</Text>


          <DropDownPicker
            style={{ width: '70%', height: 44, borderColor: '#F2DEC9', fontSize: 10, marginTop: 8, }}
            open={open1}
            value={value1}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            onChangeValue={(label) => {
              console.log("value-=====", value1);
            }}
          />


          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 30 }}>Asar Method:</Text>

          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
            <FlatList
              data={data}
              numColumns={2}
              key={2}
              extraData={
                selectedId
              }
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity onPress={() => selectItem(item.index, item)} style={{ backgroundColor: selectedId === item.index ? '#D29F79' : '#FAE9D7', width: '45%', height: 40, borderRadius: 8, marginRight: 20, justifyContent: 'center', alignItems: 'center' }}>
                    <Text>{item.name}</Text>
                  </TouchableOpacity>
                )
              }}
            />
          </View>
        </KeyboardAvoidingView>

      </ScrollView>




    </View>

  )


}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    margin: 24,
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  pickerStyle: {
    height: 150,
    width: "38%",
    color: '#344953',
    justifyContent: 'center',
    borderWidth: 1, borderColor: '#F2DEC9',
  }
})

export default Setting