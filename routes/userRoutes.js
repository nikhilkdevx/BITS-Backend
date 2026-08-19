const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const verifyjwt = require("../middlewares/verifyJWT");
const allowRoles = require("../middlewares/allowRoles");
const isOwnerOrAdmin = require("../middlewares/isOwnerOrAdmin");
const isOwner = require("../middlewares/isOwner");

router.get("/",verifyjwt,allowRoles("professor","admin"),userController.getAllUsers);

router.route("/:id")
.get(verifyjwt,isOwnerOrAdmin,userController.getOneUser)
.patch(verifyjwt,isOwnerOrAdmin,userController.updateUser)
.delete(verifyjwt,allowRoles("admin"),userController.deleteUser);

router.patch("/:id1/course/:id2",verifyjwt,isOwner,userController.enrollUserinCourse);
router.delete("/:id1/course/:id2",verifyjwt,allowRoles("admin"),userController.removeUserfromCourse);

module.exports = router;
