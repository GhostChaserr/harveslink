import { Button, Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus, IconXboxX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { Suspense, lazy } from 'react';
import { CUSTOM_EVENTS } from '../../utils/event.utils';

const ProductFormFeature = lazy(
  () => import('../../features/product-form-feature/ProductFormFeature')
);

const StoreAddProduct = () => {
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    // Define an event handler that opens the drawer
    const handleOpenDrawer = () => {
      open();
    };

    // Listen for the custom event "OPEN_ADD_PRODUCT_DRAWER"
    window.addEventListener(
      CUSTOM_EVENTS.OPEN_ADD_PRODUCT_DRAWER,
      handleOpenDrawer
    );

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener(
        CUSTOM_EVENTS.OPEN_ADD_PRODUCT_DRAWER,
        handleOpenDrawer
      );
    };
  }, [open]);

  const handleFinish = () => {
    console.log('Form submitted:');
    close();
  };

  return (
    <Flex justify={'end'}>
      <Button onClick={open} leftSection={<IconPlus />}>
        პროდუქტის დამატება
      </Button>
      <Drawer
        closeButtonProps={{
          icon: <IconXboxX size={20} stroke={1.5} />,
        }}
        position="bottom"
        withCloseButton={false}
        overlayProps={{ backgroundOpacity: 0.5, blur: 4 }}
        opened={opened}
        onClose={close}
        size={'95%'}
      >
        <Suspense fallback={<div>Loading...</div>}>
          <ProductFormFeature onFinish={handleFinish} />
        </Suspense>
      </Drawer>
    </Flex>
  );
};

export default StoreAddProduct;
