import { ImageBackground, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import Ionicons from 'react-native-vector-icons/Ionicons'

const CustomDrawer = (props) => {
  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props} contentContainerStyle={{ backgroundColor: '#c77dff' }}>
        <Image source={require('../assests/images/1.jpg')} style={{ width: 60, height: 60, borderRadius: 40, marginBottom: 30, marginTop: 20 }} />
        <View style={{ flex: 1, backgroundColor: '#fff', paddingTop: 10 }}>
          <DrawerItemList {...props}>

          </DrawerItemList>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 20, borderTopWidth: 1, borderColor: '#ccc' }}>
        <TouchableOpacity style={{ paddingVertical: 15 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Ionicons name="exit-outline" size={22} />

            <Text>Sign Out</Text>
          </View>

        </TouchableOpacity>

      </View>
    </View>
  )
}

export default CustomDrawer

const styles = StyleSheet.create({})