import React, { Component } from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'

import Icon from 'react-native-vector-icons/FontAwesome'
import styles from '../styles/common_styles'

const myIcon = (<Icon name="rocket" size={30} color="#900" />)

export default class ContactDetail extends Component {
  render() {
    return(
      <View style={[styles.container, pageStyles.container]}>
        <Image source={{uri: this.props.photo_url}} style={pageStyles.profilePhoto}/>
        <Text style={pageStyles.title}>{this.props.name}</Text>
        <View style={pageStyles.supplementalInfo}>
          <Text style={pageStyles.subtitle}>{this.props.location} Lodge</Text>
          <Text style={pageStyles.subtitle}>Initiated in {this.props.year}</Text>
        </View>
        <View style={pageStyles.contactContainer}>
          <Icon.Button name="phone" backgroundColor="#3B5998" onPress={this.call} iconStyle={{marginRight: 0}} borderRadius={40} fontSize={40}/>
          <Icon.Button name="envelope-o" backgroundColor="#3B5998" onPress={this.call} iconStyle={{marginRight: 0}} borderRadius={40} fontSize={40}/>
          <Icon.Button name="snapchat" backgroundColor="#3B5998" onPress={this.call} iconStyle={{marginRight: 0}} borderRadius={40} fontSize={40}/>
          <Icon.Button name="weixin" backgroundColor="#3B5998" onPress={this.call} iconStyle={{marginRight: 0}} borderRadius={40} fontSize={40}/>
          <Icon.Button name="whatsapp" backgroundColor="#3B5998" onPress={this.call} iconStyle={{marginRight: 0}} borderRadius={40} fontSize={40}/>
          <Icon.Button name="facebook-square" backgroundColor="#3B5998" onPress={this.call} iconStyle={{marginRight: 0}} borderRadius={40} fontSize={40}/>
          <Icon.Button name="linkedin-square" backgroundColor="#3B5998" onPress={this.call} iconStyle={{marginRight: 0}} borderRadius={40} fontSize={40}/>
        </View>
      </View>
    )
  }
}

const pageStyles = StyleSheet.create({
  title: {
    fontSize: 22
  },
  subtitle: {
    fontSize: 14,
    color: '#4285F4'
  },
  contactContainer: {
    flex: 1,
    flexDirection: 'row',
    margin: 20,
    justifyContent: 'space-between',
    flexWrap: 'wrap'
  },
  container: {
    alignItems: 'center',
  },
  supplementalInfo: {
    margin: 20,
  },
  profilePhoto: {
    height: 150,
    width: 150,
    borderRadius: 50,
    margin: 20,
  }
});
