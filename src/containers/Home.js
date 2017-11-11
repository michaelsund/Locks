// @flow

import * as React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

import LockUnlock from '../components/LockUnlock';
import BackgroundImage from '../components/BackgroundImage';

type Props = {
  navigation: {},
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
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
      <BackgroundImage>
        <View style={styles.container}>
          <LockUnlock />
        </View>
      </BackgroundImage>
    );
  }
}
