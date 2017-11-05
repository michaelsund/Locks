// @flow

import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ActivityIndicator,
} from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

type Props = {
  ip: string,
}

type State = {
  locked: bool,
  message: string,
  buttonDisabled: bool,
  loading: bool,
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  image: {
    width: 150,
    height: 150,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  lockIcon: {
    color: '#000000',
  },
});

const lockIconSize = 140;

export default class LockUnlock extends React.Component<Props, State> {
  state = {
    locked: true,
    message: 'Checking status...',
    buttonDisabled: true,
    loading: true,
  }

  componentDidMount = () => {
    this.handleGet('status');
  }

  handleGet = (path) => {
    this.setState({
      message: 'Sending request, please wait..',
      buttonDisabled: true,
      loading: true,
    });
    fetch(
      `http://${this.props.ip}/${path}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify({ secret: '8XTbevVE7Ahu5tPh' }),
      },
    )
      .then(response => response.json())
      .then((responseJson) => {
        this.setState({
          locked: responseJson.locked,
          message: responseJson.message,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          message: 'Connection problem...',
        });
      })
      .done(() => {
        this.setState({
          buttonDisabled: false,
          loading: false,
        });
      });
  }

  unLock = () => {
    this.handleGet('unlock');
  }

  lock = () => {
    this.handleGet('lock');
  }

  render() {
    return (
      <View style={ styles.container }>
        { this.state.locked ? (
          <TouchableHighlight
            onPress={() => { this.unLock(); }}
            underlayColor='#F5FCFF'
            disabled={this.state.buttonDisabled}
          >
            <EvilIcons name="lock" style={styles.tabBarIcon} size={lockIconSize} />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            onPress={() => { this.lock(); }}
            underlayColor='#F5FCFF'
            disabled={this.state.buttonDisabled}
          >
            <
            EvilIcons name="unlock" style={styles.lockIcon} size={lockIconSize} />
          </TouchableHighlight>
        )}
        <Text style={styles.instructions}>
          {this.state.message}
        </Text>
        <ActivityIndicator
          animating={this.state.loading}
        />
      </View>
    );
  }
}
