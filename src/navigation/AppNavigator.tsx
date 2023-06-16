import * as React from 'react';
import {SocialStackParamList} from 'types/navigation-types';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import PostScreen from 'screens/PostScreen';
import CommentsScreen from 'screens/CommentsScreen';

const Stack = createNativeStackNavigator<SocialStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName="PostScreen">
      <Stack.Screen name="PostScreen">
        {(props) => <PostScreen {...props} navigation={props.navigation} />}
      </Stack.Screen>
      <Stack.Screen name="CommentsScreen">
        {(props) => <CommentsScreen {...props} navigation={props.navigation} />}
      </Stack.Screen>
    </Stack.Navigator>
  );
};
export default AppNavigator;