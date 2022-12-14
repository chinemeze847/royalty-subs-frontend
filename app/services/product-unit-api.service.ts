import type ProductUnit from "~/models/product-unit.model";
import type ResponseDto from "~/models/response-dto.model";
import type ValidationError from "~/models/validation-error.model";
import HttpService from "~/services/http.service";

const ProductUnitApiService = {
  getPath(path: string | number = '') {
    return `product-units/${path}`;
  },

  async create(
    form: { 
      name?: string; 
      apiCode?: number; 
      price?: number; 
      purchasingPrice?: number;
      duration?: number; 
      available?: boolean; 
      type?: string; 
      productId?: number; 
      brandId?: number; 
    },
    accessToken: string
  ): Promise<ResponseDto<ProductUnit | ValidationError[]>> {
    const res = await HttpService.postJson(this.getPath(), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async update(
    id: string | number,
    form: { 
      name?: string; 
      apiCode?: number; 
      price?: number; 
      purchasingPrice?: number;
      duration?: number; 
      available?: boolean; 
      type?: string;  
      brandId?: number; 
    },
    accessToken: string
  ): Promise<ResponseDto<ProductUnit | ValidationError[]>> {
    const res = await HttpService.putJson(this.getPath(id), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readOne(id: number | string): Promise<ResponseDto<ProductUnit>> {
    const res = await HttpService.get(this.getPath(id));
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
}

export default ProductUnitApiService;
