import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

import styles from '../styles/common_styles';

export default class EditName extends Component {
  constructor(props) {
    super(props);
    this.state = {text: this.props.text}
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={pageStyles.intro}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => {this.onChangeText(text)}}
            value={this.state.text}
          />
        </View>
      </View>
    )
  }

  onChangeText(text) {
    this.setState({text: text})
    this.props.onChange(text)
  }
}

const pageStyles = StyleSheet.create({
  intro: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    height: 40
  },
});
