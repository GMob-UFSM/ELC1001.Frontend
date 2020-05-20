import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, TouchableHighlight } from 'react-native'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCloud, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import AsyncStorage from '@react-native-community/async-storage';
import Look from '../assets/icons/looks.svg';
import ComporLook from '../assets/icons/comporlook.svg';

import looks from '../assets/images/looks.jpeg'
import calendar from '../assets/images/calendar.jpeg'
import comporlook from '../assets/images/comporlook.jpeg'

export default class MainMenu extends Component {

    async UNSAFE_componentWillMount() {

        // const token = await AsyncStorage.getItem('@Baloo:token');
        // console.log("TOKEN MAIN MENU: " + token)

        // if (token === null) 
        // this.props.navigation.navigate('Login')

    }

    render() {
        return (
            <View style={styles.flexContainer}>
                <View style={styles.flexStart}>

                    <View style={styles.element}>
                        <Text style={styles.textTodayElement} > HOJE </Text>
                    </View>

                    <View style={styles.element2}>
                        <Text style={styles.temperatureTextElement1}>10&deg;</Text>
                        <Text style={styles.temperatureTextElement2}> temperatura </Text>
                        <Text style={styles.temperatureTextElement3}>máx. 18&deg;</Text>
                    </View>

                    <View style={styles.element3}>
                        <FontAwesomeIcon icon={faCloud} size={50} color={"#1B807E"} />
                    </View>

                    <View style={styles.element4}>
                        <Text style={styles.textTomorrowElement}> AMANHÃ </Text>
                    </View>

                    <View style={styles.element5}>
                        <FontAwesomeIcon icon={faAngleRight} color={"#E7A399"} size={50} />
                    </View>
                </View>

                <View style={styles.flexSecond}><Text style={{ alignSelf: "center", paddingVertical: 8, color: "#F2F2F2" }}>Dia nublado, que tal ser um ponto de cor? </Text></View>

                <View style={styles.flexThird}>
                    <View style={styles.containerImages}>

                    </View>
                    <View style={styles.containerImages}>

                    </View>
                </View>

                <View style={styles.flexFourth}>
                    <View style={styles.flexFourthRow}>

                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Looks')}>
                            <View style={styles.flexFourthElements}>
                                <View style={styles.flexFourthIcon}>
                                    <Look width={90} height={90} />
                                </View>
                                <Text style={styles.flexFourthText} >looks</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => this.props.navigation.navigate('ComporLook')}>
                            <View style={styles.flexFourthElements}>
                                <View style={styles.flexFourthIcon}>
                                    <ComporLook width={90} height={90} />
                                </View>
                                <Text style={styles.flexFourthText} >compor looks</Text>
                            </View>
                        </TouchableHighlight>

                    </View>

                    <View style={styles.flexFourthRow}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Calendar')}>
                            <View style={styles.flexFourthElements}>
                                <View style={styles.flexFourthIcon}>
                                    <Look width={90} height={90} />
                                </View>
                                <Text style={styles.flexFourthText} >espaço troca</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Calendar')}>
                            <View style={styles.flexFourthElements}>
                                <View style={styles.flexFourthIcon}>
                                    <ComporLook width={90} height={90} />
                                </View>
                                <Text style={styles.flexFourthText} >calendário</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
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
        alignItems: "center",
        backgroundColor: "#C4D0D0",
    },
    button1: {
        borderRadius: 20,
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
        height: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "center"
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
    element: {
        paddingLeft: 10,
        paddingTop: 40
    },

    textTodayElement: {
        color: "#4E3D42",
        fontSize: 18,
    },

    element2: {
        paddingTop: 15,
        paddingLeft: 15
    },

    temperatureTextElement1: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#4E3D42",
    },

    temperatureTextElement2: {
        color: "#1B807E",
        textAlign: "center"
    },

    temperatureTextElement3: {
        color: "#E7A399",
        alignSelf: "center"
    },

    element3: {
        paddingTop: 15,
    },
    element4: {
        paddingTop: 40,
        paddingLeft: 45
    },
    textTomorrowElement: {
        alignSelf: "center",
        fontSize: 18,
        color: "#E7A399"
    },
    element5: {
        paddingTop: 30
    },
    flexFourthRow: {
          display: "flex",
          justifyContent: "center",
          flexDirection: "row",
          width: "100%",
    },
    flexFourthElements: {
           display: "flex",
           flexDirection: "column",
           margin: 15,
           width: 110,
           height: 110,
    },
    flexFourthIcon: {
           alignSelf: "center",
    },
    flexFourthText: {
            textAlign: "center",
            color: "#4d3d42",
            fontSize: 16,
    }
})