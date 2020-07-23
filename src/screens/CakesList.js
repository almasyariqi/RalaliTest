import React, { Component } from 'react';
import { View, Text, ActivityIndicator, StyleSheet, FlatList, RefreshControl, TouchableOpacity, Alert } from 'react-native';
import api from '../services/api';
import CardItem from '../components/CardItem';
import MaterialComIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import Loading from '../components/Loading';

export default class CakesList extends Component {
  constructor(props) {
    super(props);
    this.page = 1;
    this.state = {
      cakesData: [],
      loading: false,
      refreshing: false,
      noMoreData: false,
      totalPages: 0,
      currentPage: 1,
      totalElement: 0,
    };
  }

  static navigationOptions = ({ navigation }) => ({
    headerRight: (
      <View>
        <TouchableOpacity onPress={() => navigation.push('AddCake')}>
          <MaterialComIcon name='plus-thick' size={25} color='white' style={{ marginRight: 10 }} />
        </TouchableOpacity>
      </View>
    )
  })

  componentDidMount() {
    this.loadCakes()
  }

  loadCakes() {
    this.setState({ loading: true })
    api.get(`/cakes?page=${this.page}`).then(
      (res) => {
        let listData = this.state.cakesData
        let cakesData = listData.concat(res.data.data.items)
        this.setState({ cakesData: cakesData, totalPages: res.data.data.total_page, totalElement: res.data.data.items.length, loading: false })
        this.state.refreshing ? this.setState({ refreshing: false }) : null
      }
    ).catch(
      (err) => {
        this.setState({ loading: false, refreshing: false })
        console.log(err.message)
      }
    )
  }

  onRefresh() {
    this.setState({ refreshing: true, currentPage: 1, cakesData: [] })
    this.page = 1
    this.loadCakes()
  }

  handleLoadMore = () => {
    if (!this.state.loading) {
      if (this.state.currentPage < this.state.totalPages) {
        this.page = this.page + 1;
        this.setState({ currentPage: this.state.currentPage + 1 })
        this.loadCakes()
      } else {
        this.setState({ noMoreData: true })
      }
    }
  }

  onPressDelete(id) {
    Alert.alert(
      'Delete Cake',
      'Are you sure to delete this Cake?',
      [
        {
          text: 'No',
          onPress: () => console.log('Delete Cake Canceled'),
          style: 'cancel',
        },
        { text: 'Yes', onPress: () => this.deleteCake(id) },
      ],
      { cancelable: false },
    );
  }

  deleteCake(id) {
    api.delete(`/cakes/${id}`).then(
      (res) => {
        console.log("RESPONSE: ", res)
        if(res.status == 'SUCCESS'){
          this.onRefresh()
        } else {
          Alert.alert(
            'Failed to delete Cake!',
            '',
            [
              {
                text: 'Ok',
                onPress: () => console.log('Failed!'),
                styles: 'cancel',
              }
            ],
            { cancelable: false },
          )
        }
      }
    )
  }

  renderFooter = () => {
    if (this.state.totalElement == 0 && this.page == 1) {
      return (
        <View>
        </View>
      )
    } else if (this.state.currentPage < this.state.totalPages) {
      return (
        <ActivityIndicator
          color="orange"
        />
      )
    } else {
      return (
        <View style={{ padding: 10, alignItems: 'center' }}>
          <Text>No More Data</Text>
        </View>
      )
    }
  }

  render() {
    if (this.state.loading)
      return (
       <Loading/>
      )
    return (
      <View style={styles.Container}>
        <FlatList
          contentContainerStyle={{ padding: 10 }}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={() => this.onRefresh()} />
          }
          keyExtractor={item => item.id.toString()}
          data={this.state.cakesData}
          renderItem={({ item }) => (
            <TouchableOpacity activeOpacity={0.7} onPress={() => this.props.navigation.push('CakesDetail', { cakeId: item.id })}>
              <CardItem
                imageUrl={item.image}
                title={item.title}
                date={item.created_at}
                description={item.description}
                onPressDelete={this.onPressDelete.bind(this)}
                id={item.id}
              />
            </TouchableOpacity>
          )}
          ListFooterComponent={this.renderFooter}
          onEndReachedThreshold={0.5}
          onEndReached={this.handleLoadMore}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  Container: {
    flexGrow: 1,
  },
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
