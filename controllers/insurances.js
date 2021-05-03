//get all doctors from database that accept this insurance
async function getAllDoctors(req, res) {
    try {
        const doctors = await db.any("SELECT * FROM doctors FULL OUTER JOIN insurances ON doctors.doctor_name = insurances.doctors");
        return res.json(doctors);
    } catch (err) {
        res.status(500).send(err);
    }
}