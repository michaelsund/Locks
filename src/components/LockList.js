// @flow

import * as React from 'react';
import {
  View,
  ListView,
  StyleSheet,
} from 'react-native';

import LockListRow from './LockListRow';

type Props = {
  listItems: []
}

type State = {
  dataSource: [],
}

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
  static defaultProps = {
    listItems: [],
  }

  state = {
    dataSource: ds.cloneWithRows([]),
  }

  componentDidMount = () => {
    this.setState({ dataSource: ds.cloneWithRows(this.props.listItems) });
  }

  componentWillReceiveProps = (nextProps) => {
    this.setState({ dataSource: ds.cloneWithRows(nextProps.listItems) });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* Add new lock component here */}
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
