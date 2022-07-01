import { PAGE_LIMIT } from '~/constants';
import type ResponseDto from '~/models/response-dto.model';
import type Transaction from '~/models/transaction.model';
import type TransactionsBalance from '~/models/transactions-balance.model';
import HttpService from '~/services/http.service';

const TransactionApiService = {
  getPath(path: string | number = '') {
    return `transactions/${path}`;
  },

  async adminDeposit(
    form: { userId: number; amount: number }, 
    accessToken: string
  ): Promise<ResponseDto<Transaction>> {
    const res = await HttpService.postJson(
      this.getPath('admin/deposit'),
      form,
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readTentenAccountBalance(accessToken: string): Promise<ResponseDto<TransactionsBalance>> {
    const res = await HttpService.get(
      this.getPath('tenten-account-balance'), 
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readOne(id: number | string, accessToken: string): Promise<ResponseDto<Transaction>> {
    const res = await HttpService.get(this.getPath(id), accessToken);
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async read(
    before: string | null, 
    after: string | null, 
    accessToken: string
  ): Promise<ResponseDto<Transaction[]>> {
    const afterQuery = after === null ? '' : `&after=${after}`;
    const beforeQuery = before === null ? '' : `&before=${before}`;
    const res = await HttpService.get(
      this.getPath(`?limit=${PAGE_LIMIT}${beforeQuery}${afterQuery}`), 
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },
};

export default TransactionApiService;
