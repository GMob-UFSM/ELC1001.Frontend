import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import AsyncStorage  from '@react-native-community/async-storage';

import api from '../../services/api'

export default class SignIn extends Component {
    static navigationOptions = {
        header: null,
    };

    state = { email: '', password: '', error: '' };

    handleEmailChange = (email) => {
        this.setState({ email });
      };
      
    handlePasswordChange = (password) => {
        this.setState({ password });
    };

    handleSignInPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
          this.setState({ error: 'Preencha usuário e senha para continuar!' }, () => false);
        } else {
          try {
            const response = await api.post('/api/v1/user/login', {
              email: this.state.email,
              password: this.state.password,
            });

            await AsyncStorage.setItem('@Baloo:token', response.data.token);
            api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
            
            this.props.navigation.navigate('MainMenu')
          } catch (_err) {
            console.log(_err)
            this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
          }
        }
      };

      componentWillMount() {
          this.forceUpdate();
      }

    render () {
        return(
            <View style={styles.container}>
                <StatusBar hidden />
                <View style={styles.postContainer}>
                    <Text style={styles.text}>Digite seu email</Text>
                    <TextInput style={styles.textInput}
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    autoCapitalize="none"
                    autoCorrect={false}/>

                    <Text style={styles.text}>Digite sua senha</Text>
                    <TextInput secureTextEntry={true} style={styles.textInput}
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    autoCapitalize="none"
                    autoCorrect={false}/>
                    
                    <View style={{alignContent: "center", justifyContent: "center", flexDirection: "row"}}>
                    <TouchableOpacity style={{margin: 10, marginTop: 50, alignSelf: "center"}} onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{fontSize: 18, color: "#4E3D42", alignSelf: "center"}}>cencelar</Text>
                    </TouchableOpacity>
                    {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}
                    <TouchableOpacity style={{margin: 10, marginTop: 50}} onPress={this.handleSignInPress}>
                        <Text style={{fontSize: 25, color: "#4E3D42", alignSelf: "center"}}>entrar</Text>
                    </TouchableOpacity>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: '#C4D0D0',
    }, 
    postContainer: {
        flex: 1,
        justifyContent: "center",
        marginBottom: 100,
        flexDirection: 'column'
    },
    text: {
        fontSize: 20,
        color: "#4E3D42",
        alignSelf: "flex-start",
        margin: 30,
        marginTop: 80
    },
    textInput: {
        borderRadius: 20,
        backgroundColor: "#FFF",

    },
    errorMessage: {
        textAlign: "center",
        color: "#ce2029",
        fontSize: 16,
        marginBottom: 15,
        marginHorizontal: 20,
    }
}) 

