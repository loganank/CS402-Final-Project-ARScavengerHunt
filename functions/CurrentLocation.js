import * as React from 'react';

function distanceBetween(location1, location2) {
  const EARTH_RADIUS = 6371; // kilometers
  let dLat = (location2.latitude - location1.latitude) * Math.PI / 180.0;
  let dLon = (location2.longitude - location1.longitude) * Math.PI / 180.0;

  // convert to radians
  let lat1 = location1.latitude * Math.PI / 180.0;
  let lat2 = location2.latitude * Math.PI / 180.0;
  // using haversine formula to compute distance between two locations
  haversine_answer = 2 * EARTH_RADIUS * Math.asin(Math.sqrt( Math.pow(Math.sin(dLat / 2), 2) + Math.cos(lat1) * Math.cos(lat2) * Math.pow(Math.sin(dLon / 2), 2) ))
  console.log("Distance between locations is " + haversine_answer);
  return haversine_answer;
}

export { distanceBetween };
