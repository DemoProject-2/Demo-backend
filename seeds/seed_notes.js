
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('notes').insert([
        {content: 'Test Note 1', notes_id: 1, user_id: 1},
        {content: 'Currently Testing Note 2', notes_id: 2, user_id: 3},
        {content: 'This is a test of note 3', notes_id: 3, user_id: 2}
      ]);
    });
};
