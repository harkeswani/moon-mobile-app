import React, { memo, useState } from 'react';
import { ImageRequireSource, ColorValue, Image, TouchableOpacity } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { Avatar, Icon, Input, StyleService, TopNavigation, useStyleSheet, useTheme } from '@ui-kitten/components';

// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from '@react-navigation/native';
// ----------------------------- Components -----------------------------------
import { HStack, Text, VStack } from 'components';

import FastImage from 'react-native-fast-image';

interface PostContentProps {
  id: string;
  subreddit: string;
  title: string;
  description: string;
  author: string;
  tags: string;
  score: number;
  num_comments: number;
  image: url;
  url: string;
  permalink: string;
  created_utc: number;
  collapsedContent: Boolean;
}

const Post = ({ data, onPress, type }: { data: PostContentProps; onPress: (link: string) => void }) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
    
  const navigation = useNavigation();
    
  const [isCollapsed, setCollapsed] = useState(false);

  const {title, author, description, subreddit, tags, score, num_comments, permalink, image, url, created_utc, collapsedContent} = data;

  const toggleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };
    
  const checkgifv = (url?: string): boolean => {
    if (!url) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.gifv'];
    const lowercasedUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowercasedUrl.endsWith(ext));
  };
  
  return (
    <TouchableOpacity onPress={() => {(type=='comments')?toggleCollapsed():onPress(data)}}>
      <VStack style={styles.container} level="2" border={4}>
        <VStack gap={0} padding={8}>
          <Text category="subhead">{title}</Text>
          <HStack>
            <Text appearance="hint" category="c1" style={styles.subreddit}>{subreddit}</Text>
            <Icon pack="assets" name="dots-three-vertical" />
          </HStack>
        </VStack>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        {description && description!='undefined' && !isCollapsed && <Text appearance="hint" style={styles.descriptionText}>{description.trim()}</Text>}
        <VStack gap={0} padding={4}>
          <HStack style={styles.meta} alignment="center" justifyContent="space-between">
        <HStack alignment="center">
          <Icon name="caret-up" color={theme['color-primary-500']} />
          <Text appearance="hint" style={styles.metaText}>{isNaN(score) ? '—' : score}</Text>
        </HStack>
        <HStack alignment="center">
          <Icon name="chat-bubble"  color={theme['color-primary-500']} />
          <Text appearance="hint" style={styles.metaText}>{num_comments} comments</Text>
        </HStack>
        <HStack alignment="center">
          <Icon name="timer" color={theme['color-primary-500']} />
          <Text appearance="hint" style={styles.metaText}>{created_utc}</Text>
        </HStack>
      </HStack>

        </VStack>
      </VStack>
      
    </TouchableOpacity>
  );
};

export default Post;

const themedStyles = StyleService.create({
  container: {
    overflow: 'hidden',
  },
  layout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    zIndex: -100,
    borderRadius: 16,
  },
  subreddit: {
    marginBottom: 0,
    color: 'gray',
  },
  description: {
    marginBottom: 0,
  },
  image: {
    width: '100%',
    // Without height undefined it won't work
    height: undefined,
    // figure out your image aspect ratio
    aspectRatio: 1/1,
  },
  meta: {
    marginTop: 0,
  },
  largerIcon: {
    fontSize: 24, // Larger size for the chevron-up icon
  },
  metaText: {
    fontSize: 12,
    marginLeft: 2,
  },
  descriptionText: {
    fontSize: 14, // Increase the font size for better readability
    marginLeft: 2,
    padding: 8, // Add padding to the text box
    backgroundColor: 'transparent', // Set the background color to transparent
    borderRadius: 8, // Add border radius for a rounded box appearance
    lineHeight: 16,
  },
});