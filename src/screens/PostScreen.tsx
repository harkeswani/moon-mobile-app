import React, { useState, useEffect, useCallback } from 'react';
import { Image, ActivityIndicator, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, ViewPager, Avatar } from '@ui-kitten/components';
// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Content, Text, HStack, VStack } from 'components';
import TabBar from './TabBar';
import { Images } from 'assets/images';
import Post from 'components/Post';
import NavBar from 'elements/NavBar';
import * as WebBrowser from 'expo-web-browser';
import cheerio from 'cheerio';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';

import { fetchPostsOnPage, cancelFetch } from 'services/fetchParsePage.js';

const PostScreen = ({ navigation, route }) => {
  
  // Make sure the route object is defined before accessing parameters
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [posts, setPosts] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [sortMethod, setSortMethod] = useState(TABS[initialActiveTabIndex]);
  const [loading, setLoading] = useState(false); // Added loading state
  const [moreLoading, setMoreLoading] = useState(false); // Added loading state
  const [active, setActive] = React.useState(0);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
  const [subredditName, setSubredditName] = useState('');

  const blockAds = true;

  useEffect(() => {
    if (route && route.params && route.params.subredditName) {
      setSubredditName(route.params.subredditName);
    }
  }, [route.params]);

  useEffect(() => {
    fetchRedditPosts();
  }, [subredditName, sortMethod]);
  
  const fetchRedditPosts = useCallback(async () => {
  setLoading(true);
  let url = 'https://old.reddit.com/';
  if (subredditName) {
    url += 'r/' + subredditName + '/';
  }
  url += `${sortMethod}/`;
  const parsedData = await fetchPostsOnPage(url);
  setPosts(parsedData.parsedPosts);
  setNextPageUrl(parsedData.nextPageUrl);
  setLoading(false);
}, [sortMethod, subredditName]);
  const loadNextPage = async () => {
    setMoreLoading(true);
    const parsedData = await fetchPostsOnPage(nextPageUrl);
    setPosts((prevPosts) => [...prevPosts, ...parsedData.parsedPosts]);
    setNextPageUrl(parsedData.nextPageUrl);
    setMoreLoading(false);
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isNearBottom = contentSize.height - contentOffset.y <= 1000;
    const currentTime = Date.now();
    if (!loading && !moreLoading && isNearBottom) {
      loadNextPage();
    }
  };

  const handlePostPress = (post) => {
    navigation.navigate('CommentsScreen', { postContent: post });
  };

  const handleSearch = () => {
    setIsEditing(false);
    fetchRedditPosts();
  };
    
  return (
    <Container style={styles.container}>
      <ScrollView
      style={styles.content}
      onScroll={handleScroll}
      scrollEventThrottle={16} // Adjust the throttle value as per your needs
      >
      <TabBar
        tabs={TABS}
        activeIndex={active}
        onChange={(index) => {
          setActive(index);
          setSortMethod(TABS[index]);
        }}
      />
      {loading ? (
          <ActivityIndicator style={styles.loadingIndicator} /> // Show loading indicator while content is being fetched
      ) : (
        <Content vertical contentContainerStyle={styles.contentPost} onScroll={handleScroll}>
          {posts.map((post, index) => (
          <Post
            key={index}
            data={{
              title: post.title,
              description: post.description,
              subreddit: post.subreddit,
              tags: post.tags,
              upvotes: post.upvotes,
              comments: post.comments,
              image: post.image,
              time: post.time,
              link: post.link,
            }}
            type='feed'
            onPress={handlePostPress}
          />
        ))}
        <ActivityIndicator style={styles.loadingIndicator} />
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

const TABS = ['top', 'best', 'hot', 'new', 'rising', 'controversial'];
const initialActiveTabIndex = 1; // Set the desired initial active tab index

export default PostScreen;