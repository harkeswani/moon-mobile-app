import React, { useState, useRef, useEffect } from 'react';
import { View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Modal, TextInput, StyleSheet, Dimensions, Keyboard } from 'react-native';
import { Avatar, Icon, Input, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';
import { useNavigation } from '@react-navigation/native';

// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Content, Text, HStack, VStack, IDivider } from 'components';
import {LinearGradient} from 'expo-linear-gradient';
import { Images } from 'assets/images';
import keyExtractorUtil from 'utils/keyExtractorUtil';
import { FlashList } from "@shopify/flash-list";

import Post from 'components/Post';

const DropSearch = ({ onClose, onSubredditChange }) => {
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [moreLoading, setMoreLoading] = useState(false);

  const searchInputRef = useRef(null);
  const timeoutRef = useRef(null);
    
  const navigation = useNavigation();

  const handleSearch = async (searchText) => {
    // Implement your search functionality here
      try {
        setMoreLoading(true);
        const response = await fetch("http://74.50.93.99:8080/search/relevance?q="+searchText);
        const data = await response.json();
        console.log(data['results']);
        setSearchResults(data['results']);
        setMoreLoading(false);
      } catch (error) {
        console.error('API request failed:', error);
        setMoreLoading(false);
      }
  };
    
  const handlePostPress = (post) => {
    console.log("Hello");
    navigation.navigate('CommentsScreen', { postContent: post });
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
    
  const handleInputChange = (text) => {
    console.log(text);
    setSearchText(text);
    clearTimeout(timeoutRef.current); // Clear any existing timeout
    timeoutRef.current = setTimeout(() => handleSearch(text), 200); // Delayed search after 200 milliseconds
  };

  return (
    <TouchableWithoutFeedback style={styles.overlay} onPress={onClose}>
      <View style={styles.overlay}>
        <View style={styles.container} onStartShouldSetResponder={handleContainerPress}>
          <Input
            size="small"
            placeholder="Search posts…"
            style={styles.search}
            value={searchText}
            onChangeText={handleInputChange}
            onSubmitEditing={handleSearch}
            ref={searchInputRef}
            returnKeyType="search"
            blurOnSubmit={false}
            autoFocus
          />
          <View style={styles.responseContainer}>
            <FlatList
              data={searchResults}
              keyExtractor={(item, index) => 'post_' + index}
              renderItem={({ item, index }) => {
                const modifiedData = { ...item, collapsedContent: false };
                return <Post data={modifiedData} type='feed' />;
              }}
              onPress={() => handlePostPress(item)}
              estimatedItemSize={200}
              />
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
    backgroundColor: 'rgba(255, 255, 255, 0)',
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
