import React, { useContext } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwitchContext } from '../components/Switch';

const About = () => {
    const { isEnabled } = useContext(SwitchContext);

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView
                contentContainerStyle={styles.container}
                style={[styles.scrollView, { backgroundColor: isEnabled ? '#3F3F3F' : 'white' }]}
            >
                <View style={styles.profile}>
                    <Text style={[styles.title, { color: isEnabled ? 'white' : 'black' }]}>About Me</Text>
                    
                    <Text style={[styles.paragraph, { color: isEnabled ? 'white' : 'black' }]}>
                        Hello, I'm Milan Sandakelum, a student at Trincomalee Campus, Eastern University, Sri Lanka, majoring in Computer Science.
                    </Text>

                    <Text style={[styles.paragraph, { color: isEnabled ? 'white' : 'black' }]}>
                        Alongside my academic pursuits, I've honed my skills as a Mobile App Developer, focusing on React Native and Flutter.
                    </Text>

                    <Text style={[styles.paragraph, { color: isEnabled ? 'white' : 'black' }]}>
                        I'm also proficient in web development, particularly with React.js, and have worked extensively with backend technologies like Firebase and MySQL.
                    </Text>

                    <Text style={[styles.paragraph, { color: isEnabled ? 'white' : 'black' }]}>
                        Additionally, I have experience in Java project development.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    scrollView: {
        flex: 1,
    },
    container: {
        paddingVertical: 24,
        paddingHorizontal: 16,
    },
    profile: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        paddingVertical: 10,
        borderBottomWidth: 2,
        borderBottomColor: '#D3D3D3',
    },
    paragraph: {
        fontSize: 18,
        lineHeight: 24,
        textAlign: 'center',
        marginBottom: 15,
    },
});

export default About;
