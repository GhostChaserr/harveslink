import { FC } from 'react';
import { Text, Avatar, Group, Box } from '@mantine/core';
import { isMobile } from 'react-device-detect';
import classes from './user.module.css';

export type UserProps = {
  firstName: string;
  lastName: string;
  email: string;
};

export const User: FC<UserProps> = ({ firstName, lastName, email }) => {
  return (
    <Box className={classes.user}>
      <Group>
        {!isMobile && (
          <Avatar variant="filled" radius="xl" color="yellow" src="" />
        )}

        <div style={{ flex: 1 }}>
          <Text size="sm" fw={500}>
            {firstName}
            {lastName}
          </Text>

          <Text c="dimmed" size="xs">
            {email}
          </Text>
        </div>
      </Group>
    </Box>
  );
};

export default User;
