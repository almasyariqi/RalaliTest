import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions, Image, Alert } from 'react-native';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import ImagePicker from 'react-native-image-crop-picker'
import { ScrollView, TextInput } from 'react-native-gesture-handler';
import ModalCamera from '../components/ModalCamera';
import api from '../services/api';
import { dateToString } from '../formaters/DateFormat';

export default class AddCakes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      avatarBase64: '',
      avatar: '',
      modalCameraVisible: false,
      titleVal: '',
      descVal: '',
      imgEmpty: false,
      titleEmpty: false,
      descEmpty: false,
      createDate: Date.now(),
      updateDate: Date.now(),
      rating: 0
    };
  }

  onAddPhoto(type) {
    this.setState({ visible: false })
    if (type == 'gallery') {
      ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true
      }).then(image => {
        this.setState({ avatar: image.path, avatarBase64: `data:${image.mime};base64,${image.data}`, modalCameraVisible: false, imgEmpty: false })
      });
    } else {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true
      }).then(image => {
        this.setState({ avatar: image.path, avatarBase64: `data:${image.mime};base64,${image.data}`, modalCameraVisible: false, imgEmpty: false })
      });
    }
  }

  onSubmit = () => {
    if (this.state.avatar == '') {
      this.setState({ imgEmpty: true })
    } else if (this.state.titleVal == '') {
      this.setState({ titleEmpty: true })
    } else if (this.state.descVal == '') {
      this.setState({ descEmpty: true })
    } else {
      this.addCake()
    }
  }

  addCake = () => {
    this.setState({ loading: true })
    api.post('/cakes', {
      title: this.state.titleVal,
      description: this.state.descVal,
      rating: this.state.rating,
      image: this.state.avatarBase64,
      created_at: dateToString(this.state.createDate),
      updated_at: dateToString(this.state.updateDate)
    }).then(
      (res) => {
        this.setState({ loading: false })
        if (res.status == 'SUCCESS') {
          Alert.alert(
            'Cake Added!',
            '',
            [
              {
                text: 'Ok',
                onPress: () => this.props.navigation.replace('CakesList'),
              }
            ],
            { cancelable: false },
          )
        } else {
          Alert.alert(
            'Failed to Add Cake!',
            '',
            [
              {
                text: 'Ok',
                onPress: () => console.log("Failed!"),
                styles: 'cancel'
              }
            ],
            { cancelable: false },
          )
        }
      }
    )
  }

  render() {
    return (
      <View style={styles.Container}>
        <ScrollView
          contentContainerStyle={{ padding: 10 }}
        >
          <View style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center' }}>
            {
              this.state.avatar != '' ?
                <TouchableOpacity onPress={() => this.setState({ modalCameraVisible: true })}>
                  <View style={[styles.ImgBtn, { borderColor: this.state.imgEmpty ? 'red' : 'grey' }]}>
                    <Image
                      style={{ width: '100%', height: '100%' }}
                      resizeMode='contain'
                      source={{ uri: this.state.avatar }}
                    />
                  </View>
                </TouchableOpacity> :
                <TouchableOpacity onPress={() => this.setState({ modalCameraVisible: true })}>
                  <View style={[styles.ImgBtn, { borderColor: this.state.imgEmpty ? 'red' : 'grey' }]}>
                    <MaterialIcon name='add-a-photo' size={40} color='black' />
                  </View>
                </TouchableOpacity>
            }
            {
              this.state.imgEmpty ? <Text style={{ fontSize: 15, color: 'red', marginLeft: 10 }}>Please add an Image</Text> : null
            }
          </View>
          <View style={[styles.textContainer, { borderColor: this.state.titleEmpty ? 'red' : 'grey', marginBottom: this.state.titleEmpty ? 2 : 10 }]}>
            <TextInput
              placeholder='Input Cake Title'
              onChangeText={(text) => this.setState({ titleEmpty: false, titleVal: text })}
            />
          </View>
          {
            this.state.titleEmpty ? <Text style={{ color: 'red', fontSize: 15, marginBottom: 10 }}>Please Fill This Form</Text> : null
          }
          <View style={[styles.textAreaContainer, { borderColor: this.state.descEmpty ? 'red' : 'grey', marginBottom: this.state.descEmpty ? 2 : 10 }]}>
            <TextInput
              placeholder='Input Cake Description'
              multiline={true}
              textAlignVertical='top'
              onChangeText={(text) => this.setState({ descEmpty: false, descVal: text })}
            />
          </View>
          {
            this.state.descEmpty ? <Text style={{ color: 'red', fontSize: 15, marginBottom: 10 }}>Please Fill This Form</Text> : null
          }
          <TouchableOpacity onPress={() => this.onSubmit()}>
            <View style={styles.submitBtn}>
              <Text style={{ fontWeight: 'bold', color: 'white', textAlign: 'center', fontSize: 15 }}>ADD CAKE</Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <ModalCamera
          visible={this.state.modalCameraVisible}
          onTouchOutside={() => {
            this.setState({ modalCameraVisible: false });
          }}
          onPressGallery={() => this.onAddPhoto('gallery')}
          onPressCamera={() => this.onAddPhoto('camera')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
  },
  ImgBtn: {
    width: Dimensions.get('window').width * 0.25,
    height: Dimensions.get('window').width * 0.2,
    borderRadius: 5,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  textContainer: {
    width: '100%',
    height: 45,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5
  },
  textAreaContainer: {
    width: '100%',
    height: 120,
    borderRadius: 5,
    borderWidth: 1,
    paddingHorizontal: 5
  },
  submitBtn: {
    width: '100%',
    height: 50,
    borderRadius: 5,
    backgroundColor: 'orange',
    justifyContent: 'center'
  }
})
