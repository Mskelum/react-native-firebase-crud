import { StyleSheet, Text, View, Image } from 'react-native'
import React, { useState, useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { SwitchProvider } from '../components/Switch';
import Settings from '../screens/Settings';
import About from '../screens/About';
import Splash from '../screens/Splash';
import Home from '../screens/Home';
import Contact from '../screens/Contact';
import Register from '../screens/Register'; 
import Admin from '../screens/Admin';
import Mode from '../screens/Mode';
import Loginst from '../screens/Loginst';
import Loginad from '../screens/Loginad';
import AddPostScreen from '../components/AddPostScreen';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function CustomDrawerContent(props) {
    return (
        <DrawerContentScrollView {...props}>

            <View>
                <Image source={require('../assests/images/cover.png')}
                    style={{ margin: 1, marginTop: -10, width: 280, height: 210, borderBottomRightRadius: 40 }} resizeMode="stretch" />
                <View style={{ margin: 10 }} />
            </View>

            <DrawerItemList {...props} />
        </DrawerContentScrollView>
    );
}

const AppHome = () => {

    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <SwitchProvider value={{ isEnabled, setIsEnabled, toggleSwitch }}>
            <NavigationContainer>
                <Stack.Navigator initialRouteName="Splash">
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false }} />
                    <Stack.Screen name="Mode" component={Mode} options={{ headerShown: false }} />
                    <Stack.Screen name="Loginst" component={Loginst} options={{ headerShown: false }} />
                    <Stack.Screen name="Loginad" component={Loginad} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                    <Stack.Screen name="AddPostScreen" component={AddPostScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Home" options={{ headerShown: false, backBehavior: 'none' }}>

                        {() => (
                            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
                                screenOptions={{
                                    drawerActiveBackgroundColor: '#7b2cbf',
                                    drawerInactiveTintColor: '#333',
                                    drawerActiveTintColor: '#fff',
                                    headerShown: false,
                                }}>

                                <Drawer.Screen name="Dashboard " component={Home}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 10 }}>
                                                <Icon
                                                    name="home"
                                                    size={30}
                                                    color={'white'}
                                                    backgroundColor="#000"
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 4 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={30}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                    })} />

                                <Drawer.Screen name="About" component={About}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 20 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={25}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                    })} />

                                <Drawer.Screen name="Settings" component={Settings}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 20 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={25}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                    })} />

                                <Drawer.Screen name="Contact Us" component={Contact}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 20 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={25}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                    })} />

                            </Drawer.Navigator>
                        )}
                    </Stack.Screen>

                    <Stack.Screen name="Admin" options={{ headerShown: false, backBehavior: 'none' }}>

                        {() => (
                            <Drawer.Navigator drawerContent={props => <CustomDrawerContent {...props} />}
                                screenOptions={{
                                    drawerActiveBackgroundColor: '#7b2cbf',
                                    drawerInactiveTintColor: '#333',
                                    drawerActiveTintColor: '#fff',
                                    headerShown: false,
                                }}>

                                <Drawer.Screen name="Admin " component={Admin}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 10 }}>
                                                <Icon
                                                    name="home"
                                                    size={30}
                                                    color={'white'}
                                                    backgroundColor="#000"
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 4 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={30}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                    })} />

                                <Drawer.Screen name="About" component={About}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 20 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={25}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                    })} />

                                <Drawer.Screen name="Settings" component={Settings}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 20 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={25}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                    })} />

                                <Drawer.Screen name="Contact Us" component={Contact}
                                    options={({ navigation }) => ({
                                        headerLeft: () => (
                                            <View style={{ marginLeft: 20 }}>
                                                <Icon.Button
                                                    name="menu"
                                                    size={25}
                                                    backgroundColor="#000"
                                                    onPress={() => navigation.openDrawer()}
                                                />
                                            </View>
                                        ),
                                        headerTitleStyle: { color: 'white' },
                                        headerStyle: { backgroundColor: 'black' },
                                    })} />

                            </Drawer.Navigator>
                        )}
                    </Stack.Screen>
                </Stack.Navigator>
            </NavigationContainer>
        </SwitchProvider>
    );
};

export default AppHome;
