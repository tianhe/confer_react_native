import React, { Component } from 'react';
import { StyleSheet, Text, ListView, View, TouchableHighlight, Image } from 'react-native';
import { Actions } from 'react-native-router-flux'
import SectionHeader from '../components/section_header.js'

import styles from '../styles/common_styles.js'

export default class ContactList extends Component {
  constructor(props) {
    super(props)
    const getSectionData = (dataBlob, sectionId) => dataBlob[sectionId];
    const getRowData = (dataBlob, sectionId, rowId) => dataBlob[`${rowId}`]
    const dataSource = new ListView.DataSource(
      {
        rowHasChanged: (r1, r2) => r1.guid !== r2.guid,
        sectionHeaderHasChanged : (s1, s2) => s1 !== s2,
        getSectionData,
        getRowData
      }
    )

    const { dataBlob, sectionIds, rowIds } = this.formatData(this.props.contacts)

    this.state = {
      dataSource: dataSource.cloneWithRowsAndSections(dataBlob, sectionIds, rowIds)
    }
  }

  render() {
    return(
      <View style={styles.container}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow.bind(this)}
          renderSeparator={this.renderSeparator.bind(this)}
          renderSectionHeader={this.renderSectionHeader.bind(this)}
        />
      </View>
    )
  }

  renderRow(rowData, sectionID, rowID) {
    return (
      <TouchableHighlight underlayColor='#DDDDDD' onPress={() => this.rowPressed(rowData)}>
        <View>
          <View style={styles.row}>
            <View style={styles.imageContainer}>
              <Image source={{uri: rowData.photo_url}} style={styles.thumbnailLarge} />
            </View>
            <Text style={pageStyles.name}>{rowData.name}</Text>
          </View>
        </View>
      </TouchableHighlight>
    );
  }

  renderSeparator(sectionId, rowId){
    return (
      <View key={rowId} style={styles.separator}/>
    )
  }

  renderSectionHeader(sectionData){
    return (
      <SectionHeader {...sectionData}/>
    )
  }

  rowPressed(brotherData) {
    Actions.contactDetail(brotherData)
  }

  formatData(data) {
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    const dataBlob = {};
    const sectionIds = [];
    const rowIds = [];

    for (let sectionId = 0; sectionId < alphabet.length; sectionId++) {
      const currentChar = alphabet[sectionId];
      const users = data.filter((contact) => contact.name.toUpperCase().indexOf(currentChar) === 0);
      if (users.length == 0) {
        continue
      }

      sectionIds.push(sectionId);
      dataBlob[sectionId] = { character: currentChar };
      rowIds.push([]);

      for (let i = 0; i < users.length; i++) {
        const rowId = `${sectionId}:${i}`;
        rowIds[rowIds.length - 1].push(rowId);
        dataBlob[rowId] = users[i];
      }
    }

    return { dataBlob, sectionIds, rowIds };
  }
}

const pageStyles = StyleSheet.create({
  name: {
    fontSize: 20,
    width: 125,
    marginLeft: 5
  },
  year: {
    marginLeft: 5,
    fontSize: 16
  },
});
