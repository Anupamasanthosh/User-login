var express = require('express');
const session = require('express-session');
const { response } = require('../app');
const users = require('../model/users');
var router = express.Router();

/* GET users listing. */
router.post('/', async function(req, res, next) {
  const {email,password}=req.body
  let userexist=await users.findOne({email:email})
  if(userexist){
          // console.log('user exist')
            if(userexist.password===password)
            {
              //console.log(password)
              req.session.loggedIn=true
              req.session.user=req.body.email
              //console.log(req.session.user)
              //console.log(session)
             if(req.session.loggedIn)
            {
              res.redirect('/users')
            }
            else{
              res.redirect('/')
            }
        }
        else{
          res.render('index')
        }
      }
  
});
router.use(function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next()
}).get('/',function(req,res,next)
{
  if(!req.session.user){
  res.redirect('/')
  //console.log(req.session.user)
  }
  else{
    res.render('users/user-home')
  }
})
router.get('/user-logout',function(req,res,next){
  req.session.destroy()
  console.log(session)
 res.redirect('/')
})
module.exports = router;
