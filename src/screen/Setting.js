
import React, { Component, useState, useRef, useEffect } from 'react';
import { View, Text, Modal, ScrollView, TouchableOpacity, StyleSheet, Image, TextInput, Picker, FlatList, StatusBar, } from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import DropDownPicker from 'react-native-dropdown-picker';
import { baseUrl } from '../Api/COntstant';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios'
import Iconback from 'react-native-vector-icons/Entypo';


const data = [
  {
    name: 'Hanafi',
    index: 0,
    id: 1
  },
  {
    name: 'Shafi',
    index: 1, id: 2
  }
]

let selectId = ''
let selectItemm = ''

function Setting(props) {
  const [goToData, setGoToData] = useState('')
  const [timing, setTiming] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [latitudeValue, setLatitudeValue] = useState(false)
  const [selectedAsarMethod, setSelectedAsarMethod] = useState('Hanafi')
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [visible, setVisible] = useState('')
  const [country, setCountry] = useState('')
  const [city, setCity] = useState('')
  const [items, setItems] = useState([
    { label: 'Middle of the Night Method', value: '1' },
    { label: 'One Seventh Rule', value: '2' },
    { label: 'Angle Based Method', value: '3' }
  ]);

  const [open1, setOpen1] = useState(false);
  const [value1, setValue1] = useState(null);
  const [items1, setItems1] = useState([
    { label: 'London Unified Prayer Time', value: '0' },
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
    { label: 'Spiritual Administration of Muslims of Russia', value: '13' },
    { label: 'Shia Ithna-Ashari', value: '14' }
  ]);

  const [openM, setOpenM] = useState(false);
  const [valueM, setValueM] = useState(null);
  const [itemsM, setItemsM] = useState([
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'Octobar', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' }
  ]);


  useEffect(() => {
    console.log("user id====>", global.userId);
  
    getViewSettingData()
  }, []);


  const getViewSettingData= async()=>{
    const token = await AsyncStorage.getItem('token')
        console.log("auth token", token)

        axios.get('http://112.196.64.119:8000/api/user/setting/view', {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('view response data=====>', response.data)

                setCountry(response.data[0].country)
                setCity(response.data[0].city)
                setValueM(response.data[0].go_to)
                setValue(response.data[0].high_lat_method)
                setValue1(response.data[0].prayer_method)
                
            })
            .catch((error) => {
                console.log('error', error)
                // dispatch(userUpdateProfileFail())

            })
  }

  const selectItem = (id, item) => {
    setSelectedId(id)
    selectId = id
    selectItemm = item.id
    saveSettingData()
  }

  const saveSettingData = async () => {

    console.log("Fajrrr data====>", global.fajrrBegins, global.fajrrJamah, global.fajrrAlarm);
    console.log("sunriseeee data====>", global.sunriseeBegins, global.sunriseeJamah, global.sunriseeAlarm);
    console.log("dhuhrrrr data====>", global.zuhrBegins, global.zuhrJamah, global.zuhrAlarm);
    console.log("asrrrr data====>", global.asrBegins, global.asrJamah, global.asrAlarm);
    console.log("maghribbb data====>", global.maghribBegins, global.maghribJamah, global.maghribAlarm);
    console.log("ishaaaa data====>", global.ishaBegins, global.ishaJamah, global.ishaAlarm);




    if (country == '' && city == '' && valueM == null && value == null && value1 == null) {
      alert("Please add all fields.")
    }
    else if (country == '') {
      alert("Please Enter Country.")
    }
    else if (city == '') {
      alert("Please Enter City.")
    }
    else if (valueM == null) {
      alert("Please Enter Go To Value.")
    }
    else if (value == null) {
      alert("Please Enter High Laitude Method.")
    }
    else if (value1 == null) {
      alert("Please Enter Prayer Method.")
    }
    else {

      const token = await AsyncStorage.getItem('token')

      var param = {
        "country": country,
        "city": city,
        "go_to": valueM,
        "timing": "02:00",
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
          if (response.status == 200) {
            // props.navigation.navigate('Drawer')
            getPrayerList()
          }
          console.log('params of settings==---=> ', response)


        })
        .catch((error) => {
          console.log('error', error)
          // dispatch(userUpdateProfileFail())

        })

    }
  }

  const getPrayerList = async () => {
    const token = await AsyncStorage.getItem('token')

    axios.get('http://112.196.64.119:8000/api/user/manualprayerstime/list', {
      headers: {
        'auth-token': token
      }
    })
      .then((response) => {
        console.log("setting response data===>", response.data.data[0]);
        global.fajrrBegins = response.data.data[0].type1.begins_time
        global.fajrrJamah = response.data.data[0].type1.jamah_time
        global.fajrrAlarm = response.data.data[0].type1.alarm_time
        global.fajrPrayer = response.data.data[0].type1.prayerTime

        global.zuhrBegins = response.data.data[0].type2.begins_time
        global.zuhrJamah = response.data.data[0].type2.jamah_time
        global.zuhrAlarm = response.data.data[0].type2.alarm_time
        global.duhrPrayer = response.data.data[0].type2.prayerTime

        global.asrBegins = response.data.data[0].type3.begins_time
        global.asrJamah = response.data.data[0].type3.jamah_time
        global.asrAlarm = response.data.data[0].type3.alarm_time
        global.asrPrayer = response.data.data[0].type3.prayerTime

        global.maghribBegins = response.data.data[0].type4.begins_time
        global.maghribJamah = response.data.data[0].type4.jamah_time
        global.maghribAlarm = response.data.data[0].type4.alarm_time
        global.magribPrayer = response.data.data[0].type4.prayerTime

        global.ishaBegins = response.data.data[0].type5.begins_time
        global.ishaJamah = response.data.data[0].type5.jamah_time
        global.ishaAlarm = response.data.data[0].type5.alarm_time
        global.ishaPrayer = response.data.data[0].type5.prayerTime

        // global.ishaBegins = response.data.data[0].type5.begins_time
        // global.ishaJamah = response.data.data[0].type5.jamah_time
        // global.ishaAlarm = response.data.data[0].type5.alarm_time
        global.sunPrayer = response.data.data[0].type6.prayerTime



        props.navigation.navigate('Drawer')
      })

      .catch((error) => {
        console.log('error', error)
      })
  }

  const setCityData = async (text) => {
    setCity(text)
    global.calCity = text
    const token = await AsyncStorage.getItem('token')


    axios.get(`https://api.pray.zone/v2/times/today.json?city=${text}`)
      .then((response) => {

        console.log("get given date data====>", response.data.results.datetime[0].times);


        global.fajr = response.data.results.datetime[0].times.Fajr
        global.Sunrise = response.data.results.datetime[0].times.Sunrise
        global.zuhr = response.data.results.datetime[0].times.Dhuhr
        global.asr = response.data.results.datetime[0].times.Asr
        global.maghrib = response.data.results.datetime[0].times.Maghrib
        global.isha = response.data.results.datetime[0].times.Isha


      })


  }


  const enterManualdata = async()=>{

    axios.get(`https://api.pray.zone/v2/times/today.json?city=${global.calCity}`)
      .then((response) => {

        console.log("get given date data====>", response.data.results.datetime[0].times);


        global.fajr = response.data.results.datetime[0].times.Fajr
        global.Sunrise = response.data.results.datetime[0].times.Sunrise
        global.zuhr = response.data.results.datetime[0].times.Dhuhr
        global.asr = response.data.results.datetime[0].times.Asr
        global.maghrib = response.data.results.datetime[0].times.Maghrib
        global.isha = response.data.results.datetime[0].times.Isha


      })
    
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token, global.userId)

    axios.get(`http://112.196.64.119:8000/api/user/manualprayerstime/view/${global.userId}`, {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
          console.log('manual response data=====>', response.data)
          // global.fajrPrayer = response.data.data[0].type1.prayerTime
          // global.sunPrayer=response.data.data[0].type6.prayerTime
          // global.asrPrayer=response.data.data[0].type3.prayerTime
          // global.duhrPrayer = response.data.data[0].type2.prayerTime
          // global.magribPrayer=response.data.data[0].type4.prayerTime
          // global.ishaPrayer=response.data.data[0].type5.prayerTime

          props.navigation.navigate("ManuallyTime")

        })


        .catch((error) => {
          console.log('error', error)
          // dispatch(userUpdateProfileFail())

      })
  }



  return (

    <View style={{ flex: 1, backgroundColor: 'white', }}>
      <StatusBar hidden />
      <View style={{ backgroundColor: '#FAE9D7', height: 47, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

        <TouchableOpacity onPress={() => props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
          <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Settings</Text>
        </TouchableOpacity>
        {/* <Image source={require('../images/nafs.png')} style={{ width: 26, height: 26, marginRight: 20 }} /> */}
      </View>


      <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: 20, marginLeft: '5%', marginRight: '5%', }}>


        <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', }}>Location:</Text>

        <View style={{
          justifyContent: 'space-between',
          height: 40, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '100%', shadowColor: '#000000',
          backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
        }}>

          <TextInput
            placeholder="Enter Country"
            value={country}
            style={{ paddingLeft: 20, color: 'black', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', width: '100%', marginLeft: -10 }}
            onChangeText={(text) => setCountry(text)}
          />



        </View>

        <View style={{
          justifyContent: 'space-between',
          height: 40, marginTop: 20, alignItems: 'center', flexDirection: 'row', width: '100%', shadowColor: '#000000',
          backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
        }}>

          <TextInput
            placeholder="Enter City"
            value={city}
            style={{ paddingLeft: 20, color: 'black', fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', width: '100%', marginLeft: -10 }}
            onChangeText={(text) => setCityData(text)}
          />



        </View>









        <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Go To:</Text>

        <DropDownPicker
          listMode="SCROLLVIEW"
          style={{ borderColor: '#F2DEC9', width: '100%', fontSize: RFValue(11), marginTop: 8, height: 40 }}
          open={openM}
          textStyle={{ fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', }}
          listChildContainerStyle={{ marginTop: 5 }}
          dropDownContainerStyle={{ height: 120, borderColor: '#F2DEC9' }}
          value={valueM}
          items={itemsM}
          setOpen={setOpenM}
          setValue={setValueM}
          setItems={setItemsM}
          onChangeValue={(label) => {
            console.log("value-=====", valueM);
            global.selectMonth = valueM
            global.calMonth = valueM
          }}
        />




        {/* <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Timing:</Text> */}

        <TouchableOpacity onPress={() => country != '' && city != '' ? enterManualdata() : alert("Please enter locations.")} style={{
          justifyContent: 'center',
          height: 40, marginTop: 20, alignItems: 'center', flexDirection: 'row', width: '100%', shadowColor: '#000000',
          backgroundColor: '#FAE9D7', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
        }}>

          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginLeft: -15 }}>Manual Adjustments</Text>


        </TouchableOpacity>


        <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>High Latitude Method:</Text>




        <DropDownPicker
          listMode="SCROLLVIEW"
          style={{ borderColor: '#F2DEC9', width: '100%', fontSize: RFValue(11), marginTop: openM == true ? '15%' : '4%', height: 40 }}
          open={open}
          textStyle={{ fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', }}
          listChildContainerStyle={{ marginTop: 5 }}
          dropDownContainerStyle={{ height: 120, borderColor: '#F2DEC9' }}
          value={value}
          items={items}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          onChangeValue={(label) => {
            console.log("value-=====", value);
          }}
        />

        <View style={{ marginBottom: 20 }}>
          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Prayer Method:</Text>

          <DropDownPicker
            listMode="SCROLLVIEW"
            style={{ width: '100%', height: 40, borderColor: '#F2DEC9', fontSize: RFValue(11), marginTop: open == true ? '25%' : '4%', }}
            open={open1}
            value={value1}
            textStyle={{ fontSize: RFValue(11), fontFamily: 'Montserrat-SemiBold', }}
            // listItemContainerStyle={{marginTop: -10, }}
            listChildContainerStyle={{ marginTop: 5 }}
            dropDownContainerStyle={{ height: 120, borderColor: '#F2DEC9' }}
            items={items1}
            setOpen={setOpen1}
            setValue={setValue1}
            setItems={setItems1}
            onChangeValue={(label) => {
              console.log("value-=====", value1);
            }}
          />
        </View>

        <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: open1 == true ? '17%' : '2%' }}>Asar Method:</Text>

        <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 10, }}>
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
                  <Text style={{ fontFamily: 'Montserrat-Bold', }}>{item.name}</Text>
                </TouchableOpacity>
              )
            }}
          />
        </View>


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
