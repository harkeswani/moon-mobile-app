import React, { memo } from 'react';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, useTheme, Avatar, Icon, StyleService, useStyleSheet } from '@ui-kitten/components';

// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Components -----------------------------------
import { NavigationAction, LinearGradientText, Container, Content, Text, HStack, VStack } from 'components';
import { Images } from 'assets/images';
import BottomBarSocial from 'elements/Social/BottomBarSocial';

enum StatusEnum {
  online = 'ONLINE',
  offline = 'OFFLINE',
}

const Social07 = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const TitleField = ({ text, onDetails }: { text: string; onDetails?(): void }) => {
    return (
      <HStack mh={16} mb={16}>
        <LinearGradientText
          text={text}
          colors={['#CFE1FD', '#FFFDE1']}
          textStyle={styles.textTitle}
        />
        <NavigationAction onPress={onDetails} icon="arrow-right" />
      </HStack>
    );
  };
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} alignment="center" title="Friends" />
      <Content>
        <TitleField text="12 Request" />
        <Content horizontal contentContainerStyle={styles.contentRequest}>
          {DATA.map((item, i) => {
            return (
              <VStack
                pv={20}
                key={i}
                mr={4}
                level="2"
                border={16}
                minWidth={156 * (width / 375)}
                itemsCenter>
                <Avatar source={item.avtar} size="small" />
                <Text category="h6" marginVertical={16}>
                  {item.name}
                </Text>
                <Text category="c1" status="placeholder">
                  {item.mutual_friends} mutual friends
                </Text>
                <HStack mt={16} gap={16}>
                  <VStack
                    style={[styles.button, { backgroundColor: theme['color-danger-default'] }]}>
                    <Icon pack="assets" name="close" style={styles.icon} />
                  </VStack>
                  <VStack
                    style={[styles.button, { backgroundColor: theme['color-primary-default'] }]}>
                    <Icon pack="assets" name="check" style={styles.icon} />
                  </VStack>
                </HStack>
              </VStack>
            );
          })}
        </Content>
        <TitleField text="4,680 Friends" />
        <VStack mh={16} gap={24}>
          {DATA_MESS.map((item, i) => {
            return (
              <HStack key={i}>
                <HStack justify="flex-start" gap={16}>
                  <VStack>
                    <Avatar source={item.avatar} size="tiny" />
                    <VStack style={[styles.status,item.status===StatusEnum.offline &&{backgroundColor:theme['background-basic-color-6']}]} />
                  </VStack>
                  <VStack gap={8}>
                    <Text category="h5">{item.name}</Text>
                    <Text category="subhead" status="chambrey">
                      {item.mess}
                    </Text>
                  </VStack>
                </HStack>
                <NavigationAction icon="dots_three_vertical" />
              </HStack>
            );
          })}
        </VStack>
      </Content>
      <BottomBarSocial withLogo/>
    </Container>
  );
});

export default Social07;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  textTitle: {
    fontSize: 24,
    lineHeight: 30,
    fontWeight: '700',
  },
  button: {
    width: 40,
    height: 40,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: 'text-white-color',
  },
  contentRequest: {
    paddingLeft: 16,
    marginBottom: 32,
  },
  status: {
    width: 14,
    height: 14,
    backgroundColor: 'text-primary-color',
    borderWidth: 2,
    borderColor: 'text-white-color',
    position: 'absolute',
    borderRadius: 59,
    bottom: 0,
    right: 0,
  },
});

const DATA = [
  { name: 'Christine Stewart', mutual_friends: 13, avtar: Images.avatar.avatar_01 },
  { name: 'Kathryn Murphy', mutual_friends: 23, avtar: Images.avatar.avatar_02 },
  { name: 'Arlene McCoy', mutual_friends: 3, avtar: Images.avatar.avatar_03 },
  { name: 'Devon Lane', mutual_friends: 11, avtar: Images.avatar.avatar_04 },
  { name: 'Christine Stewart', mutual_friends: 33, avtar: Images.avatar.avatar_05 },
];
const DATA_MESS = [
  {
    name: 'Christine Stewart',
    avatar: Images.avatar.avatar_01,
    status: StatusEnum.online,
    mess: 'Hello! Are you there',
  },
  {
    name: 'Kathryn Murphy',
    avatar: Images.avatar.avatar_02,
    status: StatusEnum.offline,
    mess: '1000+ Screens',
  },
  {
    name: 'Arlene McCoy',
    avatar: Images.avatar.avatar_03,
    status: StatusEnum.online,
    mess: 'React Native & Flutter version',
  },
  {
    name: 'Devon Lane',
    avatar: Images.avatar.avatar_04,
    status: StatusEnum.offline,
    mess: 'This is darkmode app',
  },
  {
    name: 'John Smith',
    avatar: Images.avatar.avatar_05,
    status: StatusEnum.online,
    mess: 'The Art of Doing Nothing',
  },
];
