import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Image, TouchableHighlight, ActivityIndicator } from 'react-native'
import AsyncStorage from '@react-native-community/async-storage';

import api from '../../services/api'
import Add from '../../assets/icons/botaoadd.svg' 

export default class Camisas extends Component {
    constructor(props) {
        super(props) 
        this.onEndReachedCalledDuringMomentum = true;  
        this.state = {
            garment: [],
            page: 0,
            token: '', 
            loading: false,
            refresh: true, 
        }
    }

    async componentDidMount() {

        const asyncToken = await AsyncStorage.getItem('@Baloo:token');
        console.log("COMPONETDIDMOUNT"); 

        const AuthStr = 'Bearer '.concat(asyncToken);  

        this.setState({
            token: AuthStr
        })

        this.loadPage() //delete await

        
    }

    async loadPage (pageNumber = this.state.page, shouldRefresh = false)  {  
        try{   
            console.log("LOADPAGE")

            this.setState({ loading: true });

            const response = await api.get(`/api/v1/garment?skip=${pageNumber*8}&limit=8`, { 'headers': { 'Authorization': this.state.token } });

            console.log("RESPONDE.DATA: " + response)
            const data = response.data.data;
            /*Object.keys(response.data.data).map( (key, index)=>{

                data.push(response.data.data[key]);
                console.log("KEY: ", key , data[key])
                console.log("INDEX: ", index)
            });*/

            console.log("DATA: " + data)
            console.log("PAGE NUMBER: " + pageNumber)
                

            this.setState({
                garment: shouldRefresh ? data : [...this.state.garment, ...data],
                page: pageNumber + 1,
                loading: false,
                refresh: false,
            })

            console.log("PAGE NUMBER(2): " + this.state.page)

        }catch(err){
            console.log(err)
    
        }  
    }

    refreshList = async () => {
        this.setState({ refresh: true })

        console.log("REFRESH LIST");
        await this.loadPage(0, true);//change first parameter to 0

        this.setState({ refresh: false })
    }

    render() {
        console.log("GARMENT: " + this.state.garment)
        console.log(this.state.garment.length)
        return ( 
            <View style={styles.container}>
                <View style={{flex: 9, backgroundColor: "#C4D0D0"}} >
                <FlatList
                contentContainerStyle={{paddingLeft: 5, paddingTop: 10}}
                numColumns={2} 
                data={this.state.garment}
                onEndReached={() => {if(!this.onEndReachedCalledDuringMomentum){
                    this.loadPage();                    
                    this.onEndReachedCalledDuringMomentum = true;
                    console.log("ONENDREACHED: " + this.state.page);
                }}}
                onEndReachedThreshold={0.5}
                onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false; }}
                ListFooterComponent={this.state.loading && <ActivityIndicator size={"small"} color={"#999"} style={{margin: 30}} />}
                onRefresh={this.refreshList}
                refreshing={this.state.refresh}
                keyExtractor={post => String(post.id)}
                renderItem={({ item }) => (
                     <View>  
                         <TouchableHighlight style={styles.garmentBox} >
                            <Image style={{width: 170, height: 180, alignSelf: "center", margin: 10}} source={{uri: item.default_image}} />
                        </TouchableHighlight>          
                    </View>
                
                 )}
                />      
                <View style={styles.text}>
                    <TouchableHighlight onPress={() => this.props.navigation.navigate('Camera')} style={{alignSelf: "center"}}>
                        <Add width={60} height={60} />
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
        backgroundColor: '#FFF'
    },
    text: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: "center"
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

