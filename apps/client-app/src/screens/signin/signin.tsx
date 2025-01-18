import {
  Paper,
  Flex,
  Card,
  useMantineTheme,
  Title,
  Box,
  Text,
  Button,
  Stepper,
  Anchor,
} from '@mantine/core';
import { IconDeviceMobile, IconNumber123 } from '@tabler/icons-react';

import useSignIn from './useSignIn';
import { FC } from 'react';
import { UserInputText } from 'design';

export type SignInPageProps = {
  onRegister?: () => void;
};

const SignInPage: FC<SignInPageProps> = ({ onRegister }) => {
  const { nextStep, phoneForm, otpForm, active, setActive, loading } =
    useSignIn();
  const theme = useMantineTheme();
  return (
    <Paper bg={'#ededed'} radius={0}>
      <Flex w={'100%'} h={'100vh'} justify={'center'} align={'center'}>
        <Card radius={'md'} padding="lg" shadow="xs" w={550} mih={400}>
          <Flex align={'center'} direction={'column'}>
            <Title order={4} c={theme.colors.primary[6]}>
              სისტემაში შესვლა
            </Title>
            <Text mt={'sm'} size="sm" c={theme.colors.secondary[11]}>
              გაიარე ავტორიზაცია რეგისტრირებული ნორმით
            </Text>
            <Anchor
              onClick={onRegister && onRegister}
              mt={'sm'}
              size="sm"
              td={'underline'}
              fw={'bold'}
            >
              არ გაქვს ანგარიში? რეგისტრაცია
            </Anchor>
          </Flex>
          <Stepper mt={'md'} size="sm" active={active} onStepClick={setActive}>
            <Stepper.Step>
              <form
                onSubmit={phoneForm.onSubmit((values) => console.log(values))}
              >
                <Box mt={'md'}>
                  <UserInputText
                    text1="საკონტაქტო ტელეფონი:"
                    text2="ტელეფონის ნომერის ფორმატი 5XX XX XX XX"
                    key={phoneForm.key('phone')}
                    leftSectionIcon={
                      <IconDeviceMobile color={theme.colors.secondary[11]} />
                    }
                    {...phoneForm.getInputProps('phone')}
                  />
                </Box>
              </form>
            </Stepper.Step>
            <Stepper.Step>
              <form
                onSubmit={otpForm.onSubmit((values) => console.log(values))}
              >
                <Box mt={'md'}>
                  <UserInputText
                    text1="ვერიფიკაციის კოდი: (შეამოწმე მობილური)"
                    text2="ვერიფიკაციის კოდი გაგზავნილია მობილურზე"
                    key={otpForm.key('code')}
                    leftSectionIcon={
                      <IconNumber123 color={theme.colors.secondary[11]} />
                    }
                    {...otpForm.getInputProps('code')}
                  />
                </Box>
              </form>
            </Stepper.Step>

            <Stepper.Completed>
              <Box>რეგისტრაცია წარმატებით დასრულდა</Box>
            </Stepper.Completed>
          </Stepper>
          <Flex justify={'end'}>
            <Button
              disabled={loading}
              loading={loading}
              onClick={nextStep}
              size="md"
              mt={'md'}
            >
              {active === 0 && 'კოდის მოთხოვნა'}
              {active === 1 && 'სისტემაში შესვლა'}
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Paper>
  );
};

export default SignInPage;
