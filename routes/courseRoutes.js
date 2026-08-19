const express = require("express");
const router = express.Router();
const courseController = require("../controllers/courseController");
const verifyjwt = require("../middlewares/verifyJWT");
const allowRoles = require("../middlewares/allowRoles");
const isOwnerOrAdmin = require("../middlewares/isOwnerOrAdmin");

router.route("/")
.get(courseController.getAllCourse)
.post(verifyjwt,allowRoles("admin","professor"),courseController.createCourse);

router.route("/:id")
.get(verifyjwt,courseController.getOneCourse)
.patch(verifyjwt,allowRoles("professor","admin"),courseController.updateCourse)
.delete(verifyjwt,allowRoles("admin"),courseController.DeletedCourse);

router.patch("/:id1/professor/:id2",verifyjwt,allowRoles("admin"),courseController.enrollProfessorInCourse);

module.exports = router;