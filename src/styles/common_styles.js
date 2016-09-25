import React from 'react'
import { StyleSheet } from 'react-native';
import Device from 'react-native-device'

module.exports = StyleSheet.create({
  container: {
    paddingTop: 65,
    flex: 1,
  },
  body: {
    flex: 9,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  picker: {
    width: Device.width
  },
  textinput: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    padding: 15
  },
  transparent_button: {
    marginTop: 10,
    padding: 15
  },
  transparent_button_text: {
    color: '#0485A9',
    fontSize: 18
  },
  primary_button: {
    margin: 10,
    padding: 15,
    backgroundColor: '#529ecc'
  },
  primary_button_text: {
    color: '#FFF',
    fontSize: 18
  },
  image: {
    width: 100,
    height: 100
  },
  thumbnail: {
    height: 20,
    width: 20,
    borderRadius: 10,
    margin: 5
  },
  thumbnailLarge: {
    height: 40,
    width: 40,
    borderRadius: 20,
    padding: 5
  },
  hero: {
    height: 150,
    width:  Device.width
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5
  },
  separator: {
    height: 1,
    backgroundColor: '#DDDDDD'
  },
  monotypeFont: {
    fontFamily: 'Palatino'
  },
  heroInfo: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    margin: 10,
    backgroundColor: 'transparent',
  },
});
