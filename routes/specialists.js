var express = require('express');
var router = express.Router();
const {
  getSpecialistsById,
  getAllSpecialists,
  getSpecialistByName,
  getSpecialistsBySpecialty,
  specialistSignUp
} = require("../controllers/specialists")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//functions called from controler files
//get specialist by name
// router.get('/named-specialist', getSpecialistByName)

//get all specialists
router.get('/all-specialists', getAllSpecialists)

//get specialist by Id
router.get('/specialist', getSpecialistsById)

//get specialist by specialty
router.get('/medical-specialty', getSpecialistsBySpecialty)

//Specialist sign up
router.post('/register', specialistSignUp)

module.exports = router;

//FOR TESTING: localhost:3000/specialists/getByName, localhost:3000/specialists/getById, etc.