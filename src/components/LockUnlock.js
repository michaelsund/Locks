// @flow

import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ActivityIndicator,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import ChangeIp from './ChangeIp';

type State = {
  ip: string,
  locked: bool,
  message: string,
  buttonDisabled: bool,
  loading: bool,
  connectionError: bool,
};

const styles = StyleSheet.create({
  outerContainer: {
    backgroundColor: '#F5FCFF',
  },
  innerContainer: {
    marginTop: 180,
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
  icon: {
    color: '#000000',
  },
  changeIpIcon: {
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 20,
  },
});

const lockIconSize = 120;

export default class LockUnlock extends React.Component<{}, State> {
  state = {
    ip: '192.168.1.140',
    locked: true,
    message: 'Checking status...',
    buttonDisabled: true,
    loading: true,
    connectionError: false,
  }

  componentDidMount = () => {
    this.handleGet('status');
  }

  handleGet = (path: string) => {
    this.setState({
      message: 'Sending request, please wait..',
      buttonDisabled: true,
      loading: true,
    });
    fetch(
      `http://${this.state.ip}/${path}`,
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
          connectionError: false,
          locked: responseJson.locked,
          message: responseJson.message,
        });
      })
      .catch((error) => {
        console.log(error);
        this.setState({
          connectionError: true,
          message: 'Connection problem, click again to retry.',
        });
      })
      .done(() => {
        this.setState({
          buttonDisabled: false,
          loading: false,
        });
      });
  }

  status = () => {
    this.handleGet('status');
    console.log(`contacting ${this.state.ip}`);
  }

  unLock = () => {
    this.handleGet('unlock');
  }

  lock = () => {
    this.handleGet('lock');
  }

  setIp = (ip: string) => {
    this.setState({ ip });
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <ChangeIp
          style={styles.changeIpIcon}
          ip="192.168.1.30"
          updateIpToParent={(ip) => { this.setIp(ip); }}
        />
        <View style={styles.innerContainer}>
          { this.state.connectionError ? (
            <TouchableHighlight
              onPress={() => { this.status(); }}
              underlayColor='#F5FCFF'
              disabled={this.state.buttonDisabled}
            >
              <MaterialIcons name="error" style={styles.icon} size={lockIconSize} />
            </TouchableHighlight>
          ) : (
            this.state.locked ? (
              <TouchableHighlight
                onPress={() => { this.unLock(); }}
                underlayColor='#F5FCFF'
                disabled={this.state.buttonDisabled}
              >
                <MaterialIcons name="lock" style={styles.icon} size={lockIconSize} />
              </TouchableHighlight>
            ) : (
              <TouchableHighlight
                onPress={() => { this.lock(); }}
                underlayColor='#F5FCFF'
                disabled={this.state.buttonDisabled}
              >
                <MaterialIcons name="unlock" style={styles.icon} size={lockIconSize} />
              </TouchableHighlight>
            )
          )}
          <Text style={styles.instructions}>
            {this.state.message}
          </Text>
          <ActivityIndicator
            animating={this.state.loading}
          />
        </View>
      </View>
    );
  }
}
