//get all specialists from database completed
async function getAllSpecialists(req, res) {
    try {
        const specialists = await db.any("SELECT * FROM specialists",
        userID);
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//get a specialist matching id completed
async function getSpecialistsById(req,res){
    const id=parseInt(res["specialist_id"],10)
    try{
        const specialist = await db.none(`SELECT * FROM specialists WHERE id=$1`, id)
        return res.json(specialist)
    }catch(err){
        return res.status(500).json({message: err.message})
    }
}

//get specialist info
async function SpecialistInfo(req,res){
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
async function getASpecialist(req, res) {
    try {
        const specialists = await db.one("SELECT * FROM specialists WHERE first_name = $1");
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}

//get all specialists of a specific field completed
async function getSpecialists(req, res) {
    const specialty=JSON.stringify(req.params.medical_issue)
    try {
        const specialists = await db.one("SELECT * FROM specialists WHERE mental_issue = $1",
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