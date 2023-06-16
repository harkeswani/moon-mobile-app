import React, { memo } from 'react';
import { FlatList } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, StyleService, useStyleSheet } from '@ui-kitten/components';

// ----------------------------- Components -----------------------------------
import { NavigationAction, Container } from 'components';
import { Images } from 'assets/images';
import keyExtractorUtil from 'utils/keyExtractorUtil';
import Post from './Post';

const Social01 = memo(() => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        title={'Feed'}
        alignment="center"
        accessoryLeft={<NavigationAction status="placeholder" icon="popcorn" size="large" />}
        accessoryRight={<NavigationAction status="placeholder" icon="user" size="large" />}
      />
      <FlatList
        keyExtractor={keyExtractorUtil}
        data={DATA}
        contentContainerStyle={styles.contentContainerStyle}
        renderItem={({ item: post }) => {
          return <Post post={post} />;
        }}
      />
    </Container>
  );
});

export default Social01;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  contentContainerStyle: {
    paddingTop: 24,
    paddingBottom: 40,
  },
});

const DATA_USER = [
  { id: '1', name: 'Albert Flores', avatar: Images.avatar.avatar_01, verified: true },
];

const DATA = [
  {
    user: DATA_USER[0],
    upload_time: '15 mins ago',
    crown: '12k',
    commends: '234',
    upload: '528',
    images: [
      Images.social.social01,
      Images.social.social01,
      Images.social.social01,
      Images.social.social01,
      Images.social.social01,
      Images.social.social01,
    ],
    song: 'Why Do You Love Me',
  },
  {
    user: DATA_USER[0],
    upload_time: '15 mins ago',
    crown: '12k',
    commends: '234',
    upload: '528',
    images: [
      Images.social.social02,
      Images.social.social02,
      Images.social.social02,
      Images.social.social02,
      Images.social.social02,
      Images.social.social02,
    ],
    song: 'Why Do You Love Me',
  },
];
