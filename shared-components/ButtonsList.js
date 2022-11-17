import React from "react";
import {Image, TouchableHighlight, Text} from "react-native";

function ButtonsList({ pressHandler }) {
  //const rugNamesArr = Object.keys(Rugs);
  return (
    <Text>Buttons list -- TO IMPLEMENT</Text>
    /*rugNamesArr.map(item =>
      <TouchableHighlight
        key={item}
        onPress={() => pressHandler(item)}
      >
        <Image
          source={Rugs[`${item}`]}
          resizeMode="contain"
          style={styles.rugButton}
        />
      </TouchableHighlight>
    )*/
  );
}

export default ButtonsList;