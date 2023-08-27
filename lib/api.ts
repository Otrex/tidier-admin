import Api from "./core/Api";
import { AddNewUserRequest, LoginRequest } from "./models/requests";
import { AddNewUserResponse, GetServicesResponse, GetUsersResponse, LoginResponse } from "./models/responses";

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

  async BlacklistUser(userId: string, key = false) {
    return this.request("get", `/users/${userId}/set?blacklist=${key}`)
  }

  async GetServices() {
    return this.request<GetServicesResponse>("get", "/services")
  }
  async AddServices(data: FormData) {
    return this.request<GetServicesResponse>("post", "/services", data)
  }

  async UpdateServices(data: FormData) {
    data.append("_method", "patch");
    return this.request<GetServicesResponse>("post", "/services", data)
  }
}

export default new TidierAPI();
