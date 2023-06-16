import React, { memo } from "react";
import { View, Image } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
  Avatar,
  Icon,
} from "@ui-kitten/components";

// ----------------------------- @Types -----------------------------------
// ----------------------------- Hook -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";

// ----------------------------- Components -----------------------------------
import {
  NavigationAction,
  Container,
  Content,
  Text,
  VStack,
  HStack,
} from "components";
import { Images } from "assets/images";

const ListFriends = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <VStack style={styles.content}>
      {DATA.map((item, index) => {
        return (
          <HStack key={index} itemsCenter ml={32} mr={28}>
            <HStack justify="flex-start" gap={12}>
              <Avatar source={item.avatar} size="tiny" />
              <VStack gap={4}>
                <Text category="h5">{item.name}</Text>
                <Text category="h6" style={styles.describe}>
                  {item.describe}
                </Text>
              </VStack>
            </HStack>
            <Icon
              pack="assets"
              name="plus-circle-fill"
              style={styles.plusIcon}
            />
          </HStack>
        );
      })}
    </VStack>
  );
});

export default ListFriends;

const themedStyles = StyleService.create({
  content: {
    width: "100%",
    minHeight: "150%",
    gap: 24,
    paddingTop: 24,
    justifyContent: "flex-start",
  },
  plusIcon: {
    width: 32,
    height: 32,
  },
  describe: {
    color: "color-basic-700",
  },
});

const DATA = [
  {
    avatar: Images.avatar.avatar_01,
    name: "Floyd Miles",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_02,
    name: "Guy Hawkins",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_03,
    name: "Leslie Alexander",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_04,
    name: "Darlene Robertson",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_05,
    name: "Jacob Jones",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_01,
    name: "Philip Schmidt",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_03,
    name: "Cameron William",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_04,
    name: "Floyd Miles",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_01,
    name: "Floyd Miles",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_02,
    name: "Guy Hawkins",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_03,
    name: "Leslie Alexander",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_04,
    name: "Darlene Robertson",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_05,
    name: "Jacob Jones",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_01,
    name: "Philip Schmidt",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_03,
    name: "Cameron William",
    describe: "1 mutual goals",
  },
  {
    avatar: Images.avatar.avatar_04,
    name: "Floyd Miles",
    describe: "1 mutual goals",
  },
];
