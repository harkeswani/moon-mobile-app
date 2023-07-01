import React, { memo } from 'react';
import { ImageRequireSource, ColorValue, Image } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { useTheme, StyleService, useStyleSheet, Icon } from '@ui-kitten/components';

// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';
// ----------------------------- Navigation -----------------------------------
import { useNavigation } from '@react-navigation/native';
// ----------------------------- Components -----------------------------------
import { HStack, Text, VStack } from 'components';

interface IContentProps {
  pages: number;
  title: string;
  describe: string;
  image: ImageRequireSource;
  color: string | ColorValue;
}

const PopUpNav = memo(({ data }: { data: IContentProps }) => {
  const { goBack } = useNavigation();
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { color, title, pages, describe, image } = data;
  return (
    <VStack style={styles.container} level="2" border={16}>
      <VStack gap={8} padding={24} mb={52}>
        <HStack>
          <Text category="h2" status="warning">
            {pages}
          </Text>
          <Icon pack="assets" name="upload" style={styles.upload} />
        </HStack>
        <Text category="h3">{title}</Text>
        <Text category="body">{describe}</Text>
      </VStack>
      <Image source={image} style={{ width: 280 * (width / 375), height: 280 * (width / 375) }} />
      <VStack style={[styles.layout, { backgroundColor: color }]} />
    </VStack>
  );
});

export default PopUpNav;

const themedStyles = StyleService.create({
  container: {
    overflow: 'hidden',
  },
  upload: {
    width: 24,
    height: 24,
  },
  layout: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '30%',
    zIndex: -100,
    borderRadius: 16,
  },
});
