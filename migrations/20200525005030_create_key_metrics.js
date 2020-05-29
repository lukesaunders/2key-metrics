exports.up = function(knex) {
  return knex.schema
    .createTable('key_metrics', function (table) {
       table.increments('id');
       table.text('metric_name').notNullable()
       table.timestamp('date').notNullable();
       table.integer('daily_count')
       table.integer('cumulative_count')
       table.unique(['metric_name', 'date']);
    });  
};

exports.down = function(knex) {
  return knex.schema
      .dropTable("key_metrics");  
};