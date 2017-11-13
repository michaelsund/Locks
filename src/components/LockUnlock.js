// @flow

import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  AsyncStorage,
  ActivityIndicator,
} from 'react-native';

import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Settings from './Settings';

type State = {
  ip: string,
  secret: string,
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
    top: '80%',
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
    backgroundColor: 'rgba(0,0,0,0)',
  },
  icon: {
    color: '#FFFFFF',
    backgroundColor: 'rgba(0,0,0,0)',
  },
  settingIcon: {
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
    secret: '',
    locked: true,
    message: 'Please setup ip and passphrase.',
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
          AsyncStorage.getItem('@Locks:secret')
            .then((secret: string) => {
              console.log(`secret from storage is: ${secret}`);
              if (secret !== null) {
                this.setState({ secret });
                this.handleGet('status');
              } else {
                // TODO Tell the user to input secret under settings
              }
            })
            .catch((e) => {
              console.log(`Error fetching secret from storage: ${e}`);
            });
        } else {
          // TODO Tell the user to input ip under settings
        }
      })
      .catch((e) => {
        console.log(`Error fetching ip from storage: ${e}`);
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
        body: JSON.stringify({ secret: this.state.secret }),
        // body: JSON.stringify({ secret: '8XTbevVE7Ahu5tPh' }),
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
    console.log(`contacting ${this.state.ip} with pass ${this.state.secret}`);
  }

  unLock = () => {
    this.handleGet('unlock');
  }

  lock = () => {
    this.handleGet('lock');
  }

  setIpSecret = (ip: string, secret: string) => {
    console.log(`LockUnlock setIpSecret got ${ip} and ${secret}`);
    this.setState({ ip, secret });
    this.status();
  }

  render() {
    return (
      <View style={styles.outerContainer}>
        <Settings
          style={styles.settingIcon}
          ip={this.state.ip}
          secret={this.state.secret}
          updateToParent={(ip, secret) => { this.setIpSecret(ip, secret); }}
        />
        <View style={styles.innerContainer}>
          { this.state.loading ? (
            <ActivityIndicator
              animating={this.state.loading}
              size="large"
            />
          ) : (
            this.state.connectionError ? (
              <TouchableOpacity
                onPress={() => { this.status(); }}
                underlayColor='#F5FCFF'
                disabled={this.state.buttonDisabled}
              >
                <MaterialIcons
                  name="error"
                  style={styles.icon}
                  size={lockIconSize}
                />
              </TouchableOpacity>
            ) : (
              this.state.locked ? (
                <TouchableOpacity
                  onPress={() => { this.unLock(); }}
                  underlayColor='#F5FCFF'
                  disabled={this.state.buttonDisabled}
                >
                  <FontAwesome
                    name="lock"
                    style={styles.icon}
                    size={lockIconSize}
                  />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  onPress={() => { this.lock(); }}
                  underlayColor='#F5FCFF'
                  disabled={this.state.buttonDisabled}
                >
                  <FontAwesome
                    name="unlock-alt"
                    style={styles.icon}
                    size={lockIconSize}
                  />
                </TouchableOpacity>
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
