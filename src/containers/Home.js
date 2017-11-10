// @flow

import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';
import LockUnlock from '../components/LockUnlock';

type Props = {
  navigation: {},
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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

export default class Home extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <LockUnlock />
      </View>
    );
  }
}
