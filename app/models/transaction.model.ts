import type ProductUnit from '~/models/product-unit.model';
import type User from '~/models/user.model';

export default class Transaction {

  id!: number;

  userId!: number;

  user!: User;

  referralId!: User | null;

  referral!: User | null;

  productUnitId!: number | null;

  productUnit!: ProductUnit | null;

  reference!: string;

  amount!: number;

  fee!: number;

  type!: string;

  status!: string;

  recipientNumber!: string | null;

  depositMethod!: string | null;

  total!: number;

  createdAt!: string;

  static readonly TYPE_DEPOSIT = 'deposit';

  static readonly TYPE_PAYMENT = 'payment';

  static readonly TYPE_BONUS = 'bonus';

  static readonly STATUS_CREATED = 'created';

  static readonly STATUS_PENDING = 'pending';

  static readonly STATUS_FAILED = 'failed';

  static readonly STATUS_APPROVED = 'approved';

  static readonly DEPOSIT_METHOD_DIRECT = 'direct';

  static readonly DEPOSIT_METHOD_PAYSTACK = 'paystack';

  static readonly MINIMIUM_DEPOSIT_AMOUNT = 500.00;

  static getTypes() {
    return [
      Transaction.TYPE_DEPOSIT,
      Transaction.TYPE_PAYMENT,
    ];
  }

  static getStatuses() {
    return [
      Transaction.STATUS_APPROVED,
      Transaction.STATUS_CREATED,
      Transaction.STATUS_FAILED,
      Transaction.STATUS_PENDING,
    ];
  }

  static getDepositMethods() {
    return [
      Transaction.DEPOSIT_METHOD_DIRECT,
      Transaction.DEPOSIT_METHOD_PAYSTACK,
    ];
  }
}
