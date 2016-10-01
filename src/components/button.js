import React, { Component } from 'react'
import { AppRegistry, Text, View, TouchableHighlight } from 'react-native';

export default class Button extends Component {
  render(){
    return (
      <TouchableHighlight underlayColor={"#E8E8E8"} onPress={this.props.onPress} style={this.props.buttonStyles}>
        <Text style={this.props.buttonTextStyles}>{this.props.text}</Text>
      </TouchableHighlight>
    );
  }
}

AppRegistry.registerComponent('Button', () => Button);
