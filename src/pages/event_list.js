import React, { Component } from 'react';
import { StyleSheet, Text, ListView, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'

import styles from '../styles/common_styles.js';

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

  renderSeparator(sectionID, rowID, adjacentRowHighlighted) {
      return (
        <View key={`${sectionID}-${rowID}`} style={styles.separator}/>
      )
  }

  renderRow(rowData, sectionID, rowID) {
    start_time = Moment(rowData.start_time).format('hh:mm A')

    return (
      <TouchableHighlight underlayColor='#DDD' onPress={() => this.onRowPress(rowData)}>
        <View>
          <View style={pageStyles.row}>
            <Text style={[pageStyles.time, styles.monotypeFont]}>{start_time}</Text>
            <Text style={pageStyles.titleText}>{rowData.title}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  onRowPress(rowData) {
    Actions.eventDetail(rowData)
  }
}

const pageStyles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10,
    height: 40
  },
  time: {
    fontSize: 24,
    width: 125
  },
  titleText: {
    marginLeft: 5,
    fontSize: 16
  }
});
