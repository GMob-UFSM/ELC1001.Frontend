import React, { Component } from 'react'
import { ScrollView, Text, View, TouchableHighlight, StyleSheet } from 'react-native'
import { DrawerActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';

class DrawerScreen extends Component {
    
    navigateToScreen = (route) => () => {
        const navigateAction = NavigationActions.navigate({
          routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
        this.props.navigation.dispatch(DrawerActions.closeDrawer())
      }

    onSignOut = async () => {
           AsyncStorage.clear();
           const token = await AsyncStorage.getItem("@Baloo:toke");
           console.log("TOKEN DRAWER: " + token)
           this.props.navigation.navigate('Login');
    }                                       

    render() {
        return (
            <View style={{backgroundColor:"#C58882", flex: 1}}>
                <ScrollView>
                    <View style={{alignItems: 'center'}}>
                        <View style={{marginEnd: 50, marginTop: 30}}>
                        <TouchableHighlight style={{margin: -15}} onPress={() => this.props.navigation.navigate('GuardaRoupa')}>
                            <Text style={styles.textStyle}>Guarda-roupas</Text>
                        </TouchableHighlight>
                        <Text style={{fontSize: 25, color: "white", marginLeft: -15}}>______</Text>
                        <TouchableHighlight style={{margin: -15}} onPress={() => this.props.navigation.navigate('Perfil')}>
                            <Text style={styles.textStyle}>Perfil</Text>
                        </TouchableHighlight>
                        <Text style={{fontSize: 25, color: "white", marginLeft: -15}}>______</Text>
                        <TouchableHighlight style={{margin: -15}} onPress={() => this.props.navigation.navigate('Sobre')}>
                            <Text style={styles.textStyle}>Sobre</Text>
                        </TouchableHighlight>
                        <Text style={{fontSize: 25, color: "white", marginLeft: -15}}>______</Text>
                        <TouchableHighlight style={{margin: -15}} onPress={() => this.props.navigation.navigate('Ajuda')}>
                            <Text style={styles.textStyle}>Ajuda</Text>
                        </TouchableHighlight>
                        <Text style={{fontSize: 25, color: "white", marginLeft: -15}}>______</Text>
                        <TouchableHighlight style={{margin: -15}} onPress={this.onSignOut}>
                            <Text style={styles.textStyle}>Sair</Text>
                        </TouchableHighlight>
                        <Text style={{fontSize: 25, color: "white", marginLeft: -15}}>______</Text>
                        
                        </View>
                    </View>
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create ({
    textStyle: {
        fontSize: 17,
        color: "#4E3D42",
        alignSelf: 'flex-start',
        marginTop: 30

    }

})

export default DrawerScreen;