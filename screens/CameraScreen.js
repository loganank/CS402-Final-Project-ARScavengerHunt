import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Image} from "react-native";
import {Button} from '../components/Button';
import PhotoScreen from '../screens/PhotoScreen';
import {PhotoFragment} from '../screens/PhotoScreen';

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
    let {list} = route.params;
    
    console.log("list from camera screen: " + list);

    const [hasCameraPermission, setCameraHasPermission] = useState(null);
    const [type, setType] = useState(Camera.Constants.Type.back);
    const [onetime, setOneTime] = useState(true);
    const [photo, setPhoto] = useState('../constants/favicon.png');
    const [photolist, setPhotoList] = useState(list);
    const cameraRef = useRef(null)

    useEffect(() => { // called every redraw
        if (onetime)
        {
            (async () => {
                const { status } = await Camera.requestCameraPermissionsAsync();
                setCameraHasPermission(status === 'granted');
            })();
        
        setOneTime(false);
        }
    }, );
    var camui = <Text>The user did not provide camera access and/or media access.</Text>

    // function to take camera picture
    var snap = async () => {
        console.log("Take Picture");
        let options = {
            quality: 1, 
            base64: true, 
            exif: false
        }
        let photo = await cameraRef.current.takePictureAsync(options);
        photo.name="photo" + photolist.length;
        setPhoto(photo.uri);
        const newList = [...photolist, photo];
        setPhotoList(newList);
    }

    if (hasCameraPermission && hasCameraPermission) {
        camui = <View style={styles.container}>
            <Camera ref={cameraRef}
                style={styles.camera} type={type} />
            <View style={styles.buttons}>
                <Button text={"Back"} 
                    onPress={() => navigation.navigate('Select', {
                        list: photolist
                    })} 
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