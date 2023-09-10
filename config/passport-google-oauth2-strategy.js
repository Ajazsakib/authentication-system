const passport = require('passport');
const googleStrategy = require('passport-google-oauth').OAuth2Strategy;
const crypto = require('crypto');
const User = require('../models/user');


// tell passport to use a new strategy for google login
passport.use(new googleStrategy({
    clientID: "576446767843-jl5bq51nj4m7240jjob17i3tpmtbc4n5.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:9000/user/auth/google/callback",
},

    function (accessToken, refreshToken, profile, done)
    {
        // find a user
        User.findOne({ email: profile.emails[0].value }).exec(function (err, user)
        {
            if (err) { console.log('error in google strategy-passport', err); return; }
            console.log(accessToken, refreshToken);
            console.log(profile);

            if (user) {
                // if found, set this user as req.user
                return done(null, user);
            } else {
                // if not found, create the user and set it as req.user
                User.create({
                    name: profile.displayName,
                    email: profile.emails[0].value,
                    password: crypto.randomBytes(20).toString('hex')
                }, function (err, user)
                {
                    if (err) { console.log('error in creating user google strategy-passport', err); return; }

                    return done(null, user);
                });
            }

        });
    }


));


// serializing the user to decide which key is to be kept in the cookies
passport.serializeUser(function (user, done)
{
    done(null, user.id);
});



// deserializing the user from the key in the cookies
passport.deserializeUser(function (id, done)
{
    User.findById(id, function (err, user)
    {
        if (err) {
            console.log('Error in finding user --> Passport');
            return done(err);
        }

        return done(null, user);
    });
});


// check if the user is authenticated
passport.checkAuthentication = function (req, res, next)
{
    // if the user is signed in, then pass on the request to the next function(controller's action)
    if (req.isAuthenticated()) {
        return next();
    }

    // if the user is not signed in
    return res.redirect('/users/sign-in');
}

passport.setAuthenticatedUser = function (req, res, next)
{
    if (req.isAuthenticated()) {
        // req.user contains the current signed in user from the session cookie and we are just sending this to the locals for the views
        res.locals.user = req.user;
    }

    next();
}

module.exports = passport;
