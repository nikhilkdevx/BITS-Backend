const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,

    },
    code : {
        type : String,
        required : true,

    },
    credits : String,
    professor : [
        {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "User",
        }
    ],
    students : [
        {
            type : mongoose.SchemaTypes.ObjectId,
            ref : "User",
        }
    ],

});

const Course = mongoose.model("course",courseSchema);
module.exports = Course;
