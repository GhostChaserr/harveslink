import { FC } from 'react';
import { Product } from './product-view.interface';
import { Card, Image, Text, Badge, Button, Group, Flex } from '@mantine/core';
import { IconBuildingWarehouse, IconReceipt2 } from '@tabler/icons-react';

interface ProductViewProps {
  data: Product;
  onView: (productId: string) => void;
}

const ProductView: FC<ProductViewProps> = ({ data, onView }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section>
        <Image
          src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/images/bg-8.png"
          height={250}
          alt="Norway"
        />
      </Card.Section>

      <Group justify="space-between" mt="md" mb="xs">
        <Text fw={500}>{data.productName}</Text>
        <Badge color="pink">დარჩა 1 დღე, 10 წუთი</Badge>
      </Group>

      <Text size="sm" c="dimmed">
        {data.description}
      </Text>

      <Flex direction={'column'}>
        <Group mt={'md'}>
          <IconBuildingWarehouse />
          {data.quantityAvailable}
        </Group>

        <Group mt={'md'}>
          <IconReceipt2 />
          {data.price}
        </Group>
      </Flex>

      <Button
        onClick={() => onView(data.id)}
        color="blue"
        fullWidth
        mt="md"
        radius="md"
      >
        დეტალები
      </Button>
    </Card>
  );
};

export default ProductView;
