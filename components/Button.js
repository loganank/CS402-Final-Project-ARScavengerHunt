import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

const styles = StyleSheet.create({
  textStyle: {
    textAlign: 'center',
    fontSize: 16,
  },
  buttonStyle: {
    flex: 1,
    padding: 5,
    marginHorizontal: 5,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: 'lightgrey',
  },
});

const Button = ({ text, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[{backgroundColor: backgroundColor}, styles.buttonStyle]}>
    <Text style={[ styles.textStyle, {color: textColor} ]}>{text}</Text>
  </TouchableOpacity>
);

export {Button}