
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('guest_notes').del()
    .then(function () {
      // Inserts seed entries
      return knex('guest_notes').insert([
        {id: 1, member_id: 2, author_id: '00u2lgca4zIaSTPqE5d6', content: 'Guest did something that deserves a warning' },
        {id: 2, member_id: 3, author_id: '00u2lgca4zIaSTPqE5d6', content: 'Guest is dangerous and should be removed from the shelter' },
      ]);
    });
};
