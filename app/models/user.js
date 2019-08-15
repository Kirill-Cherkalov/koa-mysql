const { Model } = require('objection');

class User extends Model {
  // Table name is the only required property.
  static get tableName() {
    return 'users';
  }
  // static get jsonSchema () {
  //   return {
  //     type: 'object',
  //     required: ['username', 'passwordHash'],

  //     properties: {
  //       id: {type: 'integer'},
  //       // parentId: {type: ['integer', 'null']},
  //       username: {type: 'string', minLength: 1, maxLength: 255},
  //       passwordHash: {type: 'string', minLength: 1, maxLength: 255},
  //       // age: {type: 'number'},

  //       // Properties defined as objects or arrays are
  //       // automatically converted to JSON strings when
  //       // writing to database and back to objects and arrays
  //       // when reading from database. To override this
  //       // behaviour, you can override the
  //       // Model.jsonAttributes property.
  //       // address: {
  //       //   type: 'object',
  //       //   properties: {
  //       //     street: {type: 'string'},
  //       //     city: {type: 'string'},
  //       //     zipCode: {type: 'string'}
  //       //   }
  //       // }
  //     }
  //   };
  // }
}

module.exports = User;
