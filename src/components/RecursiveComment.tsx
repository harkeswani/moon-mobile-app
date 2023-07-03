import React, { memo, useState } from 'react';
import { View, TouchableWithoutFeedback, TouchableOpacity, Image } from 'react-native';
import { useTheme, Icon, Input, StyleService, TopNavigation, useStyleSheet } from '@ui-kitten/components';

// ----------------------------- Components -----------------------------------
import { NavigationAction, Container, Content, Text, HStack, VStack, IDivider } from 'components';

interface Comment {
  author: string;
  score: number;
  text: string;
  timePosted: string;
  numChildren: string;
  childComments?: Comment[];
  depth: number;
  collapsed: Boolean;
}

interface RecursiveCommentProps {
  comment: Comment;
}

const RecursiveComment = memo(({ comment }: RecursiveCommentProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { author, score, text, timePosted, numChildren, childComments, depth, collapsed } = comment;

  const renderChildComments = (comments: Comment[] = []) => {
    return comments.map((childComment, index) => (
      <RecursiveComment key={index} comment={childComment} />
    ));
  };

  const [isCollapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!isCollapsed);
  };

  const offset = (depth-1) * 16;

  const getRandomColor = () => {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    return `rgb(${red}, ${green}, ${blue})`;
  };
  const randomColor = getRandomColor();

  return (
    <TouchableWithoutFeedback onPress={toggleCollapsed}>
        <View>
    <HStack mt={8} mb={0} ml={offset} gap={8} alignItems="stretch" justifyContent="flex-start">
      <View style={[styles.verticalLine, { backgroundColor: randomColor }]} />

        <VStack style={{ flex: 1 }} gap={0}>
          <HStack itemsCenter justifyContent="space-between">
            <HStack itemsCenter gap={4}>
              <Text category="h5">{author}</Text>
              <Icon pack="assets" name="caret-up" />
              <Text category="h6" status="platinum">
                {isNaN(score) ? '—' : score}
              </Text>
            </HStack>
            <Text category="subhead" status="platinum">
              {timePosted}
            </Text>
          </HStack>
          {!isCollapsed ? (
            <Text mb={0} category="subhead" status="placeholder">
              {text}
            </Text>
          ) : (
            <Text mb={0} category="subhead" status="placeholder">
              {numChildren}
            </Text>
          )}
        </VStack>
    </HStack>
    {!isCollapsed && renderChildComments(childComments)}
    </View>  
    </TouchableWithoutFeedback>
  );
});


export default RecursiveComment;

const themedStyles = StyleService.create({
  verticalLine: {
    width: 2,
    height: '100%',
  },
});
