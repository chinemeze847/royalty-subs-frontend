import { PAGE_LIMIT } from '~/constants';
import type PaystackAuthUrl from '~/models/paystack-auth-url.model';
import type PaystackFee from '~/models/paystack-fee.model';
import type ResponseDto from '~/models/response-dto.model';
import type Transaction from '~/models/transaction.model';
import type TransactionsBalance from '~/models/transactions-balance.model';
import type ValidationError from '~/models/validation-error.model';
import HttpService from '~/services/http.service';

const TransactionApiService = {
  getPath(path: string | number = '') {
    return `transactions/${path}`;
  },

  async initializePaystack(
    form: { email: string; amount: number; reference: string; callback_url: string; }
  ): Promise<ResponseDto<PaystackAuthUrl>> {
    const res = await fetch('https://api.paystack.co/transaction/initialize', { 
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async deposit(
    form: { amount?: number }, 
    accessToken: string
  ): Promise<ResponseDto<Transaction | ValidationError[]>> {
    const res = await HttpService.postJson(
      this.getPath('deposit'),
      form,
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async adminDeposit(
    form: { userId: number; amount: number }, 
    accessToken: string
  ): Promise<ResponseDto<Transaction | ValidationError[]>> {
    const res = await HttpService.postJson(
      this.getPath('admin/deposit'),
      form,
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async paymentData(
    form: { productUnitId: number; phoneNumber?: string; }, 
    accessToken: string
  ): Promise<ResponseDto<Transaction | ValidationError[]>> {
    const res = await HttpService.postJson(
      this.getPath('payment/data'),
      form,
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async paymentAirtime(
    form: { productUnitId: number; phoneNumber?: string; }, 
    accessToken: string
  ): Promise<ResponseDto<Transaction | ValidationError[]>> {
    const res = await HttpService.postJson(
      this.getPath('payment/airtime'),
      form,
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async paymentElectricity(
    form: { productUnitId: number; meterNumber?: string; }, 
    accessToken: string
  ): Promise<ResponseDto<Transaction | ValidationError[]>> {
    const res = await HttpService.postJson(
      this.getPath('payment/electricity'),
      form,
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async paymentCable(
    form: { productUnitId: number; smartCardNumber?: string; }, 
    accessToken: string
  ): Promise<ResponseDto<Transaction | ValidationError[]>> {
    const res = await HttpService.postJson(
      this.getPath('payment/cable-subscription'),
      form,
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async updateStatus(
    id: string | number,
    form: { status: string; }, 
    accessToken: string
  ): Promise<ResponseDto<Transaction | ValidationError[]>> {
    const res = await HttpService.putJson(
      this.getPath(`${id}/status`),
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
    page: string | null, 
    accessToken: string
  ): Promise<ResponseDto<Transaction[]>> {
    const pageQuery = page === null ? '' : `&page=${page}`;
    const res = await HttpService.get(
      this.getPath(`?limit=${PAGE_LIMIT}${pageQuery}`), 
      accessToken
    );
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  },

  async readPaystackFee(): Promise<ResponseDto<PaystackFee>> {
    const res = await HttpService.get(this.getPath('paystack-fee'));
    const data = await res.json();
    data.statusCode = res.status;
    return data;
  }
};

export default TransactionApiService;
