import React, { memo } from "react";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { NavigationProp, useNavigation } from "@react-navigation/native";
// ----------------------------- Components & Elements -----------------------------------
import { NavigationAction, Container } from "components";
import IntroList from "elements/App/IntroList";
import ThemeLogo from "elements/App/ThemeLogo";
// ----------------------------- Types -----------------------------------
import { SocialStackParamList } from "types/navigation-types";
import { IntroButtonProps } from "types/element-types";

const SocialIntro = memo(() => {
  const { navigate } = useNavigation<NavigationProp<SocialStackParamList>>();
  const styles = useStyleSheet(themedStyles);

  const data: IntroButtonProps[] = [
    {
      title: "Social 01 : New Feed",
      onPress: () => {
        navigate("Social01");
      },
    },
    {
      title: "Social 02 : Post Details",
      onPress: () => {
        navigate("Social02");
      },
    },
    {
      title: "Social 03 : Home Social",
      onPress: () => {
        navigate("Social03");
      },
    },
    {
      title: "Social 04 : Achievement",
      onPress: () => {
        navigate("Social04");
      },
    },
    {
      title: "Social 05 : Activity",
      onPress: () => {
        navigate("Social05");
      },
    },
    {
      title: "Social 06 : Invite Friends",
      onPress: () => {
        navigate("Social06");
      },
    },
    {
      title: "Social 07 : List Friends",
      onPress: () => {
        navigate("Social07");
      },
    },
    {
      title: "Social 08 : Comments",
      onPress: () => {
        navigate("Social08");
      },
    },
    {
      title: "Social 09 : Reviews",
      onPress: () => {
        navigate("Social09");
      },
    },
    {
      title: "Social 10 : Vote",
      onPress: () => {
        navigate("Social10");
      },
    },
    {
      title: "Social 11 : Survey",
      onPress: () => {
        navigate("Social11");
      },
    },
    {
      title: "Social 12 : Upgrade Premium",
      onPress: () => {
        navigate("Social12");
      },
    },
    {
      title: "Social 13 : Friend-List",
      onPress: () => {
        navigate("Social13");
      },
    },
    {
      title: "Social 14 : Notification",
      onPress: () => {
        navigate("Social14");
      },
    },
  ];
  return (
    <Container style={styles.container}>
      <TopNavigation
        style={styles.topNavigation}
        accessoryLeft={<ThemeLogo />}
      />
      <IntroList data={data} title="Social" />
    </Container>
  );
});

export default SocialIntro;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  topNavigation: {
    paddingHorizontal: 24,
  },
});
