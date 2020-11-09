import React, { Component } from 'react'
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native'
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
        flex: 1.5,
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    bioContainer: {
        flex: 2,
        justifyContent: "center",
        alignContent: "center"
    },
    body: {
        flex: 3,
    },
    image: {
        backgroundColor: '#C58882',
        resizeMode: 'cover',
        height: '55%',
        aspectRatio: 1,
        borderRadius: 10000,
        borderWidth: 3,
        borderColor: color.accent,
    },
    nome: {
        color: '#4E3D42',
        fontSize: 20,
        fontWeight: 'bold'
    },
    localizacao: {
        fontSize: 20,
        color: '#4E3D42',
    },
    label: {
        color: color.accent,
        marginLeft: 20,
        fontSize: 22,
        marginBottom: 5,
        marginTop: 10
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
        marginBottom: 5,
        margin: 10
    },
    bio: {
        color: color.accent,
        margin: 10
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
        fontSize: 15,
        color: '#087E8B',
    },
    buttonSeparator:{
        width: 40
    },
    garmentBox: {
        backgroundColor: "white",
        borderRadius: 20,
        flexGrow: 1,
        flexBasis: 0,
        margin: 5, 
        flexDirection: 'row',
    },
})


export default class Perfil extends Component {

    //state = { mode: 'initializing' }
    constructor(props) {
        super(props) 
        this.onEndReachedCalledDuringMomentum = true;  
        this.state = {
            garment: [],
            page: 0,
            token: '', 
            loading: false,
            refresh: true, 
            total: 0,
            mode: 'initializing',
        }
    }

    componentDidMount() {
        setTimeout(() => {
            if (this.state.mode === 'initializing') {
                this.setState((state) => {
                    return {...state, mode: 'loading' }
                })
            }
        },300);
        api.get('/api/v1/user/me').then((response) => {
            this.setState((state) => {
                return {...response.data.user, mode: 'loaded'}
            })
        },(error) => {
            console.log(error)
        });

        this.loadPage();
    }
    /*constructor(props) {
        super(props);
    }*/

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
        api.post('/api/v1/user/me').then((response) => {//MOdificar a rota. A atual não tem essa função adicionada
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

    async loadPage (pageNumber = this.state.page, shouldRefresh = false)  {  
       
        if(pageNumber > this.state.total){
            return
        }

        try{   

            this.setState({ loading: true });

            const response = await api.get(`/api/v1/garment?skip=${pageNumber*20}&limit=20`);
                                            // /api/v1/wardrobe/:wardrobeId
            const data = await response.data.data;
            const totalAmount = await response.data.totalAmount;

            this.setState({
                garment: shouldRefresh ? data : [...this.state.garment, ...data],
                page: pageNumber + 1,
                loading: false,
                refresh: false,
                total: Math.ceil(totalAmount / 20),
            })

        }catch(err){
            console.log(err)
    
        }  
    }

    refreshList = async () => {
        this.setState({ refresh: true })

        await this.loadPage(0, true);

        this.setState({ refresh: false })
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
                        <View style={{flex: 1.5, flexDirection: 'row', backgroundColor: 'white', justifyContent: 'center', alignContent: 'center'}}>
                            <View style={styles.header}>
                                <Image style={styles.image} source={{uri: 'data:image/jpeg;base64,' + this.state.image}}/>
                                <Text style={styles.nome}>{`${this.state.name.first} ${this.state.name.last}`}</Text>
                                {this.state.localizacao
                                    ? <Text style={styles.localizacao}>{this.state.localization}</Text>
                                    : null
                                }
                                <View style={styles.buttonArea}>
                                    <TouchableOpacity
                                        onPress={this.enterEditMode.bind(this)}
                                        style={styles.button} >
                                        <Text style={styles.buttonText}>Editar Perfil</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                            {this.state.bio
                            ? <View style={styles.bioContainer}>
                                <TextInput style={[styles.input, styles.bio]}
                                    numberOfLines={4}
                                    multiline={true}
                                    maxLength={250}
                                    value={this.state.bio}
                                    editable={false}
                                />
                            </View>
                            : null
                            }
                        </View>
                        <LinearGradient style={styles.body} colors={['#CEBBBA', '#CFDBDB']} locations={[0,.7]}>
                        <FlatList
                            contentContainerStyle={{paddingTop: 10, alignSelf: "center"}}
                            numColumns={2} 
                            data={this.state.garment}
                            onEndReached={() => {if(!this.onEndReachedCalledDuringMomentum){
                            this.loadPage();                    
                            this.onEndReachedCalledDuringMomentum = true;
                            }}}
                            onEndReachedThreshold={0.5}
                            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false;}}
                            ListFooterComponent={this.state.loading && <ActivityIndicator size={"small"} color={"#999"} style={{margin: 30}} />}
                            onRefresh={this.refreshList}
                            refreshing={this.state.refresh}
                            keyExtractor={post => String(post.id)}
                            renderItem={({ item }) => (
                                <View>  
                                    <View style={styles.garmentBox}>
                                        <Image style={{width: 160, height: 170, alignSelf: "center", margin: 10}} source={{uri: item.default_image}} />   
                                    </View>      
                                </View>
                
                            )}
                        />      
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
                            <Text style={{fontSize: 18, color: '#087E8B', margin: 10}}>alterar imagem</Text>
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