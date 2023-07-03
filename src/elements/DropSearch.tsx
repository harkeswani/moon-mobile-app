import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, TouchableWithoutFeedback, Modal, TextInput, StyleSheet, Dimensions } from 'react-native';
import { Avatar, Icon, Input, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Content, Text, HStack, VStack, IDivider } from 'components';
import {LinearGradient} from 'expo-linear-gradient';
import { Images } from 'assets/images';
import keyExtractorUtil from 'utils/keyExtractorUtil';

const DropSearch = ({ onClose }) => {
  const [searchText, setSearchText] = useState('');
  const searchInputRef = useRef(null);
    
  const navigation = useNavigation();

  const handleSearch = () => {
    // Implement your search functionality here
    console.log('Perform search with text:', searchText);
    navigation.navigate('PostScreen', { searchText });
    onClose();
  };

  const handleCategoryPress = (category) => {
    // Handle category button press
    console.log('Category:', category);
  };
    
  const handleContainerPress = (event) => {
    // Prevent closing the container when the TouchableOpacity is pressed
    event.stopPropagation();
  };
    
  const handleReturnPress = () => {
    // Trigger search when the return key is pressed
    Keyboard.dismiss();
    handleSearch();
  };
    
  useEffect(() => {
    // Focus on the text input when the DropSearch component is opened
    searchInputRef.current.focus();
  }, []);

  return (
    <TouchableWithoutFeedback style={styles.overlay} onPress={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container} onStartShouldSetResponder={handleContainerPress}>
          <Input
            size="small"
            placeholder="Enter something…"
            style={styles.search}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            ref={searchInputRef}
            returnKeyType="search"
            blurOnSubmit={false}
            autoFocus
          />
          <View style={styles.categoriesContainer}>
            <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress('Category 1')}>
              {/* Category 1 button content */}
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton} onPress={() => handleCategoryPress('Category 2')}>
              {/* Category 2 button content */}
            </TouchableOpacity>
            {/* Add more category buttons as needed */}
          </View>
        
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    position: 'absolute',
    top: Dimensions.get('window').height * 0.15, // Adjust the value as needed to position the modal below the top bar
    width: Dimensions.get('window').width * 0.9, // Adjust the width as needed
    height: Dimensions.get('window').height * 0.4, // Adjust the height as needed
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: 24,
  },
  linear: {
    borderRadius: 32,
    marginBottom: 24,
  },
  search: {
    marginTop: 8,
    marginHorizontal: 8,
    borderRadius: 16,
  },
});

export default DropSearch;
