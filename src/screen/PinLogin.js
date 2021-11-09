import Icon from "react-native-vector-icons/Feather"
import Iconn from "react-native-vector-icons/AntDesign"
import React, { useEffect, useRef, useState } from "react"
import { SafeAreaView, StatusBar, Text, TouchableOpacity, View, StyleSheet, Dimensions, PermissionsAndroid, ActivityIndicator, Modal } from "react-native"
import ReactNativePinView from "react-native-pin-view"
import AsyncStorage from "@react-native-community/async-storage";
import axios from "axios";
import Video from "react-native-video";
import { RFValue } from "react-native-responsive-fontsize";
import { baseUrl } from '../Api/COntstant';
import Geolocation from '@react-native-community/geolocation';

const { width, height } = Dimensions.get("window");

const loginn = require('../images/login.png');
const videos = require('../videos/login.mp4')


const PinLogin = ({ route, navigation }) => {
    const pinView = useRef(null)
    const [showRemoveButton, setShowRemoveButton] = useState(false)
    const [enteredPin, setEnteredPin] = useState("")
    const [showCompletedButton, setShowCompletedButton] = useState(false)
    const [token, setToken] = useState('')
    const [modal, setModal] = useState(false)
    const [timeEStimate, setTimeEstimate] = useState(false)
    const [loggingIn, setloggingIn] = useState(false)
    const [entered, setEntered] = useState(false)
    const [val, setVal] = useState(false)
    const [established, setestablished] = useState(false)

    const pin = route.params

    useEffect(async () => {
        console.log("global.arrayData====>", global.arrayData)
        console.log("entered pin-======?", global.BloodtimeDiff, global.MinutestimeDiff, global.HearttimeDiff, global.BreathtimeDiff)
       
        getProfile()

        const unsubscribe = navigation.addListener('focus', () => {
            // setEnteredPin('')
            pinView.current.clearAll()
            console.log("entered pin-======? focus", global.BloodtimeDiff, global.MinutestimeDiff, global.HearttimeDiff, global.BreathtimeDiff)

        });

        return unsubscribe;





    }, [navigation]);

    const requestLocationPermission = async () => {

        try {
    
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
    
          },
          )
    
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            Geolocation.getCurrentPosition(info => {
    
    
    
              getBeginsData(info)
    
              console.log("info=====>", info)
            },
              (error) => alert("Error: Are location services on?"),
              // { enableHighAccuracy: true }
              {
                enableHighAccuracy: false,
                timeout: 18000000,
                maximumAge: 0,
                forceRequestLocation: true
    
              }
            );
    
    
          }
    
        }
        catch (err) {
          console.log("err")
        }
    
      };
    
      const getBeginsData = async (data) => {
        console.log("get given date data====>", data);
        axios.get(`https://api.aladhan.com/v1/timings/${data.timestamp}?latitude=${data.coords.latitude}&longitude=${data.coords.longitude}`, {
          headers: {
            'auth-token': token
          }
        })
          .then((response) => {
            console.log("get given date data====>", response.data.data.timings);
            global.fajr = response.data.data.timings.Fajr
            global.zuhr = response.data.data.timings.Dhuhr
            global.asr = response.data.data.timings.Asr
            global.maghrib = response.data.data.timings.Maghrib
            global.isha = response.data.data.timings.Isha
    
          })
          .catch((error) => {
            console.log('error', error)
          })
      };

    const getProfile = async () => {
        const token = await AsyncStorage.getItem('token')
        console.log("auth token", token)

        var data = '';



        axios.post(baseUrl+ 'me', data, {
            headers: {
                "auth-token": token
            }
        })
            .then((response) => {
                console.log('response user', response.data)
                setToken(response.data.token)
                global.userId = response.data._id

            })
            .catch((error) => {
                console.log('error', error)
                // dispatch(userUpdateProfileFail())

            })


    }


    const dashboardData = async () => {
        requestLocationPermission()
        getData()
        var currentDate = new Date(),
            month = ("0" + (currentDate.getMonth() + 1)).slice(-2),
            day = ("0" + currentDate.getDate()).slice(-2),
            year = ("0" + currentDate.getFullYear()).slice(-4)
        var dd = [year, month, day].join("-")
        global.dateValue = dd


        const token = await AsyncStorage.getItem('token')
        console.log("auth token", token, global.dateValue)
        var param = {
            "date": global.dateValue
        }

        axios.post(baseUrl+ 'dashboard', param, {
            headers: {
                'auth-token': token
            }
        })
            .then((response) => {
                console.log("response-====>", response)

                if (response.data.data.length === 0) {
                    response.data.types.map((item) => {
                        item.progress = 0
                    })


                }
                else {
                    const newArrayData = response.data.types.map(function (entry) {
                        for (var i = 0; i < response.data.data.length; i++) {

                            console.log("==== entry id", entry._id, response.data.data[i]._id)

                            if (entry._id === response.data.data[i]._id) {
                                console.log(entry._id, response.data.data[i]._id);

                                if (entry.numberOfSegments === undefined) {
                                    entry.numberOfSegments = 0;
                                }

                                const totalRating = (parseInt(response.data.data[i].totalRatings) / parseInt(entry.numberOfSegments)) * 10

                                entry.progress = isNaN(totalRating) ? 0 : totalRating

                                break
                            }
                            else {
                                entry.progress = 0
                                //   break
                            }

                        }



                        // 
                        return entry;
                    });

                }
                global.totalRatingsData = response.data.types
                console.log("response.data.types===>", global.totalRatingsData);



            })
            .catch((error) => {
                console.log('error', error)
            })
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



    function toTimestamp(strDate) {
        var datum = Date.parse(strDate);
        return datum / 1000;
    }



    const enterPinValue = async (value) => {
        setEnteredPin(value)
        console.log("====",value, enteredPin)
        const token = await AsyncStorage.getItem('loginToken')
        const loginPin = await AsyncStorage.getItem('pin')
        console.log(JSON.parse(token), "--", enteredPin, "==", loginPin, value)

        if (JSON.parse(token) === value || loginPin == value) {
            setestablished(!established)
            

            setTimeout(() => {
                setModal(!modal)
                setTimeout(() => {
                    setloggingIn(!loggingIn)
                    setTimeout(() => {
                        validData(value)
                       
                      }, 1000)
                  }, 1500)
              }, 1500)

             

             
            
            console.log("entered--->", modal);

           




        }
        else if(value.length == 5){
            if(value != JSON.parse(token) ){
                pinView.current.clearAll()
                alert("Pin not matched")
            }
        }

    }


    const validData= async(value)=>{
 const tokens = await AsyncStorage.getItem('token')

            var params = null

            const headers = {

            };

            params = {
                "token": value,
            }
            console.log("response ---t", tokens, value, global.birthday,)


            axios.post('http://112.196.64.119:8000/api/user/pin_login', params, {
                headers: {
                    "auth-token": tokens
                }
            })
                .then((response) => {

                   console.log("resposne--->", response.data.msg);

                   if(response.status == 200){
                    var currentDate = new Date(),
                    month = ("0" + (currentDate.getMonth() + 1)).slice(-2),
                    day = ("0" + currentDate.getDate()).slice(-2),
                    year = ("0" + currentDate.getFullYear()).slice(-4)
                  var dd = [month, day, year].join("/")
                  var time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
                  console.log(time);


                  //change the format of any date
                  var date = global.birthday;
                  var datearray = date.split("/");
                  var newdate = datearray[1] + '/' + datearray[0] + '/' + datearray[2];


                  var default_time = ' 00:00:00' // for default time
                  var defaultGivenTime = dd + ' ' + time //for current date and time


                  let datetime = newdate.concat(default_time); 

                  let converTimeStamp = toTimestamp(datetime)
                  let givenDateTimeStamp = toTimestamp(defaultGivenTime)

                  global.converTimeStamp = converTimeStamp

                  const diffreTime = Math.abs(givenDateTimeStamp - converTimeStamp); 

                  var sepratorData = diffreTime.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")


                  global.BloodtimeDiff = diffreTime
                  global.MinutestimeDiff = diffreTime
                  global.HearttimeDiff = diffreTime
                  global.BreathtimeDiff = diffreTime

                  global.seconds = '00'
                  setestablished(false)
                 setTimeout(()=>{
                    setModal(false)
                    // setestablished(false)
                 },1000)
                
                   console.log(global.userId);
                    setVal(!val)
                   dashboardData()
                   navigation.navigate('Setting')  
                   }
                  
                })
                .catch((error) => {
                    console.log('error', error.response)
                    // dispatch(userUpdateProfileFail())

                })
    }
   


    return (
        <>
            <StatusBar barStyle="light-content" />
            <Video
        source={videos}
        style={styles.backgroundVideo}
        muted={true}
        repeat={true}
        resizeMode={"cover"}
        rate={1.0}
        ignoreSilentSwitch={"obey"}
      />

            {modal ?

                <Modal
                    animationType='fade'
                    transparent={true}
                    // visible={visible}
                    onRequestClose={() => {
                        // Alert.alert("Modal has been closed.");
                        // setModalVisible(!visible);
                    }}
                >
                    <View style={{ alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.1)'}} >
                        <View style={{
                            width: '70%', padding: 30, borderRadius: 20, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 },
                            shadowColor: '#363636',
                            shadowOpacity: 1,
                            elevation: 4,
                        }}>
                            <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'Montserrat-Medium' }}>Wi-Islam</Text>
                            <ActivityIndicator size="small" color="#000" style={{ margin: 20 }} />

                        { loggingIn  ? 
                         <View>
                             
                         <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Montserrat-Medium' }}>Logging in...</Text>
                         
                     </View> 
                     :  
                           <View>
                           <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Montserrat-Medium' }}>Locating account...</Text>
                           
                       </View> 
                      } 
                           





                        </View>
                    </View>
                </Modal>
                :

                <SafeAreaView
                    style={{ flex: 1, backgroundColor: "rgba(0,0,0,0.1)", alignItems: "center" }}>

                    <Text
                        style={{
                            marginTop: '8%',
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: RFValue(22),
                            fontFamily: 'Montserrat-Regular'
                        }}>
                        Assalamu Alaikum
                    </Text>

                    {global.userName <= 5 ?
                        <Text
                            style={{
                                width: global.userName <= 5 ? 100 : 0,
                                marginTop: 8,
                                color: 'black',
                                padding: 5,
                                paddingLeft: 10,
                                paddingRight: 10,
                                borderRadius: 30,
                                fontFamily: 'Montserrat-Medium',
                                fontSize: RFValue(20),
                                backgroundColor: 'white',
                                textAlign: 'center',

                            }}>
                            {global.userName}
                        </Text>

                        :

                        <Text
                            style={{
                                marginTop: 8,
                                color: 'black',
                                padding: 5,
                                paddingLeft: 25,
                                paddingRight: 25,
                                borderRadius: 30,
                                fontFamily: 'Montserrat-Medium',
                                fontSize: 20,
                                backgroundColor: 'white',
                                textAlign: 'center',

                            }}>
                            {global.userName}
                        </Text>
                    }


                    <Text
                        style={{
                            marginTop: 20,
                            color: 'rgba(255,255,255,0.6)',
                            fontSize: 13,

                        }}>
                        Enter your 5 digit passcode to login
                    </Text>
                    <ReactNativePinView
                        style={{ marginTop: 10 }}
                        inputSize={15}
                        ref={pinView}
                        pinLength={5}
                        buttonSize={70}
                        onValueChange={value => enterPinValue(value)}
                        customRightAccessibilityLabel='true'
                        buttonAreaStyle={{
                            marginTop: 10,
                        }}
                        inputAreaStyle={{
                            marginBottom: 10,
                        }}
                        inputViewEmptyStyle={{
                            backgroundColor: "transparent",
                            borderWidth: 1,
                            borderColor: "#FFF",
                        }}
                        inputViewFilledStyle={{
                            backgroundColor: "#FFF",
                        }}
                        buttonViewStyle={{
                            borderWidth: 1,
                            marginTop: 5,
                            backgroundColor: '#fff',

                            borderColor: "#FFF",
                        }}
                        buttonTextStyle={{
                            color: "#000",
                            fontSize: 24,
                            fontFamily: 'Montserrat-Medium'
                        }}
                        onButtonPress={key => {
                            console.log("===", key)

                            if (key === "custom_left") {
                                pinView.current.clear()
                            }
                            if (key === "custom_right") {
                                pinView.current.clearAll()

                            }

                        }}
                        customLeftButton={<View style={{ marginTop: 5 }}>
                            <View style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 35 }}>
                                <Icon name={"delete"} size={25} color={"#000"} />
                            </View>
                        </View>}

                        customRightButton={<View style={{ marginTop: 5 }}>
                            <TouchableOpacity onPress={() => navigation.navigate('Help')} style={{ width: 70, height: 70, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff', borderRadius: 35 }}>

                                <Iconn name={"question"} size={28} color={"#000"} />
                            </TouchableOpacity>

                        </View>}
                    />
                </SafeAreaView>
           } 

            {established? 
                <Modal
                animationType='fade'
                transparent={true}
                // visible={visible}
                onRequestClose={() => {
                  // Alert.alert("Modal has been closed.");
                  // setModalVisible(!visible);
                }}
              >
                <View style={styles.centeredView} >
                <View style={{ width: '70%', padding: 30, borderRadius: 20, backgroundColor: '#fff', shadowOffset: { width: 10, height: 10 },
  shadowColor: '#363636',  
  shadowOpacity: 1,
  elevation: 4,}}>
                <Text style={{ textAlign: 'center', fontSize: 30, fontFamily: 'Montserrat-Medium' }}>Wi-Islam</Text>
                <ActivityIndicator size="small" color="#000" style={{ margin: 20 }} />
                
           
               <View>
               <Text style={{ textAlign: 'center', fontSize: 13, fontFamily: 'Montserrat-Medium' }}>Establishing identity...</Text>
           </View>

          

              

            </View>
            </View>
              </Modal> 
              : null
                }

            {/* </ImageBackground> */}
        </>
    )
}

const styles = StyleSheet.create({


    backgroundVideo: {
        height: height,
        position: "absolute",
        top: 0,
        left: 0,
        alignItems: "stretch",
        bottom: 0,
        right: 0,
        width: width
    },
    centeredView: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.2)'
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
});

export default PinLogin