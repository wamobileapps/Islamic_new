// import React, { useEffect, useState } from 'react';
// import { View, Text, FlatList, ImageBackground, TouchableOpacity, Image } from 'react-native';

// const General = ({ navigation }) => {

    


//     return (
//         <View style={{ flex: 1, backgroundColor: 'rgb(250,233,215)', }}>
//            <Text>xzhdsc</Text>
//         </View>

//     )

// }

// export default General


import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
  TextInput,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';


function TVScreen() {
    const [block1, setBlock1] = useState('');
    const [block2, setBlock2] = useState('');
    const [textfield, setTextfield] = useState(false);
  const [response, setResponse] = useState('');

  useEffect(async () => {
    var token = await AsyncStorage.getItem('token');

    axios
      .get('http://112.196.64.119:8000/api/user/generalyou/list/general', {
        headers: {
          'auth-token': token,
        },
      })
      .then(response => {
        console.log('responseTVLISTTT========>>.', response.data);
        setResponse(response.data[0]);
      })
      .catch(error => {
        console.log('error=======tcvvv', error);
      });
  },[]);


   const crossIcon = async()=>{
   
   
    var options={ 
    "options":[
      block1 ? block1:response.name,
      block2 ? block2:response.name ],
    "type":"general",
    "user_id":"61125c7d32945d177ef458b6"}
console.log("options",options);
    axios
    .patch('http://112.196.64.119:8000/api/user/generalyou/update/6141a632f126bf5869e4781e', options,{
      headers: {
        'auth-token':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTEyNWM3ZDMyOTQ1ZDE3N2VmNDU4YjYiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE2MzE2OTQ0MjJ9.dtW95J8k-EBCXe0y3M45nE0eJSPt1V7ldMZjmCUyKgc",
      },
    })
    .then(response => {
      console.log('response123========>>.', response.data);
      setBlock1(response.data)
      setBlock2(response.data)
    })
    .catch(error => {
      console.log('error=======123', error);
    });
   }



  return (

<View style={{alignSelf: 'center',marginTop:"17%",flex:1}}>
<View style={{textAlign: 'center',flexDirection:"row",justifyContent:'space-between'}}>          
<Text style={{textAlign: 'center',fontSize:18}}>General You</Text>
<TouchableOpacity onPress={() => crossIcon()}>
{/* <Image source={require('../images/Group.png')} style={{ width: 28, height: 28, marginLeft: "50%" ,marginTop:10}} />    */}
 </TouchableOpacity>               
</View>





    <ScrollView  style={{alignSelf: 'center',backgroundColor: 'white'}}>
      <View style={{alignSelf: 'center',backgroundColor: 'white'}}>
        <ImageBackground
          source={require('../images/upimage.png')}
          style={{height: 43, width: 260}}>
          <TextInput
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '75%',
              left: 35,
            }}
            multiline={true}
            value={response.text1}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ImageBackground
            source={require('../images/leftimage.png')}
            style={{height: 115, width: 86, bottom: 28, right: 9}}>
            <TextInput
            
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginTop: 40,
                marginRight: 10,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text2}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>

          <View style={{marginTop: 9}}>
            
            <TextInput
             placeholder={response.name}
              placeholderTextColor="#000"
              scrollEnabled={true}
              
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                
                color: 'black',
                width: 70,
                height: 45,
            
              }}
              multiline={true}
              value={block1}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setBlock1(text)}
             
            />
          </View>

          <ImageBackground
            source={require('../images/rightimage.png')}
            style={{height: 115, width: 86, bottom: 28, left: 11}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                marginTop: 40,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text3}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>
        </View>
        <ImageBackground
          source={require('../images/downimage.png')}
          style={{height: 43, width: 260, bottom: 57}}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '70%',
              left: 35,
            }}
            multiline={true}
            value={response.text4}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
     
      {/* /////////////////////////////////////////1st block completed/////////////////////////////////////////////////////// */}

      
        <ImageBackground
          source={require('../images/upimage.png')}
          style={{height: 43, width: 260}}>
          <TextInput
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '75%',
              left: 35,
            }}
            multiline={true}
            value={response.text1}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ImageBackground
            source={require('../images/leftimage.png')}
            style={{height: 115, width: 86, bottom: 28, right: 9}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginTop: 40,
                marginRight: 10,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text2}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>
          <View style={{marginTop: 9}}>
           
