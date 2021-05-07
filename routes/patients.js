var express = require('express');
var router = express.Router();
const {
  getAllPatients,
  getPatientByConcern,
  patientSignUp
} = require('../controllers/patients')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//functions called from controller files
//get all patients
router.get('/getAllPatients', getAllPatients)

//get patients by their concern
router.get('/patientConcerns', getPatientByConcern)

//register as patient
router.post('/register', patientSignUp)

module.exports = router;

//FOR TESTING: localhost:3000/patients/getAllPatients, localhost:3000/patients/patientConcerns, etc.