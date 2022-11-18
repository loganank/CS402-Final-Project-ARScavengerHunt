import React, { useState, useEffect } from 'react';
import {StyleSheet, View, Text} from "react-native";

import BouncyCheckbox from "react-native-bouncy-checkbox";

import {Button} from '../components/Button';
import {BetterText} from '../components/BetterText';

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
    checkboxes: {
        flexDirection: 'column',
      },
    checkbox: {
        flexDirection: 'row',
      },
  });

  let plist = [];

function SelectScreen({route, navigation}) {

    const {list} = route.params;
    const [checkboxOne, setCheckboxOne] = useState(false);

    var buttonContainer = (
        <View style={styles.container}>
            <BetterText text="You are going to be going on a Scavenger Hunt on the BSU Campus." textColor={'black'}/>
            <BetterText text="You have to find of the landmarks and take a picture of them to complete the hunt." textColor={'black'}/>
            <View style={styles.checkboxes}>
                <View style={styles.checkbox}>
                    <BouncyCheckbox
                        fillColor="green"
                        size={25}
                        onPress={() => {setCheckboxOne(!checkboxOne)}}
                />
                <BetterText text="Landmark 1." textColor={'black'}/>
            </View>
            
            </View>
            
            <View style={styles.buttons}>
                <Button text={"Camera"} 
                onPress={() => navigation.navigate('Camera', {
                    list: list
                })} 
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