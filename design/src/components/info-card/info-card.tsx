import { Text, Card } from '@mantine/core';

import { FC, ReactNode } from 'react';

type InfoCardProps = {
  title: string;
  value: number | string | ReactNode;
};

const InfoCard: FC<InfoCardProps> = ({ title, value }) => {
  return (
    <Card padding="md" shadow="xs">
      <Text fz={10} tt="uppercase" fw={700}>
        {title}
      </Text>
      <Text fz="md" fw={500}>
        {value}
      </Text>
    </Card>
  );
};

export default InfoCard;
