import { createError } from '../../src/core/error';
import { RequestConfig, SaxiosResponse } from '../../src';

describe('helpers::error', function () {
  test('should create an Error with message, config, code, request, response and isAxiosError', () => {
    const request = new XMLHttpRequest();
    const config: RequestConfig = { method: 'post' };
    const response: SaxiosResponse = {
      status: 200,
      statusText: 'OK',
      headers: null,
      request,
      config,
      data: { foo: 'bar' },
    };
    const error = createError({
      message: 'Boom!',
      config,
      code: 'SOMETHING',
      request,
      response,
    });
    expect(error instanceof Error).toBeTruthy();
    expect(error.message).toBe('Boom!');
    expect(error.config).toBe(config);
    expect(error.code).toBe('SOMETHING');
    expect(error.request).toBe(request);
    expect(error.response).toBe(response);
    expect(error.isSaxiosError).toBeTruthy();
  });
});
