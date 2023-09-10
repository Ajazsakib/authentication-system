const express = require("express")
const db = require('./config/mongoose');
const app = express()
const cookieParser = require('cookie-parser');
const passport = require('passport');
const passportGoogle = require('./config/passport-google-oauth2-strategy');
const session = require("express-session")
const PORT = 9000

// Use cookie-parser middleware to parse cookies
app.use(cookieParser());

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// set the assets
app.use(express.static('./assets'));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use(session({
    name: 'authentication-ystem',
    // TODO change the secret before deployment in production mode
    secret: 'myLittleSecret',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100)
    },

}))

app.use(passport.initialize());
app.use(passport.session());

app.use(passport.setAuthenticatedUser);

app.use('/', require('./routes'));
app.listen(PORT, function (err)
{
    if (err) {
        console.log("Error in running the server", err)
        return
    }

    console.log("Server is running on port", PORT)
})