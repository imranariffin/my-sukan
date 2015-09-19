
var config = require('../auth/config');
var User = require('../schemas/user');

// require strategies
var FacebookStrategy = require('passport-facebook').Strategy;
// var GoogleStrategy = require('passport-google-oauth').Strategy;

// parser for fb profile picture
var request = require('request');
var cheerio = require('cheerio');

function setupPassport (app, passport) {

  passport.serializeUser(function (user, done) {
    done(null, user);
  });
  passport.deserializeUser(function (obj, done) {
    done(null, obj);
  });
  // passport.serializeUser(function (user, done) {

  //   // TEST
  //   console.log('INSIDE serializeUser():');
  //   console.log('user:');
  //   console.log(user);
  //   console.log('user.id');
  //   console.log(user.id);

  //   // done(null, user.id);
  //   done(null, user);
  // });
  // passport.deserializeUser(function (id, done) {
    
  //   //  TEST
  //   console.log('INSIDE deserializeUser():');
  //   console.log('id:');
  //   console.log(id);

  //   User.findById(id, function (err, user) {
  //     if (err) {
  //       console.log(err);
  //       done(err, null);
  //     } else {
  //       console.log('user:');
  //       console.log(user);
  //       done(null, user);
  //     }
  //   });
  //   // done(null, obj);
  // });

  // //Facebook Strategy
  // passport.use(new FacebookStrategy({
  //     clientID      : config.facebook.clientID,
  //     clientSecret  : config.facebook.clientSecret,
  //     callbackURL   : config.facebook.callbackURL
  // },
  //   function (accessToken, refreshToken, profile, done) {
  //     process.nextTick(function () {
  //       console.log('\n');
  //       console.log('in passport.use()');
  //       console.log('succces fb-login: now time for db codes');
  //       console.log('\n');

  //       console.log('in profile: ');
  //       for (i in profile) {
  //         var item = profile[i];
  //         console.log('item ' + i + ' ' + item);
  //       }

  //       console.log('profile.emails[0].value: ' + profile.emails[0].value);

  //       var updateFacebook = false;
  //       var createNewUser = false;
  //       var addFacebook = false;

  //       //find user using profile given be Facebook
  //       var facebookEmail = profile.emails[0].value;

  //       // TEST
  //       console.log('facebookEmail:');
  //       console.log(facebookEmail);

  //       User.findOne({ email : facebookEmail }, function (err, user) {
  //         //check for error
  //         if (err) {
  //           throw err;
  //         } 

  //         //if no error
  //         if (user) {
  //           console.log('\n');
  //           console.log('good: user oredy exists in db');
  //           console.log('\n');

  //           // if a user with the same email exists
  //           // does that user has facebook profile oredy?
  //           if (user.facebook.isLinked === false) {
  //             // if does not, make one.
  //             // UPDATE ACCOUNT. ADD FACEBOOK PROFILE
  //             user.facebook = {
  //               profile : profile,
  //               accessToken : accessToken,
  //               refreshToken : refreshToken,
  //               isLinked : true
  //             };

  //             // // save user update
  //             // user.save();
  //             user.save(function (err) {
  //               if (err) {
  //                 return done(err, null);
  //               } else {
  //                 // save profile to req.session.passport
  //                 return done(null, profile);
  //               }
  //             });

  //             // TEST
  //             console.log('TEST\n');
  //             console.log('done updating user with facebook profile;');
  //             console.log('user:');
  //             console.log(user);
  //             console.log('\n');

  //             // // save to req.session.passport
  //             return done(null, profile);

  //           } else {
  //             // proceed
  //             console.log('TEST\n');
  //             console.log('proceed');              
  //             console.log('user: oredy has .facebook');
  //             console.log(user);
  //             console.log('\n');

  //             // save to req.session.passport
  //             return done(null, profile);
  //           }
  //         } else {
  //           //update db with profile provided by Facebook
  //           console.log('success: user does not exist');
  //           console.log('update db');
            
  //           //create new user using profile info from Facebook
  //           var user = new User({
  //             // id : 'genericID'
  //             email       : profile.emails[0].value
  //             , firstName : profile._json['first_name']
  //             , lastName  : profile._json['last_name']
  //             , password  : 'password'
  //             , facebook  : {
  //                   isLinked : true,
  //                   profile : profile,
  //                   accessToken : accessToken,
  //                   refreshToken : refreshToken
  //             }
  //           });


  //           // /*** automatically create half-random username ***/
  //           // /*** where username = email + randomNumber ***/
  //           // // get letter part of email
  //           // var halfRandomUsername = user.email.slice(0, user.email.indexOf('@'));
  //           // halfRandomUsername += String(Math.round(Math.random()*10));
  //           // halfRandomUsername += String(Math.round(Math.random()*10));

  //           // console.log('TEST');
  //           // console.log('half-random username:');
  //           // console.log(halfRandomUsername);
  //           // console.log('');

  //           console.log("TEST");
  //           console.log('adding facebook account:');
  //           console.log("user.facebook:");
  //           console.log(user.facebook);
  //           console.log("TEST END");

  //           //update db
  //           user.save(function (err) {
  //             if (err) {
  //               console.log('err: ' + err);
  //             } else {
  //               console.log('save in db success');
  //               return done(null, profile);
  //             }
  //           });
  //           // user.save();

  //           // // save to req.session.passport
  //           // return done(null, profile);
  //         }
  //       });

  //       // return done(null, profile);
  //     });
  //   }
  // ));

 //Facebook Strategy
  passport.use(new FacebookStrategy({
      clientID      : config.facebook.clientID,
      clientSecret  : config.facebook.clientSecret,
      callbackURL   : config.facebook.callbackURL
  },
    function (accessToken, refreshToken, profile, done) {
      process.nextTick(function () {

          console.log('\n\nprofile:\n');
          console.log(profile);
          console.log('');

          var facebookEmail = profile.emails[0].value;
          User.findOne({email : facebookEmail}, function (err, user) {
            if (err)
              return(err, null);
            else {
              if (user) {
                console.log('fb user oredy in db');
                console.log('therefore simply update profile picture');
                // update profile picture using fb profile picture
                // fbProfileUrl = profile.profileUrl;
                fbProfileUrl = 'https://graph.facebook.com/me/picture?access_token=' + accessToken;
                fbProfileUrl += '&redirect=false'
                // TEST
                console.log('fbProfileUrl:');
                console.log(fbProfileUrl);

                request(fbProfileUrl, function (err, response, body) {
                  if (err || response.statusCode != 200)
                    return done(err, null);
                  else {

                    // console.log('body:');
                    // console.log(body);
                    // console.log("typeof(body):");
                    // console.log(typeof(JSON.parse(body)));
                    // console.log("Object.keys(body):");
                    // console.log(Object.keys(JSON.parse(body)));

                    body = JSON.parse(body);

                    user.photo = body.data.url;

                    // TEST
                    console.log('body.data.url:');
                    console.log(body.data.url);
                    console.log('user.photo:');
                    console.log(user.photo);
                    console.log('typeof(user.photo):');
                    console.log(typeof(user.photo));

                    // user.save();
                    // return done(null, profile);

                    // if a user with the same email exists
                    // does that user has facebook profile oredy?
                    if (user.facebook.isLinked === false) {
                      // if does not, make one.
                      // UPDATE ACCOUNT. ADD FACEBOOK PROFILE
                      user.facebook = {
                        profile : profile,
                        accessToken : accessToken,
                        refreshToken : refreshToken,
                        isLinked : true
                      };

                      // // save user update
                      // user.save();
                      user.save(function (err) {
                        if (err) {
                          console.log(err);
                          return done(err, null);
                        } else {
                          // save profile to req.session.passport
                          console.log('save success:');
                          console.log('user.photo:');
                          console.log(user.photo);
                          return done(null, profile);
                        }
                      });

                      // // TEST
                      // console.log('TEST\n');
                      // console.log('done updating user with facebook profile;');
                      // console.log('user:');
                      // console.log(user);
                      // console.log('\n');

                      // // save to req.session.passport
                      return done(null, profile);
                    } else {

                      // // proceed
                      // console.log('TEST\n');
                      // console.log('proceed');              
                      // console.log('user: oredy has .facebook');
                      // console.log(user);
                      // console.log('\n');

                      // save to req.session.passport
                      user.save(function (err) {
                        if (err) {
                          console.log(err);
                          return done(err, null);
                        } else {
                          console.log('success save');
                          return done(null, profile);
                        }
                      });
                    }
                  }
                });
                // return done(null, profile);
              } else {
                console.log('fb user not yet in db');
                console.log('therefore simply create a new user using fb profile');
                // create new user

                //update db with profile provided by Facebook
                console.log('success: user does not exist');
                console.log('update db');
                
                //create new user using profile info from Facebook
                var user = new User({
                  // id : 'genericID'
                  email       : profile.emails[0].value
                  , firstName : profile._json['first_name']
                  , lastName  : profile._json['last_name']
                  , password  : 'password'
                  , facebook  : {
                        isLinked : true,
                        profile : profile,
                        accessToken : accessToken,
                        refreshToken : refreshToken
                  }
                });


                // /*** automatically create half-random username ***/
                // /*** where username = email + randomNumber ***/
                // // get letter part of email
                // var halfRandomUsername = user.email.slice(0, user.email.indexOf('@'));
                // halfRandomUsername += String(Math.round(Math.random()*10));
                // halfRandomUsername += String(Math.round(Math.random()*10));

                // console.log('TEST');
                // console.log('half-random username:');
                // console.log(halfRandomUsername);
                // console.log('');

                console.log("TEST");
                console.log('adding facebook account:');
                console.log("user.facebook:");
                console.log(user.facebook);
                console.log("TEST END");

                //update db
                user.save(function (err) {
                  if (err) {
                    console.log('err: ' + err);
                  } else {
                    console.log('save in db success');
                    return done(null, profile);
                  }
                });
              }
            }
          });

          // return done(null, profile);
        });

        // return done(null, profile);
  }));

  app.use(passport.initialize());
  app.use(passport.session());

  app.get('/auth/facebook', passport.authenticate('facebook', { 
    scope : 'email' 
  })
  // , function (req, res) {
  //   res.redirect('index');
  // }
  );

  app.get('/auth/facebook/callback', 
    passport.authenticate('facebook'), 
    // redirectToDashboard
    redirectToMain
  );
}

