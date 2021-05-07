exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('patients').del()
    .then(function () {
      // Inserts seed entries
      return knex('patientss').insert([
        //TODO: add more data to table and seed the data into it
        {patient_id: 1},
        {patient_id: 2},
        {patient_id: 3}
      ]);
    });
};