var express = require('express');
const session = require('express-session');
const Admin = require('../model/admin');
var router = express.Router();
const User = require('../model/users');


/* GET home page. */

router.get('/', function(req, res, next) {
  if(!req.session.user)
  {
  res.render('index', { });
  }
  else
  {
    //changes
    res.redirect('/users',{user:req.session.user})
  }
});

router.use(function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next()
}).get('/admin-login',function(req,res)
{
  if(!req.session.admin)
  {
    res.render('admin-login')
  }
  else{
    //changes
    res.redirect('/admin-home')
  }

})

//post data to admin home
router.post('/admin-login',async function(req,res,next)
{
  const {email,password}=req.body
  let adminexist=await Admin.findOne({email:email})
  if(adminexist)
  {
    if(adminexist.password===password)
    {
      req.session.loggedIn=true
      req.session.admin=req.body.email
      console.log(req.session.admin)
      res.redirect('/admin-home')
    }
    else if(req.session.loggedIn)
    {
    res.redirect('/admin-home')
    }
    else{
      res.render('admin-login',{admins:"Invalid email or password"})
    }
    }
    else{
    res.render('admin-login')
    }
  
  
})

//admin home get 
router.use( function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next()
}).get('/admin-home',async function(req,res,next)
{ const {search} = req.query
  if(search){
  const user = await User.find({name : search})
  res.render('admin/admin-home',{user})
  }
  else{
  const user=await User.find({})
  // console.log()
  // res.send(user)
  if(req.session.admin)
  {
  res.render('admin/admin-home',{user})
  }
  else{
    res.redirect('/admin-login')
  }}
})


router.get('/edit-user',async function(req,res,next)
{
  
   const user=await User.find({})
   res.render('admin/edit-user',{user})
  
})
router.get('/edit-users/:id', async function(req,res)
{
  var {id}=req.params
  const user=await User.findById(id)
  console.log(user)
  res.render('update-user',{user})
})


router.put('/edit-users/:id',async (req,res)=>
{
  console.log(req.body)
  var {id}=req.params
  const user=await User.findByIdAndUpdate(id,req.body)
  res.redirect('/admin-home')
})
router.use( function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next()
}).get('/create-user',async function(req,res)
{
  res.render('admin/create-user')
})

router.post('/create-user',async (req,res,next)=>

{
        //console.log(req.body)
        const email=req.body.email
        const password=req.body.password
        const name=req.body.name
        const number=req.body.number
        let userexist=await User.findOne({email:email})
        if(userexist){
            res.send('user exists')
        }
      else{
    
        const newUser=new User({
            email:email,
            name:name,
            password:password,
            number:number

        }) 
        await newUser.save()
       {
        res.redirect('/admin-home')
        
       }
    }
})



router.delete('/delete-users/:id',async function(req,res)
{
  //console.log(req.body)
  var {id}=req.params
  const user=await User.findByIdAndDelete(id)
  // res.send('helo')
  res.redirect('/admin-home')
})

router.use( function(req, res, next) {
  res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
  next()
}).get('/logout',(req,res)=>
{
  req.session.destroy()
  res.redirect('/admin-login')
})
module.exports = router;
