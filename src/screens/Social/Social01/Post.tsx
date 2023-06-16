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
import Pagination from './Pagination';

// ----------------------------- @Types -----------------------------------

interface IPostProps {
  user: {
    id: string;
    name: string;
    avatar: any;
    verified: boolean;
  };
  upload_time: string;
  crown: string;
  commends: string;
  upload: string;
  images: ImageRequireSource[];
  song: string;
}

const Post = memo(({ post }: { post: IPostProps }) => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  const size_image = 367 * (width / 375);

  const { avatar, name, verified } = post.user;
  const [activeIndex, setActiveIndex] = React.useState(0);

  const progress = useSharedValue(0);

  return (
    <VStack mb={24}>
      <HStack ml={16} mr={12} mb={12}>
        <HStack itemsCenter gap={12}>
          <Avatar source={avatar} size="tiny" />
          <VStack gap={4}>
            <HStack gap={4}>
              <Text category="h5">{name}</Text>
              {verified && <Icon pack="assets" name="radio-active" />}
            </HStack>
            <Text category="subhead" status="placeholder">
              {post.upload_time}
            </Text>
          </VStack>
        </HStack>
        <Icon pack="assets" name="dots-three-vertical" />
      </HStack>
      <VStack level="2" mh={4} border={16}>
        <VStack style={styles.layout} level="1">
          <Text category="c1" status="platinum">
            {activeIndex + 1} - {post.images.length}
          </Text>
        </VStack>
        <Carousel
          width={size_image}
          height={size_image}
          data={post.images}
          style={{ width: '100%' }}
          onProgressChange={(_, absoluteProgress) => {
            progress.value = absoluteProgress;
          }}
          onSnapToItem={(i) => setActiveIndex(i)}
          renderItem={({ item: image }) => {
            return (
              <VStack>
                <Image source={image} style={{ width: size_image, height: size_image }} />
              </VStack>
            );
          }}
        />
        <VStack style={styles.layoutSong} level="1">
          <Text category="subhead" status="platinum" children={`🎹   ${post.song}`} />
        </VStack>
        <VStack style={styles.layoutPagination}>
          <Pagination data={post.images} animValue={progress} activeWidth={20} />
        </VStack>
      </VStack>
      <HStack mt={10} mb={6} itemsCenter mr={12}>
        <HStack>
          <HStack gap={8} ph={16} pv={8} itemsCenter>
            <Icon pack="assets" name="crown" style={styles.smallIcon} />
            <Text category="subhead" status="platinum">
              {post.crown}
            </Text>
          </HStack>
          <HStack gap={8} ph={16} pv={8} itemsCenter>
            <Icon pack="assets" name="crown" style={styles.smallIcon} />
            <Text category="subhead" status="platinum">
              {post.crown}
            </Text>
          </HStack>
          <HStack gap={8} ph={16} pv={8} itemsCenter>
            <Icon pack="assets" name="crown" style={styles.smallIcon} />
            <Text category="subhead" status="platinum">
              {post.crown}
            </Text>
          </HStack>
        </HStack>
        <Icon pack="assets" name="bookmark" style={styles.bookmark} />
      </HStack>
    </VStack>
  );
});

export default Post;

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
