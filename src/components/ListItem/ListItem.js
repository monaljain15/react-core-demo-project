/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image, Dimensions} from 'react-native';
import backgroundImage from '../../../assets/img59.jpeg';


const listItem = props => (
  <TouchableOpacity onPress={props.onItemPressed}>
    <View style={styles.listItem}>
      <Image source={props.postImage ? {uri: props.postImage} : backgroundImage} style={styles.postImage} />
      <View style={styles.subContainer}>
        <Text style={[styles.postData, styles.postName]}>{props.postName}</Text>
        <Text style={[styles.postData, styles.postPreparationTime]}>Preparation Time: {props.postPreparationTime}</Text>
        <Text style={[styles.postData, styles.postServes]}>Serves: {props.postServes}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  listItem: {
    paddingBottom: 15,
    margin: 5,
    backgroundColor: '#521751',
    borderRadius: 25,
    width: Dimensions.get('window').width - 10,
  },
  postImage: {
    height: 180,
    width: '100%',
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  postData: {
    color: '#3feaea',
    fontSize: 14,
    fontWeight: 'bold',
  },
  postName: {
    padding: 10,
    marginTop: 4,
    marginLeft: 5,
  },
  postPreparationTime: {
    paddingLeft: 10,
    marginLeft: 5,
  },
  postServes: {
    paddingTop: 10,
    paddingLeft: 10,
    marginLeft: 5,
  },
  subContainer: {
    flexDirection: 'column',
  },
});

export default listItem;
