import React, { Component } from 'react'
import { Text, View, StyleSheet, AsyncStorage, TouchableHighlight } from 'react-native'

import { Actions } from 'react-native-router-flux'

import Button from '../components/button'
import styles from '../styles/common_styles'

import * as firebase from 'firebase'

export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      userSignedIn: false,
      name: this.props.name,
      year: this.props.year,
      location: this.props.location
    }
  }

  render() {
    if(this.state.userSignedIn){
      return(
        <View style={styles.container}>
          <View style={pageStyles.intro}>
            <TouchableHighlight onPress={this.onPressName.bind(this)}>
              <Text>{this.state.name}</Text>
            </TouchableHighlight>
            <Text>{this.state.year}</Text>
            <Text>{this.state.location}</Text>
          </View>
          <Button
            text="Logout"
            onPress={this.onPressLogout.bind(this)}
            buttonStyles={styles.primary_button}
            buttonTextStyles={styles.primary_button_text} />
        </View>
      )
    } else {
      return(
        <View style={styles.container}>
          <Button
            text="Signup"
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
  // <Picker
  //   style={styles.picker}
  //   selectedValue={this.state.location}
  //   onValueChange={this.onValueChange.bind(this, 'location')}
  //   mode="dropdown">
  //   <Item label="New York" value='ny'/>
  //   <Item label="DC" value='dc'/>
  // </Picker>

  onPressLogout() {
    firebase.auth.logout()

    this.setState({
      userSignedIn: false,
      name: '',
      year: '',
      location: ''
    })
  }

  onPressSignup() {
    Actions.signup({onSuccess: (data) => {
      this.setState({userSignedIn: true, name: data.name, year: data.year, location: data.location})
    }})
  }

  onPressLogin() {
    Actions.login({onSuccess: (data) => {
      this.setState({userSignedIn: true, name: data.name, year: data.year, location: data.location})
    }})
  }

  onPressName() {
    Actions.editName({text: this.state.name,
      onChange: (data) => {
        this.setState({name: data})
      }
    })
  }
}

const pageStyles = StyleSheet.create({
  intro: {
    flex: 1,
    flexDirection: 'column',
    margin: 10,
    height: 40
  }
});
