import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import * as Location from 'expo-location';

import {Button} from '../components/Button';
import PhotoScreen from '../screens/PhotoScreen';
import {PhotoFragment} from '../screens/PhotoScreen';
import { distanceBetween } from '../functions/CurrentLocation';

import { Camera } from 'expo-camera';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
      },
    buttons: {
      marginVertical: 20,
      flexDirection: 'row',
    },
    camera: {
        flex: 4,
        justifyContent: "space-between",
        padding: 5,
    },
  });

  let plist = [];

function CameraScreen({route, navigation}) {
    const {list, completedLocations} = route.params;

    const stadium_location = {latitude: 43.602852148279204, longitude: -116.19587653072298}
    const library_location = {latitude: 43.604235041567314, longitude: -116.20325796948312}
    const sub_location = {latitude: 43.602021896160124, longitude: -116.20157402463211}
    const locations = [stadium_location, library_location, sub_location]

    const [hasCameraPermission, setCameraHasPermission] = useState(null);
    const [hasLocationPermission, setLocationHasPermission] = useState(null);
    const [distanceToCheckoff, setDistanceToCheckoff] = useState(0.1);
    const [takingPhoto, setTakingPhoto] = useState(false);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [onetime, setOneTime] = useState(true);
    const [photolist, setPhotoList] = useState(list);
    const [completedLocationsList, setCompletedLocationsList] = useState(completedLocations);
    const cameraRef = useRef(null)

    const [userLocation, setUserLocation] = useState(null);
    
    useEffect(() => { // called every redraw
        if (onetime)
        {
            (async () => {
                if (!hasCameraPermission) {
                    let { status } = await Camera.requestCameraPermissionsAsync();
                    setCameraHasPermission(status === 'granted');
                }
                if (!hasLocationPermission) {
                    let { status } = await Location.requestForegroundPermissionsAsync();
                    setLocationHasPermission(status === 'granted');
                }
            })();
        
        setOneTime(false);
        }
        if (userLocation == null) {
            getLocation();
        }
    }, [hasLocationPermission]);

    var getLocation = async () => {
        if (hasLocationPermission) {
            let location = await Location.getCurrentPositionAsync({});
            let location_as_object = {latitude: location.coords.latitude, longitude: location.coords.longitude}
            setUserLocation(location_as_object);
            console.log(location_as_object)
        } else {
            console.log("The user did not allow location permissions");
        }
    }
    var updateCheckboxes = async () => {
        if (hasLocationPermission) {
            let location = await Location.getCurrentPositionAsync({});
            let location_as_object = {latitude: location.coords.latitude, longitude: location.coords.longitude}
            setUserLocation(location_as_object);
            let newCompletedLocations = completedLocations;

            for (let location in locations) {
                let distanceFromLocation = distanceBetween(locations[location], location_as_object);
                if (distanceFromLocation <= distanceToCheckoff) {
                    // modify completedLocationsList
                    newCompletedLocations[location] = true;
                }
            }
            console.log(newCompletedLocations);
            setCompletedLocationsList(newCompletedLocations);
        } else {
            console.log("The user did not allow location permissions");
        }
    }

    // function to take camera picture
    var snap = async () => {
        setTakingPhoto(true);
        console.log("Take Picture");
        let options = {
            quality: 1, 
            base64: true, 
            exif: false
        }
        let photo = await cameraRef.current.takePictureAsync(options);
        photo.name="photo" + photolist.length;
        const newList = [...photolist, photo.uri];
        setPhotoList(newList);
        updateCheckboxes();
        setTakingPhoto(false);
    }

    function back() {
       if (!takingPhoto) {
            navigation.navigate('Select', {
                list: photolist,
                completedLocationsList: completedLocationsList
            })
        }   
    }

    var camui = <Text>The user did not provide camera access and/or media access.</Text>

    if (hasCameraPermission && hasCameraPermission) {
        camui = <View style={styles.container}>
            <Camera ref={cameraRef}
                style={styles.camera} type={type} />
            <View style={styles.buttons}>
                <Button text={"Back"} 
                    onPress={() => back()} 
                    backgroundColor={'lightblue'}
                    textColor={'white'}
                />
                <Button text={"Snap"} 
                    onPress={() => snap()} 
                    backgroundColor={'lightblue'}
                    textColor={'white'}
                />
                <Button text={"Flip"} 
                    onPress={() => setType(
                        type === Camera.Constants.Type.back
                        ? Camera.Constants.Type.front
                        : Camera.Constants.Type.back
                    )} 
                    backgroundColor={'lightblue'}
                    textColor={'white'}
                />
            </View>
        </View> 
    }

    return (camui);
}

    

export default CameraScreen;