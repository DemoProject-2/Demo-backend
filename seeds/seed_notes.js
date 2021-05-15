
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {notes_id: 1, content: 'Test Note 1'},
        {notes_id: 2, content: 'Currently Testing Note 2'},
        {notes_id: 3, content: 'This is a test of note 3'}
      ]);
    });
};