module.exports = setupPassport;


// function redirectToDashboard (req, res) {
function redirectToMain (req, res) {

  console.log('IN redirectToMain()');
  console.log('req.session.passport.user:');
  console.log(req.session.passport.user);

  console.log('req.session.passport.user:');
  console.log(req.session.passport.user);

  console.log('active user email (req.session.passport.user.emails[0])');
  console.log(req.session.passport.user.emails[0]);
  console.log('how about req.user.emails[0]):');
  console.log(req.user.emails[0]);
  // console.log('Or, how about req.user.emails):');
  // console.log(req.user.emails);

  User.findOne({ email : req.session.passport.user.emails[0].value }, function (err, user) {
    if (!err) {
      if (user) {
        req.session.user = user;
        console.log('req.session.user:');
        console.log(req.session.user);
        console.log('redirecting to main');
        // res.redirect('/dashboard');
        res.redirect('/');
        // next();
      } else if (req.user || req.session.user) {
        // TEST
        console.log('');
        console.log('req.user:');
        console.log(req.user);
        console.log('req.session.user:');
        console.log(req.session.user);
        console.log('req.session:');
        console.log(req.session);
        console.log('');

      } else {
        console.log('error: no such user found in db');
        // res.send('error: no user found');
        // no user found, therefore create one using req.session
        // var user = req.session.user;

        // user.save(function (err) {
        //   if (err)
        //     res.send(err);
        //   else
        //     res.send(user);
        // });
        // res.send(user);
        res.redirect('/');
      }
    } else {
      console.log('Error: ' + err);
      res.send('Error: ' + err);
    }
  });
}