import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default class Loading extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style={styles.Container}>
        <View style={styles.loadingContainer}>
          <Text style={styles.loadingText}>Loading...</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  loadingContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    alignItems: 'center',
    padding: 15
  },
  loadingText: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'orange'
  }
})
