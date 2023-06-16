import React, { memo } from "react";
import { NativeScrollEvent, NativeSyntheticEvent } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  Input,
  Button,
  Icon,
  ViewPager,
  StyleService,
  TopNavigation,
  useStyleSheet,
  useTheme,
} from "@ui-kitten/components";
// ----------------------------- Hook -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Text, VStack } from "components";
// ----------------------------- Reanimated 2 -----------------------------------
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
// ----------------------------- Elements -----------------------------------
import ListFriends from "./ListFriends";
import Invites from "./Invites";
import TabBar from "./TabBar";

const Social13 = memo(() => {
  const { goBack } = useNavigation();
  const { top } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const progress = useSharedValue(0);
  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    let y = e.nativeEvent.contentOffset.y;
    progress.value = withTiming(y);
  };
  const styledTop = useAnimatedStyle(() => {
    const height = interpolate(
      progress.value,
      [-400, -1, 0, 160, 240, 400],
      [152, 152, 152, 152, 0, 0]
    );
    const opacity = interpolate(
      progress.value,
      [-1, 0, 100, 240, 400],
      [1, 1, 1, 0, 0]
    );
    const _marginTop = interpolate(
      progress.value,
      [-1, 0, 100, 240, 400],
      [-24, -24, -24, 0, 0]
    );
    return {
      height: height,
      backgroundColor: theme["color-primary-default"],
      opacity: opacity,
      paddingHorizontal: 32,
      marginTop: _marginTop,
    };
  });

  const [selected, setSelected] = React.useState(0);

  return (
    <Container style={styles.container}>
      <VStack
        style={{
          backgroundColor: theme["color-primary-default"],
          paddingTop: top + 8,
          marginBottom: -24,
        }}
      >
        <TopNavigation
          style={styles.topNavigation}
          appearance="control"
          alignment="center"
          title={"Friends"}
          accessoryLeft={<NavigationAction />}
        />
        <Animated.View style={styledTop}>
          <VStack gap={10}>
            <Text category="h2">Add Friends</Text>
            <Input
              status="transparent"
              placeholder="Your friend emails"
              accessoryRight={<Icon pack="eva" name="arrow-forward" />}
            />
          </VStack>
        </Animated.View>
      </VStack>
      <VStack style={styles.headerContent}>
        <VStack style={styles.childrenHeader} />
      </VStack>
      <TabBar activeTab={selected} setActiveTab={setSelected} />
      <ViewPager
        selectedIndex={selected}
        onSelect={setSelected}
        style={styles.viewPager}
      >
        <Animated.ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={[styles.content]}
          contentContainerStyle={[styles.contentContainer]}
        >
          <ListFriends />
        </Animated.ScrollView>
        <Animated.ScrollView
          onScroll={onScroll}
          scrollEventThrottle={16}
          style={[styles.content]}
          contentContainerStyle={[styles.contentContainer]}
        >
          <Invites />
        </Animated.ScrollView>
      </ViewPager>

      <VStack level="1">
        <Button
          children="Invite Friends Your Goal"
          style={styles.button}
          onPress={goBack}
        />
      </VStack>
    </Container>
  );
});

export default Social13;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingTop: 0,
  },
  topNavigation: {
    marginBottom: 24,
  },
  content: {
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  contentContainer: {
    backgroundColor: "background-basic-color-1",
    paddingBottom: 60,
  },
  button: {
    flex: 1,
    marginHorizontal: 16,
    marginBottom: 12,
    marginTop: 8,
  },
  headerContent: {
    height: 24,
  },
  childrenHeader: {
    height: 32,
    borderTopLeftRadius: 99,
    borderTopRightRadius: 99,
    backgroundColor: "background-basic-color-1",
  },
  viewPager: {
    flex: 1,
  },
});
