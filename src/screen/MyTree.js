
import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View, Image, TextInput, FlatList
} from 'react-native';
import AwesomeHierarchyGraph from 'react-native-d3-tree-graph';
import { TouchableOpacity } from 'react-native-gesture-handler';

var root = {
    
        
    
    id: 2,
    name: "w",
    imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
    nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 },
            
    id: 3,
    children: [ {
            name: "Q",
            id: 16,
            no_parent: true,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        },
        {
        name: "",
        id: 2,
        no_parent: true,
        hidden: true,
        children: [{
            name: "J",
            id: 12,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "L",
            id: 13,
            no_parent: true,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "C",
            id: 3,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "frtg",
            id: 4,
            hidden: true,
            no_parent: true,
            children: [{
                name: "D",
                id: 5,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }, {
                name: "",
                id: 14,
                hidden: true,
                no_parent: true,
                children: [{
                    name: "P",
                    id: 15,
                    imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                    nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                    nodeTextStyle: { fontSize: 12 }
                }]
            }, {
                name: "E",
                id: 6,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }]
        }, {
            name: "K",
            id: 11,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 }
        }, {
            name: "G",
            id: 7,
            imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
            nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
            nodeTextStyle: { fontSize: 12 },
            children: [{
                name: "H",
                id: 8,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }, {
                name: "I",
                id: 9,
                imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
                nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
                nodeTextStyle: { fontSize: 12 }
            }]
        }]
    }, {
        name: "M",
        id: 10,
        no_parent: true,
        imageUrl: { href: { uri: "https://facebook.github.io/react-native/docs/assets/favicon.png"}},
        nodeImageStyle: { imageHeight: 60 , imageWidth: 60, opacity: 1 },
        nodeTextStyle: { fontSize: 12 },
        children: [
          
        ]
    },
    {
        name: "anoop",
        id: 155,
        no_parent: true,
        children: [{
            name: "H",
            id: 8,
        }, {
            name: "I",
            id: 9,
        },
        {
            name: "I",
            id: 9,
        },
        {
            name: "I",
            id: 9,
        },
        {
            name: "I",
            id: 9,
        },

      ]
    },
    {
            name: "x",
            id: 16,
            no_parent: true
        }
  
  ]
}

var pushData  = []
export default class example extends Component {
    state={
      name: '',
      data:[]
    }




    addData=()=>{
       
      var e = pushData.push({img: 'https://www.w3schools.com/howto/img_avatar.png', name: "name"})

      console.log("=====>", pushData);
      this.setState({data: pushData})
    }


  render() {
    console.log("cdfjgv", pushData);
    return (
        <View style={styles.container}>

            {/* <Image source={{uri: 'https://www.w3schools.com/howto/img_avatar.png'}} style={{width:100, height:100, borderRadius: 50}}/>
            <TextInput 
              placeholder="Enter Name"
              value={this.state.name}
              onChange={(text)=>this.setState({name: text})}
              />


{this.state.data.map((item)=>{
              console.log("chdfgv", item);
              return(
                  <View>
                      <Image source={{uri: item.img}} style={{width:100, height:100, borderRadius: 50}}/>
            <TextInput 
              placeholder={item.name}
              value={this.state.name}
              onChange={(text)=>this.setState({name: text})}
              />
                      </View>
              )
          })}
          
          <TouchableOpacity onPress={()=>this.addData()}>
          <Image source={require('../images/Plus_icon.png')} style={{ width: 60, height: 60, marginLeft: 5 }} />
          </TouchableOpacity> */}




         
        
        <AwesomeHierarchyGraph
         root = {root}
        //  siblings = {siblings}
        />
       </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('example', () => example);