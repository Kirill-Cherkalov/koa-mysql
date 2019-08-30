/* eslint-disable consistent-return */
const Router = require('koa-router');

const Book = require('../models/book');
const { isAuthenticated } = require('../server/auth');
const { getPagination } = require('../util/pagination');

const router = new Router({
  prefix: '/book',
});

const create = async (ctx) => {
  try {
    const { name, price } = ctx.request.body;

    const book = await Book.query()
      .insert({
        name,
        price,
        userId: ctx.state.user.id,
      });

    ctx.body = book;
  } catch (error) {
    ctx.body = error;
  }
};

const update = async (ctx) => {
  try {
    const { id, ...rest } = ctx.request.body;

    const newBook = await Book.query()
      .updateAndFetchById(id, {
        ...rest,
        userId: ctx.state.user.id,
      });

    ctx.body = newBook;
  } catch (error) {
    ctx.body = error;
  }
};

const detele = async (ctx) => {
  try {
    const { id } = ctx.request.query;

    await Book.query().deleteById(id);

    ctx.body = {
      success: true,
    };
  } catch (error) {
    ctx.body = error;
  }
};

const getList = async (ctx) => {
  try {
    const { page, pageCount } = ctx.request.query;
    const pagination = getPagination({ page, pageCount });

    const books = await Book.query().offset(pagination.offset).limit(pagination.limit);

    ctx.body = books;
  } catch (error) {
    ctx.body = error;
  }
};

router
  .get('/', isAuthenticated, getList)
  .post('/', isAuthenticated, create)
  .put('/', isAuthenticated, update)
  .delete('/', isAuthenticated, detele);

module.exports = router;
