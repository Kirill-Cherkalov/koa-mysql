const Router = require('koa-router');
const bcrypt = require('bcrypt');

const User = require('../models/user');

const router = new Router();

router.post('/auth', async (ctx) => {
  try {
    const username = ctx.request.body.username;
    const password = ctx.request.body.password;
    const hash = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT_ROUNDS));
    
    const newUser = await User.query().insert({
      username,
      passwordHash: hash,
    });
    ctx.body = newUser;
  } catch (error) {
    ctx.body = error;
  }
});

module.exports = router;
