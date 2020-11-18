import React, {Component} from 'react';
import {SafeAreaView, View, Text, FlatList, StyleSheet, Image, ActivityIndicator} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage'
import api from '../services/api'
import LinearGradient from 'react-native-linear-gradient'

export default class Looks extends Component {

    constructor(props) {
        super(props) 
        this.onEndReachedCalledDuringMomentum = true;  
        this.state = {
            look: [],
            page: 0,
            loading: false,
            refresh: true, 
            total: 0,
        }
    }

    async componentDidMount() {

      const { navigation } = this.props;
      this.focusListener = navigation.addListener("willFocus", () => {

        this.refreshList();
            
      });
        
    }

    async loadPage (pageNumber = this.state.page, shouldRefresh = false)  {  
       
        if(pageNumber > this.state.total){
            return
        }

        try{

            this.setState({ loading: true });

            const response = await api.get(`/api/v1/look?skip=${pageNumber*20}&limit=20`);
            const data = await response.data.data;

            console.log("DATA: " + data.torso_image + "Response.data: " + response.data);

            console.log("PAGE NUMBER: " + pageNumber)

            const totalAmount = await response.data.totalAmount;

            this.setState({
                look: shouldRefresh ? data : [...this.state.look, ...data],
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

        console.log("REFRESH LIST");
        await this.loadPage(0, true);

        this.setState({ refresh: false })
    }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.gradientContainer}>
          <View style={styles.containerTitle}>
            <Text style={styles.title}>looks</Text>
          </View> 

          <LinearGradient style={styles.container} colors={['#CEBBBA', '#CFDBDB']} locations={[0,.7]}>
            <FlatList
              data={this.state.look}
              numColumns={2}
              onEndReached={() => {if(!this.onEndReachedCalledDuringMomentum && this.state.total !== 0){
                this.loadPage();                    
                this.onEndReachedCalledDuringMomentum = true;
                console.log("ONENDREACHED: " + this.state.page);
            }}}
            onEndReachedThreshold={0.5}
            onMomentumScrollBegin={() => { this.onEndReachedCalledDuringMomentum = false;}}
            ListFooterComponent={this.state.loading && <ActivityIndicator size={"small"} color={"#999"} style={{margin: 30}} />}
            onRefresh={this.refreshList}
            refreshing={this.state.refresh}
            keyExtractor={post => String(post.id)}
            renderItem={({ item }) => (
                  <View style={styles.gridContainer}>
                    <View style={styles.lookContainer}>
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
                    </View>
                  </View>
                )
              }
            />
          </LinearGradient>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#CFDBDB',
  },

  gradientContainer: {
    flex: 1,
  },

  containerTitle: {
    alignItems: 'center',
    height: 35,
    justifyContent: 'center',
    backgroundColor: '#FFF',
  },

  title: {
    textAlign: 'center',
    fontSize: 17,
  },

  container: {
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
});