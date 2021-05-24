const db=require('../db')

async function getAllConnections(req, res) {
    try{
        const notes=await db.any(`SELECT * FROM links`)
        return res.json(notes)
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

async function getAllUserConnections(req, res) {
    const accountType = req.acct_type;
    const userId = req.params.userId;
    
    try{
        let notes;
        if(accountType === "specialist"){
            notes=await db.any(`SELECT * FROM links, users WHERE specialist_id = $1 AND patient_id = id`, [userId])
        }
        if(accountType === "patient"){
            notes=await db.any(`SELECT * FROM links, users WHERE patient_id = $1 AND specialist_id = id`, [userId])
        }
        
        return res.json(notes)
     }catch(err){
         console.log(err)
        res.status(500).json({
            message: err.message
        })
    }
}

async function setConnection(req, res) {
    const patientId = req.params.patientId;
    const specialistId = req.params.specialistId;
    try{
        const notes=await db.none(`INSERT INTO links (patient_id, specialist_id) VALUES ($1,$2)`, [patientId, specialistId])
        return res.json(notes)
    }catch(err){
        res.status(500).json({
            message:err.message
        })
    }
}

module.exports = {
    getAllConnections,
    getAllUserConnections,
    setConnection
}