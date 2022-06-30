import type Auth from '~/models/auth.model';
import type ResponseDto from '~/models/response-dto.model';
import HttpService from '~/services/http.service';

const AuthApiService = {
  getPath(path = '') {
    return `auth/${path}`;
  },

  async create(
    form: { email?: string; password?: string; }
  ): Promise<ResponseDto<Auth>> {
    const res = await HttpService.postJson(this.getPath(), form);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
};

export default AuthApiService;
