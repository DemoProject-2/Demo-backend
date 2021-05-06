//get all normal users from database
async function getAllPatients(req, res) {
    try {
<<<<<<< HEAD:controllers/NormalUsers.js
        const normal_users = await db.any("SELECT * FROM NormalUsers");
        return res.json(normal_users);
=======
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
>>>>>>> 23ec062f8aab4bd8bf1e0dc06698940f73bf499d:controllers/patients.js
    } catch (err) {
        res.status(500).send(err);
    }
}
//get normal users by concern 
//register as a patient
async function patientSignUp(req, res) {
    try {
        const patients = await db.none(`INSERT INTO specialists (first_name, last_name, email, username, password) VALUES (${first_name}, ${last_name},${email}, ${username},${password}`);
        return res.json(patients);
    } catch (err) {
        res.status(500).send(err);
    }
}