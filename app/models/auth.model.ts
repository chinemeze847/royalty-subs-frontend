export default interface Auth {
  type: string;
  userId: number;
  accessToken: string;
  userIsAdmin: boolean;
}
