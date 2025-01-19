import { FC, ReactNode } from 'react';
import { Flex, Text, useMantineTheme } from '@mantine/core';
import { DateTimePicker } from '@mantine/dates';

interface UserInputDateTimeProps {
  leftSectionIcon: ReactNode;
  text1: string;
  text2: string;
  text3?: string;
  placeHolder?: string;
  key: string;
  autoFocus?: boolean;
  value?: Date | null;
  onChange?: (value: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
}

const UserInputDateTime: FC<UserInputDateTimeProps> = (props) => {
  const theme = useMantineTheme();

  return (
    <Flex mt="sm" direction="column">
      <Text fw={500} c={theme.colors.primary[6]}>
        {props.text1}
      </Text>
      <DateTimePicker
        mt="sm"
        size="lg"
        withAsterisk
        autoFocus={props.autoFocus}
        placeholder={props.placeHolder || ''}
        radius="md"
        value={props.value}
        onChange={props.onChange}
        minDate={props.minDate}
        maxDate={props.maxDate}
        {...props}
      />
      <Text mt="md" c={theme.colors.secondary[11]} size="xs">
        {props.text2}
      </Text>
    </Flex>
  );
};

export default UserInputDateTime;
