const jwt = require("jsonwebtoken");
const ExpressError = require("../utils/ExpressError");

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ExpressError(401, "Login required");
    }
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token,process.env.JWT_SECERT);
    req.user = decoded;
    next();
};

module.exports = verifyJWT;