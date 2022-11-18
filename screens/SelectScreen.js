import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text} from "react-native";
import {Button} from '../components/Button';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        padding: 8,
      },

    buttons: {
      marginTop: 20,
      flexDirection: 'row',
    },
  });

  let plist = [];

function SelectScreen({route, navigation}) {

    const {list} = route.params;

    console.log("list from select screen: " + list);

    var buttonContainer = (
        <View style={styles.buttons}>
            <Button text={"Camera"} 
            onPress={() => navigation.navigate('Camera')} 
            backgroundColor={'lightblue'}
            textColor={'white'}
            />
            <Button text={"View Photos"} 
            onPress={() => navigation.navigate('Photo', {
                list: list
            })} 
            backgroundColor={'lightblue'}
            textColor={'white'}
            />
        </View>
    );

    var ui = (
        <View style={styles.container}>
          {buttonContainer}
        </View>
      );

    return (ui);
  }

export default SelectScreen;