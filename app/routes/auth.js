/* eslint-disable consistent-return */
const Router = require('koa-router');
const bcrypt = require('bcrypt');
const passport = require('koa-passport');

const User = require('../models/user');

const router = new Router({
  prefix: '/auth',
});

const getRegisterPage = async (ctx) => {
  await ctx.render('register');
};

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
        ctx.redirect('/');
      } else {
        ctx.status = 400;
        ctx.body = { status: 'error' };
      }
    })(ctx);
  } catch (error) {
    ctx.body = error;
  }
};

const getLoginPage = async (ctx) => {
  await ctx.render('login');
};

const login = async ctx => (
  passport.authenticate('local', (err, user) => {
    if (user) {
      ctx.login(user);
      ctx.redirect('/');
    } else {
      ctx.status = 400;
      ctx.body = { status: 'error' };
    }
  })(ctx)
);

const logout = async (ctx) => {
  try {
    if (ctx.isAuthenticated()) {
      ctx.logout();
      ctx.redirect('/auth/login');
    }
  } catch (error) {
    ctx.body = { success: false };
    ctx.throw(401);
  }
};

router
  .get('/register', getRegisterPage)
  .post('/register', register)
  .get('/logout', logout)
  .get('/login', getLoginPage)
  .post('/login', login);

module.exports = router;
