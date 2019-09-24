import { Socket } from 'net';
import { parse } from 'cookie';
import { ServerResponse, IncomingMessage } from 'http';

import CookieStore from '../../src/session/cookie-store';
import CookieSessionStoreSettings from '../../src/session/cookie-store/settings';

describe('cookie store', () => {
  const getStore = (settings = {}): CookieStore => {
    const store = new CookieStore(
      new CookieSessionStoreSettings({
        cookieSecret: 'keyboardcat.keyboardcat.keyboardcat.keyboardcat.keyboardcat.keyboardcat.keyboardcat.keyboardcat',
        ...settings
      })
    );
    return store;
  };

  const getRequestResponse = (): { req: IncomingMessage; res: ServerResponse; setHeaderFn: jest.Mock } => {
    const setHeaderFn = jest.fn();
    const req = new IncomingMessage(
      new Socket()
    );

    const res = new ServerResponse(req);
    res.setHeader = setHeaderFn;

    return {
      req,
      res,
      setHeaderFn
    };
  };

  describe('with cookie name', () => {
    describe('configured', () => {
      const store = getStore({
        cookieName: 'my-cookie'
      });

      test('should set the cookie name', async () => {
        const { req, res } = getRequestResponse();
        await store.save(req, res, {
          user: { sub: '123' },
          createdAt: Date.now()
        });

        expect(res.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.stringMatching('my-cookie='));
      });
    });

    describe('not configured', () => {
      const store = getStore({});

      test('should use default settings', async () => {
        const { req, res } = getRequestResponse();
        await store.save(req, res, {
          user: { sub: '123' },
          createdAt: Date.now()
        });

        expect(res.setHeader).toHaveBeenCalledWith('Set-Cookie', expect.stringMatching('a0:session='));
      });
    });
  });

  describe('with storeAccessToken', () => {
    describe('configured', () => {
      const store = getStore({});

      test('should not store the access_token', async () => {
        const { req, res, setHeaderFn } = getRequestResponse();
        const now = Date.now();

        await store.save(req, res, {
          user: { sub: '123' },
          createdAt: now,
          accessToken: 'my-access-token'
        });

        const [, cookie] = setHeaderFn.mock.calls[0];
        req.headers = {
          cookie: `a0:session=${parse(cookie)['a0:session']}`
        };

        const session = await store.read(req);
        expect(session).toEqual({
          user: { sub: '123' },
          createdAt: now
        });
      });
    });

    describe('not configured', () => {
      const store = getStore({
        storeAccessToken: true
      });

      test('should store the access_token', async () => {
        const { req, res, setHeaderFn } = getRequestResponse();
        const now = Date.now();

        await store.save(req, res, {
          user: { sub: '123' },
          createdAt: now,
          accessToken: 'my-access-token'
        });

        const [, cookie] = setHeaderFn.mock.calls[0];
        req.headers = {
          cookie: `a0:session=${parse(cookie)['a0:session']}`
        };

        const session = await store.read(req);
        expect(session).toEqual({
          user: { sub: '123' },
          createdAt: now,
          accessToken: 'my-access-token'
        });
      });
    });
  });

  describe('with storeIdToken', () => {
    describe('configured', () => {
      const store = getStore({});

      test('should not store the id_token', async () => {
        const { req, res, setHeaderFn } = getRequestResponse();
        const now = Date.now();

        await store.save(req, res, {
          user: {
            sub: '123'
          },
          createdAt: now,
          idToken: 'my-id-token'
        });

        const [, cookie] = setHeaderFn.mock.calls[0];
        req.headers = {
          cookie: `a0:session=${parse(cookie)['a0:session']}`
        };

        const session = await store.read(req);
        expect(session).toEqual({
          createdAt: now,
          user: { sub: '123' }
        });
      });
    });

    describe('not configured', () => {
      const store = getStore({
        storeIdToken: true
      });

      test('should store the id_token', async () => {
        const { req, res, setHeaderFn } = getRequestResponse();
        const now = Date.now();

        await store.save(req, res, {
          user: {
            sub: '123'
          },
          createdAt: now,
          idToken: 'my-id-token'
        });

        const [, cookie] = setHeaderFn.mock.calls[0];
        req.headers = {
          cookie: `a0:session=${parse(cookie)['a0:session']}`
        };

        const session = await store.read(req);
        expect(session).toEqual({
          createdAt: now,
          idToken: 'my-id-token',
          user: { sub: '123' }
        });
      });
    });
  });
});
