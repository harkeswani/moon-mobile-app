import React, { memo } from 'react';
import { Image } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet, ViewPager, Avatar } from '@ui-kitten/components';
// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Content, Text, HStack, VStack } from 'components';
import TabBar from './TabBar';
import { Images } from 'assets/images';
import ContentPost from './ContentPost';
import BottomBarSocial from 'elements/Social/BottomBarSocial';

const Social03 = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);

  const [active, setActive] = React.useState(0);
  return (
    <Container style={styles.container}>
      <HStack pt={top + 4} level="2" ph={12} itemsCenter pv={4}>
        <NavigationAction icon="envelope" />
        <Text category="h5">Feed</Text>
        <NavigationAction icon="gearsix" />
      </HStack>
      <Content contentContainerStyle={styles.content}>
        <TabBar tabs={TABS} activeIndex={active} onChange={setActive} />
        <ViewPager selectedIndex={active} onSelect={setActive} swipeEnabled={false}>
          <Content horizontal contentContainerStyle={styles.contentReel}>
            {Reels[0].data.map((item, i) => {
              return (
                <VStack key={i}>
                  <VStack style={styles.layoutAvatar}>
                    {/* @ts-ignore */}
                    <Avatar source={item.avatar} style={styles.avatar} />
                  </VStack>
                  <Image source={item.reel} style={{ width: 120, height: 160 }} />
                </VStack>
              );
            })}
          </Content>
          <VStack></VStack>
          <VStack></VStack>
          <VStack></VStack>
        </ViewPager>
        <Content horizontal contentContainerStyle={styles.contentPost}>
          <ContentPost
            data={{
              title: 'Post Save',
              pages: 3,
              describe: 'Conversion Rate Optimisation',
              image: Images.social.social01,
              color: '#00CD50',
            }}
          />
          <ContentPost
            data={{
              title: 'Tutorial',
              pages: 6,
              describe: 'Conversion Rate Optimisation',
              image: Images.social.social01,
              color: '#106AF3',
            }}
          />
        </Content>
      </Content>
      <VStack
        style={[
          styles.bottom,
          {
            bottom: bottom,
          },
        ]}>
        <BottomBarSocial withLogo />
      </VStack>
    </Container>
  );
});

export default Social03;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  topNavigation: {
    backgroundColor: 'background-basic-color-2',
  },
  content: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  avatar: {
    width: 24,
    height: 24,
  },
  layoutAvatar: {
    borderRadius: 99,
    borderWidth: 1,
    borderColor: 'text-white-color',
    position: 'absolute',
    bottom: 8,
    left: 8,
    zIndex: 100,
  },
  contentReel: {
    gap: 8,
    paddingLeft: 16,
  },
  contentPost: {
    gap: 8,
    padding: 16,
  },
  bottom: {
    position: 'absolute',
    left: 0,
    right: 0,
  },
});

const TABS = ['Hot Today', 'Newest', 'For You', 'Trending'];
const Reels = [
  {
    title: 'Hot Today',
    data: [
      { avatar: Images.avatar.avatar_01, reel: Images.social.reel01 },
      { avatar: Images.avatar.avatar_01, reel: Images.social.reel02 },
      { avatar: Images.avatar.avatar_01, reel: Images.social.reel03 },
    ],
  },
];
