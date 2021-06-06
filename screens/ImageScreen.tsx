import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImageScreen() {
  const [image, setImage] = useState(null);
  const [base64Image, setBase64Image] = useState(null);

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true
    });

    console.log(JSON.stringify(result));
    // console.log(JSON.stringify(image));

    if (!result.cancelled) {
      setImage(result.uri);
      setBase64Image(result.base64);
    }
  };

  return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Pick an image from camera roll" onPress={pickImage} />
        {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        {base64Image && <Image source={{ uri: "data:image/jpeg;base64,"+base64Image }} style={{ width: 200, height: 200 }} />}
      </View>
  );
}
