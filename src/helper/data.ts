import { isPlainObject } from '@/utils/utils';

export function requestDataFormat(data: any): any {
  if (isPlainObject(data)) {
    data = JSON.stringify(data);
  }
  return data;
}

export function responseDataFormat(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data);
    } catch (error) {}
  }
  return data;
}
