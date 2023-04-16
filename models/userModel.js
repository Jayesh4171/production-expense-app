const bcrypt = require("bcrypt")
const mongoose = require("mongoose");

//schema designasd
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    email: {
      type: String,
      required: [true, "email is required and should be unique"],
      unique: true,
    },
    sq:{
      type: String,
      required: [true,"Answer is Required"]
      },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    
  createdAt: {type:Date, default: Date.now},
  lastLoggedIn: { type: Date, default: Date.now},
  
}  // { timestamps: true } 
);


userSchema.pre("save",function (next) {
  if (!this.isModified("password")){
    return next();
  }
  this.password = bcrypt.hashSync(this.password,10);
  next();
});


userSchema.methods.checkPassword = async function (password) {
  try {
    const match = await bcrypt.compare(password, this.password);
    if (match){
      return Promise.resolve();
    }
    return Promise.reject();
  }
  catch (error){
    return Promise.reject(error);
  }
};

userSchema.methods.updateLoggedIn = function () {
  return this.model("users").findOneAndUpdate(
    {
      email: this.email,
    },
    {lastLoggedIn: new Date() }
  );
};

//export
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;