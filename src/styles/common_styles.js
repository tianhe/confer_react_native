import React from 'react'
import { StyleSheet } from 'react-native'
import Device from 'react-native-device'

module.exports = StyleSheet.create({
  container: {
    paddingTop: 65,
    flex: 1,
  },
  logo: {
    width: 175,
    height: 175
  },
  body: {
    flex: 9,
    alignItems: 'center',
  },
  picker: {
    width: Device.width
  },
  textInput: {
    height: 40,
    borderRadius: 3,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 40,
    marginRight: 40,
    padding: 10,
    backgroundColor: 'lightgray',
  },
  transparentButton: {
    marginTop: 10,
    padding: 10,
  },
  transparentButtonText: {
    color: '#0485A9',
    fontSize: 18
  },
  primaryButton: {
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 40,
    marginRight: 40,
    padding: 15,
    backgroundColor: '#529ecc',
    flexDirection: 'row',
    borderRadius: 3,
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
  primaryButtonText: {
    color: '#FFF',
    fontSize: 18,
  },
  image: {
    width: 100,
    height: 100
  },
  thumbnail: {
    height: 40,
    width: 40,
    borderRadius: 20,
    margin: 5
  },
  thumbnailLarge: {
    height: 60,
    width: 60,
    borderRadius: 30,
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
