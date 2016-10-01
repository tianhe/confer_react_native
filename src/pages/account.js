import React, { Component } from 'react'
import { StyleSheet, Text, View, Image, AsyncStorage } from 'react-native';

import Button from '../components/button';
import Header from '../components/header';

import styles from '../styles/common_styles';

// import Firebase from 'firebase';
// let app = new Firebase("YOUR-FIREBASE-APP-URL");

export default class Account extends Component {
  constructor(props){
    super(props)

    this.state = {
      loaded: false,
    }
  }

  componentWillMount(){

    AsyncStorage.getItem('user_data').then((user_data_json) => {
      let user_data = JSON.parse(user_data_json);
      this.setState({
        user: user_data,
        loaded: true
      });
    });

  }

  render(){
    return (
      <View style={styles.container}>
        <Header text="Account" loaded={this.state.loaded} />
        <View style={styles.body}>
        {
          this.state.user &&
            <View style={styles.body}>
              <View style={pageStyles.emailContainer}>
                <Text style={pageStyles.emailText}>{this.state.user.password.email}</Text>
              </View>
              <Image
                style={styles.image}
                source={{uri: this.state.user.password.profileImageURL}}
              />
              <Button
                text="Logout"
                onpress={this.logout.bind(this)}
                button_styles={styles.primaryButton}
                buttonText_styles={styles.primaryButtonText} />
            </View>
        }
        </View>
      </View>
    );
  }

  logout(){

    AsyncStorage.removeItem('user_data').then(() => {
      app.unauth()
      Actions.login()
    });

  }

}

const pageStyles = StyleSheet.create({
  emailContainer: {
    padding: 20
  },
  emailText: {
    fontSize: 18
  }
});
