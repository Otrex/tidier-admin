// Generated by https://quicktype.io

import { IToken, IUser } from ".";

interface BaseResponse {
  state: string;
  timestamp: number;
}

interface BasePaginationResponse<T> extends BaseResponse {
  data: T[];
  pageData:  PageData;
}

export interface LoginResponse extends BaseResponse {
  user: IUser;
  token: IToken;
}

export interface AddNewUserResponse extends BaseResponse {
  user: IUser;
  password: string;
}

export interface GetUsersResponse extends BasePaginationResponse<IUser> {}

export interface PageData {
  total:       number;
  currentPage: number;
  nextPage:    null | number;
  prevPage:    null | number;
  lastPage:    number;
}
 
