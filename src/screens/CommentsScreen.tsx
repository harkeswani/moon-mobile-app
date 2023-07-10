import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { NavigationAction, Container, Content, Text, HStack, VStack } from 'components';
import Post from '/components/Post';
import * as WebBrowser from 'expo-web-browser';
import cheerio from 'cheerio';
import { useLayout } from 'hooks';
import { StyleService, useStyleSheet, ViewPager, Avatar } from '@ui-kitten/components';
import RecursiveComment from 'components/RecursiveComment';

import { fetchPostCommentsOnPage, cancelFetch } from 'services/fetchParsePage.js';

const CommentsScreen = ({ route }) => {
  const { postContent } = route.params;
  const [post, setPost] = useState(postContent);
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  const fetchPostAndComments = async () => {
    setLoading(true);
    const parsedData = await fetchPostCommentsOnPage(post.permalink+'?limit=10');
    console.log(parsedData);
    setComments(parsedData.comments);
    post.description = parsedData.postData[0];
    setPost(post);
    setLoading(false);
  };
    
  const handleScroll = (event) => {
      
  };

  return (
    <Container style={styles.container}>
    <ScrollView style={styles.content} >
        <Post data={post} type='comments' />
        {loading ? (
          <ActivityIndicator style={styles.loadingIndicator} /> // Show loading indicator while content is being fetched
        ) : (
        <Content vertical contentContainerStyle={styles.contentPost} onScroll={handleScroll}>
            <VStack>
                {comments.map((comment, index) => (
                    <RecursiveComment key={index} comment={comment} renderDepth={1} />
                ))}
            </VStack>
        </Content>
      )}
    </ScrollView>
    </Container>
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
    paddingBottom: 50,
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
  loadingIndicator: {
    padding: 20,
  }
});

export default CommentsScreen;