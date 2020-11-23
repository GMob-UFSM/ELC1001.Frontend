import React, { Component } from 'react'
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native'

import comporLookIcon from '../assets/icons/comporlook_ajuda.png'
import looksIcon from '../assets/icons/looks_ajuda.png'
import mensagemIcon from '../assets/icons/mensagem_ajuda.png'
import menuIcon from '../assets/icons/menu_ajuda.png'
import cameraIcon from '../assets/icons/Camera_ajuda.png'
import filtroIcon from '../assets/icons/filtro_ajuda.png'
import pesquisaIcon from '../assets/icons/pesquisar_ajuda.png'
import calendarioIcon from '../assets/icons/calendario_ajuda.png'
import guardarIcon from '../assets/icons/guardar_ajuda.png'
import espacoTrocaIcon from '../assets/icons/espacotroca_ajuda.png'
import disponivelTrocaIcon from '../assets/icons/disponiveltroca_ajuda.png'
import doacaoIcon from '../assets/icons/doacao.png'
import favoritosIcon from '../assets/icons/favoritos_ajuda.png'
import trocaDoaIcon from '../assets/icons/troca_doa_ajuda.png'
import noticiasSalvasIcon from '../assets/icons/noticias_salvas_ajuda.png'

export default class Ajuda extends Component {
    render() {
        return (
            <ScrollView style={styles.container}>
                <Text style={styles.ajuda}>Ajuda</Text>
                <Text style={styles.ajudaDescription}>Se você estiver com dúvidas sobre como utilizar o aplicativo Baloo, compreenda os ícones:</Text>
                <View style={styles.list}>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={menuIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>MENU</Text>
                            <Text style={styles.description}>Dá acesso à todas as páginas</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={mensagemIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>MENSAGEM</Text>
                            <Text style={styles.description}>Dá acesso à todas as páginas</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={cameraIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>CÂMERA</Text>
                            <Text style={styles.description}>Aqui você fotografa peças do guarda-roupas, looks, ou itens que queira trocar</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={pesquisaIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>PESQUISA</Text>
                            <Text style={styles.description}>Aciona a barra de pesquisas geral do aplicativo, podendo levar a busca geral no seu perfil ou à buscas na comunidade</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={filtroIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>FILTRO</Text>
                            <Text style={styles.description}>O filtro funciona apenas para o seu guarda-roupas, selecionando-o você encontra as roupas cadastradas por cor, humor ou peça</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={comporLookIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>COMPOR LOOK</Text>
                            <Text style={styles.description}>Este ícone leva você à galeria de peças do seu guarda-roupas, para que possa combiná-las</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={espacoTrocaIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>ESPAÇO TROCA</Text>
                            <Text style={styles.description}>Clicando aqui você vai para a comunidade de trocas de roupas</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={looksIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>LOOKS</Text>
                            <Text style={styles.description}>Este ícone representa o espaço em que habitam os looks que você compôs</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={calendarioIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>CALENDÁRIO</Text>
                            <Text style={styles.description}>Aqui você organiza seu armário e seus looks por dia e por turno, contribuindo para evitar a repetição de looks</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={guardarIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>GUARDAR</Text>
                            <Text style={styles.description}>Esse ícone irá aparecer quando você fotografar a peça e quiser apenas organizá-la no seu guarda-roupas</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={favoritosIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>PEÇAS FAVORITAS</Text>
                            <Text style={styles.description}>No seu perfil esse ícone leva às peças que você favoritou na rede de trocas</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={trocaDoaIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>PEÇAS QUE VOCÊ JÁ TROCOU/DOOU</Text>
                            <Text style={styles.description}>No seu perfil esse ícone leva às suas trocas/doações</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={noticiasSalvasIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>NOTÍCIAS SALVAS</Text>
                            <Text style={styles.description}>No seu perfil esse ícone leva às suas notícias salvas</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={disponivelTrocaIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>DISPONÍVEL PARA TROCA</Text>
                            <Text style={styles.description}>Tanto na hora de compartilhar peças, quanto na comunidade, esse ícone simboliza peças para trocar</Text>
                        </View>
                    </View>
                    <View style={styles.row}>
                        <Image style={styles.icon} source={doacaoIcon}></Image>
                        <View>
                            <Text style={styles.subtitle}>DISPONÍVEL PARA DOAÇÃO</Text>
                            <Text style={styles.description}>Tanto na hora de compartilhar peças, quanto na comunidade, esse ícone simboliza peças para doar</Text>
                        </View>
                    </View>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        paddingHorizontal: 30,
        paddingVertical: 15,
    },
    ajuda:{
        fontWeight: 'bold',
        fontSize: 20,
        color: '#6E6164'
    },
    ajudaDescription:{
        color: '#6E6164'
    },
    list:{
        marginTop: 25,
        marginBottom: 50
    },
    row: {
        flexDirection: 'row',
        paddingTop: 15,
    },
    icon: {
        alignItems: 'center',
        resizeMode: 'contain',
        width: 48,
    },
    subtitle: {
        fontWeight: 'bold',
        color: '#6E6164'
    },
    description: {
        paddingRight: 50,
        color: '#6E6164'
    }
})