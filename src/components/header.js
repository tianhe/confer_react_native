import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native';

import GiftedSpinner from 'react-native-gifted-spinner';

export default class Header extends Component {
  render(){
    return (
      <View style={styles.header}>
        <View style={styles.headerItem}>
          <Text style={styles.headerText}>{this.props.text}</Text>
        </View>
        <View style={styles.headerItem}>
        {  !this.props.loaded &&
            <GiftedSpinner />
        }
        </View>
      </View>
    );
  }


}

const styles = StyleSheet.create({
  header: {
    padding: 10,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 1
  },
  headerItem: {
    paddingLeft: 10,
    paddingRight: 10
  },
  headerText: {
    color: '#000',
    fontSize: 18
  }
});

AppRegistry.registerComponent('Header', () => Header);
