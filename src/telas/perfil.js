import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image } from 'react-native'
import AsyncStorage  from '@react-native-community/async-storage';
import LinearGradient from 'react-native-linear-gradient'
import ImagePicker from 'react-native-image-picker';

import api from '../services/api'

const color = {
    accent: '#40261D'
}

const styles = StyleSheet.create({
    loading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: 24,
        color: color.accent,
    },
    container: {
        flex: 1,
    },
    header: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '15%',
    },
    body: {
        flex: 3,
        padding: 20,
    },
    image: {
        backgroundColor: 'yellow',
        resizeMode: 'cover',
        height: '65%',
        aspectRatio: 1,
        borderRadius: 10000,
        borderWidth: 3,
        borderColor: color.accent,
    },
    nome: {
        color: color.accent,
        fontSize: 24,
        fontWeight: 'bold'
    },
    localizacao: {
        fontSize: 18,
        color: color.accent,
    },
    label: {
        color: color.accent,
        marginLeft: 20,
        fontSize: 22,
        marginBottom: 5,
    },
    input: {
        backgroundColor: 'white',
        borderColor: color.accent,
        borderWidth: 2,
        borderRadius: 15,
        marginBottom: 40,
        padding: 15,
        fontSize: 18,
    },
    inputWithoutMarginBottom: {
        marginBottom: 5
    },
    email: {
        color: '#888'
    },
    bio: {
        color: color.accent
    },
    buttonArea: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    button: {
        padding: 5,
    },
    buttonText: {
        fontSize: 18,
        color: color.accent,
        fontWeight: 'bold',
    },
    buttonSeparator:{
        width: 40
    }
})


export default class Perfil extends Component {

    state = { mode: 'initializing' }

    componentDidMount() {
        setTimeout(() => {
            if (this.state.mode === 'initializing') {
                this.setState((state) => {
                    return {...state, mode: 'loading' }
                })
            }
        },300)
        api.get('/api/v1/user/me').then((response) => {
            this.setState((state) => {
                return {...response.data, mode: 'loaded'}
            })
        },(error) => {
            console.log(error)
        });
    }

    constructor(props) {
        super(props);
    }

    enterEditMode() {
        this.setState((state) => {
            return {...state, mode: 'editing', editing: {
                image: state.image,
                bio: state.bio,
                localization: state.localization
            }}
        })
    }

    saveModification() {
        this.setState((state) => {
            return {...state, mode: 'saving'}
        })
        api.post('/api/v1/user/me').then((response) => {
            this.setState((state) => {
                return {...state, mode: 'loaded',
                    bio: state.editing.bio,
                    localization: state.editing.localization,
                    image: state.editing.image,
                }
            })
        })
    }

    cancelModifications() {
        this.setState((state) => {
            return {...state, mode: 'loaded'}
        })
    }

    handleChanges(value,field) {
        let editing = this.state.editing
        editing[field] = value
        this.setState(state => {
            return {...state, editing }
        })

    }

    changeImage() {
        ImagePicker.showImagePicker({
            title: 'Selecione uma imagem de perfil'
        }, (response) => {
            if (!response.didCancel && !response.error) {
                this.setState((state) => {
                    return {...state, editing: {
                        ...state.editing,
                        image: response.data
                    }}
                })
            }
        })
    }

    render() {
        switch(this.state.mode) {
            case 'initializing':
                return (<View></View>)
                break;
            case 'loading':
                return (
                    <View style={styles.container, styles.loading}>
                        <Text style={styles.loadingText}>Carregando...</Text>
                    </View>
                )
                break;
            case 'loaded':
                return (
                    <View style={styles.container}>
                        <View style={styles.header}>
                            <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + this.state.image}}/>
                            <Text style={styles.nome}>{`${this.state.name.first} ${this.state.name.last}`}</Text>
                            <Text style={styles.localizacao}>{this.state.localization}</Text>
                        </View>
                        <LinearGradient style={styles.body} colors={['#CEBBBA', '#CFDBDB']} locations={[0,.7]}>
                            <Text style={styles.label}>E-mail</Text>
                            <TextInput style={[styles.input, styles.email]}
                                value={this.state.email}
                                editable={false}
                                />
                            <TextInput style={[styles.input, styles.bio]}
                                numberOfLines={4}
                                multiline={true}
                                maxLength={250}
                                value={this.state.bio}
                                editable={false}
                                />
                            <View style={styles.buttonArea}>
                                <TouchableOpacity
                                    onPress={this.enterEditMode.bind(this)}
                                    style={styles.button} >
                                <Text style={styles.buttonText}>editar perfil</Text>
                                </TouchableOpacity>
                            </View>
                        </LinearGradient>
                    </View>
                )
                break;
            case 'editing':
            case 'saving':
                return (
                     <View style={styles.container}>
                        <TouchableOpacity style={styles.header} onPress={this.changeImage.bind(this)}>
                            <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + this.state.editing.image}}/>
                            <Text style={styles.nome}>Alterar imagem</Text>
                        </TouchableOpacity>
                        <LinearGradient style={styles.body} colors={['#CEBBBA', '#CFDBDB']} locations={[0,.7]}>
                            <Text style={styles.label}>Localização</Text>
                            <TextInput style={[styles.input, styles.inputWithoutMarginBottom]}
                                onChangeText={(e) => this.handleChanges.bind(this)(e,'localization')}
                                value={this.state.editing.localization}
                                editable={true}
                                />
                            <Text style={styles.label}>Biografia</Text>
                            <TextInput style={[styles.input, styles.bio]}
                                onChangeText={(e) => this.handleChanges.bind(this)(e,'bio')}
                                numberOfLines={4}
                                multiline={true}
                                maxLength={250}
                                value={this.state.editing.bio}
                                editable={true}
                                />
                            <View style={styles.buttonArea}>{
                                (this.state.mode === 'editing') ? (
                                    <React.Fragment>
                                    <TouchableOpacity
                                        onPress={this.cancelModifications.bind(this)}
                                        style={styles.button}>
                                        <Text style={styles.buttonText}>cancelar</Text>
                                    </TouchableOpacity>
                                    <View style={styles.buttonSeparator}></View>
                                    <TouchableOpacity
                                        onPress={this.saveModification.bind(this)}
                                        style={styles.button}>
                                        <Text style={styles.buttonText}>salvar</Text>
                                    </TouchableOpacity>
                                    </React.Fragment>
                                ) : (
                                    <Text style={styles.buttonText}>salvando...</Text>
                                )
                            }

                            </View>
                        </LinearGradient>
                    </View>
                )
        }
    }
}