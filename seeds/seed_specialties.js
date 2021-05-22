
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('disorders').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {disorder_id: 1, colName: 'Depression'},
        {disorder_id: 2, colName: 'Anxiety'},
        {disorder_id: 3, colName: 'Substance Abuse'}
      ]);
    });
};
