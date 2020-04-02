import React, { Component } from 'react'
import { View, TouchableHighlight } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Mensage from '../assets/icons/Mensagem.svg'
import Camera from '../assets/icons/Camera.svg'

export default class Header extends Component {
    render(){
        return(
            <View style={{flexDirection: "row", justifyContent: "center", alignContent: "center"}}>
                <Mensage alignSelf={"center"} margin={10} height={27} width={27} />
                <Camera alignSelf={"center"} margin={10} height={27} width={27} />
                <Icon name="user-o" color={"white"} size={26} style={{margin: 10, alignSelf: "center"}}/>
            </View>
        )
    }
} 
