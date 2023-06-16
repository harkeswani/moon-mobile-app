import React, { memo } from "react";
import { FlatList } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import { Icon, StyleService, TopNavigation, useStyleSheet } from "@ui-kitten/components";

// ----------------------------- Hook -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Components -----------------------------------
import { Text, VStack, HStack, Container } from "components";
// ----------------------------- @utils -----------------------------------
import { keyExtractoUtil } from "utils";

const Social14 = memo(() => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const styles = useStyleSheet(themedStyles);
  return (
    <Container style={styles.container}>
      <TopNavigation
        alignment="center"
        title={"Notification"}
        accessoryLeft={(props) => (
          <VStack onPress={goBack}>
            <Icon pack="eva" name="chevron-left" style={styles.iconChevron} />
          </VStack>
        )}
        accessoryRight={(props) => (
          <VStack>
            <Icon pack="eva" name="done-all" {...props} style={styles.icon} />
          </VStack>
        )}
      />
      <FlatList
        data={example_data}
        keyExtractor={keyExtractoUtil}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => {
          return (
            <HStack
              level="2"
              opacity={item.readed ? 0.5 : 1}
              justify="flex-start"
              gap={16}
              padding={16}
              mb={8}
              border={16}
              itemsCenter
            >
              <VStack
                style={[styles.layoutIcon, { backgroundColor: item.color }]}
              >
                <Icon pack="assets" name="money" />
              </VStack>
              <VStack gap={4}>
                <Text category="h5" maxWidth={259 * (width / 375)}>
                  {item.title}
                </Text>
                <Text status="placeholder" category="c1">
                  {item.time}
                </Text>
              </VStack>
            </HStack>
          );
        }}
      />
    </Container>
  );
});

export default Social14;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  icon: {
    width: 24,
    height: 24,
    tintColor: "text-basic-color",
  },
  iconChevron: {
    width: 32,
    height: 32,
    tintColor: "text-basic-color",
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  layoutIcon: {
    borderRadius: 99,
    padding: 16,
  },
});
const example_data = [
  {
    color: "#106AF3",
    title: 'You have added $200 to your "future" accumulation goal',
    time: "30 mins ago",
    readed: false,
  },
  {
    color: "#00CD50",
    title:
      "You have completed your goal of saving $20,000 to rent a house in 2023",
    time: "10/10/2022 17:04",
    readed: false,
  },
  {
    color: "#B1CEDE",
    title:
      "Philip Schmidt have added $100 to goal of saving $20,000 to rent a house in 2023",
    time: "10/10/2022 17:04",
    readed: false,
  },
  {
    color: "#106AF3",
    title:
      "Philip Schmidt have added $100 to goal of saving $20,000 to rent a house in 2023",
    time: "10/10/2022 17:04",
    readed: true,
  },
  {
    color: "#106AF3",
    title:
      "Philip Schmidt have added $100 to goal of saving $20,000 to rent a house in 2023",
    time: "10/10/2022 17:04",
    readed: true,
  },
  {
    color: "#00CD50",
    title:
      "Philip Schmidt have added $100 to goal of saving $20,000 to rent a house in 2023",
    time: "10/10/2022 17:04",
    readed: true,
  },
];
