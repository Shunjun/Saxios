declare module 'jasmine-core' {}

namespace NodeJS {
  export interface Global {
    getJasmineRequireObj: any;
  }
}

declare module 'create-test-server' {
  export default function (config?: {}): Promise<Express>;
}
