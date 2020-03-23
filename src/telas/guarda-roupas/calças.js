import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView } from 'react-native'

export default class Calças extends Component {
    render() {
        return (
            <View style={styles.container}>
                <View style={styles.text}>
                    <Text style={{fontSize: 20, alignSelf: 'center'}}>calças</Text>
                </View>
                <View style={styles.scrollView}>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF'
    },
    text: {
        flex: 1,
        alignContent: 'center',
        justifyContent: 'center'
    },
    scrollView: {
        flex: 10,
        alignContent: 'flex-start',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#C4D0D0'
    },
})