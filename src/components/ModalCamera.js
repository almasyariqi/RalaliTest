import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import Modal, { ModalContent, SlideAnimation } from 'react-native-modals';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons'

export default class ModalCamera extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      onPressCamera,
      onPressGallery
    } = this.props
    return (
      <Modal
        {...this.props}
        modalAnimation={new SlideAnimation({
          slideFrom: 'bottom',
        })}
        modalStyle={{ width: 200, borderRadius: 2, }}
      >
        <ModalContent>
          <TouchableOpacity onPress={onPressGallery}>
            <View style={styles.btn}>
              <MaterialComIcon name='folder-image' size={20} />
              <Text style={{ paddingLeft: 10 }}>Select from Gallery</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={onPressCamera}>
            <View style={styles.btn}>
              <MaterialComIcon name='camera' size={20} />
              <Text style={{ paddingLeft: 10 }}>Select from Camera</Text>
            </View>
          </TouchableOpacity>
        </ModalContent>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 40
  }
});
