import React, { Component } from 'react'
import { View, TextInput, Text, StyleSheet, TouchableOpacity, TouchableHighlight, Image, StatusBar, AsyncStorage } from 'react-native'
import { StackActions, NavigationActions } from 'react-navigation';

import api from '../../services/api'

import okButton from '../../assets/buttons/okbutton.png'

export default class SignUp extends Component {
    static navigationOptions = {
        header: null,
    };

    state = {
        email: '',
        password: '',
        error: '',
        success: '',
      };
      
      handleUsernameChange = (username) => {
        this.setState({ username });
      };
    
      handleEmailChange = (email) => {
        this.setState({ email });
      };
    
      handlePasswordChange = (password) => {
        this.setState({ password });
      };
    
      handleBackToLoginPress = () => {
        this.props.navigation.goBack();
      };
    
      handleSignUpPress = async () => {
        if (this.state.email.length === 0 || this.state.password.length === 0) {
          this.setState({ error: 'Preencha todos os campos para continuar!' }, () => false);
        } else {
          try {
            await api.post('/api/v1/user/register', {
              username: this.state.username,
              email: this.state.email,
              password: this.state.password,
            });
    
            this.setState({ success: 'Conta criada com sucesso! Redirecionando para o login', error: '' });
    
            setTimeout(this.goToLogin, 2500);
          } catch (_err) {
            this.setState({ error: 'Houve um problema com o cadastro, verifique os dados preenchidos!' });
          }
        }
      };
    
      goToLogin = () => {
        const resetAction = StackActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'SignIn' }),
          ],
        });
        this.props.navigation.dispatch(resetAction);
      }
    

    render() {
        return (
            <View style={styles.container}>
                <StatusBar hidden /> 
                {this.state.success.length !== 0 && <Text style={styles.sucessMessage}>{this.state.success}</Text>}
                <View style={styles.postContainer}>
                    <Text style={styles.text}>Esclha o seu nome de usúario</Text>
                    <TextInput style={styles.textInput} 
                    value={this.state.username}
                    onChangeText={this.handleUsernameChange}
                    autoCapitalize="none"
                    autoCorrect={false}/>
                    <Text style={styles.text}>Digite seu email</Text>
                    <TextInput style={styles.textInput} 
                    value={this.state.email}
                    onChangeText={this.handleEmailChange}
                    autoCapitalize="none"
                    autoCorrect={false}/>

                    <Text style={styles.text}>Escolha uma senha</Text>
                    <TextInput secureTextEntry={true} style={styles.textInput} 
                    value={this.state.password}
                    onChangeText={this.handlePasswordChange}
                    autoCapitalize="none"
                    autoCorrect={false}/>
                    
                    {this.state.error.length !== 0 && <Text style={styles.errorMessage}>{this.state.error}</Text>}
                    <View style={{margin: 40, marginTop: 50, flexDirection: 'row', alignItems: "center", justifyContent: "center"}}>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                        <Text style={{fontSize: 25, color: "#4E3D42", alignSelf: "center", marginRight: 20}}>cancelar</Text>
                    </TouchableOpacity>
                    <TouchableHighlight onPress={this.handleSignUpPress}>
                            <Image
                                style={{width: 60, height: 60, margin: 5}}
                                source={okButton}
                            />
                    </TouchableHighlight>
    
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
        marginTop: 50
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
    },
    sucessMessage: {
        textAlign: "center",
        color: "#08a092",
        fontSize: 16,
        marginBottom: 15,
        marginHorizontal: 20
    }
})