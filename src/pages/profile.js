import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage, TouchableHighlight } from 'react-native'

import { Actions } from 'react-native-router-flux'
import { LoginButton, AccessToken } from 'react-native-fbsdk'

import Button from '../components/button'
import styles from '../styles/common_styles'

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      year: this.props.year,
      location: this.props.location
    }
  }

  render() {
    if(this.state.user != null){
      return(
        <View style={styles.container}>
          <View style={pageStyles.intro}>
            <TouchableHighlight onPress={this.onPressName.bind(this)}>
              <Text>{this.state.name}</Text>
            </TouchableHighlight>
            <Text>{this.state.year}</Text>
            <Text>{this.state.location}</Text>
          </View>
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <Button
            text="Signup with Email"
            onPress={this.onPressSignup.bind(this)}
            buttonStyles={styles.primary_button}
            buttonTextStyles={styles.primary_button_text} />
          <Button
            text="Login"
            onPress={this.onPressLogin.bind(this)}
            buttonStyles={styles.primary_button}
            buttonTextStyles={styles.primary_button_text} />
        </View>
      )
    }

  }

  onPressSignup() {
    Actions.signup()
  }

  onPressLogin() {
    Actions.login()
  }

  onPressName() {
    Actions.editName({text: this.props.name, onChange: (data) => this.onChange(data)})
  }

  onChange(data){
    this.setState({name: data})
  }

  onLoginFinished(error, result) {
    if (error) {
      alert("login has error: " + result.error);
    } else if (result.isCancelled) {
      alert("login is cancelled.");
    } else {
      onSuccessfulLogin();
    }
  }

  // onSuccessfulLogin(){
  //   AccessToken.getCurrentAccessToken().then(
  //     (data) => {
  //       AsyncStorage.setItem("fbAccessToken", data.accessToken.toString())
  //     }
  //   )
  //
  //   AsyncStorage.getItem("fbAccessToken").then((value) => {
  //     console.log("Access Token Value: "+value)
  //   }).done();
  // }

  // onLogoutFinished() {
  //   alert("logout.")
  // }

}

const pageStyles = StyleSheet.create({
  intro: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    height: 40
  }
});
