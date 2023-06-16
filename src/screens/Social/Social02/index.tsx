import React, { memo } from 'react';
import { Image } from 'react-native';
// ----------------------------- UI kitten -----------------------------------
import { TopNavigation, useTheme, StyleService, useStyleSheet } from '@ui-kitten/components';

// ----------------------------- Hook -----------------------------------
import { useLayout } from 'hooks';

// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, LinearGradientText, Content, Text, HStack, VStack } from 'components';
import { Images } from 'assets/images';

const Social02 = memo(() => {
  const { height, width, top, bottom } = useLayout();
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);
  const height_img = 160 * (height / 812);
  return (
    <Container style={styles.container}>
      <TopNavigation
        accessoryLeft={<NavigationAction icon="caret-left" />}
        accessoryRight={
          <HStack gap={8}>
            <NavigationAction icon="share-network" />
            <NavigationAction icon="bookmarks" />
          </HStack>
        }
      />
      <Content contentContainerStyle={styles.content}>
        <Text category="h2" marginHorizontal={16} marginRight={32} numberOfLines={2}>
          {`Do I need preclearance\nfor`}
          <Text category="h2" status="warning" marginTop={8} lineHeight={0}>
            {' each trade?'}
          </Text>
        </Text>
        <Image
          borderRadius={16}
          source={Images.social.social02}
          style={{ width: width - 8, height: 240 * (height / 812) }}
        />
        <VStack mh={12}>
          <Text category="h3" marginBottom={16}>
            Simplify internal procedures and make financial reporting more transparent
          </Text>
          <Text category="body" status="caption">
            Are employees at sellside institutions (banks, advisory firms, etc) or buyside
            institutions (private equity firms, hedge funds, etc) universally banned from trading
            Kalshi’s event contracts?
          </Text>
        </VStack>
        <HStack
          style={{ backgroundColor: theme[`color-primary-transparent-100`] }}
          gap={16}
          justify="flex-start"
          mh={12}>
          <VStack style={styles.divider} />
          <LinearGradientText
            textStyle={styles.text}
            text={'Why would I want to trade an Event\nContract over another asset class?'}
            colors={['#CFE1FD', '#FFFDE1']}
          />
        </HStack>
        <HStack gap={8} justify="flex-start" mh={12}>
          <Image
            source={Images.social.social02}
            style={{ height: height_img, width: height_img }}
          />
          <Image
            source={Images.social.social03}
            style={{ height: height_img, width: 100 * (width / 375) }}
          />
          <Image
            source={Images.social.social04}
            style={{ height: height_img, width: 67 * (width / 375) }}
          />
        </HStack>
        <Text marginHorizontal={12} status="caption" category="body">
          Why are Kalshi’s Event contracts generally different from other instruments I’m banned
          from trading?
        </Text>
        <VStack style={styles.layoutTag} level="2">
          <LinearGradientText
            textStyle={styles.tag}
            text={'Tags'}
            colors={['#CFE1FD', '#FFFDE1']}
          />
          <Text category="subhead" status="platinum">
            1000screen, darkmode, template, ui, kit
          </Text>
        </VStack>
      </Content>
    </Container>
  );
});

export default Social02;

const themedStyles = StyleService.create({
  container: {
    flex: 1,
    paddingBottom: 0,
  },
  content: {
    paddingHorizontal: 4,
    rowGap: 24,
    paddingBottom: 40,
  },
  divider: {
    height: '100%',
    width: 4,
    backgroundColor: 'color-primary-default',
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    marginVertical: 8,
  },
  tag: {
    fontSize: 16,
    lineHeight: 24,
  },
  layoutTag: {
    marginHorizontal: 12,
    padding: 16,
    borderRadius: 16,
    gap: 8,
  },
});
