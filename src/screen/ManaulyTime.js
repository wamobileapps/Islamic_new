
import React, { useEffect, useRef, useState } from "react"
import {  StatusBar, Text, TouchableOpacity, View, StyleSheet, ScrollView, KeyboardAvoidingView , TextInput, FlatList, SafeAreaView } from "react-native"
import Iconback from 'react-native-vector-icons/Entypo';
import { RFValue } from 'react-native-responsive-fontsize';
import AsyncStorage from '@react-native-community/async-storage';
import { baseUrl } from '../Api/COntstant';
import axios from "axios";

const data = [
    {
        name: "Add",
        index: 0,
    id: 1
    },
    {
        name: 'Cancel',
        index: 1,
    id: 2
    }
]
let selectId = ''
const ManuallyTime = ({ route, navigation }) => {

    const [fajr, setFajr] = useState('')
  const [sunrise, setSunrise] = useState('')
  const [duhr, setDuhr] = useState('')
  const [asr, setAsr] = useState('')
  const [maghrib, setMagrib] = useState('')
  const [isha, setIsha] = useState('')
  const [selectedId, setSelectedId] = useState(null)

    useEffect(async () => {
        // const unsubscribe = navigation.addListener('focus', () => {
           
        // });

        // return unsubscribe;


    }, [navigation]);


    const selectItem = (id, item) => {
        setSelectedId(id)
      
        selectId = id
        if(item.name == "Add"){
            // if(fajr == '' && duhr == '' && sunrise == '' && maghrib == '' && isha == '' &&  asr == ''){
            //     alert("Please add values.")
            // }else{
                
                // navigation.navigate('Drawer', {fajrV: fajr ? fajr : "00:00", sunriseV : sunrise ? sunrise : "00:00", dhuhrV: duhr? duhr : "00:00",
                //    asrV : asr? asr : "00:00", magribV: maghrib ? maghrib : "00:00", ishaV: isha ? isha :"00:00"})
            // }

             getData()
            navigation.navigate('Drawer')
            global.fajrr = fajr ? fajr : "00:00"
            global.sunrisee = sunrise ? sunrise :"00:00"
            global.duhrr = duhr? duhr :"00:00"
            global.asrr = asr? asr :"00:00"
            global.maghribb = maghrib ? maghrib :"00:00"
            global.ishaa = isha ? isha :"00:00"
        }
        else{
            getData()
            navigation.navigate('Drawer')
            global.fajrr = "00:00"
            global.sunrisee = "00:00"
            global.duhrr = "00:00"
            global.asrr = "00:00"
            global.maghribb = "00:00"
            global.ishaa = "00:00"
        }
       
      }
      


      const getData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log("auth token bio", token)
    
        axios.get(baseUrl + 'setting/view', {
          headers: {
            'auth-token': token
          }
        })
          .then((response) => {
    
           global.cityData = response.data[0].city
    
    
          })
          .catch((error) => {
            console.log('error', error)
          })
    
    
    
    
    
    
      }

      const addValue=()=>{
         
         
      }


    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
        <StatusBar hidden />

        <View style={{ backgroundColor: '#FAE9D7', height: 47, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

          <TouchableOpacity onPress={() => navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Iconback name='chevron-left' size={24} color='#000' style={{ marginLeft: 10, }} />
            <Text style={{ fontSize: RFValue(12), color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>Manual Correction</Text>
          </TouchableOpacity>
        </View>


        <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: 20, margin: 20 }}>

        <KeyboardAvoidingView style={{}} behavior="padding" enabled >
          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', }}>Fajr:</Text>

          <View style={{
            justifyContent: 'space-between',
            height: 40, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '60%', shadowColor: '#000000',
            backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
          }}>

            <TextInput
              placeholder="Enter Fajr Data"
              value={fajr}
              style={{ paddingLeft: 20, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', width: '90%', }}
              onChangeText={(text) => setFajr(text)}
              keyboardType='default'
            />



          </View>
          
          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold',marginTop: 20 }}>Sunrise:</Text>


          <View style={{
            justifyContent: 'space-between',
            height: 40, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '60%', shadowColor: '#000000',
            backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
          }}>

            <TextInput
              placeholder="Enter Sunrise Data"
              value={sunrise}
              style={{ paddingLeft: 20, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', width: '90%', }}
              onChangeText={(text) => setSunrise(text)}
              keyboardType='default'
            />


          </View>






          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Dhuhr:</Text>

          <TouchableOpacity style={{
            justifyContent: 'space-between',
            height: 40, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '60%', shadowColor: '#000000',
            backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
          }}>

            <TextInput
              placeholder="Enter Dhuhr Data"
              value={duhr}
              style={{ paddingLeft: 20, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', width: '90%', }}
              onChangeText={(text) => setDuhr(text)}
              keyboardType='default'
            />


          </TouchableOpacity>

          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Dhuhr:</Text>

          <TouchableOpacity style={{
            justifyContent: 'space-between',
            height: 40, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '60%', shadowColor: '#000000',
            backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
          }}>

            <TextInput
              placeholder="Enter Ase Data"
              value={asr}
              style={{ paddingLeft: 20, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', width: '90%', }}
              onChangeText={(text) => setAsr(text)}
              keyboardType='default'
            />


          </TouchableOpacity>

          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Maghrib:</Text>

          <TouchableOpacity style={{
            justifyContent: 'space-between',
            height: 40, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '60%', shadowColor: '#000000',
            backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
          }}>

            <TextInput
              placeholder="Enter Maghrib Data"
              value={duhr}
              style={{ paddingLeft: 20, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', width: '90%', }}
              onChangeText={(text) => setMagrib(text)}
              keyboardType='default'
            />


          </TouchableOpacity>

          <Text style={{ fontSize: RFValue(12), fontFamily: 'Montserrat-Bold', marginTop: 20 }}>Isha:</Text>

          <TouchableOpacity style={{
            justifyContent: 'space-between',
            height: 40, marginTop: 8, alignItems: 'center', flexDirection: 'row', width: '60%', shadowColor: '#000000',
            backgroundColor: '#fff', borderRadius: 8, borderWidth: 1, borderColor: '#F2DEC9'
          }}>

            <TextInput
              placeholder="Enter Isha Data"
              value={isha}
              style={{ paddingLeft: 20, fontSize: RFValue(10), fontFamily: 'Montserrat-SemiBold', width: '90%', }}
              onChangeText={(text) => setIsha(text)}
              keyboardType='default'
            />


          </TouchableOpacity>

          
          <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 20 }}>
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


        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
  
    
});

export default ManuallyTime