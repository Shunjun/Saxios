import { RequestConfig, SaxiosResponse } from '@/types';

export class SaxiosError extends Error {
  isSaxiosError: boolean;
  config: RequestConfig;
  code?: string | null;
  request?: any;
  response?: SaxiosResponse;

  constructor({
    message,
    config,
    code,
    request,
    response,
  }: {
    message: string;
    config: RequestConfig;
    code?: string | null;
    request?: any;
    response?: SaxiosResponse;
  }) {
    super(message);

    this.config = config;
    this.code = code;
    this.request = request;
    this.response = response;
    this.isSaxiosError = true;
  }
}

export function createError({
  message,
  config,
  code,
  request,
  response,
}: {
  message: string;
  config: RequestConfig;
  code?: string | null;
  request?: any;
  response?: SaxiosResponse;
}): SaxiosError {
  return new SaxiosError({ message, config, code, request, response });
}
