import React, { Component } from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

import Button from '../components/button'
import styles from '../styles/common_styles';

export default class EventDetail extends Component {
  render() {
    let organizers = this.props.organizers.map( (organizer) => {
      return (
        <View style={[pageStyles.contactContainer, styles.row]} key={organizer.id}>
          <Image source={{uri: organizer.photo_url}} style={styles.thumbnail}/>
          <Text style={pageStyles.contactName}>{organizer.name}</Text>
          <Text style={pageStyles.contactPhone}>{organizer.phone}</Text>
        </View>
      )
    });

    return(
      <View style={styles.container}>
        <Image source={{uri: 'https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F22580640%2F179281360805%2F1%2Foriginal.jpg?w=2000&rect=0%2C431%2C5184%2C2592&s=35868d9e908b8736c6724915c85d5c54'}} style={styles.hero}>
          <View style={styles.heroInfo}>
            <Text style={pageStyles.titleText}>{this.props.title}</Text>
            <Text style={pageStyles.titleText}>{this.props.start_time}</Text>
            <Text style={pageStyles.titleText}>{this.props.location}</Text>
          </View>
        </Image>
        <View>
          {organizers}
        </View>
        <Button
          text="Add Photo"
          onpress={this.logout.bind(this)}
          button_styles={styles.primaryButton}
          buttonText_styles={styles.primaryButtonText}/>
      </View>
    )
  }
}

const pageStyles = StyleSheet.create({
  titleText: {
    color: 'white'
  },
  contactContainer: {
    flex: 3,
    height: 30
  },
  contactName: {
    margin: 5,
    width: 100
  },
  contactPhone: {
    margin: 5
  }
});
