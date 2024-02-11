import { AxiosHeaders, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from "axios";

export interface MyRequestInterceptors<T = AxiosResponse> {
  requestInterceptor?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
  responseInterceptor?: (res: T) => T;
}

export interface MyRequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
  interceptors?: MyRequestInterceptors<T>;
  showLoading?: boolean;
  headers?: AxiosHeaders;
}

export const request = <T>(config: MyRequestConfig<T>): Promise<T> => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return new Promise((_resolve) => {
    if (config.interceptors?.requestInterceptor) {
      const headers = new AxiosHeaders({
        "X-Request": "123",
      });
      config = config.interceptors.requestInterceptor({ ...config, headers });
    }
  });
};
