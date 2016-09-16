import React, { Component } from 'react';
import { StyleSheet, Text, ListView, View, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'
import styles from '../styles/common_styles.js';

export default class ContactList extends Component {
  constructor(props) {
    super(props)
    var dataSource = new ListView.DataSource(
      {rowHasChanged: (r1, r2) => r1.guid !== r2.guid }
    );
    this.state = {
      dataSource: dataSource.cloneWithRows(this.props.brothers)
    }
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#DDDDDD' onPress={() => this.rowPressed(rowData)}>
        <View>
          <View style={pageStyles.row}>
            <Image source={{uri: rowData.photo_url}} style={styles.thumbnailLarge} />
            <Text style={pageStyles.name}>{rowData.name}</Text>
            <Text style={pageStyles.year}>{rowData.year}</Text>
          </View>
          <View style={styles.separator}/>
        </View>
      </TouchableHighlight>
    );
  }

  rowPressed(brotherData) {
    Actions.contactDetail(brotherData)
  }

  render() {
    return(
      <View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
        />
      </View>
    )
  }
}

const pageStyles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    margin: 10,
    height: 40,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  name: {
    fontSize: 20,
    width: 125
  },
  year: {
    marginLeft: 5,
    fontSize: 16
  },
});