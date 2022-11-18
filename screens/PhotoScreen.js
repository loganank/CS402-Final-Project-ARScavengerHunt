import React, { useState, useEffect, useRef } from 'react';
import {StyleSheet, View, Text, Image} from "react-native";
import {Button} from '../components/Button';
import PreviewList from '../components/previewList';

const styles = StyleSheet.create({
    container: {
       flex: 1,
        justifyContent: 'center',
      },
    buttons: {
        flex: 1,
        marginTop: 20,
        flexDirection: 'row',
    },
    photo: {
        flex: 15,
        justifyContent: 'center',
    },
    current: {
        textAlignVertical: "center",
        textAlign: 'center',
        fontSize: 16,
        flex: 1,
        justifyContent: 'center',
    }
  });

  let plist = [];
  let curphoto = 0;
  let plength = 0;


function PhotoFragment(props) {
    let ui = <Image style={styles.photo} source={props.source}/>
    return (ui);
}  

function PhotoScreen({route, navigation}) {

    const {list} = route.params;
    const [selected, setSelected] = useState(0);

    console.log("list from photo screen: " + list);

    const [photo, setPhoto] = useState(list[selected].uri);
    

    function prevImage() {
        if (selected == 0)
        {
          return;
        }
        else{
          setSelected(selected - 1);
          setPhoto(list[selected].uri);
        }
      };
      
    function nextImage() {
        var lastindex = list.length - 1;
        if (lastindex == selected)
        {
            return;
        }
        else
        {
            setSelected(selected + 1);
            setPhoto(list[selected].uri);
        }
    };

    //list.forEach(element => {
        console.log(list[selected].uri);
    //});
    var ui= <View style={styles.container}>
        <PhotoFragment source={{uri: photo}} />
        <View style={styles.buttons} >
            <Button text={"Prev"} 
                onPress={() => prevImage()} 
                backgroundColor={'lightblue'}
                textColor={'white'}
            />
            <Button text={"Next"} 
                onPress={() => nextImage()} 
                backgroundColor={'lightblue'}
                textColor={'white'}
            />
        </View>
        <Text style={styles.current}> Showing current image {selected + 1}/{list.length}</Text>
    </View>
    
 /*var ui=<View>
        <PhotoFragment source={{uri: photo}} />
        
        
    </View>*/
    return (ui);
}



export {PhotoScreen, PhotoFragment}