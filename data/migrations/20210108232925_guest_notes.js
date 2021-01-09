
exports.up = function (knex) {
    return knex.schema.createTable('guest_notes', (tbl) => {
      tbl.increments();
      tbl
        .integer('member_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('members')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
  
      tbl
        .string('author_id')
        .notNullable()
        .references('id')
        .inTable('users')
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    
      tbl.string('content').notNullable();
        
      tbl.date('date').defaultTo(knex.fn.now())
  
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists('guest_notes');
  };
  