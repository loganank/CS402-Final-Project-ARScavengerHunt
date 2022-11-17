import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectScreen from './screens/SelectScreen';
import { PermissionsAndroid } from 'react-native';
import { Camera } from 'expo-camera';

//import ARScreen from './screens/ARScreen';

//ANDROID PERMISSIONS
const requestCameraPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.CAMERA,
      {
        title: "ARScavenger Hunt Camera Permission",
        message:
          "ARScavenger Hunt needs access to your camera " +
          "so you can take pictures.",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the camera");
    } else {
      console.log("Camera permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

const Stack = createNativeStackNavigator();

function App() {
  requestCameraPermission();

  return (
    <NavigationContainer initialRouteName="AR">
      <Stack.Navigator>
        <Stack.Screen name="Home" component={SelectScreen} />
        <Stack.Screen name="AR" component={ARScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;