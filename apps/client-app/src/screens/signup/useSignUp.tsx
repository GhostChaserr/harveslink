import {
  useGenerateOtpMutation,
  useCheckAccountMutation,
  useCreateFarmerAccountMutation,
} from '@harveslink/generated';
import { isNotEmpty, useForm } from '@mantine/form';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { useState } from 'react';
import { useNavigate } from 'react-router';

const useSignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [generateOtp] = useGenerateOtpMutation();
  const [checkAccount] = useCheckAccountMutation();
  const [createAccount] = useCreateFarmerAccountMutation();

  const [active, setActive] = useState<number>(0);

  const fullNamePhoneForm = useForm({
    initialValues: {
      fullName: '',
      phone: '',
    },
    validate: {
      fullName: (value) => {
        try {
          const firstName = value.split(' ')[0];
          const lastName = value.split(' ')[1];
          if (!firstName || !lastName)
            return 'არასწორი ფორმატი. <სახელი> <გვარი>';
          return null;
        } catch (error) {
          console.error(error);
          return 'არასწორი ფორმატი. <სახელი> <გვარი>';
        }
      },
      phone: (value) => {
        if (!value) return 'არასწორი ფორმატი.<xxx><xx><xx><xx>';
        const constructed = `+995${value}`;
        const phoneNumber = parsePhoneNumberWithError(constructed);
        if (!phoneNumber) return 'არასწორი ფორმატი.<xxx><xx><xx><xx>';
        const res = phoneNumber.isValid();
        if (!res) return 'არასწორი ფორმატი.<xxx><xx><xx><xx>';
        return null;
      },
    },
  });

  const countryCityForm = useForm({
    initialValues: {
      city: '',
      address: '',
    },
    validate: {
      address: isNotEmpty('არ უნდა იყოს ცარიელი'),
      city: isNotEmpty('არ უნდა იყოს ცარიელი'),
    },
  });

    const languagesForm = useForm({
      initialValues: {
        languages: ['ქართული','ინგლისური','რუსული'],
      },
    });

  //   const registerAccount = async (input: CreateFarmerAccountInput) => {
  //     try {
  //       setLoading(true);
  //       const resp = await createAccount({
  //         variables: {
  //           input,
  //         },
  //       });
  //       if (!resp.data) return;
  //       Cookies.set('vctoken', resp.data?.createFarmerAccount.accessToken);
  //       navigate('/account');
  //     } catch (error) {
  //       console.error(error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  const handleFullNamePhoneFormStep = async () => {
    const res = fullNamePhoneForm.validate();
    setLoading(true);

    const phone = `+995${fullNamePhoneForm.getInputProps('phone').value}`;
    const resp = await checkAccount({
      variables: {
        phone,
      },
    });
    if (resp.data?.checkAccount) {
      fullNamePhoneForm.setFieldError(
        'phone',
        'ანგარიში უკვე არსებობს. გაიარე ავტორიზაცია'
      );
      return false;
    }
    setLoading(false);
    if (res.hasErrors) return;
    setActive((current) => (current < 5 ? current + 1 : current));
    return true;
  };

  const handleCountryCityForm = async () => {
    setActive((current) => (current < 5 ? current + 1 : current));
    return true;
  };

  const nextStep = async () => {
    // console.log('current', current)
    // console.log('active', active);
    // if (active === 0) {
    //   const passed = await handleFullNamePhoneFormStep();
    //   if (!passed) return;
    // }

    // if (active === 2) {
    //   const passed = await handleCountryCityForm();
    //   if (!passed) return;
    // }

    setActive((current) => (current < 5 ? current + 1 : current));
  };

  return {
    fullNamePhoneForm,
    countryCityForm,
    nextStep,
    active,
    setActive,
    languagesForm,
  };
};

export default useSignUp;
