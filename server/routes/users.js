const express = require('express');
const router = express.Router();
const { User } = require("../models/User");

const { auth } = require("../middleware/auth");

//=================================
//             User
//=================================
//auth is a authentication middleware to block or permit certain  users  
//in req, we will pass some data from auth like token to use in in the callback 
router.get("/auth", auth, (req, res) => {
    //everything is ok, all data is collected, send it as a response 
    res.status(200).json({
        _id: req.user._id,
        isAdmin: req.user.role === 0 ? false : true,
        isAuth: true,
        email: req.user.email,
        name: req.user.name,
        lastname: req.user.lastname,
        role: req.user.role,
        image: req.user.image,
    });
});

router.post("/register", (req, res) => {

    const user = new User(req.body);

    user.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).json({
            success: true
        });
    });
});


router.post("/login", (req, res) => {
    //find email 
    User.findOne({ email: req.body.email }, (err, user) => {
        if (!user)
            return res.json({
                loginSuccess: false,
                message: "Auth failed, email not found"
            });


            //compare password if the user exist ,
            // compare password is existed in User model and i:plemented using bcrypt
        user.comparePassword(req.body.password, (err, isMatch) => {
            if (!isMatch)
                return res.json({ loginSuccess: false, message: "Wrong password" });
                //generate token if password matches match 
            user.generateToken((err, user) => {
                //error in genrating token
                if (err) return res.status(400).send(err);

                res.cookie("w_authExp", user.tokenExp);
                res
                    .cookie("w_auth", user.token)
                    .status(200)
                    .json({
                        loginSuccess: true,
                         userId: user._id
                    });
            });
        });
    });
});

router.get("/logout", auth, (req, res) => {
    //find logged user, update their state by deleting the token and that's it 
    User.findOneAndUpdate({ _id: req.user._id }, { token: "", tokenExp: "" }, (err, doc) => {
        if (err) return res.json({ success: false, err });
        return res.status(200).send({
            success: true
        });
    });
});

module.exports = router;
