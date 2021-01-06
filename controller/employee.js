/**
 * @author [Aakash Jangid]
 * @email [ajangid25@gmail.com]
 * @desc Employee Contoller [Initial Route, Register Employee]
 */

const Employee = require('../models/EmployeeModel');
const User = require('../models/UserModel');
require('dotenv').config();
// const multer = require('multer');


/**
 * Initial route
 * @route {POST} - api/v1/employee   - returns the user object if authenticated.
 * @req   {Header} - x-auth-token : [TOKEN_STRING]
 * @route {GET} - api/v1/employee    - returns simple Welcome user if user not authenticated.
 */



exports.initial = async (req, res, _) => {
    try {
        console.log(req.user)
        const user = await User.findById(req.user);
        console.log(user)
        let data = {}
        if (user !== null)
            data = {
                id: user?._id,
                displayName: user?.displayName,
            }
        else
            data = {
                "msg": "Welcome User"
            }
        return res.status(200).json(data);
    }
    catch (err) {
        return res.status(200).json({
            "error": err.message
            // "error": process.env.ERROR_STRING
        })
    }

}

/**
 * Registers employee w/ password and other details
 * @route {POST} - api/v1/register/employee
 * @req {payload} =>    Request Payload 
 *                          Full Name
                            Organization name
                            Employee ID no.
                            Mobile No.
                            E-Mail
                            Password
                            Upload ID Card (Formats: png, jpeg)
 */

exports.registerEmployee = async (req, res, _) => {

    const registerUser = async (email, password) => {

        try {
            if (password.length < 5)
                throw new Error("The password needs to be at least 5 characters long.")

            const existingUser = await User.findOne({ email: email });
            if (existingUser)
                throw new Error("An account with this email already exists.")

            const displayName = fullName
            const newUser = new User({ email, password, displayName });
            await newUser.save();

        } catch (err) {
            throw new Error(err.message);
        }
    }

    try {
        email = req.body.email;
        password = req.body.password;
        fullName = req.body.fullName;
        // register user in User table w/ email & password
        // and fullName
        await registerUser(email, password, fullName);
        let employee = new Employee(req.body);
        let kEmp = await employee.save()


        // If succesful, send this Json with a status of 200 i.e success
        // along with the registration Id.
        const data = {
            "status": 200,
            "registrationId": kEmp._id
        }
        res.status(200).json(data);

    }
    catch (err) {
        console.error(err.message)
        // If the post request fails, then send a status of 400 denoting the failure
        // along with the error message
        // these error messages can further be customised with [Custom Exception Classes]
        const data = {
            "status": 400,
            "error": err.message
        }
        res.status(400).json(data);

    }
}




    /*
    
    // SET STORAGE
    var Storage = multer.diskStorage({
        destination: 'client/public/upload',
        filename: function (_, file, cb) {
            cb(null, file.fieldname + '-' + Date.now())
        }
    })
    
    var upload = multer({ storage: Storage });
    */