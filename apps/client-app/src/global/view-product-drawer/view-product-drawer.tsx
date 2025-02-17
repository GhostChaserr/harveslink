import { Drawer, Flex } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconXboxX } from '@tabler/icons-react';
import { useEffect } from 'react';
import { Suspense } from 'react';
import { CUSTOM_EVENTS } from '../../utils/event.utils';

const ViewProductDrawer = () => {
  const [opened, { open, close }] = useDisclosure(false);
  useEffect(() => {
    // Define an event handler that opens the drawer
    const handleOpenDrawer = () => {
      console.log('request open...')
      open();
    };

    // Listen for the custom event "OPEN_ADD_PRODUCT_DRAWER"
    window.addEventListener(
      CUSTOM_EVENTS.OPEN_VIEW_PRODUCT_DRWAER,
      handleOpenDrawer
    );

    // Cleanup the event listener when the component unmounts
    return () => {
      window.removeEventListener(
        CUSTOM_EVENTS.OPEN_VIEW_PRODUCT_DRWAER,
        handleOpenDrawer
      );
    };
  }, [open]);

  return (
    <Flex justify={'end'}>
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
          here goes product details
        </Suspense>
      </Drawer>
    </Flex>
  );
};

export default ViewProductDrawer;
