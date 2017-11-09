// @flow

import * as React from 'react';
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native';

import AddNewLock from '../components/AddNewLock';
import LockListRow from './LockListRow';

type State = {
  locks: Array<Object>,
  dataSource: Array<Object>,
}

type Props = {}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
  listView: {
  },
});

const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

export default class LockList extends React.Component<Props, State> {
  state = {
    locks: [],
    dataSource: ds.cloneWithRows(['1', '2']),
  }

  // componentDidMount = () => {
  //   this.setState({ dataSource: ds.cloneWithRows(this.state.locks) });
  // }

  handleNewLock = (lockObj: {}) => {
    const newLockList: Array<Object> = [...this.state.locks, lockObj];
    this.setState({
      locks: newLockList,
      dataSource: ds.cloneWithRows(newLockList),
    });
    console.log(this.state.locks);
  }

  render() {
    return (
      <View style={styles.container}>
        <AddNewLock callHandleNewLock={(lockObj) => { this.handleNewLock(lockObj); }} />
        <ListView
          style={styles.listView}
          enableEmptySections
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <LockListRow ip={rowData.ip} />}
        />
      </View>
    );
  }
}
