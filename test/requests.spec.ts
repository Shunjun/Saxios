import createTestServer from 'create-test-server';
import { SaxiosError } from '@/core/error';
import e from 'express';
import Saxios, { SaxiosResponse } from '../src/index';

const writeData = (data: any, res: e.Response) => {
  res.setHeader('access-control-allow-origin', '*');
  res.send(data);
};

describe('requests', () => {
  let server: any;

  beforeAll(async () => {
    server = await createTestServer();
  });

  afterAll(async () => {
    await server.close();
  });

  const prefix = (url: string) => `${server.url}${url}`;

  test('只传一个string,能否被作为url', async (done) => {
    server.get('/foo', (req: e.Request, res: e.Response) => {
      expect(req.url).toBe('/foo');
      writeData(req.params, res);
    });

    await Saxios(prefix('/foo'));
    done();
  });

  test('应该使用小写字符方法', async (done) => {
    server.post('/foo', (req: e.Request, res: e.Response) => {
      res.status(200);
      writeData(req.params, res);
    });

    Saxios({
      url: prefix('/foo'),
      method: 'post',
    }).then((response) => {
      expect(response.config.method).toBe('post');
      done();
    });
  });

  test('超时是否会报错', async (done) => {
    server.get('/foo4', (_req: e.Request, res: e.Response) => {
      setTimeout(() => {
        writeData('ok', res);
      }, 1000);
    });

    try {
      await Saxios(prefix('/foo4'), {
        timeout: 800,
      });
    } catch (err) {
      expect(err instanceof Error).toBeTruthy();
      expect(err.message).toBe('Timeout of 800 ms exceeded');
      done();
    }
  });

  test('validateStatus 返回 false, 是否会报错', async (done) => {
    expect.assertions(5);
    server.get('/test/validateStatus', (_req: e.Request, res: any) => {
      res.status(500);
      writeData('ok', res);
    });

    const resolveSpy = jest.fn((res: SaxiosResponse) => {
      return res;
    });

    const rejectSpy = jest.fn((err: SaxiosError) => {
      return err;
    });

    Saxios(prefix('/test/validateStatus'), {
      validateStatus(status) {
        return status !== 500;
      },
    })
      .then(resolveSpy)
      .catch(rejectSpy)
      .then(next);

    function next(reason: SaxiosResponse | SaxiosError) {
      expect(resolveSpy).not.toHaveBeenCalled();
      expect(rejectSpy).toHaveBeenCalled();
      expect(reason instanceof SaxiosError).toBeTruthy();
      expect((reason as SaxiosError).message).toBe('Request failed with status code 500');
      expect((reason as SaxiosError).response!.status).toBe(500);

      done();
    }
  });

  test('should resolve when validateStatus returns true', async (done) => {
    server.get('/test/validateStatus2', (_req: e.Request, res: e.Response) => {
      res.status(500);
      writeData('ok', res);
    });

    const resolveSpy = jest.fn((res: SaxiosResponse) => {
      return res;
    });

    const rejectSpy = jest.fn((err: SaxiosError) => {
      return err;
    });

    try {
      const res = await Saxios(prefix('/test/validateStatus2'), {
        validateStatus(status) {
          return status === 500;
        },
      });
      resolveSpy(res);
    } catch (error) {
      rejectSpy(error);
      expect(error.config.url).toBe('/test/validateStatus2');
      expect(rejectSpy).not.toHaveBeenCalled();
      expect(resolveSpy).toHaveBeenCalled();

      done();
    }
  });

  test('should return JSON when resolved', async (done) => {
    server.post('/test/login', (_req: e.Request, res: e.Response) => {
      res.setHeader('Access-Control-Allow-Credentials', 'true');
      writeData('{"a": 1}', res);
    });

    try {
      const response = await Saxios(prefix('/test/login'), {
        withCredentials: true,
        method: 'post',
        headers: {
          Accept: 'application/json',
        },
      });

      expect(response.data).toEqual({ a: 1 });
      done();
    } catch (error) {}
  });

  test('should return JSON when rejecting', async (done) => {
    server.post('/test/login2', (_req: e.Request, res: e.Response) => {
      res.status(400);
      writeData('{"error": "BAD USERNAME", "code": 1}', res);
    });

    try {
      await Saxios(prefix('/test/login2'), {
        method: 'post',
        headers: {
          Accept: 'application/json',
        },
      });
    } catch (error) {
      expect(typeof error.response.data).toBe('object');
      expect(error.response.data.error).toBe('BAD USERNAME');
      expect(error.response.data.code).toBe(1);
      done();
    }
  });

  test('提供 response', async (done) => {
    server.post('/test/response', (_req: e.Request, res: e.Response) => {
      res.setHeader('Content-Type', 'application/json');
      writeData('{"foo": "bar"}', res);
    });

    try {
      const response = await Saxios.post(prefix('/test/response'));
      expect(response.data.foo).toBe('bar');
      expect(response.status).toBe(200);
      expect(response.statusText).toBe('OK');
      expect(response.headers['content-type']).toBe('application/json');

      done();
    } catch (error) {
      done();
    }
  });

  test('应该允许重写Content-Type头不区分大小写', async (done) => {
    server.post('/test/contentType', (req: e.Request, res: e.Response) => {
      writeData({ 'Content-Type': req.get('Content-Type') }, res);
    });

    const res = await Saxios.post(
      prefix('/test/contentType'),
      { prop: 'value' },
      {
        headers: {
          'content-type': 'text/plain',
        },
      },
    );

    expect(res.data['Content-Type']).toBe('text/plain');
    done();
  });
});
