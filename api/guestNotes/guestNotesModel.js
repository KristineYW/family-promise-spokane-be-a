const db = require('../../data/db-config');

const findAllNotesByMemberId = (member_id) => {
  return db('guest_notes').where({ member_id }).returning('*');
};

const createNote = (note) => {
  return db('guest_notes').insert(note).returning('*');
};

module.exports = {
  createNote,
  findAllNotesByMemberId,
};
