import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, TouchableHighlight } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

/* Icons */
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCloud, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import Look from '../assets/icons/looks.svg';
import ComporLook from '../assets/icons/comporlook.svg';
import Calendario from '../assets/icons/calendario.svg';
import EspacoTroca from '../assets/icons/espacotroca.svg';

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
                <View style={flexStartStyle.flexStart}>

                    <View style={flexStartStyle.element}>
                        <Text style={flexStartStyle.textTodayElement} > HOJE </Text>

                        <View style={flexStartStyle.temperatureInfo}>
                            <Text style={flexStartStyle.temperatureTextInfo1}>10&deg;</Text>
                            <Text style={flexStartStyle.temperatureTextInfo2}> temperatura </Text>
                            <Text style={flexStartStyle.temperatureTextInfo3}>máx. 18&deg;</Text>
                        </View>


                        <View style={flexStartStyle.iconCloud}>
                            <FontAwesomeIcon icon={faCloud} size={50} color={"#1B807E"} />
                        </View>

                    </View>

                    <View style={flexStartStyle.tomorrowInfo}>
                        <Text style={flexStartStyle.textTomorrowElement}> AMANHÃ </Text>
                        <FontAwesomeIcon icon={faAngleRight} color={"#E7A399"} size={50} />
                    </View>

                </View>

                <View style={styles.flexSecond}><Text style={{ color: "#F2F2F2" }}>Dia nublado, que tal ser um ponto de cor? </Text></View>

                <View style={styles.flexThird}>
                    <View style={styles.containerImages}>
                    </View>
                    <View style={styles.containerImages}>

                    </View>
                </View>

                <View style={flexFourthStyle.flexFourth}>
                    <View style={flexFourthStyle.flexRow}>

                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Looks')}>
                            <View style={flexFourthStyle.flexElements}>
                                <View style={flexFourthStyle.flexIcon}>
                                    <Look width={90} height={90} />
                                </View>
                                <Text style={flexFourthStyle.flexText} >looks</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => this.props.navigation.navigate('ComporLook')}>
                            <View style={flexFourthStyle.flexElements}>
                                <View style={flexFourthStyle.flexIcon}>
                                    <ComporLook width={90} height={90} />
                                </View>
                                <Text style={flexFourthStyle.flexText} >compor looks</Text>
                            </View>
                        </TouchableHighlight>

                    </View>

                    <View style={flexFourthStyle.flexRow}>
                        <TouchableHighlight onPress={() => this.props.navigation.navigate('MainMenu')}>
                            <View style={flexFourthStyle.flexElements}>
                                <View style={flexFourthStyle.flexIcon}>
                                    <View style={flexFourthStyle.tradeIconContainer}>
                                        <View style={flexFourthStyle.tradeIcon}>
                                            <EspacoTroca width={50} height={50} />
                                        </View>
                                    </View>
                                </View>
                                <Text style={flexFourthStyle.flexText} >espaço troca</Text>
                            </View>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={() => this.props.navigation.navigate('Calendar')}>
                            <View style={flexFourthStyle.flexElements}>
                                <View style={flexFourthStyle.flexIcon}>
                                    <Calendario width={90} height={90} />
                                </View>
                                <Text style={flexFourthStyle.flexText} >calendário</Text>
                            </View>
                        </TouchableHighlight>

                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
//    button: {
//        flexDirection: 'row',
//        justifyContent: 'space-between',
//        alignItems: "center",
//        margin: 3,
//        width: 390,
//        height: 180,
//        backgroundColor: "#FFF",
//        borderRadius: 20
//    },
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

    flexSecond: {
        backgroundColor: "#d09f9b",
        alignItems: "center"
    },
    flexThird: {
        backgroundColor: "#ffffff",
        height: "30%",
        display: "flex",
        flexDirection: "row",
        padding: 10
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


const flexStartStyle = StyleSheet.create({
    flexStart: {
        backgroundColor: "#fff",
        height: 100,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center",
    },

    element: {
        flexDirection: "row",
        alignItems: "center",
    },

    temperatureTextInfo1: {
        fontSize: 30,
        fontWeight: "bold",
        textAlign: "center",
        color: "#4E3D42",
    },


    temperatureTextInfo2: {
        color: "#1B807E",
        textAlign: "center"
    },

    temperatureTextInfo3: {
        color: "#E7A399",
        alignSelf: "center"
    },

    textTodayElement: {
        color: "#4E3D42",
        fontSize: 18,
        marginRight: 10
    },

    iconCloud: {
        alignSelf: "flex-start"
    },

    tomorrowInfo: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },

    textTomorrowElement: {
        fontSize: 18,
        color: "#E7A399"
    }
})

const flexFourthStyle = StyleSheet.create({
    flexFourth: {
        backgroundColor: "#d1b2b1",
        height: "50%"
    },
    flexRow: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row",
        width: "100%",
    },
    flexElements: {
        display: "flex",
        flexDirection: "column",
        margin: 15,
        width: 110,
        height: 110,
    },
    flexIcon: {
        alignSelf: "center",
    },
    flexText: {
        textAlign: "center",
        color: "#4d3d42",
        fontSize: 16,
    },
    tradeIconContainer: {
        width: 90,
        height: 90,
        marginLeft: 20,
        alignSelf: "center",
    },
    tradeIcon: {
        width: 65,
        height: 65,
        backgroundColor: "#fff",
        borderWidth: 2.5,
        borderRadius: 40,
        borderColor: "#4d3d42",
        display: "flex",
        justifyContent: "center",
        paddingLeft: 5,
        marginTop: 8,
    }
})