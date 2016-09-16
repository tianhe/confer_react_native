import React, { Component } from 'react'
import { Text, TextInput, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'

import Button from '../components/button';

import styles from '../styles/common_styles.js';

import * as firebase from 'firebase'

export default class Signup extends Component {
  constructor(props){
    super(props)

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.body}>
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <Button
            text="Signup"
            onPress={this.signup.bind(this)}
            buttonStyles={styles.primary_button}
            buttonTextStyles={styles.primary_button_text} />
          <Button
            text="Facebook"
            onPress={this.fbSignup.bind(this)}
            buttonStyles={styles.primary_button}
            buttonTextStyles={styles.primary_button_text} />
          <Button
            text="Got an Account?"
            onPress={this.goToLogin.bind(this)}
            buttonStyles={styles.transparent_button}
            buttonTextStyles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }

  fbSignup(){
    var provider = new firebase.auth.FacebookAuthProvider()
    firebase.auth().signInWithPopup(provider).then(function(result) {
      var token = result.credential.accessToken;
      var user = result.user;
      AsyncStorage.setItem({fbAccessToken: token, user: user})
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;
      alert(error.message)
    });
  }

  signup(){
    this.setState({ loaded: false })

    firebase.auth().createUserWithEmailAndPassword(this.state.email,
      this.state.password).then( firebaseUser => {
        AsyncStorage.setItem('user_data', JSON.stringify(firebaseUser))
      }).catch( error => {
        switch(error.code){
          case "EMAIL_TAKEN":
            alert("The new user account cannot be created because the email is already in use.");
          break;
          case "INVALID_EMAIL":
            alert("The specified email is not a valid email.");
          break;
          default:
            alert(error.message);
        }
      })

    this.setState({
      email: '',
      password: '',
      loaded: true
    })
  }

  goToLogin(){
    Actions.login()
  }
}

const pageStyles = StyleSheet.create({
})