<TextInput
              placeholder={response.name}
              placeholderTextColor="black"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                
                color: 'black',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={block2}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setBlock2(text)}
            />


          </View>
          <ImageBackground
            source={require('../images/rightimage.png')}
            style={{height: 115, width: 86, bottom: 28, left: 11}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                marginTop: 40,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text3}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>
        </View>
        <ImageBackground
          source={require('../images/downimage.png')}
          style={{height: 43, width: 260, bottom: 57}}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '70%',
              left: 35,
            }}
            multiline={true}
            value={response.text4}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
    
      {/* //////////////////////////////////////////////////2nd block completed////////////////////////////////////////////////////////////////////////////////// */}
     
        <ImageBackground
          source={require('../images/upimage.png')}
          style={{height: 43, width: 260}}>
          <TextInput
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '75%',
              left: 35,
            }}
            multiline={true}
            value={response.text1}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ImageBackground
            source={require('../images/leftimage.png')}
            style={{height: 115, width: 86, bottom: 28, right: 9}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginTop: 40,
                marginRight: 10,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text2}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>
          <View style={{marginTop: 9}}>
          <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                
                color: 'black',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.name}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </View>
          <ImageBackground
            source={require('../images/rightimage.png')}
            style={{height: 115, width: 86, bottom: 28, left: 11}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                marginTop: 40,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text3}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>
        </View>
        <ImageBackground
          source={require('../images/downimage.png')}
          style={{height: 43, width: 260, bottom: 57}}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '70%',
              left: 35,
            }}
            multiline={true}
            value={response.text4}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
     
      {/* ///////////////////////////////////////////////////////3rd completed///////////////////////////////////////////////// */}
      
        <ImageBackground
          source={require('../images/upimage.png')}
          style={{height: 43, width: 260}}>
          <TextInput
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '75%',
              left: 35,
            }}
            multiline={true}
            value={response.text1}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ImageBackground
            source={require('../images/leftimage.png')}
            style={{height: 115, width: 86, bottom: 28, right: 9}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginTop: 40,
                marginRight: 10,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text2}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>
          <View style={{marginTop: 9}}>
          <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                
                color: 'black',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.name}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </View>
          <ImageBackground
            source={require('../images/rightimage.png')}
            style={{height: 115, width: 86, bottom: 28, left: 11}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                marginTop: 40,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text3}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>
        </View>
        <ImageBackground
          source={require('../images/downimage.png')}
          style={{height: 43, width: 260, bottom: 57}}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '70%',
              left: 35,
            }}
            multiline={true}
            value={response.text4}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
    
      {/* //////////////////////////////////////////4th block completed////////////////////////////////////////////// */}
     
        <ImageBackground
          source={require('../images/upimage.png')}
          style={{height: 43, width: 260}}>
          <TextInput
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '75%',
              left: 35,
            }}
            multiline={true}
            value={response.text1}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <ImageBackground
            source={require('../images/leftimage.png')}
            style={{height: 115, width: 86, bottom: 28, right: 9}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginTop: 40,
                marginRight: 10,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text2}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>
          <View style={{marginTop: 9}}>
          <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                
                color: 'black',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.name}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </View>
          <ImageBackground
            source={require('../images/rightimage.png')}
            style={{height: 115, width: 86, bottom: 28, left: 11}}>
            <TextInput
              placeholder="Password"
              placeholderTextColor="#000"
              scrollEnabled={true}
              textAlign={'center'}
              style={{
                fontSize: 13,
                marginLeft: 10,
                marginTop: 40,
                color: 'white',
                width: 70,
                height: 45,
              }}
              multiline={true}
              value={response.text3}
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={text => setResponse(text)}
            />
          </ImageBackground>
        </View>
        <ImageBackground
          source={require('../images/downimage.png')}
          style={{height: 43, width: 260, bottom: 57}}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#000"
            textAlign={'center'}
            scrollEnabled={true}
            style={{
              fontSize: 13,
              marginTop: 10,
              color: 'white',
              width: '70%',
              left: 35,
            }}
            multiline={true}
            value={response.text4}
            autoCapitalize="none"
            keyboardType="email-address"
            onChangeText={text => setResponse(text)}
          />
        </ImageBackground>
     

      {/* ///////////////////////////////////5th block completed////////////////////////////////////////// */}
      </View>
    </ScrollView>
    </View>
  );
}

export default TVScreen;

