import type ProductUnit from "./product-unit.model";

export default class Product {
  static readonly TYPE_DATA = 1;

  static readonly TYPE_AIRTIME = 2;

  static readonly TYPE_CABLE = 3;

  static readonly TYPE_ELECTRICITY = 4;

  id!: number;

  name!: string;

  description!: string;

  available!: boolean;

  createdAt!: string;

  productUnits!: ProductUnit[];
}
