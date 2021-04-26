import passport from 'passport';
import { Strategy as OktaStrategy } from 'passport-okta-oauth';

passport.use(
  new OktaStrategy(
    {
      audience: process.env.OKTA_AUDIENCE,
      clientID: process.env.OKTA_CLIENT_ID,
      clientSecret: process.env.OKTA_CLIENT_SECRET,
      idp: '',
      // idp is the Identity Provider (id). This is an optional field
      // its a 20 character alphanumeric string
      // e.g. qOp8aaJmCEhvep5Il6ZJ  (generated example)
      scope: ['openid', 'email', 'profile'],
      response_type: 'code',
      callbackURL: `/api/auth/okta`,
    },
    function (accessToken, refreshToken, profile, done) {
      console.log('profile: ', profile);
      done(null, profile);
    },
  ),
);

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(async function (user, done) {
  done(null, user);
});

export const APP_NAME = 'okta';

export default passport;
