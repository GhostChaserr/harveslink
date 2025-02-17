import { Flex, Text, Title } from '@mantine/core';
import { FC, memo } from 'react';

type HeaderViewProps = {
  title: string;
  description: string;
};

const HeaderView: FC<HeaderViewProps> = ({ title, description }) => {
  return (
    <Flex justify={'space-between'} align={'center'} h={60}>
      <Flex direction={'column'}>
        <Title order={2}>
          <Flex>{title}</Flex>
        </Title>
        <Text mt={'xs'} c={'dimmed'} size="xs">
          {description}
        </Text>
      </Flex>
    </Flex>
  );
};

export default memo(HeaderView);
