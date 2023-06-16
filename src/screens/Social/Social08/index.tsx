import React, { memo } from 'react';
import { FlatList, TouchableOpacity } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { Avatar, Icon, Input, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';

// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Content, Text, HStack, VStack, IDivider } from 'components';
import {LinearGradient} from 'expo-linear-gradient';
import { Images } from 'assets/images';
import keyExtractorUtil from 'utils/keyExtractorUtil';

enum StatusEnum {
  online = 'ONLINE',
  offline = 'OFFLINE',
}

const Social08 = memo(() => {
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation accessoryLeft={<NavigationAction />} title="508 Comments" alignment="center" />
      <FlatList
        keyExtractor={keyExtractorUtil}
        ListHeaderComponent={() => (
          <LinearGradient colors={['#CFE1FD', '#FFFDE1']} style={styles.linear}>
            <HStack itemsCenter mh={16}>
              <HStack itemsCenter gap={12}>
                <Avatar source={Images.avatar.avatar_04} size="tiny" />
                <VStack>
                  <Text category="h4" status="black">
                    Sing a song 13
                  </Text>
                  <Text category="subhead" status="chambrey">
                    Jane Cooper
                  </Text>
                </VStack>
              </HStack>
              <Icon pack="assets" name="play-circle" style={styles.play} />
            </HStack>
          </LinearGradient>
        )}
        contentContainerStyle={styles.content}
        data={DATA_COMMEND}
        ItemSeparatorComponent={()=>(<IDivider marginBottom={24} />)}
        renderItem={({ item }) => {
          return (
            <HStack gap={16} mb={24} mh={12}>
              <VStack>
                <Avatar source={item.user.avatar} />
                <VStack
                  style={[styles.status, item.user.status === StatusEnum.offline && styles.offline]}
                />
              </VStack>
              <VStack style={{ flex: 1 }} gap={8}>
                <HStack>
                  <Text category="h5">{item.user.name}</Text>
                  <Text category="subhead" status="platinum">
                    {item.time}
                  </Text>
                </HStack>
                <Text category="subhead" status="placeholder">
                  {item.commend}
                </Text>
                <HStack justify="flex-start" itemsCenter gap={40}>
                  <HStack itemsCenter gap={4}>
                    <Icon pack="assets" name="heart" style={styles.icon} />
                    <Text category="h6" status="platinum">
                      {item.liked}
                    </Text>
                  </HStack>
                  <HStack itemsCenter gap={4}>
                    <Icon pack="assets" name="chat-bubble" style={styles.icon} />
                    <Text category="h6" status="platinum">
                      {item.repCommend}
                    </Text>
                  </HStack>
                </HStack>
              </VStack>
            </HStack>
          );
        }}
      />
      <HStack level="2" padding={16} mh={4} border={16} itemsCenter gap={8}>
        <TouchableOpacity>
          <Icon pack="assets" name="plus-circle" style={styles.plus} />
        </TouchableOpacity>
        <HStack level="1" style={{ flex: 1 }} border={16} itemsCenter>
          <Input style={styles.input} placeholder="Leave comment" size="medium" />
          <TouchableOpacity style={styles.buttonSend}>
            <Icon pack="assets" name="paper-plane" style={styles.plane} />
          </TouchableOpacity>
        </HStack>
      </HStack>
    </Container>
  );
});

export default Social08;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: 4,
    paddingBottom: 40
  },
  linear: {
    borderRadius: 16,
    marginBottom: 24,
  },
  play: {
    tintColor: 'text-black-color',
    marginVertical: 20,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: 'text-platinum-color',
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
  offline: {
    backgroundColor: 'text-platinum-color',
  },
  plus: {
    width: 40,
    height: 40,
  },
  plane: {
    width: 16,
    height: 16,
  },
  buttonSend: {
    width: 60,
    height: 48,
    backgroundColor: 'color-primary-default',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    flex: 1,
    backgroundColor: 'background-basic-color-1',
    borderWidth: 0,
  },
});
const DATA_COMMEND = [
  {
    user: { name: 'Albert Flores', avatar: Images.avatar.avatar_01, status: StatusEnum.online },
    time: '13:00',
    liked: 123,
    repCommend: 248,
    commend:
      'Confronting Ageism in the Creative Industry: 5 Invaluable Lessons Learned from Getting Older',
  },
  {
    user: { name: 'Albert Flores', avatar: Images.avatar.avatar_02, status: StatusEnum.offline },
    time: '12:00',
    liked: 123,
    repCommend: 248,
    commend: 'The Art of Doing Nothing',
  },
  {
    user: { name: 'Albert Flores', avatar: Images.avatar.avatar_03, status: StatusEnum.online },
    time: '15:00',
    liked: 123,
    repCommend: 248,
    commend: 'Obsessed: Building a Brand People Love from Day One',
  },
  {
    user: { name: 'Albert Flores', avatar: Images.avatar.avatar_04, status: StatusEnum.online },
    time: '03:00',
    liked: 123,
    repCommend: 248,
    commend: 'How to Channel a Daily Vision into a 20-Year Photography Career',
  },
  {
    user: { name: 'Albert Flores', avatar: Images.avatar.avatar_05, status: StatusEnum.offline },
    time: '07:00',
    liked: 123,
    repCommend: 248,
    commend: 'How to Channel a Daily Vision into a 20-Year Photography Career',
  },
];
