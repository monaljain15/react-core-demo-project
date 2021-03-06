import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

const buttonWithBackground = props => {
  return <TouchableOpacity onPress={props.onPress}>
    <View
      style={[
        styles.button,
        {backgroundColor: props.color},
        props.disabled ? styles.disabled : null,
      ]}>
      <Text style={props.disabled ? styles.disabledText : styles.validText}>
        {props.children}
      </Text>
    </View>
  </TouchableOpacity>;
};

const styles = StyleSheet.create({
  button: {
    padding: 10,
    margin: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
  },
  disabled: {
    backgroundColor: '#eee',
    borderColor: '#aaa',
  },
  disabledText: {
    color: '#aaa',
  },
  validText: {
    color: '#fa923f',
    fontWeight: 'bold',
  },
});

export default buttonWithBackground;
