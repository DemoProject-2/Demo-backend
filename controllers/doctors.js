//get all doctors from database
async function getAllDoctors(req, res) {
    try {
        const doctors = await db.any("SELECT * FROM doctors");
        return res.json(doctors);
    } catch (err) {
        res.status(500).send(err);
    }
}

//search for doctor by name
async function getADoctor(req, res) {
    try {
        const doctors = await db.one("SELECT * FROM doctors WHERE doctor_name = $1");
        return res.json(doctors);
    } catch (err) {
        res.status(500).send(err);
    }
}

//get all doctors that specialize in a specific field
async function getSpecialists(req, res) {
    try {
        const doctors = await db.one("SELECT * FROM doctors WHERE specialty = $1");
        return res.json(doctors);
    } catch (err) {
        res.status(500).send(err);
    }
}