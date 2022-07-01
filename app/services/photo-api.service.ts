import type Photo from '~/models/photo.model';
import type ResponseDto from '~/models/response-dto.model';
import type ValidationError from '~/models/validation-error.model';
import HttpService from '~/services/http.service';

const PhotoApiService = {
  getPath(path: string | number = '') {
    return `photos/${path}`;
  },

  async create(form: FormData): Promise<ResponseDto<Photo | ValidationError[]>> {
    const res = await HttpService.post(this.getPath(), form);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async update(
    id: number | string,
    form: FormData,
    accessToken: string
  ): Promise<ResponseDto<Photo | ValidationError[]>> {
    const res = await HttpService.put(this.getPath(id), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
};

export default PhotoApiService;
