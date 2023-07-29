const express = require('express');
const Note = require('../models/Note');
const isAuthenticatedCustom = require('../middleware/auth');    
const router = express.Router();

router.get('/:id', isAuthenticatedCustom, (req,res)=>{
    const id = req.params.id;
    Note.findById(id)
    .then((note)=>{
        if (note.userId != req.user.id){
            res.redirect('/');
        }
        else{
            res.render("edit",{note:note})
        }
        
    })
    .catch((err)=>{
        console.log(err)
    });
})

router.post('/:id',isAuthenticatedCustom, (req,res)=>{
    const id = req.params.id;

    Note.findById(id).
    then((note)=>{
        if (note.userId != req.user.id){
            res.redirect('/');
        }
    })
    .catch((err)=>{
        console.log(err)
        res.redirect('/');
    })

    Note.findByIdAndDelete(id)
    .then(()=>{
        const newNote = new Note({
            _id: id,
            title: req.body.title,
            content: req.body.content,
            userId: req.user.id
        })
        newNote.save()
        .then(res.redirect('/'))
    })
    .catch((err)=>{
        console.log(err)
    })

})

module.exports = router;