// @flow

import * as React from 'react';
import {
  StyleSheet,
  View,
  TouchableHighlight,
  Image,
  Text,
  ActivityIndicator,
} from 'react-native';

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
});

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
    fetch(`http://${this.props.ip}/${path}`, { timeout: 4000 })
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
            <Image
              style={styles.image}
              source={require('../pics/locked.png')}
            />
          </TouchableHighlight>
        ) : (
          <TouchableHighlight
            onPress={() => { this.lock(); }}
            underlayColor='#F5FCFF'
            disabled={this.state.buttonDisabled}
          >
            <Image
              style={styles.image}
              source={require('../pics/unlocked.png')}
            />
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
