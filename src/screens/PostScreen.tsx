import React, { memo, useEffect, useState } from 'react';
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

import { fetchRedditPosts } from 'services/fetchParseWorker.js';

const PostScreen = ({ navigation, route }) => {
    
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const [posts, setPosts] = useState([]);
  const [subredditName, setSubredditName] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [sortMethod, setSortMethod] = useState(TABS[initialActiveTabIndex]);
  const [loading, setLoading] = useState(false); // Added loading state
  const [moreLoading, setMoreLoading] = useState(false); // Added loading state
  const [active, setActive] = React.useState(0);
  const [nextPageUrl, setNextPageUrl] = useState('');
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [searchInput, setSearchInput] = useState('');
    
  const blockAds = true; // Set to true to block ads
    
  useEffect(() => {
    fetchRedditPosts();
  }, [subredditName, sortMethod]);
  
  const fetchRedditPosts = async () => {
    try {
      setLoading(true);
      let url = 'https://old.reddit.com/';
      if (subredditName) {
        url += 'r/'+subredditName+'/';
      }
      url += `${sortMethod}/`;

      const response = await fetch(url);
      console.log(url);
      const html = await response.text();
      const parsedPosts = parsePostsFromHTML(html);
      setPosts(parsedPosts);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Subreddit does not exist');
    }
  };
  const loadNextPage = async () => {
  try {
    setMoreLoading(true);
    console.log(nextPageUrl);
    const response = await fetch(nextPageUrl);
    const html = await response.text();
    const parsedPosts = parsePostsFromHTML(html);
    setPosts((prevPosts) => [...prevPosts, ...parsedPosts]);

    const $ = cheerio.load(html);
    const nextButtonUrl = $('.next-button a').attr('href');
    setNextPageUrl(nextButtonUrl);

    setMoreLoading(false);
  } catch (error) {
    setLoading(false);
    console.log(error);
  }
  };

  const handleScroll = (event) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const isNearBottom = contentSize.height -  contentOffset.y <= 4000;
    if (isNearBottom && !moreLoading) {
      loadNextPage();
    }
  };
  const parsePostsFromHTML = (htmlContent) => {
  const $ = cheerio.load(htmlContent);

  const posts = [];
  const nextButtonUrl = $('.next-button a').attr('href');
  setNextPageUrl(nextButtonUrl);
  // Iterate over each post element
  $('.thing').each((index, element) => {
    const $post = $(element);
    // Extract the desired information
    const title = $post.find('.title > a.title').text();
    const description = 'undefined';
    const tags = $post.find('.linkflairlabel').text();
    const subreddit = $post.find('.subreddit').text();
    const photoOrLink = $post.find('.thumbnail').attr('href');
    const upvotes = parseInt($post.find('.score.likes').text());
    const commentText = $post.find('.bylink.comments').text();
    const comments = isNaN(parseInt($post.find('.bylink.comments').text()))?0:parseInt($post.find('.bylink.comments').text());
    const time = $post.find('.live-timestamp').text();
    if (time=='' && blockAds){
        return;
    }
    let image = undefined;
    const link = $post.find('.bylink.comments').attr('href');
    let website = undefined;

    data = $post.attr('data-url');
    if (data && data.startsWith('http')) {
      if (/\.(jpg|jpeg|png|gif)$/i.test(data)){
         image = data;
      } else {
          website = data;
      }
    }
    

    console.log(image);

    // Construct the post object
    const post = {
      title,
      description,
      subreddit,
      tags,
      upvotes,
      comments,
      image,
      time,
      link,
    };

    // Push the post object to the posts array
    posts.push(post);
  });

  return posts;
};

  const handlePostPress = (post) => {
    navigation.navigate('CommentsScreen', { postContent: post });
  };

  const handleSearch = () => {
    setIsEditing(false);
    fetchRedditPosts();
  };
    
  const onRefresh = () => {
    setRefreshing(true);
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