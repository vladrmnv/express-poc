import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';

export function passportMiddleware() {
  const user = { id: 1, username: 'test@mail.com', password: '1234' };
  passport.use(
    new LocalStrategy((username, password, done) => {
      return done(null, user);
    })
  );
  passport.serializeUser((user: any, done) => done(null, user.id));

  passport.deserializeUser((id, done) => {
    done(null, user);
  });

  return passport;
}

function verifyClient(clientId: string, clientSecret: string, done: Function) {
  return done(null, { id: 1 });
}
