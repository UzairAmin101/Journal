const express = require('express')
const Note = require('../models/Note')
const isAuthenticatedCustom = require('../middleware/auth')
const router = express.Router()

router.get('/', isAuthenticatedCustom, (req,res)=>{
    res.render('add');
})

router.post('/', isAuthenticatedCustom, (req,res)=>{
    const newNote = new Note({
        title: req.body.title,
        content: req.body.content,
        userId: req.user.id
    })
    newNote.save();
    res.redirect("/");
})

module.exports = router