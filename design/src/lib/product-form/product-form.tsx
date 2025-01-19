import {
  Flex,
  Title,
  useMantineTheme,
  Text,
  Box,
  Stepper,
  Button,
} from '@mantine/core';
import {
  IconCalendar,
  IconCircleCheck,
  IconPencil,
  IconUpload,
} from '@tabler/icons-react';
import { UserInputText } from '../user-input-text';
import useProductForm from './useProductForm';
import { UserInputSelect } from '../user-input-select';
import { UserInputTextArea } from '../user-input-text-area';
import { FC } from 'react';
import { UserInputNumber } from '../user-input-number';
import { UserInputDateTime } from '../user-input-datetime';
import { CITIES_LIST } from '../utils';
import { ProductFormValues } from './product-form.interface';

export interface ListSelectOption {
  id: string;
  name: string;
}

export interface ProductFormProps {
  categories: ListSelectOption[];
  units: ListSelectOption[];
  processProductForm: (values: ProductFormValues) => Promise<void>;
}

const ProductForm: FC<ProductFormProps> = ({
  categories,
  units,
  processProductForm,
}) => {
  const theme = useMantineTheme();
  const {
    active,
    setActive,
    nameDescriptionForm,
    loading,
    nextStep,
    unitQuantityPriceForm,
    startExpiryForm,
    countryCityForm,
    handleFinish,
    finished,
    setLoading,
  } = useProductForm();

  const onHandleFinishClick = async () => {
    setLoading(true);
    const values = handleFinish();
    await processProductForm(values);
    setLoading(false);
  };

  if (finished) {
    return (
      <Flex direction={'column'} justify={'center'} align={'center'}>
        <Title mt={'md'} order={4} c={theme.colors.primary[6]}>
          მონაცემები წარმატებით შეივსო
        </Title>

        <Text mt={'sm'} size="sm" c={theme.colors.secondary[11]}>
          განცხადების დასასრულებად დააჭირეთ დასრულების ღილაკს
        </Text>
        <Box mt={'md'}>
          <IconCircleCheck color="green" size={60} />
        </Box>
        <Box mt={'md'}>
          <Button
            loading={loading}
            onClick={onHandleFinishClick}
            size="lg"
            leftSection={<IconUpload />}
          >
            გამოქვეყნება
          </Button>
        </Box>
      </Flex>
    );
  }
  return (
    <Flex justify={'center'}>
      <Box>
        <Flex align={'center'} direction={'column'}>
          <Title order={4} c={theme.colors.primary[6]}>
            განცხადების დამატება
          </Title>
          <Text mt={'sm'} size="sm" c={theme.colors.secondary[11]}>
            განცხადების დასამატებლად მიყევი შესავსებ ფორმას
          </Text>
        </Flex>
        <Stepper mt={'md'} size="sm" active={active} onStepClick={setActive}>
          <Stepper.Step>
            <form
              onSubmit={nameDescriptionForm.onSubmit((values) =>
                console.log(values)
              )}
            >
              <Box mt={'md'}>
                <UserInputText
                  placeHolder="მაგალითად, თეთრი პური"
                  text1="პროდუქტის დასახელება:"
                  text2="ჩაწერე პროდუქტის დასახელება"
                  key={nameDescriptionForm.key('productName')}
                  {...nameDescriptionForm.getInputProps('productName')}
                />
              </Box>
              <Box mt={'md'}>
                <UserInputTextArea
                  minRows={3}
                  placeHolder="მაგალითად, მაქვს გასაყიდი გუშინდელი თეთრი პური .."
                  text1="პროდუქტის აღწერა:"
                  text2="აღწერე პროდუქტის მდგომარეობა"
                  key={nameDescriptionForm.key('description')}
                  leftSectionIcon={
                    <IconPencil color={theme.colors.secondary[11]} />
                  }
                  {...nameDescriptionForm.getInputProps('description')}
                />
              </Box>
              <Box mt={'md'}>
                <UserInputSelect
                  placeHolder="მაგალითად, ცომეული"
                  text1="პროდუქტის კატეგორია:"
                  text2="აირჩიე პროდუქტის კატეგორია"
                  key={nameDescriptionForm.key('category')}
                  {...nameDescriptionForm.getInputProps('category')}
                  options={categories.map((item) => item.name)}
                />
              </Box>
            </form>
          </Stepper.Step>
          <Stepper.Step>
            <form
              onSubmit={nameDescriptionForm.onSubmit((values) =>
                console.log(values)
              )}
            >
              <Box mt={'md'}>
                <UserInputSelect
                  text1="საზომი ერთეული:"
                  text2="აირჩიე ლოტის საზომი ერთეული"
                  key={unitQuantityPriceForm.key('unit')}
                  {...unitQuantityPriceForm.getInputProps('unit')}
                  options={units.map((item) => item.name)}
                />
              </Box>
              <Box mt={'md'}>
                <UserInputNumber
                  text1="ერთეულის ღირებულება:"
                  text2="ჩაწერე ერთეული პროდუქციის ღირებულება ლარში"
                  key={unitQuantityPriceForm.key('price')}
                  {...unitQuantityPriceForm.getInputProps('price')}
                />
              </Box>

              <Box mt={'md'}>
                <UserInputNumber
                  text1="ჯამური რაოდენობა:"
                  text2="შეიყვანე ლოტში არსებული პროდუქციის ჯამური რაოდენობა"
                  key={unitQuantityPriceForm.key('quantityAvailable')}
                  {...unitQuantityPriceForm.getInputProps('quantityAvailable')}
                />
              </Box>
            </form>
          </Stepper.Step>
          <Stepper.Step>
            <form
              onSubmit={nameDescriptionForm.onSubmit((values) =>
                console.log(values)
              )}
            >
              <Box mt={'md'}>
                <UserInputDateTime
                  placeHolder="24/01/2025 00:00"
                  leftSectionIcon={<IconCalendar />}
                  text1="გამოქვენყების თარიღი:"
                  text2="აირჩიე განცხადების გამოქვეყნების თარიღი და დრო"
                  autoFocus={true}
                  value={new Date()}
                  minDate={new Date()}
                  key={startExpiryForm.key('startDate')}
                  {...startExpiryForm.getInputProps('startDate')}
                />
              </Box>
              <Box mt={'md'}>
                <UserInputDateTime
                  placeHolder="24/01/2025 00:00"
                  leftSectionIcon={<IconCalendar />}
                  text1="გაუქმების თარიღი:"
                  text2="აირჩიე განცხადების გაუქმების თარიღი და დრო"
                  autoFocus={false}
                  value={new Date()}
                  minDate={new Date()}
                  key={startExpiryForm.key('expiryDate')}
                  {...startExpiryForm.getInputProps('expiryDate')}
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
                  text1="მისაწოდებელი ქალაქი:"
                  text2="არიჩიე ქალაქი"
                  key={countryCityForm.key('city')}
                  {...countryCityForm.getInputProps('city')}
                  options={CITIES_LIST.map((item) => item.georgian)}
                />
              </Box>
              <Box mt={'md'}>
                <UserInputText
                  autoFocus={true}
                  text1="მისაწოდებელი  მისამართი:"
                  text2="ჩაწერე ზუსტი მისაწოდებელი მისამართი"
                  placeHolder="ქალაქი,სოფელი,ქუჩა,ბინა"
                  key={countryCityForm.key('address')}
                  {...countryCityForm.getInputProps('address')}
                />
              </Box>
            </form>
          </Stepper.Step>
        </Stepper>
        <Flex justify={'end'}>
          <Button
            disabled={loading}
            loading={loading}
            onClick={nextStep}
            size="md"
            mt={'md'}
          >
            შემდეგი
          </Button>
        </Flex>
      </Box>
    </Flex>
  );
};

export default ProductForm;
