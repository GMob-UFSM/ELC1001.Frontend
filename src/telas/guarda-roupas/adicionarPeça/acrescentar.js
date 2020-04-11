import React, { Component } from 'react'
import { View, Text, TextInput, Image, Picker, StyleSheet, TouchableHighlight, TouchableOpacity } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import okbutton from '../../../assets/buttons/okbutton.png'

import api from '../../../services/api'

export default class Acrescentar extends Component {
    state = {
        peça: '',
        modelo: '',
        marca: '',
        descriçao: '',
        uri: '',
    } 

    handleBodyPartChange = (peça) => {
        this.setState({ peça });
    };
    handleModelChange = (modelo) => {
        this.setState({ modelo });
    };
    handleBrandChange = (marca) => {
        this.setState({ marca });
    };
    handleDescriptionChange = (descriçao) => {
        this.setState({ descriçao });
    };

    RegisterGarment = async() => {
        try{

            const uri = await AsyncStorage.getItem('@Baloo:uri');
            console.log(uri);

            const token = await AsyncStorage.getItem('@Baloo:token');
            const AuthStr = 'Bearer '.concat(token); 
            console.log(token)

            const params = new URLSearchParams();
            params.append('body_part', this.state.peça);
            params.append('model', this.state.modelo);
            params.append('manufactor', this.state.marca);
            params.append('description', this.state.descriçao);
            params.append('image_urls', uri);

            console.log("params: " + params);

            let data = JSON.stringify({
                body_part: this.state.peça,
                model: this.state.modelo,
                manufactor: this.state.marca,
                description: this.state.descriçao,
                image_urls: uri
            })// Delete data and use params

            await api.post('/api/v1/garment/create', data,
            { 'headers': { 'Authorization': AuthStr } });

            console.log("DATA: "+ data)

            this.props.navigation.navigate('Publicar');

        }catch(err){
            console.log("catch: " + err);
        }
    }

    CancelOperation = async() => {

        AsyncStorage.removeItem("@Baloo:uri")
        this.props.navigation.navigate('Camera')
    }

    render() {
        return(
            <View style={styles.container}>
                <View style={styles.boxContainer}>
                    <Text style={styles.text}>Peça</Text>
                    <View style={styles.textInput}>
                    <Picker selectedValue = {this.state.peça} onValueChange = {this.handleBodyPartChange}>
                        <Picker.Item label = "Cabeça" value = "head" />
                        <Picker.Item label = "Tronco" value = "torso" />
                        <Picker.Item label = "Pernas" value = "legs" />
                        <Picker.Item label = "Troco + Pernas" value = "torso_legs" />
                        <Picker.Item label = "Pés" value = "feet" />
                        <Picker.Item label = "Acessório" value = "accessory" />
                    </Picker>
                    </View>
                </View>

                <View style={styles.boxContainer}>
                    <Text style={styles.text}>Modelo</Text>
                    <TextInput style={styles.textInput} 
                    placeholder= "ex.: 37"
                    value={this.state.modelo}
                    onChangeText={this.handleModelChange}
                    autoCapitalize="none"
                    autoCorrect={false}/>
                </View>

                <View style={styles.boxContainer}>
                    <Text style={styles.text}>Marca</Text>
                    <TextInput style={styles.textInput} 
                    placeholder= "ex.: Insects"
                    value={this.state.marca}
                    onChangeText={this.handleBrandChange}
                    autoCapitalize="none"
                    autoCorrect={false} />
                </View>

                <View style={styles.boxContainer}>
                    <Text style={styles.text}>Estação</Text>
                    <TextInput style={{borderWidth: 3, borderBottomColor: "#4E3D42", borderColor: "#C4D0D0", width: "100%", alignSelf: "flex-start"}}
                    placeholder= "Insira aqui #TAGs que descrevam o produto, também o seu estado de espírito"
                    value={this.state.descriçao}
                    onChangeText={this.handleDescriptionChange}
                    autoCapitalize="none"
                    autoCorrect={false}
                    multiline={true} />
                </View>
                
                <View style={{justifyContent: "center", alignContent: "center", margin: 50, flexDirection: "row"}}>
                    <TouchableOpacity onPress={this.CancelOperation} style={{alignSelf: "center", marginRight: 15}}>
                        <Text style={{fontSize: 17, fontWeight: "bold", color: "#4E3D42"}}>cancelar</Text>
                    </TouchableOpacity>
                    <TouchableHighlight onPress={this.RegisterGarment}>
                        <Image source={okbutton} style={{height: 53, width: 53}} />
                    </TouchableHighlight>
                </View>
            </View>
        )
    }
} 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#C4D0D0",
        paddingTop: 30
    },
    boxContainer: {
        width: "65%", 
        alignSelf: "center",
        margin: 10
    },
    text: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4E3D42",
        alignSelf: "flex-start",
        margin: 3,
        fontFamily: "Rubik",
    }, 
    textInput: {
        borderRadius: 16,
        backgroundColor: "#FFF",
        borderWidth: 3,
        borderColor: "#4E3D42",
        width: "100%",
        alignSelf: "center"
    }

})