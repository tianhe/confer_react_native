import React, { Component } from 'react'
import { AppRegistry, StyleSheet, } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk'
import { Actions } from 'react-native-router-flux'

import * as firebase from 'firebase'

export default class FBLogin extends Component {
  render(){
    return (
      <LoginButton
        style={pageStyles.button}
        onLoginFinished={this.fbLoginFinished}
        onLogoutFinished={() => Actions.login()} />
    )
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
        firebase.auth().currentUser.link(credential).then( user => {
          console.log('successful link: ', user)
          firebase.auth().signInWithCredential(credential)
          Actions.eventsList()
        })
      })
      .catch(err => {
        console.log('facebook err: '+ err)
      })
    }
  }
}

const pageStyles = StyleSheet.create({
  button: {
    height: 50,
    width: 200,
  }
})


AppRegistry.registerComponent('FBLogin', () => FBLogin);
