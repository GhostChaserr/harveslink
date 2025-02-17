import { FC, ReactNode } from 'react';
import { Flex, Text, Textarea, useMantineTheme } from '@mantine/core';

interface UserInputTextAreaProps {
  leftSectionIcon: ReactNode;
  text1: string;
  text2: string;
  text3?: string;
  placeHolder?: string;
  key: string;
  autoFocus?: boolean;
  minRows: number
}

const UserInputTextArea: FC<UserInputTextAreaProps> = (props) => {
  const theme = useMantineTheme();
  return (
    <Flex mt="sm" direction="column">
      <Text fw={500} c={theme.colors.primary[6]}>
        {props.text1}
      </Text>
      <Textarea
        mt="sm"
        size="lg"
        withAsterisk
        autosize
        autoFocus={props.autoFocus}
        placeholder={props.placeHolder || ''}
        // leftSection={props.leftSectionIcon}
        radius="md"
        {...props}
      />
      <Text mt="md" c={theme.colors.secondary[11]} size="xs">
        {props.text2}
      </Text>
    </Flex>
  );
};

export default UserInputTextArea;
