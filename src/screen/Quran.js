import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Dimensions, TouchableOpacity, Image } from 'react-native';
import IconDown from 'react-native-vector-icons/AntDesign';
import Iconsearch from "react-native-vector-icons/AntDesign"

const Quran = (props) => {


    const filterData=[{
        id:0,
        title:'SURAHS',
    },
    {
        id:1,
        title:"JUZ'",
    },
    {
        id:2,
        title:'BOOKMARKS',
    }]
const windowWidth=Dimensions.get('window').width

const [selectedFilterTab,setSelectedFilterTab]=useState(filterData[0])
    useEffect(()=>{
getData()
    },[])

const getData=async()=>{
const res= await axios.get('https://api.quran.com/api/v4/juzs')
let data=res.data.juzs
const juzData=await axios.get('https://api.quran.com/api/v4/juzs/'+data[0].id)
console.log("Response is",juzData.data)
}

const filterTab=()=>{
    return         <View style={{height:50,width:windowWidth,backgroundColor:"#EBC59D",flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
            {filterData.map((item,index)=>{
return <TouchableOpacity style={{flex:1,alignItems:'center',height:'100%',justifyContent:'center',backgroundColor:index==selectedFilterTab.id?'#C28647':"#EBC59D"}}>
<Text style={{fontSize:18,fontFamily: 'Montserrat-Medium',color:'white'}}>
    {item.title}
</Text>
{index==selectedFilterTab.id&&<View style={{width:'100%',height:8,borderTopEndRadius:16,borderTopStartRadius:16,backgroundColor:'white',position:'absolute',bottom:-1}}></View>}
</TouchableOpacity>
    })}
    </View>
}

    return (
        <View style={{ flex: 1}}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity onPress={() => props.navigation.openDrawer()}>
            <Image source={require('../images/drawer.png')} style={{ width: 25, height: 15, marginTop: 25, marginLeft: 20 }} />
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={() => setDropDown(!dropDown)} style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: 16, color: '#000', marginTop: 20, color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 20, textAlign: 'center' }}>{val}</Text>
            <IconDown name='caretdown' type='AntDesign' color='#454545' size={12} style={{ marginTop: 28, marginLeft: 10 }} />
          </TouchableOpacity> */}
        </View>
        <View style={{ width: 28, height: 28, borderRadius: 14, backgroundColor: '#EBC7A1', marginTop: 25, right: 20, alignItems: 'center', justifyContent: 'center' }}>
          <Iconsearch name='search1' size={18} color="black" style={{ position: 'absolute' }} />
        </View>
        </View>
             {filterTab()}
           <Text>Quran screen</Text>
        </View>
    )
}

export default Quran