import React, { Component } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import api from '../services/api';
import { Rating } from 'react-native-ratings';
import { convertDate } from '../formaters/DateFormat';

export default class CakesDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cakeId: this.props.navigation.state.params.cakeId,
      cakeDetail: {}
    };
  }

  componentDidMount() {
    this.loadCakeDetail()
  }

  loadCakeDetail() {
    this.setState({ loading: true })
    api.get(`/cakes/${this.state.cakeId}`).then(
      (res) => {
        this.setState({ cakeDetail: res.data.data })
      }
    ).catch(
      (err) => {
        this.setState({ loading: false })
        console.log(err.message)
      }
    )
  }

  render() {
    return (
      <View style={styles.Container}>
        <ScrollView
          contentContainerStyle={{ padding: 10 }}
        >
          <View style={{ width: '100%', height: 150, borderRadius: 5, borderColor: 'grey', marginBottom: 10 }}>
            <Image
              source={{ uri: this.state.cakeDetail.image }}
              resizeMode='contain'
              style={{ borderTopRightRadius: 5, borderTopLeftRadius: 5, borderBottomLeftRadius: 5, borderBottomRightRadius: 5 }}
            />
          </View>
          <View style={{ width: '100%', marginBottom: 5 }}>
            <Text style={{ flexWrap: 'wrap', fontWeight: 'bold', fontSize: 20, }}>{this.state.cakeDetail.title}</Text>
          </View>
          <View style={{ marginBottom: 10 }}>
            <Rating
              type='custom'
              ratingColor='#f1c40f'
              ratingBackgroundColor='#c8c7c8'
              ratingCount={10}
              imageSize={12}
              readonly
              startingValue={this.state.cakeDetail.rating}
            />
          </View>
          <View style={{ marginBottom: 15 }}>
            <Text style={{ flexWrap: 'wrap', fontSize: 15 }}>{this.state.cakeDetail.description}</Text>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Created at</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10 }}>{convertDate(this.state.cakeDetail.created_at)}</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Last Update</Text>
            <Text style={{ fontWeight: 'bold', fontSize: 15, marginBottom: 10 }}>{convertDate(this.state.cakeDetail.updated_at)}</Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1
  },
})
