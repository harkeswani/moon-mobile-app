import React from "react";
import {
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  ViewStyle,
  View,
} from "react-native";
import { useTheme } from "@ui-kitten/components";
import { useLayout } from "hooks";
import { Text } from "components";

interface ITabBarProps {
  tabs: string[];
  level?: string;
  style?: ViewStyle;
  activeIndex: number;
  onChange(index: number): void;
}

const TabBar = ({ style, activeIndex, onChange, tabs }: ITabBarProps) => {
  const theme = useTheme();
  const { width } = useLayout();
  const refScrollView = React.useRef<ScrollView>(null);
  React.useEffect(() => {
    refScrollView.current?.scrollTo({
      x: activeIndex * 120 + 8 - (width - 250) / 2,
      animated: true,
    });
  }, [activeIndex]);
  return (
    <View>
      <ScrollView
        contentContainerStyle={[styles.container, style]}
        horizontal
        showsHorizontalScrollIndicator={false}
        ref={refScrollView}
      >
        {tabs.map((item, index) => {
          const isActive = activeIndex === index;
          return (
            <TouchableWithoutFeedback
              key={index}
              onPress={() => onChange(index)}
            >
              <View
                style={[
                  styles.btn,
                  {
                    borderColor: theme["background-basic-color-2"],
                    backgroundColor: isActive
                      ? theme["color-primary-default"]
                      : theme["background-basic-color-2"],
                  },
                ]}
              >
                <Text
                  capitalize
                  category="h6"
                  status={isActive ? "white" : "platinum"}>
                  {item}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignSelf: "center",
    margin: 16,
  },
  btn: {
    marginRight: 8,
    flexDirection: "row",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 4,
  },
});