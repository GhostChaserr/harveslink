import { FC, ReactNode } from 'react';
import { Flex, Text, NumberInput, useMantineTheme } from '@mantine/core';

interface UserInputNumberProps {
  leftSectionIcon?: ReactNode;
  text1: string;
  text2: string;
  text3?: string;
  placeHolder?: string;
  key: string;
  autoFocus?: boolean;
  value?: number;
  min?: number;
  max?: number;
  step?: number;
  onChange?: (value: number|string) => void;
}

const UserInputNumber: FC<UserInputNumberProps> = (props) => {
  const theme = useMantineTheme();

  return (
    <Flex mt="sm" direction="column">
      <Text fw={500} c={theme.colors.primary[6]}>
        {props.text1}
      </Text>
      <NumberInput
        mt="sm"
        size="lg"
        withAsterisk
        autoFocus={props.autoFocus}
        placeholder={props.placeHolder || ''}
        leftSection={props.leftSectionIcon}
        radius="md"
        value={props.value}
        min={props.min}
        max={props.max}
        step={props.step}
        onChange={props.onChange}
        {...props}
      />
      <Text mt="md" c={theme.colors.secondary[11]} size="xs">
        {props.text2}
      </Text>
    </Flex>
  );
};

export default UserInputNumber;
