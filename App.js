import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import Login from './src/components/Login/Login';

import PostList from './src/components/PostList/PostList';
import CookingDetail from './src/components/CookingDetail/CookingDetail';
import AddRecipe from './src/components/AddRecipe/AddRecipe';
import Setting from './src/components/Setting/Setting';
import Location from './src/components/Location/Location';
import Feed from './src/components/Feed/Feed';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator, TransitionPresets } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { Provider } from 'react-redux';

import configureStore from './src/store/configureStore';

const store = configureStore();

const tabBarNavigator = createBottomTabNavigator({
  
  Home: {
    screen: PostList,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 30, width: 30 }} source={require('./assets/home-icon3.png')}></Image>
      ),
      title: 'Home'
    }
  },
  Settings: {
    screen: Setting,
    navigationOptions: {
      tabBarIcon: ({ tintColor }) => (
        <Image style={{ height: 30, width: 30 }} source={require('./assets/settings-icon2.png')}></Image>
      ),
      title: 'Settings'
    }
  }
}, 
{
  tabBarOptions: {
    activeTintColor: '#521751',
    inactiveTintColor: '#dbacf2f5',
    labelStyle: {
      fontSize: 14,
    }
  }
})

const detailNavigation = createStackNavigator({
  tabBarNavigator,
  Detail: { 
    screen: CookingDetail, 
    navigationOptions: { ...TransitionPresets.SlideFromRightIOS}
  },
  Add: { 
    screen: AddRecipe, 
    navigationOptions: {
      ...TransitionPresets.SlideFromRightIOS
      // safeAreaInsets: { top: 0 },
      // ...TransitionPresets.ModalPresentationIOS 
    } 
  },
  Location: {
    screen: Location, 
    navigationOptions: { ...TransitionPresets.SlideFromRightIOS}
  },
  Feeds: {
    screen: Feed, 
    navigationOptions: { ...TransitionPresets.SlideFromRightIOS}
  }
}, 
{
  headerMode: "none"
});

const navigate = createSwitchNavigator(
  {
    Login: {
      screen: Login, 
      navigationOptions: { headerShown: false }
    },
    detailNavigation
  }
)

const AppNavigate = createAppContainer(navigate);

export default function App() {
  return <Provider store={store}>
            <AppNavigate />
         </Provider>
}

console.disableYellowBox = true;

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Login></Login>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
