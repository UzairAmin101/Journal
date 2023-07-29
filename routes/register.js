const express = require('express');
const User = require('../models/User');
const router = express.Router();
const md5 = require('md5');
const passport = require('passport');

router.get('/', (req,res)=>{
    res.render('register')
})

router.post('/', (req,res)=>{

   User.register({username: req.body.email}, req.body.password, (err, user)=>{
        if (err){
            console.log(err);
            res.redirect('/register')
        }
        else{
            console.log(user);
            res.redirect('/login')
        }
   })
    
})

module.exports = router;