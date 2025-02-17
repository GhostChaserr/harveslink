import { useGetProductsQuery } from '@harveslink/generated';
import { Flex, Loader } from '@mantine/core';
import { GENERATE_PRODUCTS_MOCK, ProductView } from 'design';
import { CUSTOM_EVENTS } from '../../utils/event.utils';

const ProductsFeedFeature = () => {
  const products = useGetProductsQuery({
    variables: {
      page: 1,
      limit: 1000,
    },
  });
  if (products.loading) return <Loader />;

  const onProductView = (productId: string) => {
    const event = new CustomEvent(CUSTOM_EVENTS.OPEN_VIEW_PRODUCT_DRWAER, {
      detail: { productId }, // Pass the productId here
    });
    window.dispatchEvent(event);
  };

  return (
    <Flex w={'100%'} justify={'center'}>
      <Flex direction={'column'} maw={600} gap={'md'}>
        {GENERATE_PRODUCTS_MOCK().map((product) => (
          <ProductView
            key={product.id}
            onView={onProductView}
            data={{
              address: product.address || '',
              city: product.city || '',
              country: product.country || '',
              createdAt: product.createdAt,
              currency: product.currency,
              description: product.description,
              expiryDate: product.expiryDate,
              id: product.id,
              price: product.price,
              productName: product.productName,
              quantityAvailable: product.quantityAvailable,
              startDate: product.startDate,
              status: product.status,
              updatedAt: product.updatedAt,
            }}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default ProductsFeedFeature;
