const express = require("express")
const db = require('./config/mongoose');
const app = express()

const PORT = 9000

// set up the view engine
app.set('view engine', 'ejs');
app.set('views', './views');

// set the assets
app.use(express.static('./assets'));

// Parse application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));


app.use('/', require('./routes'));
app.listen(PORT, function (err)
{
    if (err) {
        console.log("Error in running the server", err)
        return
    }

    console.log("Server is running on port", PORT)
})