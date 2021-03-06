const path = require('path');
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const logger = require('koa-logger');
const { Model } = require('objection');
const session = require('koa-session');
const passport = require('koa-passport');
const views = require('koa-views');
const cors = require('@koa/cors');
require('dotenv').config();

const knex = require('./app/server/connection');

const authRoutes = require('./app/routes/auth');
const notFoundRoutes = require('./app/routes/notFound');
const dashboard = require('./app/routes/dashboard');
const book = require('./app/routes/book');

const app = new Koa();
const PORT = process.env.PORT || 1337;

Model.knex(knex);

// CORS
app.use(cors({
  credentials: true,
}));

// sessions
app.keys = ['super-secret-key'];
app.use(session(app));

// body parser
app.use(bodyParser());
app.use(logger());

// authentication
require('./app/server/auth');

app.use(passport.initialize());
app.use(passport.session());

// views
app.use(views(path.join(__dirname, 'app', 'views'), {
  extension: 'hbs',
  map: {
    hbs: 'handlebars',
  },
}));

// routes
app.use(authRoutes.routes());
app.use(dashboard.routes());
app.use(book.routes());
app.use(notFoundRoutes.routes());

// server
app.listen(PORT, () => {
  console.log(`Server listening on port: ${PORT}`);
});
