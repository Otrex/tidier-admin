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

export enum ServiceProductType {
  CLEANING = 'Cleaning',
  TRASH = 'Trash',
  COOKING = 'Cooking',
}


export interface IService {
  _id:                  string;
  type:                 ServiceProductType;
  name:                 string;
  costPerUnit:          number;
  isActive: boolean;
  unit:                 string;
  equipments:           string[];
  equipmentCostPerUnit: number;
  description:          string;
  image:                string;
  __v:                  number;
}

export interface IWallet {
  _id:       string;
  user:      string;
  general:   boolean;
  balance:   number;
  createdAt: Date;
  updatedAt: Date;
  __v:       number;
}