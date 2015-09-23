module.exports = configureSessions;

// 
var User = require('../schemas/user');

function configureSessions (app, sessions) {

  //oauth session
  app.use(sessions({
    cookieName : 'session',
    secret : 'kafljslafio134asfjasoasdfasdfsdfsadff',
    duration : 30 * 60 * 10000,
    activeDuration : 5 * 60 * 10000
  }));

  //oauth session
  app.use(sessions({
    cookieName : 'user',
    secret : 'kafljslafio134asfjasoasdfasdfsdfdfzzz',
    duration : 30 * 60 * 10000,
    activeDuration : 5 * 60 * 10000
  }));

  // always update session
  app.use(updateSession);

}

function updateSession (req, res, next) { //user next() for next middleware

  console.log('\n');
  console.log("in updateSession()");

  // console.log('\n');
  // console.log('req.session.user.facebook:');
  // console.log(req.session.user.facebook);

  console.log('\n');
  console.log('req.session:');
  console.log(req.session);

  console.log('\n');
  console.log('req.user:');
  console.log(req.user);
  // console.log('\n');
  // console.log('\n');

  if (req.session && req.session.user) {

    // FIND USER by email (email is unique)
    // actually, finding by username should 
    // also work (username is also unique)
    User.findOne({ email : req.session.user.email }, function (err, user) {
      if (user) {

        // // save user to req object
        req.user = user;
        // delete password for security
        // delete req.user.password;

        // update session
        // req.session.user = req.user;
        // res.locals.user = req.user;
        req.session.user = user;
        req.session.password = undefined;

        console.log('session updated');
      } else {
        console.log('user is undefined');
      }

      next();
    });
  } else {
    console.log('req.session or req.session.user is false');
    next();
  }
}