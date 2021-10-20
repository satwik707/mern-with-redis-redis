const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
 Email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  Password: {
    type: String,
    required: true,
    trim: true,
    
    
  },
});

const User = mongoose.model("User", UserSchema);

module.exports = User;