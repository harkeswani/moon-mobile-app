import React, { memo } from 'react';
import { ImageRequireSource, ColorValue, Image, TouchableOpacity } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { useTheme, StyleService, useStyleSheet, Icon } from '@ui-kitten/components';

// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from '@react-navigation/native';
// ----------------------------- Components -----------------------------------
import { HStack, Text, VStack } from 'components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface PostContentProps {
  title: string;
  description: string;
  subreddit: string;
  tags: string;
  upvotes: number;
  comments: number;
  image: string;
  time: string;
  link: string;
}

const Post = memo(({ data }: { data: PostContentProps }) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const {title, description, subreddit, tags, upvotes, comments, image, time, link} = data;
  const imageUrl = image && image.replace(/^\/\//, '');
    
  const handleLinkPress = () => {
    navigate(link);
  };

  return (
    <TouchableOpacity onPress={handleLinkPress}>
      <VStack style={styles.container} level="2" border={8}>
        <VStack gap={0} padding={8}>
          <Text category="h5">{title}</Text>
          <Text appearance="hint" category="c1" style={styles.subreddit}>{subreddit}</Text>
        </VStack>
        {image && typeof image !== "undefined" && (
          <Image source={{ uri: image.startsWith("//") ? `https:${image}` : image }} style={styles.image} />
        )}
        <VStack gap={0} padding={8}>
          <HStack style={styles.meta} alignment="center" justifyContent="space-between">
        <HStack alignment="center">
          <MaterialCommunityIcons name="chevron-up" style={styles.icon, styles.largerIcon} color={theme['color-primary-500']} />
          <Text appearance="hint" style={styles.metaText}>{upvotes}</Text>
        </HStack>
        <HStack alignment="center">
          <MaterialCommunityIcons name="comment" style={styles.icon} color={theme['color-primary-500']} />
          <Text appearance="hint" style={styles.metaText}>{comments} comments</Text>
        </HStack>
        <HStack alignment="center">
          <MaterialCommunityIcons name="clock-outline" style={styles.icon} color={theme['color-primary-500']} />
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
    width: '100%',
    height: 200,
    marginBottom: 0,
    borderRadius: 0,
  },
  meta: {
    marginTop: 0,
  },
  icon: {
    fontSize: 16,
    marginRight: 2,
  },
  largerIcon: {
    fontSize: 24, // Larger size for the chevron-up icon
  },
  metaText: {
    fontSize: 12,
    marginLeft: 2,
  },
});
