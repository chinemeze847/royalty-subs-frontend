export default class User {
  id!: number;

  referralId!: User | null;

  referral!: User | null;

  firstName!: string;

  lastName!: string;

  email!: string;

  phoneNumber!: string;

  password!: string;

  status!: string;

  admin!: boolean;

  adminRole!: string | null;

  emailVerified!: boolean;

  emailVerificationToken!: string;

  createdAt!: string;

  static readonly STATUS_ACTIVATED = 'activated';

  static readonly STATUS_DEACTIVATED = 'deactivated';

  static readonly ADMIN_ROLE_SUB = 'sub';

  static readonly ADMIN_ROLE_SUPER = 'super';

  static getStatuses() {
    return [
      User.STATUS_ACTIVATED,
      User.STATUS_DEACTIVATED,
    ];
  }

  static getAdminRoles() {
    return [
      User.ADMIN_ROLE_SUB,
      User.ADMIN_ROLE_SUPER,
    ];
  }
}
