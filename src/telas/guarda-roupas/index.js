import React, { Component } from 'react'
import { View, StyleSheet, ImageBackground, TouchableHighlight, Image} from 'react-native'

import camisas from '../../assets/images/camisas.png'
import calças from '../../assets/images/calça.png'
import sapatos from '../../assets/images/sapatos.png'

export default class GuardaRoupa extends Component { 
    render() {
        return(
            <View style={styles.container}>
            <View style={styles.container}>
                <TouchableHighlight style={{flex: 2, borderRadius: 20, justifyContent: "center", backgroundColor: "#C4D0D0"}} onPress={() => this.props.navigation.navigate('Camisas')}>
                    <Image style={styles.button1}
                        imageStyle={{ borderRadius: 20 }}
                        source={camisas}
                    />
                </TouchableHighlight>
                <TouchableHighlight style={{flex: 2, borderRadius: 20, justifyContent: "center", backgroundColor: "#C4D0D0"}} onPress={() => this.props.navigation.navigate('Calças')}>
                    <ImageBackground style={styles.button1}
                    imageStyle={{ borderRadius: 20 }}
                    source={calças}
                    />
                </TouchableHighlight>
                <TouchableHighlight style={{flex: 2, borderRadius: 20, justifyContent: "center", backgroundColor: "#C4D0D0"}} onPress={() => this.props.navigation.navigate('Sapatos')}>
                    <ImageBackground style={styles.button1}
                    imageStyle={{ borderRadius: 20 }}
                    source={sapatos}
                    />
                </TouchableHighlight>
                <TouchableHighlight style={{flex: 1, borderRadius: 20, justifyContent: "center", backgroundColor: "#C4D0D0"}}>
                    <ImageBackground style={styles.button1}
                    imageStyle={{ borderRadius: 20 }}
                    source={camisas}
                    />
                </TouchableHighlight>
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