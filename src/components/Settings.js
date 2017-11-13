// @flow

import * as React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  AsyncStorage,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  ip: string,
  ip: secret,
  updateToParent: Function,
}

type State = {
  ip: string,
  ip: secret,
  modalVisible: bool,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
    marginLeft: 20,
    marginRight: 20,
  },
  icon: {
    color: '#FFFFFF',
    padding: 20,
    backgroundColor: 'rgba(0,0,0,0)',
  },
  input: {
    borderColor: 'gray',
    borderRadius: 6,
    borderWidth: 1,
    height: 40,
    margin: 10,
    padding: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button: {
    width: '40%',
  },
});

export default class Settings extends React.Component<Props, State> {
  state = {
    ip: this.props.ip,
    secret: this.props.secret,
    modalVisible: false,
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ ip: nextProps.ip, secret: nextProps.secret });
  }

  handleUpdate = () => {
    AsyncStorage.setItem('@Locks:secret', this.state.secret)
      .then(() => {
        AsyncStorage.setItem('@Locks:ip', this.state.ip)
          .then(() => {
            this.setState({ modalVisible: !this.state.modalVisible });
            this.props.updateToParent(this.state.ip, this.state.secret);
          })
          .catch(() => {
            // Handle error
          });
      })
      .catch(() => {
        // Handle error
      });
  }

  handleCancel = () => {
    this.setState({
      modalVisible: !this.state.modalVisible
    });
  }

  resetIpSecret = () => {
    AsyncStorage.removeItem('@Locks:ip')
      .then(() => {
        console.log('ip removed');
        AsyncStorage.removeItem('@Locks:secret')
          .then(() => {
            console.log('secret removed');
          });
      });
  }

  render() {
    return (
      <View>
        <TouchableOpacity
          onPress={() => {
            this.setState({ modalVisible: !this.state.modalVisible });
          }}>
          <MaterialIcons name="settings" style={styles.icon} size={40} />
        </TouchableOpacity>
        {/* <TouchableOpacity
          onPress={() => { this.resetIpSecret(); }}>
          <MaterialIcons name="remove" style={styles.icon} size={40} />
        </TouchableOpacity> */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.container}>
            <View>
              <Text style={{ alignSelf: 'center' }}>Device IP</Text>
              <TextInput
                style={styles.input}
                value={this.state.ip}
                onChangeText={(ip) => this.setState({ ip })}
              />
              <Text style={{ alignSelf: 'center' }}>Secret</Text>
              <TextInput
                secureTextEntry
                style={styles.input}
                value={this.state.secret}
                onChangeText={(secret) => this.setState({ secret })}
              />
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={() => {
                    this.handleUpdate();
                  }}>
                  <Text>Done</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    this.handleCancel();
                  }}>
                  <Text>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
