exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('specialists').del()
    .then(function () {
      // Inserts seed entries
      return knex('specialists').insert([
        {id: 1, first_name: 'John', last_name: 'Smith', user_name: 'JohnSmith', email: 'JSmith1@email.com', password: 'JSmith123', medical_specialty: 'Depression', acct_type: 'specialist'},
        {id: 2, first_name: 'Jane', last_name: 'Doe', user_name: 'JaneDoe', email: 'JDoe1@email.com', password: 'JDoe123', medical_specialty: 'Anxeity', acct_type: 'specialist'},
        {id: 3, first_name: 'Jack', last_name: 'Skelington', user_name: 'JohnSkelington', email: 'JSkeilington@email.com', password: 'JSkel123', medical_specialty: 'Depression', acct_type: 'specialist'}
      ]);
    });
};