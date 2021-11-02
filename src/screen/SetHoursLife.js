

import React from "react";
import Slider from "react-native-slider";
import { AppRegistry, StyleSheet, View, Text, ToastAndroid, Dimensions, Image, ScrollView, TextInput, KeyboardAvoidingView } from "react-native";
import Iconback from 'react-native-vector-icons/Entypo';
import { InputX, Button } from '../components/index';
import { TouchableOpacity } from "react-native";

const screenWidth = Dimensions.get('window').width;


export default class SliderExample extends React.Component {
    state = {
        category: '',
        hours: ''
    };

    componentDidMount = () => {
        const title = this.props.route.params.title
        const consumed_hrs = this.props.route.params.consumed_hrs
        console.log("====", title, consumed_hrs)



    }


    submit=()=>{
         console.log("cxdhj");
    }



    render() {


        return (
            <View style={{ flex: 1, backgroundColor: 'white' }} >
                <View style={{ backgroundColor: '#FAE9D7', height: 83, width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>

                    <TouchableOpacity onPress={() => this.props.navigation.goBack()} style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <Iconback name='chevron-left' size={28} color='#000' style={{ marginLeft: 20, }} />
                        <Text style={{ fontSize: 16, color: '#000', color: '#454545', fontFamily: 'Montserrat-Bold', marginLeft: 5, }}>24 Hours in my life</Text>
                    </TouchableOpacity>
                    <Image source={require('../images/life.png')} style={{ width: 28, height: 28, marginRight: 20 }} />
                </View>



                <KeyboardAvoidingView >




                    <View style={{ marginLeft: 15, backgroundColor: '#fff', height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, borderRadius: 5, borderColor: 'grey', elevation: 5 }}>

                        <TextInput
                            placeholder='Hours  '
                            value={this.state.hours}
                            keyboardType='decimal-pad'
                            placeholderTextColor='#a9a9a9'
                            style={{ fontWeight: 'bold', paddingLeft: 10, color: '#000', fontSize: 13, fontFamily: 'Montserrat-Bold' }}
                            returnKeyLabel='done'
                            onChangeText={(text) => this.setState({ hours: text })}

                        />

                    </View>



                    <View style={{ marginLeft: 15, backgroundColor: '#fff', height: 44, marginTop: 20, alignItems: 'center', flexDirection: 'row', marginRight: 15, borderRadius: 5, borderColor: 'grey', elevation: 5 }}>
                        <TextInput
                            placeholder='Category  '
                            value={this.state.category}
                            keyboardType='decimal-pad'
                            placeholderTextColor='#a9a9a9'
                            style={{ fontWeight: 'bold', paddingLeft: 10, color: '#000', fontSize: 13, fontFamily: 'Montserrat-Bold' }}
                            returnKeyLabel='done'
                            onChangeText={(text) => this.setState({ category: text })}

                        />
                    </View>



                    <Button
                labelStyle={{ color: "black", padding: 2, fontSize: 15, fontFamily: 'Montserrat-Bold' }}
                dark={true}
                color='rgb(250,233,215)'
                onPress={this.submit()}
                label='Submit'
              />


                </KeyboardAvoidingView>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginLeft: 10,
        marginRight: 10,
        alignItems: "stretch",
        justifyContent: "center"
    }
});
