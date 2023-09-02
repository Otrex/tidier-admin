import Api from "./core/Api";
import { AddNewUserRequest, LoginRequest } from "./models/requests";
import { AddNewUserResponse, GetDashboardStats, GetServicesResponse, GetUsersResponse, LoginResponse } from "./models/responses";

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

  async DeleteUsers(id: string) {
    return this.request("delete", `/users/${id}`)
  }

  async GetServices() {
    return this.request<GetServicesResponse>("get", "/services")
  }
  async AddServices(data: FormData) {
    return this.request("post", "/services", data)
  }

  async UpdateServices(id: string, data: FormData) {
    return this.request("patch", `/services/${id}`, data)
  }

  async DeleteServices(id: string) {
    return this.request("delete", `/services/${id}`)
  }

  async Dashboard() {
    return this.request<GetDashboardStats>("get", `/users/dashboard`)
  }
}

export default new TidierAPI();
