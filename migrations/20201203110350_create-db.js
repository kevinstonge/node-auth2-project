exports.up = function (knex) {
  return knex.schema.createTable("users", (users) => {
    users.increments();
    users.string("username", 64).notNullable();
    users.string("hash", 128).notNullable();
    users.string("department", 64).notNullable();
    users.unique("username");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
