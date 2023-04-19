const express = require("express");

// let PORT = 3000;

var app = express();
const {
  loginController,
  registerController,
  verifySQ
} = require("../controllers/userController");


//router object
const router = express.Router();

router.get("/", (req, res) => {

  res.send();

})


//routers
// POST || LOGIN USER
router.post("/login", loginController);

//POST || REGISTER USER
router.post("/register", registerController);

//POST || verify securiity question
router.post("/verifySQ", verifySQ)

module.exports = router;
