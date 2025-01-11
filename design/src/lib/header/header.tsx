import { Box, Flex } from '@mantine/core';
import { Button } from '@mantine/core';
import styles from './header.module.css';
import { FC } from 'react';

export type HeaderProps = {
  showAuth: boolean;
};

const Header: FC<HeaderProps> = ({ showAuth }) => {
  return (
    <Box className={styles.container} p={20}>
      <Flex  w={'80%'} m={'auto'} justify={'space-between'}>
        <Box>
          <img height={50} src="./videocv-logo.png" alt="videocv-landing" />
        </Box>
        {showAuth && (
          <Flex gap={'md'} justify={'space-between'}>
            <Button radius={'sm'} size="lg" variant="outline">
              შესვლა
            </Button>
            <Button radius={'md'} size="lg" variant="filled">
              შექმენი ვიდეო სივი
            </Button>
          </Flex>
        )}
      </Flex>
    </Box>
  );
};

export default Header;
