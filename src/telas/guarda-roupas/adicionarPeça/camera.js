import React, { Component } from 'react'
import { Text, View, TouchableOpacity, StyleSheet, Image, PermissionsAndroid, Modal, ScrollView, Button, TouchableHighlight } from 'react-native'
import { RNCamera } from 'react-native-camera'
import CameraRoll from '@react-native-community/cameraroll'
import AsyncStorage from '@react-native-community/async-storage';

import base64 from 'react-native-base64'

import Capture from '../../../assets/icons/Snap.svg'
import Inverter from '../../../assets/icons/inverter.svg'
import okButton from '../../../assets/buttons/okbutton.png'

export default class Camera extends Component {
  state = {
    modalVisible: false,
    photos: [],
    index: null,
    pic: false,
    cameraType: 'front'
  }

  setIndex = (index) => {
    if (index === this.state.index) {
      index = null
    }
    this.setState({ index })
  }

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  SelectPicture = async () => {
    const image = this.state.photos[this.state.index].node.image.uri;
    const data = base64.encode(image)
    AsyncStorage.setItem("@Baloo:uri", data);
    console.log("image" + data)

    this.toggleModal();

    this.props.navigation.navigate('Acrescentar') 
  }

  takePicture = async () => {
        if (this.camera) {

          const options = { quality: 0.5, base64: true };
          const data = await this.camera.takePictureAsync(options)
          const image = base64.encode(data.uri)
          AsyncStorage.removeItem("@Baloo:uri");
          AsyncStorage.setItem("@Baloo:uri", image);
          console.log("PICTURE URI: " + image);

          this.setState({ pic: true });
          this.camera.pausePreview();


        }
    }

    getPhoto = async () => {
      try {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
          {
            'title': 'Access Storage',
            'message': 'Access Storage for the pictures'
          }
          )

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            CameraRoll.getPhotos({
              assetType: "Photos",
              groupTypes: "All",
              first: 30
            }).then(ref => {
              this.setState({ photos: ref.edges });
            }).catch((err) => {
              console.log(err)
           });
          } else {
            console.log("Camera permission denied");
          }
        
      } catch (err) {
        console.warn(err)
      }
    }

    changeCameraType = () => {
      if (this.state.cameraType === 'back') {
        this.setState({
          cameraType: 'front',
        });
      } else {
        this.setState({
          cameraType: 'back',
        });
      }
  }

    render() {
      console.log("PIC: " + this.state.pic)
        return (
        <View style={styles.container}>
        <RNCamera
          ref={camera => {
            this.camera = camera;
          }}
          style={styles.preview}
          type={this.state.cameraType}
          autoFocus={RNCamera.Constants.AutoFocus.on} 
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
        >
          {this.state.pic 
          ? <TouchableHighlight onPress={() => this.setState({ pic: false }, this.camera.resumePreview())} style={styles.cancelPic}>
              <Text style={{fontSize: 20, fontWeight: "bold", color: "black", alignSelf: "center"}}>X</Text>
            </TouchableHighlight>

          : <TouchableHighlight onPress={this.takePicture} style={styles.takePic}>
              <Capture height={35} width={35} alignSelf={"center"}/>
          </TouchableHighlight>
          }

        </RNCamera>
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => this.props.navigation.navigate('GuardaRoupa')} style={{alignSelf: 'center', flex: 1, justifyContent: "center"}}>
            <Text style={{alignSelf: "center", fontSize: 17, fontWeight: "bold", color: "white"}}>voltar</Text>
          </TouchableOpacity>
          <View style={{justifyContent: "center", alignContent: "center", flex: 2, flexDirection: "row"}}>
            <TouchableHighlight style={{alignSelf: "center", margin: 10}} onPress={this.changeCameraType}>
              <Inverter height={70} width={70} alignSelf={"center"}/>
            </TouchableHighlight>
            
            {this.state.pic 
            ? <TouchableHighlight style={{alignSelf: "center", margin: 10}} onPress={() => this.props.navigation.navigate('Acrescentar')}>
                <Image source={okButton} style={{height: 50, width: 50, alignSelf: "center"}} />
              </TouchableHighlight>
            : <TouchableHighlight style={{alignSelf: "center", margin: 10}}>
                <Image source={okButton} style={{height: 50, width: 50, alignSelf: "center"}} />
              </TouchableHighlight>}

          </View>
          <TouchableOpacity onPress={() => { this.toggleModal(); this.getPhoto() }} style={{alignSelf: 'center', flex: 1, justifyContent: "center"}}>
            <Text style={{alignSelf: "center", fontSize: 17, fontWeight: "bold", color: "white"}}>camera roll</Text>
          </TouchableOpacity>
        </View>

        <Modal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => console.log('closed')}
        >
          <View style={styles.modalContainer}>
            <Button
              title='Close'
              onPress={this.toggleModal}
            />
            <ScrollView
              contentContainerStyle={styles.scrollView}>
              {
                this.state.photos.map((p, i) => {
                  return (
                    <TouchableHighlight
                      style={{opacity: i === this.state.index ? 0.5 : 1}}
                      key={i}
                      underlayColor='transparent'
                      onPress={() => this.setIndex(i)}
                    >
                      <Image
                        style={{
                          width: 150,
                          height: 150
                        }}
                        source={{uri: p.node.image.uri}}
                      />
                    </TouchableHighlight>
                  )
                })
              }
            </ScrollView>
            {
              this.state.index !== null  && (
                <View style={styles.select}>
                  <TouchableOpacity style={{}}onPress={this.SelectPicture}>
                    <Text style={{alignSelf: "center", fontSize: 17, fontWeight: "normal", color: "blue"}}>ok</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        </Modal>
      </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        backgroundColor: "#C4D0D0"
      },
      preview: {
        flex: 6,
        justifyContent: "flex-end",
        alignItems: "center"
      },
      buttonContainer: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center"
      },
      capture: {
        flex: 1,
        backgroundColor: "#C4D0D0",
        borderRadius: 5,
        padding: 15,
        paddingHorizontal: 20,
        alignSelf: "center",
        margin: 20,
        justifyContent: "center"
      },
      takePic: {
        height: 60,
        width: 60,
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "white",
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        margin: 10
      },
      cancelPic: {
        height: 30,
        width: 30,
        borderRadius: 100,
        borderColor: "black",
        borderWidth: 2,
        backgroundColor: "white",
        alignSelf: "center",
        justifyContent: "center",
        alignContent: "center",
        margin: 10

      },
      modalContainer: {
        paddingTop: 20,
        flex: 1
      },
      scrollView: {
        flexWrap: 'wrap',
        flexDirection: 'row'
      },
      select: {
        justifyContent: "center",
        alignSelf: "center",
        margin: 20
      }
})