import React, { Component } from 'react';
import { StyleSheet, Text, ListView, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux'
import Moment from 'moment'


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

  renderRow(rowData, sectionID, rowID) {
    start_time = Moment(rowData.start_time).format('hh:mm a')

    return (
      <TouchableHighlight underlayColor='#DDD' onPress={() => this.rowPressed(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.time}>{start_time}</Text>
            <Text style={styles.title}>{rowData.title}</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(rowData) {
    Actions.eventDetail(rowData)
  }

  render() {
    return(
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginTop: 80
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    height: 40
  },
  time: {
    fontSize: 24,
    width: 125
  },
  title: {
    marginLeft: 5,
    fontSize: 16
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  }
});
