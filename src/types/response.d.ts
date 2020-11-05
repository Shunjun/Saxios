export interface SaxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: AxiosRequestConfig;
  request: any;
}

export interface SaxiosPromise<T = any> extends Promise<SaxiosResponse<T>> {}
