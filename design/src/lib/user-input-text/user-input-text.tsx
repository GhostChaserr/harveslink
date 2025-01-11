import { FC, ReactNode } from 'react';
import { Flex, Text, TextInput, useMantineTheme } from '@mantine/core';

interface UserInputTextProps {
  leftSectionIcon: ReactNode;
  text1: string;
  text2: string;
  key: string;
};

const UserInputText: FC<UserInputTextProps> = (props) => {
  const theme = useMantineTheme();
  return (
    <Flex mt={'sm'} direction={'column'}>
      <Text fw={500} c={theme.colors.primary[6]}>
        {props.text1}
        {/* სრული სახელი და გვარი: */}
      </Text>
      <TextInput
        mt={'sm'}
        size="lg"
        withAsterisk
        autoFocus
        fz={'h6'}
        leftSection={props.leftSectionIcon}
        radius={'md'}
        {...props}
      />
      <Text mt={'md'} c={theme.colors.secondary[11]} size="sm">
        {props.text2}
      </Text>
    </Flex>
  );
};

export default UserInputText;
