exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('specialists').del()
    .then(function () {
      // Inserts seed entries
      return knex('specialists').insert([
        //TODO: add more data to table and seed the data into it
        {specialist_id: 4},
        {specialist_id: 5}
      ]);
    });
};