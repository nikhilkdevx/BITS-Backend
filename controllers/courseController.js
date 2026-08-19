const User = require("../Models/user");
const Course = require("../Models/courses");
const ExpressError = require("../utils/ExpressError");
const createCourseValidation = require("../validators/createCourseValidation");
const updateCourseValidation = require("../validators/updateCourseValidation");

module.exports.getAllCourse = async(req,res)=>{
    const courses = await Course.find();
    res.status(200).json({AllCourses : courses});
};

module.exports.createCourse = async(req,res)=>{
    const result = createCourseValidation.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error.message);
    }
    const { name,code,credits} = req.body;
    const course = new Course({
        name,
        code,
        credits,
    });
    await course.save();
    res.status(201).json({message: "New Course Created ",course});
};

module.exports.getOneCourse = async(req,res)=>{
    const { id } = req.params;
    const course = await Course.findById(id);
    if(!course){
        throw new ExpressError(400,"Course Not Found");
    }
    res.status(200).json({course : course});
};

module.exports.updateCourse = async(req,res)=>{
    const result = updateCourseValidation.validate(req.body);
    if(result.error){
        throw new ExpressError(400,result.error.message);
    }
    const newData = req.body;
    const {id} = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id,newData,{ returnDocument: 'after'});
    if(!updatedCourse){
        throw new ExpressError(400,"Course Not Found");
    }
    res.status(200).json({message : " Course Updated Successfully",course : updatedCourse});
};

module.exports.DeletedCourse = async(req,res)=>{
    const {id} = req.params;
    const course = await Course.findByIdAndDelete(id);
    if(!course){
        throw new ExpressError(400,"Course Doesn't Exist");
    }
    res.status(200).json({DeletedCourse : course});
};

module.exports.enrollProfessorInCourse = async(req,res)=>{
    let { id1,id2 } = req.params;
    const course = await Course.findById(id1);
    if(!course){
        throw new ExpressError(400,"Course Doesn't Exist");
    }
    const professor = await User.findById(id2);
    if(!professor){
        throw new ExpressError(400,"Professor Doesn't Exist");
    }
    if(professor.role !== "professor"){
        throw new ExpressError(400,"User is not a professor");
    }
    if(!course.professor.includes(professor._id)){
        course.professor.push(professor._id);
    }
    await course.save();
    res.status(201).json({message : "Successfully Added",course});
};