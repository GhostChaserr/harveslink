import { Badge, MantineSize } from '@mantine/core';
import styles from './tag.module.css';
import { FC } from 'react';

interface SelectedTag {
  id: string;
  text: string;
}

type TagProps = {
  selected: string;
  text: string;
  id: string;
  size?: MantineSize;
  onClick: (input: SelectedTag) => void;
};

const Tag: FC<TagProps> = ({ onClick, text, selected, id, size }) => {
  const isSame = selected === text;
  return (
    <Badge
      p={'md'}
      onClick={() => onClick({ text, id })}
      className={isSame ? styles.tag__selected : styles.tag}
      variant="outline"
      color="gray"
      size={size || 'lg'}
      key={text}
    >
      {text}
    </Badge>
  );
};

export default Tag;
