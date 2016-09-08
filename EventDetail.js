import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';

export default class EventDetail extends Component {
  render() {
    return(
      <View style={styles.container}>
        <View style={styles.intro}>
          <Text>{this.props.title}</Text>
          <Text>{this.props.start_time}</Text>
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
