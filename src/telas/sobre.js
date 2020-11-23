import React, { Component } from 'react'
import { View, Text, ScrollView, Image, StyleSheet } from 'react-native'

import Logo from '../assets/images/logo-marrom.png'

export default class Sobre extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Image style={styles.logo} source={Logo}></Image>
                <View style={styles.textView}>
                    <Text style={styles.paragraph}>Se tem uma coisa que as histórias do Mogli, o menino lobo, nos inspiraram é buscar uma vida mais simples, que de fato seja “somente o necessário”. A indústria da moda é uma das mais poluentes do planeta e o que você usa pode ajudar a definir as transformações do mundo.</Text>
                    <Text style={styles.paragraph}>Balook é um aplicativo que permite organizar, montar, compartilhar, doar e trocar looks. Além de compartilhar com os amigos  tanto os looks, quanto as peças, você pode buscar pessoas próximas ou distantes e verificar as peças disponíveis para doação ou troca, em uma comunidade de moda engajada e sustentável. Ao organizar o seu guarda-roupas você percebe o que tem em excesso e o que está faltando, e ainda ajuda a não repetir looks.</Text>
                    <Text style={styles.paragraph}>O aplicativo foi projetado pela Profa. Dra. Débora Aita Gasparetto, no Laboratório de Interfaces do DI/UFSM. Faz parte do projeto de Pesquisa Design de Interfaces para aplicativos e Web, registro 050137, Inserido no Grupo de Pesquisa Design, Ciência e Tecnologia - UFSM/Cnpq.</Text>
                    <Text style={styles.paragraph}>A implementação, o refino e a disseminação foram realizados no laboratório do Prof. Dr. Joao Carlos Damasceno Lima,  no GMOB (Grupo de Pesquisa em Sistemas de Computação Móvel) da Ciência da Computação/UFSM. Fizeram parte do projeto os alunos: Gustavo Fantinel, João Vitor Forgearini Beltrame, Maurício Schmaedeck, Talles Siqueira Ceolin e Victor Curi Aiub Miranda.</Text>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    logo:{
        flex: 1,
        resizeMode: 'contain',
        width: 130,
        height: 123,
        marginLeft: 25,
        marginTop: 25
    },
    textView: {
        paddingVertical: 25,
        paddingLeft: 75,
        paddingRight: 25
    },  
    paragraph: {
        paddingVertical: 5,
        color: '#6E6164'
    }
})