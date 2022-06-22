import type User from "~/models/user.model";
import type ValidationError from "~/models/validation-error.model";
import HttpService from "~/services/http.service";
import type ResponseDto from "../models/response-dto.model";

const UserApiService = {
  getPath(path = '') {
    return `users/${path}`;
  },

  async create(
    form: { firstName?: string; lastName?: string; email?: string; phoneNumber?: string; password?: string; }
  ): Promise<{ status: number; body: ResponseDto<User | ValidationError[]> }> {
    const res = await HttpService.postJson(this.getPath(), form);
    const body = await res.json();
    return { status: res.status, body };
  },
};

export default UserApiService;
