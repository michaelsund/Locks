// @flow

import * as React from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import LockList from '../components/LockList';

type Props = {
  navigation: {},
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  icon: {
    width: 26,
    height: 26,
  },
});

export default class Settings extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <LockList />
      </View>
    );
  }
}
