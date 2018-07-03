import React from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { Image, View } from 'react-native';
import Landing from './landing';
import Login from './login';
import TxDetail from './txDetail';
import Send from './send';
import Explore from './explore';
import Wallet from './wallet';
import OwnWallet from './ownWallet';
import styles from './styles';
import LogoutButton from './logoutButton';
import Icon from './toolBox/icons';
import Src from '../assets/images/strapes.png';

// eslint-disable-next-line new-cap
export const Tabs = TabNavigator({
  OwnWallet: {
    screen: OwnWallet,
    navigationOptions: {
      title: 'Wallet',
      tabBarLabel: 'Wallet',
      tabBarIcon: <Icon name='list' color={styles.iconsTintColor} />,
    },
  },
  Send: {
    screen: Send,
    navigationOptions: {
      title: 'Send',
      tabBarLabel: 'Send',
      tabBarIcon: <Icon name='send' color={styles.iconsTintColor} />,
    },
  },
  Explore: {
    screen: Explore,
    navigationOptions: {
      title: 'Explore',
      tabBarLabel: 'Explore',
      tabBarIcon: <Icon name='search' color={styles.iconsTintColor} />,
    },
  },
}, {
  tabBarOptions: {
    labelStyle: {
      fontSize: 14,
    },
    style: {
      paddingTop: 5,
      marginBottom: 0,
    },
  },
  headerMode: 'screen',
});

// eslint-disable-next-line new-cap
export default StackNavigator(
  {
    Landing: {
      screen: Landing,
      navigationOptions: {
        header: null,
      },
    },
    Login: {
      screen: Login,
      navigationOptions: {
        header: null,
      },
    },
    Main: {
      screen: Tabs,
      navigationOptions: {
        headerBackground: (<View>
          <Image
          style={{ position: 'absolute', width: '100%' }}
          source={Src}
        />
        </View>),
        headerRight: <LogoutButton />,
        headerBackTitle: 'Back',
        headerTintColor: styles.white,
        headerLeft: null,
        headerStyle: {
          backgroundColor: 'transparent',
          overflow: 'hidden',
        },
      },
    },
    Wallet: {
      screen: Wallet,
      navigationOptions: {
        headerBackground: (<View>
          <Image
          style={{ position: 'absolute', width: '100%' }}
          source={Src}
        />
        </View>),
        headerRight: <LogoutButton />,
        title: 'Wallet',
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: styles.headerColor,
          overflow: 'hidden',
        },
      },
    },
    TxDetail: {
      screen: TxDetail,
      navigationOptions: {
        headerBackground: (<View>
          <Image
          style={{ position: 'absolute', width: '100%' }}
          source={Src}
        />
        </View>),
        headerRight: <LogoutButton />,
        title: 'Details',
        headerTintColor: styles.white,
        headerStyle: {
          backgroundColor: styles.headerColor,
          overflow: 'hidden',
        },
      },
    },
  },
  {
    initialRouteName: 'Landing',
  },
);
