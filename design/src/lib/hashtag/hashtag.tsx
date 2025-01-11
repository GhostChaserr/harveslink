import { FC } from 'react';
import styles from './hashtag.module.css';
import { Text } from '@mantine/core';

type HashtagProps = {
  tag: string;
};

const Hashtag: FC<HashtagProps> = ({ tag }) => {
  return <Text className={styles.hashtag}>#{tag}</Text>;
};

export default Hashtag;
