import React, {useState} from 'react';
import { Image, TouchableOpacity, Button, FlatList, StyleSheet, Text, View, ListItem } from 'react-native';

const PreviewList = (props) => {

const [curphoto, setcurphoto] = useState(0);
const [plength, setPlength] = useState(0);

const gstyles = StyleSheet.create({
  container: {
   flex: 8,
   flexDirection: "column",
   borderWidth: 5,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  preview: {
    flex: 6,
    height: 300,
    width: 300,
    padding: 5,
    borderWidth: 6,
  },
   buttonrow: {
      flex: 1,
      height: 150,
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 2,
      padding: 0,
      marginLeft: 0,
      marginRight: 0,
      marginTop: 0,
      marginBottom: 0,
  },
  logo: {
    flex: 4,
    height: 280,
    width: 300,
    padding: 0
  },
  });

function prevImage() {
  if (curphoto == 0)
  {
    return;
  }
  else{
    var newphotog = curphoto -1;
    setcurphoto(newphotog);
  }
};

function nextImage() {
  var lasti = props.photolist.length-1;
  if (lasti == curphoto)
  {
    return;
  }
  else
  {
    var newphotog = curphoto +1;
    setcurphoto(newphotog);
  }
};

async function postImage() {
    // POST request using fetch with async/await
  posturl = "http://mec402.boisestate.edu/cs402/lumin.php?app=content&cmd=xypos&filename=";

  // generate a filename for the uploaded image
  acode = Math.floor(100000 + Math.random() * 900000);
  filename = "photo"+acode+".png";
  // get the image to be uploaed in base64 - an ascii format
  aphoto = props.photolist[curphoto].base64;

  // prepare the url for use
  curpos = curphoto * 100;
  aurl = posturl + filename +"&X="+curpos+"px&Y=100px";

  //helpful debugging code
  console.log(aphoto);
  nphoto = aphoto.replace(/.*,/,"");
  console.log(nphoto);

  // HTTP options to say using PUT - upload data directly
    const requestOptions = {
        method: 'PUT',
        body: nphoto
    };

    // now use fet to make the request and send the data
    const response = await fetch(aurl, requestOptions);
    console.log("fetch returned");

    if (response.ok)
    {
      console.log("response ok");
     console.log(response);
    }
    else
    {
      console.log("upload failure");
    }
}



var asource = props.source;
if (props.photolist.length > 0)
{
  var avl = curphoto;
  if (plength != props.photolist.length)
  {
     avl = 0;
     setPlength(props.photolist.length);
     setcurphoto(0);
  }
   console.log(avl);
   asource = {uri: props.photolist[avl].uri};
}
console.log(props.photolist.length);
var preview= <View style={gstyles.preview} >
        <Image style={gstyles.logo} source={asource}/>
        <View style={gstyles.buttonrow} >
        <Button title='Prev' onPress={() => prevImage() } style={{padding: 0, fontSize: 20, color: 'green'}} />
        <Button title='Next' onPress={() => nextImage()} style={{padding: 0, fontSize: 20, color: 'green'}}/>
        <Button title='Post' onPress={() => postImage()} style={{padding: 0, fontSize: 20, color: 'green'}}/>
        </View>
        <Text> Showing current image {curphoto+1}/{props.photolist.length}</Text>
        </View>
   return (preview);
};


export default PreviewList;