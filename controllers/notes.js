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
    const userID=parseInt(req.params.user_id,10)
    try{
        const notes=await db.any(`SELECT * FROM notes WHERE user_id=$1`,
        userID)
        return res.json(notes)
    } catch(err){
        res.status(500).send(err)
    }
}

//get specific note by id
async function getSpecificNote(req, res) {
    const noteID=parseInt(req.params.notes_id)
    try{
        const notes = await db.one(`SELECT * FROM notes WHERE notes_id=$1`,
        noteID)
        return res.json(notes)
    } catch (err) {
        res.status(500).send(err)
    }
}

//create a note
async function createNote(req, res) {
    try{
        await db.none(`INSERT INTO notes (content, user_id) VALUES (${content},${user_id})`,
        req.body)
        return res.json({
            message:'success'
        })
    } catch (err){
        res.status(500).send(err)
    }
}


//delete a note
async function deleteNote(req,res){
    const noteID=parseInt(req.params.notes_id)
    try{
        await db.none(`DELETE FROM notes WHERE notes_id=$1`,
        noteID)
        return res.json({
            message:'success'
        })
    } catch(err){
        res.status(500).send(err)
    }
}

//update a note
async function updateNote(req, res) {
    const noteID=parseInt(req.params.notes_id)
    try {
        await db.none(`UPDATE users SET content=$1 WHERE notes_id=$2`,
        req.body.content,
        noteID)
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
}