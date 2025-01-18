import { FC } from 'react';
import {
  Paper,
  Flex,
  Card,
  useMantineTheme,
  Box,
  Button,
  Stepper,
} from '@mantine/core';

import {
  IconBuildings,
  IconDeviceMobile,
  IconHome,
  IconUser,
} from '@tabler/icons-react';

import {
  CITIES_LIST,
  UserInputSelect,
  UserInputText,
  FormHeader,
  LANGUAGES_LIST,
  UserInputMultiTagSelect,
} from 'design';

import useSignUp from './useSignUp';

const SignUpScreen: FC = () => {
  const {
    active,
    fullNamePhoneForm,
    nextStep,
    setActive,
    countryCityForm,
    languagesForm,
  } = useSignUp();
  const theme = useMantineTheme();
  return (
    <Paper bg={'#ededed'} radius={0}>
      <Flex w={'100%'} h={'100vh'} justify={'center'} align={'center'}>
        <Card radius={'md'} padding="lg" shadow="xs" w={550} mih={520}>
          <FormHeader
            title="ფერმერის რეგისტრაცია"
            text1="შექმენი ფერმერის ანგარიში ტელეფონის ნორმის დახმარებით"
            text2="გაქვს ანგარიში? გაიარე ავტორიზაცია"
            onLinkClick={() => {
              console.log('redirect');
            }}
          />
          <Stepper mt={'md'} size="sm" active={active} onStepClick={setActive}>
            <Stepper.Step>
              <form
                onSubmit={fullNamePhoneForm.onSubmit((values) => {
                  console.log('values:', values);
                })}
              >
                <Box mt={'md'}>
                  <UserInputText
                    autoFocus={true}
                    placeHolder="გიორგი ალექსიძე"
                    text1="სრული სახელი და გვარი"
                    text2="შეიყვანე სრული სახელი და გვარი"
                    leftSectionIcon={
                      <IconUser color={theme.colors.secondary[11]} />
                    }
                    key={fullNamePhoneForm.getInputProps('fullName').value}
                    {...fullNamePhoneForm.getInputProps('fullName')}
                  />
                </Box>
                <Box mt={'md'}>
                  <UserInputText
                    placeHolder="599000000"
                    text1="საკონტაქტო ტელეფონი:"
                    text2="ტელეფონის ნომერის ფორმატი 5XX XX XX XX"
                    key={fullNamePhoneForm.key('phone')}
                    leftSectionIcon={
                      <IconDeviceMobile color={theme.colors.secondary[11]} />
                    }
                    {...fullNamePhoneForm.getInputProps('phone')}
                  />
                </Box>
              </form>
            </Stepper.Step>

            <Stepper.Step>
              <form
                onSubmit={countryCityForm.onSubmit((values) => {
                  console.log('values:', values);
                })}
              >
                <Box mt={'md'}>
                  <UserInputSelect
                    placeHolder="თბილისი"
                    text1="საცხოვრებელი ქალაქი:"
                    text2="აირჩიე საცხოვრებელი ქალაქი"
                    key={countryCityForm.key('city')}
                    leftSectionIcon={
                      <IconBuildings color={theme.colors.secondary[11]} />
                    }
                    {...countryCityForm.getInputProps('city')}
                    options={CITIES_LIST.map((item) => item.georgian)}
                  />
                </Box>
                <Box mt={'md'}>
                  <UserInputText
                    autoFocus={true}
                    text1="საცხოვრებელი მისამართი:"
                    text2="ჩაწერე ზუსტი საცხოვრებელი მისამართი"
                    placeHolder="სოფელი კალაური, ბინა 2, ქუჩა 3"
                    key={fullNamePhoneForm.key('phone')}
                    leftSectionIcon={
                      <IconHome color={theme.colors.secondary[11]} />
                    }
                    {...countryCityForm.getInputProps('address')}
                  />
                </Box>
              </form>
            </Stepper.Step>

            <Stepper.Step>
              <UserInputMultiTagSelect
                height={200}
                text1="სალაპარაკო ენა:"
                text2="მონიშნე რამდნიმე სალაპარაკო ენა"
                initialValues={LANGUAGES_LIST}
                selected={
                  languagesForm.getInputProps('languages').value as string[]
                }
                onSelect={(tag) => {
                  const current = languagesForm.getInputProps('languages')
                    .value as string[];
                  if (current.includes(tag)) {
                    const filtered = current.filter((item) => item !== tag);
                    return languagesForm.setFieldValue('languages', filtered);
                  }
                  languagesForm.setFieldValue('languages', current.concat(tag));
                }}
                errors={languagesForm.errors}
              />
            </Stepper.Step>
          </Stepper>
          <Flex justify={'end'}>
            <Button onClick={nextStep} size="md" mt={'md'}>
              შემდეგი
            </Button>
          </Flex>
        </Card>
      </Flex>
    </Paper>
  );
};

export default SignUpScreen;
