import React, { Component } from 'react'
import { AsyncStorage, Text, Picker, Image, Item, TextInput, View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux'

import Device from 'react-native-device'
import Button from '../components/button'
import FBLogin from '../components/fb_login'
import styles from '../styles/common_styles'

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
          <Image source={require('../images/logo.png')} style={styles.logo}/>

          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({email: text})}
            value={this.state.email}
            placeholder={"Email Address"}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({password: text})}
            value={this.state.password}
            secureTextEntry={true}
            placeholder={"Password"}
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => this.setState({name: text})}
            value={this.state.name}
            placeholder={"Full Name"}
          />
          <Button
            text="Signup"
            onPress={this.signup.bind(this)}
            buttonStyles={styles.primaryButton}
            buttonTextStyles={styles.primaryButtonText} />
          <View style={{margin: 20, width: Device.width, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
            <View style={{width: Device.width*0.3, height: 1, backgroundColor: 'gray'}}/>
            <Text>OR</Text>
            <View style={{width: Device.width*0.3, height: 1, backgroundColor: 'gray'}}/>
          </View>
          <View>
            <FBLogin/>
          </View>

        </View>

        <View style={pageStyles.goToSignInButton}>
          <Button
            text="Already have an Account? Sign In"
            onPress={this.goToLogin}
            buttonStyles={styles.transparentButton}
            buttonTextStyles={[styles.transparentButtonText, pageStyles.signInText]} />
        </View>
      </View>
    )
  }

  onValueChange(key, value){
    const newState = {}
    newState[key] = value
    this.setState(newState)
  }

  signup(){
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((firebaseUser) => {
      this.usersRef.child(firebaseUser.uid).push({location: 'New York', year: '2016'})

      this.usersRef.child(firebaseUser.uid).on('child_added', (childSnapshot, prevChildKey) => {
        console.log('child added')
        let user = childSnapshot.val()

        Actions.profile({location: user.location, year: user.year, name: firebaseUser.displayName})
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
}

const pageStyles = StyleSheet.create({
  goToSignInButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signInText:{
    fontSize: 15
  }
})
