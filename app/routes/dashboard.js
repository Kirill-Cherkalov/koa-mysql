const Router = require('koa-router');

const router = new Router();

router.get('/', async (ctx) => {
  if (ctx.isAuthenticated()) {
    await ctx.render('dashboard');
  } else {
    ctx.redirect('/auth/login');
  }
});

module.exports = router;
