const Koa = require('koa');
const Router  = require('koa-router');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
require('dotenv').config()

const db = require('./mysql');

const app = new Koa();
const router = new Router();

app.use(bodyParser());
app.use(logger());

router.get('/', async (ctx) => {
  const promise = new Promise((res, rej) => {
    db.query('SELECT * FROM actor', (err, rows, fields) => {
      if (err) {
        rej(err)
      } else {
        res({ rows, fields })
      }
    });
  });

  try {
    const res = await promise;
    ctx.body = res
    
  } catch (error) {
    ctx.body = error;
  }
});

app.use(router.routes());

app.listen(3000);