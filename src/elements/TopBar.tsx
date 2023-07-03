import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Avatar, Icon, Input, StyleService, TopNavigation, useStyleSheet, useTheme } from '@ui-kitten/components';
import { NavigationAction, Container, Content, Text, HStack, VStack } from 'components';
import { useNavigation } from '@react-navigation/native';

import DropSearch from 'elements/DropSearch';

const TopBar = ({ backText, locationText, toggleDropdown }) => {
  const navigation = useNavigation();
  const themes = useTheme();
  const styles = useStyleSheet(themedStyles);
    
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  
  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <HStack pt={40} pb={0} level="1" ph={8} pv={4} itemsCenter >
      <TouchableOpacity style={styles.button} onPress={handleBackPress}>
        <HStack itemsCenter>
          <Icon name="caret-left" style={styles.icons} />
          <Text category="h5">Back</Text>
        </HStack>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.center]} onPress={toggleDropdown}>
        <HStack itemsCenter>
          <Text category="h5" >{locationText !== '' ? locationText : 'Home'}</Text>
          <Icon name="caret-down" style={styles.icons} />
        </HStack>
      </TouchableOpacity>
      <HStack itemsCenter>
        <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
          <Icon name="bookmark" style={styles.iconButtons} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={toggleDropdown}>
          <Icon name="dot-six" style={styles.iconButtons} />
        </TouchableOpacity>
      </HStack>
    </HStack>
  );
};

const themedStyles = StyleService.create({
  icons: {
    height: 24,
    width: 24,
    tintColor: 'white',
  },
  iconButtons: {
    height: 32,
    width: 32,
    tintColor: 'white',
  },
  button: {
    padding: 8,  
  },
  center: {
    alignItems: 'center',
    alignSelf: 'center',
    marginLeft: "auto",
    marginRight: "auto",
  },
});

export default TopBar;
