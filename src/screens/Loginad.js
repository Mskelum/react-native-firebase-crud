import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, KeyboardAvoidingView, Platform } from 'react-native'
import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { auth } from '../../Firebase';

const Loginad = ({ navigation }) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [code, setCode] = useState('');

    const handleEmailChange = (text) => {
        setEmail(text);
    };

    const handlePasswordChange = (text) => {
        setPassword(text);
    };

    const handleLogin = async () => {
        try {
            await auth.signInWithEmailAndPassword(email, password);

            if (code === '1234') { // Assuming code is a string here
                await AsyncStorage.setItem('code', JSON.stringify(code));
                await AsyncStorage.setItem('email', JSON.stringify(email));
                await AsyncStorage.setItem('password', JSON.stringify(password));
                navigation.replace('Admin');
            } else {
                alert('Invalid code. Please try again.');
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../assests/images/cover.png')}
                style={styles.background}
                resizeMode="cover"
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.innerContainer}
            >
                <View style={styles.formContainer}>
                    <View style={styles.inputSection}>
                        <View style={styles.txtinput}>
                            <MaterialIcons name='email' size={24} color="#333" style={styles.icon} />
                            <TextInput
                                placeholderTextColor='#666'
                                placeholder='E-mail'
                                value={email}
                                onChangeText={handleEmailChange}
                                style={styles.input}
                                keyboardType="email-address"
                            />
                        </View>

                        <View style={styles.txtinput}>
                            <MaterialIcons name='lock' size={24} color="#333" style={styles.icon} />
                            <TextInput
                                placeholderTextColor='#666'
                                placeholder='Password'
                                value={password}
                                onChangeText={handlePasswordChange}
                                style={styles.input}
                                secureTextEntry={true}
                            />
                        </View>

                        <View style={styles.txtinput}>
                            <MaterialIcons name='vpn-key' size={24} color="#333" style={styles.icon} />
                            <TextInput
                                placeholderTextColor='#666'
                                placeholder='Code'
                                value={code}
                                onChangeText={setCode}
                                style={styles.input}
                                keyboardType="numeric"
                            />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('Forgot')} >
                            <Text style={styles.forgotPasswordText}>
                                Forgot Password?
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={handleLogin} style={styles.loginButton}>
                            <Text style={styles.loginButtonText}>Login</Text>
                        </TouchableOpacity>

                        <View style={styles.footer}>
                            <Text style={styles.footerText}>Don't you have an account?</Text>
                            <TouchableOpacity onPress={() => navigation.navigate('Register')} >
                                <Text style={styles.registerText}>Register</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

export default Loginad;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    background: {
        width: '100%',
        height: 200,
        position: 'absolute',
    },
    innerContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
        textAlign: 'center',
    },

    inputSection: {
        marginTop: 100,
        width: '80%',
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
    txtinput: {
        height: 50,
        flexDirection: 'row',
        marginBottom: 15,
        backgroundColor: '#f4f4f4',
        borderRadius: 10,
        paddingHorizontal: 15,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 2,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    forgotPasswordText: {
        color: 'white',
        fontWeight: '600',
        marginBottom: 20,
        textAlign: 'center',
    },
    loginButton: {
        backgroundColor: 'black',
        padding: 12,
        borderRadius: 16,
        marginBottom: 10,
        width: 150,
        alignItems: 'center',
    },
    loginButtonText: {
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 18,
        color: 'white',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20,
    },
    footerText: {
        color: 'white',
        fontWeight: '600',
    },
    registerText: {
        color: '#6200ea',
        fontWeight: '600',
        marginLeft: 5,
    },
});
