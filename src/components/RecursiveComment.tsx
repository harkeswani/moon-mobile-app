import React, { memo, useState } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { useTheme, Icon, Input, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';

// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Content, Text, HStack, VStack, IDivider } from 'components';

import { fetchPostCommentsOnPage, cancelFetch } from 'services/fetchParsePage.js';

interface Comment {
  author: string;
  score: number;
  text: string;
  timePosted: string;
  numChildren: string;
  childComments?: Comment[];
  depth: number;
  collapsed: Boolean;
  permalink: string;
  loadMore: Boolean;
}

interface RecursiveCommentProps {
  comment: Comment;
}

const RecursiveComment = memo(({ comment, renderDepth }: RecursiveCommentProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { author, score, text, timePosted, numChildren, childComments, depth, collapsed, permalink, loadMore } = comment;

  const renderChildComments = (comments: Comment[] = []) => {
    return comments.map((childComment, index) => (
      <RecursiveComment key={index} comment={childComment} renderDepth={renderDepth+1} />
    ));
  };

  const [isCollapsed, setCollapsed] = useState(false);
    
  const [isLoadingMore, setIsLoadingMore] = useState(false);
    
  const [isLoadingDone, setIsLoadingDone] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };
    
  const loadMoreComments = async (comment) => {
      setIsLoadingMore(true);
      const parsedData = await fetchPostCommentsOnPage(comment.permalink+'?limit=10');
      comment.childComments = parsedData.comments[0].childComments;
      setIsLoadingMore(false);
      setIsLoadingDone(true);
  }

  const offset = (renderDepth-1) * 16;

  const simpleHash = (str) => {
    let hash = 0;
    if (str.length === 0) {
      return hash;
    }
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash;
  };

  const userToColor = (username) => {
    const hash = simpleHash(username);

    const red = (hash & 0xff0000) >> 16; // Extract the red component
    const green = (hash & 0x00ff00) >> 8; // Extract the green component
    const blue = hash & 0x0000ff; // Extract the blue component

    const colorString = `rgb(${red}, ${green}, ${blue})`;
    return colorString;
  };

  const userColor = userToColor(comment.author);

  return (
    <TouchableWithoutFeedback onPress={toggleCollapsed}>
        <View>
    <HStack mt={8} mb={0} ml={offset} gap={8} alignItems="stretch" justifyContent="flex-start">
      <View style={[styles.verticalLine, { backgroundColor: userColor }]} />

        <VStack style={{ flex: 1 }} gap={0}>
          <HStack itemsCenter justifyContent="space-between">
            <HStack itemsCenter gap={4}>
              <Text category="h5">{author}</Text>
              <Icon pack="assets" name="caret-up" />
              <Text category="h6" status="platinum">
                {isNaN(score) ? '—' : score}
              </Text>
            </HStack>
            <Text category="subhead" status="platinum">
              {timePosted}
            </Text>
          </HStack>
          {!isCollapsed ? (
            <Text mb={0} category="subhead" status="placeholder">
              {text.trimEnd()}
            </Text>
          ) : (
            <Text mb={0} category="subhead" status="placeholder">
              {numChildren}
            </Text>
          )}
          {!isCollapsed && loadMore && !isLoadingMore && !isLoadingDone && (
          <TouchableWithoutFeedback onPress={() => loadMoreComments(comment)}>
            <View style={styles.loadMoreContainer}>
              <Text style={styles.loadMoreText}>Load more comments...</Text>
            </View>
          </TouchableWithoutFeedback>
          )}
          {!isCollapsed && loadMore && isLoadingMore && (
          <TouchableWithoutFeedback>
            <View style={styles.loadMoreContainer}>
              <Text style={styles.loadMoreText}>Loading more comments...</Text>
            </View>
          </TouchableWithoutFeedback>
          )}
        </VStack>
    </HStack>
    {!isCollapsed && renderChildComments(childComments)}
    </View>  
    </TouchableWithoutFeedback>
  );
});


export default RecursiveComment;

const themedStyles = StyleService.create({
  verticalLine: {
    width: 2,
    height: '100%',
  },
  loadMoreContainer: {
    alignItems: 'center',
    marginTop: 0,
    borderRadius: 5, // Adjust the border radius as needed
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  loadMoreText: {
    fontSize: 12, // Adjust the size as needed
    fontWeight: '300', // Use '300' for light font weight
  },
});
