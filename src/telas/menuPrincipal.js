import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, TouchableOpacity, Text, TouchableHighlight, ScrollView, Dimensions, Alert, TouchableOpacityBase } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
import Geolocation from '@react-native-community/geolocation';

/* Icons */
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCloud, faAngleRight, faCloudSun } from '@fortawesome/free-solid-svg-icons';
import Look from '../assets/icons/looks.svg';
import ComporLook from '../assets/icons/comporlook.svg';
import Calendario from '../assets/icons/calendario.svg';
import EspacoTroca from '../assets/icons/espacotroca.svg';

import camisas from '../assets/images/camisas.png'
import calça from '../assets/images/calça.png'

/* Weather API */
import weatherApi from '../services/weatherApi';


export default class MainMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            height: Dimensions.get('window').height,
            temp: '...',
            temp_max: '...',
            weather_id: null,
            description: '...'
        }
    }

    componentDidMount() {
        Geolocation.getCurrentPosition(
            async position => {
                const { longitude, latitude } = position.coords;

                location = { longitude, latitude }


                const response = await weatherApi.api.get('/weather', {
                    params: {
                        lat: latitude,
                        lon: longitude,
                        appid: weatherApi.token,
                        lang: 'pt_br',
                        units: 'metric'
                    }
                }).catch(err => {
                    this.setState({ temp: 'unknown' });
                    this.setState({ temp_max: 'unknown' });
                    this.setState({ description: 'unknown' });
                });

                const { temp, temp_max } = response.data.main;
                const { description, id } = response.data.weather[0];

                this.setState({ description });
                this.setState({ weather_id: id });
                this.setState({ temp: Math.round(temp) });
                this.setState({ temp_max: Math.round(temp_max) });

            },
            err => Alert.alert('Error', err)
        )
    }

    async UNSAFE_componentWillMount() {
        const token = await AsyncStorage.getItem('@Baloo:token');
        console.log("TOKEN MAIN MENU: " + token)

        if (token === null)
            this.props.navigation.navigate('Login')

    }

    render() {
        let weather = this.state.weather_id
        return (
            <View style={{ flexGrow: 1 }}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View style={styles.flexContainer}>

                        <View style={flexStartStyle.flexStart}>

                            <View style={flexStartStyle.element}>
                                <Text style={flexStartStyle.textTodayElement} > HOJE </Text>

                                <View style={flexStartStyle.temperatureInfo}>
                                    <Text style={flexStartStyle.temperatureTextInfo1}>{this.state.temp}&deg;</Text>
                                    <Text style={flexStartStyle.temperatureTextInfo2}> temperatura </Text>
                                    <Text style={flexStartStyle.temperatureTextInfo3}>máx. {this.state.temp_max}&deg;</Text>
                                </View>


                                <View style={flexStartStyle.iconCloud}>
                                    {/* Rain */}
                                    {(weather >= 200 && weather <= 232 && weather >= 500 && weather <= 531) ?
                                        <FontAwesomeIcon icon={faCloudRain} size={50} color={"#1B807E"} /> :
                                        /* sun */
                                        (weather === 800) ?
                                            <FontAwesomeIcon icon={faCloudSun} size={50} color={"#1B807E"} /> :
                                            /* drizzle */
                                            (weather >= 300 && weather <= 321) ?
                                                <FontAwesomeIcon icon={faCloudRain} size={50} color={"#1B807E"} /> :
                                                /* cloudy */
                                                (weather >= 801 && weather <= 804) ?
                                                    <FontAwesomeIcon icon={faCloud} size={50} color={"#1B807E"} /> : null
                                    }

                                </View>

                            </View>

                            <View style={flexStartStyle.tomorrowInfo}>
                                <Text style={flexStartStyle.textTomorrowElement}> AMANHÃ </Text>

                                <FontAwesomeIcon icon={faAngleRight} color={"#E7A399"} size={50} />
                            </View>

                        </View>

                        <View style={styles.flexSecond}><Text style={{ color: "#F2F2F2" }}>{`${this.state.description}, que tal ser um ponto de cor?`}</Text></View>

                        <View style={flexThirdStyle.flexThird}>
                            <View style={flexThirdStyle.containerImages}>
                                <ImageBackground style={flexThirdStyle.image}
                                    imageStyle={{ borderRadius: 20 }}
                                    source={camisas}
                                />
                            </View>
                            <View style={flexThirdStyle.containerImages}>
                                <ImageBackground style={flexThirdStyle.image}
                                    imageStyle={{ borderRadius: 20 }}
                                    source={calça}
                                />
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
                </ScrollView>
            </View>


        )
    }
}

const styles = StyleSheet.create({
    flexContainer: {
        display: "flex",
        flexDirection: "column",
    },

    flexSecond: {
        backgroundColor: "#d09f9b",
        alignItems: "center"
    },

    scrollView: {
    }
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

const flexThirdStyle = StyleSheet.create({
    flexThird: {
        backgroundColor: "#ffffff",
        height: 200,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10
    },
    containerImages: {
        width: "47.5%",
        height: "100%",
        backgroundColor: "#fff",
        borderColor: "#808080",
        borderWidth: 2,
        borderRadius: 22
    },
    image: {
        width: "100%",
        height: "100%",
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
        marginLeft: 15,
        marginRight: 15,
        marginTop: "5%",
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