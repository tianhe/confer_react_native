import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default class ContactDetail extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text>{this.props.name}</Text>
          <Text>{this.props.year}</Text>
          <Text>{this.props.location}</Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80
  },
  intro: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    height: 40
  }
});
