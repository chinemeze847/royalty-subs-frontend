import type Brand from "~/models/brand.model";
import type ResponseDto from "~/models/response-dto.model";
import type ValidationError from "~/models/validation-error.model";
import HttpService from "~/services/http.service";

const BrandApiService = {
  getPath(path: string | number = '') {
    return `brands/${path}`;
  },

  async create(
    form: { 
      name?: string; 
      apiCode?: string; 
      photoId?: number; 
    },
    accessToken: string
  ): Promise<ResponseDto<Brand | ValidationError[]>> {
    const res = await HttpService.postJson(this.getPath(), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async update(
    id: number | string,
    form: { 
      name?: string; 
      apiCode?: string; 
      photoId?: number; 
    },
    accessToken: string
  ): Promise<ResponseDto<Brand | ValidationError[]>> {
    const res = await HttpService.putJson(this.getPath(id), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readOne(id: number | string, accessToken: string): Promise<ResponseDto<Brand>> {
    const res = await HttpService.get(this.getPath(id), accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async read(accessToken: string): Promise<ResponseDto<Brand[]>> {
    const res = await HttpService.get(this.getPath(), accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
};

export default BrandApiService;
