import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import looks from '../assets/images/looks.jpeg'
import calendar from '../assets/images/calendar.jpeg' 
import comporlook from '../assets/images/comporlook.jpeg'

import api from '../services/api'

export default class MainMenu extends Component {

    async UNSAFE_componentWillMount(){
        
        const token = await AsyncStorage.getItem('@Baloo:token');
        console.log("TOKEN MAIN MENU: " + token)
   
        if (token === null) 
            this.props.navigation.navigate('Login');
        else
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;


    }

    render() {
        return(
            <View style={styles.container}>
                <ImageBackground source={looks} style={styles.button1} imageStyle={{ borderRadius: 20 }}>
                    <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('Looks')}>
                        <Text style={styles.text}>looks</Text>
                    </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={calendar} style={styles.button1} imageStyle={{ borderRadius: 20 }}>
                    <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('Calendar')}>
                        <Text style={styles.text}>calendario</Text>
                    </TouchableOpacity>
                </ImageBackground>
                <ImageBackground source={comporlook} style={styles.button1} imageStyle={{ borderRadius: 20 }}>
                    <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('ComporLook')}>
                        <Text style={styles.text}>compor look</Text>
                    </TouchableOpacity>
                </ImageBackground>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: "center",
        alignItems: "center", 
        backgroundColor: "#C4D0D0",
    },
    button1: {
        borderRadius: 20, 
        flex: 1,
        aspectRatio: 1.95,
        margin: 3,
        justifyContent: "center",
    },
    textContainer: {
        borderRadius: 16,
        backgroundColor: "#FFF",
        borderWidth: 3,
        borderColor: "#4E3D42",
        width: "45%",
        height: 55,
        alignSelf: "center",
        justifyContent: "center"
    },
    text: {
        fontSize: 20,
        color: "#4E3D42",
        alignSelf: "center",
        margin: 3,
        fontFamily: "Rubik",
    }, 

})