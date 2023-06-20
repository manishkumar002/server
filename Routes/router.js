const express = require("express");
const router = new express.Router();
const controllers = require("../Controllers/usersControllers");
const upload = require("../multerconfig/storageConfig")

//
router.post("/register",controllers.registerpost);
router.post("/login",controllers.loginpost);


// routes
router.post("/user/register",upload.single("user_profile"),controllers.userpost);
router.get("/user/details",controllers.userget);
 router.get("/user/:id",controllers.singleuserget);
 router.put("/user/edit/:id",upload.single("profile"),controllers.useredit);
 router.delete("/user/delete/:id",controllers.userdelete);



module.exports = router