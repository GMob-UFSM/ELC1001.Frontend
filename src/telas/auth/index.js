import React, { Component } from 'react'
import { View, Text, Image, TouchableOpacity, StyleSheet, StatusBar, ImageBackground } from 'react-native'

import Logo from '../../assets/images/logo-branco.png'
import Background from '../../assets/images/main-bg.jpg'
import FacebookIcon from '../../assets/icons/botão_facebook.png'

export default class Login extends Component {
    static navigationOptions = {
        header: null
    }; 

    render() { 
        return (
            <>
            <StatusBar backgroundColor="#A09A99" />
            <View style={styles.container}>
                <ImageBackground source={Background} style={styles.bg}>
                    <View style={styles.bgOverlay}>
                        <Image  source={Logo} style={styles.logo}/>
                        <View style={styles.buttons}>
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignIn')}>
                                <Text style={styles.text}>entrar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={() => this.props.navigation.navigate('SignUp')}>
                                <Text style={styles.text}>cadastrar</Text>                 
                            </TouchableOpacity> 
                        </View>
                        <View>
                            <TouchableOpacity style={styles.socialButtons}>
                                <Image source={FacebookIcon} style={styles.socialButton}/>                 
                                <Image source={FacebookIcon} style={styles.socialButton}/>                 
                            </TouchableOpacity>
                        </View>
                    </View>
                </ImageBackground>
            </View>
            </>
        )
    }
}

const styles = StyleSheet.create({
    button: {
        width: 250,
        marginVertical: 5,
        paddingVertical: 10,
        backgroundColor: '#DF928E',
        borderRadius: 15,
        borderWidth: 2,
        borderColor: '#FFF',
        justifyContent: "center",
        alignSelf: "center"
    },
    buttons: {
        paddingBottom: 25,
    },
    socialButtons:{
        flexDirection: 'row',
        alignSelf: 'center',
        paddingBottom: 25
    },
    socialButton:{

    },
    bg: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: '100%',
        height: '100%'
    },
    bgOverlay:{
        flex: 1,
        backgroundColor: '#9F9493BB',
        width: '100%',
        height: '100%'    
    },
    logo:{
        flex: 1,
        resizeMode: 'contain',
        width: 240,
        height: 246,
        alignSelf: "center",
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: "#FFF", 
        fontSize: 20,
        alignSelf: "center"
    }
})