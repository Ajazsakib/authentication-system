const express = require("express")

const passport = require('passport');

const router = express.Router()

const userController = require("../controllers/userController")

router.get("/register", userController.register)

router.get("/login", userController.login)

router.post("/createUser", userController.createUser)

router.post("/createSession", userController.createSession)

router.get("/logout", userController.destroySession)

router.get("/resetPassword", userController.resetPassword)

router.post("/updatePassword", userController.updatePassword)

router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));
router.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/user/login' }), userController.createSocialSession);

module.exports = router