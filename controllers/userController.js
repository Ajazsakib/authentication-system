module.exports.register = function (req, res)
{
    return res.render("register", {
        title: "Authenticattion Syatem"
    })
}

module.exports.login = function (req, res)
{
    return res.render("login", {
        title: "Authentication System"
    })
}