import React, { memo } from 'react';
import { TouchableOpacity, Image } from 'react-native';
import { useTheme, StyleService, useStyleSheet } from '@ui-kitten/components';
import { HStack, Text, VStack } from 'components';
import { MaterialCommunityIcons } from '@expo/vector-icons';

interface Comment {
  author: string;
  score: number;
  text: string;
  timePosted: string;
  childComments?: Comment[];
  depth: number;
}

interface RecursiveCommentProps {
  comment: Comment;
}

const RecursiveComment = memo(({ comment }: RecursiveCommentProps) => {
  const theme = useTheme();
  const styles = useStyleSheet(themedStyles);

  const { author, score, text, timePosted, childComments, depth } = comment;

  const renderChildComments = (comments: Comment[] = []) => {
    return comments.map((childComment, index) => (
      <RecursiveComment key={index} comment={childComment} depth={depth+1} />
    ));
  };
    
  const offset = depth*50;

  return (
    <VStack style={styles.container} level="2" border={8}>
  <HStack style={styles.meta} alignment="center" justifyContent="space-between">
    <HStack alignment="center">
      <Text>{author}</Text>
      <MaterialCommunityIcons
        name="arrow-up-bold"
        style={styles.icon}
        color={theme['color-primary-500']}
      />
      <Text appearance="hint" style={styles.metaText}>
        {isNaN(score) ? '—' : score}
      </Text>
    </HStack>
    <Text appearance="hint" style={styles.metaText}>
      {timePosted}
    </Text>
  </HStack>
  <VStack gap={0} padding={8}>
    <Text appearance="hint" category="c1" style={styles.commentText}>
      {text}
    </Text>
  </VStack>
  {childComments && childComments.length > 0 && (
    <VStack style={styles.childCommentsContainer}>
      {renderChildComments(childComments)}
    </VStack>
  )}
</VStack>

  );
});

export default RecursiveComment;

const themedStyles = StyleService.create({
  container: {
    overflow: 'hidden',
    marginTop: 8,
  },
  commentText: {
    marginBottom: 0,
  },
  meta: {
    padding: 8,
  },
  icon: {
    fontSize: 20,
    marginRight: 2,
  },
  metaText: {
    fontSize: 12,
    marginLeft: 2,
  },
});
