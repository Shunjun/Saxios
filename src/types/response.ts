import { RequestConfig } from '@/types';

export interface SaxiosResponse<T = any> {
  data: T;
  status: number;
  statusText: string;
  headers: any;
  config: RequestConfig;
  request: any;
}

export interface SaxiosPromise<T = any> extends Promise<SaxiosResponse<T>> {}
