import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SelectScreen from './screens/SelectScreen';
import CameraScreen from './screens/CameraScreen';
import {PhotoScreen} from './screens/PhotoScreen';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer initialRouteName="AR">
      <Stack.Navigator>
        <Stack.Screen name="Select" component={SelectScreen} initialParams={{ list: [], completedLocations: [false, false, false] }}/>
        <Stack.Screen options={{headerShown: false}} name="Camera" component={CameraScreen}/>
        <Stack.Screen name="Photo" component={PhotoScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;