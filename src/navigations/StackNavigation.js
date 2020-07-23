import { createStackNavigator } from 'react-navigation-stack';
import CakesList from '../screens/CakesList';
import CakesDetail from '../screens/CakesDetail';
import AddCakes from '../screens/AddCakes';

export default StackNavigation = createStackNavigator({
  CakesList: {
    screen: CakesList,
    navigationOptions: {
      headerTitle: 'Cakes List'
    }
  },
  CakesDetail: {
    screen: CakesDetail,
    navigationOptions: {
      headerTitle: 'Cake Detail'
    }
  },
  AddCake: {
    screen: AddCakes,
    navigationOptions: {
      headerTitle: 'Add Cake'
    }
  }
}, {
  defaultNavigationOptions: ({ navigation, screenProps }) => {
    return ({
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'orange'
      }
    })
  }
}
)