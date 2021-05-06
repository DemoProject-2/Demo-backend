exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, first_name: 'John', last_name: 'Smith', user_name: 'JohnSmith', email: 'JSmith1@email.com', password: 'JSmith123', medical_issue: 'Depression', acct_type: 'patient'},
        {id: 2, first_name: 'Jane', last_name: 'Doe', user_name: 'JaneDoe', email: 'JDoe1@email.com', password: 'JDoe123', medical_issue: 'Anxeity', acct_type: 'patient'},
        {id: 3, first_name: 'Jack', last_name: 'Skelington', user_name: 'JohnSkelington', email: 'JSkeilington@email.com', password: 'JSkel123', medical_issue: 'Depression', acct_type: 'patient'},
        {id: 4, first_name: 'Max', last_name: 'Smith', user_name: 'JohnSmith', email: 'JSmith1@email.com', password: 'JSmith123', medical_specialty: 'Depression', acct_type: 'specialist'},
        {id: 5, first_name: 'Jane', last_name: 'Doe', user_name: 'JaneDoe', email: 'JDoe1@email.com', password: 'JDoe123', medical_specialty: 'Anxeity', acct_type: 'specialist'}
      ]);
    });
};