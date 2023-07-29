const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

// User Schema
const UserSchema = new mongoose.Schema({
    username: String,
    password: String
})

// Auth Plugin
UserSchema.plugin(passportLocalMongoose);

// User Model
const User = mongoose.model("User", UserSchema);

module.exports = User;