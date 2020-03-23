import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, TouchableHighlight, Image} from 'react-native'

import looks from '../assets/images/looks.jpeg'
import calendar from '../assets/images/calendar.jpeg'
import comporlook from '../assets/images/comporlook.jpeg'

export default class MainMenu extends Component {
    render() {
        return(
            <View style={styles.container}>
                <TouchableHighlight style={{flex: 1, borderRadius: 20, justifyContent: "center", backgroundColor: "#C4D0D0"}} onPress={() => this.props.navigation.navigate('Looks')}>
                    <Image style={styles.button1}
                        imageStyle={{ borderRadius: 20 }}
                        source={looks}
                    />
                </TouchableHighlight>
                <TouchableHighlight style={{flex: 1, borderRadius: 20, justifyContent: "center", backgroundColor: "#C4D0D0"}} onPress={() => this.props.navigation.navigate('Calendar')}>
                    <ImageBackground style={styles.button1}
                    imageStyle={{ borderRadius: 20 }}
                    source={calendar}
                    />
                </TouchableHighlight>
                <TouchableHighlight style={{flex: 1, borderRadius: 20, justifyContent: "center", backgroundColor: "#C4D0D0"}} onPress={() => this.props.navigation.navigate('ComporLook')}>
                    <ImageBackground style={styles.button1}
                    imageStyle={{ borderRadius: 20 }}
                    source={comporlook}
                    />
                </TouchableHighlight>
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
    button: {
        flexDirection: 'row',
        justifyContent: 'space-between', 
        alignItems: "center",
        margin: 3,
        width: 390,
        height: 180,
        backgroundColor: "#FFF",
        borderRadius: 20
    },
    button1: {
        borderRadius: 20, 
        flex: 1,
        width: 390,
        margin: 3
    }

})