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
        flex: 1,
        flexDirection: 'column',
      },
    checkbox: {
        flex: 1,
        flexDirection: 'row',
      },
  });

function SelectScreen({route, navigation}) {

    const {list, completedLocations} = route.params;

    let [checkboxStates, setCheckboxStates] = React.useState([false, false, false]);

    useEffect(() => { // called every redraw
      if (checkboxStates != completedLocations) {
        setCheckboxStates(completedLocations);
      }
  }, [completedLocations]);

    const Checkbox = ({checkboxState, text}) => (
      <View style={styles.checkbox}>
        <BouncyCheckbox
          isChecked={checkboxState}
          fillColor="green"
          size={25}
          disabled={true}
        />
        <BetterText text={text} textColor={'black'}/>
      </View>
    )

    var buttonContainer = (
        <View style={styles.container}>
            <BetterText text="You are going to be going on a Scavenger Hunt on the BSU Campus." textColor={'black'}/>
            <BetterText text="You have to find of the landmarks and take a picture of them to complete the hunt." textColor={'black'}/>
            <View style={styles.checkboxes}>
                <Checkbox 
                  checkboxState={checkboxStates[0]}
                  text="Boise State's signature blue field"
                />
                <Checkbox 
                  checkboxState={checkboxStates[1]}
                  text="The entrance to the quietest place on campus"
                />
                <Checkbox 
                  checkboxState={checkboxStates[2]}
                  text="The sign of the student union building"
                />
        </View>
            
            <View style={styles.buttons}>
                <Button text={"Camera"} 
                onPress={() => navigation.navigate('Camera', {
                    list: list,
                    completedLocations: completedLocations
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