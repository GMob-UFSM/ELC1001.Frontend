import React, { Component } from 'react'
import { View, Image, ScrollView, Text, StyleSheet, TouchableOpacity, Modal, FlatList, ActivityIndicator } from 'react-native'
import { Calendar as Calendario } from 'react-native-plain-calendar'

import Icon from 'react-native-vector-icons/MaterialIcons'

import api from '../services/api'

Icon.loadFont();

import Add from '../assets/icons/botaoadd.svg'
import LinearGradient from 'react-native-linear-gradient'
import { SafeAreaView } from 'react-navigation'

const looks = [[new Date("2020/05/21"), "tarde", require("../assets/images/looks.jpeg")],
             [new Date("2020/05/23"), "noite", require("../assets/images/looks.jpeg")]];


var days = ['Domingo','Segunda-feira','Terça-feira',
            'Quarta-feira','Quinta-feira','Sexta-feira','Sábado'];
var months = ['Janeiro','Fevereiro','Março',
            'Abril','Maio','Junho','Julho',
            'Agosto','Setembro','Outubro','Novembro','Dezembro'];

function getAno (date){
    return  new Date(date).getFullYear();
}

function getDia (date){
    return  days[new Date(date).getDay()] + ", " + 
                new Date(date).getDate("dd") + " de " + 
                months[new Date(date).getMonth()]
}

export default class Calendar extends Component {


    constructor() {
        super();
        this.onEndReachedCalledDuringMomentum = true;
        this.state = {
          showButtonOpt: false,
          showAddLook: false,
          showMsgAddLook: false,
          dataAtual: Date(),
          selDate: Date(),
          turno:"",
          look: [],
          looks: [],
          modalVisible: false,
          total: 0,
          loading: false,
          page: 0
        };
        
    }

    ShowHideButtonOpt = () => {
        if (this.state.showButtonOpt == true) {
          this.setState({ showButtonOpt: false });
        } else {
          this.setState({ showButtonOpt: true });
        }
    };

    ShowHideAddLook = async (turno) => {
        
        if (this.state.showAddLook == true) {
          this.setState({ showAddLook: false });
          this.setState({ dataAtual: this.state.selDate });
          this.setState({ turno: "" });
        } else {
          await this.setState({ turno: turno, loading: true });
          await this.hasLook();
          this.setState({ showAddLook: true });
          this.setState({ showButtonOpt: false });
          this.setState({ showMsgAddLook: false });
          this.setState({ turno: turno});
          this.setState({ selDate: new Date(this.state.dataAtual) });
        }
    };

    ShowHideAddLookManha = () => {
        this.ShowHideAddLook("manhã")
    }

    ShowHideAddLookTarde = () => {
        this.ShowHideAddLook("tarde")
    }

    ShowHideAddLookNoite = () => {
        this.ShowHideAddLook("noite")
    }

    ShowHideMsgAddLook = () => {
        if (this.state.showMsgAddLook == true) {
          this.setState({ showMsgAddLook: false });
          console.log("Data Selecionada: " + this.state.selDate);
        } else {
          this.setState({ showMsgAddLook: true });
          this.loadPage();
        }
    };

    toggleModal = () => {
        this.setState({ modalVisible: !this.state.modalVisible });
    }

    async loadPage (pageNumber = this.state.page)  { 
       
        if(pageNumber > this.state.total){
            return
        }

        try{

            this.setState({ loading: true });

            const response = await api.get(`/api/v1/look?skip=${pageNumber*20}&limit=20`);
            const data = await response.data.data;

            const totalAmount = await response.data.totalAmount;

            this.setState({
                looks: [...this.state.looks, ...data],
                page: pageNumber + 1,
                loading: false,
                total: Math.ceil(totalAmount / 20)
            })

        }catch(err){
            console.log(err)
    
        }  
    }

    AddLook(item) {

        this.setState({
            modalVisible: false,
            loading: true
        });

        var date = new Date(this.state.dataAtual);

        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();

        const dAt = m + '-' + d + '-' + y;

        var turno;

        if(this.state.turno === "manhã"){
            turno = "morning"
        } else if(this.state.turno === "tarde"){
            turno = "afternoon"
        } else {
            turno = "night"
        }

        console.log("Look _id:" + item._id + " Data: " + dAt + " Turno: " + turno);

        try {
            api.post(`/api/v1/calendar/${dAt}/${turno}`, {
                date: this.state.selDate,
                shift: turno,
                look: item._id  
            }).then((response) => {

                if (response.status == 200){
                    this.setState({ showAddLook: true });
                    this.hasLook();
                }

          });
        } catch (error) {
            console.log(error);
        }

    }


