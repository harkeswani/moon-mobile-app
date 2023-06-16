import React, { memo } from 'react';
import { TouchableOpacity } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, useTheme, StyleService, useStyleSheet, Icon } from '@ui-kitten/components';
// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Content, Text, VStack } from 'components';
import {LinearGradient} from 'expo-linear-gradient';
import { Images } from 'assets/images';
import Post from './Post';
import BottomBarSocial from 'elements/Social/BottomBarSocial';

const Social05 = memo(() => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <VStack gap={12}>
        <TopNavigation
          accessoryLeft={
            <TouchableOpacity>
              <Icon pack="assets" name="article" style={styles.article} />
            </TouchableOpacity>
          }
          accessoryRight={<NavigationAction icon="notification" />}
        />
        <Text category="h2" marginBottom={8} marginHorizontal={16}>
          Activity
        </Text>
      </VStack>
      <Content contentContainerStyle={styles.content}>
        <LinearGradient
          style={styles.linear}
          colors={['#FFFCD7', '#CCE0FF']}
          start={{ x: 0.3, y: 1.5 }}
          end={{ x: 0.2, y: 0.6 }}>
          <VStack>
            <Text status="black" category="h4" marginBottom={6}>
              Send Request
            </Text>
            <Text category="subhead" style={{ color: theme['color-basic-400'] }}>
              13 peoples
            </Text>
          </VStack>
          <Icon pack="assets" name="arrow-right" style={styles.arrow} />
        </LinearGradient>
        <VStack mv={24}>
          {DATA.map((item, i) => {
            return <Post post={item} key={i} />;
          })}
        </VStack>
      </Content>
      <BottomBarSocial withLogo/>
    </Container>
  );
});

export default Social05;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  article: {
    width: 28,
    height: 28,
  },
  linear: {
    marginHorizontal: 16,
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  arrow: {
    tintColor: 'text-primary-color',
    width: 24,
    height: 24,
  },
  content: {},
});
const DATA_USER = [
  { id: '1', name: 'Albert Flores', avatar: Images.avatar.avatar_01, verified: true },
  { id: '2', name: 'Brooklyn Simmons', avatar: Images.avatar.avatar_02, verified: false },
];
const DATA = [
  {
    user: DATA_USER[0],
    title: 'Top 10 coach finance',
    data: [
      {
        name: 'Brooklyn Simmons',
        avatar: Images.avatar.avatar_02,
        cover: Images.social.cover,
        follow: '15k',
        followed: false,
      },
      {
        name: 'Brooklyn Simmons',
        avatar: Images.avatar.avatar_02,
        cover: Images.social.cover,
        follow: '15k',
        followed: true,
      },
    ],
  },
  {
    user: DATA_USER[1],
    title: 'Top 10 coach finance',
    data: [
      {
        name: 'Brooklyn Simmons',
        avatar: Images.avatar.avatar_02,
        cover: Images.social.cover,
        follow: '15k',
        followed: false,
      },
      {
        name: 'Brooklyn Simmons',
        avatar: Images.avatar.avatar_02,
        cover: Images.social.cover,
        follow: '15k',
        followed: false,
      },
    ],
  },
];
