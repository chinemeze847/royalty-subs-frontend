import type Photo from './photo.model';
import type ProductUnit from './product-unit.model';

export default interface Brand {
  id: number;

  photo: Photo;

  name: string;

  apiCode: number;

  createdAt: string;

  productUnits: ProductUnit[];
}
