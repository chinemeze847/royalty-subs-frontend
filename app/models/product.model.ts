import type ProductUnit from "./product-unit.model";

export default interface Product {
  id: number;

  name: string;

  description: string;

  available: boolean;

  createdAt: string;

  productUnits: ProductUnit[];
}
