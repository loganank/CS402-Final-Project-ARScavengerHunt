import * as React from 'react';
import * as Location from 'expo-location';

async function getCurrentLocation() {
  var status = await Location.requestForegroundPermissionsAsync();

  if (status.status !== 'granted') {
    console.error('Permission to access location was denied');
    return;
  }

  var location = await Location.getCurrentPositionAsync();

  var currLatitude = location.coords.latitude;
  var currLongitude = location.coords.longitude;

  var currLocation = { latitude: currLatitude, longitude: currLongitude };

  return currLocation;
}

export { getCurrentLocation };
