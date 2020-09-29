import React, { Component } from 'react'
import { View, Text, Image, TouchableHighlight, TouchableOpacity, StyleSheet } from 'react-native'
import base64 from 'react-native-base64'
import AsyncStorage from '@react-native-community/async-storage'
import LinearGradient from 'react-native-linear-gradient'

import Compartilhar from '../../../assets/icons/botao_compartilhar.svg'
import Facebook from '../../../assets/icons/botão_facebook.svg'
import Enjoei from '../../../assets/icons/enjoei.svg'
import Instagram from '../../../assets/icons/botão_instagram.svg'
import ComporLook from '../../../assets/icons/comporlook.svg'
import Guardar from '../../../assets/icons/looks.svg'
import noimage from '../../../assets/images/noimage.png'

import api from '../../../services/api'

export default class Publicar extends Component {
    state = {
        picture: '',
        id: ''
    }

    getPicture = async () => {

        this.setState({
            id: await AsyncStorage.getItem("@Baloo:garmentID")
        });

        AsyncStorage.removeItem("@Baloo:garmentID");

        const response = await api.get(`/api/v1/garment/${this.state.id}`);
        const garment = await response.data;

        console.log('IMAGE DEFAULT: ' + garment.default_image);

        this.setState({
            picture: garment.default_image
        })
    }
 
    async componentDidMount(){

        const { navigation } = this.props;
        this.focusListener = navigation.addListener("willFocus", () => {
            // The screen is focused
            // Call any action
            this.getPicture();
        });

    }

    componentWillUnmount() {

        this.focusListener.remove();
    }

    navigateToComporLook (){

        AsyncStorage.setItem("@Baloo:garmentID", this.state.id);
        this.props.navigation.navigate('ComporLook');

        
    }

    render() {
        const image = this.state.picture;
        return (
            <View style={styles.container}>
                <LinearGradient style={{flex: 1}} colors={['#CEBBBA', '#CFDBDB']} locations={[0,.7]}>
                <View style={styles.imageContainer}>
                    <Image source={image ? {uri: image} : noimage} style={styles.picture}/> 
                    <TouchableHighlight style={styles.shareButton} onPress={() => this.getPicture()}>
                        <Compartilhar width={76} height={76} marginTop={-15} alignSelf={'center'}/>
                    </TouchableHighlight>
                    <Text style={{fontSize: 15, alignSelf: "center", paddingTop: 3, color: "#4E3D42"}}>compartilhe no baloo</Text>
                </View>

                <View style={styles.buttonsContainer}>
                    <Text style={{fontSize: 14, alignSelf: "flex-start", paddingTop: 3, paddingRight: 30,color: "#4E3D42"}}>ou nas rede Sociais:</Text>
                    <View style={{justifyContent: "center", alignContent: "center", flexDirection: "row"}}>
                        <TouchableHighlight style={{height: 50, width: 50, alignSelf: "center", margin: 15}}>
                            <Enjoei width={76} height={76}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={{height: 50, width: 50, alignSelf: "center", margin: 15}}>
                            <Facebook width={76} height={76}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={{height: 50, width: 50, alignSelf: "center", margin: 15}}>
                            <Instagram width={76} height={76} />
                        </TouchableHighlight>
                    </View>
                </View>
                
                <View style={styles.postContainer}>
                    <View style={styles.touchableContainer}>
                        <TouchableHighlight style={styles.touchable} onPress={() => this.props.navigation.navigate('GuardaRoupa')}>
                            <Guardar alignSelf={'center'} width={76} height={76}/>
                        </TouchableHighlight>
                        <Text style={styles.text}>guardar</Text>
                    </View>
                    <View style={styles.touchableContainer}>
                        <TouchableHighlight style={styles.touchable} onPress={() => this.navigateToComporLook()}>
                            <ComporLook alignSelf={'center'} width={76} height={76}/>
                        </TouchableHighlight>
                        <Text style={styles.text}>compor look</Text>
                    </View>
                </View>
                </LinearGradient>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    container: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        backgroundColor: "#D1DEDE",
    }, 
    imageContainer: {
        flex: 10,
        justifyContent: "center"
    },
    picture: { 
        height: '75%',
        width: '85%',
        borderRadius: 20,
        alignSelf: "center",
        backgroundColor: "white",
        marginTop: 15,
    },
    shareButton: {
        height: 50,
        width: 50,
        alignSelf: "center",
        marginTop: -15
    },
    buttonsContainer: {
        flex: 2,
        borderTopWidth: 2,
        borderTopColor: "#4E3D42",
        borderColor: "#D1DEDE",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "column",
        paddingLeft: 10
    },
    postContainer: {
        flex: 2,
        borderTopWidth: 2,
        borderTopColor: "#4E3D42",
        borderColor: "#D1DEDE",
        justifyContent: "center",
        alignContent: "center",
        flexDirection: "row"
    },
    touchableContainer: {
        justifyContent: "center",
        alignItems: "center",
        margin: 20,
        flexDirection: "column",

    },
    touchable: {
        height: 50,
        width:50,
    },
    text: {
        fontFamily: "Rubik",
        fontSize: 17,
        fontWeight: 'bold',
        color: '#4E3D42',
        alignSelf: "center",
        marginTop: 7
    },
})


/*

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Camera')} style={{margin: 20, justifyContent: "center"}}>
                        <Text style={styles.text}>cancelar</Text>
                    </TouchableOpacity>
*/