const { Model } = require('objection');

class Book extends Model {
  static get tableName() {
    return 'books';
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['name', 'userId', 'price'],
      properties: {
        id: { type: 'integer' },
        price: { type: 'string' },
        name: { type: 'string', minLength: 1, maxLength: 255 },
        userId: { type: 'integer' },
      },
    };
  }
}

module.exports = Book;
