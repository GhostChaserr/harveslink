import { useForm } from '@mantine/form';
import { parsePhoneNumberWithError } from 'libphonenumber-js';
import { useState } from 'react';

import { useNavigate } from 'react-router';
import {
  useGenerateOtpMutation,
  useSignInMutation,
} from '@harveslink/generated';

import { SCREEN_MAPPINGS } from '../../config';

const useSignIn = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [generateOtp] = useGenerateOtpMutation();
  const [signIn] = useSignInMutation();
  const [active, setActive] = useState<number>(0);

  const phoneForm = useForm({
    initialValues: {
      phone: '',
    },
    validate: {
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

  const otpForm = useForm({
    initialValues: {
      code: '',
    },
  });

  const nextStep = async () => {
    // case. request OTP
    if (active === 0) {
      const res = phoneForm.validate();
      if (res.hasErrors) return;
      const phone = `+995${phoneForm.getInputProps('phone').value}`;
      setLoading(true);
      await generateOtp({
        variables: {
          phone,
        },
      });
      setLoading(false);
      setActive((current) => (current < 5 ? current + 1 : current));
      return;
    }

    // case. validate OTP
    if (active === 1) {
      try {
        const res = otpForm.validate();
        if (res.hasErrors) return;
        const phone = `+995${phoneForm.getInputProps('phone').value}`;
        const code = parseInt(otpForm.getInputProps('code').value);
        setLoading(true);
        const resp = await signIn({
          variables: {
            phone,
            code,
          },
        });
        if (!resp.data) return;
        sessionStorage.setItem('session', resp.data?.signIn.accessToken);
        navigate(SCREEN_MAPPINGS.HOME);
      } catch (error) {
        console.error(error);
        otpForm.setFieldError('code', 'არასწორი კოდი');
      } finally {
        setLoading(false);
      }
      return;
    }

    setActive((current) => (current < 5 ? current + 1 : current));
  };

  return {
    loading,
    setLoading,
    phoneForm,
    active,
    setActive,
    otpForm,
    nextStep,
  };
};

export default useSignIn;
