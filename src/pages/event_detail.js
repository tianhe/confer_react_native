import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';
import Device from 'react-native-device'
import Moment from 'moment'

import Icon from 'react-native-vector-icons/FontAwesome'
import Button from '../components/button'
import styles from '../styles/common_styles';

export default class EventDetail extends Component {
  render() {
    let organizers = this.props.organizers.map( (organizer) => {
      return (
        <View style={[pageStyles.contactContainer, styles.row]} key={organizer.id}>
          <Image source={{uri: organizer.photo_url}} style={styles.thumbnail}/>
          <Text style={pageStyles.contactName}>{organizer.name}</Text>
          <Icon.Button name="phone" backgroundColor="#3B5998" onPress={this.call} iconStyle={{marginRight: 0}} borderRadius={40} fontSize={40}/>
          <Icon.Button name="comment-o" backgroundColor="#3B5998" onPress={this.call} iconStyle={{marginRight: 0}} borderRadius={40} fontSize={40}/>
        </View>
      )
    });

    let start_time = Moment(this.props.start_time).format('h:mm A')

    return(
      <View style={styles.container}>
        <Image source={{uri: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F22580640%2F179281360805%2F1%2Foriginal.jpg?w=2000&rect=0%2C431%2C5184%2C2592&s=35868d9e908b8736c6724915c85d5c54'}} style={styles.hero}>
          <View style={pageStyles.intro}>
            <Text style={pageStyles.titleText}>{this.props.title}</Text>
            <Text style={pageStyles.titleText}>@{this.props.location}</Text>
            <Text style={pageStyles.titleText}>{start_time}</Text>
          </View>
        </Image>
        <View style={styles.primaryInfo}>
          {organizers}
        </View>
        <Button
          text="Add Photo"
          onPress={this.addPhoto.bind(this)}
          buttonStyles={styles.primaryButton}
          buttonTextStyles={styles.primaryButtonText} />
      </View>
    )
  }

  addPhoto(){
    
  }
}

const pageStyles = StyleSheet.create({
  intro: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 10,
    backgroundColor: 'transparent',
  },
  titleText: {
    color: 'white'
  },
  contactContainer: {
    flex: 3,
    height: 40
  },
  contactName: {
    marginLeft: 5,
    width: 100
  },
  contactPhone: {
    marginLeft: 5
  },
});
