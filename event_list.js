import React, { Component } from 'react';
import { StyleSheet, Text, ListView, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'

import styles from '../styles/common_styles';

export default class EventList extends Component {
  constructor(props) {
    super(props)
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid }
    );
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.events)
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
        />
      </View>
    )
  }

  renderRow(rowData, sectionID, rowID) {
    let start_time = Moment(rowData.start_time).format('h:mm A')

    return (
      <TouchableHighlight underlayColor='#DDD' onPress={() => this.onRowPress(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={pageStyles.time}>{start_time}</Text>
            <Text style={pageStyles.title}>{rowData.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  onRowPress(rowData) {
    Actions.eventDetail(rowData)
  }

  renderSeparator(sectionId, rowId){
    return (
      <View key={rowId} style={styles.separator}/>
    )
  }
}

const pageStyles = StyleSheet.create({
  time: {
    fontSize: 24,
    width: 125
  },
  title: {
    marginLeft: 5,
    fontSize: 16
  },
});
