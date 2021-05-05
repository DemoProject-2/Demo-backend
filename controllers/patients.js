//get all patients from database
async function getAllPatients(req, res) {
    try {
        const patients = await db.any("SELECT * FROM patients"); 
        return res.json(patients);
    } catch (err) {
        res.status(500).send(err);
    }
}

//find a particular patient
async function getAPatient(req, res){
    try {
        const patients = await db.any("SELECT * FROM patients WHERE first_name = $1"); //
        return res.json(patients);
    } catch (err) {
        res.status(500).send(err);
    }
}

//register as a patient
async function patientSignUp(req, res) {
    try {
        const patients = await db.none(`INSERT INTO specialists (first_name, last_name, email, username, password) VALUES (${first_name}, ${last_name},${email}, ${username},${password}`);
        return res.json(patients);
    } catch (err) {
        res.status(500).send(err);
    }
}