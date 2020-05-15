import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import looks from '../assets/images/looks.jpeg'
import calendar from '../assets/images/calendar.jpeg' 
import comporlook from '../assets/images/comporlook.jpeg'

export default class MainMenu extends Component {

    async UNSAFE_componentWillMount(){
        
        const token = await AsyncStorage.getItem('@Baloo:token');
        console.log("TOKEN MAIN MENU: " + token)
    
        if (token === null) 
        this.props.navigation.navigate('Login')

    }

    render() {
        return(
            <View style={styles.flexContainer}>
                <View style={styles.flexStart}>

                    <View style={styles.element}>

                    </View>
                </View>

                <View style={styles.flexSecond}><Text>a </Text></View>

                <View style={styles.flexThird}>
                    <View style={styles.containerImages}>

                    </View>
                    <View style={styles.containerImages}>

                    </View>
                </View>

                <View style={styles.flexFourth}>

                </View>
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
        width: 390,
        margin: 3,
        justifyContent: "center"
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
    flexContainer: {
        display: "flex",
        flexDirection: "column",
    },
    flexStart: {
        backgroundColor: "#fff",
        height: "15%",
        display: "flex",
        flexDirection: "row",
        paddingTop: 30
    },
    flexSecond: {
        backgroundColor: "#d09f9b",
        height: "5%"
    },
    flexThird: {
        backgroundColor: "#ffffff",
        height: "30%",
        display: "flex",
        flexDirection: "row",
        padding: 10
    },
    flexFourth: {
        backgroundColor: "#d1b2b1",
        height: "50%"
    },
    containerImages: {
        marginRight: 5,
        marginLeft: 5,
        width: "47.5%",
        height: "100%",
        backgroundColor: "#fff",
        borderColor: "#808080",
        borderWidth: 1,
        borderRadius: 10
    },
})