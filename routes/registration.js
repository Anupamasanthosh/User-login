var express = require('express');
const users = require('../model/users');
var router = express.Router();


router.use( function(req, res, next) {
    res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next()
  }).get('/',function(req,res,next)
{   
    res.render('registration')

})
router.post('/',async (req,res,next)=>

{
        //console.log(req.body)
        const email=req.body.email
        const password=req.body.password
        const name=req.body.name
        const number=req.body.number
        
        let userexist=await users.findOne({email:email})
        if(userexist){
            res.send('user exists')
        }
      else{
    
        const newUser=new users({
            email:email,
            name:name,
            password:password,
            number:number

        }) 
        await newUser.save()
       {
        res.redirect('/users')
        
       }
    }
})
    

module.exports = router;
