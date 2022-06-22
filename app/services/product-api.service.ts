import HttpService from "~/services/http.service";
import type ProductUnit from "../models/product-unit.model";
import type Product from "../models/product.model";
import type ResponseDto from "../models/response-dto.model";

const ProductApiService = {
  getPath(path = '') {
    return `products/${path}`;
  },

  async read(): Promise<ResponseDto<Product[]>> {
    const res = await HttpService.get(this.getPath());
    return res.json();
  },

  async readProductUnits(productId: number): Promise<ResponseDto<ProductUnit[]>> {
    const res = await HttpService.get(this.getPath(`${productId}/product-units`));
    return res.json();
  },
};

export default ProductApiService;
