import { PAGE_LIMIT } from "~/constants";
import type Transaction from "~/models/transaction.model";
import type TransactionsBalance from "~/models/transactions-balance.model";
import type User from "~/models/user.model";
import type ValidationError from "~/models/validation-error.model";
import type ResponseDto from "../models/response-dto.model";
import HttpService from "~/services/http.service";

const UserApiService = {
  getPath(path: string | number = '') {
    return `users/${path}`;
  },

  async create(
    form: { 
      firstName?: string; 
      lastName?: string; 
      email?: string; 
      phoneNumber?: string; 
      password?: string; 
      referralId?: number;
    }
  ): Promise<ResponseDto<User | ValidationError[]>> {
    const res = await HttpService.postJson(this.getPath(), form);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async update(
    id: number | string,
    form: { firstName?: string; lastName?: string; email?: string; phoneNumber?: string; },
    accessToken: string
  ): Promise<ResponseDto<User | ValidationError[]>> {
    const res = await HttpService.putJson(this.getPath(id), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async updatePassword(
    id: number | string,
    form: { password?: string; newPassword?: string; },
    accessToken: string
  ): Promise<ResponseDto<User | ValidationError[]>> {
    const res = await HttpService.putJson(this.getPath(`${id}/password`), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async updateStatus(
    id: number | string,
    form: { status?: string; },
    accessToken: string
  ): Promise<ResponseDto<User | ValidationError[]>> {
    const res = await HttpService.putJson(this.getPath(`${id}/status`), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async updateAdmin(
    id: number | string,
    form: { admin?: boolean; },
    accessToken: string
  ): Promise<ResponseDto<User | ValidationError[]>> {
    const res = await HttpService.putJson(this.getPath(`${id}/admin`), form, accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readOne(id: number | string, accessToken: string): Promise<ResponseDto<User>> {
    const res = await HttpService.get(this.getPath(id), accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readTransactionBalance(
    id: number | string, accessToken: string
  ): Promise<ResponseDto<TransactionsBalance>> {
    const res = await HttpService.get(this.getPath(`${id}/transactions-balance`), accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async read(
    page: string | null, 
    accessToken: string
  ): Promise<ResponseDto<User[]>> {
    const pageQuery = page === null ? '' : `&page=${page}`;
    const res = await HttpService.get(
      this.getPath(`?limit=${PAGE_LIMIT}${pageQuery}`), 
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readReferrals(
    id: string | number,
    page: string | null, 
    accessToken: string
  ): Promise<ResponseDto<User[]>> {
    const pageQuery = page === null ? '' : `&page=${page}`;
    const res = await HttpService.get(
      this.getPath(`${id}/referrals?limit=${PAGE_LIMIT}${pageQuery}`), 
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readTransactions(
    id: string | number,
    page: string | null, 
    type: string | null,
    accessToken: string
  ): Promise<ResponseDto<Transaction[]>> {
    const pageQuery = page === null ? '' : `&page=${page}`;
    const typeQuery = type === null ? '' : `&type=${type}`;
    const res = await HttpService.get(
      this.getPath(`${id}/transactions?limit=${PAGE_LIMIT}${pageQuery}${typeQuery}`), 
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
};

export default UserApiService;
