import React, { memo } from "react";
import { View, Image, TouchableOpacity } from "react-native";
// ----------------------------- UI kitten -----------------------------------
import {
  TopNavigation,
  useTheme,
  StyleService,
  useStyleSheet,
} from "@ui-kitten/components";

// ----------------------------- @Types -----------------------------------
// ----------------------------- Hook -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";

// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Content, Text, HStack } from "components";

interface ITabBarProps {
  activeTab: number;
  setActiveTab: React.Dispatch<React.SetStateAction<number>>;
}

const TabBar = memo(({ activeTab, setActiveTab }: ITabBarProps) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  return (
    <HStack gap={24} justify="flex-start" mh={32} mb={8}>
      {TABS.map((tab, index) => {
        const active = index === activeTab;
        return (
          <TouchableOpacity key={index} onPress={() => setActiveTab(index)}>
            <Text category="h4" status={active ? "basic" : "platinum"}>
              {tab}
            </Text>
          </TouchableOpacity>
        );
      })}
    </HStack>
  );
});

export default TabBar;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
  },
});

const TABS = ["List Friends", "Invites"];
