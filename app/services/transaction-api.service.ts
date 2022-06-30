import type ResponseDto from '~/models/response-dto.model';
import type Transaction from '~/models/transaction.model';
import HttpService from '~/services/http.service';

const TransactionApiService = {
  getPath(path = '') {
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
};

export default TransactionApiService;
