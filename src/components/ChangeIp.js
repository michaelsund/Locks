// @flow

import * as React from 'react';
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableHighlight,
  TextInput,
  Button,
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
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
    color: '#000000',
    padding: 20,
  },
  input: {
    height: 60,
    marginBottom: 40,
  },
});

export default class ChangeIp extends React.Component<Props, State> {
  state = {
    ip: this.props.ip,
    modalVisible: false,
  }

  handleUpdateIp = () => {
    this.props.updateIpToParent(this.state.ip);
    this.setState({ modalVisible: !this.state.modalVisible });
  }

  handleCancel = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
      ip: this.props.ip,
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
              <Button
                title="set ip"
                onPress={() => {
                  this.handleUpdateIp();
                }}>
              </Button>
              <Button
                title="Cancel"
                onPress={() => {
                  this.handleCancel();
                }}>
              </Button>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}
