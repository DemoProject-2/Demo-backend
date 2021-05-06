exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('specialists').del()
    .then(function () {
      // Inserts seed entries
      return knex('specialists').insert([
        //TODO: add more data to table and seed the data into it
        {patient_id: 1},
        {patient_id: 2},
        {patient_id: 3}
      ]);
    });
};