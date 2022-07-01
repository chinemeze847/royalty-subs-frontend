import type ProductUnit from '~/models/product-unit.model';
import type Product from '~/models/product.model';
import type ResponseDto from '~/models/response-dto.model';
import type ValidationError from '~/models/validation-error.model';
import HttpService from '~/services/http.service';

const ProductApiService = {
  getPath(path: string | number = '') {
    return `products/${path}`;
  },

  async update(
    id: number | string,
    form: {name?: string; description?: string; available?: boolean; },
    accessToken: string
  ): Promise<ResponseDto<Product | ValidationError[]>> {
    const res = await HttpService.putJson(this.getPath(id), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readOne(id: number | string): Promise<ResponseDto<Product>> {
    const res = await HttpService.get(this.getPath(id));
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async read(): Promise<ResponseDto<Product[]>> {
    const res = await HttpService.get(this.getPath());
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readProductUnits(productId: number | string): Promise<ResponseDto<ProductUnit[]>> {
    const res = await HttpService.get(this.getPath(`${productId}/product-units`));
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
};

export default ProductApiService;
