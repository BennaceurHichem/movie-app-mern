const { User } = require('../models/User');

let auth = (req, res, next) => {
  //when we login the user data is stored in cookies, here we can get these data 
  let token = req.cookies.w_auth;
  //find the specific logged in user from db  using the User.findByToken() method
  User.findByToken(token, (err, user) => {
    if (err) throw err;
    if (!user)
      return res.json({
        isAuth: false,
        error: true
      });

      //passing token and user to the req in "/auth"
    req.token = token;
    req.user = user;
    next();
  });
};

module.exports = { auth };
