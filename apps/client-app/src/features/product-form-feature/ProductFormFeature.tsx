import { useGetCategoriesQuery, useGetUnitsQuery } from '@harveslink/generated';
import { ProductForm, ProductFormValues } from 'design';
import { FC } from 'react';
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ProductFormFeatureProps {
  onFinish: (values: ProductFormValues) => void;
}

const ProductFormFeature: FC<ProductFormFeatureProps> = ({ onFinish }) => {
  const categoriesResult = useGetCategoriesQuery();
  const unitsResult = useGetUnitsQuery();

  const loading = categoriesResult.loading || unitsResult.loading;

  if (loading) return null;

  const unitsList = unitsResult.data ? unitsResult.data.units : [];
  const categoriesList = categoriesResult.data
    ? categoriesResult.data.categories
    : [];

  const processProductForm = async (values: ProductFormValues) => {
    await sleep(2000);
    console.log(values);
    onFinish(values);
  };

  return (
    <ProductForm
      processProductForm={processProductForm}
      units={unitsList.map((item) => ({
        id: item.id,
        name: item.name,
      }))}
      categories={categoriesList.map((item) => ({
        id: item.id,
        name: item.category,
      }))}
    />
  );
};

export default ProductFormFeature;
