import React from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import PostScreen from '/screens/PostScreen';
import CommentsScreen from '/screens/CommentsScreen';
import Search from '/screens/Search';

import NavBar from '/elements/NavBar';

enableScreens();
const Stack = createNativeStackNavigator();

const AppContainer = () => {
  return (
    <NavigationContainer>
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
