// @flow

import * as React from 'react';
import {
  View,
  Button,
  Modal,
  Text,
  StyleSheet,
} from 'react-native';

type Props = {
  callHandleNewLock: any,
}

type State = {
  modalOpen: bool,
}

const styles = StyleSheet.create({
  modal: {
    margin: 22,
  },
  buttonsContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
  },
});

export default class AddNewLock extends React.Component<Props, State> {
  state = {
    modalOpen: false,
  }

  render() {
    return (
      <View>
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalOpen}
          onRequestClose={() => {}}
        >
          <View style={styles.modal}>
            <Text>Add a new lock</Text>
            <View style={styles.buttonsContainer}>
              <Button
                style={styles.button}
                title='Ok'
                onPress={ () => {
                  this.props.callHandleNewLock('13.37.0.1');
                  this.setState({ modalOpen: false });
                }}
              />
              <Button
                style={styles.button}
                title='Cancel'
                onPress={ () => { this.setState({ modalOpen: false }); }}
              />
            </View>
          </View>
        </Modal>
        <Button
          title='Add a lock'
          onPress={() => { this.setState({ modalOpen: true }); }}
        />
      </View>
    );
  }
}
