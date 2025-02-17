import { Product } from './product-details-view.interface';

export interface ProductDetailsViewProps {
  props: Product;
}

const ProductDetailsView = () => {
  return <div>Product Details</div>;
};

export default ProductDetailsView;
