import passport from 'passport';
import { Strategy as OAuth2Strategy} from 'passport-oauth2';

export function passportMiddleware() {
  const user = { id: 1, email: 'test@mail.com', password: '1234' };

  //   passport.serializeUser((user: any, done) => done(null, user.id));

  //   passport.deserializeUser((id, done) => {
  //     done(null, user);
  //   });
  return passport;
}

function verifyClient(clientId: string, clientSecret: string, done: Function) {
  return done(null, { id: 1 });
}
