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

  router.get('/notes/:id', getUserNotes); //get all notes for a specific user only one we really need
