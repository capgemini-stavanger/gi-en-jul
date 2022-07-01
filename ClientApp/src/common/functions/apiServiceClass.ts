import axios, { AxiosPromise, AxiosError, Method } from "axios";
export interface IApiService {
  token: string;
  baseUrl: string;
  config: any;
  get: (path: string, extras?: any) => AxiosPromise<any>;
  getAction: (path: string, callback: any, extras?: any) => Promise<any>;
  post: (path: string, data: any, extras?: any) => AxiosPromise<any>;
  postAction: (path: string, data: any, callback: any, extras?: any) => Promise<any>;
  all: (args: any[], callback: any) => AxiosPromise<any>;
  fetch: (fullPath: string, params?: any) => AxiosPromise<any>;
  downloadFile: (
    path: string,
    filename: string,
    body?: any,
    method?: Method,
    callback?: () => void
  ) => Promise<any>;
}
class ApiService implements IApiService {
  baseUrl: string;
  token: string;
  config: any;
  constructor(token = "") {
    this.token = token;
    this.baseUrl = (process.env.REACT_APP_API_URL + "/") as string;
    this.config = {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Accept-Language": "en-GB,nb-NO",
        Authorization: `Bearer ${this.token}`,
      },
    };
  }
  get = (path: string, extras?: any) => {
    const newConfig = extras
      ? { ...extras, headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.get(this.baseUrl + path, newConfig);
  };
  getAction = (path: string, callback: any, extras?: any) => {
    const newConfig = extras
      ? { ...extras, headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.get(this.baseUrl + path, newConfig as any).then((response) => {
      if (response.status >= 400 && response.status < 600) console.error(response);
      callback(response.status, response.data);
    });
  };
  put = (path: string, data: any, extras?: any) => {
    const newConfig = extras
      ? { ...extras, headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.put(this.baseUrl + path, data, newConfig as any);
  };
  post = (path: string, data: any, extras?: any) => {
    const newConfig = extras
      ? { ...extras, headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.post(this.baseUrl + path, data, newConfig as any);
  };
  postAction = (path: string, data: any, callback: any, extras?: any) => {
    const newConfig = extras
      ? { ...extras, headers: { ...this.config.headers, ...extras.headers } }
      : this.config;
    return axios.post(this.baseUrl + path, data, newConfig as any).then((response) => {
      if (response.status >= 400 && response.status < 600) console.error(response);
      callback(response.status, response.data);
    });
  };
  all = (args: any[], callback: any) => {
    return axios.all(args).then((response) => callback(response));
  };
  fetch = (fullPath: string, params = undefined) => {
    return axios.get(fullPath, params);
  };
  delete = (path: string, deleteData: any) => {
    const newConfig = { ...this.config, data: deleteData };
    return axios.delete(this.baseUrl + path, newConfig);
  };
  downloadFile = (
    path: string,
    filename: string,
    body?: any,
    method: Method = "get",
    callback?: () => void
  ) => {
    return this.fetchBlobURL(path, "application/octet-stream", body, method)
      .then((blobUrl: string) => {
        const link = document.createElement("a");
        link.href = blobUrl;
        link.setAttribute("download", filename);
        const clickHandler = () => {
          setTimeout(() => {
            URL.revokeObjectURL(blobUrl);
            link.removeEventListener("click", clickHandler);
            document.body.removeChild(link);
            callback?.();
          }, 150);
        };
        document.body.appendChild(link);
        link.addEventListener("click", clickHandler, false);
        link.click();
      })
      .catch((error: AxiosError) => {
        throw error;
      });
  };
  private fetchBlobURL = (path: string, type: string, body?: any, method: Method = "get") => {
    return axios({
      url: this.baseUrl + path,
      method: method,
      responseType: "blob",
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
      data: body,
    }).then((response) => {
      if (response.status >= 400 && response.status < 600) throw new Error(response.statusText);
      const bloburl = window.URL.createObjectURL(new Blob([response.data], { type }));
      return bloburl;
    });
  };
}
export default ApiService;
