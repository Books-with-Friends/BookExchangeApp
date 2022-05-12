require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const cookieController = require('./controllers/cookieController')
const dbController = require('./controllers/dbController.js')
//oauth dependancies
require('./auth/auth.js');
const session = require('express-session')
const passport = require('passport')

const PORT = 3000;
const app = express();

//oauth dependancy
app.use(session({ secret: process.env.SECRET_SESSION }))
const apiRouter = require('./routes/api');
app.use(passport.initialize());
app.use(passport.session())


//middleware oauth function 
const authCheck = (req, res, next) => {
  return req.user ? next() : res.sendFile(path.join(__dirname, '../public/login.html'));
}

app.use(express.json());
app.use(express.urlencoded());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', authCheck, dbController.findUserOrCreate, cookieController.setCookies, (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//authentication route to serve up seperate login html file
app.get('/login', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/login.html'));
});

//logout link to end the session and redirect back to root which will reroute back to /login
app.get('/logout', function(req, res) {
  req.session.destroy(function(e){
      res.clearCookie('name');
      res.clearCookie('img');
      req.logout();
      res.redirect('/');
  });
});

//button on login page route "login to google"
app.get('/auth/google', passport.authenticate("google", { scope : ['email', 'profile']}))

//callback route frequired by google auth to send information 
app.get('/auth/google/callback', passport.authenticate("google", {
  successRedirect: '/',
  failureRedirect: '/login'
}))



app.use(express.static(path.resolve(__dirname, '../public')));
app.use(express.static(path.resolve(__dirname, '../client')));


/**
 * define route handlers
 */
app.use('/api', apiRouter);


// unknown route ****Since we are using react router, 404 error will be handled on the front end side****
app.use((req, res) => res.sendFile(path.join(__dirname, '../public/login.html')));


app.use("*", (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

//global error handler
app.use((err, req, res, next) => {
  const defaultErr = {
    log: 'Express error handler caught unknown middleware error',
    status: 500,
    message: { err: 'An error occurred' },
  };
  const errorObj = Object.assign({}, defaultErr, err);
  console.log(errorObj.log);
  return res.status(errorObj.status).json(errorObj.message);
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = app;