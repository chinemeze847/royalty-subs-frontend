import type AuthPermissionError from '~/models/auth-permission-error.model';
import type Auth from '~/models/auth.model';
import type ResponseDto from '~/models/response-dto.model';
import type ValidationError from '~/models/validation-error.model';
import HttpService from '~/services/http.service';

const AuthApiService = {
  getPath(path = '') {
    return `auth/${path}`;
  },

  async create(
    form: { email?: string; password?: string; }
  ): Promise<ResponseDto<Auth | AuthPermissionError>> {
    const res = await HttpService.postJson(this.getPath(), form);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async forgotPassword(
    form: { email?: string; }
  ): Promise<ResponseDto<void | ValidationError[]>> {
    const res = await HttpService.postJson(this.getPath('forgot-password'), form);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async resetPassword(
    form: { passwordResetToken?: string; password?: string; }
  ): Promise<ResponseDto<void | ValidationError[]>> {
    const res = await HttpService.postJson(this.getPath('reset-password'), form);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
};

export default AuthApiService;
