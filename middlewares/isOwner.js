const ExpressError = require("../utils/ExpressError")

const isOwner = function(req,res,next){
    if(req.user.userId !== req.params.id1){
        throw new ExpressError(403,"You are not allowed to add others");
    }
    next();
};

module.exports = isOwner;