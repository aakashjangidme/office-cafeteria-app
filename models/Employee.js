const mongoose = require("mongoose");


const EmployeeSchema = new mongoose.Schema({

    fullName: {
        type: String,
        required: true,
    },
    orgName: {
        type: String,
        required: true,
    },
    empIdNumber: {
        type: String,
        required: true,
    },
    mobileNumber: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    idImg: {
        type : String
    },
    // Upload ID Card(Formats: png, jpeg)

    registrationDate: { type: Date, default: Date.now }

});




module.exports = mongoose.model('Employees', EmployeeSchema);