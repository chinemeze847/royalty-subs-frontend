import { API_URL } from "../constants";
import type ProductUnit from "../models/product-unit.model";
import type Product from "../models/product.model";
import type ResponseDto from "../models/response-dto.model";

const API_URL_PATH = `${API_URL}products/`;

const ProductApiService = {
  async read(): Promise<ResponseDto<Product[]>> {
    const res = await fetch(API_URL_PATH);
    return res.json();
  },

  async readProductUnits(productId: number): Promise<ResponseDto<ProductUnit[]>> {
    const res = await fetch(`${API_URL_PATH}${productId}/product-units`);
    return res.json();
  },
};

export default ProductApiService;
