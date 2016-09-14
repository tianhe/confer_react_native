/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Scene, Router, TabBar } from 'react-native-router-flux'
import { AppRegistry, StyleSheet, Text, View } from 'react-native';

import EventList from './EventList'
import EventDetail from './EventDetail'
import ContactList from './ContactList'
import ContactDetail from './ContactDetail'
import Profile from './Profile'
import EditName from './EditName'

class TabIcon extends React.Component {
  render(){
    return (
        <Text style={{color: this.props.selected ? 'red' :'black'}}>{this.props.title}</Text>
    );
  }
}

class ConferApp extends Component {
  constructor(props){
    super(props)
    this.state = {
      page: 'events',
      events: [
        {id: 1, title: 'Basketball Tournament', location: 'Bro Walter\'s House',
          start_time: '2016-09-03 11:00', end_time: '2016-09-03 12:00', attendees:
           [{id: 1, name: 'Tian He'},
            {id: 3, name: 'Nick Sheng'}
           ],
          organizers: [{ id: 3, name: 'Mike Lee', phone: '555-555-5555'},
            { id: 1, name: 'Nick Sheng', phone: '555-555-5555', photo_url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/11949268_10104278964033579_7069632376703940401_n.jpg?oh=6d078dd8ecd7c7977d243d3f45eed366&oe=58868C7B'}]
        },
        {id: 2, title: 'Gala', location: 'White House',
          start_time: '2016-09-03 18:00', end_time: '2016-09-03 12:00', attendees:
           [{id: 1, name: 'Tian He'},
            {id: 3, name: 'Nick Sheng'}
           ],
          organizers: [{
            id: 3, name: 'Nick Sheng', phone: '555-555-5555'
          }]
        },
        {id: 3, title: 'Orchid Hour', location: 'White House',
          start_time: '2016-09-03 16:00', end_time: '2016-09-03 12:00', attendees:
           [{id: 1, name: 'Tian He'},
            {id: 3, name: 'Nick Sheng'}
           ],
          organizers: [{
            id: 3, name: 'Nick Sheng', phone: '555-555-5555'
          }]  
        },
      ],
      brothers: [
        {id: 1, name: 'Tian He', location: 'New York', year: '2010', photo_url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/12654661_10100776171213468_4269539037897313305_n.jpg?oh=98de39999181992a3f9cfe7bcfd2e59a&oe=5837FEB7'},
        {id: 2, name: 'Kevin Feng', location: 'New York', year: '2014', photo_url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/13043334_10102352045004757_3937804364435165693_n.jpg?oh=366ec0573b6b7cd0cd035ec576e03375&oe=587DA770'},
        {id: 3, name: 'Nick Sheng', location: 'New York', year: '2014', bio: 'NY Lodge Chairman', photo_url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/11949268_10104278964033579_7069632376703940401_n.jpg?oh=6d078dd8ecd7c7977d243d3f45eed366&oe=58868C7B'},
        {id: 4, name: 'Mike Lee', location: 'New York', year: '2013', photo_url: 'https://scontent-lga3-1.xx.fbcdn.net/v/t1.0-9/13267968_10154852317430968_4247610002803390222_n.jpg?oh=d868fda970eea5a98be7623fbd62a095&oe=583FF8D3'}
      ]
    }
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key='tabbar'>
            <Scene key='main' tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
              <Scene key='events_tab' initial title='Events' icon={TabIcon} titleStyle={styles.tabTitleStyle}>
                <Scene key='eventsList' initial title='Events'
                  component={() => <EventList {...this.state}/>} />
                <Scene key='eventDetail' component={EventDetail} title="Event Detail"/>
              </Scene>
              <Scene key='brothers_tab' title='Brothers' icon={TabIcon} titleStyle={styles.tabTitleStyle}>
                <Scene key='contactsList' component={(props) => <ContactList {...this.state}/>} title="Brothers"/>
                <Scene key='contactDetail' component={ContactDetail} title="Contact Detail"/>
              </Scene>
              <Scene key='profile_tab' title='Profile' icon={TabIcon} titleStyle={styles.tabTitleStyle}>
                <Scene key='profile' component={(props) => <Profile {...this.state.brothers[0]}/>} title="Profile"/>
                <Scene key='editName' component={EditName} title="Edit"/>
              </Scene>
            </Scene>
          </Scene>
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#eee',
  },
  tabBarSelectedItemStyle: {
    backgroundColor: '#ddd'
  },
  // tabTitleStyle: {
  //   backgroundColor: 'blue'
  // }

});

AppRegistry.registerComponent('ConferApp', () => ConferApp);
