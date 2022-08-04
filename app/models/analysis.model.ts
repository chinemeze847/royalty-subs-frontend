export default interface Analysis {
  numberOfUsers: number;
  numberOfBrands: number;
  numberOfProducts: number;
  numberOfProductUnits: number;
  numberOfTransactions: number;
  numberOfPaymentTransactions: number;
  numberOfDepositTransactions: number;
  numberOfBonusTransactions: number;
  sumOfPaymentTransactions: number;
  sumOfDepositTransactions: number;
  sumOfBonusTransactions: number;
}
