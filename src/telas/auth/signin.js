import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity, StatusBar } from 'react-native'
import AsyncStorage  from '@react-native-community/async-storage'
import LinearGradient from 'react-native-linear-gradient'

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
            }).then((response) => {

              if(response.status == 200){
                this.sucessLogin(response.data.token);
              }

            });

          } catch (_err) {
            console.log(_err);
            this.setState({ error: 'Houve um problema com o login, verifique suas credenciais!' });
          }
        }
      };

      sucessLogin = async (token) => {
        await AsyncStorage.setItem('@Baloo:token', token);
        this.props.navigation.navigate('MainMenu');
      }

    render () {
        return(
                <LinearGradient style={styles.postContainer} colors={['#CEBBBA', '#CFDBDB']} locations={[0,.7]}>
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
                    {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}
                    <View style={{alignContent: "center", justifyContent: "center", flexDirection: "row"}}>
                        <TouchableOpacity style={{margin: 10, marginTop: 50, alignSelf: "center"}} onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={{fontSize: 18, color: "#4E3D42", alignSelf: "center"}}>cancelar</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{margin: 10, marginTop: 50}} onPress={this.handleSignInPress}>
                            <Text style={{fontSize: 25, color: "#4E3D42", alignSelf: "center"}}>entrar</Text>
                        </TouchableOpacity>
                    </View>
                </LinearGradient>
        )
    }
}

const styles = StyleSheet.create({
    postContainer: {
        flex: 1,
        justifyContent: "center",
        alignContent: "center",
        flexDirection: 'column'
    },
    text: {
        fontSize: 20,
        color: "#4E3D42",
        alignSelf: "center",
        margin: 30,
        marginTop: 80
    },
    textInput: {
        borderRadius: 20,
        backgroundColor: "#FFF",
        width: '65%',
        alignSelf: "center"

    },
    errorMessage: {
        textAlign: "center",
        color: "#ce2029",
        fontSize: 16,
        marginBottom: 15,
        marginHorizontal: 20,
        marginTop: 5
    }
}) 

