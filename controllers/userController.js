const User = require("../models/user");
const bcrypt = require("bcryptjs");
const saltRounds = 10;

module.exports.register = function (req, res)
{
    return res.render("register", {
        title: "Authenticattion Syatem",
        error: null,
    });
};

module.exports.login = function (req, res)
{
    if (req.cookies.user) {
        return res.render("index", {
            title: "Authentication System",
            error: null,
        });
    }
    else {
        return res.render("login", {
            title: "Authentication System",
            error: null,
        });
    }

};

module.exports.createUser = async function (req, res)
{
    try {
        const { name, email, password, confirmPassword } = req.body;
        if (password !== confirmPassword) {
            return res.render("register", {
                title: "Authentication System",
                error: "Password must be same",
            });
        }

        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
        });

        await newUser.save();

        res.redirect("/user/login");
    } catch (error) {
        console.log("Error in creating User", error);
    }
};

module.exports.createSession = async function (req, res)
{

    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).exec();

        const decryptPassword = await bcrypt.compare(password, user.password);

        if (!decryptPassword) {

            return res.render("login", {
                title: "Authentication System",
                error: "Incorrect Password!!",
            });
        }

        if (user && decryptPassword) {
            res.cookie("user", user);
            res.redirect("/");
        } else {
            res.redirect("/user/login");
        }
    } catch (error) {
        console.log("Error in login", error);
        res.redirect("/user/login");
    }
};



module.exports.destroySession = function (req, res)
{
    res.clearCookie("user");

    res.redirect("/user/login")
}

module.exports.resetPassword = function (req, res)
{
    return res.render("resetPassword", {
        title: "Authentication System",
        error: null,
    })
}

module.exports.updatePassword = async function (req, res)
{
    try {
        const { oldPassword, newPassword, confirmNewPassword } = req.body

        const { email } = req.cookies.user

        const user = await User.findOne({ email }).exec();

        const decryptPassword = await bcrypt.compare(oldPassword, user.password);

        if (!decryptPassword) {
            return res.render("resetPassword", {
                title: "Authentication System",
                error: "Incorrect Old Password"
            })
        }

        if (newPassword !== confirmNewPassword) {
            return res.render("resetPassword", {
                title: "Authentication System",
                error: "Password does'nt match"
            })
        }

        // Hash the new password
        const saltRounds = 10; // Adjust the number of salt rounds as needed
        const hashedPassword = await bcrypt.hash(newPassword, saltRounds);


        user.password = hashedPassword

        await user.save();

        res.redirect("/user/login")



    } catch (error) {
        console.log("Error in resetting password", error)
    }
}

module.exports.createSocialSession = function (req, res)
{

    console.log(req.user)
    res.cookie("user", req.user);
    return res.redirect('/');
}

module.exports.destroySocialSession = function (req, res)
{
    req.logout();
    return res.redirect('/');
}