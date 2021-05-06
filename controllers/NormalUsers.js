//get all normal users from database
async function getAllPatients(req, res) {
    try {
        const normal_users = await db.any("SELECT * FROM NormalUsers");
        return res.json(normal_users);
    } catch (err) {
        res.status(500).send(err);
    }
}
//get normal users by concern 
//register as a patient
async function patientSignUp(req, res) {
    try {
        const patients = await db.none("INSERT INTO patients (first_name, last_name, primary_insurance) VALUES (${first_name}, ${last_name}, ${primary_insurance}");
        return res.json(patients);
    } catch (err) {
        res.status(500).send(err);
    }
}