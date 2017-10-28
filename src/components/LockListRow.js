// @flow

import * as React from 'react';
import {
  View,
  StyleSheet,
  Text,
} from 'react-native';

type Props = {
  ip: string,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
});

export default class LockListRow extends React.Component<Props> {
  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.ip}
        </Text>
      </View>
    );
  }
}
