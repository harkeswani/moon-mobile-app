import React, { memo } from "react";
import { FlatList } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  Button,
  StyleService,
  TopNavigation,
  useStyleSheet,
} from "@ui-kitten/components";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Components -----------------------------------
import {
  VStack,
  LinearGradientText,
  Text,
  Container,
  HStack,
  NavigationAction,
} from "components";
// ----------------------------- utils -----------------------------------
import { keyExtractoUtil } from "utils";
import { useLayout } from "hooks";

const Social12 = memo(() => {
  const { goBack } = useNavigation();
  const {width}=useLayout()
  const styles = useStyleSheet(themedStyles);

  const ListHeaderComponent = () => (
    <VStack mb={48}>
      <Text style={styles.header}>👑</Text>
      <HStack justify="flex-start" gap={12}>
        <LinearGradientText text={"Be"} textStyle={styles.textStyle} />
        <Text category="h1" status="warning">
          happies.
        </Text>
      </HStack>
      <LinearGradientText
        text={"Upgrade Premium"}
        textStyle={styles.textStyle}
      />
    </VStack>
  );
  const ItemSeparatorComponent = () => <VStack style={styles.divider} />;
  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        accessoryLeft={<NavigationAction />}
        title={"Premium"}
      />
      <FlatList
        contentContainerStyle={styles.content}
        keyExtractor={keyExtractoUtil}
        data={example_data}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={({ item }) => {
          const _maxWidth=240*(width/375)
          return (
            <HStack justify="flex-start" gap={8} mb={24}>
              <Text category="h3">{item.symbol}</Text>
              <VStack gap={8} style={{ flex: 1 }}>
                <Text category="h4" maxWidth={_maxWidth}>{item.title}</Text>
                <Text category="subhead" maxWidth={_maxWidth} style={styles.describe}>
                  {item.describe}
                </Text>
                <ItemSeparatorComponent />
              </VStack>
            </HStack>
          );
        }}
      />
      <Button
        children={"Buy now - $0.99/year"}
        style={styles.button}
        onPress={goBack}
      />
    </Container>
  );
});

export default Social12;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
  header: {
    fontSize: 64,
    lineHeight: 76,
    fontWeight: "700",
    marginBottom: 24,
  },
  textStyle: {
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "700",
  },
  content: {
    paddingHorizontal: 40,
  },
  divider: {
    height: 1,
    backgroundColor: "text-placeholder-color",
    opacity: 0.3,
    marginTop: 24,
  },
  button: {
    marginHorizontal: 24,
    marginBottom: 16,
  },
  describe: {
    color: "color-basic-700",
  },
});
const example_data = [
  {
    title: "Remove Ads",
    describe: "Remove all ads that appear on the app",
    symbol: "☂️",
  },
  {
    title: "Unlimited Goals",
    describe: "create unlimited financial goals",
    symbol: "🚀",
  },
  {
    title: "Invite Friends",
    describe: "Accomplish goals with friends and family",
    symbol: "👯",
  },
];
