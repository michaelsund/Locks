import { TabNavigator } from 'react-navigation';

import Home from './src/containers/Home';
import Settings from './src/containers/Settings';

const Router = TabNavigator({
  Home: {
    screen: Home,
  },
  Settings: {
    screen: Settings,
  },
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    activeTintColor: '#e91e63',
    style: {
      // backgroundColor: 'blue',
    },
    indicatorStyle: {
      backgroundColor: '#e91e63',
    },
  },
});


export default Router;
