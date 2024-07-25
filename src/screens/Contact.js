import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, SafeAreaView } from 'react-native';
import { SwitchContext } from '../components/Switch';

const Contact = () => {
    const { isEnabled } = useContext(SwitchContext);

    // Function to handle email press
    const handleEmailPress = () => {
        Linking.openURL('mailto:mskelum99@gmail.com');
    };

    // Function to handle WhatsApp press
    const handleWhatsAppPress = () => {
        Linking.openURL('https://wa.me/94758125068');
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={styles.container} style={{ backgroundColor: isEnabled ? '#3F3F3F' : 'white' }}>

                <View style={styles.profile}>
                    <Text style={[styles.text, { color: isEnabled ? 'white' : 'black' }]}>
                        We value your feedback and are always here to help.
                        If you have any questions, comments, or concerns about Money Earn Ways, please don't hesitate to contact us.
                        Our team is available to assist you with any issues you may encounter while using our app.
                    </Text>
                </View>

                <View style={styles.contactInfo}>
                    <Text style={[styles.label, { color: isEnabled ? 'white' : 'black' }]}>
                        Email:
                    </Text>
                    <TouchableOpacity style={styles.row} onPress={handleEmailPress}>
                        <Text style={styles.contactText}>
                            mskelum99@gmail.com
                        </Text>
                    </TouchableOpacity>

                    <Text style={[styles.label, { color: isEnabled ? 'white' : 'black' }]}>
                        WhatsApp:
                    </Text>
                    <TouchableOpacity style={styles.row} onPress={handleWhatsAppPress}>
                        <Text style={styles.contactText}>
                            +9475 8125 068
                        </Text>
                    </TouchableOpacity>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingVertical: 24,
    },
    profile: {
        padding: 23,
        alignItems: 'center',
        justifyContent: 'center',
    },
    contactInfo: {
        marginHorizontal: 15,
    },
    label: {
        color: 'black',
        fontSize: 18,
        marginHorizontal: 5,
        paddingBottom: 18,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: 50,
        width: '100%',
        backgroundColor: '#f2f2f2',
        borderRadius: 8,
        marginBottom: 25,
        paddingHorizontal: 15,
    },
    contactText: {
        fontSize: 17,
        color: 'black',
    },
    text: {
        fontSize: 18,
        lineHeight: 29,
        textAlign: 'center',
    },
});

export default Contact;
