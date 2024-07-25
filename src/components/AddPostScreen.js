import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  Alert,
  ActivityIndicator,
  TextInput, TouchableOpacity, Image
} from 'react-native';
import ActionButton from 'react-native-action-button';
import Icon from 'react-native-vector-icons/Ionicons';
import ImagePicker from 'react-native-image-crop-picker';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import { db } from '../../Firebase';

const AddPostScreen = () => {

  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [post, setPost] = useState(null);

  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      width: 1200,
      height: 780,
      cropping: true,
      useNativeDriver: false,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 1200,
      height: 780,
      cropping: true,
      useNativeDriver: false,
    }).then((image) => {
      console.log(image);
      const imageUri = Platform.OS === 'ios' ? image.sourceURL : image.path;
      setImage(imageUri);
    });
  };


  const submitPost = async () => {
    const uploadUri = image;
    const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  
    setUploading(true);
  
    try {
      await db.collection('emp').doc(filename).set({}); 
      setUploading(false);
      setImage(null);
      Alert.alert('Post submitted successfully!');
    } catch (error) {
      console.error(error);
      setUploading(false);
      Alert.alert('Error submitting post.');
    }
  };



  // const submitPost = async () => {
  //   const uploadUri = image;
  //   const filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
  
  //   setUploading(true);
  
  //   try {
  //     // Use the db instance for Firestore operations
  //     await db.collection('emp').doc(filename).set({});
  //     setUploading(false);
  //     setImage(null);
  //     Alert.alert('Post submitted successfully!');
  //   } catch (error) {
  //     console.error(error);
  //     setUploading(false);
  //     Alert.alert('Error submitting post.');
  //   }
  // };
  

  // const submitPost = async () => {
  //   setUploading(true);
  //   try {
  //     const info = await RNFS.stat(image);
  //     const { uri } = info;
  //     const blob = await new Promise((resolve, reject) => {
  //       const xhr = new XMLHttpRequest();
  //       xhr.onload = () => {
  //         resolve(xhr.response);
  //       };
  //       xhr.onerror = (e) => {
  //         reject(new TypeError('Network request failed'));
  //       };
  //       xhr.responseType = 'blob';
  //       xhr.open('GET', uri, true);
  //       xhr.send(null);
  //     });
  
  //     const filename = uri.substring(uri.lastIndexOf('/') + 1);
  //     const ref = firebase.storage().ref().child(filename);
  
  //     await ref.put(blob);
  //     setUploading(false);
  //     Alert.alert('success');
  //     setImage(null);
  //   } catch (err) {
  //     console.log(err);
  //     setUploading(false);
  //   }
  // };
  


  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
            {image != null ? <Image style={styles.addImage} source={{ uri: image }} /> : null}

            <TextInput
                style={styles.inputField}
                placeholder="What's on your mind?"
                multiline
                numberOfLines={4}
                value={post}
                onChangeText={(content) => setPost(content)}
            />

            {uploading ? (
                <View style={styles.statusWrapper}>
                    <Text>{transferred} % Completed!</Text>
                    <ActivityIndicator size="large" color="#0000ff" />
                </View>
            ) : (
                <TouchableOpacity style={styles.submitBtn} onPress={submitPost}>
                    <Text style={styles.submitBtnText}>Post</Text>
                </TouchableOpacity>
            )}
        </View>

      <ActionButton buttonColor="#2e64e5">
        <ActionButton.Item
          buttonColor="#9b59b6"
          title="Take Photo"
          onPress={takePhotoFromCamera}>
          <Icon name="camera-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
        <ActionButton.Item
          buttonColor="#3498db"
          title="Choose Photo"
          onPress={choosePhotoFromLibrary}>
          <Icon name="md-images-outline" style={styles.actionButtonIcon} />
        </ActionButton.Item>
      </ActionButton>
      
    </View>
  );
};

export default AddPostScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    backgroundColor: '#2e64e5',
  },
  inputField: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 24,
    textAlign: 'center',
    width: '90%',
    marginBottom: 15,
  },
  addImage: {
    width: '100%',
    height: 250,
    marginBottom: 15,
  },
  statusWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtn: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: '#2e64e5',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  submitBtnText: {
    fontSize: 18,
    fontFamily: 'Lato-Bold',
    fontWeight: 'bold',
    color: '#fff',
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white',
  },
});

