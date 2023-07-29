require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const passportLocalMongoose = require('passport-local-mongoose');

const homeRouter = require("./routes/home")
const addNoteRouter = require("./routes/addNote")
const deleteNoteRouter = require('./routes/deleteNote')
const editNoteRouter = require('./routes/editNote')
const loginRouter = require('./routes/login')
const registerRouter = require('./routes/register')
const logoutRouter = require('./routes/logout')

const User = require('./models/User')

// Initialize Express
const app = express();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs")

// Auth Middleware
app.use(session({
    secret: "LONGSTRINGOFMYCHOOSING",
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {dbName:'test'}).then(()=>{console.log("Connected to MongoDB")}).catch((err)=>{console.log(err)})


// Home Route
app.use('/', homeRouter);

// Add Route
app.use('/add', addNoteRouter);

// Delete Route
app.use("/delete", deleteNoteRouter)

// Edit Route
app.use('/edit', editNoteRouter);

// Login Route
app.use('/login', loginRouter);

// Register Route
app.use('/register', registerRouter);

// Logout Route
app.use('/logout', logoutRouter)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}...`);
});