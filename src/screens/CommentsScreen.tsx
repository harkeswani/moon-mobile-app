import React, { useEffect, useState } from 'react';
import { Image, ActivityIndicator, Alert, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { NavigationAction, Container, Content, Text, HStack, VStack } from 'components';
import Post from '/components/Post';
import * as WebBrowser from 'expo-web-browser';
import cheerio from 'cheerio';
import { useLayout } from 'hooks';
import { StyleService, useStyleSheet, ViewPager, Avatar } from '@ui-kitten/components';
import NavBar from 'elements/NavBar';
import TopBar from 'elements/TopBar';
import RecursiveComment from 'components/RecursiveComment';

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
    try {
      setLoading(true);
      const response = await fetch(post.link);
      const html = await response.text();
      const $ = cheerio.load(html);
      const parsedComments = parseCommentsFromHTML($);
      setComments(parsedComments);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
    
  const handleScroll = (event) => {
      
  };

 const parseCommentsFromHTML = ($) => {
  const comments = [];

  const parseComment = ($comment, parentDepth) => {
    const author = $comment.find('.author:first').text();
    const score = parseInt($comment.find('.score.unvoted').attr('title'));
    const timePosted = $comment.find('.live-timestamp:first').text();
    const text = $comment.find('.md:first').text();
    const childComments = [];
    const depth = parentDepth + 1;
   // Check if the comment has a child comment
    if ($comment.has('.child').length > 0) {
      // Select the immediate child comments and iterate over them
      $comment.children('.child').children('.comment').each((index, element) => {
        const $childComment = $(element);
        const childCommentData = parseComment($childComment, depth);
        childComments.push(childCommentData);
      });
    }
    
    return {
      author,
      score,
      timePosted,
      text,
      childComments,
      depth,
    };
  };

  $('.comment').each((index, element) => {
    const $comment = $(element);
    const commentData = parseComment($comment, 0);
    comments.push(commentData);
  });

  return comments;
  };


  return (
    <Container style={styles.container}>
    <TopBar subredditName={'subredditName'} onSearchPress={null} top={top} />
    <ScrollView style={styles.content} >
        <Post data={post} />
        {loading ? (
          <ActivityIndicator style={styles.loadingIndicator} /> // Show loading indicator while content is being fetched
        ) : (
        <Content vertical contentContainerStyle={styles.contentPost} onScroll={handleScroll}>
            <VStack>
                {comments.map((comment, index) => (
                    <RecursiveComment key={index} comment={comment} />
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
  loadingIndicator: {
    padding: 20,
  }
});

export default CommentsScreen;