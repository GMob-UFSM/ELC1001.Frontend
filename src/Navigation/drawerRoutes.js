import React, { Component } from 'react'
import { ScrollView, Text, View, StyleSheet, Dimensions } from 'react-native'
import { DrawerActions } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import 'react-native-gesture-handler'
import { TouchableOpacity } from 'react-native-gesture-handler';
import LinearGradient from 'react-native-linear-gradient'


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
        const win = Dimensions.get('window');
        console.log(win)
        return (
            <LinearGradient style={{backgroundColor:"#C58882", flex: 1}} colors={['#CEBBBA', '#CFDBDB']} locations={[0, 7]}>
                <ScrollView>
                    <View style={{marginTop: 20, marginEnd: 50, alignItems: "center"}}>
                        <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('GuardaRoupa')}>
                            <View>
                                <Text style={styles.textStyle}>Guarda-Roupa</Text>
                                <Text style={styles.line}>_________</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('Perfil')}>
                            <View>
                                <Text style={styles.textStyle}>Perfil</Text>
                                <Text style={styles.line}>_________</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('Sobre')}>
                            <View>
                                <Text style={styles.textStyle}>Sobre</Text>
                                <Text style={styles.line}>_________</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('Ajuda')}>
                            <View>
                                <Text style={styles.textStyle}>Ajuda</Text>
                                <Text style={styles.line}>_________</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.textContainer} onPress={() => this.props.navigation.navigate('Sair')}>
                            <View>
                                <Text style={styles.textStyle}>Sair</Text>
                                <Text style={styles.line}>_________</Text>
                            </View>
                        </TouchableOpacity>
         

                    </View>
                </ScrollView>
            </LinearGradient>
        )
    }
}

const styles = StyleSheet.create ({
    textStyle: {
        fontSize: 17,
        color: "#4E3D42",
        alignSelf: 'flex-start',
        marginTop: 20

    }, 
    line: {
        fontSize: 25, 
        color: "white", 
        marginStart: -40, 
        marginTop: -15

    },
    textContainer: {
        alignSelf: "center",
        width: 150,
    }

})

export default DrawerScreen;