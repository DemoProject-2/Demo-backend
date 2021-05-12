//get all specialists from database completed
async function getAllSpecialists(req, res) {
    try {
        const specialists = await db.any("SELECT * FROM users WHERE users.id=specialists.specialists_id");
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//get a specialist matching id completed
async function getSpecialistsById(req,res){
    const specialistID=req.body["specialist_id"] ? parseInt(req.body["specialist_id"],10) : parseInt(req.params["specialist_id"])
    try{
        const specialist= await db.one(`SELECT * FROM specialists where id=$1`,
        specialistID)
        return res.json(specialist)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

//search for specialist by name completed
async function getSpecialistByName(req, res) {
    const first=JSON.stringify(req.params.first_name)
    const last=JSON.stringify(req.params.last_name)
    try {
        const specialists = await db.one(`SELECT specialists.specialist_id, users.first_name, users.last_name, users.medical_issue FROM specialists, users WHERE users.first_name = ${first} AND users.last_name = ${last}`);
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//get all specialists of a specific field completed
async function getSpecialistsBySpecialty(req, res) {
    const specialty=JSON.stringify(req.params.medical_issue)
    try {
        const specialists = await db.one('SELECT specialists.specialist_id, users.first_name, users.last_name, users.medical_issue FROM specialists, users WHERE users.medical_issue = $1',
        specialty);
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//register as a specialist 
async function specialistSignUp(req, res) {
    let specialist = req.body
    try {
        const specialists = await db.none(`INSERT INTO specialists (first_name, last_name, user_name, email, password, medical_issue, account_type) VALUES (${first_name}, ${last_name},${user_name}, ${email},${password},${medical_issue},${account_type}`,
        specialist);
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getSpecialistsById,
    getAllSpecialists,
    getSpecialistByName,
    getSpecialistsBySpecialty,
    specialistSignUp
}