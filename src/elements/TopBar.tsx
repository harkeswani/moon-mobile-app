import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useStyleSheet, StyleService } from '@ui-kitten/components';
import { NavigationAction, Container, Content, Text, HStack, VStack } from 'components';

const TopBar = ({ subredditName, onSearchPress, top }) => {
  const styles = useStyleSheet(themedStyles);

  return (
    <HStack pt={top + 4} level="2" ph={12} itemsCenter pv={4}>
      <NavigationAction icon="envelope" />
      <Text category="h5">{subredditName !== '' ? subredditName : 'Home'}</Text>
      <NavigationAction icon="gearsix" />
    </HStack>
  );
};

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  topNavigation: {
    backgroundColor: 'background-basic-color-2',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 100,
  },
  avatar: {
    width: 24,
    height: 24,
  },
  layoutAvatar: {
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'text-white-color',
    position: 'absolute',
    bottom: 8,
    left: 8,
    zIndex: 100,
  },
  contentPost: {
    gap: 8,
    paddingTop: 0,
    paddingLeft: 8,
    paddingRight: 8,
    paddingBottom: 40,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 8,
  },
});

export default TopBar;
