/* eslint-disable consistent-return */
const Router = require('koa-router');
const bcrypt = require('bcrypt');
const passport = require('koa-passport');

const User = require('../models/user');
const { isAuthenticated } = require('../server/auth');

const router = new Router({
  prefix: '/auth',
});

const register = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

    await User.query().insert({
      username,
      password: hash,
    });

    return passport.authenticate('local', (err, user) => {
      if (user) {
        ctx.login(user);
        ctx.body = { user };
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    })(ctx);
  } catch (error) {
    ctx.body = error;
  }
};

const login = async ctx => (
  passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.login(user);
      ctx.body = user;
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx)
);

const logout = async (ctx) => {
  try {
    ctx.logout();
    ctx.redirect('/auth/login');
  } catch (error) {
    ctx.body = error;
    ctx.throw(401);
  }
};

const isUserAuthenticated = async (ctx) => {
  try {
    if (ctx.isAuthenticated()) {
      ctx.body = ctx.state.user;
    } else {
      ctx.body = 'User is not authorized';
    }
  } catch (error) {
    ctx.body = error;
    ctx.throw(401);
  }
};

router
  .post('/register', register)
  .get('/logout', isAuthenticated, logout)
  .post('/login', login)
  .post('/isAuthenticated', isUserAuthenticated);

module.exports = router;
