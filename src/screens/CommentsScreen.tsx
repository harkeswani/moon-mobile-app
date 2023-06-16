import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, View, Text, Alert } from 'react-native';
import cheerio from 'cheerio';

const CommentsScreen = ({ postUrl }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchComments();
  }, []);

  const fetchComments = async () => {
    try {
      const response = await fetch(postUrl);
      const html = await response.text();
      const parsedComments = parseCommentsFromHTML(html);
      setComments(parsedComments);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
      Alert.alert('Failed to fetch comments');
    }
  };

  const parseCommentsFromHTML = (htmlContent) => {
    const $ = cheerio.load(htmlContent);
    const comments = [];

    $('.comment').each((index, element) => {
      const $comment = $(element);
      const author = $comment.find('.author').text();
      const text = $comment.find('.md').text();
      const points = parseInt($comment.find('.score.likes').text());
      const timestamp = $comment.find('.live-timestamp').text();
      const childrenCount = $comment.find('.numchildren').text();

      const comment = {
        author,
        text,
        points,
        timestamp,
        childrenCount,
      };

      comments.push(comment);
    });

    return comments;
  };

  if (loading) {
    return <ActivityIndicator />;
  }

  return (
    <ScrollView>
      {comments.map((comment, index) => (
        <View key={index}>
          <Text>{comment.author}</Text>
          <Text>{comment.text}</Text>
          <Text>{comment.points} points</Text>
          <Text>{comment.timestamp}</Text>
          <Text>{comment.childrenCount}</Text>
        </View>
      ))}
    </ScrollView>
  );
};

export default CommentsScreen;