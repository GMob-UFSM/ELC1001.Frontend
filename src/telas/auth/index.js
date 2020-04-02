import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar } from 'react-native'

import Logo from '../../assets/images/logo.png'

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }; 

    render() { 
        return (
            <>
            <StatusBar backgroundColor="#C4D0D0" />
            <View style={styles.container}>
                <View style={{flex: 1, justifyContent: "center", alignContent: "center"}}>
                    <Image style={{alignSelf: "center"}} source={Logo}/>
                    <Text style={{color: "#FFF", fontSize: 20, alignSelf: "center"}}>O seu guarda-roupas</Text>
                    <Text style={{color: "#FFF", fontSize: 20, alignSelf: "center"}}>conectado com a natureza!</Text>
                </View>
                <View style={{flex: 1, alignContent: "flex-start"}}> 
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignIn')}>
                        <Text style={styles.text}>entrar</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
                         <Text style={styles.text}>cadastrar</Text>                 
                    </TouchableOpacity> 
                    
                </View>
            </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        height: 60,
        width: 145,
        backgroundColor: '#DF928E',
        borderRadius: 20,
        borderWidth: 2,
        borderColor: '#FFF',
        margin: 10,
        justifyContent: "center",

    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center", 
        backgroundColor: "#C4D0D0",

    },
    text: {
        color: "#FFF", 
        fontSize: 20,
        alignSelf: "center"
    }
})