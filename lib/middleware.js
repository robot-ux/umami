import cors from 'cors';
import { getSession } from './session';
import { getAuthToken } from './auth';
import { unauthorized, badRequest, serverError } from './response';
import expressSession from 'express-session';
import passport from './passport';
// import connectEnsureLogin from 'connect-ensure-login';

export function use(middleware) {
  return (req, res) =>
    new Promise((resolve, reject) => {
      middleware(req, res, result => {
        if (result instanceof Error) {
          return reject(result);
        }
        return resolve(result);
      });
    });
}

export const useCors = use(cors());

export const usePassport = use(async (req, res, next) => {
  await use(expressSession({ secret: 'keyboard cat', resave: true, saveUninitialized: true }))(
    req,
    res,
  );
  await use(passport.initialize())(req, res);
  await use(passport.session())(req, res);

  next();
});

export const useSession = use(async (req, res, next) => {
  let session;

  try {
    session = await getSession(req);
  } catch (e) {
    console.error(e);
    return serverError(res, e.message);
  }

  if (!session) {
    return badRequest(res);
  }

  req.session = session;
  next();
});

export const useAuth = use(async (req, res, next) => {
  // await use(connectEnsureLogin.ensureLoggedIn())(req, res);
  const token = await getAuthToken(req);

  console.log('token: ', token, req.isAuthenticated());
  if (!token) {
    return unauthorized(res);
  }

  req.auth = token;
  next();
});
