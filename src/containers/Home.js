// @flow

import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';
import LockUnlock from '../components/LockUnlock';

type Props = {
  navigation: {},
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
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

export default class Home extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Door locker
        </Text>
        <Text style={styles.instructions}>
          Press to lock and unlock
        </Text>
        <LockUnlock ip="192.168.1.140"/>
      </View>
    );
  }
}
