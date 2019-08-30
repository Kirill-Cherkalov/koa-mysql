/* eslint-disable consistent-return */
const passport = require('koa-passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const knex = require('./connection');

const options = {};

passport.serializeUser((user, done) => { done(null, user.id); });

passport.deserializeUser(async (id, done) => {
  try {
    const user = await knex('users').where({ id }).first();

    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(new LocalStrategy(options, async (username, password, done) => {
  try {
    const user = await knex('users').where({ username }).first();

    if (!user) {
      return done(null, false);
    }

    if (await bcrypt.compare(password, user.password)) {
      return done(null, user);
    }
  } catch (error) {
    done(error);
  }
}));

const isAuthenticated = async (ctx, next) => {
  if (ctx.isAuthenticated()) {
    await next();
  } else {
    ctx.status = 400;
  }
};

module.exports = {
  isAuthenticated,
};
