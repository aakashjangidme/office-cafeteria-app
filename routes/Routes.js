/**
 * @author Aakash Jangid
 * @desc contains routes for all api endpoints
 */

const express = require('express');
const { login, validateToken } = require('../controller/authentication');
const { initial, registerEmployee: addEmployee } = require('../controller/employee');
const { foodList, addFood } = require('../controller/foodList');

const authMiddleWare = require('../middleware/auth')

const router = express.Router();


// if user is in the session then make post request to the / route to get it's detail
// if not, then just simply perform a get request to get to the page
router.get('/', initial)
router.post('/', authMiddleWare, initial)
// @desc - To login the user w/ email & password.
router.post('/login', login)
// @desc - for testing purpose the function can be used anyway!
router.post('/validateToken', validateToken)
// @desc - register employee w/ other details and password
router.post('/register', addEmployee)
router.post('/addFood', addFood)
router.get('/foodList', foodList)


module.exports = router;

