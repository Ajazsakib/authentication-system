module.exports.home = function (req, res)
{

    if (req.cookies.user) {
        return res.render("index", {
            title: "Authentication System",
            error: null,
        })
    }
    else {
        return res.render("login", {
            title: "Authentication System",
            error: null,
        })
    }

}