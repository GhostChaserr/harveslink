import { FC, ReactNode } from 'react';
import {
  AppShell,
  Box,
  Flex,
  Text,
  UnstyledButton,
  useMantineTheme,
} from '@mantine/core';

import classes from './layout.module.css';
import {
  IconCirclePlus,
  IconHome,
  IconLogout,
  IconNews,
  IconShoppingBag,
  IconArrowNarrowLeft,
  IconMenuDeep,
} from '@tabler/icons-react';

import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router';
import { CUSTOM_EVENTS } from '../../utils/event.utils';

type LayoutProps = {
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const theme = useMantineTheme();
  const navigate = useNavigate();
  const clinet = useApolloClient();

  const onNavClick = async (path: string) => {
    if (path === '/logout') {
      clinet.clearStore();
      navigate('/signup');
      return;
    }

    if (path === '/change-account') {
      return;
    }

    navigate(path);
  };

  return (
    <AppShell layout="alt" header={{ height: 70 }}>
      <AppShell.Header>
        <Flex p={'md'} h={'100%'} justify={'space-between'} align={'center'}>
          <Flex gap={'sm'} align={'center'} justify={'space-between'}>
            <IconArrowNarrowLeft
              style={{ position: 'relative', top: '2px' }}
              color={theme.colors.secondary[11]}
              size={35}
            />
            <Text mt={'sm'} size="md" c={theme.colors.secondary[11]}>
              მაღაზია
            </Text>
          </Flex>
          <Box>
            <IconMenuDeep color={theme.colors.secondary[11]} size={35} />
          </Box>
        </Flex>
      </AppShell.Header>
      <AppShell.Main>{children}</AppShell.Main>
      <AppShell.Footer>
        <Flex justify={'space-between'} p={'md'}>
          <UnstyledButton onClick={() => onNavClick('/landing')}>
            <IconHome size={26} stroke={1.5} />
          </UnstyledButton>
          <UnstyledButton onClick={() => onNavClick('/store')}>
            <IconShoppingBag size={26} stroke={1.5} />
          </UnstyledButton>
          <UnstyledButton
            className={classes.button}
            bg={theme.colors.primary[6]}
            p={'xs'}
            onClick={() => {
              const event = new Event(CUSTOM_EVENTS.OPEN_ADD_PRODUCT_DRAWER);
              window.dispatchEvent(event);
            }}
          >
            <IconCirclePlus size={26} stroke={1.5} />
          </UnstyledButton>
          <UnstyledButton onClick={() => onNavClick('/articles')}>
            <IconNews size={26} stroke={1.5} />
          </UnstyledButton>
          <UnstyledButton onClick={() => onNavClick('/logout')}>
            <IconLogout size={26} stroke={1.5} />
          </UnstyledButton>
        </Flex>
      </AppShell.Footer>
    </AppShell>
  );
};

export default Layout;
