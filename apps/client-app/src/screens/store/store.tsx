import { useGetProductsQuery } from '@harveslink/generated';

const StoreScreen = () => {
  const page = 1;
  const limit = 1000;
  const { data, loading, error } = useGetProductsQuery({
    variables: {
      page,
      limit,
      filter:{}
    },
  });
  console.log('data:', data);
  console.log('loading', loading);
  console.log('error', error);
  return <div>Products Store</div>;
};

export default StoreScreen;
