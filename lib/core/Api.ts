import axios, {
  Axios,
  Method,
  AxiosError,
  AxiosHeaders,
  RawAxiosRequestHeaders,
  AxiosResponse,
  AxiosInstance,
} from "axios";

export type MethodsHeaders = Partial<
  {
    [Key in Method as Lowercase<Key>]: AxiosHeaders;
  } & { common: AxiosHeaders }
>;
export type Handler401 = (
  res: AxiosResponse<unknown, any>,
) => void | Promise<void>;
export type Refresher = (
  res: AxiosResponse<any, any>,
  instance: AxiosInstance,
) => AxiosResponse<unknown, any> | Promise<AxiosResponse<unknown, any>>;
export default class Api {
  private instance: AxiosInstance;
  private token?: string;
  private baseUrl?: string;
  private on401?: Handler401;
  private refresher?: Refresher;
  public refreshCount = 0;

  constructor() {
    this.instance = axios.create();
    this.instance.interceptors.response.use(
      (res) => {
        if (this.refresher) return this.refresher(res, this.instance);
        return res;
      },
      (error) => Promise.reject(error),
    );
  }

  public setBaseUrl(url: string) {
    this.baseUrl = url;
    this.instance.defaults.baseURL = this.baseUrl;
    return this;
  }

  public set401Handler(handler: Handler401) {
    this.on401 = handler;
  }

  public setRefresher(refresher: Refresher) {
    this.refresher = refresher;
  }

  public setToken(token: string) {
    this.token = token;
    this.instance.defaults.headers.common.Authorization = `Bearer ${this.token}`;
  }

  public async request<T extends Record<string, any>>(
    method: Method,
    url: string,
    data?: Record<string, any>,
    headers?: (RawAxiosRequestHeaders & MethodsHeaders) | AxiosHeaders,
    sendAsPost?: boolean,
  ) {
    console.log("- Requesting: ", url);
    try {
      let _url = url;
      if (method.toLowerCase() === "get" && data && !sendAsPost) {
        const params = new URLSearchParams(data);
        _url += `?${params.toString()}`;
      }

      const res = await this.instance.request<T>({
        url: _url,
        method,
        data,
        headers,
      });

      return res.data;
    } catch (e) {
      const error = e as AxiosError;

      if (error.response) {
        if (error.response.status === 401) {
          this.on401 && this.on401(error.response);
        }
        return Promise.reject(error.response.data);
      }
      return Promise.reject(error);
    }
  }
}
