import React, { Component } from 'react';
import { Text, View, StyleSheet, AsyncStorage, TouchableHighlight } from 'react-native';
import { LoginButton, AccessToken } from 'react-native-fbsdk';
import { Actions } from 'react-native-router-flux'

export default class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {name: this.props.name,
      year: this.props.year, location: this.props.location}
  }

  render() {
    return(
      <View style={styles.container}>
        <View>
          <LoginButton
          publishPermissions={["publish_actions"]}
          onLoginFinished={this.onLoginFinished.bind(this)}
          onLogoutFinished={this.onLogoutFinished.bind(this)}/>
        </View>
        <View style={styles.intro}>
          <TouchableHighlight onPress={this.onPressName.bind(this)}>
            <Text>{this.state.name}</Text>
          </TouchableHighlight>
          <Text>{this.state.year}</Text>
          <Text>{this.state.location}</Text>
        </View>
      </View>
    )
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

  onSuccessfulLogin(){
    AccessToken.getCurrentAccessToken().then(
      (data) => {
        AsyncStorage.setItem("fbAccessToken", data.accessToken.toString())
      }
    )

    AsyncStorage.getItem("fbAccessToken").then((value) => {
      console.log("Access Token Value: "+value)
    }).done();
  }

  onLogoutFinished() {
    alert("logout.")
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
  }
});
