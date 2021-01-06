/**
 * @author Aakash Jangid
 * @email ajangid25@gmail.com
 * @desc authentication contorller [login, logout, validate]
 */

const User = require('../models/userModel');
require('dotenv').config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");


// @desc - To login the user
// @path - POST /api/v1/login
// @payload[body] -  @payload[header] - application/json 
/* {	 
    "email": "user@email.com",
    "password" : "password"
    }
*/

exports.login = async (req, res, _) => {
    try {
        const { email, password } = req.body;

        // validate
        if (!email || !password)
            return res.status(400).json({ msg: "Not all fields have been entered." });

        const user = await User.findOne({ email: email });
        if (!user)
            return res
                .status(400)
                .json({ msg: "No account with this email has been registered." });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: "Invalid credentials." });

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        res.json({
            token,
            user: {
                id: user._id,
                displayName: user.displayName,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}






/**
 * Validates the Auth/JWT Token
 * @PATH {POST} /api/v1/employee/validateToken 
 * @req  {Header} x-auth-token : [TOKEN_STRING]
 */

exports.validateToken = async (req, res, _) => {
    try {
        const token = req.header("x-auth-token");
        if (!token) return res.json(false);

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified) return res.json(false);

        const user = await User.findById(verified.id);
        if (!user) return res.json(false);

        return res.json(true);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}