const express = require('express');
const User = require('../models/User');
const md5 = require('md5');
const passport = require('passport');
const router = express.Router();

router.get('/', (req,res)=>{
    res.render('login')
})

// router.post('/', (req,res)=>{
//     User.findOne({email: req.body.email})
//     .then((user)=>{
//         if (user!==null && user.password===md5(req.body.password)){
//             res.redirect('/')
//         }
//         else{
//             res.redirect('login')
//         }
//     })
//     .catch(err=>console.log(err));
// })

router.post('/', passport.authenticate('local', {failureRedirect:'/login'}), (req,res)=>{
    res.redirect('/');
})

module.exports = router;