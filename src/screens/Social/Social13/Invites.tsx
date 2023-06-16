import React, { memo } from "react";
// ----------------------------- UI kitten -----------------------------------
import { StyleService, useStyleSheet } from "@ui-kitten/components";
// ----------------------------- Hook -----------------------------------
import { useLayout } from "hooks";
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from "@react-navigation/native";
// ----------------------------- Components -----------------------------------
import { Text, VStack } from "components";

const Invites = memo(() => {
  const styles = useStyleSheet(themedStyles);
  return (
    <VStack style={styles.content}>
      <Text category="h0">Invites</Text>
    </VStack>
  );
});

export default Invites;

const themedStyles = StyleService.create({
  content: {
    width: "100%",
    paddingHorizontal: 24,
  },
});
