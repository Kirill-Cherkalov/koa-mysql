const Router = require('koa-router');

const router = new Router();

router.get('/**', async (ctx) => {
  await ctx.render('404');
});

module.exports = router;
