import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, Image} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import looks from '../assets/images/looks.jpeg'
import calendar from '../assets/images/calendar.jpeg' 
import comporlook from '../assets/images/comporlook.jpeg'
import looksIcon from '../assets/icons/looks.png'
import calendarioIcon from '../assets/icons/calendario.png'
import comporLookIcon from '../assets/icons/comporlook.png'
import espacoTrocaIcon from '../assets/icons/espaco_troca.png'

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
                    <View style={styles.buttonOverlay}>
                        <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('Looks')}>
                            <Image source={looksIcon} />
                            <Text style={styles.text}>looks</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <ImageBackground source={calendar} style={styles.button1} imageStyle={{ borderRadius: 20 }}>
                    <View style={styles.buttonOverlay}>
                        <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('Calendar')}>
                            <Image source={calendarioIcon} />
                            <Text style={styles.text}>calendario</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <ImageBackground source={comporlook} style={styles.button1} imageStyle={{ borderRadius: 20 }}>
                    <View style={styles.buttonOverlay}>
                        <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('ComporLook')}>
                            <Image source={comporLookIcon} />
                            <Text style={styles.text}>compor look</Text>
                        </TouchableOpacity>
                    </View>
                </ImageBackground>
                <ImageBackground source={comporlook} style={styles.button1} imageStyle={{ borderRadius: 20 }}>
                    <View style={styles.buttonOverlay}>
                        <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('ComporLook')}>
                            <Image source={espacoTrocaIcon} />
                            <Text style={styles.text}>espaço troca</Text>
                        </TouchableOpacity>
                    </View>
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
        aspectRatio: 2.35,
        marginVertical: 3,
        justifyContent: "center",
    },
    buttonOverlay:{
        backgroundColor: "#FFFFFF55",
        height: "100%",
        width: "100%",
        justifyContent: "center",
    },
    textContainer: {
        borderRadius: 16,
        backgroundColor: "#FFF",
        borderWidth: 3,
        borderColor: "#4E3D42",
        width: "70%",
        alignSelf: "center",
        justifyContent: "center",
        flexDirection: "row",
    },
    text: {
        fontSize: 20,
        color: "#4E3D42",
        alignSelf: "center",
        fontFamily: "Rubik",
    }, 

})