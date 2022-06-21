import type Brand from './brand.model';
import type Product from './product.model';

export default interface ProductUnit {
  id: number;

  brandId: number;

  brand: Brand;

  productId: number;

  product: Product;

  name: string;

  price: number;

  duration: number;

  apiCode: number;

  available: boolean;

  type: string;

  createdAt: string;
}
