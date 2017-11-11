// @flow

import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Text,
  ActivityIndicator,
  AsyncStorage,
} from 'react-native';

import { FontAwesome, MaterialIcons } from '@expo/vector-icons';

import Settings from './Settings';

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
  },
  innerContainer: {
    marginTop: 180,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
  instructions: {
    textAlign: 'center',
    color: '#FFFFFF',
    marginBottom: 5,
  },
  icon: {
    color: '#FFFFFF',
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
    ip: '',
    locked: true,
    message: 'No ip set',
    buttonDisabled: true,
    loading: false,
    connectionError: false,
  }

  componentDidMount = () => {
    AsyncStorage.getItem('@Locks:ip')
      .then((ip: string) => {
        console.log(`ip from storage is: ${ip}`);
        if (ip !== null) {
          this.setState({ ip });
          this.handleGet('status');
        } else {
          // TODO Tell the user to input ip under settings
        }
      })
      .catch((e) => {
        console.log(`Error fetching from storage: ${e}`);
      });
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
    this.status();
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <Settings
          style={styles.changeIpIcon}
          ip={this.state.ip}
          updateIpToParent={(ip) => { this.setIp(ip); }}
        />
        <View style={styles.innerContainer}>
          { this.state.loading ? (
            <ActivityIndicator
              size={100}
              animating={this.state.loading}
            />
          ) : (
            this.state.connectionError ? (
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
                  <FontAwesome name="lock" style={styles.icon} size={lockIconSize} />
                </TouchableHighlight>
              ) : (
                <TouchableHighlight
                  onPress={() => { this.lock(); }}
                  underlayColor='#F5FCFF'
                  disabled={this.state.buttonDisabled}
                >
                  <FontAwesome name="unlock-alt" style={styles.icon} size={lockIconSize} />
                </TouchableHighlight>
              )
            )
          )}
          <Text style={styles.instructions}>
            {this.state.message}
          </Text>
        </View>
      </View>
    );
  }
}
