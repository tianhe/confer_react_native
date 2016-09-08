import React, { Component } from 'react';
import { StyleSheet, Text, ListView, View, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux'


export default class ContactList extends Component {
  constructor(props) {
    super(props)
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid }
    );
    console.log(this.props)
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.brothers)
    }
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#DDDDDD' onPress={() => this.rowPressed(rowData)}>
        <View>
          <View style={styles.row}>
            <Text style={styles.name}>{rowData.name}</Text>
            <Text style={styles.year}>{rowData.year}</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(brotherData) {
    console.log(brotherData)
    Actions.contactDetail(brotherData)
  }

  render() {
    return(
      <View>
        <View style={styles.pageTitle}>
          <Text>Brothers Directory</Text>
        </View>

        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  pageTitle: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center'
  },
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    height: 40
  },
  name: {
    fontSize: 20,
    width: 125
  },
  year: {
    marginLeft: 5,
    fontSize: 16
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  }
});
