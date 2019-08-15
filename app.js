const Koa = require('koa');
const Router  = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const { Model } = require('objection');
require('dotenv').config()

const knex = require('./knex');
const User = require('./app/models/user');

const authRoutes = require('./app/routes/auth');

const app = new Koa();
const router = new Router();
Model.knex(knex);

app.use(bodyParser());
app.use(logger());

router.get('/', async (ctx) => {
  const result = await User.query().select('*');

  ctx.body = result;
});

app.use(router.routes());
app.use(authRoutes.routes());

app.listen(3001);