//get all normal users from database
async function getAllRegularUsers(req, res) {
    try {
        const normal_users = await db.any(`SELECT * FROM patients`);
        return res.json(normal_users);
    } catch (err) {
        res.status(500).send(err);
    }
}
//get normal users by concern 
async function getUserByConcern(req,res){
    const concern=JSON.stringify(req.params.medical_issue)
    try{
        const users= await db.any(`SELECT * FROM patients WHERE medical_issue=$1`,
        concern)
    }
    catch(err){
        res.status(500).json(err)
    }
}
//register as a user completed
async function userSignUp(req, res) {
    try {
        const users = await db.none(`INSERT INTO patients (first_name, last_name, user_name, email, password, medical_issue, account_type) VALUES (${first_name}, ${last_name},${user_name}, ${email},${password},${medical_issue},${account_type}`);
        return res.json(specialists);
    } catch (err) {
        res.status(500).send(err);
    }
}