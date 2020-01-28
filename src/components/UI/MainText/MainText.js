import React from 'react';
import {Text, StyleSheet} from 'react-native';

// eslint-disable-next-line prettier/prettier
const mainText = props => (
    <Text style={styles.mainText}>{props.children}</Text>
);

const styles = StyleSheet.create({
  mainText: {
    color: 'black',
    backgroundColor: 'transparent',
    padding: 15,
  },
});

export default mainText;
