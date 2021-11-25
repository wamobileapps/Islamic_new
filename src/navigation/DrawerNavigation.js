import React, { Component, useState, useRef, useEffect } from 'react';
import { useWindowDimensions, View, Text, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/AntDesign'
import ChangePassword from "../screen/ChangePassword";
import Home from '../screen/HomeScreen';
import AsyncStorage from "@react-native-community/async-storage";
import BottomTabs from './BottomNavigation'
const Drawer = createDrawerNavigator();
import { baseUrl } from '../Api/COntstant';
import axios from 'axios';
import moment from 'moment';
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

global.CategoryList = []
let your_data = []
var videoData = []
var arrayOfArrays = [];
var countryArray = [];
global.moodData = []

const MyDrawer=({navigation})=> {
  
  const [name, setName] = useState('')
  const[number, setNumber] = useState('')
  const[imageUser, setUserImage] = useState('')

  useEffect(()=>{

    const unsubscribe = navigation.addListener('focus', () => {
      getProfile()
  });

  return unsubscribe;
}, [navigation]);
     

  const getProfile=async()=>{
    global.moodData = []
    getGraphData()
    moodGraph()
    getDataMonth()
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

   var data = '';

       
      
      axios.post('http://112.196.64.119:8000/api/user/me', data, {
        headers: {
        "auth-token": token
    }})      
      .then((response) => {
        console.log('response',response.data)
        setName(response.data.name)
        setNumber(response.data.mobile_number)
        setUserImage(response.data.profile_image)
        // global.userImage = response.data.profile_image

      })
      .catch((error) => {
        console.log('error',error)
        // dispatch(userUpdateProfileFail())

      })


  }

  
  const getDataMonth=()=>{
    var date = new Date();
    global.month = date.getMonth()
  
    var lMonth = parseInt(global.calMonth)
    // alert(global.calMonth)
    
    var firstDay =
      new Date(date.getFullYear(),lMonth, 1);

    var lastDay =
      new Date(date.getFullYear(),lMonth, 0);

      
      global.selectMonth =  moment(firstDay).format("MMM"); 
      var month  = global.selectMonth
     
    var start_date = moment(firstDay).format("DD"); 
    var year = moment(firstDay).format("YYYY");

    var last_date = moment(lastDay).format("DD"); 
   global.last_date = last_date
    console.log("get month daya--->",  lastDay, "====", global.calMonth);

    var s_Date= `${start_date} ${month} ${year} -`
    global.sDate = s_Date
    
    
    var l_Date= ` ${last_date} ${month} ${year}`
    global.lDate = l_Date
  }

  const moodGraph = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token", token)

    axios.get(baseUrl + `moodGraph`, {
        headers: {
            'auth-token': token
        }
    })
        .then((res) => {

        //  console.log("graph data===>", res.data);

          
          var videoData = []
          var ratinglength = []
          var ratingArray = []
          var rootArray = [];
          var len = res.data.length;
          for (let ii = 0; ii < len; ii++) {

            var date = moment(res.data[ii].date).format('DD')
           
            ratinglength = res.data[ii].rating;
            var  a = (30 - ratinglength.length)

            for (let i = 1; i <= a; i++) {
             
                if(ratinglength.length > i){
                  ratinglength.push(0);
                  // ratingArray.push(0)
                    }
                    
                    
            }
            
            for (let index = 0; index < 30; index++) {
              var d = Array(30).fill(date)

            }

           
            
            var videoItem = { x: d, y: ratinglength }
            rootArray.push(videoItem)
           

            var myarray = [];
        
    for (let i = 0; i < rootArray.length; i++) {
      for (let j = 0; j < rootArray[i].x.length; j++) {
        var d ={x: rootArray[i].x[j],  y : rootArray[i].y[j] }
        myarray.push(d);
      }

    }

    var arrayOfArrays = [];
    var arrayOfArrayss = []
    for (let id = 0; id < myarray.length; id += 30) {
      arrayOfArrays.push(myarray.slice(id, id + 30));
    }
  
            // console.log("mood data graph===>",arrayOfArrayss);
           
           
            // global.moodData = videoData
            // videoData.push(ratinglength);
        }
       

        var myarrayy = [];
        for (let i = 0; i <= 30; i++) {
          for (let j = 0; j < arrayOfArrays.length; j++) {
            myarrayy.push(arrayOfArrays[j][i]);
            // console.log(j,i);
          
          }
    
        }
    
    
        myarrayy = myarrayy.filter(function (element) {
          return element !== undefined;
        });
    
        var size = arrayOfArrays.length;
        for (let i = 0; i < myarrayy.length; i += size) {
          arrayOfArrayss.push(myarrayy.slice(i, i + size));
        }
    
    console.log("arrayOfArrayss: ",arrayOfArrayss);
    global.moodData = arrayOfArrayss

        // var myarray = [];
        // for (var i = 0; i < videoData.length; i++) {
        //   for (let j = 0; j < videoData.length; j++) {
        //     myarray.push(videoData[j][i]);
        //   }
    
        // }

// var mynew  = [];
//         rootArray.map((item) => {
//           mynew
//         })
        
        })
        .catch((error) => {
            console.log('error', error)
        })
}


  const getGraphData = async () => {
    const token = await AsyncStorage.getItem('token')
    console.log("auth token bio", token)

    axios.get('http://112.196.64.119:8000/api/user/dailyUpdate/graph', {
        headers: {
            'auth-token': token
        }
    })
        .then((response) => {
            console.log('response graph list==>', response.data)

            const arrayData = []
            const arrayColor = []
            const arrayData2 = [3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5, 3.5];


            if (response.data.data.length === 0) {
                response.data.CategoryList.map((item, index) => {
                    item.consumed_hrs = 0
                    arrayColor.push(entry.color)
                    arrayData.push({ x: item.consumed_hrs, y: 5, label: `${Math.round(item.consumed_hrs)}%` });
                })


            }
            else {
                const newArrayData = response.data.CategoryList.map(function (entry) {
                    for (var i = 0; i < response.data.data.length; i++) {

                        if (entry._id === response.data.data[i].activitycategories._id) {


                            const totalRating = (parseInt(response.data.data[i].consumed_hrs) / 15) * 10
                            entry.consumed_hrs = isNaN(totalRating) ? 0 : totalRating
                            
                             console.log("===>totalRating", totalRating);
                            break
                        }
                        else {
                            entry.consumed_hrs = 0
                            //   break
                        }

                    }



                    // 
                    return entry;
                });

                for (var i = 0; i < response.data.CategoryList.length; i++) {

                    let entry = response.data.CategoryList[i]
                    console.log("array data==>", entry.color);
                    arrayColor.push(entry.color)
                    arrayData.push({ x: entry.consumed_hrs, y: 5, label: `${Math.round(entry.consumed_hrs)}%` });
                  }
                  // console.log("===>", global.colorList);

               
            }

            console.log("category type===>", response.data.CategoryList);
            global.CategoryList = response.data.CategoryList
            global.list = arrayData
            global.colorData = arrayColor
            console.log("list----> d", global.colorData);

        })
        .catch((error) => {
            console.log('error', error)
        })
}

  const logout = async () => {
    await AsyncStorage.setItem('token', '')
    navigation.navigate('Login')

  }


  const CustomDrawerContent = (props) => {
    const width = 282;
    const height = 138;
    return (
      <DrawerContentScrollView {...props}>
        <View style={{ backgroundColor: '#fff2df', flex: 1 }} >
          <ImageBackground source={require('../images/drawerBack.png')}
            style={{ backgroundColor: '#fff2df', width: width, height: height, }}>
            <>

              <View style={{ flexDirection: 'row', marginTop: 30, justifyContent: 'space-between', padding: 10, marginLeft: 10 }}>
                <View style={{ flexDirection: 'row', }}>
                  <Image source={{uri: imageUser ? `http://112.196.64.119:8000/users/${imageUser}` : 'https://www.w3schools.com/howto/img_avatar.png' }} style={{ width: 54, height: 54, borderRadius: 27, }} />

                  <View style={{ marginLeft: 10, width: '50%',  }}>
                    <View style={{ }}>
                    <Text style={{ fontSize: 13, fontFamily: 'Montserrat-SemiBold',  }}>{name}</Text>
                    <Text style={{ fontSize: 13, fontFamily: 'Montserrat-Medium' }}>{number}</Text>
                    </View>



                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5, alignItems: 'center' }}>
                      <TouchableOpacity onPress={()=> navigation.navigate('UserProfile')} style={{ flexDirection: 'row', }}>
                        <Icon  name='edit' type='AntDesign' color='#C28647' size={12} style={{}} />
                        <Text style={{ marginLeft: 3, color: '#C28647', fontSize: 10, fontFamily: 'Montserrat-SemiBold' }}>Edit</Text>
                      </TouchableOpacity>

                      <TouchableOpacity style={{ flexDirection: 'row', marginLeft: 15 }} onPress={() => logout()}>
                        <Image source={require('../images/logout.png')} style={{ width: 12, height: 12 }} />
                        <Text style={{ marginLeft: 2, color: '#C28647', fontSize: 10, fontFamily: 'Montserrat-SemiBold' }}>Logout</Text>
                      </TouchableOpacity>

                    </View>
                  </View>

                  <Icon name='closecircleo' type='AntDesign' color='#454545' onPress={() => props.navigation.closeDrawer()} size={20} style={{ marginLeft: 20, marginRight: 10 }} />


                </View>

              </View>

              <View style={{ borderBottomWidth: 1, borderBottomColor: '#EBD6C0', margin: 20 }} />


            </>

          </ImageBackground>



          <View style={{ backgroundColor: 'white', height: 800,  }}>
            <View style={{ flexDirection: 'row', marginLeft: 20 }}>
              <Image source={require('../images/youIcon.png')} style={{ width: 7, height: 19, marginLeft: 12 }} />
              <Text style={{ marginLeft: 23, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>You</Text>
            </View>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Nafz')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15, }}>
              <Image source={require('../images/nafz.png')} style={{ width: 14, height: 12, marginLeft: 12 }} />
              <Text style={{ marginLeft: 16, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Nafz</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Setting')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15,  }}>
              <Image source={require('../images/akhlaq.png')} style={{ width: 25, height: 14, marginLeft: 5 }} />
              <Text style={{ marginLeft: 12, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Akhlaq </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('MyLifePlanGraph')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/Plan.png')} style={{ width: 18, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>My Life Plan</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Self')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/self.png')} style={{ width: 16, height: 18, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Self Psychology</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Goal')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/goal.png')} style={{ width: 15, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>My Life Goal</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Tree')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/tree.png')} style={{ width: 17, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>My Tree</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('MyMoodGraph')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/goal.png')} style={{ width: 15, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>My Mood Graph</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('Setting')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/goal.png')} style={{ width: 15, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Prayer Times Settings</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('PrayerSetting')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/goal.png')} style={{ width: 15, height: 15, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Calendar</Text>
            </TouchableOpacity>

            <View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/blog.png')} style={{ width: 16, height: 17, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>Blog</Text>
            </View>

            <TouchableOpacity onPress={()=>props.navigation.navigate('News')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/news.png')} style={{ width: 16, height: 17, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>News</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={()=>props.navigation.navigate('TVScreen')} style={{ flexDirection: 'row', marginLeft: 20, marginTop: 15 }}>
              <Image source={require('../images/tv.png')} style={{ width: 16, height: 17, marginLeft: 10 }} />
              <Text style={{ marginLeft: 15, color: '#454545', fontSize: 13, fontFamily: 'Montserrat-SemiBold' }}>TV</Text>
            </TouchableOpacity>

            
            {/* <Image source={require('../images/logout.png')} style={{ width: 12, height: 12 }} />

            <DrawerItem
              style={{
                position: 'absolute',
                left: 0,
                width: width,
                height: width,
              }}
              label="Screen2"
              labelStyle={{ color: '#609806' }}
              onPress={() => {
                props.navigation.navigate('Signup');
              }}
            /> */}
          </View>


        </View>
      </DrawerContentScrollView>
    );
  }


  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}>

      <Drawer.Screen name="BottomTabs" component={BottomTabs} />
      <Drawer.Screen name="ChangePassword" component={ChangePassword} />
    </Drawer.Navigator>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  menuItemsCard: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  circleContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    padding: 10,
  },
});

export default MyDrawer