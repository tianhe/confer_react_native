import React, { Component } from 'react'
import { StyleSheet, Text, TextInput, View, AsyncStorage } from 'react-native';
import { Actions } from 'react-native-router-flux'

import Button from '../components/button';

import styles from '../styles/common_styles.js';

import * as firebase from 'firebase'

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
      loaded: true
    }
  }

  render(){
    return (
      <View style={[styles.container, pageStyles.container]}>
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
            text="Login"
            onPress={this.login.bind(this)}
            buttonStyles={styles.primary_button}
            buttonTextStyles={styles.primary_button_text} />
          <Button
            text="New here?"
            onPress={this.goToSignup.bind(this)}
            buttonStyles={styles.transparent_button}
            buttonTextStyles={styles.transparent_button_text} />
        </View>
      </View>
    );
  }

  login(){
    this.setState({ loaded: false })

    firebase.auth().signInWithEmailAndPassword(this.state.email,
      this.state.password)
    .then( firebaseUser => {
      AsyncStorage.setItem('user_data', JSON.stringify(firebaseUser))
      console.log(firebaseUser)
      Actions.profile(email: firebaseUser.email, photo_url: firebaseUser.photo_url, name: firebaseUser.displayName)
    })
    .catch( error => {
      this.setState({ loaded: true });
      alert('Login Failed. Please try again');
    })
  }

  goToSignup(){
    Actions.signup()
  }
}

const pageStyles = StyleSheet.create({
})
