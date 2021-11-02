import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';
import { FAB, Button } from 'react-native-paper';
import Icon from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import IconDelete from 'react-native-vector-icons/MaterialCommunityIcons'
import IconPencil from 'react-native-vector-icons/FontAwesome5'
import { baseUrl } from '../Api/COntstant';


const upImage = require('../images/bgJournal.png')

const Journal = ({ navigation }) => {

    const [journalData, setJournalData] = useState('')
    const [isLoading, setLoading] = useState('true');
    const [press, setPress] = useState('')
    const [journalId, setJournalID] = useState('')
    const [journalTitle, setJournalTitle] = useState('')
    const [journalText, setJournalText] = useState('')
    const [journalColor, setJournalColor] = useState('')


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getJournalData()
        });

        return unsubscribe;
    }, [navigation]);
 


    const getJournalData = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log("auth token", token)

        axios.get('http://112.196.64.119:8000/api/admin/journal/list', {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log('response', response.data.data)
                setJournalData(response.data.data)
                setJournalTitle(response.data.data.title)
                setJournalText(response.data.data.description)
                setJournalColor(response.data.data.text_color)
                setLoading(false)
                
            })
            .catch((error) => {
                console.log('error', error)
                // dispatch(userUpdateProfileFail())

            })
    }

    const longPress = (item, index) => {
        console.log("---",item)
         setJournalID(item._id)
         
         setPress(index)

        global.journalText = item.description
        global.journalTitle = item.title
        global.journalColor = item.text_color
       
        console.log("journal id long preess", global.journalText)
    }

    const deleteButton=()=>{
        console.log("journal id", journalId)

        axios.delete(`http://112.196.64.119:8000/api/admin/journal/delete/${journalId}`)
        .then((res)=>{
          console.log("ress", res)
          alert(res.data.message)
          setPress('')
          getJournalData()
        })
    }


    const editButton=()=>{
        console.log("journal id========", journalId, journalText, journalTitle, journalColor )
        navigation.navigate('EditJournal', { journalId :  journalId, journalText:  journalText, journalTitle: journalTitle, journalColor: journalColor  })
       
    }

    const renderItem = ({ item, index }) => {
        // console.log(item._id)

        return (
            <TouchableOpacity onLongPress={() => longPress(item, index)} key={index} style={{
                borderWidth: 1, marginLeft: 20, marginTop: 20, padding: 4,
                backgroundColor: press === index ? '#a9a9a9' : index % 5 == 0 ? '#ECC090' : 'white',
                borderColor: press === index ? '#a9a9a9' : '#ECC090', borderStyle: 'dashed', borderRadius: 8, width: '44%'
            }}>
                <Text style={{ fontSize: 13, fontFamily: 'Montserrat-SemiBold', marginLeft: 10, marginRight: 10, width: 145 }}>{item.title}</Text>
                <Text style={{ fontSize: 10, fontFamily: 'Montserrat-Regular', marginLeft: 10, margin: 5, marginRight: 10, color: item.text_color }}>{item.description}</Text>
            </TouchableOpacity>
        )

    }



    return (
        <View style={{ flex: 1, backgroundColor: 'rgb(250,233,215)', }}>
            <ImageBackground source={upImage} style={{ width: wp('100%'), height: hp('100%'), }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity onPress={() => navigation.openDrawer()}>
                            <Image source={require('../images/drawer.png')} style={{ width: 25, height: 15, marginTop: 25, marginLeft: 20 }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 16, color: '#000', marginTop: 20, color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 20, textAlign: 'center' }}>Journal</Text>
                    </View>

                    <View style={{flexDirection: 'row', marginTop: 30,}}>
                        <View style={{width: 25, height: 25,  borderWidth: 1, backgroundColor: '#EBC7A1', borderRadius: 5, borderColor: '#C28647', alignItems: 'center',justifyContent: 'center'}}>
                         <IconPencil name='pencil-alt' onPress={()=>editButton()} type='FontAwesome5' size={14} style={{ }} />
                        </View>

                        <View style={{width: 25, height: 25,  borderWidth: 1, backgroundColor: '#EBC7A1', borderRadius: 5, borderColor: '#C28647', alignItems: 'center',justifyContent: 'center',  marginRight: 20, marginLeft: 10}}>
                        <IconDelete name='delete' onPress={()=>deleteButton()} size={19} color='#000' style={{   }} />
                        </View>
                    </View>

                </View>



                <FlatList
                    data={journalData}
                    renderItem={renderItem}
                    keyExtractor={item => item.id}
                    numColumns={2}
                    style={{ flex: 1, marginTop: 50, marginBottom: 100 }}
                />



                <FAB
                    style={{
                        bottom: 100, position: 'absolute', right: 0, marginBottom: 20, marginRight: 20,
                        backgroundColor: '#C28647',
                    }}
                    icon="plus"
                    onPress={() => navigation.navigate('AddJournal')}
                />

                {/* <SpinnerModal
                visible={isLoading}
                heading="Please Wait ..."
            /> */}

            </ImageBackground>
        </View>

    )

}

export default Journal