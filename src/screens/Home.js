import { SafeAreaView, StatusBar, StyleSheet, Text, View, Alert, Modal, TextInput, TouchableOpacity, Image, ScrollView, BackHandler } from 'react-native'
import React, { useEffect, useState, useRef } from 'react'
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { Searchbar } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons'
import MatIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import * as ImagePicker from 'react-native-image-picker';
import { auth } from '../../Firebase';
import { db } from '../components/Config';
import { getDatabase, ref, remove, set, update, onValue, get } from "firebase/database";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BarChart } from "react-native-chart-kit";

const Home = ({ navigation }) => {

  const [modal, setModal] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [image, setImage] = useState(null)
  const [uploading, setUploading] = useState(false)


  const handleAdd = () => {
    const userUid = auth.currentUser?.uid;
    const userEmail = auth.currentUser?.email;

    if (!userUid || !userEmail) {
      console.error("User UID not available");
      return;
    }

    const db = getDatabase();
    const userRef = ref(db, 'users/' + userUid); // Reference to user's data

    const dataToAdd = {
      id: id,
      name: name,
      email: auth.currentUser?.email,
      age: age,
      address: address,
      image: image && image.uri
    };

    // Use the set function to set the data at the userRef location
    set(userRef, dataToAdd)
      .then(() => {
        console.log("Data added successfully");
        // Clear the state variables
        setId('');
        setName('');
        setAge('');
        setAddress('');
      })
      .catch((error) => {
        console.error("Error adding data: ", error);
      });
  }



  const handleUpdate = () => {
    const userEmail = auth.currentUser?.email;

    if (!userEmail) {
      console.error("User email not available");
      return;
    }

    const db = getDatabase();
    const usersRef = ref(db, 'users');

    get(usersRef).then((snapshot) => {
      if (snapshot.exists()) {
        const userData = snapshot.val();
        const userId = Object.keys(userData).find(key => userData[key].email === userEmail); // Find the user ID by email

        if (userId) {
          const userToUpdate = userData[userId];

          console.log("User to update:", userToUpdate); // Debugging

          setId(userToUpdate.id || '');
          setName(userToUpdate.name || '');
          setEmail(userToUpdate.email || ''); // Assuming you want to update the email field as well
          setAge(userToUpdate.age || '');
          setAddress(userToUpdate.address || ''); // Set address with a default empty string if undefined
        } else {
          console.error("User data not found for the given email");
        }
      } else {
        console.error("User data not found in the database");
      }
    }).catch((error) => {
      console.error("Error fetching user data: ", error);
    });
  };




  const handleSave = () => {

    const userUid = auth.currentUser?.uid;
    const userEmail = auth.currentUser?.email;

    if (!userUid || !userEmail) {
      console.error("User UID not available");
      return;
    }

    const userRef = ref(db, 'users/' + userUid);
    const updates = {
      id: id,
      name: name,
      email: auth.currentUser?.email,
      age: age,
      address: address,
    };

    if (!name || !age || !address) {
      const errorMessage = "Please provide all the required information.";
      Alert.alert('Error', errorMessage);
      return;
    }

    update(userRef, updates)
      .then(() => {
        console.log('User details updated successfully');
        setId('');
        setName('');
        setAge('');
        setAddress('');
      })
      .catch((error) => {
        console.log('Error updating user details:', error);
      });

    const successMessage = "Successfully updated.";
    Alert.alert('Success', successMessage);
  };


  const clearForm = () => {
    setId("")
    setName("")
    setAge("")
    setAddress("")
  }

  function readData() {
    const usersRef = ref(db, 'users/');
    get(usersRef)
      .then((snapshot) => {
        const usersData = snapshot.val();
        setUsersData(usersData);
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  }

  const handleCreate = () => {
    setModal(true)
  }

  const handleCloseModal = () => {
    setModal(false)
  }

  useEffect(() => {
    readData();
  }, [selectedUser]);


  const handleLogout = async () => {
    try {
      await auth.signOut();
      console.log('User signed out!');
      navigation.replace('Mode');

      await AsyncStorage.clear();
      console.log('AsyncStorage data cleared successfully');
    } catch (error) {
      console.error('Error handling logout:', error);
    }
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal}
        onRequestClose={handleCloseModal}
      >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>

              <View style={{ marginBottom: 10, marginLeft: "38%", marginTop: 10, flexDirection: 'row' }}>
                <Image style={{ width: 80, height: 80 }} source={require('../assests/images/seller.png')} />
                <TouchableOpacity onPress={() => {
                  handleCloseModal();
                  // BackHandler.exitApp();
                }}
                  style={{ marginLeft: 80 }}
                >
                  <FontAwesome name='window-close' size={40} color="#ef233c" style={{ paddingTop: 5, marginRight: 5 }} />
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 25 }}>

                <Text style={styles.logintxt}>Edit your profile</Text>

                <ScrollView>

                  <View style={styles.txtinput}>
                    <Ionicons name='people' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='ID number'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={id}
                      onChangeText={(text) => { setId(text) }}
                    />
                  </View>

                  <View style={styles.txtinput}>
                    <Ionicons name='person' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='Full Name'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={name}
                      onChangeText={(text) => { setName(text) }}
                    />
                  </View>

                  <View style={styles.txtinput}>
                    <Ionicons name='calendar' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='Age'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={age}
                      onChangeText={(text) => { setAge(text) }}
                    />
                  </View>

                  <View style={styles.txtinput}>
                    <Ionicons name='home' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='Address'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={address}
                      onChangeText={(text) => { setAddress(text) }}
                    />
                  </View>

                  <View style={styles.txtinput}>
                    <Ionicons name='mail' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='gray'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={auth.currentUser?.email}
                      onChangeText={(text) => { setEmail(text) }}
                      editable={false}
                      keyboardType={'email-address'}
                    />
                  </View>

                  <View style={{ flexDirection: 'row', marginBottom: 12 }}>

                    <TouchableOpacity onPress={handleUpdate}
                      style={{ backgroundColor: '#AD40AF', padding: 10, borderRadius: 16, width: 130 }}>
                      <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Edit</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={handleSave}
                      style={{ backgroundColor: '#AD40AF', padding: 10, borderRadius: 16, width: 130, marginHorizontal: 7 }}>
                      <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Save</Text>
                    </TouchableOpacity>
                  </View>

                  <View style={{ marginTop: 33 }}></View>

                </ScrollView>

              </View>
            </View>
          </View>
        </View>

      </Modal>

      <View style={{ backgroundColor: '#F4E3FF', flex: 1 }}>

        <View style={styles.header}>
          <Text style={styles.headerTxt}>Your profile</Text>

        </View>

        <View style={{ marginTop: 30, marginHorizontal: 30 }}>

          <ScrollView>

            {/* Display user details */}
            {usersData &&
              Object.values(usersData).map((user, index) => {
                if (user.email === auth.currentUser?.email) {
                  return (
                    <View
                      key={index}
                      style={styles.userContainer}
                    >
                      <Text style={styles.userTitle}>User Information</Text>
                      <View style={{ alignItems: 'center', marginBottom: 30 }}>
                        <Image style={{ width: 80, height: 80, alignItems: 'center' }} source={require('../assests/images/seller.png')} />
                      </View>

                      <Text style={styles.userText}>Id: <Text style={styles.userDetail}>{user.id}</Text></Text>
                      <Text style={styles.userText}>Name: <Text style={styles.userDetail}>{user.name}</Text></Text>
                      <Text style={styles.userText}>Age: <Text style={styles.userDetail}>{user.age}</Text></Text>
                      <Text style={styles.userText}>Address: <Text style={styles.userDetail}>{user.address}</Text></Text>
                      <Text style={styles.userText}>Email: <Text style={styles.userEmail}>{user.email}</Text></Text>
                    </View>
                  );
                } else {
                  return null;
                }
              })}

          </ScrollView>

          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginVertical: 20 }}>
            <Button
              icon="plus"
              mode="contained"
              style={styles.button}
              onPress={handleCreate}
            >
              Edit
            </Button>

            <Button
              icon="logout"
              mode="contained"
              style={styles.button}
              onPress={handleLogout}
            >
              Logout
            </Button>
          </View>

        </View>
      </View>

    </SafeAreaView >
  )
}

