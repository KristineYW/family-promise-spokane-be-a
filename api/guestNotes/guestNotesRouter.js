const express = require('express');
// const checkRole = require('./membersMiddleware')
const authRequired = require('../middleware/authRequired');
const GuestNotes = require('./guestNotesModel');
const router = express.Router();
const Users = require('../users/userModel');
const Members = require('../members/membersModel');

router.get('/:id/notes', authRequired, async (req, res) => {
  const { id } = req.params;

  try {
    const notes = await GuestNotes.findAllNotesByMemberId(id);

    res.status(200).json({
      notes,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

router.post('/:id/notes', authRequired, async (req, res) => {
  const noteBody = req.body;
  const { id } = req.params;
  const authorId = noteBody['author_id'] || 0;

  // Verify the member and author exists

  const member = await Members.findById(id);

  const author = await Users.findById(authorId);

  if (!member) {
    return res.status(404).json({
      message: `Could not find member with id of ${id}`,
    });
  }

  if (!author) {
    return res.status(404).json({
      message: `Could not find author with id of ${authorId}`,
    });
  }

  noteBody['member_id'] = id;

  try {
    const note = await GuestNotes.createNote(noteBody);

    res.status(201).json({
      note: note[0],
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Internal server error',
    });
  }
});

module.exports = router;
