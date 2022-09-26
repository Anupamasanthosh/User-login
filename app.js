var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose=require('mongoose')
var session=require('express-session')
var methodoverride=require('method-override')

var indexRouter = require('./routes/admin');
var usersRouter = require('./routes/users');
var registrationRouter=require('./routes/registration')
//var adminRouter=require('./routes/admin')
// var logoutRouter=require('./routes/users')

//var hbs=require('express-handlebars')

//databse connection
mongoose.connect("mongodb://localhost:27017/Sampledb",{useNewUrlParser:true})
var conn=mongoose.connection
conn.on('connected',function()
{
  console.log('database is conneted successfully')
})
conn.on('disconncted',function()
{
  console.log('database is disconnected')
})
conn.on('error',console.error.bind(console,'connection error:'))



var app = express();

//module imported
const User=require('./model/users')
const Admin = require('./model/admin');


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret:"key",
  //cookie:{maxAge:60000},
  resave:false,
  saveUninitialized:false

}))
app.use(methodoverride('_method'))

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/registration',registrationRouter)
//app.use('/admin-login',adminRouter)
// app.use('/user-logout',logoutRouter)


//admin-saving

const newAdmin=new Admin({
  email:'admin@gmail.com',
  password:'admin'
}) 
newAdmin.save()


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
// module.exports=conn
