// @flow

import * as React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  AsyncStorage,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = {
  ip: string,
  updateIpToParent: Function,
}

type State = {
  ip: string,
  modalVisible: bool,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 20,
  },
  icon: {
    color: '#FFFFFF',
    padding: 20,
  },
  input: {
    height: 60,
    marginBottom: 40,
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
    modalVisible: false,
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ ip: nextProps.ip });
  }

  handleUpdateIp = () => {
    AsyncStorage.setItem('@Locks:ip', this.state.ip)
      .then(() => {
        this.props.updateIpToParent(this.state.ip);
        this.setState({ modalVisible: !this.state.modalVisible });
      })
      .catch(() => {
        // Handle error
      });
  }

  handleCancel = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      ip: this.props.ip,
    });
  }

  resetIp = () => {
    AsyncStorage.removeItem('@Locks:ip')
      .then(() => {
        console.log('ip removed');
      });
  }

  render() {
    return (
      <View>
        <TouchableHighlight
          onPress={() => {
            this.setState({ modalVisible: !this.state.modalVisible });
          }}>
          <MaterialIcons name="settings" style={styles.icon} size={40} />
        </TouchableHighlight>
        {/* <TouchableHighlight
          onPress={() => { this.resetIp(); }}>
          <MaterialIcons name="remove" style={styles.icon} size={40} />
        </TouchableHighlight> */}
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {}}
        >
          <View style={styles.container}>
            <View>
              <Text>Set ip adress</Text>
              <TextInput
                style={styles.input}
                value={this.state.ip}
                onChangeText={(ip) => this.setState({ ip })}
              />
              <View style={styles.buttonContainer}>
                <TouchableHighlight
                  onPress={() => {
                    this.handleUpdateIp();
                  }}>
                  <Text>Done</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={() => {
                    this.handleCancel();
                  }}>
                  <Text>Cancel</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
