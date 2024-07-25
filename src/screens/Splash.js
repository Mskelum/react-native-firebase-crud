import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../Firebase';
import FastImage from 'react-native-fast-image';

const Splash = () => {

  const [isGo, setIsGo] = useState(true);
  const Navigation = useNavigation();

  useEffect(() => {

    const checkToken = async () => {

      const emailString = await AsyncStorage.getItem('email');
      const email = JSON.parse(emailString);
      console.log('Earlier logged email:', email);

      const passwordString = await AsyncStorage.getItem('password');
      const password = JSON.parse(passwordString);
      console.log('Earlier logged password:', password);

      const codeString = await AsyncStorage.getItem('code');
      const code = JSON.parse(codeString);
      console.log('Earlier logged code:', code);

      if (email && code !== null) {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(async (userCredentials) => {
            const user = userCredentials.user;
            const userEmail = user.email || '';
            setTimeout(() => {
              Navigation.replace('Admin', { email });
              setIsGo(false);
            }, 1000);
          })
          .catch((error) => {
            setTimeout(() => {
              Navigation.replace('Mode');
              setIsGo(false);
            }, 1000);
          });
      }

      else if (email && code == null) {
        auth
          .signInWithEmailAndPassword(email, password)
          .then(async (userCredentials) => {
            const user = userCredentials.user;
            const userEmail = user.email || '';
            setTimeout(() => {
              Navigation.replace('Home', { email });
              setIsGo(false);
            }, 1000);
          })
          .catch((error) => {
            setTimeout(() => {
              Navigation.replace('Mode');
              setIsGo(false);
            }, 1000);
          });
      }

      else {
        setTimeout(() => {
          Navigation.replace('Mode');
          setIsGo(false);
        }, 1000);
      }
    };

    checkToken();
  }, [Navigation]);


  return (
    <View style={styles.background}>
      <FastImage
        style={styles.image}
        source={require('../assests/loading.gif')}
        resizeMode={FastImage.resizeMode.contain}
      />

      <View style={styles.title}>
        <Text style={styles.text1}>crud app</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    backgroundColor: 'white',
    alignItems: 'center',
    width: '100%',
    height: '100%',
  },
  title: {
    marginTop: 20,
    marginHorizontal: 30,
  },
  text1: {
    fontSize: 39,
    fontWeight: 'bold',
    color: 'black',
  },
  image: {
    justifyContent: 'center',
    marginTop: 300,
    width: 80,
    height: 80,
  },
  emailText: {
    fontSize: 18,
    color: 'black',
    marginTop: 20,
  },
});

export default Splash;
