const db=require('../db')

async function getAllNotes(req, res) {
    try{
        const notes=await db.any(`SELECT * FROM notes`)
        return res.json(notes)
    }catch(err){
        res.status(500).send(err)
    }
}

// //get all notes for a specific user
async function getUserNotes(req, res) {
    const userId = parseInt(req.user_id, 10)

    try {
        const notes = await db.any(`SELECT * FROM notes WHERE user_id = $1`, [userId])
        
        return res.json({ notes })
    } catch(err) {
        res.status(500).json({
            message: err.message
        })
    }
}

//get specific note by id
async function getSpecificNote(req, res) {
    const noteInfo = req.body;
    try{
        const notes = await db.one(`SELECT * FROM notes WHERE notes_id=$1`,
        noteInfo.noteID)
        return res.json({ notes })
    } catch (err) {
        res.status(500).send(err)
    }
}

//create a note
async function createNote(req, res) {
    const noteInfo = req.body;

    try{
        const note = await db.one(`INSERT INTO notes (title, content, note_type, user_id) VALUES ($1,$2,$3,$4) returning *`, [noteInfo.title, noteInfo.content, noteInfo.note_type, req.user_id])
       
        return res.json({ note })
    } catch (err){
        res.status(500).json({
            message: err.message
        })
    }
}

//get specific note by note_type
async function getAppointmentReminders(req, res) {
    try{
        const notes = await db.any(`SELECT * FROM notes WHERE note_type = 'Appointment_Reminder' AND user_id = $1`, [req.user_id])
        return res.json({ notes })
    } catch (err) {
        console.log(err.message)
        res.status(500).json({
            message: err.message
        })
    }
}

//delete a note
async function deleteNote(req,res){
    const noteInfo = req.body;
    try{
        await db.none(`DELETE FROM notes WHERE notes_id=$1`,
        noteInfo.noteID)
        return res.json({
            message:'success'
        })
    } catch(err){
        res.status(500).send(err)
    }
}

//update a note
async function updateNote(req, res) {
    const noteInfo=req.body;
    try {
        await db.none(`UPDATE users SET content=$1 WHERE notes_id=$2`,
        [noteInfo.content,noteInfo.noteID])
        return res.json({
            message:'success'
        })
    } catch (err) {
        res.status(500).send(err)
    }
}

module.exports = {
    getAllNotes,
    getUserNotes,
    getSpecificNote,
    createNote,
    deleteNote,
    updateNote,
    getAppointmentReminders
}