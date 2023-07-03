import React, { memo } from 'react';
import { ImageRequireSource, ColorValue, Image, TouchableOpacity } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { Avatar, Icon, Input, StyleService, TopNavigation, useStyleSheet, useTheme } from '@ui-kitten/components';

// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from '@react-navigation/native';
// ----------------------------- Components -----------------------------------
import { HStack, Text, VStack } from 'components';

interface PostContentProps {
  title: string;
  author: string;
  description: string;
  subreddit: string;
  tags: string;
  upvotes: number;
  comments: number;
  image: string;
  time: string;
  link: string;
}

const Post = memo(({ data, onPress }: { data: PostContentProps; onPress: (link: string) => void }) => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
    
  const navigation = useNavigation();

  const {title, author, description, subreddit, tags, upvotes, comments, image, time, link} = data;
  return (
    <TouchableOpacity onPress={() => onPress(data)}>
      <VStack style={styles.container} level="2" border={4}>
        <VStack gap={0} padding={8}>
          <Text category="subhead">{title}</Text>
          <HStack>
            <Text appearance="hint" category="c1" style={styles.subreddit}>{subreddit}</Text>
            <Icon pack="assets" name="dots-three-vertical" />
          </HStack>
        </VStack>
        {image && <Image source={{ uri: image }} style={styles.image} />}
        <VStack gap={0} padding={4}>
          <HStack style={styles.meta} alignment="center" justifyContent="space-between">
        <HStack alignment="center">
          <Icon name="caret-up" color={theme['color-primary-500']} />
          <Text appearance="hint" style={styles.metaText}>{isNaN(upvotes) ? '—' : upvotes}</Text>
        </HStack>
        <HStack alignment="center">
          <Icon name="chat-bubble"  color={theme['color-primary-500']} />
          <Text appearance="hint" style={styles.metaText}>{comments} comments</Text>
        </HStack>
        <HStack alignment="center">
          <Icon name="timer" color={theme['color-primary-500']} />
          <Text appearance="hint" style={styles.metaText}>{time}</Text>
        </HStack>
      </HStack>

        </VStack>
      </VStack>
      
    </TouchableOpacity>
  );
});

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
    height: 200,
    marginBottom: 0,
    borderRadius: 0,
    backgroundColor: 'black', // Add a black background color for the black bars
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
});
