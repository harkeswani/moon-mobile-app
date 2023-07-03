import React, { useState } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostScreen from '/screens/PostScreen';
import CommentsScreen from '/screens/CommentsScreen';
import Search from '/screens/Social/Social08';

import { View, FlatList, TouchableOpacity, Modal, TextInput, StyleSheet, Dimensions } from 'react-native';

import TopBar from 'elements/TopBar';
import NavBar from 'elements/NavBar';

import DropSearch from 'elements/DropSearch';

enableScreens();
const Stack = createNativeStackNavigator();

const AppContainer = () => {
  const [isDropSearchOpen, setDropSearchOpen] = useState(false);

  const toggleDropSearch = () => {
    setDropSearchOpen(!isDropSearchOpen);
  };

  return (
    <NavigationContainer>
      <TopBar locationText='Home' toggleDropdown={toggleDropSearch} />
      <Modal visible={isDropSearchOpen} transparent>
        <DropSearch onClose={toggleDropSearch} />
      </Modal>
      <Stack.Navigator
        initialRouteName="PostScreen"
        screenOptions={{
          headerShown: false,
        }}>
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="CommentsScreen" component={CommentsScreen} />
        <Stack.Screen name="Search" component={Search} />
      </Stack.Navigator>
      <NavBar withLogo />
    </NavigationContainer>
  );
};

export default AppContainer;
