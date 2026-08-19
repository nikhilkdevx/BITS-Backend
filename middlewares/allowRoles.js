const ExpressError = require("../utils/ExpressError");

function allowRoles(...roles) {
    return (req, res, next) => {
        if (!req.user) {
            throw new ExpressError(401, "Unauthorized");
        }
        if (!roles.includes(req.user.role)) {
            throw new ExpressError(403, "Forbidden");
        }
        next();
    };
}

module.exports = allowRoles;