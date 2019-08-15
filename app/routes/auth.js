const Router = require('koa-router');
const bcrypt = require('bcrypt');

const db = require('../../mysql');

const router = new Router();

router.post('/auth', async (ctx) => {
  const { username, password } = ctx.request.body;
  // console.log(process.env.BCRYPT_SALT_ROUNDS);
  const hash = await bcrypt.hash(password, process.env.BCRYPT_SALT_ROUNDS);

  const promise = new Promise((res, rej) => {

  });

  try {
    
  } catch (error) {
    
  }
});

module.exports = router;
