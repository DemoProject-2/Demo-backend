const express = require('express')
const router = new express.Router()

const {
    getAllNotes,
    getUserNotes,
    getSpecificNote,
    createNote,
    deleteNote,
    updateNote,
    getAppointmentReminders
} = require("../controllers/notes");

router.get('/', getUserNotes); //get all notes for a specific user only one we really need
router.get('/noteType', getAppointmentReminders); //get appointment remonder notes
router.get('/:noteId', getSpecificNote); //get a specific note
router.put('/:noteId', updateNote); //update a specific note
router.delete('/:noteId', deleteNote); //delete a note
router.post('/', createNote); //create a note for the user

module.exports =  router;