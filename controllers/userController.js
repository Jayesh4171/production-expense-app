
const userModel = require("../models/userModel");
const bcrypt = require('bcrypt')

// login callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const newPasswordd = password
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).send("User Not Found");
    }
    else {
      bcrypt.compare(newPasswordd, user.password, function (err, result) {
        console.error(result)
        if (result == true) {
          res.status(200).json({
            success: true,
            user,
          })
        }

      })
    
    }
  } catch (error) {

    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
};

//Register Callback
const registerController = async (req, res) => {
  try {
    const newUser = new userModel(req.body);

    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });


  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};


// verify security question
const verifySQ = async (req, res) => {
  try {
    const { email, sq, password } = req.body;
    const user = await userModel.findOne({ email, sq });

    if (!user) {
      return res.status(400).send({
        success: false,
        message: "Wrong email or answer"
      })
    }
    const hashed = bcrypt.hashSync(password , 10);
    await userModel.findOneAndUpdate({email : user.email}, {password : hashed})
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully"
    })
  }
  catch (error) {
    console.log(error)
    res.status(400).json({
      success: false,
      error,
    });
  }
  ;



  }



  module.exports = { loginController, registerController, verifySQ};