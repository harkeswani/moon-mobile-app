import React, { memo, useState, useCallback, useRef } from 'react';
import { ImageRequireSource, ColorValue, Image, TouchableOpacity, Dimensions, View, Button } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { Avatar, Icon, Input, StyleService, TopNavigation, useStyleSheet, useTheme } from '@ui-kitten/components';

// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from '@react-navigation/native';
// ----------------------------- Components -----------------------------------
import { HStack, Text, VStack } from 'components';

import FastImage from 'react-native-fast-image';

import ImageView from "react-native-image-viewing";

import { Video, ResizeMode } from 'expo-av';

import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

interface PostContentProps {
  id: string;
  subreddit: string;
  title: string;
  description: string;
  author: string;
  tags: string;
  score: number;
  num_comments: number;
  media: string[];
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
    
  const [mediaDownloaded, setMediaDownloaded] = useState<string[]>([]);

  const {title, author, description, subreddit, tags, score, num_comments, permalink, media, url, created_utc, collapsedContent} = data;

  const toggleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };
    
  const checkgifv = (url?: string): boolean => {
    if (!url) return false;
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.gifv'];
    const lowercasedUrl = url.toLowerCase();
    return imageExtensions.some(ext => lowercasedUrl.endsWith(ext));
  };
                     
  const isImage = (url) => {
    return /\.(jpg|jpeg|png|gif)$/i.test(url);
  };
                     
  const imageWidth = Dimensions.get('window').width - 16;
    
  // Carousel Configuration
  const carouselRef = useRef<Animated.ScrollView>(null);
  const scrollOffset = useSharedValue(0);
  const currentIndex = useSharedValue(0);
    
  const video = React.useRef(null);
    
  const handleCarouselPress = () => {
    // Handle carousel image press here
  }
    
  const handleScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    scrollOffset.value = offsetX;
    currentIndex.value = Math.round(offsetX / imageWidth);
  };
    
  const animatedCarouselStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: -scrollOffset.value,
        },
      ],
    };
  });
    
  const handleImageDownloaded = (nativeEvent) => {
  const { width, height, source } = nativeEvent.source;
  const aspectRatio = width / height;
      const imageWidth = Dimensions.get('window').width;
    const imageHeight = imageWidth / aspectRatio;
    if (imageHeight>400){
        setTallestImageHeight(400);
    } else {
        setTallestImageHeight(imageHeight);
    }
  };
  
  const [tallestImageHeight, setTallestImageHeight] = useState(400);
    
  const [videoHeight, setVideoHeight] = useState(400);
  
  return (
      <VStack style={styles.container} level="2" border={4}>
        <TouchableOpacity onPress={() => {(type=='comments')?toggleCollapsed():onPress(data)}}>
        <VStack gap={0} padding={8}>
          <Text category="subhead">{title}</Text>
          <HStack>
            <Text appearance="hint" category="c1" style={styles.subreddit}>{subreddit}</Text>
            <Icon pack="assets" name="dots-three-vertical" />
          </HStack>
        </VStack>
        </TouchableOpacity>
        {media[0] && (
          <Animated.ScrollView
            ref={carouselRef}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={true}
            onScroll={handleScroll}
            scrollEventThrottle={16}
            style={[styles.scrollView, { height: tallestImageHeight, width: Dimensions.get('window').width }]}
            rerenderTrigger={tallestImageHeight}
          >
            {media.map((item: string, index: number) => {
            if (isImage(item)) {
              return (
                <Image
                  key={index}
                  source={{ uri: item }}
                  style={{ aspectRatio: Dimensions.get('window').width/tallestImageHeight }}
                  resizeMode="contain"
                  onLoad={({ nativeEvent }) => handleImageDownloaded(nativeEvent)}
                />
              );
            } else {
              return (
              <View key={index}>
      <Video
        ref={video}
        style={styles.video}
        source={{
          uri: item,
        }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping
      />
    </View>
        );
            }
          })}

          </Animated.ScrollView>
        )}
        {description && description!='undefined' && !isCollapsed && <Text appearance="hint" style={styles.descriptionText}>{description.trim()}</Text>}
          
        <TouchableOpacity onPress={() => {(type=='comments')?toggleCollapsed():onPress(data)}}>
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
      </TouchableOpacity>
      </VStack>
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
  scrollView: {
    backgroundColor: 'black', // Set the background color to black
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
    // figure out your image aspect ratio
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
  video: {
    alignSelf: 'center',
    aspectRatio: 1,
    width: 375,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});