const express = require("express");
const app = express();

const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 6000;

app.listen(port,"0.0.0.0",()=>{
    console.log(`app is listening on port ${port}`);
});

app.use(express.json());

const mongoose = require("mongoose");
async function main() {
    await mongoose.connect(process.env.MONGO_URL);
}
main()
.then(()=>
    console.log("connected to MongoDB"))
.catch(err=>console.log(err));

const authRoutes = require("./routes/authRoutes");
app.use("/auth",authRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/user",userRoutes);

const courseRoute = require("./routes/courseRoutes");
app.use("/course",courseRoute);

app.get("/",(req,res)=>{
    res.json({
        message : "BITS BACKEND IS RUNNING",
        documentation : "See the GitHub repository for API details."
    });
});

// Global Error Handler
app.use((err,req,res,next)=>{
    const {statusCode = 500 , message = "Something Went Wrong"} = err;
    res.status(statusCode).json({message});
});