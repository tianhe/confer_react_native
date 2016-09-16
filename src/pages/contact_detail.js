import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import styles from '../styles/common_styles.js';

export default class ContactDetail extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Text>{this.props.name}</Text>
        <Text>{this.props.year}</Text>
        <Text>{this.props.location}</Text>
      </View>
    )
  }
}

const pageStyles = StyleSheet.create({
});
