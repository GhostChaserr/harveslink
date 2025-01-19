import { useState } from 'react';
import { isNotEmpty, useForm } from '@mantine/form';
import { ProductFormValues } from './product-form.interface';

const useProductForm = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [active, setActive] = useState<number>(0);

  const nameDescriptionForm = useForm({
    initialValues: {
      productName: '',
      description: '',
      category: '',
    },
    validate: {
      productName: isNotEmpty('არ უნდა იყოს ცარიელი'),
      description: isNotEmpty('არ უნდა იყოს ცარიელი'),
      category: isNotEmpty('ველი არ უნდა იყოს ცარიელი'),
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

  const unitQuantityPriceForm = useForm({
    initialValues: {
      quantityAvailable: null,
      price: null,
      unit: null,
    },
    validate: {
      unit: isNotEmpty('ველი არ უნდა იყოს ცარიელი'),
      price: isNotEmpty('ველი არ უნდა იყოს ცარიელი'),
      quantityAvailable: isNotEmpty('ველი არ უდნა იყოს ცარიელი'),
    },
  });

  const startExpiryForm = useForm({
    initialValues: {
      startDate: null,
      expiryDate: null,
    },
    validate: {
      startDate: isNotEmpty('ველი არ უნდა იყოს ცარიელი'),
      expiryDate: isNotEmpty('ველი არ უნდა იყოს ცარიელი'),
    },
  });

  const handleNameDescriptionStep = () => {
    const result = nameDescriptionForm.validate();
    if (result.hasErrors) {
      console.error(result);
      return false;
    }

    return true;
  };

  const handleUnitQuantityPriceStep = () => {
    const result = unitQuantityPriceForm.validate();
    if (result.hasErrors) {
      console.error(result);
      return false;
    }

    return true;
  };

  const handleStartExpiryFormStep = () => {
    const result = startExpiryForm.validate();
    if (result.hasErrors) {
      console.error(result);
      return false;
    }

    return true;
  };

  const handleCountryCityForm = () => {
    const result = countryCityForm.validate();
    if (result.hasErrors) {
      console.error(result);
      return false;
    }

    return true;
  };

  const nextStep = async () => {
    if (active === 0) {
      const passed = handleNameDescriptionStep();
      if (!passed) return;
    }

    if (active === 1) {
      const passed = handleUnitQuantityPriceStep();
      if (!passed) return;
    }

    if (active === 2) {
      const passed = handleStartExpiryFormStep();
      if (!passed) return;
    }

    if (active === 3) {
      const passed = handleCountryCityForm();
      if (!passed) return;
      setFinished(true);
    }

    setActive((current) => (current < 5 ? current + 1 : current));
  };

  const handleFinish = (): ProductFormValues => {
    const productName = nameDescriptionForm.getInputProps('productName').value;
    const description = nameDescriptionForm.getInputProps('description').value;
    const category = nameDescriptionForm.getInputProps('category').value;
    const price = parseFloat(
      unitQuantityPriceForm.getInputProps('price').value
    );
    const unit = unitQuantityPriceForm.getInputProps('unit').value;
    const quantityAvailable = parseFloat(
      unitQuantityPriceForm.getInputProps('quantityAvailable').value
    );
    const startDate = startExpiryForm.getInputProps('startDate').value;
    const expiryDate = startExpiryForm.getInputProps('expiryDate').value;
    const city = countryCityForm.getInputProps('city').value;
    const address = countryCityForm.getInputProps('address').value;

    const values: ProductFormValues = {
      productName,
      description,
      category,
      price,
      unit,
      quantityAvailable,
      startDate,
      expiryDate,
      city,
      address,
    };

    return values;
  };

  return {
    setLoading,
    handleFinish,
    finished,
    startExpiryForm,
    unitQuantityPriceForm,
    nameDescriptionForm,
    countryCityForm,
    active,
    setActive,
    nextStep,
    loading,
  };
};

export default useProductForm;
