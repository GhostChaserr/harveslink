import { FC, ReactNode } from 'react';
import { Flex, Select, Text, useMantineTheme } from '@mantine/core';

type UserInputTextProps = {
  leftSectionIcon: ReactNode;
  text1: string;
  text2: string;
  key: string;
  options: string[];
};

const UserInputSelect: FC<UserInputTextProps> = (props) => {
  const theme = useMantineTheme();
  return (
    <Flex mt={'sm'} direction={'column'}>
      <Text fw={500} c={theme.colors.primary[6]}>
        {props.text1}
        {/* სრული სახელი და გვარი: */}
      </Text>
      <Select
        mt={'sm'}
        size="lg"
        withAsterisk
        fz={'h6'}
        leftSection={props.leftSectionIcon}
        radius={'md'}
        searchable
        clearable
        data={props.options}
        {...props}
      />
      <Text mt={'md'} c={theme.colors.secondary[11]} size="sm">
        {props.text2}
        {/* ჩაწერე სახელი და გვარი სრულად სივრცის გამოტოვებით */}
      </Text>
    </Flex>
  );
};

export default UserInputSelect;
