const express = require('express')
const Note = require('../models/Note');
const isAuthenticatedCustom = require('../middleware/auth');
const router = express.Router()

router.post('/', isAuthenticatedCustom, (req, res)=>{
    const id = req.body.id;
    Note.findByIdAndDelete(id)
    .then((note)=>{
        console.log(note);
    })
    .catch((err)=>{
        console.log(err);
    })
    res.redirect("/");
})

module.exports = router