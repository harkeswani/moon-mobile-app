import React, { memo } from 'react';
import { Image, ImageRequireSource } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, Avatar, Icon } from '@ui-kitten/components';

// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';

// ----------------------------- Components -----------------------------------
import { Text, HStack, VStack } from 'components';
import Carousel from 'react-native-reanimated-carousel';
import { useSharedValue } from 'react-native-reanimated';
import Pagination from 'components/Pagination';

import { useNavigation } from '@react-navigation/native';

// ----------------------------- @Types -----------------------------------

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

const ModernPost = memo(({ data, onPress }: { data: PostContentProps; onPress: (link: string) => void }) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const size_image = 367 * (width / 375);

  const [activeIndex, setActiveIndex] = React.useState(0);
    
  const navigation = useNavigation();

  const {title, author, description, subreddit, tags, upvotes, comments, image, time, link} = data;
  const imageUrl = image && image.replace(/^\/\//, '');
  console.log(imageUrl);

  const progress = useSharedValue(0);

  return (
    <VStack mb={24}>
      <HStack ml={16} mr={12} mb={12}>
        <HStack itemsCenter gap={12}>
          <VStack gap={4}>
            <HStack gap={4}>
              <Text category="h5">{title}</Text>
            </HStack>
            <Text category="subhead" status="placeholder">
              {time}
            </Text>
          </VStack>
        </HStack>
        <Icon pack="assets" name="dots-three-vertical" />
      </HStack>
      <VStack level="2" mh={4} border={16}>
        <VStack style={styles.layout} level="1">
          <Text category="c1" status="platinum">
            {activeIndex + 1} - {0} // Num images
          </Text>
        </VStack>
      </VStack>
      <HStack mt={10} mb={6} itemsCenter mr={12}>
        <HStack>
          <HStack gap={8} ph={16} pv={8} itemsCenter>
            <Icon pack="assets" name="crown" style={styles.smallIcon} />
            <Text category="subhead" status="platinum">
              {"post.crown"}
            </Text>
          </HStack>
          <HStack gap={8} ph={16} pv={8} itemsCenter>
            <Icon pack="assets" name="crown" style={styles.smallIcon} />
            <Text category="subhead" status="platinum">
              {"post.crown"}
            </Text>
          </HStack>
          <HStack gap={8} ph={16} pv={8} itemsCenter>
            <Icon pack="assets" name="crown" style={styles.smallIcon} />
            <Text category="subhead" status="platinum">
              {"post.crown"}
            </Text>
          </HStack>
        </HStack>
        <Icon pack="assets" name="bookmark" style={styles.bookmark} />
      </HStack>
    </VStack>
  );
});

export default ModernPost;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  layout: {
    position: 'absolute',
    top: 8,
    right: 8,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
  },
  layoutSong: {
    position: 'absolute',
    bottom: 28,
    left: 12,
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
  },
  layoutPagination: {
    position: 'absolute',
    bottom: 12,
    alignSelf: 'center',
  },
  smallIcon: {
    width: 16,
    height: 16,
  },
  bookmark: {
    width: 24,
    height: 24,
  },
});
