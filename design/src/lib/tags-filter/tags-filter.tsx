import { Text, Badge, Flex, useMantineTheme, SimpleGrid } from '@mantine/core';
import { IconArrowBigRightFilled } from '@tabler/icons-react';
import styles from './tags-filter.module.css';
import { FC } from 'react';
import { BrowserView, MobileView } from 'react-device-detect';

export interface Tag {
  id: string;
  name: string;
}

type QuickFilterProps = {
  title?: string;
  tags: Tag[];
  onTagSelect: (tag: Tag) => void;
};

const QuickFilter: FC<QuickFilterProps> = ({ tags, onTagSelect, title }) => {
  const theme = useMantineTheme();
  return (
    <>
      <BrowserView>
        <Flex gap={'sm'} align={'center'}>
          {title && (
            <>
              <Text c={'dimmed'} size={'xs'}>
                {title}
              </Text>
              <IconArrowBigRightFilled
                style={{ color: theme.colors.green[6] }}
                size={12}
              />
            </>
          )}
          {tags.map((t) => (
            <Badge
              key={t.id}
              p={'md'}
              className={styles.badge}
              variant="outline"
              color="gray"
              size="lg"
              onClick={(e) => onTagSelect(t)}
            >
              {t.name}
            </Badge>
          ))}
        </Flex>
      </BrowserView>
      <MobileView>
        <Text c={'dimmed'} size={'xs'}>
          ხშირად გამოყენებული ფილტრები
        </Text>
        <SimpleGrid mt={'sm'} cols={2}>
          {title && (
            <>
              <Text c={'dimmed'} size={'xs'}>
                {title}
              </Text>
              <IconArrowBigRightFilled
                style={{ color: theme.colors.green[6] }}
                size={12}
              />
            </>
          )}
          {tags.map((t) => (
            <Badge
              key={t.id}
              p={'md'}
              className={styles.badge}
              variant="outline"
              color="gray"
              size="lg"
              onClick={(e) => onTagSelect(t)}
            >
              {t.name}
            </Badge>
          ))}
        </SimpleGrid>
      </MobileView>
    </>
  );
};

export default QuickFilter;
