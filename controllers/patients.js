//get all patients from database
async function getAllPatients(req, res) {
    try {
        const normal_users = await db.any(`SELECT * FROM users WHERE users.id=patients.patients.patient_id`);
        return res.json(normal_users);
    } catch (err) {
        res.status(500).send(err);
    }
}
//get patients by concern 
async function getPatientByConcern(req,res){
    const concern=JSON.stringify(req.params.medical_issue)
    try{
        const patients= await db.any(`SELECT * FROM patients, users WHERE medical_issue=$1`,
        concern)
        return res.json(patients);
    }
    catch(err){
        res.status(500).json(err)
    }
}
//register as a patient completed
async function patientSignUp(req, res) {
    try {
        const patient = await db.none(`INSERT INTO patients (first_name, last_name, user_name, email, password, medical_issue, account_type) VALUES (${first_name}, ${last_name},${user_name}, ${email},${password},${medical_issue},${account_type}`);
        return res.json(patient);
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = {
    getAllPatients,
    getPatientByConcern,
    patientSignUp
}