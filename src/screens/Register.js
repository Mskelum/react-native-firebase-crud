import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView } from 'react-native'
import React, { useEffect, useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import FontAwesome from 'react-native-vector-icons/AntDesign'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { auth } from '../../Firebase';

const Register = ({ navigation }) => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [cmpassword, setCmpassword] = useState('');

    const handleSignup = () => {
        auth
            .createUserWithEmailAndPassword(email, password)
            .then(userCredentials => {
                const user = userCredentials.user;
                console.log(user.email);
                navigation.navigate('Mode');
            })
            .catch(error => {
                if (error.code === 'auth/email-already-in-use') {
                    // Display an alert when the email is already in use
                    Alert.alert(
                        'Error',
                        'Email is already in use. Please choose a different email address.',
                        [{ text: 'OK' }]
                    );
                } else {
                    // Display a generic error message
                    Alert.alert(
                        'Error',
                        error.message,
                        [{ text: 'OK' }]
                    );
                }
            });
    }


    return (
        <SafeAreaView style={styles.container}>

            <Image
                source={require('../assests/images/cover.png')} // Corrected path
                style={styles.backgroundImage}
                resizeMode="cover"
            />

            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.innerContainer}
            >

                <View style={styles.section1}>

                    <View style={styles.txtinput}>
                        <MaterialIcons name='password' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                        <TextInput
                            placeholderTextColor='black'
                            fontWeight='bold'
                            color='black'
                            placeholder='Email'
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={{ flex: 1, paddingVertical: 0 }}
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.txtinput}>
                        <MaterialIcons name='password' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                        <TextInput
                            placeholderTextColor='black'
                            fontWeight='bold'
                            color='black'
                            placeholder='Password'
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={{ flex: 1, paddingVertical: 0 }}
                        />
                    </View>

                    <View style={styles.txtinput}>
                        <MaterialIcons name='password' size={20} color="#666" style={{ paddingTop: 5, marginRight: 5 }} />
                        <TextInput
                            placeholderTextColor='black'
                            fontWeight='bold'
                            color='black'
                            placeholder='Confirm password'
                            value={cmpassword}
                            onChangeText={text => setCmpassword(text)}
                            style={{ flex: 1, paddingVertical: 0 }}
                            secureTextEntry={true}
                        />
                    </View>

                    <View style={{ marginTop: 30 }} />

                    <TouchableOpacity onPress={handleSignup}
                        style={{ backgroundColor: 'black', padding: 12, borderRadius: 16, marginBottom: 40, width: 150 }}>
                        <Text style={{ textAlign: 'center', fontWeight: '700', fontSize: 18, color: 'white' }}>Register</Text>
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', gap: 5, justifyContent: 'center', marginBottom: 20 }}>

                        <Text style={{ color: 'white', fontWeight: '700' }}>Do you have account?</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('Mode')} >
                            <Text style={{ color: 'white', fontWeight: '700' }}> Login</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </KeyboardAvoidingView>

        </SafeAreaView >
    )
}

export default Register;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    backgroundImage: {
        width: '100%',
        height: 200,
        position: 'absolute',
    },
    logintxt: {
        fontSize: 28,
        color: '#240046',
        marginBottom: 30,
        textAlign: 'center'
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    txtinput: {
        height: 50,
        flexDirection: 'row',
        marginHorizontal: 30,
        marginVertical: 12,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOffset: { width: 5, height: 5 },
        elevation: 3,
    },
    section1: {
        marginTop: 100,
        width:'80%',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },

})