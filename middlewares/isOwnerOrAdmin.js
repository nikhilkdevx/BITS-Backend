const ExpressError = require("../utils/ExpressError");

const isOwnerOrAdmin = (req,res,next)=>{
    const { id } = req.params;
    if(req.user.userId !== id && req.user.role !== "admin"){
        throw new ExpressError(403,"You are not allowed");
    } 
    next();
};

module.exports = isOwnerOrAdmin;