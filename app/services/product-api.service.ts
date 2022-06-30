import type ProductUnit from '~/models/product-unit.model';
import type Product from '~/models/product.model';
import type ResponseDto from '~/models/response-dto.model';
import HttpService from '~/services/http.service';

const ProductApiService = {
  getPath(path = '') {
    return `products/${path}`;
  },

  async read(): Promise<ResponseDto<Product[]>> {
    const res = await HttpService.get(this.getPath());
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readProductUnits(productId: number): Promise<ResponseDto<ProductUnit[]>> {
    const res = await HttpService.get(this.getPath(`${productId}/product-units`));
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
};

export default ProductApiService;
