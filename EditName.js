import React, { Component } from 'react';
import { TextInput, View, StyleSheet } from 'react-native';

export default class EditName extends Component {
  constructor(props) {
    super(props);
    this.state = {text: this.props.text}
  }

  render() {
    return(
      <View style={styles.container}>
        <View style={styles.intro}>
          <TextInput
            style={styles.textInput}
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

const styles = StyleSheet.create({
  container: {
    marginTop: 80
  },
  intro: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    height: 40
  },
  textInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1
  }
});
