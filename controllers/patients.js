//get all patients from database
async function getAllPatients(req, res) {
    try {
        const patients = await db.any("SELECT * FROM patients");
        return res.json(patients);
    } catch (err) {
        res.status(500).send(err);
    }
}

//register as a patient
async function patientSignUp(req, res) {
    try {
        const patients = await db.none("INSERT INTO patients (first_name, last_name, primary_insurance) VALUES (${first_name}, ${last_name}, ${primary_insurance}");
        return res.json(patients);
    } catch (err) {
        res.status(500).send(err);
    }
}