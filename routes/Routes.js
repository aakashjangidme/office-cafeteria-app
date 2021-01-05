const Employee = require('../models/Employee');
const multer = require('multer');

// SET STORAGE
var Storage = multer.diskStorage({
    destination: 'client/public/upload',
    filename: function (_, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

var upload = multer({ storage: Storage });

const routes = (router) => {

    router.route('/').get(function (_, res) {
        const data = { "data": "Welcome to cafeteria" }
        res.send(data)
    });

    router.route('/addEmp').post(function (req, res) {
        console.log(req.body)
        let employee = new Employee(req.body);
        console.log(employee)
        employee.save()
            .then(kEmp => {
                // console.log(kEmp)
                // If succesful, send this Json with a status of 200 i.e success
                // along with the registration Id.
                const data = {
                    "status": 200,
                    "registrationId": kEmp._id
                }
                res.status(200).json(data);
            })
            .catch(err => {
                console.error(err)
                // If the post request fails, then send a status of 400 denoting the failure
                // along with the error message
                // these error messages can further be customised with [Custom Exception Classes]

                const data = {
                    "status": 400,
                    "error": err._message
                }
                res.status(400).json(data);

            });
    });



}

module.exports = routes;