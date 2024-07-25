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
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [address, setAddress] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [image, setImage] = useState(null)


  const readData = () => {
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

  useEffect(() => {
    readData();
  }, []);

  const handleAdd = () => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then(userCredentials => {
        const user = userCredentials.user;
        console.log(user.email);

        const userUid = user.uid;

        const db = getDatabase();
        const userRef = ref(db, 'users/' + userUid);

        const dataToAdd = {
          id: id,
          name: name,
          email: email,
          age: age,
          address: address,
        };

        return set(userRef, dataToAdd);
      })
      .then(() => {
        console.log("Data added successfully");
        setId('');
        setName('');
        setEmail('');
        setPassword('')
        setAge('');
        setAddress('');
        readData();
        handleCloseModal();
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert(
            'Error',
            'Email is already in use. Please choose a different email address.',
            [{ text: 'OK' }]
          );
        } else {
          Alert.alert(
            'Error',
            error.message,
            [{ text: 'OK' }]
          );
        }
        console.error("Error adding data: ", error);
      });
    readData();
  };


  const clearForm = () => {
    setId("")
    setName("")
    setEmail('')
    setPassword('')
    setAge("")
    setAddress("")
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

  const [modalVisible, setModalVisible] = useState(false);

  const handleUserPress = (user) => {
    setSelectedUser(user);
    setModalVisible(true);
  };

  const handleCloseModall = () => {
    setModalVisible(false);
    setSelectedUser(null);
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <Modal
        animationType="none"
        transparent={true}
        visible={modal}
      >

        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.container}>

              <View style={{ marginBottom: 10, marginLeft: "38%", marginTop: 10, flexDirection: 'row' }}>
                <Image style={{ width: 80, height: 80 }} source={require('../assests/images/seller.png')} />
                <TouchableOpacity onPress={() => {
                  handleCloseModal();
                }}
                  style={{ marginLeft: 80 }}
                >
                  <FontAwesome name='window-close' size={40} color="#ef233c" style={{ paddingTop: 5, marginRight: 5 }} />
                </TouchableOpacity>
              </View>

              <View style={{ paddingHorizontal: 25 }}>

                <Text style={styles.logintxt}>Add account</Text>

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
                    <Ionicons name='mail' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='gray'
                      placeholder='Email'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={email}
                      onChangeText={(text) => { setEmail(text) }}
                      keyboardType={'email-address'}
                    />
                  </View>

                  <View style={styles.txtinput}>
                    <Ionicons name='mail' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                    <TextInput
                      placeholderTextColor='gray'
                      color='black'
                      placeholder='password'
                      style={{ flex: 1, paddingVertical: 0 }}
                      value={password}
                      onChangeText={(text) => { setPassword(text) }}
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

                  <View style={{ alignItems: 'center' }}>
                    <TouchableOpacity onPress={handleAdd}
                      style={{ backgroundColor: '#AD40AF', padding: 10, borderRadius: 16, width: 130, marginBottom: 5 }}>
                      <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Add</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={clearForm}
                      style={{ backgroundColor: '#AD40AF', padding: 10, borderRadius: 16, width: 130 }}>
                      <Text style={{ textAlign: 'center', fontSize: 18, color: 'white' }}>Clear</Text>
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
          <Text style={styles.headerTxt}>Admin Panel</Text>
          <View style={{ flexDirection: 'row', marginHorizontal: '28%' }}>
            <IconButton
              style={styles.addBtn}
              icon="plus"
              iconColor={"white"}
              size={30}
              onPress={handleCreate}
            />
          </View>

          <View style={{ marginHorizontal: '-30%' }}>
            <Ionicons
              style={styles.addBtn}
              name="log-out-outline"
              color="white"
              size={30}
              onPress={handleLogout}
            />
          </View>
        </View>


        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={handleCloseModall}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <View style={styles.container}>

                <View style={{ marginBottom: 10, marginLeft: "38%", marginTop: 10, flexDirection: 'row' }}>
                  <Image style={{ width: 80, height: 80 }} source={require('../assests/images/seller.png')} />
                  <TouchableOpacity onPress={() => {
                    handleCloseModall();
                  }}
                    style={{ marginLeft: 80 }}
                  >
                    <FontAwesome name='window-close' size={40} color="#ef233c" style={{ paddingTop: 5, marginRight: 5 }} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.logintxt}>User details</Text>
                {selectedUser && (
                  <View style={styles.table}>
                    <View style={styles.row}>
                      <Text style={[styles.cell, styles.labelCell]}>ID</Text>
                      <Text style={[styles.cell, styles.valueCell]}>: {selectedUser.id}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={[styles.cell, styles.labelCell]}>Name</Text>
                      <Text style={[styles.cell, styles.valueCell]}>: {selectedUser.name}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={[styles.cell, styles.labelCell]}>Email</Text>
                      <Text style={[styles.cell, styles.valueCell]}>: {selectedUser.email}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={[styles.cell, styles.labelCell]}>Age</Text>
                      <Text style={[styles.cell, styles.valueCell]}>: {selectedUser.age}</Text>
                    </View>
                    <View style={styles.row}>
                      <Text style={[styles.cell, styles.labelCell]}>Address</Text>
                      <Text style={[styles.cell, styles.valueCell]}>: {selectedUser.address}</Text>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </View>
        </Modal>



        <View style={{ marginTop: 30, marginHorizontal: 30 }}>

          <ScrollView>

            {/* Display user details */}
            {usersData && Object.values(usersData).map((user, index) => (
              <TouchableOpacity key={index} onPress={() => handleUserPress(user)} style={styles.userItem}>
                <Text style={{ color: 'black' }}>Name: {user.name}</Text>
                <Text style={{ fontSize: 16, fontWeight: 'bold', color: 'black' }}>Email: {user.email}</Text>
              </TouchableOpacity>
            )
            )}
          </ScrollView>


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
    backgroundColor: '#9d4edd',
    flexDirection: 'row',
    paddingBottom: 20,
    borderBottomEndRadius: 16,
    borderBottomLeftRadius: 16
  },

  headerTxt: {
    color: 'white',
    fontSize: 26,
    textAlign: 'center',
    marginTop: 12,
    padding: 10
  },

  addBtn: {
    padding: 10,
    marginTop: 12
  },
  userItem: {
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
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
    fontWeight: 'bold',
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
  table: {
    borderWidth: 1,
    borderColor: '#240046',
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#240046',
  },
  cell: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#240046',
    padding: 10,
  },
  labelCell: {
    flex: 0.25,
    fontSize:17
  },
  valueCell: {
    flex: 0.75,
    fontSize:17
  },
});