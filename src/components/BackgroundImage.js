// @flow

import * as React from 'react';
import {
  StyleSheet,
  Image,
} from 'react-native';

type Props = {
  children: Object,
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
});

export default class BackgroundImage extends React.Component<Props> {
  render() {
    return (
      <Image
        style={styles.backgroundImage}
        source={require('../pics/bg.jpg')}>
        {this.props.children}
      </Image>
    );
  }
}
