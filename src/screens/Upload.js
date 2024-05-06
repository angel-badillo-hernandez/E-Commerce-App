import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Image, Button } from 'react-native';
import { Layout, useTheme, Text } from 'react-native-rapi-ui';
import { IconButton } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

const getImageBinaryData = async (imagePickerResult) => {
    const fileName = imagePickerResult.fileName;
    const mimeType = imagePickerResult.mimeType;
    const imageUri = imagePickerResult.uri;
    
    try {
      const fileInfo = await FileSystem.getInfoAsync(imageUri, { md5: true });
      const { uri } = fileInfo;
      const base64Content = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });
  
      return {
        base64Content: base64Content,
        fileType: mimeType,
        fileName: fileName,
      };
    } catch (error) {
      alert('Error reading file:', error);
      return null;
    }
  };

const ImagePickerScreen = () => {
    const [selectedImage, setSelectedImage] = useState(null);
  
    const selectImage = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
        return;
      }
  
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsMultipleSelection: false,
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
      });
  
      if (!result.canceled) {
        let imageUri = result.assets[0].uri;
        let asset = result.assets[0];
        getImageBinaryData(asset).then((data)=>console.log(data));
        setSelectedImage(imageUri);
        
      }
    };
  
    return (
      <View style={styles.container}>
        <Image source={{ uri: selectedImage }} style={styles.image} />
        <Button title="Select Image" onPress={selectImage} />
      </View>
    );
  };
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    image: {
      width: 200,
      height: 200,
      resizeMode: 'contain',
      marginBottom: 20,
    },
  });
  
  export default ImagePickerScreen;