import { FC } from 'react';
import { Flex, useMantineTheme, Text, Anchor } from '@mantine/core';

export interface FormHeaderProps {
  title: string;
  text1: string;
  text2: string;
  onLinkClick: () => void;
}

const FormHeader: FC<FormHeaderProps> = ({
  text1,
  title,
  text2,
  onLinkClick,
}) => {
  const theme = useMantineTheme();
  return (
    <Flex align={'center'} direction={'column'}>
      <Text c={theme.colors.primary[6]}>{title}</Text>
      <Text mt={'sm'} size="sm" c={theme.colors.secondary[11]}>
        {text1}
      </Text>
      <Anchor
        onClick={onLinkClick}
        mt={'sm'}
        size="sm"
        td={'underline'}
        fw={'bold'}
      >
        {text2}
      </Anchor>
    </Flex>
  );
};

export default FormHeader;
