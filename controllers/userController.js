const User = require("../Models/user");
const Course = require("../Models/courses");
const updateUserValidation = require("../validators/updateUserValidation");
const ExpressError = require("../utils/ExpressError");

module.exports.getAllUsers = async (req,res)=>{
    const users = await User.find();
    const safeUsers = users.map((user)=> ({
        id : user._id,
        name : user.name,
        email : user.email,
        role : user.role,
    }));
    res.status(200).json({ users : safeUsers});
};

module.exports.getOneUser = async(req,res)=>{
    const { id } = req.params;
    const user = await User.findById(id);
    if(!user){
        throw new ExpressError(404,"User not found");
    }
    const safeUser = {
        id : user._id,
        name : user.name,
        email : user.email,
        role : user.role,
    }
    res.status(200).json({user: safeUser});
};

module.exports.updateUser = async(req,res)=>{
    const result =  updateUserValidation.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error.message);
    } 
    const { id } = req.params;
    const newuser = req.body;
    const updateduser = await User.findByIdAndUpdate(id,newuser,{returnDocument : 'after'});
    if(!updateduser){
        throw new ExpressError(404,"User not Found");
    }
    const safeUser = {
        id : updateduser._id,
        name : updateduser.name,
        email :updateduser.email,
        role : updateduser.role,
    }
    res.status(200).json({user : safeUser});
};

module.exports.deleteUser = async(req,res)=>{
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    if(!user){
        throw new ExpressError(404,"User not Exist");
    }
    const safeUser = {
        id : user._id,
        name : user.name,
        email : user.email,
        role : user.role,
    }
    res.status(200).json({deletedUser : safeUser }); 
};

module.exports.enrollUserinCourse = async(req,res)=>{
    let { id1,id2 } = req.params;
    const student = await User.findById(id1);
    if(!student){
        throw new ExpressError(400,"Student Doesn't Exist");
    } 
    const course = await Course.findById(id2);
    if(!course){
        throw new ExpressError(400,"Course Doesn't Exist");
    }
    if(!student.courses.includes(course._id)){
        student.courses.push(course._id);
    }
    if(!course.students.includes(student._id)){
        course.students.push(student._id);
    }
    await student.save();
    await course.save();
    const safeStudent = {
        id : student._id,
        name : student.name,
        email : student.email,
        role : student.role,
        courses : student.courses,
    };
    res.status(201).json({message : "Successfully Added",safeStudent,course});
};

module.exports.removeUserfromCourse = async(req,res)=>{
    let { id1,id2 } = req.params;
    const student = await User.findById(id1);
    if(!student){
        throw new ExpressError(400,"Student Doesn't Exist");
    }
    const course = await Course.findById(id2);
    if(!course){
        throw new ExpressError(400,"Course Doesn't Exist");
    }
        student.courses.pull(course._id);
        course.students.pull(student._id);
    await student.save();
    await course.save();
    const safeStudent = {
        id : student._id,
        name : student.name,
        email : student.email,
        role : student.role,
        courses : student.courses,
    };
    res.status(201).json({message : "Successfully Removed from Course",safeStudent});
};