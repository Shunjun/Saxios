import { RequestConfig, SaxiosResponse } from '@/types';

export interface SaxiosError extends Error {
  config: RequestConfig;
  code?: string;
  request?: any;
  response?: SaxiosResponse;
  isAxiosError: boolean;
}
