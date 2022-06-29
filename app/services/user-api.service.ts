import { PAGE_LIMIT } from "~/constants";
import type User from "~/models/user.model";
import type ValidationError from "~/models/validation-error.model";
import HttpService from "~/services/http.service";
import type ResponseDto from "../models/response-dto.model";

const UserApiService = {
  getPath(path: string | number = '') {
    return `users/${path}`;
  },

  async create(
    form: { firstName?: string; lastName?: string; email?: string; phoneNumber?: string; password?: string; }
  ): Promise<{ status: number; body: ResponseDto<User | ValidationError[]> }> {
    const res = await HttpService.postJson(this.getPath(), form);
    const body = await res.json();
    return { status: res.status, body };
  },

  async update(
    id: number | string,
    form: { firstName?: string; lastName?: string; email?: string; phoneNumber?: string; },
    accessToken: string
  ): Promise<{ status: number; body: ResponseDto<User | ValidationError[]> }> {
    const res = await HttpService.putJson(this.getPath(id), form, accessToken);
    const body = await res.json();
    return { status: res.status, body };
  },

  async updatePassword(
    id: number | string,
    form: { password?: string; newPassword?: string; },
    accessToken: string
  ): Promise<{ status: number; body: ResponseDto<User | ValidationError[]> }> {
    const res = await HttpService.putJson(this.getPath(`${id}/password`), form, accessToken);
    const body = await res.json();
    return { status: res.status, body };
  },

  async readOne(id: number | string, accessToken: string): Promise<{ status: number; body: ResponseDto<User> }> {
    const res = await HttpService.get(this.getPath(id), accessToken);
    const body = await res.json();
    return { status: res.status, body };
  },

  async readTransactionBalance(
    id: number | string, accessToken: string
  ): Promise<{ status: number; body: ResponseDto<{ transactionsBalance: number }> }> {
    const res = await HttpService.get(this.getPath(`${id}/transactions-balance`), accessToken);
    const body = await res.json();
    return { status: res.status, body };
  },

  async read(before: number | null, accessToken: string): Promise<ResponseDto<User[]>> {
    const beforeQuery = before === null ? '' : `&before=${before}`;
    const res = await HttpService.get(
      this.getPath(`?limit=${PAGE_LIMIT}${beforeQuery}`), 
      accessToken
    );
    return res.json();
  },
};

export default UserApiService;
