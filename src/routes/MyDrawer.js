import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawer from './CustomDrawer';
import Home from '../screens/Home';
import Ionicons from 'react-native-vector-icons/Ionicons'
import About from '../screens/About';
import Settings from '../screens/Settings';

const Drawer = createDrawerNavigator();
function MyDrawer() {
  return (
    <Drawer.Navigator drawerContent={props => <CustomDrawer{...props} />} screenOptions={{
      headerShown: false,
      drawerLabelStyle: { marginLeft: -25 },
      drawerActiveBackgroundColor: '#7b2cbf',
      drawerInactiveTintColor: '#333',
      drawerActiveTintColor: '#fff'
    }}>
      <Drawer.Screen name="Dashboard" component={Home} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="home-outline" size={22} Color={color} />
        )
      }} />
      <Drawer.Screen name="About" component={About} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="person-outline" size={22} Color={color} />
        )
      }} />
      <Drawer.Screen name="Settings" component={Settings} options={{
        drawerIcon: ({ color }) => (
          <Ionicons name="person-outline" size={22} Color={color} />
        )
      }} />

    </Drawer.Navigator>
  );
};

export default MyDrawer;