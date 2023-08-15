export interface IToken {
  flag: string;
  value: string;
}

export interface IUser {
  _id: string;
  fullName: string;
  isBlacklisted: boolean;
  email: string;
  phoneNumber: string;
  permissions: any[];
  role: string;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  phoneVerifiedAt: Date;
}
