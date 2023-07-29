const express = require('express')
const router = express.Router()

router.get('/', (req,res)=>{
    req.logout((err)=>{
        if (err){
            console.log(err)
        }
        else{
            res.redirect('/login')
        }
    });
    
})

module.exports = router;



