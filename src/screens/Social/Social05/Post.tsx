import React, { memo } from 'react';
import { Image } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, Avatar, Icon, Button } from '@ui-kitten/components';

// ----------------------------- Components -----------------------------------
import { Content, Text, HStack, VStack } from 'components';

interface PostProps {
  post: {
    user: {
      id: string;
      name: string;
      avatar: any;
      verified: boolean;
    };
    title: string;
    data: {
      name: string;
      avatar: any;
      cover: any;
      follow: string;
      followed: boolean;
    }[];
  };
}

const Post = memo(({ post }: PostProps) => {
  const styles = useStyleSheet(themedStyles);
  return (
    <VStack style={styles.container}>
      <HStack mh={16} mb={16}>
        <HStack gap={16}>
          <Avatar source={post.user.avatar} size="tiny" />
          <VStack>
            <HStack itemsCenter>
              <Text category="h5">{post.user.name}</Text>
              {post.user.verified && (
                <Icon pack="assets" name="radio-active" style={styles.radio} />
              )}
            </HStack>
            <Text category="subhead" status="placeholder">
              {post.title}
            </Text>
          </VStack>
        </HStack>
        <Icon pack="assets" name="dots-three-vertical" />
      </HStack>
      <Content horizontal contentContainerStyle={styles.content}>
        {post.data.map((item, index) => {
          return (
            <VStack key={index} level="2" mr={8} border={16}>
              {/* @ts-ignore */}
              <Image source={item.cover} style={styles.cover} />
              {/* @ts-ignore */}
              <Avatar source={item.avatar} size="small" style={styles.avatar} />
              <VStack mh={24} mt={16}>
                <Text category="h4">{item.name}</Text>
                <Text category="subhead" status="placeholder">
                  {item.follow}
                </Text>
              </VStack>
              <Button
                children={'Follow'}
                disabled={item.followed}
                size="tiny"
                style={styles.button}
              />
            </VStack>
          );
        })}
      </Content>
    </VStack>
  );
});

export default Post;

const themedStyles = StyleService.create({
  container: {
    marginBottom: 24,
  },
  radio: {
    width: 24,
    height: 24,
  },
  cover: {
    borderRadius: 16,
  },
  avatar: {
    marginTop: -28,
    marginLeft: 24,
  },
  button: {
    margin: 24,
  },
  content: {
    paddingLeft: 78,
  },
});
