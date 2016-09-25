import React, { Component } from 'react'
import { AsyncStorage, Text, Picker, Item, TextInput, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'
import { LoginButton, AccessToken } from 'react-native-fbsdk'

import Button from '../components/button';
import styles from '../styles/common_styles.js';

import * as firebase from 'firebase'

export default class Signup extends Component {
  constructor(props){
    super(props)
    this.usersRef = firebase.database().ref().child('users');

    this.state = {
      email: '',
      password: '',
      name: '',
      location: 'New York',
      year: '',
    }
  }

  render() {
    return (
      <View style={[styles.container]}>
        <View style={styles.body}>
          <LoginButton
            onLoginFinished={this.fbLoginFinished}
            onLogoutFinished={() => alert("logout.")} />

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
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}
            placeholder={"Name"}
          />
          <TextInput
            style={styles.textinput}
            onChangeText={(text) => this.setState({year: text})}
            value={this.state.year}
            placeholder={"Initiation Year"}
            keyboardType='numeric'
          />
          <Button text={this.state.location}
            onPress={this.setLocation.bind(this)}
            buttonStyles={styles.transparent_button}
            buttonTextStyles={styles.transparent_button_text} />
          <Button
            text="Signup"
            onPress={this.signup.bind(this)}
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

  onValueChange(key, value){
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }

  fbLoginFinished(error, result){
    if (error) {
      console.log("login has error: " + error);
    } else if (result.isCancelled) {
      console.log("login is cancelled.");
    } else {
      console.log("Facebook login successful, firebase is next")
      AccessToken.getCurrentAccessToken()
      .then(accessTokenData => {
        let accessToken = accessTokenData.accessToken
        const credential = firebase.auth.FacebookAuthProvider.credential(accessToken)

        firebase.auth.currentUser.link(credential).then( user => {
          console.log('successful link: ', user)
          firebase.auth().signInWithCredential(credential)
        })
      })
      .catch(err => {
        console.log('facebook err: '+ err)
      })
    }
  }

  signup(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((firebaseUser) => {
      this.usersRef.child(firebaseUser.uid).push({location: 'New York', year: '2016'})

      this.usersRef.child(firebaseUser.uid).on('child_added', (childSnapshot, prevChildKey) => {
        console.log('child added')
        let user = childSnapshot.val()

        this.props.onSuccess({location: user.location, year: user.year, name: firebaseUser.displayName})
      })

    })
    .catch((error) => {
      switch(error.code){
        case "EMAIL_TAKEN":
          alert("Email is already in use.");
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
      password: ''
    })
  }

  goToLogin(){
    Actions.login()
  }

  setLocation(){
    Actions.setLocation({onChange: (data) => this.setState({location: data})})
  }
}

const pageStyles = StyleSheet.create({
})
