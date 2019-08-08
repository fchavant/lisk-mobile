/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Fragment } from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
} from 'react-native';
import * as bitcoin from 'bitcoinjs-lib';

const App = () => {
  console.log('>>>', bitcoin);
  return (
    <Fragment>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView><Text>Ali</Text></SafeAreaView>
    </Fragment>
  );
};

export default App;
