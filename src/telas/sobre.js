import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'

import Logo from '../assets/images/logo.png'

export default class Sobre extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <View style={styles.logoView}>
                    <Image style={styles.logo} source={Logo}></Image>
                </View>
                <View>
                    <Text style={styles.paragraph}>Baloo é um aplicativo que permite montar, compartilhar, doar e trocar looks, conforme o dia, a cor, o humor e as peças, você pode buscar pessoas próximas ou distantes e verificar as peças disponíveis para a troca, em uma comunidade de moda engajada e sustentável. Fique também por dentro das principais notícias sobre moda sustentável no espaço Fashion Eco News.</Text>
                    <Text style={styles.paragraph}>O aplicativo foi projetado por Débora Aita Gasparetto, no Laboratório de Interfaces do DI/UFSM, com uso da metodologia 5I's, desenvolvida pela autora. Faz parte do projeto de Pesquisa Design de Interfaces para aplicativos e Web, registro 050137, inserido no Grupo de Pesquisa Design, Ciência e Tecnologia - UFSM/CNPQ.</Text>
                    <Text style={styles.paragraph}>O aplicativo foi implementado no laboratório do Prof. Dr. João Carlos Damasceno Lima, no GMOB (Grupo de Pesquisa em Sistemas de Computação Móvel) da Ciência da Computação/UFSM.</Text>
                    <Text style={styles.paragraph}>Verifique nas configurações a versão acessível para pessoas com baixa visão.</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    logoView: {
        backgroundColor: "#D7A6A3",
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 25,
        padding: 25,
    },
    logo:{
        resizeMode: 'cover',
    },
    paragraph: {
        paddingHorizontal: 30,
        paddingVertical: 5,
        textAlign: 'justify'
    }
})