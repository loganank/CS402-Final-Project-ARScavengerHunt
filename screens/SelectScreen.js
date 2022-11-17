import React from "react";
import {View, Text} from "react-native";

import ButtonsList from '../shared-components/ButtonsList';

function SelectScreen() {
    return (
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text>Home Screen</Text>
            <ButtonsList pressHandler={() => {}}/>
        </View>
    );
  }

export default SelectScreen;