const db=require('../db')

async function getAllConnections(req, res) {
    try{
        const notes=await db.any(`SELECT * FROM links`)
        return res.json(notes)
    }catch(err){
        res.send(err)
    }
}

async function getAllUserConnections(req, res) {
    const patientId = req.params.patientId;
    try{
        const notes=await db.any(`SELECT * FROM links WHERE patient_id = $1`, patientId)
        return res.json(notes)
    }catch(err){
        res.send(err)
    }
}

async function setConnection(req, res) {
    const patientId = req.params.patientId;
    const specialistId = req.params.specialistId;
    try{
        const notes=await db.none(`INSERT INTO links (patient_id, specialist_id) VALUES ($1,$2)`, [patientId, specialistId])
        return res.json(notes)
    }catch(err){
        res.send(err)
    }
}

module.exports = {
    getAllConnections,
    getAllUserConnections,
    setConnection
}