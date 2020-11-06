import { CancelToken, SaxiosTransformer } from '@/types';

interface SaxiosBasicCredentials {
  username: string;
  password: string;
}

export interface RequestConfig {
  url?: string;
  baseURL?: string;
  method?: Method;
  params?: Params;
  transformRequest?: SaxiosTransformer | SaxiosTransformer[];
  transformResponse?: SaxiosTransformer | SaxiosTransformer[];
  headers?: any;
  paramsSerializer?: (params: any) => string;
  data?: any;
  timeout?: number;
  timeoutErrorMessage?: string;
  withCredentials?: boolean;
  // adapter?: AxiosAdapter;
  auth?: SaxiosBasicCredentials;
  responseType?: XMLHttpRequestResponseType;
  xsrfCookieName?: string;
  xsrfHeaderName?: string;
  onUploadProgress?: (e: ProgressEvent) => void;
  onDownloadProgress?: (e: ProgressEvent) => void;
  // maxContentLength?: number;
  validateStatus?: (status: number) => boolean | null;
  // maxBodyLength?: number;
  // maxRedirects?: number;
  socketPath?: string | null;
  // httpAgent?: any;
  // httpsAgent?: any;
  // proxy?: AxiosProxyConfig | false;
  cancelToken?: CancelToken;
  // decompress?: boolean;
}

export type PartialRequestConfig = Partial<RequestConfig>;
