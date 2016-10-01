import React, { Component } from 'react'
import { StyleSheet, Image, Text, TextInput, View, AsyncStorage } from 'react-native'
import { Actions } from 'react-native-router-flux'

import Device from 'react-native-device'
import Button from '../components/button'
import FBLogin from '../components/fb_login'
import styles from '../styles/common_styles'

import * as firebase from 'firebase'

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: '',
      password: '',
    }
  }

  render(){
    return (
      <View style={[styles.container, pageStyles.container]}>
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
          <Button
            text="Login"
            onPress={this.login.bind(this)}
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
      </View>
    )
  }

  login(){
    firebase.auth().signInWithEmailAndPassword(this.state.email,
      this.state.password)
    .then( firebaseUser => {
      AsyncStorage.setItem('user_data', JSON.stringify(firebaseUser))
      Actions.eventsList()
      Actions.profile(email: firebaseUser.email, photo_url: firebaseUser.photo_url, name: firebaseUser.displayName)
    })
    .catch( error => {
      alert('Login Failed. Please try again')
      console.log(error)
    })
  }

}

const pageStyles = StyleSheet.create({
})
