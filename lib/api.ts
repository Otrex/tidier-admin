import Api from "./core/Api";
import { AddNewUserRequest, LoginRequest } from "./models/requests";
import { AddNewUserResponse, GetUsersResponse, LoginResponse } from "./models/responses";

class TidierAPI extends Api {
  // Auth
  async Login(data: LoginRequest) {
    return this.request<LoginResponse>("post", "/auth/login", data);
  }

  async GetUsers() {
    return this.request<GetUsersResponse>("get", "/users")
  }

  async AddNewUser(data: AddNewUserRequest) {
    return this.request<AddNewUserResponse>("post", "/users", data);
  }
}

export default new TidierAPI();
