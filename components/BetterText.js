import React, { useState, useEffect } from 'react';
import {StyleSheet, Text} from "react-native";

const styles = StyleSheet.create({
  textStyle: {
    textAlignVertical: "center",
    textAlign: 'center',
    fontSize: 16,
    flex: 1,
    justifyContent: 'center',
  },
});

const BetterText = ({ text, textColor }) => (
  <Text style={[ styles.textStyle, {color: textColor} ]}>{text}</Text>  
);

export {BetterText}