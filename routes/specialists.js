var express = require('express');
var router = express.Router();
const {
  getSpecialistsById,
  getAllSpecialists,
  getSpecialistByName,
  getSpecialists,
  specialistSignUp
} = require("../controllers/specialists")

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

//functions called from controler files
//get specialist by name
router.get('/getByName', getSpecialistByName)

//get specialist by Id
router.get('/getById', getSpecialistsById)

//get all specialists
router.get('/getAll', getAllSpecialists)

//get specialist by specialty
router.get('/getSpecialists', getSpecialists)

//Specialist sign up
router.post('/register', specialistSignUp)

module.exports = router;

//FOR TESTING: localhost:3000/specialists/getByName, localhost:3000/specialists/getById, etc.