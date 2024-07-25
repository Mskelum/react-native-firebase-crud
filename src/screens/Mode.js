import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Image } from 'react-native';

const Mode = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Choose Your Login Mode</Text>
      
      <View style={styles.section}>
        <Text style={styles.sectionText}>Login as a Student</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Loginst')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Student</Text>
        </TouchableOpacity>
        <Image
          style={styles.icon}
          source={require('../assests/images/user.png')}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionText}>Login as an Admin</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('Loginad')}
          style={styles.button}
        >
          <Text style={styles.buttonText}>Admin</Text>
        </TouchableOpacity>
        <Image
          style={styles.icon}
          source={require('../assests/images/seller.png')}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Register')}>
          <Text style={styles.registerText}> Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f4f6',
    paddingHorizontal: '10%',
    paddingTop: '20%',
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  section: {
    marginBottom: 30,
    alignItems: 'center',
  },
  sectionText: {
    fontSize: 22,
    fontWeight: '600',
    marginBottom: 20,
    color: '#555',
  },
  button: {
    backgroundColor: 'black',
    padding: 12,
    borderRadius: 16,
    marginBottom: 20,
    width: 200,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 18,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  footerText: {
    color: '#555',
    fontWeight: '600',
  },
  registerText: {
    color: '#6200ea',
    fontWeight: '700',
    marginLeft: 5,
  },
});

export default Mode;
