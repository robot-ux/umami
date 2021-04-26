import { serialize } from 'cookie';
import { createSecureToken } from 'lib/crypto';
import { AUTH_COOKIE_NAME } from 'lib/constants';
import { unauthorized, redirect } from 'lib/response';
import passport, { APP_NAME } from 'lib/passport';
import { usePassport } from 'lib/middleware';

export default async (req, res) => {
  await usePassport(req, res);

  return passport.authenticate(APP_NAME, async err => {
    if (err) {
      console.error(err);
      return unauthorized(res);
    }

    const token = await createSecureToken({ user: 'admin' });
    const cookie = serialize(AUTH_COOKIE_NAME, token, {
      path: '/',
      httpOnly: true,
      sameSite: true,
      maxAge: 60 * 60 * 24 * 7,
    });

    res.setHeader('Set-Cookie', [cookie]);
    res.setHeader('token', token);
    redirect(res, '/dashboard');
  })(req, res);
};
