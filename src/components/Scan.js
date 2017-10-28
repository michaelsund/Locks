// @flow

import * as React from 'react';
import {
  View,
  StyleSheet,
  // Text,
} from 'react-native';

type State = {
  scanning: bool,
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
});

export default class Scan extends React.Component<{}, State> {
  state = {
    scanning: true,
  }

  // checkForDiscoverUrl = (url) => {
  //   console.log(`scanning ${url}`);
  //   fetch(url)
  //     .then(response => response.json())
  //     .then((responseJson) => {
  //       console.log(`response from ${url} : ${JSON.stringify(responseJson)}`);
  //     })
  //     .catch((error) => {
  //       console.log(`error from ${url} : ${JSON.stringify(error)}`);
  //     });
  // }

  // scanForDevices = () => {
  //   this.setState({ scanning: true });
  //   const ip = '192.168.1.30';
  //   // const netmask = '255.255.255.0';
  //
  //   let ipArr = ip.split('.');
  //   // let maskArr = netmask.split(',');
  //   ipArr = `${ipArr[0]}.${ipArr[1]}.${ipArr[2]}`;
  //   // maskArr = maskArr[0] + maskArr[1] + maskArr[2];
  //
  //   for (let i = 1; i < 254; i += 1) {
  //     const url = `${ipArr}.${i}`;
  //     console.log(`scanning ${url}`);
  //     isPortReachable(80, { host: url })
  //       .then((reachable) => {
  //         console.log(reachable);
  //       });
  //     // this.checkForDiscoverUrl(`http://${ipArr}.${i}/discover`);
  //   }
  //   this.setState({ scanning: false });
  // }

  render() {
    return (
      <View style={ styles.container }>
      </View>
    );
  }
}
