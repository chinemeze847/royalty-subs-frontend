export default interface AuthPermissionError {
  userId: number;
  errorCode: 'ACCOUNT_EMAIL_UNVERIFIED' | 'ACCOUNT_DEACTIVATED';
}