export default Home

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  header: {
    backgroundColor: 'green',
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomEndRadius: 16,
    borderBottomLeftRadius: 16
  },

  headerTxt: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 15,
    padding: 10
  },

  button: {
    width: '80%', // Adjust width as needed
    borderRadius: 20, // Rounded corners
    paddingVertical: 10, // Vertical padding
    paddingHorizontal: 20, // Horizontal padding
    marginBottom: 15, // Space between buttons
    shadowColor: '#000', // Shadow color
    shadowOffset: { width: 0, height: 4 }, // Shadow offset
    shadowOpacity: 0.2, // Shadow opacity
    shadowRadius: 6, // Shadow blur radius
    elevation: 5, // Android shadow
    backgroundColor: '#6200ee', // Button color
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    marginHorizontal: 12
  },

  itemContainer: {
    flexDirection: 'row',
    margin: 16,
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 12
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },

  modalView: {
    margin: 10,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    height: '90%'
  },

  container: {
    flex: 1,
    margin: -5,
    marginTop: 5
  },

  logintxt: {
    fontSize: 28,
    color: '#240046',
    marginBottom: 30,
    textAlign: 'center'
  },

  txtinput: {
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingBottom: 8,
    marginBottom: 25
  },
  userContainer: {
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  userImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 15,
  },
  userTitle: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#d1d1d1',
    paddingBottom: 5,
  },

  userInfoTable: {
    width: '100%',
  },
  userText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
  },
  userDetail: {
    fontSize: 16,
    color: '#555',
  },
});