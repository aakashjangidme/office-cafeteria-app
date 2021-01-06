/**
 * @author Aakash Jangid
 * @desc authentication w/ JWT middleware
 * if auth-token is invalid, this middleware raises an error to the client
 * the errors are raised only on those endpoints where this [authMiddleWare] object is passed in the request.
 */
const jwt = require("jsonwebtoken");

const authMiddleWare = (req, res, next) => {

    try {
        const token = req.header("x-auth-token");
        if (!token)
            return res
                .status(401)
                .json({ msg: "No authentication token, authorization denied." });

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        if (!verified)
            return res
                .status(401)
                .json({ msg: "Token verification failed, authorization denied." });

        req.user = verified.id;
        next();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

module.exports = authMiddleWare;