import { FC, ReactNode } from 'react';
import {
  AppShell,
  Box,
  Center,
  Flex,
  Stack,
  Tooltip,
  UnstyledButton,
  rem,
} from '@mantine/core';
import { MantineLogo } from '@mantinex/mantine-logo';

import { useDisclosure } from '@mantine/hooks';
import classes from './layout.module.css';
import {
  IconCirclePlus,
  IconHome,
  IconHome2,
  IconLogout,
  IconNews,
  IconShoppingBag,
  IconBrandAppgallery,
  IconGavel,
  IconTruckDelivery,
  IconUser,
} from '@tabler/icons-react';

import { isMobile } from 'react-device-detect';

import { useApolloClient } from '@apollo/client';
import { useNavigate } from 'react-router';
import { useGetSessionQuery } from '@harveslink/generated';
import { User } from 'design';

interface NavbarLinkProps {
  icon: typeof IconHome2;
  label: string;
  path: string;
}

type LayoutProps = {
  children: ReactNode;
};

const mockdata = [
  { icon: IconBrandAppgallery, label: 'მაღაზია', path: '/store' },
  { icon: IconGavel, label: 'აუქციონები', path: '/auctions' },
  { icon: IconTruckDelivery, label: 'ორდერები', path: '/orders' },
  { icon: IconUser, label: 'ანგარიში', path: '/account' },
];

function NavbarLink({ icon: Icon, label, path }: NavbarLinkProps) {
  const client = useApolloClient();
  let isOnSamePage = false;
  if (path === '/products') {
    isOnSamePage = window.location.pathname.includes(path);
  } else if (path === '/auctions') {
    isOnSamePage = window.location.pathname.includes(path);
  } else if (path === '/orders') {
    isOnSamePage = window.location.pathname.includes(path);
  } else {
    isOnSamePage = window.location.pathname === path;
  }
  const navigate = useNavigate();
  const onNavClick = async () => {
    if (path === '/logout') {
      client.clearStore();
      navigate('/signup');
      return;
    }

    if (path === '/change-account') {
      return;
    }

    navigate(path);
  };

  return (
    <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
      <UnstyledButton
        onClick={onNavClick}
        className={classes.link}
        data-active={isOnSamePage || undefined}
        p={12}
      >
        <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const navigate = useNavigate();
  const clinet = useApolloClient();
  const { data } = useGetSessionQuery();
  const [opened] = useDisclosure();
  const links = mockdata.map((link, index) => (
    <NavbarLink {...link} key={link.label} path={link.path} />
  ));

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
    <AppShell
      layout="alt"
      transitionDuration={500}
      transitionTimingFunction="ease"
      header={{ height: 70 }}
      navbar={{ width: 85, breakpoint: 'sm', collapsed: { mobile: !opened } }}
    >
      <AppShell.Header>
        <Flex h="100%" px="md" align={'center'} justify={'end'}>
          {/* <Checkout /> */}
          <User
            lastName={data?.session.fullName.split(' ')[0] as string}
            firstName={data?.session.fullName.split(' ')[1] as string}
            email={''}
          />
        </Flex>
      </AppShell.Header>
      <AppShell.Navbar p="md" bg={'yellow'}>
        <Center>
          <MantineLogo
            cursor={'pointer'}
            onClick={() => navigate('/landing')}
            type="mark"
            inverted
            size={30}
          />
        </Center>
        <Box mt={40} className={classes.navbarMain}>
          <Stack justify="center" gap={0}>
            {links}
          </Stack>
        </Box>
        <Stack justify="center" gap={0}>
          <NavbarLink
            path="/logout"
            icon={IconLogout}
            label="სისტემიდან გამოსვლა"
          />
        </Stack>
      </AppShell.Navbar>
      <AppShell.Main mt={'xl'} ml={'sm'} mr={'sm'} mb={80}>
        {children}
      </AppShell.Main>
      {isMobile && (
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
              bg={'yellow'}
              p={'xs'}
              onClick={() => console.log('add')}
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
      )}
    </AppShell>
  );
};

export default Layout;
