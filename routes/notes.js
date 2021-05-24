const router = new express.Router()
const express = require('express')
const {
    getAllNotes,
    getUserNotes,
    getSpecificNote,
    createNote,
    deleteNote,
    updateNote,
} = require("../controllers/notes");
router.use(express.json());
router.use((req, res, next) => {
    console.log("notes router");
    next();
  });

router.get('/getNotes/:id', getUserNotes); //get all notes for a specific user only one we really need
router.get('/getNote/:noteId', getSpecificNote); //get a specific note
router.update('/updateNote/:noteId', updateNote); //update a specific note
router.update('/deleteNote/:noteId', deleteNote); //delete a note
router.post('/createNote', createNote); //create a note for the user
