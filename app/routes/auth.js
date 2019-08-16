const Router = require('koa-router');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = new Router({
  prefix: '/auth',
});

const register = async (ctx) => {
  try {
    const { username, password } = ctx.request.body;
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));

    const newUser = await User.query().insert({
      username,
      password: hash,
    });
    ctx.body = newUser;
  } catch (error) {
    ctx.body = error;
  }
};

const getLoginPage = async (ctx) => {
  await ctx.render('login');
};

const getRegisterPage = async (ctx) => {
  await ctx.render('register');
};

const login = async (ctx) => {
  await ctx.render('login');
};

router
  .get('/register', getRegisterPage)
  .post('/register', register)
  .get('/login', getLoginPage)
  .post('login', login);

module.exports = router;
