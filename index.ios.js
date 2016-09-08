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
          start_time: '2016-09-03 11:00', end_time: '2016-09-03 12:00'},
        {id: 2, title: 'Gala', location: 'White House',
          start_time: '2016-09-03 18:00', end_time: '2016-09-03 12:00'},
        {id: 3, title: 'Orchid Hour', location: 'White House',
          start_time: '2016-09-03 16:00', end_time: '2016-09-03 12:00'},
      ],
      brothers: [
        {id: 1, name: 'Kevin Feng', location: 'New York', year: '2013'},
        {id: 2, name: 'Nick Sheng', location: 'New York', year: '2013'},
        {id: 3, name: 'Mike Lee', location: 'New York', year: '2013'}
      ]
    }
  }

  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key='tabbar'>
            <Scene key='main' tabs={true} tabBarStyle={styles.tabBarStyle} tabBarSelectedItemStyle={styles.tabBarSelectedItemStyle}>
              <Scene key='events_tab' initial title='Schedule' icon={TabIcon} titleStyle={styles.tabTitleStyle}>
                <Scene key='eventsList' initial title='Events List'
                  component={() => <EventList {...this.state}/>} />
                <Scene key='eventDetail' component={EventDetail} title="Event Detail"/>
              </Scene>
              <Scene key='brothers_tab' title='Brothers' icon={TabIcon} titleStyle={styles.tabTitleStyle}>
                <Scene key='contactsList' component={(props) => <ContactList {...this.state}/>} title="Brothers"/>
                <Scene key='contactDetail' component={ContactDetail} title="Contact Detail"/>
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
  tabTitleStyle: {
    backgroundColor: 'red'
  }

});

AppRegistry.registerComponent('ConferApp', () => ConferApp);
