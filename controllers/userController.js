const User = require("../models/user")
const bcrypt = require("bcryptjs")
const saltRounds = 10

module.exports.register = function (req, res)
{
    return res.render("register", {
        title: "Authenticattion Syatem",
        error: null
    })
}

module.exports.login = function (req, res)
{
    return res.render("login", {
        title: "Authentication System"
    })
}

module.exports.createUser = async function (req, res)
{
    console.log(req.body)
    try {
        const { name, email, password, confirmPassword } = req.body
        if (password !== confirmPassword) {
            return res.render("register", {
                title: "Authentication System",
                error: "Password must be same"
            })
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })

        await newUser.save()



        res.redirect("/user/login")

    } catch (error) {
        console.log("Error in creating User", error)
    }
}