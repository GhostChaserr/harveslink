import { FC, ReactNode } from 'react';
import { Flex, Text, TextInput, useMantineTheme } from '@mantine/core';

interface UserInputTextProps {
  leftSectionIcon?: ReactNode;
  text1: string;
  text2: string;
  text3?: string;
  placeHolder?: string
  key: string;
  autoFocus?: boolean
}

const UserInputText: FC<UserInputTextProps> = (props) => {
  const theme = useMantineTheme();
  return (
    <Flex mt={'sm'} direction={'column'}>
      <Text fw={500} c={theme.colors.primary[6]}>
        {props.text1}
      </Text>
      <TextInput
        mt={'sm'}
        size="lg"
        withAsterisk
        autoFocus={props.autoFocus}
        placeholder={props.placeHolder || ''}
        fz={'h6'}
        leftSection={props.leftSectionIcon}
        radius={'md'}
        {...props}
      />
      <Text mt={'md'} c={theme.colors.secondary[11]} size="xs">
        {props.text2}
      </Text>
    </Flex>
  );
};

export default UserInputText;
