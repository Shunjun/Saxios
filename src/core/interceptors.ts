import { ResolvedFn, RejectedFn } from '@/types';

interface Interceptor<T> {
  resolved: ResolvedFn<T>;
  rejected?: RejectedFn;
}

export default class InterceptorManager<T> {
  private interceptors: Map<number, Interceptor<T>>;
  private index: number;

  constructor() {
    this.interceptors = new Map();
    this.index = 0;
  }

  use(resolved: ResolvedFn<T>, rejected: RejectedFn): number {
    this.interceptors.set(this.index, { resolved, rejected });
    return this.index++;
  }

  forEach(func: (interceptor: Interceptor<T>) => void): void {
    this.interceptors.forEach((interceptor) => {
      if (interceptor !== null) {
        func(interceptor);
      }
    });
  }

  eject(interceptorId: number): void {
    interceptorId = Number(interceptorId);
    if (this.interceptors.has(interceptorId) && !Number.isNaN(interceptorId)) {
      this.interceptors.delete(interceptorId);
    }
  }
}
