import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { convertDate } from '../formaters/DateFormat';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'

export default class CardItem extends Component {
  constructor(props) {
    super(props);
    this.onPressDelete = this.onPressDelete.bind(this)
    this.state = {
    };
  }

  onPressDelete(id){
    this.props.onPressDelete(id)
  }

  render() {
    const { imageUrl, title, date, description, id } = this.props
    return (
      <View style={styles.itemContainer}>
        <Image
          source={{ uri: imageUrl }}
          resizeMode='cover'
          style={{ width: '35%', borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5, marginRight: 10 }}
        />
        <View style={{ width: '63%' }}>
          <Text style={{ fontWeight: 'bold', fontSize: 20, color: 'orange' }}>{title}</Text>
          <Text style={{ marginBottom: 15, fontSize: 15, color: 'grey' }}>{convertDate(date)}</Text>
          <View style={{ width: '100%', marginBottom: 15 }}>
            <Text style={{ flexWrap: 'wrap', color: 'grey' }}>{description}</Text>
          </View>
          <TouchableOpacity onPress={this.onPressDelete(id)}>
            <MaterialIcon name='delete' color='black' size={25} style={{ alignSelf: 'flex-end' }}/>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  itemContainer: {
    backgroundColor: 'white',
    flexDirection: 'row',
    borderRadius: 5,
    padding: 10,
    marginVertical: 5,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
})