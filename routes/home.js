const expresss = require('express')
const Note = require('../models/Note')
const isAuthenticatedCustom = require('../middleware/auth')
const router = expresss.Router()

router.get('/',isAuthenticatedCustom, (req,res)=>{
    console.log(req.user.id);
    Note.find({userId:req.user.id}).then((notes)=>{
        console.log(notes)
        res.render("home",{items:notes})
    }).catch((err)=>{
        console.log(err)
    })
    
})

module.exports = router