    hasLook = async () => {
        var k = "";

        var date = new Date(this.state.dataAtual);

        var d = date.getDate();
        var m = date.getMonth() + 1; //Month from 0 to 11
        var y = date.getFullYear();

        var turno;

        if(this.state.turno === "manhã"){
            turno = "morning"
        } else if(this.state.turno === "tarde"){
            turno = "afternoon"
        } else {
            turno = "night"
        }

        const dAt = m + '-' + d + '-' + y;
        console.log("String Date: " + dAt + " Turno: " + turno);

        try {

            await api.get(`/api/v1/calendar/${dAt}/${turno}`).then((response) => {

                console.log("Claendar Data: " + response.data);
    
                if(response.data === null){
                    this.setState({ look: [], loading: false });
                }else{
                    this.getLook(response.data.look);
                }
    
            });
            
        } catch (error) {
            console.log(error);
        }
    }

    async getLook(lookId) {

        var responseData;

        try {

            await api.get(`/api/v1/look/${lookId}`).then((response) => {
                responseData = response.data;
            });

        } catch (error) {
            console.log(error);
        }

        await this.setState({ look: responseData, loading: false }); 

    }

    Prev = async () => {
        if(this.state.turno == ""){
            await this.setState({ turno: "manhã" });
        } else if (this.state.turno == "manhã"){
            await this.setState({ turno: "noite" }); 
            var d = new Date(this.state.dataAtual);
            await this.setState({ dataAtual: new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate() - 1)});
        } else if (this.state.turno == "tarde"){
            await this.setState({ turno: "manhã" });
        } else {
            await this.setState({ turno: "tarde" });
        }
        this.hasLook();
    };

    Next = async () => {
        if(this.state.turno == ""){
            await this.setState({ turno: "manhã" });
        } else if (this.state.turno == "manhã"){
            await this.setState({ turno: "tarde" });
        } else if (this.state.turno == "tarde"){
            await this.setState({ turno: "noite" });
        } else {
            await this.setState({ turno: "manhã" });
            var d = new Date(this.state.dataAtual);
            await this.setState({ dataAtual: new Date(
                d.getFullYear(),
                d.getMonth(),
                d.getDate() + 1)}); 
        }
        this.hasLook();
    };

    onSelected = ({ selected, selectedStart, selectedEnd }) => {
        if (new Date(selected).getFullYear() == "1969"){
            this.setState({ dataAtual: Date() });
        } else {
            this.setState({ dataAtual: selected });
        }
    }
   

    render() {
        var look = this.state.look;
        console.log(look.leg_image);
        return (
            <View style={styles.container}>
                <View style={styles.header}>
                    <Text style={styles.headerTextAno}>{getAno(this.state.dataAtual)}</Text>
                    <Text style={styles.headerTextDia}>{getDia(this.state.dataAtual)}</Text>
                    <Text style={styles.headerTextTurno}>{this.state.turno}</Text>
                </View>
                <ScrollView style={styles.conteinerCalendar}>
                    <Calendario.Picker style={styles.calendar}
                        onSelected={this.onSelected}
                        selectedType='single' 
                        dayContainerStyle={styles.dayContainer}
                        dayTextStyle={styles.dayText}
                        daySingleSelectedStyle={styles.daySelectedView}
                        headerTitleStyle={styles.headerTitleStyle}
                        headerButtonStyle={styles.headerButtonStyle}
                        weekdayStyle={styles.weekdayStyle}
                    />
                </ScrollView>
                <TouchableOpacity  style={styles.button} onPress={this.ShowHideButtonOpt}>
                        <Add width={90} height={90} />
                </TouchableOpacity>
                {this.state.showButtonOpt ? ( 
                    <View style={styles.buttonOpt}>
                        <TouchableOpacity onPress={this.ShowHideAddLookManha}>
                            <Text style={styles.textButtonOpt} >Manhã</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.ShowHideAddLookTarde}>
                            <Text style={styles.textButtonOpt} >Tarde</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={this.ShowHideAddLookNoite}>
                            <Text style={styles.textButtonOpt} >Noite</Text>
                        </TouchableOpacity>
                    </View>
                ) : null}

                {this.state.showAddLook ? ( 
                    <>
                        
                        <View style={styles.viewAddLook}>
                            {}
                            {this.state.loading 

                            ? 
                            <View>
                                
                            </View>
                            
                           : (this.state.look == "" ? ( 
                                <>
                                    <View style={styles.viewLookMsg}>
                                        <Text style={styles.textLook}>ainda não foram registrados looks nesta data!</Text>
                                    </View>
                                    <TouchableOpacity  style={styles.buttonAddViewLook} onPress={() => { this.toggleModal(); this.loadPage() }}>
                                        <Add width={90} height={90} />
                                    </TouchableOpacity>
                                    <Text style={styles.textAddLook}>Acrescentar look</Text>
                                </>
                            ) : 
                                <>
                                <ScrollView >
                                    <View style={{ flexGrow: 1, backgroundColor:"#C4D0D0", flexDirection: "column" }}>
                                        <View style={styles.postContainer}>
                                            <View style={styles.lookContainer}>
                                                <Image
                                                style={styles.garment}
                                                source={{uri:look.torso_image}}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.postContainer}>
                                            <View style={styles.lookContainer}>
                                                <Image
                                                style={styles.garment}
                                                source={{uri: look.leg_image}}
                                                />
                                            </View>
                                        </View>
                                        <View style={styles.postContainer}>
                                            <View style={styles.lookContainer}>
                                                <Image
                                                style={styles.garment}
                                                source={{uri: look.feet_image}}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                </ScrollView> 
                                </>
                            )
                        }
                        </View>
                        <View style={styles.bottonAddLook}>
                            <TouchableOpacity  style={styles.buttonNext} onPress={this.Next}>
                                <Icon name="chevron-right" size={50} color="#000000" />
                            </TouchableOpacity>
                            <TouchableOpacity  style={styles.buttonPrev} onPress={this.Prev}>
                                <Icon name="chevron-left" size={50} color="#000000" />
                            </TouchableOpacity>
                            <TouchableOpacity  style={styles.buttonClose} onPress={this.ShowHideAddLook}>
                                <Icon name="close" size={50} color="#000000" />
                            </TouchableOpacity>
                        </View>
                    </>
                ) : null}

                <Modal
                animationType={"slide"}
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => console.log('closed')}
                >
                    <LinearGradient style={styles.Modalcontainer} colors={['#CEBBBA', '#CFDBDB']} locations={[0,.7]}>
                        <FlatList
                        data={this.state.looks}
                        numColumns={2}
                        onEndReached={() => {if(!this.onEndReachedCalledDuringMomentum && this.state.total !== 0){
                        this.loadPage();                    
                        this.onEndReachedCalledDuringMomentum = true;
                        }}}
                        onEndReachedThreshold={0.5}
                        onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false;}}
                        ListFooterComponent={this.state.loading && <ActivityIndicator size={"small"} color={"#999"} style={{margin: 30}} />}
                        keyExtractor={post => String(post.id)}
                        renderItem={({ item }) => (
                        <View style={styles.gridContainer}>
                            <TouchableOpacity style={styles.lookContainer} onPress={() => this.AddLook(item)}>
                                <Image
                                style={styles.torso}
                                source={{uri:item.torso_image}}
                                />
                                <Image
                                style={styles.leg}
                                source={{uri: item.leg_image}}
                                />
                                <Image
                                style={styles.feet}
                                source={{uri: item.feet_image}}
                                />
                            </TouchableOpacity>
                        </View>
                        )}
                        />
                        <TouchableOpacity  style={styles.buttonClose} onPress={() => this.toggleModal()}>
                            <Icon name="close" size={50} color="#000000" />
                        </TouchableOpacity>
                    </LinearGradient>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    lookImg:{
        width:"100%",
        marginTop:10
    },
    msgAddLook:{
        fontSize:18,
        textAlign:"center",
        marginTop:20
    },
    textAddLook:{
        fontSize:18,
        textAlign:"center",
        marginTop:-10
    },
    buttonAddViewLook:{
        marginLeft:"38%",
        marginTop:60,
        backgroundColor:"#FFF",
        maxWidth:55,
        minWidth:55
    },
    viewLookMsg:{
        borderRadius:10,
        borderColor:"#000000",
        borderWidth:2,
        marginHorizontal:50,
        marginTop:50,
        padding:20
    },
    textLook:{
        fontSize:18,
        textAlign:"center"
    },
    buttonClose: {
        marginBottom:20,
        marginLeft:'42%',
        position:'absolute',
        bottom: 0,
        zIndex:5,
        borderRadius:50,
        borderColor:"#000000",
        borderWidth:2,
        backgroundColor:"#FFF",
        maxWidth:55,
        minWidth:55
    },
    buttonPrev: {
        marginBottom:20,
        marginLeft:'5%',
        position:'absolute',
        bottom: 0,
        zIndex:5,
        borderRadius:50,
        borderColor:"#000000",
        borderWidth:2,
        backgroundColor:"#FFF",
        maxWidth:55,
        minWidth:55
    },
    buttonNext: {
        marginBottom:20,
        right:0,
        marginRight:'5%',
        position:'absolute',
        bottom: 0,
        zIndex:5,
        borderRadius:50,
        borderColor:"#000000",
        borderWidth:2,
        backgroundColor:"#FFF",
        maxWidth:55,
        minWidth:55
    },
    bottonAddLook:{
        position:'absolute',
        bottom: 0,
        zIndex:5,
        backgroundColor:"#C4D0D0",
        paddingVertical:10,
        height:110,
        width:"100%",
        flexDirection:'row'
    },
    viewAddLook:{
        position:'absolute',
        top: 0,
        width:'100%',
        height:'100%',
        zIndex:4,
        backgroundColor:"#FFF",
        marginTop:200,
    },
    textButtonOpt:{
        fontSize:20
    },
    buttonOpt:{
        position:'absolute',
        bottom: 0,
        zIndex:2,
        borderRadius:10,
        borderColor:"#000000",
        borderWidth:2,
        marginBottom:90,
        marginLeft:80,
        backgroundColor:"#FFF",
        paddingHorizontal:30,
        paddingVertical:10
    },
    button: {
        marginBottom:20,
        marginLeft:20,
        zIndex:4
    },
    container:{
        flex:1,
        backgroundColor:"#C4D0D0"
    },
    weekdayStyle:{
        color: "#000000",
        fontWeight:'bold',
        marginBottom:10
    },
    headerButtonStyle:{
        color: "#D3D3D3",
        fontSize:30,
        marginBottom:22
    },
    headerTitleStyle:{
        fontSize:22,
        width:200,
        marginTop:0,
        marginBottom:20
    },
    headerTextAno:{
        marginTop:30,
        marginLeft:20,
        fontSize:18,
        color: "#D3D3D3", 
    },
    headerTextDia:{
        marginTop:0,
        marginLeft:20,
        fontSize:25,
        color: "#FFF", 
    },
    headerTextTurno:{
        marginLeft:20,
        fontSize:18,
        color: "#D3D3D3" 
    },
    header:{
        height:130,
        backgroundColor:"#C58882",
    },
    calendar: {
        paddingTop:30,
        paddingBottom:20,
        backgroundColor:"#FFF"
    },
    dayContainer: {
        marginBottom:10,
    },
    dayText: {
        fontSize:16,
    },
    conteinerCalendar: {
    },
    daySelectedView:{
        backgroundColor:"#C58882"
    },

      Modalcontainer: {
        flex: 1,
        paddingTop: 10,
        padding: 8,
      }, 
      gridContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 15,
        margin: 5,
        padding: 5,
        height: 170,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        elevation: 5,
      },
      postContainer: {
        flex: 1,
        alignSelf: "center",
        width: '80%',
        height: 215,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 15,
        margin: 5,
        padding: 5,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      },
      lookContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
      },
    
      torso: {
        width: 66,
        height: 58,
      },
    
      leg: {      
        width: 68,
        height: 86,
      },
    
      feet: {
        width: 70,
        height: 68,
      },
      garment: {
        flex: 1,
        aspectRatio: 1.5,
        resizeMode: 'contain'
      }
}) 