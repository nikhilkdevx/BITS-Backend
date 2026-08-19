const loginValidation = require("../validators/loginValidation");
const createUserValidation = require("../validators/createUserValidation");
const User = require("../Models/user");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const ExpressError = require("../utils/ExpressError");

module.exports.register = async (req,res)=>{
    const result = createUserValidation.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error.message);
    }
    const {name,email,password,role} = req.body;
    const existingUser = await User.findOne({ email });
    if(existingUser){
        throw new ExpressError(400,"Email already Registered");
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
        name,
        email,
        password : hashedPassword,
        role,
    });
    await user.save();
    const safeUser = {
        id : user._id,
        name : user.name,
        email : user.email,
        role : user.role
    };
    res.status(201).json({message : " User registered Successfully", user : safeUser});
    
};

module.exports.login = async(req,res)=>{
    const result = loginValidation.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error.message);
    }
    const {email,password} = req.body;
    const user = await User.findOne({email});
    if(!user){
        throw new ExpressError(401,"Invalid Email or Password");
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if(!isMatch){
        throw new ExpressError(401,"Invalid Email or Password");
    }
    const token = jwt.sign({
        userId : user._id , role : user.role},
        process.env.JWT_SECERT,
        {expiresIn : "7d"}
    );
    const safeUser = {
        id : user._id,
        name : user.name,
        email : user.email,
        role : user.role
    };
    res.status(200).json({message : "Login Success", token, user : safeUser});
}