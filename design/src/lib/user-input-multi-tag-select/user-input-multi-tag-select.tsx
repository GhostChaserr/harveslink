import { useEffect } from 'react';
import {
  Flex,
  ScrollArea,
  UnstyledButton,
  Text,
  useMantineTheme,
} from '@mantine/core';

import { FC, useState } from 'react';
import { Tag } from '../tag';

type StepFieldProps = {
  text1: string;
  text2: string;
  errors: object;
  onSelect: (tag: string) => void;
  selected: string[];
  initialValues: string[];
  height: number;
};

const UserInputMultiTagSelect: FC<StepFieldProps> = ({
  onSelect,
  selected,
  initialValues,
  text1,
  text2,
  height,
}) => {
  const [workFields, setWorkFields] = useState<string[]>([]);

  const theme = useMantineTheme();

  useEffect(() => {
    setWorkFields(initialValues);
  }, []);

  return (
    <Flex mt={'sm'} direction={'column'}>
      <Text fw={500} c={theme.colors.primary[6]}>
        {text1}
      </Text>
      <ScrollArea mb={'sm'} mt={'sm'} h={height}>
        <Flex mt={'xl'} gap={'xs'} wrap={'wrap'} justify={'center'}>
          {workFields.map((field) => (
            <UnstyledButton key={field}>
              <Tag
                selected={selected.find((item) => item === field) || ''}
                onClick={(args) => onSelect(args.text as string)}
                id={field}
                text={field}
              />
            </UnstyledButton>
          ))}
        </Flex>
      </ScrollArea>
      <Text mt={'md'} c={theme.colors.secondary[11]} size="xs">
        {text2}
      </Text>
    </Flex>
  );
};

export default UserInputMultiTagSelect;
